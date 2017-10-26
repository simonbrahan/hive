/**
 * See http://www.redblobgames.com/grids/hexagons/implementation.html
 */

import drawHexNearest from './DrawHex';
import Layout from './Layout';

window.onload = function() {
    var gameBoard = document.getElementById('game');
    gameBoard.addEventListener('mousemove', drawHexOnCanvas(gameBoard));
};

function drawHexOnCanvas(svg) {
    return function (event) {
        if (Layout.sameHex(
                event.offsetX - event.movementX,
                event.offsetY - event.movementY,
                event.offsetX,
                event.offsetY
            )
        ) {
            return;
        }

        for (let childNode of svg.querySelectorAll('polygon')) {
            svg.removeChild(childNode);
        }

        drawHexNearest(svg, event.offsetX, event.offsetY, 20);
    };
}
