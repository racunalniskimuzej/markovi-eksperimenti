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

global.izpisi = function izpisi(str) {
    console.log(vt320(str));
};

global.center = function center(str) {
    let lines = str.split(/\n/);
    lines = lines.map(line => line.length > 0 ?
        line.padStart(line.length + ((80 / 2) - (line.length / 2)), ' ').padEnd(80, ' ') :
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

global.vt320drcs = function vt320drcs() {
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
