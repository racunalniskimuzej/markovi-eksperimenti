global.readlineSync = require('readline-sync');
global.request = require('sync-request');
global.latinize = require('latinize');

global.fs = require('fs');
global.execSync = require('child_process').execSync;

global.imageToAscii = require("image-to-ascii");
var Camera = require("@sigodenjs/fswebcam");
global.vt320cam = new Camera({
    device: "/dev/video2",
    callbackReturn: "buffer",
    rotate: 90
});
global.paka3000cam = new Camera({
    device: "/dev/video0",
    callbackReturn: "buffer",
    rotate: 90
});
global.gm = require('gm');
global.deasync = require('deasync');
global.translate = require('@vitalets/google-translate-api');

const ttyname = require('ttyname');
global.tty = 'ssh';
try {
    if (fs.existsSync('/dev/vt320') && fs.realpathSync('/dev/vt320') == ttyname()) global.tty = 'vt320';
    if (fs.existsSync('/dev/paka3000') && fs.realpathSync('/dev/paka3000') == ttyname()) global.tty = 'paka3000';
} catch (e) {}

global.zaslon = function(str) {
    return str;
}
global.tipkovnica = function(str) {
    return str;
}
global.tiskalnik = function(str) {
    return zamenjaj(pc852, str);
}

if (tty == "vt320") {
    zaslon = function(str) {
        return latinize(zamenjaj(vt320, str));
    }
    tipkovnica = function(str) {
        return zamenjaj(lk201, str);
    }
} else if (tty == "paka3000") {
    zaslon = function(str) {
        return latinize(zamenjaj(paka3000, str));
    }
    tipkovnica = function(str) {
        return zamenjaj(triglav, str);
    }
} else if (tty == "ssh") {
    zaslon = function(str) {
        return latinize(str);
    }
}

global.izpisi = function izpisi(str) {
    console.log(zaslon(str));
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

global.vprasaj = function vprasaj(query, da = (slo ? 'd' : 'y'), ne = (slo ? 'n' : 'n')) {
    return readlineSync.keyIn(zaslon(query + " [" + da + "/" + ne + "]: "), {
        hideEchoBack: false,
        limit: da + ne,
        trueValue: da,
        falseValue: ne,
        caseSensitive: false
    });
}

global.pocakaj = function pocakaj(query) {
    readlineSync.question(zaslon(query), {
        hideEchoBack: true,
        mask: ''
    });
}

global.zamenjaj = function zamenjaj(chars, str) {
    if (typeof str === 'string') {
        return str.replace(/[^A-Za-z0-9]/g, function(x) {
            return chars[x] || x;
        });
    } else {
        return str;
    }
}

global.posljimejl = function posljimejl(email, gbp, title, body) {
    const nodemailer = require("nodemailer");

    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: "helloworld@racunalniski-muzej.si",
            pass: "------------",
        },
    });

    transporter.sendMail = transporter.sendMail.bind(transporter);

    sendm = deasync(transporter.sendMail);
    let info = sendm({
        from: '"Računalniški muzej" <helloworld@racunalniski-muzej.si>',
        to: email,
        subject: title,
        html: body,
        attachments: [{
            filename: 'Photo.jpg',
            content: gbp
        }]
    });
}

fujitsu = {
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

pc852 = {
    'Š': '\xe6',
    'Đ': '\xd1',
    'Ć': '\x8f',
    'Č': '\xac',
    'Ž': '\xa6',
    'š': '\xe7',
    'đ': '\xd0',
    'ć': '\x86',
    'č': '\x9f',
    'ž': '\xa7'
};

vt320 = {
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

paka3000 = {
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

lk201 = {
    "{": "Š",
    ":": "Č",
    "|": "Ž",
    "}": "Ć",
    "\"": "Đ",
    "[": "š",
    ";": "č",
    "\\": "ž",
    "]": "ć",
    "'": "đ"
};

triglav = {
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

global.vt320drcs = function vt320drcs() {
    if (tty != "vt320") return '';
    return "\033P1;1;1;0;0;2;0;0{P??oowHHIIHHWOO?/??CCLHHHHHHNEE?;" +
        "??_ooXHIIHHWOO?/??BFFKGGGGGKCC?;???GGHHIIhxwW??/???KKMIJHHGGG??;" +
        "??_ooWGIIHHWOO?/??BFFKGGGGGKCC?;??wwwGGGGGWoo_?/@@NNNHHGGGKFFB?;" +
        "?????ccggcc__??/???@HJIIIIIMCC?;?????ccggcc_???/??AFFLGGGGGLDD?;" +
        "???__ccggcc__??/???KKKIIIHHHG??;?????__ggcc_???/??AFFLGGGGGLDD?;" +
        "?????____oOwwwO/??AFFLGGGGDNNN?\033\\" + '\033[1$}\033[7m\r' +
        zaslon(center((slo ? 'Dostop do zbirk Računalniškega muzeja - https://zbirka.muzej.si/' :
            'Slovenian computer museum collection - https://zbirka.muzej.si/'), true)) + '\033[0$}';
}
