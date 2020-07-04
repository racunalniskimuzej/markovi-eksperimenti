global.readlineSync = require('readline-sync');
global.request = require('sync-request');
global.latinize = require('latinize');

global.fs = require('fs');
global.execSync = require('child_process').execSync;

global.imageToAscii = require("image-to-ascii");
var Camera = require("@sigodenjs/fswebcam");
global.camera = new Camera({
    callbackReturn: "buffer",
    rotate: 90
});
global.gm = require('gm');
global.deasync = require('deasync');
global.translate = require('@vitalets/google-translate-api');

global.izpisi = function izpisi(str) {
    console.log(vt320(str));
};

global.prevedi = function prevedi(str) {
    if (slo) return str;
    var done = false;
    var data;
    translate(str, {
        from: 'sl',
        to: 'en'
    }).then(res => {
        done = true;
        data = res.text;
    }).catch(err => {
        done = true;
        data = str;
    });
    deasync.loopWhile(function() {
        return !done;
    });
    return data;
}

global.center = function center(str, pad = false) {
    let lines = str.split(/\n/);
    lines = lines.map(line => line.length > 0 ?
        line.padStart(line.length + ((80 / 2) - (line.length / 2)), ' ').padEnd((pad ? 80 : 0), ' ') :
        line);
    return lines.join('\n');
}

global.vprasaj = function vprasaj(query) {
    return readlineSync.keyIn(vt320(query + (slo ? " [d/n]: " : " [y/n]: ")), {
        hideEchoBack: false,
        limit: (slo ? 'dn' : 'yn'),
        trueValue: (slo ? 'd' : 'y'),
        falseValue: (slo ? 'n' : 'n'),
        caseSensitive: false
    });
}

global.pocakaj = function pocakaj(query) {
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

global.fujitsu = function fujitsu(str) {
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

global.vt320 = function vt320(str) {return paka3000(str);
    if (typeof str === 'string') {
            return latinize(str.replace(/[^A-Za-z0-9]/g, function(x) {
                return vt320_chars[x] || x;
            }));
        
    } else {
        return str;
    }
}

paka3000_chars = {
    "Š": "\033(S[\033(B",
    "Č": "\033(S^\033(B",
    "Ž": "\033(S@\033(B",
    "Ć": "\033(S]\033(B",
    "Đ": "\033(S\\\033(B",
    "š": "\033(S{\033(B",
    "č": "\033(S~\033(B",
    "ž": "\033(S`\033(B",
    "ć": "\033(S}\033(B",
    "đ": "\033(S|\033(B"
};


global.paka3000 = function paka3000(str) {
    if (typeof str === 'string') {
            return latinize(str.replace(/[^A-Za-z0-9]/g, function(x) {
                return paka3000_chars[x] || x;
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

global.lk201 = function lk201(str) {return triglav(str);
    if (process.argv.slice(2)[0] && typeof str === 'string') {
        return str.replace(/[^A-Za-z0-9]/g, function(x) {
            return lk201_chars[x] || x;
        });
    } else {
        return str;
    }
}

triglav_chars = {
    "[": "Š",
    "^": "Č",
    "@": "Ž",
    "]": "Ć",
    "\\": "Đ",
    "{": "š",
    "~": "č",
    "`": "ž",
    "}": "ć",
    "|": "đ"
};

global.triglav = function triglav(str) {
    if (process.argv.slice(2)[0] && typeof str === 'string') {
        return str.replace(/[^A-Za-z0-9]/g, function(x) {
            return triglav_chars[x] || x;
        });
    } else {
        return str;
    }
}



global.vt320drcs = function vt320drcs() {
    if (!process.argv.slice(2)[0] || process.argv.slice(2)[0] == "/dev/ttyUSB1") return '';
    return "\033P1;1;1;0;0;2;0;0{P??oowHHIIHHWOO?/??CCLHHHHHHNEE?;" +
        "??_ooXHIIHHWOO?/??BFFKGGGGGKCC?;???GGHHIIhxwW??/???KKMIJHHGGG??;" +
        "??_ooWGIIHHWOO?/??BFFKGGGGGKCC?;??wwwGGGGGWoo_?/@@NNNHHGGGKFFB?;" +
        "?????ccggcc__??/???@HJIIIIIMCC?;?????ccggcc_???/??AFFLGGGGGLDD?;" +
        "???__ccggcc__??/???KKKIIIHHHG??;?????__ggcc_???/??AFFLGGGGGLDD?;" +
        "?????____oOwwwO/??AFFLGGGGDNNN?\033\\" + '\033[1$}\033[7m\r' +
        vt320(center((slo ? 'Dostop do zbirk Društva računalniški muzej - https://zbirka.muzej.si/' :
            'Slovenian computer museum collection - https://zbirka.muzej.si/'), true)) + '\033[0$}';
}
