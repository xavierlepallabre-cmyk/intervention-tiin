/* Intervention TIIN — Tenues : silhouette de l'intervenant en couches (schéma de principe).
   Chaque équipement est un calque <g data-c="…"> que les vues affichent, retirent ou mettent en évidence. */
(function(){
"use strict";
const TRONC="M162 118 L258 118 L248 170 L244 272 L176 272 L172 170 Z";
const BRAS_G="M162 118 L138 190 L122 258 L142 262 L158 200 L172 170 Z";
const BRAS_D="M258 118 L282 190 L298 258 L278 262 L262 200 L248 170 Z";
const JAMBES="M176 272 L172 360 L176 446 L200 446 L210 300 L220 446 L244 446 L248 360 L244 272 Z";
const CORPS=TRONC+" "+BRAS_G+" "+BRAS_D+" "+JAMBES;
const ech=(k,inner)=>`<g transform="translate(210 280) scale(${k}) translate(-210 -280)">${inner}</g>`;
const mains=(cls,r)=>`<circle class="${cls}" cx="131" cy="272" r="${r}"/><circle class="${cls}" cx="289" cy="272" r="${r}"/>`;
const pieds=(cls,rx,ry)=>`<ellipse class="${cls}" cx="186" cy="455" rx="${rx}" ry="${ry}"/><ellipse class="${cls}" cx="234" cy="455" rx="${rx}" ry="${ry}"/>`;
const CAPUCHE="M168 128 C 160 60, 182 30, 210 30 C 238 30, 260 60, 252 128 Z";

function silhouette(opts){
  opts=opts||{};const id=opts.id||"tenue";
  return `<svg class="sch silhouette" role="img" aria-labelledby="${id}Titre" viewBox="0 0 420 500">
  <title id="${id}Titre">${opts.titre||"Intervenant vu de face, avec ses équipements de protection superposés"}</title>
  <defs><pattern id="${id}Hach" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line class="t-hach" x1="0" y1="0" x2="0" y2="7"/></pattern></defs>
  <g class="peau"><rect x="200" y="96" width="20" height="16"/><circle cx="210" cy="78" r="26"/>${mains("",10)}</g>
  <g class="visage" data-c="visage"><circle cx="201" cy="76" r="2.4"/><circle cx="219" cy="76" r="2.4"/><path d="M202 90 Q210 95 218 90"/></g>
  <g class="couche" data-c="dessous"><path class="t-dessous" d="${CORPS}"/></g>
  <g class="couche" data-c="bleu"><path class="t-bleu" d="${CORPS}"/><path class="t-pli" d="M210 120 V270"/></g>
  <g class="couche" data-c="chaussures">${pieds("t-chaussure",17,8)}</g>
  <g class="couche" data-c="dosi"><rect class="t-dosi-p" x="178" y="138" width="14" height="18" rx="2"/><rect class="t-dosi-o" x="226" y="136" width="16" height="22" rx="3"/><rect class="t-ecran" x="229" y="140" width="10" height="6"/></g>
  <g class="couche" data-c="gants-coton">${mains("t-coton",11)}</g>
  <g class="couche" data-c="everest">${ech(1.05,`<path class="t-blanc" d="${CORPS}"/><path class="t-pli" d="M210 122 V268"/>`)}</g>
  <g class="couche" data-c="surbottes">${pieds("t-surbotte",21,11)}</g>
  <g class="couche" data-c="gants">${mains("t-gant",13)}</g>
  <g class="couche" data-c="surtenue">${ech(1.1,`<path class="t-surtenue" d="${CORPS}"/><path class="t-surtenue-h" d="${CORPS}" fill="url(#${id}Hach)"/>`)}</g>
  <g class="couche" data-c="surbottes2">${pieds("t-surbotte",24,13)}</g>
  <g class="couche" data-c="cagoule"><circle class="t-blanc" cx="210" cy="76" r="31"/><path class="t-blanc" d="M196 100 H224 V116 H196 Z"/><ellipse class="t-visage" cx="210" cy="80" rx="15" ry="18"/>
    <circle class="t-oeil" cx="203" cy="76" r="2.2"/><circle class="t-oeil" cx="217" cy="76" r="2.2"/></g>
  <g class="couche" data-c="casque"><path class="t-casque" d="M182 70 C 182 42, 238 42, 238 70 Z"/><rect class="t-casque" x="178" y="66" width="64" height="7" rx="3"/></g>
  <g class="couche" data-c="lunettes"><rect class="t-lunettes" x="194" y="72" width="13" height="8" rx="3"/><rect class="t-lunettes" x="213" y="72" width="13" height="8" rx="3"/><path class="t-pont" d="M207 76 H213"/></g>
  <g class="couche" data-c="masque"><path class="t-masque" d="M194 72 H226 L230 92 Q210 106 190 92 Z"/><circle class="t-cartouche" cx="210" cy="98" r="8"/><path class="t-sangle" d="M194 76 L182 74 M226 76 L238 74"/></g>
  <g class="couche" data-c="heaume"><path class="t-pvc" d="M164 160 C 156 60, 182 26, 210 26 C 238 26, 264 60, 256 160 Z"/><rect class="t-visiere" x="186" y="58" width="48" height="42" rx="10"/></g>
  <g class="couche" data-c="ceinture"><rect class="t-ceinture" x="172" y="246" width="76" height="9" rx="3"/></g>
  <g class="couche" data-c="tev-bas">${ech(1.14,`<path class="t-pvc" d="${JAMBES}"/>`)}${pieds("t-pvc",24,12)}</g>
  <g class="couche" data-c="tev-enroule"><rect class="t-roule" x="168" y="258" width="84" height="22" rx="10"/></g>
  <g class="couche" data-c="tev-tronc">${ech(1.14,`<path class="t-pvc" d="${TRONC}"/>`)}<path class="t-pvc" d="${CAPUCHE}"/><rect class="t-visiere" x="186" y="56" width="48" height="44" rx="10"/></g>
  <g class="couche" data-c="tev-bras">${ech(1.14,`<path class="t-pvc" d="${BRAS_G} ${BRAS_D}"/>`)}${mains("t-pvc",14)}</g>
  <g class="couche" data-c="bande"><path class="t-bande" d="M127 262 L150 150 C 160 110, 176 34, 210 32 C 244 34, 260 110, 270 150 L293 262"/></g>
  <g class="couche" data-c="bande-ouverte"><path class="t-ouverture" d="M127 262 L150 150 C 160 110, 176 34, 210 32 C 244 34, 260 110, 270 150 L293 262"/></g>
  <g class="couche" data-c="fixateur">${[[178,60],[240,58],[160,120],[262,124],[196,40],[226,36],[150,170],[270,176],[210,20]].map(([x,y])=>`<circle class="t-spray" cx="${x}" cy="${y}" r="3"/>`).join("")}
    <path class="t-pulve" d="M330 60 L300 70 M330 60 L304 54 M330 60 L306 84"/><rect class="t-bombe" x="330" y="46" width="18" height="34" rx="4"/></g>
  <g class="couche" data-c="flexible"><path class="t-flex" d="M236 252 C 300 260, 300 340, 340 350 S 372 380, 372 400"/></g>
  <g class="couche" data-c="ufs"><rect class="t-ufs" x="338" y="398" width="66" height="54" rx="6"/><text class="t-moyen" x="371" y="430" text-anchor="middle">UFS</text><text class="t-petit" x="371" y="470" text-anchor="middle">air filtré</text></g>
  <g class="couche" data-c="debit"><circle class="t-bouton" cx="248" cy="250" r="7"/><path class="t-pont" d="M248 245 V250"/></g>
  <g class="couche" data-c="lacets"><path class="t-lacet" d="M166 448 Q186 440 206 448 M214 448 Q234 440 254 448"/></g>
  <g class="couche" data-c="gants-neufs">${mains("t-gant-neuf",13)}</g>
  ${(opts.marqueurs||[]).map((m,i)=>`<g class="marq couche" data-m="${i}" aria-hidden="true"><circle cx="${m[0]}" cy="${m[1]}" r="12"/><text x="${m[0]}" y="${m[1]+4}" text-anchor="middle">${i+1}</text></g>`).join("")}
</svg>`;
}

function nav(courant){
  const l=[["habillage","Selon la zone"],["tev","Mettre une TEV"],["deshabillage","Retirer une TEV"],["catalogue","Catalogue"],["defi-ordre","Défi : l’ordre"],["defi-choix","Défi : quelle tenue ?"]];
  return `<nav class="segment" aria-label="Activités des tenues">${l.map(([id,t])=>`<a href="#/tenues/${id}"${id===courant?' aria-current="page"':""}>${t}</a>`).join("")}</nav>`;
}
window.ITTenuesDessin={silhouette,nav};
})();
