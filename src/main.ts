/**
 * See http://www.redblobgames.com/grids/hexagons/implementation.html
 */

var HexPoint = function (q, r) {
    return {
        'q': q,
        'r': r,
        's': 0 - q - r
    };
};

var Hex = {
    /**
     * Offsets to get neighbour of a point
     */
    DIRECTIONS: [
        [1, 0],
        [0, 1],
        [-1, 1],
        [-1, 0],
        [0, -1],
        [1, -1]
    ],

    fromFractionalPoint: function (fractionQ, fractionR)
    {
        var q = Math.round(fractionQ);
        var r = Math.round(fractionR);

        return HexPoint(q, r);
    },

    /**
     * Return true if two hex points are equal, false otherwise
     */
    pointsEqual: function (point, otherPoint) {
        return point.q == otherPoint.q &&
               point.r == otherPoint.r &&
               point.s == otherPoint.s;
    },

    /**
     * Get a hex point representing a step in the passed direction
     * Direction should be an integer between 0 (direct right) and 5, moving clockwise
     */
    direction: function (direction) {
        // Allow for many rotations
        var rotation = (direction % this.DIRECTIONS.length + this.DIRECTIONS.length) %
            this.DIRECTIONS.length;

        return HexPoint(this.DIRECTIONS[rotation][0], this.DIRECTIONS[rotation][1]);
    },

    /**
     * Get a neighbouring hex of a point, given a direction as described by direction()
     */
    neighbour: function (point, direction) {
        return this.add(point, direction(direction));
    },

    /**
     * Get the distance of the passed point from the origin
     */
    pointLength: function (point) {
        return Math.round(
            (
                Math.abs(point.q) +
                Math.abs(point.r) +
                Math.abs(point.s)
            ) / 2
        );
    },

    /**
     * Get the distance separating two passed points
     */
    pointDistance: function (point, otherPoint) {
        return this.pointLength(this.subtract(point, otherPoint));
    },

    /**
     * Cartesian addition of two points
     *
     * eg add((1, 2, -3), (-1, 2, -1)) will return (0, 4, -4)
     */
    add: function (point, otherPoint) {
        return HexPoint(point.q + otherPoint.q, point.r + otherPoint.r);
    },

    /**
     * Cartesian subtraction of two points
     *
     * eg subtract((1, 2, -3), (-1, 2, -1)) will return (2, 0, -2)
     */
    subtract: function (point, otherPoint) {
        return HexPoint(point.q - otherPoint.q, point.r - otherPoint.r);
    },

    /**
     * Cartesian multiplication of a point by an integer
     *
     * eg multiply(1, 2, -3), 2) will return (2, 4, -6)
     */
    multiply: function (point, operand) {
        return HexPoint(point.q * operand, point.r * operand);
    }
};

var LayoutPoint = function (x, y) {
    return {
        x: x,
        y: y
    };
};

var Layout = {

    ORIENTATION: {
        f0: 1.5,
        f1: 0,
        f2: Math.sqrt(3) / 2,
        f3: Math.sqrt(3),
        b0: 2 / 3,
        b1: 0,
        b2: -1 / 3,
        b3: Math.sqrt(3) / 3,
        startAngle: 0
    },

    SIZE: LayoutPoint(25, 25),

    ORIGIN: LayoutPoint(600, 350),

    hexToPixel: function(hexPoint) {
        var xRelativeToOrigin = (
            Layout.ORIENTATION.f0 * hexPoint.q +
            Layout.ORIENTATION.f1 * hexPoint.r
        ) * Layout.SIZE.x;

        var yRelativeToOrigin = (
            Layout.ORIENTATION.f2 * hexPoint.q +
            Layout.ORIENTATION.f3 * hexPoint.r
        ) * Layout.SIZE.y;

        return LayoutPoint(
            xRelativeToOrigin + Layout.ORIGIN.x,
            yRelativeToOrigin + Layout.ORIGIN.y
        );
    },

    pixelToHex(x, y)
    {
        var pointRelativeToOrigin = LayoutPoint(
            (x - Layout.ORIGIN.x) / Layout.SIZE.x,
            (y - Layout.ORIGIN.y) / Layout.SIZE.y
        );

        var q = Layout.ORIENTATION.b0 * pointRelativeToOrigin.x + Layout.ORIENTATION.b1 * pointRelativeToOrigin.y;
        var r = Layout.ORIENTATION.b2 * pointRelativeToOrigin.x + Layout.ORIENTATION.b3 * pointRelativeToOrigin.y;

        return Hex.fromFractionalPoint(q, r);
    }
};

var HEX_ANGLES = [
    radians(0),
    radians(60),
    radians(120),
    radians(180),
    radians(240),
    radians(300)
];

function radians(degrees) {
    return degrees * Math.PI / 180;
}

function hexCornerOffset(corner_num, radius) {
    return {
        x: radius * Math.cos(HEX_ANGLES[corner_num]),
        y: radius * Math.sin(HEX_ANGLES[corner_num])
    };
}

function addPoints(point, other_point) {
    return {x: point.x + other_point.x, y: point.y + other_point.y};
}

function drawPolygon(svg, points) {
    var pointsAsString = points.reduce(
        function (builtPath, point) {
            return builtPath + point.x + ' ' + point.y + ' ';
        },
        ''
    ).trim();
    var line = document.createElementNS("http://www.w3.org/2000/svg", 'polygon');
    line.setAttribute('points', pointsAsString);
    svg.appendChild(line);
}

function drawHex(svg, centreX, centreY, radius) {
    var points = [];

    for (var i=0; i<6; i++) {
        var offset = hexCornerOffset(i, radius);
        points.push(addPoints({x: centreX, y: centreY}, offset));
    }

    drawPolygon(svg, points);
}

window.onload = function() {
    var gameBoard = document.getElementById('game');
    gameBoard.addEventListener('click', drawHexOnCanvas(gameBoard));
};

function drawHexOnCanvas(svg) {
    return function drawHexAtMouseClick(event) {
        var nearestHex = Layout.hexToPixel(Layout.pixelToHex(event.offsetX, event.offsetY));
        drawHex(svg, nearestHex.x, nearestHex.y, 20);
    };
}
