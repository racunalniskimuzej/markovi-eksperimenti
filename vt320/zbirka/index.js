const readlineSync = require('readline-sync');
var request = require('sync-request');
var latinize = require('latinize');

fs = require('fs');
const execSync = require('child_process').execSync;

const izpisi = (str) => {
    console.log(latinize(str));
};

const easteregg = () => {
    var out = '';
    var chars = '#$%&@*';
    for (var j = 0; j < 24; j++) {
        for (var i = 0; i < 80; i++) {
            out += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        out += "\007\n";
    }
    return out.substring(0, out.length - 1);
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
                                             
-------[ https://zbirka.muzej.si/ ]-------
Dostop do zbirk Društva računalniški muzej
------------------------------------------`;

const helpText = `
Ukazi:
* najdi <geslo> - Izpiše IDje eksponatov, ki vsebujejo iskano geslo.
* eksponat <id> - Izpiše podatke o eksponatu.
* razstave [id] - Izpiše seznam razstav; če je naveden ID, pa info o razstavi.
* statistika - Izpiše statistiko celotne zbirke.
* fotka - ASCII art iz tvojega obraza :)
* pocisti - Počisti zaslon.`;

let lines = banner.split(/\n/);
lines = lines.map(line => line.length > 0 ?
    line.padStart(line.length + ((80 / 2) - (line.length / 2)), ' ') :
    line);
banner = lines.join('\n');

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
                readlineSync.question(latinize('Kameri pokaži svoj nasmešek in pritisni ENTER...'), {
                    hideEchoBack: true,
                    mask: ''
                });

                var res = request('GET', 'http://localhost:8000/');
                var ascii = res.body.toString();
                if (ascii.length == 0) throw "napaka";
                izpisi(ascii);

                if (!readlineSync.keyInYNStrict(latinize('Želiš še eno fotko?'))) {
                    if (readlineSync.keyInYNStrict(latinize('Želiš natisniti to fotko?'))) {
                        readlineSync.question(latinize('1. Prižgi printer s stikalom blizu kablov.\n2. Pritisni moder gumb START, da se na zaslonu napiše ONLINE.\n3. V primeru napak uporabi gumb ERROR RESET.\nZa tiskanje pritisni ENTER...'), {
                            hideEchoBack: true,
                            mask: ''
                        });
                        fs.writeFileSync("/tmp/webcam.txt", ascii);
                        while (true) {
                            izpisi('Tiskam... :)');
                            execSync('lp /tmp/webcam.txt');
                            if (!readlineSync.keyInYNStrict(latinize('Natisnem še enkrat?'))) break;
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
    prompt: '$ > ',
    limitMessage: "Ne poznam ukaza '$<lastInput>'. Poizkusite s 'pomoc'.",
    defaultInput: "blank"
});