const http = require("http");
const imageToAscii = require("image-to-ascii");
var Camera = require("@sigodenjs/fswebcam");
var camera = new Camera({
    callbackReturn: "buffer"
});

const requestListener = function(req, res) {
    res.writeHead(200);
    camera.capture(function(err, data) {
        imageToAscii(data, {
            colored: false,
            size_options: {
                screen_size: {
                    height: 30
                }
            }
        }, (err, converted) => {
            res.end(converted);
        });
    });
};
const server = http.createServer(requestListener);
server.listen(8000, 'localhost');