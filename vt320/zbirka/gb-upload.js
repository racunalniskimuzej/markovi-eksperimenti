require('./utils');
require('./gb');
const request = require('request');

while (true) {
    var serialport_wait = require('serialport-wait');
    var serialport = new serialport_wait();

    try {
        serialport.connect('/dev/gameboy', 115200);

        if (serialport.isOpen()) {
            serialport.wait('INIT', 0);
            if (serialport.get_wait_result()) {
                serialport.wait('Timed Out', 30);
                if (serialport.get_wait_result()) {
                    gbp = render_gbp(serialport.get_buffer_all());

                    const formData = {
                        fajl: {
                            value: gbp,
                            options: {
                                filename: 'gb.jpg',
                                contentType: 'image/jpeg'
                            }
                        }
                    };

                    request.post({
                        url: 'https://---------------/',
                        formData: formData
                    });
                    console.log("juhej!");
                } else {
                    throw "napaka1";
                }
            } else {
                throw "napaka2";
            }
        } else {
            throw "napaka3";
        }
    } catch (e2) {
        console.log(e2);
    }

    if (serialport.isOpen()) serialport.close();
}
