require('./utils');
require('./gb');

var banner = ` 

          ohNh+               +hNh+          
         'MMMMM              'MMMMN          
          -omMMdo/sddo/sddo/sdMMd+-          
       '    sMMMMNMMMMMMMMMNMMMMo    '       
     /ydy//yNMMy/-+yMMMMMy/-+yMMms:/sds:     
     MMMMMMMMMN     MMMMM     MMMMMMMMMN     
  .+hMMms::smMMh+-+hMMMMMh+-+hMMms:/smMMh+.  
  oMMMM+    oMMMMMMMMMMMMMMMMMMMo    oMMMMo  
:omMMho.  :omMMho:ohho:ohho:ohMMmo:  .ohMMmo:
MMMMM     NMMMM              'MMMMN    'MMMMM
+ymy/     +yNMMs/'         '/sMMNy/     /ymy+
  '         sMMMM+         oMMMMo         '  
            -smms.         -smms-            
`;

const helpTextSlo = `
Ukazi:
* najdi <geslo> - Izpiše IDje eksponatov, ki vsebujejo iskano geslo.
* eksponat <id> - Izpiše podatke o eksponatu.
* razstave [id] - Izpiše seznam razstav; če je naveden ID, pa info o razstavi.
* statistika - Izpiše statistiko celotne zbirke.
* fotka - ASCII art iz tvojega obraza :) Za donacijo ga lahko tudi sprintaš ;)
* gameboy - Prejmi fotko iz Game Boy Camere na e-mail.
* pocisti - Počisti zaslon.
* \x1B[7menglish\x1B[m - Switch to English language. (NOTE: Partially machine translated.)`;

const helpTextEn = `
Commands:
* find <keyword> - Lists item IDs matching the keywords.
* item <id> - Displays details about an item.
* exhibitions [id] - List all exibitions or details of one specified by ID.
* stats - Displays collection statistics.
* photo - ASCII art of your face :) Donate to get a printout ;)
* gameboy - E-mail a photo from the Game Boy Camera.
* clear - Clears the screen.
* \x1B[7mslovenski\x1B[m - Preklopi na slovenščino.`;

global.slo = true;
const jezik = (sl) => {
    slo = sl;
    pomoc2();
}

var vec = '';
const najdi2 = (url) => {
    try {
        var res = request('GET', url);

        var json = JSON.parse(res.getBody());
        var arr = json.results;
        var out = '';
        zadetki = [];
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].eksponat) {
                zadetki[i] = arr[i].eksponat.ime;
                if (arr[i].serijska_st) zadetki[i] += ", " + arr[i].serijska_st;
            }
        }
        zadetki = prevedi(zadetki.join("\n")).split("\n");

        for (var i = 0; i < arr.length; i++) {
            if (arr[i].eksponat) {
                out += "#" + arr[i].inventarna_st + ": " + zadetki[i];
                out += "\n";
            }
        }
        if (json.next) {
            vec = json.next;
            out += (slo ? "(Delni prikaz od " + json.count + " zadetkov - za več napišite 'vec')\n" :
                "(Partial list of " + json.count + " results - type 'more' for more)\n");
        } else {
            vec = '';
        }
        if (json.count == 0) out += (slo ? "Ni zadetkov." : "No results.");
        izpisi(out);
    } catch (e) {
        izpisi((slo ? "Ni zadetkov." : "No results."));
    }
};

const razstave2 = (url) => {
    try {
        var res = request('GET', url);
        var json = JSON.parse(res.getBody());
        var out = '';

        if (json.results) {
            var arr = json.results;
            for (var i = 0; i < arr.length; i++) {
                out += "#" + arr[i].pk + ": " + arr[i].naslov;
                if (arr[i].otvoritev && arr[i].zakljucek) out += " (" + arr[i].otvoritev + " - " + arr[i].zakljucek + ")";
                out += "\n";
            }
            if (json.next) {
                vec = json.next;
                out += (slo ? "(Delni prikaz od " + json.count + " zadetkov - za več napišite 'vec')\n" :
                    "(Partial list of " + json.count + " results - type 'more' for more)\n");
            } else {
                vec = '';
            }
        } else {
            if (!json.naslov) throw "napaka";
            out = json.naslov;
            if (json.otvoritev && json.zakljucek) out += " (" + json.otvoritev + " - " + json.zakljucek + ")";
            out += "\n--------------------------";
            if (json.avtorji) {
                out += (slo ? "\nAvtorji: " : "\nAuthors: ");
                for (var i = 0; i < json.avtorji.length; i++) {
                    out += json.avtorji[i].replace(',', '') + ", ";
                }
                out = out.substring(0, out.length - 2);
            }

            if (json.opis) out += (slo ? "\nOpis: " : "\nDescription: ") + json.opis;
            if (json.primerki) {
                out += (slo ? "\nEksponati:\n" : "\nItems:\n");
                for (var i = 0; i < json.primerki.length; i++) {
                    if (json.primerki[i].eksponat) {
                        out += "#" + json.primerki[i].inventarna_st + ": " + json.primerki[i].eksponat.ime;
                        if (json.primerki[i].serijska_st) out += ", " + json.primerki[i].serijska_st;
                        out += "\n";
                    }
                }
                out = out.substring(0, out.length - 1);
            }
            out += "\n";
        }
        izpisi(out);
    } catch (e) {
        izpisi((slo ? "Razstava s tem ID ne obstaja." : "Exhibition with this ID not found."));
    }
};

