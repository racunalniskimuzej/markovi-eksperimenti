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

    return canvas.toBuffer('image/png');
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

    var palette = "grafixkidgreen";

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

global.posljimejl = function posljimejl(email, gbp, title, body) {
    const nodemailer = require("nodemailer");

    let transporter = nodemailer.createTransport({
        host: "smtp.t-2.si",
        port: 587,
        secure: false,
        auth: {
            user: "stamcar_marko@t-2.si",
            pass: "qcEym7x9TbMTSkE",
        },
    });

    transporter.sendMail = transporter.sendMail.bind(transporter);

    sendm = deasync(transporter.sendMail);
    let info = sendm({
        from: 'stamcar_marko@t-2.si',
        to: email,
        subject: title,
        html: body,
        attachments: [{
            filename: 'Game Boy Camera.png',
            content: gbp
        }]
    });
}