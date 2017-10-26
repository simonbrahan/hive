import Layout from './Layout';

const HEX_ANGLES = [
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

function drawHexNearest(svg, centreX, centreY, radius) {
    var nearestHex = Layout.hexToPixel(Layout.pixelToHex(centreX, centreY));
    drawHex(svg, nearestHex.x, nearestHex.y, 20);
}

export default drawHexNearest;
