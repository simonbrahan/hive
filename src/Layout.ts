import Hex from './Hex';

const Layout = {

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

function LayoutPoint(x, y) {
    return {
        x: x,
        y: y
    };
};

export default Layout;
