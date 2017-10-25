/**
 * See http://www.redblobgames.com/grids/hexagons/implementation.html
 */

import Layout from './Layout';
import drawHex from './DrawHex';

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
