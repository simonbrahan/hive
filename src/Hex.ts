const Hex = {
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

function HexPoint(q, r) {
    return {
        'q': q,
        'r': r,
        's': 0 - q - r
    };
};

export default Hex;
