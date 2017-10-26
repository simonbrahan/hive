/**
 * See http://www.redblobgames.com/grids/hexagons/implementation.html
 */

import drawHexNearest from './DrawHex';

window.onload = function() {
    var gameBoard = document.getElementById('game');
    gameBoard.addEventListener('click', drawHexOnCanvas(gameBoard));
};

function drawHexOnCanvas(svg) {
    return function (event) {
        drawHexNearest(svg, event.offsetX, event.offsetY, 20);
    };
}
