const readlineSync = require('readline-sync');
var request = require('sync-request');
var latinize = require('latinize');

fs = require('fs');
const execSync = require('child_process').execSync;

const imageToAscii = require("image-to-ascii");
var Camera = require("@sigodenjs/fswebcam");
var camera = new Camera({
    callbackReturn: "buffer",
    rotate: 90
});
var gm = require('gm');
var deasync = require('deasync');

const izpisi = (str) => {
    console.log(vt320(str));
};

var slo = true;

const easteregg = () => {
    var out = '\033(0';
    var chars = '`a';
    for (var j = 0; j < 24; j++) {
        for (var i = 0; i < 80; i++) {
            out += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        out += "\007\n";
    }
    izpisi(out.substring(0, out.length - 1) + "\033(B");
};

const center = (str) => {
    let lines = str.split(/\n/);
    lines = lines.map(line => line.length > 0 ?
        line.padStart(line.length + ((80 / 2) - (line.length / 2)), ' ').padEnd(80, ' ') :
        line);
    return lines.join('\n');
}

const vprasaj = (query) => {
    return readlineSync.keyIn(vt320(query + (slo ? " [d/n]: " : " [y/n]: ")), {
        hideEchoBack: false,
        limit: (slo ? 'dn' : 'yn'),
        trueValue: (slo ? 'd' : 'y'),
        falseValue: (slo ? 'n' : 'n'),
        caseSensitive: false
    });
}

const pocakaj = (query) => {
    readlineSync.question(vt320(query), {
        hideEchoBack: true,
        mask: ''
    });
}

fujitsu_chars = {
    'Š': '[',
    'Đ': '\\',
    'Ć': ']',
    'Č': '^',
    'Ž': '`',
    'š': '[',
    'đ': '\\',
    'ć': ']',
    'č': '^',
    'ž': '`'
};

function fujitsu(str) {
    if (typeof str === 'string') {
        return str.replace(/[^A-Za-z0-9]/g, function(x) {
            return fujitsu_chars[x] || x;
        });
    } else {
        return str;
    }
}

vt320_chars = {
    "Š": "\033(P!\033(B",
    "Č": "\033(P\"\033(B",
    "Ž": "\033(P#\033(B",
    "Ć": "\033(P$\033(B",
    "Đ": "\033(P%\033(B",
    "š": "\033(P&\033(B",
    "č": "\033(P'\033(B",
    "ž": "\033(P(\033(B",
    "ć": "\033(P)\033(B",
    "đ": "\033(P*\033(B"
};

global.vt320 = function vt320(str) {
    if (!process.env.SSH_CONNECTION && typeof str === 'string') {
        return latinize(str.replace(/[^A-Za-z0-9]/g, function(x) {
            return vt320_chars[x] || x;
        }));
    } else {
        return str;
    }
}

lk201_chars = {
    "{": "Š",
    ":": "Č",
    "|": "Ž",
    "\"": "Ć",
    "}": "Đ",
    "[": "š",
    ";": "č",
    "\\": "ž",
    "'": "ć",
    "]": "đ"
};

global.lk201 = function lk201(str) {
    if (!process.env.SSH_CONNECTION && typeof str === 'string') {
        return str.replace(/[^A-Za-z0-9]/g, function(x) {
            return lk201_chars[x] || x;
        });
    } else {
        return str;
    }
}

function vt320drcs() {
    if (process.env.SSH_CONNECTION) return '';
    return "\033P1;1;1;0;0;2;0;0{P??oowHHIIHHWOO?/??CCLHHHHHHNEE?;" +
        "??_ooXHIIHHWOO?/??BFFKGGGGGKCC?;???GGHHIIhxwW??/???KKMIJHHGGG??;" +
        "??_ooWGIIHHWOO?/??BFFKGGGGGKCC?;??wwwGGGGGWoo_?/@@NNNHHGGGKFFB?;" +
        "?????ccggcc__??/???@HJIIIIIMCC?;?????ccggcc_???/??AFFLGGGGGLDD?;" +
        "???__ccggcc__??/???KKKIIIHHHG??;?????__ggcc_???/??AFFLGGGGGLDD?;" +
        "?????____oOwwwO/??AFFLGGGGDNNN?\033\\" + '\033[1$}\033[7m\r' +
        vt320(center((slo ? 'Dostop do zbirk Društva računalniški muzej - https://zbirka.muzej.si/' :
            'Slovenian computer museum collection - https://zbirka.muzej.si/'))) + '\033[0$}';
}

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
* pocisti - Počisti zaslon.
* english - Switch to English language.`;

const helpTextEn = `
Commands:
* find <keyword> - Lists item IDs matching the keywords.
* item <id> - Displays details about an item.
* exhibitions [id] - List all exibitions or details of one specified by ID.
* stats - Displays collection statistics.
* photo - ASCII art of your face :) Donate to get a printout ;)
* clear - Clears the screen.
* slovenski - Preklopi na slovenščino.`;

var vec = '';
const najdi2 = (url) => {
    try {
        var res = request('GET', url);

        var json = JSON.parse(res.getBody());
        var arr = json.results;
        var out = '';
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].eksponat) {
                out += "#" + arr[i].inventarna_st + ": " + arr[i].eksponat.ime;
                if (arr[i].serijska_st) out += ", " + arr[i].serijska_st;
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

const vec2 = () => {
    if (vec) {
        if (vec.includes('/api/eksponati/')) {
            najdi2(vec);
        } else {
            razstave2(vec);
        }
    } else {
        izpisi((slo ? 'Ni več zadetkov.' : 'No more results.'));
    }
}

const fotka1 = () => {
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

                    fs.writeFileSync("/tmp/webcam.txt", center(fujitsu(ascii + "\n\n" +
                        "Računalniški muzej, Celovška 111, 1000 Ljubljana\nhttps://racunalniski-muzej.si/ - https://fb.me/muzej.si" + banner)));
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
}

const najdi1 = (...geslo) => {
    var url = 'https://zbirka.muzej.si/api/eksponati/?kveri=' + (geslo.length > 0 ? encodeURIComponent(lk201(geslo.join(' '))) : 'undefined');
    najdi2(url);

}

const razstave1 = (id) => {
    var url = 'https://zbirka.muzej.si/api/razstave/' + (id ? id.replace('#', '') + '/' : '');
    razstave2(url);
}

const eksponat1 = (id) => {
    try {
        var res = request('GET', 'https://zbirka.muzej.si/api/eksponati/' + id + '/');
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
        izpisi(out);
    } catch (e) {
        izpisi((slo ? "Eksponat s tem ID ne obstaja." : "Item with this ID not found."));
    }

}

const pomoc1 = () => {
    izpisi(center(banner) + (slo ? helpTextSlo : helpTextEn));
}

const pocisti1 = () => {
    izpisi('\033[2J');
}

const statistika1 = () => {
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
}

const jezik = (sl) => {
    slo = sl;
    pomoc1();
}

izpisi(vt320drcs());
pomoc1();

readlineSync.promptCLLoop({
    english: function() { jezik(false); },
    slovenski: function() { jezik(true); },

    pomoc: function() { pomoc1(); },
    help: function() { pomoc1(); },

    pocisti: function() { pocisti1(); },
    clear: function() { pocisti1(); },

    fotka: function() { fotka1(); },
    photo: function() { fotka1(); },

    najdi: function najdi(...geslo) { najdi1(...geslo); },
    find: function find(...geslo) { najdi1(...geslo); },

    razstave: function razstave(id) { razstave1(id); },
    exhibitions: function exhibitions(id) { razstave1(id); },

    eksponat: function(id) { eksponat1(id); },
    item: function(id) { eksponat1(id); },

    statistika: () => { statistika1(); },
    stats: () => { statistika1(); },

    vec: () => { vec2(); },
    more: () => { vec2(); },

    format: function() { easteregg(); },
    rm: function() { easteregg(); },

    izhod: function() { if (process.env.SSH_CONNECTION) return true; },
    blank: function() {},
    _: function(command) {
        var cmd = latinize(lk201(command)).toLowerCase();
        if (cmd == "pomoc") {
            pomoc1();
        } else if (cmd == "pocisti") {
            pocisti1();
        } else if (cmd == "vec") {
            vec2();
        } else {
            izpisi((slo ? "Ne poznam ukaza '" + lk201(command) + "'. Poizkusite s 'pomoc'." :
                "Command '" + lk201(command) + "' not recognized. Try 'help'."));
        }
    }
}, {
    prompt: vt320drcs() + '$ > ',
    defaultInput: "blank",
    hideEchoBack: true,
    mask: "return vt320(lk201(str))"
});