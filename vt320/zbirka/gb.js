/*
Adapted for Node.js + node-canvas from:
https://github.com/mofosyne/arduino-gameboy-printer-emulator/blob/master/gbp_decoder/jsdecoderV2/gbp_gameboyprinter2bpp.js
*/
function newCanvas() {
    const {
        createCanvas,
        loadImage
    } = require('canvas');
    return createCanvas(480, 432);
}

function renderImage(tiles) {
    var canvas = global.canvas;

    var tile_height_count = Math.floor(tiles.length / 20);

    // /* Determine size of each pixel in canvas */
    var square_width = canvas.width / (8 * 20);
    var square_height = square_width;

    // Resize height (Setting new canvas size will reset canvas)
    canvas.width = square_width * 8 * 20;
    canvas.height = square_height * 8 * tile_height_count;

    tiles.forEach(function(pixels, index) {
        // Gameboy Tile Offset
        var tile_x_offset = index % 20;
        var tile_y_offset = Math.floor(index / 20);
        paint(canvas, pixels, square_width, square_height, tile_x_offset, tile_y_offset);
    })
}

global.render_gbp = function render_gbp(rawBytes) {
    global.canvas = newCanvas();


    // rawBytes is a string of hex where each line represents a gameboy tile
    var tiles_rawBytes_array = rawBytes.split(/\n/);

    var images = [];
    var currentImage = null;

    tiles_rawBytes_array
        .map(function(raw_line, line_number) {
            if ((raw_line.charAt(0) === '#'))
                return null;

            if ((raw_line.charAt(0) === '/'))
                return null;

            if ((raw_line.charAt(0) === '{')) {
                try {
                    var command = JSON.parse(raw_line.slice(0).trim());
                    if (command.command === 'INIT') {
                        return 'INIT'
                    } else if (command.command === 'PRNT') {
                        return command.margin_lower;
                    }
                } catch (error) {
                    throw new Error('Error while trying to parse JSON data block in line ' + (1 + line_number));
                }
            }
            return (decode(raw_line));
        })
        .filter(Boolean)
        .forEach(function(tile_element) {

            if ((tile_element === 'INIT' && currentImage)) {
                // ignore init if image has not finished 'printing'
            } else if ((tile_element === 'INIT' && !currentImage)) {
                currentImage = [];
            } else if ((typeof(tile_element) === 'number')) {
                // handle margin value
                var margin_lower = tile_element;

                // if margin is 3 split into new image 'finish printing'
                if (margin_lower === 3) {
                    images.push(currentImage);
                    currentImage = [];
                }
                // otherwise feed blank lines using lower margin value
                else {
                    var blank_tile = new Array(64).fill(4);
                    // send 40 blank tiles per margin feed
                    for (i = 0; i < margin_lower * 40; i++) {
                        currentImage.push(blank_tile);
                    }
                }
            } else {
                try {
                    currentImage.push(tile_element);
                } catch (error) {
                    throw new Error('No image start found. Maybe this line is missing? -> !{"command":"INIT"}')
                }
            }
        })

    images.forEach(renderImage);

    Canvas = require('canvas');
    var rmlogo = new Canvas.Image();
    rmlogo.src = "data:image/png;base64,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";
    canvas.getContext('2d').drawImage(rmlogo, 0, 0);

    return canvas.toBuffer('image/jpeg', {
        quality: 0.95
    });
}

// Gameboy tile decoder function from http://www.huderlem.com/demos/gameboy2bpp.html
function decode(rawBytes) {
    var bytes = rawBytes.replace(/[^0-9A-F]/ig, '');
    if (bytes.length != 32) return false;

    var byteArray = new Array(16);
    for (var i = 0; i < byteArray.length; i++) {
        byteArray[i] = parseInt(bytes.substr(i * 2, 2), 16);
    }

    var pixels = new Array(8 * 8);
    for (var j = 0; j < 8; j++) {
        for (var i = 0; i < 8; i++) {
            var hiBit = (byteArray[j * 2 + 1] >> (7 - i)) & 1;
            var loBit = (byteArray[j * 2] >> (7 - i)) & 1;
            pixels[j * 8 + i] = (hiBit << 1) | loBit;
        }
    }
    return pixels;
}

// This paints the tile with a specified offset and pixel width
function paint(canvas, pixels, pixel_width, pixel_height, tile_x_offset, tile_y_offset) {

    var palette = "dmg";

    switch (palette) {
        case "grayscale":
            colors = new Array("#ffffff", "#aaaaaa", "#555555", "#000000", "#FFFFFF00");
            break;
        case "dmg":
            colors = new Array("#9BBC0F", "#77A112", "#306230", "#0F380F", "#FFFFFF00");
            break;
        case "gameboypocket":
            colors = new Array("#c4cfa1", "#8b956d", "#4d533c", "#1f1f1f", "#FFFFFF00");
            break;
        case "gameboycoloreuus":
            colors = new Array("#ffffff", "#7bff30", "#0163c6", "#000000", "#FFFFFF00");
            break;
        case "gameboycolorjp":
            colors = new Array("#ffffff", "#ffad63", "#833100", "#000000", "#FFFFFF00");
            break;
        case "bgb":
            colors = new Array("#e0f8d0", "#88c070", "#346856", "#081820", "#FFFFFF00");
            break;
        case "grafixkidgray":
            colors = new Array("#e0dbcd", "#a89f94", "#706b66", "#2b2b26", "#FFFFFF00");
            break;
        case "grafixkidgreen":
            colors = new Array("#dbf4b4", "#abc396", "#7b9278", "#4c625a", "#FFFFFF00");
            break;
        case "blackzero":
            colors = new Array("#7e8416", "#577b46", "#385d49", "#2e463d", "#FFFFFF00");
            break;
        default:
            colors = new Array("#ffffff", "#aaaaaa", "#555555", "#000000", "#FFFFFF00");
    }
    tile_offset = tile_x_offset * tile_y_offset;
    pixel_x_offset = 8 * tile_x_offset * pixel_width;
    pixel_y_offset = 8 * tile_y_offset * pixel_height;

    var ctx = canvas.getContext("2d");

    // pixels along the tile's x axis
    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {
            // pixels along the tile's y axis

            // Pixel Color
            ctx.fillStyle = colors[pixels[j * 8 + i]];

            // Pixel Position (Needed to add +1 to pixel width and height to fill in a gap)
            ctx.fillRect(
                pixel_x_offset + i * pixel_width,
                pixel_y_offset + j * pixel_height,
                pixel_width + 1,
                pixel_height + 1
            );
        }
    }
}
