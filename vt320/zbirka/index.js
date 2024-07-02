require('./utils');
var printerEnabled = fs.existsSync('/dev/usb/lp0');

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
* najdi <beseda> - Izpiše IDje eksponatov, ki vsebujejo iskane besede.
* eksponat <id> - Izpiše podatke o eksponatu.
* razstave [id] - Izpiše seznam razstav; če je naveden ID, pa info o razstavi.
* statistika - Izpiše statistiko celotne zbirke.
* fotka - ASCII art iz tvojega obraza` + (printerEnabled ? `, ki ga lahko pošlješ na email ali sprintaš` : `, ki ga lahko pošlješ na e-mail.`) +
    `\n* pocisti - Počisti zaslon.
* \x1B[7menglish\x1B[m - Switch to English language. (NOTE: Partially machine translated.)`;

const helpTextEn = `
Commands:
* find <keyword> - Lists item IDs matching the keywords.
* item <id> - Displays details about an item.
* exhibitions [id] - List all exibitions or details of one specified by ID.
* stats - Displays collection statistics.
* photo - ASCII art of your face` + (printerEnabled ? ` with an e-mail and printout option.` : ` with an e-mail option.`) +
    `\n* clear - Clears the screen.
* \x1B[7mslovenski\x1B[m - Preklopi na slovenščino.`;

global.slo = true;
const jezik = (sl) => {
    slo = sl;
    pomoc2();
}

var vec = '';
const najdi2 = (url) => {
    try {
        var res = request('GET', url, {
            timeout: 5000,
            socketTimeout: 5000
        });

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
        var res = request('GET', url, {
            timeout: 5000,
            socketTimeout: 5000
        });
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

izpisi('\033[2J');

readlineSync.promptCLLoop(self = {
    najdi: function najdi(...geslo) {
        var url = 'https://zbirka.muzej.si/api/eksponati/?kveri=' + (geslo.length > 0 ? encodeURIComponent(tipkovnica(geslo.join(' '))) : 'undefined');
        najdi2(url);
    },
    eksponat: function(id) {
        try {
            var res = request('GET', 'https://zbirka.muzej.si/api/eksponati/' + (id ? id.replace('#', '') + '/' : 'undefined'), {
                timeout: 5000,
                socketTimeout: 5000
            });
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
            var res = request('GET', 'https://zbirka.muzej.si/api/statistika/', {
                timeout: 5000,
                socketTimeout: 5000
            });
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
                pocakaj((slo ? 'Kameri pokaži svoj nasmešek, pritisni ' + (tty != "paka3000" ? 'ENTER' : 'RET') + ' in počakaj na pisk...' :
                    'Say cheese, press ' + (tty != "paka3000" ? 'ENTER' : 'RET') + ' and wait for the beep...'));

                var done = false,
                    buffer = null;
                if (tty == "vt320" || tty == "ssh") {
                    vt320cam.capture(function(err, data) {
                        buffer = data;
                        done = true;
                    });
                } else {
                    paka3000cam.capture(function(err, data) {
                        buffer = data;
                        done = true;
                    });
                }
                deasync.loopWhile(function() {
                    return !done;
                });

                izpisi('\007');

                var done2 = false,
                    data = null;
                var img = gm(buffer);
                img = img.contrast(-5);

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
                    reverse: false,
                    pixels: " .,:;i1tfLCG08",
                    size_options: {
                        screen_size: {
                            height: 48
                        }
                    }
                });

                izpisi(ascii);

                if (vprasaj((slo ? 'Si zadovoljen s fotko? (n = ponovno fotkanje)' : 'Are you happy with your photo? (n = takes another one)'))) {

                    var printMode = false;
                    if (printerEnabled) {
                        printMode = !vprasaj((slo ? 'Pritisni E za pošiljanje na e-mail ali T za tiskanje (z donacijo)' :
                            'Press E to send via e-mail or P to print (donation suggested)'), (slo ? 'e' : 'e'), (slo ? 't' : 'p'));
                    }

                    if (printMode) {

                        while (true) {
                            pocakaj((slo ? '\nPodpri naš muzej z donacijo 2 EUR za 1 tisk, hvala! :-)\n' +
                                'Prosimo, oglasi se na blagajni, nato se vrni in za tiskanje pritisni ' + (tty != "paka3000" ? 'ENTER' : 'RET') + '...' :
                                '\nSupport our museum with a donation of 2 EUR for 1 printout, thank you! :-)\n' +
                                'Please go to the cashier, then come back and press ' + (tty != "paka3000" ? 'ENTER' : 'RET') + ' to print...'));
                            if (fs.existsSync('/var/www/html/razstava/print1.txt')) {
                                fs.unlinkSync('/var/www/html/razstava/print1.txt');
                                break;
                            } else {
                                if (vprasaj((slo ? 'Tiskanje ni na voljo. Želite prekiniti? (n = poizkusi znova)' : 'Printing is not available. Cancel? (n = try again)'))) return;
                            }
                        }

                        fs.writeFileSync("/tmp/webcam.txt", center(tiskalnik(ascii + banner +
                            "Računalniški muzej, Celovška 111, 1000 Ljubljana\nhttps://racunalniski-muzej.si/ - https://fb.me/muzej.si\n")));
                        while (true) {
                            izpisi((slo ? '\nTiskam... :)' : '\nPrinting... :)'));
                            execSync('lp /tmp/webcam.txt');
                            //if (vprasaj((slo ? 'Je bil tisk uspešen? (n = ponovno tiskanje)' : 'Did it print okay? (n = prints again)'))) break;
                            break;
                        }
                        return;
                    }

                    if (!printMode) {
                        email = readlineSync.questionEMail(zaslon(slo ? 'E-naslov (@ = ' + (tty != "paka3000" ? 'Shift+2' : 'Shift+Ž') + ') (Ali samo ' + (tty != "paka3000" ? 'ENTER' : 'RET') + ' za preklic.): ' :
                            'E-mail (@ = ' + (tty != "paka3000" ? 'Shift+2' : 'Shift+Ž') + ') (Or just press ' + (tty != "paka3000" ? 'ENTER' : 'RET') + ' to cancel.): '), {
                            limitMessage: zaslon(slo ? 'Prosim, vnesi veljaven e-naslov.' : 'Please enter a valid e-mail address.'),
                            defaultInput: 'cancel@cancel'
                        });
                        if (email != 'cancel@cancel') {
                            izpisi(slo ? 'Pošiljam... prosim, počakaj...' : 'Sending... please wait...');

                            try {
                                asciiText = center(ascii + "\n" + banner + "\nRačunalniški muzej, Celovška 111, 1000 Ljubljana\nhttps://racunalniski-muzej.si/ - https://fb.me/muzej.si");

                                const {
                                    createCanvas,
                                    loadImage,
                                    registerFont
                                } = require('canvas')
                                registerFont(__dirname + '/Glass_TTY_VT220.ttf', {
                                    family: 'VT220'
                                })
                                var canvas = createCanvas(1124, 1920)
                                var ctx = canvas.getContext('2d')
                                ctx.clearRect(0, 0, canvas.width, canvas.height);
                                ctx.fillStyle = (tty == "vt320") ? '#FFBF00' : '#00ff00';
                                ctx.shadowColor = (tty == "vt320") ? '#FFBF00' : '#00ff00';
                                ctx.font = '21pt VT220'
                                ctx.shadowBlur = 5;
                                ctx.fillText(asciiText, 10, 25);
                                ctx.shadowBlur = 10;
                                ctx.fillText(asciiText, 10, 25);
                                ctx.shadowBlur = 15;
                                ctx.fillText(asciiText, 10, 25);

                                posljimejl(email, canvas.toBuffer('image/jpeg', {
                                    quality: 0.90
                                }), (slo ? "⌨️🔠 ASCII Art iz mojega obraza" : "⌨️🔠 ASCII Art of my face"), (slo ? "Računalniški muzej, Celovška 111, 1000 Ljubljana" : "Slovenian Computer History Museum, Celovška 111, 1000 Ljubljana, Slovenia"));
                                izpisi((slo ? 'Fotka uspešno poslana na mejl! (Je niste prejeli? Preverite mapo spam.)' : 'The photo was e-mailed successfully! (Not received? Check your spam folder.)'));
                            } catch (e) {
                                izpisi(slo ? 'Pri pošiljanju e-maila je prišlo do napake :(' : 'There was an error sending your e-mail :(');
                            }
                        } else {
                            izpisi(slo ? 'Pošiljanje preklicano.' : 'Cancelled sending.');
                        }
                        return;
                    }
                }

            }
        } catch (e) {
            izpisi((slo ? 'Pri fotkanju je prišlo do napake :(' : 'An error occured while taking your picture :('));
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
        self.slovenski();
    },
    help: () => {
        self.english();
    },
    photo: () => {
        if (slo) {
            slo = false;
            self.fotka();
            slo = true;
        } else {
            self.fotka();
        }
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
    print: function print(url) {
        try {
            var res = request('GET', "https://pastebin.com/raw/" + url, {
                timeout: 5000,
                socketTimeout: 5000
            });
            var out = res.getBody().toString();
            self.pocisti();
            if (tty == "vt320") izpisi("\033[1$}\033[0m\r" + center(" ", true) + "\033[0$}");
            pocakaj();
            izpisi(out);
            pocakaj();
        } catch (e) {
            izpisi((slo ? "Prišlo je do napake." : "An error occured"));
        }
    },
    izhod: function() {
        if (tty == "ssh") return true;
    },
    blank: function() {},
    _: function(command, ...args) {
        if (command == undefined) command = "";
        var cmd = latinize(tipkovnica(command)).toLowerCase();
        if (!slo) {
            cmd = cmd.replace("find", "najdi").replace("item", "eksponat").replace("exhibitions", "razstave").
            replace("stats", "statistika").replace("clear", "pocisti").replace("more", "vec");
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
            if (global.screensaver != undefined) global.screensaver.kill('SIGKILL');
            global.screensaver = require('child_process').exec('sleep 300; pkill -s 0 -x node');
            return vt320drcs() + '$ > ';
        }
    },
    defaultInput: "blank",
    hideEchoBack: true,
    mask: "return zaslon(tipkovnica(str))"
});
