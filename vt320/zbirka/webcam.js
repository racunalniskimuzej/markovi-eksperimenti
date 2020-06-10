const http = require("http");
const imageToAscii = require("image-to-ascii");
var Camera = require("@sigodenjs/fswebcam");
var camera = new Camera({
    callbackReturn: "buffer",
    rotate: 90
});

const requestListener = function(req, res) {
    res.writeHead(200);
    camera.capture(function(err, data) {
        imageToAscii(data, {
            colored: false,
            size_options: {
                screen_size: {
                    height: 53
                }
            }
        }, (err, converted) => {
            res.end(err || converted);
        });
    });

};
const server = http.createServer(requestListener);
server.listen(8000, 'localhost', () => {
    console.log('Server is now running!');
});