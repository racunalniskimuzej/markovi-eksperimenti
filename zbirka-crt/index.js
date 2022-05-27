/*!
 * AnderShell - Just a small CSS demo
 *
 * Copyright (c) 2011-2018, Anders Evenrud <andersevenrud@gmail.com>
 * All rights reserved.
 * Source for this fork: https://github.com/markostamcar/muzej.si/tree/master/zbirka-crt
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice, this
 *    list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 *    this list of conditions and the following disclaimer in the documentation
 *    and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
 * ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
import './src/styles.scss';
import {
  terminal
} from './src/terminal.js';

var slo = true;
const jezik = (sl) => {
  slo = sl;
  return (slo ? helpTextSlo : helpTextEn);
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
* najdi <beseda> - Izpiše IDje eksponatov, ki vsebujejo iskane besede.
* eksponat <id> - Izpiše podatke o eksponatu.
* razstave [id] - Izpiše seznam razstav; če je naveden ID, pa info o razstavi.
* statistika - Izpiše statistiko celotne zbirke.
* pocisti - Počisti zaslon.
* ENGLISH - Switch to English language. (NOTE: Entries not yet translated.)`;

const helpTextEn = `
Commands:
* find <keyword> - Lists item IDs matching the keywords.
* item <id> - Displays details about an item.
* exhibitions [id] - List all exibitions or details of one specified by ID.
* stats - Displays collection statistics.
* clear - Clears the screen.
* SLOVENSKI - Preklopi na slovenščino.`;

var vec = '';
var fotka = '';
const najdi2 = (t, url) => {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url);

  xhr.onload = function() {
    try {
      var json = JSON.parse(xhr.responseText);
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
      t.print(out, false);
    } catch (e) {
      t.print((slo ? "Ni zadetkov." : "No results."), false);
    }
  };

  xhr.send();
  return 'NOPROMPT';
};

const razstave2 = (t, url) => {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url);

  xhr.onload = function() {
    try {
      var json = JSON.parse(xhr.responseText);
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
      t.print(out, false);
    } catch (e) {
      t.print((slo ? "Razstava s tem ID ne obstaja." : "Exhibition with this ID not found."), false);
    }
  };

  xhr.send();
  return 'NOPROMPT';
};

const vec2 = (t) => {
  if (vec) {
    return (vec.includes('/api/eksponati/') ? najdi2(t, proxy(vec)) : razstave2(t, proxy(vec)));
  } else {
    return (slo ? 'Ni več zadetkov.' : 'No more results.');
  }
}

const proxy = (url) => {
  return (!window.location.href.includes('stamcar') ? url : 'proxy.php?url=' + encodeURIComponent(url));
};

const hashchange = (t) => {
  var cmd = decodeURIComponent(window.location.hash.replace("#", "").replace("=", " ").replace(/\+/g, " "));
  t.print("NOPROMPT\n" + cmd, false);
  t.parse(cmd);
};

///////////////////////////////////////////////////////////////////////////////
// MAIN
///////////////////////////////////////////////////////////////////////////////

const load = () => {
  const t = terminal({
    prompt: () => `$ > `,
    banner,
    buflen: 32,
    commands: self = {
      pomoc: () => self.slovenski(),
      pomoč: () => self.pomoc(),
      pocisti: () => t.clear(),
      počisti: () => self.pocisti(),
      najdi: function najdi(...geslo) {
        var url = proxy('/api/eksponati/?kveri=' + (geslo.length > 0 ? geslo.join('+') : 'undefined'));
        return najdi2(t, url);
      },
      razstave: function razstave(id) {
        var url = proxy('/api/razstave/' + (id ? id.replace('#', '') + '/' : ''));
        return razstave2(t, url);
      },
      eksponat: function eksponat(id) {
        fotka = '';
        var xhr = new XMLHttpRequest();
        xhr.open('GET', proxy('/api/eksponati/' + (id ? id.replace('#', '') + '/' : 'undefined')));
        xhr.onload = function() {
          try {
            var obj = JSON.parse(xhr.responseText);
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
            if (obj.fotografija) {
              fotka = obj.fotografija;
              out += (slo ? "\n(Na voljo je fotografija eksponata - za prikaz napišite 'fotka')" : "\n(A photo of this item is available - type 'photo' to display it)");
            }
            out += "\n";
            t.print(out, false);
          } catch (e) {
            t.print((slo ? "Eksponat s tem ID ne obstaja." : "Item with this ID not found."), false);
          }
        };

        xhr.send();
        return 'NOPROMPT';
      },
      statistika: () => {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', proxy('/api/statistika/'));
        xhr.onload = function() {
          try {
            var arr = JSON.parse(xhr.responseText);
            var out = '';
            for (var i = 0; i < arr.length; i++) {
              if (arr[i].eksponatov > 0) {
                out += arr[i].eksponatov + " x " + arr[i].ime;
                out += "\n";
              }
            }
            t.print(out, false);
          } catch (e) {
            t.print((slo ? "Prišlo je do napake." : "An error occured"), false);
          }
        };

        xhr.send();
        return 'NOPROMPT';
      },
      vec: () => vec2(t),
      več: () => self.vec(),
      fotka: () => {
        if (fotka) {
          window.open(fotka);
          return 'NOLINE';
        } else {
          return (slo ? 'Fotografija ni na voljo.' : 'Photo is not available.');
        }
      },
      format: () => {
        window.open('https://archive.org/details/GorillasQbasic');
        return 'NOLINE';
      },
      rm: () => self.format(),
      english: () => {
        return jezik(false);
      },
      slovenski: () => {
        return jezik(true);
      },
      find: (...geslo) => self.najdi(...geslo),
      item: (id) => self.eksponat(id),
      exhibitions: (id) => self.razstave(id),
      stats: () => self.statistika(),
      photo: () => self.fotka(),
      clear: () => self.pocisti(),
      more: () => self.vec(),
      help: () => self.english()
    }
  });

  t.print((slo ? helpTextSlo : helpTextEn) + '\n', false);

  if (window.location.hash) hashchange(t);
  window.onhashchange = function() {
    hashchange(t);
  };
};

document.addEventListener('DOMContentLoaded', load);
