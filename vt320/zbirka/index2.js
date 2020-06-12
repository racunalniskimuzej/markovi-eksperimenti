const readlineSync = require('readline-sync');
var request = require('sync-request');
//var latinize = require('latinize');

fs = require('fs');
const execSync = require('child_process').execSync;

const izpisi = (str) => {
    console.log(latinize(str));
};

const easteregg = () => {
    var out = '\033(0';
    var chars = '`a';
    for (var j = 0; j < 24; j++) {
        for (var i = 0; i < 80; i++) {
            out += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        out += "\007\n";
    }
    return out.substring(0, out.length - 1) + "\033(B";
};

const center = (str) => {
    let lines = str.split(/\n/);
    lines = lines.map(line => line.length > 0 ?
        line.padStart(line.length + ((80 / 2) - (line.length / 2)), ' ').padEnd(80, ' ') :
        line);
    return lines.join('\n');
}

const vprasaj = (query) => {
    return readlineSync.keyIn(latinize(query + " [d/n]: "), {
        hideEchoBack: false,
        limit: 'dn',
        trueValue: 'd',
        falseValue: 'n',
        caseSensitive: false
    });
}

const pocakaj = (query) => {
    readlineSync.question(latinize(query), {
        hideEchoBack: true,
        mask: ''
    });
}

function latinize(str) {
    console.log("\033P1;1;1;0;0;2;0;0{P???oGGIKIGG????/???OPPPPPPM????;????oGIKIG?????/????FGGGGG?????;\033\\");

    if (typeof str === 'string') {
        return str.replace(/[^A-Za-z0-9]/g, function(x) {
            return fujitsu_chars[x] || x;
        });
    } else {
        return str;
    }
}

fujitsu_chars = {
    'Š': "\033(P!\033(B",
    'Đ': '\\',
    'Ć': ']',
    'Č': '^',
    'Ž': '`',
    'š': '[',
    'đ': '\\',
    'ć': ']',
    'č': '\033(P"\033(B',
    'ž': '`',
};

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

banner = center(banner);

const helpText = `
Ukazi:
* najdi <geslo> - Izpiše IDje eksponatov, ki vsebujejo iskano geslo.
* eksponat <id> - Izpiše podatke o eksponatu.
* razstave [id] - Izpiše seznam razstav; če je naveden ID, pa info o razstavi.
* statistika - Izpiše statistiko celotne zbirke.
* fotka - ASCII art iz tvojega obraza :) Za donacijo ga lahko tudi sprintaš ;)
* pocisti - Počisti zaslon.`;

izpisi(banner + helpText);

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
            out += "(Delni prikaz od " + json.count + " zadetkov - za več napišite 'vec')\n";
        } else {
            vec = '';
        }
        if (json.count == 0) out += "Ni zadetkov.";
        izpisi(out);
    } catch (e) {
        izpisi("Ni zadetkov.");
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
                out += "(Delni prikaz od " + json.count + " zadetkov - za več napišite 'vec')\n";
            } else {
                vec = '';
            }
        } else {
            if (!json.naslov) throw "napaka";
            out = json.naslov;
            if (json.otvoritev && json.zakljucek) out += " (" + json.otvoritev + " - " + json.zakljucek + ")";
            out += "\n--------------------------";
            if (json.avtorji) {
                out += "\nAvtorji: ";
                for (var i = 0; i < json.avtorji.length; i++) {
                    out += json.avtorji[i].replace(',', '') + ", ";
                }
                out = out.substring(0, out.length - 2);
            }

            if (json.opis) out += "\nOpis: " + json.opis;
            if (json.primerki) {
                out += "\nEksponati:\n";
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
        izpisi("Prišlo je do napake / Razstava s tem ID ne obstaja.");
    }
};

