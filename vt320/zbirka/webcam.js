const http = require("http");
const imageToAscii = require("image-to-ascii");
var Camera = require("@sigodenjs/fswebcam");
var camera = new Camera({
    callbackReturn: "buffer",
    rotate: 90
});
var gm = require('gm');

const requestListener = function(req, res) {
    res.writeHead(200);
    camera.capture(function(err, data) {
        gm(data).contrast(-5).toBuffer('JPG', function(err, data) {
            imageToAscii(data, {
                colored: false,
                reverse: true,
                pixels: " .,:;i1tfLCG08",
                size_options: {
                    screen_size: {
                        height: 52
                    }
                }
            }, (err, converted) => {
                res.end(converted);
            });
        });
    });
};
const server = http.createServer(requestListener);
server.listen(8000, 'localhost');