const pomoc2 = () => {
    izpisi(center(banner) + (slo ? helpTextSlo : helpTextEn));
}

izpisi(vt320drcs());
pomoc2();

readlineSync.promptCLLoop(self = {
    najdi: function najdi(...geslo) {
        var url = 'https://zbirka.muzej.si/api/eksponati/?kveri=' + (geslo.length > 0 ? encodeURIComponent(tipkovnica(geslo.join(' '))) : 'undefined');
        najdi2(url);
    },
    eksponat: function(id) {
        try {
            var res = request('GET', 'https://zbirka.muzej.si/api/eksponati/' + (id ? id.replace('#', '') + '/' : 'undefined'));
            var obj = JSON.parse(res.getBody());
            var out = obj.eksponat.ime;
            if (obj.serijska_st) out += ", " + obj.serijska_st;
            out += "\n--------------------------";
            if (obj.eksponat.tip) out += (slo ? "\nTip: " : "\nModel: ") + obj.eksponat.tip;
            if (obj.eksponat.proizvajalec) out += (slo ? "\nProizvajalec: " : "\nManufacturer: ") + obj.eksponat.proizvajalec;
            if (obj.leto_proizvodnje) out += (slo ? "\nLeto: " : "\nYear: ") + obj.leto_proizvodnje;
            if (obj.eksponat.opis) out += (slo ? "\nOpis: " : "\nDescription: ") + obj.eksponat.opis;
            if (obj.stanje) out += (slo ? "\nStanje: " : "\nCondition: ") + obj.stanje;
            if (obj.zgodovina) out += (slo ? "\nZgodovina: " : "\nHistory: ") + obj.zgodovina;
            if (obj.donator) out += (slo ? "\nEksponat je prijazno doniral/-a " :
                "\nKindly donated by ") + obj.donator.replace(',', '');
            out += "\n";
            izpisi(prevedi(out));
        } catch (e) {
            izpisi((slo ? "Eksponat s tem ID ne obstaja." : "Item with this ID not found."));
        }

    },
    razstave: function razstave(id) {
        var url = 'https://zbirka.muzej.si/api/razstave/' + (id ? id.replace('#', '') + '/' : '');
        razstave2(url);
    },
    statistika: () => {
        try {
            var res = request('GET', 'https://zbirka.muzej.si/api/statistika/');
            var arr = JSON.parse(res.getBody());
            var out = '';
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].eksponatov > 0) {
                    out += arr[i].eksponatov + " x " + arr[i].ime;
                    out += "\n";
                }
            }
            izpisi(out);
        } catch (e) {
            izpisi((slo ? "Prišlo je do napake." : "An error occured"));
        }
    },
    fotka: function() {
        try {
            while (true) {
                pocakaj((slo ? 'Kameri pokaži svoj nasmešek, pritisni ENTER in počakaj na pisk...' :
                    'Say cheese, press ENTER and wait for the beep...'));

                var done = false,
                    buffer = null;
                camera.capture(function(err, data) {
                    buffer = data;
                    done = true;
                });
                deasync.loopWhile(function() {
                    return !done;
                });

                izpisi('\007');

                var done2 = false,
                    data = null;
                var img = gm(buffer).contrast(-5);
                img.toBuffer('JPG', function(err, buffer) {
                    data = buffer;
                    done2 = true;
                });
                deasync.loopWhile(function() {
                    return !done2;
                });

                var img2ascii = deasync(imageToAscii);
                var ascii = img2ascii(data, {
                    colored: false,
                    reverse: true,
                    pixels: " .,:;i1tfLCG08",
                    size_options: {
                        screen_size: {
                            height: 48
                        }
                    }
                });

                let half = Math.floor(ascii.length / 2)
                let ascii1 = ascii.slice(0, half);
                let ascii2 = ascii.slice(half, ascii.length);

                izpisi(ascii1);
                pocakaj((slo ? 'Za nadaljevanje pritisni ENTER...' : 'Press ENTER to continue...'));
                izpisi(ascii2);

                if (vprasaj((slo ? 'Si zadovoljen s fotko? (n = ponovno fotkanje)' : 'Are you happy with your photo? (n = takes another one)'))) {
                    if (vprasaj((slo ? 'Želiš natisniti to fotko?' : 'Do you want a printout?'))) {
                        pocakaj((slo ? '1. Prižgi printer s stikalom blizu kablov.\n' +
                            '2. Pritisni moder gumb START, da se na zaslonu napiše ONLINE.\n' +
                            '3. V primeru napak uporabi gumb ERROR RESET.\nZa tiskanje pritisni ENTER...' :
                            '1. Turn on line printer with switch next to its cables.\n' +
                            '2. Press the blue START button so that the display shows ONLINE.\n' +
                            '3. In case of errors, press ERROR RESET.\nPress ENTER to print...'));

                        fs.writeFileSync("/tmp/webcam.txt", center(tiskalnik(ascii + "\n" + banner +
                            "\nRačunalniški muzej, Celovška 111, 1000 Ljubljana\nhttps://racunalniski-muzej.si/ - https://fb.me/muzej.si")));
                        while (true) {
                            izpisi((slo ? 'Tiskam... :)' : 'Printing... :)'));
                            execSync('lp /tmp/webcam.txt');
                            if (vprasaj((slo ? 'Je bil tisk uspešen? (n = ponovno tiskanje)' : 'Did it print okay? (n = prints again)'))) break;
                        }
                        return;
                    } else {
                        return;
                    }
                }

            }
        } catch (e) {
            izpisi((slo ? 'Pri fotkanju je prišlo do napake :(' : 'An error occured while taking your picture :('));
        }
    },
    gameboy: function() {


        var serialport_wait = require('serialport-wait');
        var serialport = new serialport_wait();

        serialport.connect('/dev/gameboy', 115200);

        if (serialport.isOpen()) {
            izpisi((slo ? 'Na Game Boyu začni s tiskanjem fotke...' : 'Start printing the photo on the Game Boy...'));
            serialport.wait('INIT', 30);
            if (serialport.get_wait_result()) {
                serialport.wait('Timed Out', 30);
                if (serialport.get_wait_result()) {
                    gbp = render_gbp(serialport.get_buffer_all());
                    email = readlineSync.questionEMail(zaslon(slo ? 'Super! Vnesi e-naslov, kamor želiš prejeti fotko: ' :
                        'Great! Enter the e-mail to which the photo will be sent: '), {
                        limitMessage: zaslon(slo ? 'Prosim, vnesi veljaven e-naslov.' : 'Please enter a valid e-mail address.')
                    });
                    try {
                        posljimejl(email, gbp, (slo ? "📸🕹️ Tvoja Game Boy fotka" : "📸🕹️ Your Game Boy photo"), "<a href='https://racunalniski-muzej.si/'>https://racunalniski-muzej.si/</a>");
                        izpisi((slo ? 'Fotka uspešno poslana na mejl!' : 'The photo was e-mailed successfully!'));
                    } catch (e) {
                        izpisi(slo ? 'Pri pošiljanju e-maila je prišlo do napake :(' : 'There was an error sending your e-mail :(');
                    }
                } else {
                    izpisi((slo ? 'Prišlo je do napake pri komunikaciji z Game Boyem :(' : 'There was an error communicating with the Game Boy :('));
                }
            } else {
                izpisi((slo ? 'Prišlo je do napake pri komunikaciji z Game Boyem :(' : 'There was an error communicating with the Game Boy :('));
            }
            serialport.close();
        } else {
            izpisi((slo ? 'Prišlo je do napake pri komunikaciji z Game Boyem :(' : 'There was an error communicating with the Game Boy :('));
        }
    },
    pocisti: () => {
        izpisi('\033[2J');
    },
    english: () => {
        jezik(false);
    },
    slovenski: () => {
        jezik(true);
    },
    vec: function() {
        if (vec) {
            if (vec.includes('/api/eksponati/')) {
                najdi2(vec);
            } else {
                razstave2(vec);
            }
        } else {
            izpisi((slo ? 'Ni več zadetkov.' : 'No more results.'));
        }
    },
    pomoc: () => {
        pomoc2();
    },
    help: () => {
        self.pomoc();
    },
    format: () => {
        var out = '\033(0';
        var chars = '`a';
        for (var j = 0; j < 24; j++) {
            for (var i = 0; i < 79; i++) {
                out += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            out += "\007\n";
        }
        izpisi(out.substring(0, out.length - 1) + "\033(B");
    },
    rm: () => {
        self.format();
    },
    izhod: function() {
        if (tty == "ssh") return true;
    },
    blank: function() {},
    _: function(command, ...args) {
        var cmd = latinize(tipkovnica(command)).toLowerCase();
        if (!slo) {
            cmd = cmd.replace("find", "najdi").replace("item", "eksponat").replace("exhibitions", "razstave").
            replace("stats", "statistika").replace("photo", "fotka").replace("clear", "pocisti").replace("more", "vec");
        }

        if (self[cmd]) {
            self[cmd](...args);
        } else {
            izpisi((slo ? "Ne poznam ukaza '" + tipkovnica(command) + "'. Poizkusite s 'pomoc'. / Try 'help'." :
                "Command '" + tipkovnica(command) + "' not recognized. Try 'help'. / Poizkusite s 'pomoc'."));
        }
    }
}, {
    prompt: {
        toString: function() {
            return vt320drcs() + '$ > ';
        }
    },
    defaultInput: "blank",
    hideEchoBack: true,
    mask: "return zaslon(tipkovnica(str))"
});