readlineSync.promptCLLoop({
    pomoc: function() {
        izpisi(banner + helpText);
    },
    pocisti: function() {
        izpisi('\033[2J');
    },
    fotka: function() {
        try {
            while (true) {
                pocakaj('Kameri pokaži svoj nasmešek in pritisni ENTER...');

                var res = request('GET', 'http://localhost:8000/');
                izpisi('\007');
                var ascii = res.body.toString();
                if (ascii.length == 0) throw "napaka";

                let half = Math.floor(ascii.length / 2)
                let ascii1 = ascii.slice(0, half);
                let ascii2 = ascii.slice(half, ascii.length);

                izpisi(ascii1);
                pocakaj('Za nadaljevanje pritisni ENTER...');
                izpisi(ascii2);

                if (vprasaj('Si zadovoljen s fotko? (n = ponovno fotkanje)')) {
                    if (vprasaj('Želiš natisniti to fotko?')) {
                        pocakaj('1. Prižgi printer s stikalom blizu kablov.\n2. Pritisni moder gumb START, da se na zaslonu napiše ONLINE.\n3. V primeru napak uporabi gumb ERROR RESET.\nZa tiskanje pritisni ENTER...');

                        fs.writeFileSync("/tmp/webcam.txt", center(fujitsu(ascii + "\n" + banner1 + "Računalniški muzej, Celovška 111, 1000 Ljubljana\nhttps://racunalniski-muzej.si/ - https://fb.me/muzej.si")));
                        while (true) {
                            izpisi('Tiskam... :)');
                            execSync('lp /tmp/webcam.txt');
                            if (vprasaj('Je bil tisk uspešen? (n = ponovno tiskanje)')) break;
                        }
                        return;
                    } else {
                        return;
                    }
                }

            }
        } catch (e) {
            izpisi('Fotkanje trenutno ni na voljo :( Prosim, pocukaj za rokav muzejskega delavca.');
        }

    },
    najdi: function najdi(...geslo) {
        var url = 'http://zbirka.muzej.si/api/eksponati/?kveri=' + (geslo.length > 0 ? geslo.join('+') : 'undefined');
        najdi2(url);
    },
    razstave: function razstave(id) {
        var url = 'http://zbirka.muzej.si/api/razstave/' + (id ? id.replace('#', '') + '/' : '');
        razstave2(url);
    },
    eksponat: function(id) {
        try {
            var res = request('GET', 'http://zbirka.muzej.si/api/eksponati/' + id + '/');
            var obj = JSON.parse(res.getBody());
            var out = obj.eksponat.ime;
            if (obj.serijska_st) out += ", " + obj.serijska_st;
            out += "\n--------------------------";
            if (obj.eksponat.tip) out += "\nTip: " + obj.eksponat.tip;
            if (obj.eksponat.proizvajalec) out += "\nProizvajalec: " + obj.eksponat.proizvajalec;
            if (obj.leto_proizvodnje) out += "\nLeto: " + obj.leto_proizvodnje;
            if (obj.eksponat.opis) out += "\nOpis: " + obj.eksponat.opis;
            if (obj.stanje) out += "\nStanje: " + obj.stanje;
            if (obj.zgodovina) out += "\nZgodovina: " + obj.zgodovina;
            if (obj.donator) out += "\nEksponat je prijazno doniral/-a " + obj.donator.replace(',', '');
            out += "\n";
            izpisi(out);
        } catch (e) {
            izpisi("Eksponat s tem ID ne obstaja.");
        }
    },
    statistika: () => {
        try {
            var res = request('GET', 'http://zbirka.muzej.si/api/statistika/');
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
            izpisi("Prišlo je do napake.");
        }

    },
    vec: () => {
        if (vec) {
            if (vec.includes('/api/eksponati/')) {
                najdi2(vec);
            } else {
                razstave2(vec);
            }
        } else {
            izpisi('Ni zadetkov.');
        }
    },
    format: function() {
        izpisi(easteregg());
    },
    rm: function() {
        izpisi(easteregg());
    },
    blank: function() {}
}, {
    prompt: '\033[1$}\033[7m\r' + center(latinize('Dostop do zbirk Društva računalniški muzej - https://zbirka.muzej.si/')) + '\033[0$}$ > ',
    limitMessage: "Ne poznam ukaza '$<lastInput>'. Poizkusite s 'pomoc'.",
    defaultInput: "blank"
});