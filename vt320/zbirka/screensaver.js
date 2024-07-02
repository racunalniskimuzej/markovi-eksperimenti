const message = "Pritisnite tipko... / Press a key...";

const ttyname = require('ttyname');
global.fs = require('fs');
global.tty = 'ssh';
try {
    if (fs.existsSync('/dev/vt320') && fs.realpathSync('/dev/vt320') == ttyname()) global.tty = 'vt320';
    if (fs.existsSync('/dev/paka3000') && fs.realpathSync('/dev/paka3000') == ttyname()) global.tty = 'paka3000';
} catch (e) {}

const sleep = require('await-sleep');

const readline = require('readline');
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

process.stdin.on('keypress', (str, key) => {
    process.stdout.write('\033[2J');
    process.exit(1);

})

function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function init() {
    while (true) {
        process.stdout.write('\033[2J');
        process.stdout.write('\033[' + randomInteger(1, 24) + ';' + randomInteger(1, 80 - message.length) + 'H' + message);
        await sleep(2000);
    }
}

if (global.tty == "vt320") {
    process.stdout.write('\033[1$}' + '\033[27m' + '\r' + " ".repeat(80) + '\033[0$}');
}
init()
