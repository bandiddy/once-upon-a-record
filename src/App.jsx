import { useState, useEffect, useRef, useCallback } from "react";

/* ─────────────────────────────────────────────────────────────
   PALETTE — extracted directly from the logo image
   · Golden yellow vinyl:   #E2C227
   · Deep navy banner:      #1A1A5E  (Disneyland arc)
   · Crimson red:           #C0182A  (record label ring)
   · Rainbow orange:        #E8641A
   · Rainbow amber:         #E8A020
   · Warm near-black bg:    #0D0A00  (the black behind logo)
   · Cream text:            #F7F0DC
───────────────────────────────────────────────────────────── */
const C = {
  gold:        "#E2C227",   // vinyl yellow
  goldLight:   "#F0D84A",
  goldDark:    "#A88C10",
  navy:        "#1A1A5E",   // Disneyland banner
  navyLight:   "#2A2A80",
  crimson:     "#C0182A",   // record ring red
  orange:      "#E8641A",   // rainbow
  amber:       "#E8A020",   // rainbow
  ink:         "#0D0A00",   // warm near-black
  cream:       "#F7F0DC",
  creambright: "#FDFAF0",
  muted:       "#8A7D5A",
  warm:        "#EDE3C8",
};

const YT_CHANNEL  = "https://www.youtube.com/@onceuponarecord/videos";
const PATREON_URL = "https://www.patreon.com/onceuponarecord";

/* ─── Data ────────────────────────────────────────────────── */

/* ── SVG placeholder thumbnails — Disney-infused, fully self-contained ── */

/* GOLDEN AGE 1 — Snow White's wishing well + record, golden forest */
const SVG_GOLDEN_1 = `data:image/svg+xml,${encodeURIComponent(`<svg viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="g1bg" cx="50%" cy="40%" r="70%"><stop offset="0%" stop-color="#4A3800"/><stop offset="100%" stop-color="#1A1200"/></radialGradient>
    <radialGradient id="g1glow" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#E2C227" stop-opacity="0.3"/><stop offset="100%" stop-color="#E2C227" stop-opacity="0"/></radialGradient>
  </defs>
  <rect width="600" height="400" fill="url(#g1bg)"/>
  <rect width="600" height="400" fill="url(#g1glow)"/>
  <!-- film strip borders -->
  <rect x="0" y="0" width="55" height="400" fill="#080600" opacity="0.75"/>
  <rect x="545" y="0" width="55" height="400" fill="#080600" opacity="0.75"/>
  <rect x="8" y="20" width="39" height="48" rx="2" fill="#E2C227" opacity="0.08"/><rect x="8" y="80" width="39" height="48" rx="2" fill="#E2C227" opacity="0.08"/><rect x="8" y="140" width="39" height="48" rx="2" fill="#E2C227" opacity="0.08"/><rect x="8" y="200" width="39" height="48" rx="2" fill="#E2C227" opacity="0.08"/><rect x="8" y="260" width="39" height="48" rx="2" fill="#E2C227" opacity="0.08"/><rect x="8" y="320" width="39" height="48" rx="2" fill="#E2C227" opacity="0.08"/>
  <rect x="553" y="20" width="39" height="48" rx="2" fill="#E2C227" opacity="0.08"/><rect x="553" y="80" width="39" height="48" rx="2" fill="#E2C227" opacity="0.08"/><rect x="553" y="140" width="39" height="48" rx="2" fill="#E2C227" opacity="0.08"/><rect x="553" y="200" width="39" height="48" rx="2" fill="#E2C227" opacity="0.08"/><rect x="553" y="260" width="39" height="48" rx="2" fill="#E2C227" opacity="0.08"/>
  <!-- enchanted forest trees — bolder -->
  <polygon points="60,360 105,185 150,360" fill="#0D0A00" opacity="0.85"/>
  <polygon points="95,360 145,165 195,360" fill="#0D0A00" opacity="0.8"/>
  <polygon points="415,360 460,168 505,360" fill="#0D0A00" opacity="0.8"/>
  <polygon points="448,360 492,185 536,360" fill="#0D0A00" opacity="0.85"/>
  <!-- dwarfs cottage silhouette bottom left -->
  <rect x="65" y="300" width="70" height="55" fill="#1A1000" stroke="#E2C227" stroke-width="0.8" opacity="0.7"/>
  <polygon points="55,302 100,268 145,302" fill="#1A1000" stroke="#E2C227" stroke-width="0.8" opacity="0.7"/>
  <rect x="90" y="318" width="20" height="28" fill="#0D0A00" opacity="0.8"/>
  <rect x="70" y="308" width="16" height="14" rx="1" fill="#E2C227" opacity="0.12"/>
  <rect x="112" y="308" width="16" height="14" rx="1" fill="#E2C227" opacity="0.12"/>
  <!-- chimney with smoke -->
  <rect x="120" y="255" width="12" height="22" fill="#1A1000" stroke="#E2C227" stroke-width="0.8" opacity="0.65"/>
  <path d="M126 255 Q128 242 124 232 Q120 222 125 215" fill="none" stroke="#E2C227" stroke-width="1.5" stroke-linecap="round" opacity="0.3"/>
  <!-- Snow White wishing well — bigger and brighter -->
  <rect x="240" y="255" width="120" height="80" rx="3" fill="#1C1600" stroke="#E2C227" stroke-width="1.5" opacity="0.9"/>
  <ellipse cx="300" cy="255" rx="60" ry="16" fill="#1C1600" stroke="#E2C227" stroke-width="1.5" opacity="0.9"/>
  <line x1="265" y1="255" x2="265" y2="188" stroke="#E2C227" stroke-width="1.5" opacity="0.75"/>
  <line x1="335" y1="255" x2="335" y2="188" stroke="#E2C227" stroke-width="1.5" opacity="0.75"/>
  <path d="M248 188 Q300 165 352 188" fill="none" stroke="#E2C227" stroke-width="2.5" opacity="0.8"/>
  <line x1="300" y1="172" x2="300" y2="140" stroke="#E2C227" stroke-width="1.5" opacity="0.75"/>
  <polygon points="278,140 300,118 322,140" fill="#E2C227" opacity="0.7"/>
  <!-- wishing well bucket -->
  <rect x="286" y="210" width="28" height="22" rx="2" fill="#2A1E00" stroke="#E2C227" stroke-width="1.2" opacity="0.9"/>
  <path d="M286 210 Q300 202 314 210" fill="none" stroke="#E2C227" stroke-width="1" opacity="0.7"/>
  <!-- poison apple — bold and vivid -->
  <circle cx="300" cy="345" r="22" fill="#C0182A" opacity="0.7"/>
  <path d="M296 323 Q300 312 306 316" fill="none" stroke="#A07000" stroke-width="2" stroke-linecap="round" opacity="0.8"/>
  <path d="M298 316 Q292 308 286 312" fill="none" stroke="#2A4000" stroke-width="1.5" stroke-linecap="round" opacity="0.7"/>
  <circle cx="310" cy="336" r="6" fill="#F0F0F0" opacity="0.18"/>
  <!-- record beneath -->
  <circle cx="300" cy="345" r="40" fill="none" stroke="#E2C227" stroke-width="0.8" opacity="0.3"/>
  <!-- gold sparkles -->
  <circle cx="200" cy="80"  r="2.5" fill="#E2C227" opacity="0.8"/>
  <circle cx="380" cy="60"  r="2" fill="#E2C227" opacity="0.65"/>
  <circle cx="450" cy="100" r="2.5" fill="#E2C227" opacity="0.7"/>
  <circle cx="160" cy="130" r="2" fill="#E2C227" opacity="0.55"/>
  <circle cx="420" cy="140" r="2" fill="#E2C227" opacity="0.6"/>
  <path d="M210 110 L213 102 L218 110 L213 118 Z" fill="#E2C227" opacity="0.55"/>
  <path d="M430 80 L433 72 L438 80 L433 88 Z" fill="#E2C227" opacity="0.5"/>
  <text x="300" y="392" text-anchor="middle" font-family="Georgia,serif" font-size="12" fill="#E2C227" opacity="0.65" letter-spacing="4">GOLDEN AGE  ·  1937</text>
</svg>`)}`;

/* GOLDEN AGE 2 — Fantasia: sorcerer hat, enchanted brooms, magic */
const SVG_GOLDEN_2 = `data:image/svg+xml,${encodeURIComponent(`<svg viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g2bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#2A1E00"/><stop offset="100%" stop-color="#0E0A00"/></linearGradient>
  </defs>
  <rect width="600" height="400" fill="url(#g2bg)"/>
  <!-- Sorcerer hat — large centred -->
  <polygon points="300,18 248,170 352,170" fill="#16165A" stroke="#E2C227" stroke-width="2" opacity="0.95"/>
  <ellipse cx="300" cy="172" rx="66" ry="16" fill="#16165A" stroke="#E2C227" stroke-width="2" opacity="0.95"/>
  <line x1="252" y1="148" x2="348" y2="148" stroke="#E2C227" stroke-width="2" opacity="0.8"/>
  <path d="M277 65 L280 56 L283 65 L280 74 Z" fill="#E2C227" opacity="0.9"/>
  <circle cx="310" cy="88" r="4" fill="#E2C227" opacity="0.88"/>
  <path d="M274 105 L277 97 L280 105 L277 113 Z" fill="#E2C227" opacity="0.82"/>
  <circle cx="318" cy="128" r="3" fill="#E2C227" opacity="0.78"/>
  <!-- magic burst from tip -->
  <line x1="300" y1="18" x2="300" y2="0"  stroke="#E2C227" stroke-width="2" opacity="0.7"/>
  <line x1="300" y1="18" x2="326" y2="2"  stroke="#E2C227" stroke-width="2" opacity="0.65"/>
  <line x1="300" y1="18" x2="274" y2="2"  stroke="#E2C227" stroke-width="2" opacity="0.65"/>
  <circle cx="300" cy="0"  r="4" fill="#E2C227" opacity="0.9"/>
  <circle cx="328" cy="0"  r="3" fill="#E2C227" opacity="0.82"/>
  <circle cx="272" cy="0"  r="3" fill="#E2C227" opacity="0.82"/>
  <!-- enchanted broom left -->
  <rect x="148" y="200" width="10" height="148" rx="4" fill="#C8A010" opacity="0.85"/>
  <rect x="126" y="212" width="14" height="20" rx="2" fill="#7FA8C4" opacity="0.7"/>
  <rect x="158" y="212" width="14" height="20" rx="2" fill="#7FA8C4" opacity="0.7"/>
  <line x1="133" y1="212" x2="148" y2="196" stroke="#C8A010" stroke-width="2" opacity="0.7"/>
  <line x1="165" y1="212" x2="153" y2="196" stroke="#C8A010" stroke-width="2" opacity="0.7"/>
  <ellipse cx="153" cy="350" rx="24" ry="8" fill="#A07000" opacity="0.75"/>
  <line x1="130" y1="346" x2="176" y2="354" stroke="#7A5000" stroke-width="1.5" opacity="0.65"/>
  <line x1="134" y1="352" x2="172" y2="358" stroke="#7A5000" stroke-width="1.2" opacity="0.58"/>
  <path d="M124 222 Q110 236 114 252" fill="none" stroke="#7FA8C4" stroke-width="2" stroke-linecap="round" opacity="0.5"/>
  <!-- enchanted broom right -->
  <rect x="444" y="200" width="10" height="148" rx="4" fill="#C8A010" opacity="0.8"/>
  <rect x="422" y="212" width="14" height="20" rx="2" fill="#7FA8C4" opacity="0.65"/>
  <rect x="454" y="212" width="14" height="20" rx="2" fill="#7FA8C4" opacity="0.65"/>
  <ellipse cx="449" cy="350" rx="24" ry="8" fill="#A07000" opacity="0.7"/>
  <line x1="426" y1="346" x2="472" y2="354" stroke="#7A5000" stroke-width="1.5" opacity="0.6"/>
  <!-- water swirl at bottom -->
  <path d="M80 370 Q150 355 220 370 Q290 385 360 370 Q430 355 520 370" fill="none" stroke="#7FA8C4" stroke-width="2" opacity="0.35"/>
  <path d="M80 382 Q160 368 240 382 Q320 396 400 382 Q480 368 530 382" fill="none" stroke="#7FA8C4" stroke-width="1.5" opacity="0.25"/>
  <!-- animator desk suggestion -->
  <rect x="195" y="265" width="210" height="90" rx="3" fill="#1A1400" stroke="#E2C227" stroke-width="0.8" opacity="0.5"/>
  <line x1="215" y1="278" x2="348" y2="278" stroke="#E2C227" stroke-width="0.7" opacity="0.12"/>
  <line x1="215" y1="291" x2="338" y2="291" stroke="#E2C227" stroke-width="0.7" opacity="0.12"/>
  <line x1="215" y1="248" x2="200" y2="348" stroke="#C8A010" stroke-width="4" stroke-linecap="round" opacity="0.6"/>
  <polygon points="200,348 194,366 210,356" fill="#E2C227" opacity="0.65"/>
  <circle cx="460" cy="70" r="2.5" fill="#E2C227" opacity="0.62"/>
  <circle cx="120" cy="92" r="2"   fill="#E2C227" opacity="0.55"/>
  <circle cx="510" cy="130" r="2"  fill="#E2C227" opacity="0.5"/>
  <circle cx="78"  cy="145" r="2"  fill="#E2C227" opacity="0.5"/>
  <text x="300" y="392" text-anchor="middle" font-family="Georgia,serif" font-size="12" fill="#E2C227" opacity="0.65" letter-spacing="4">FANTASIA  ·  1940</text>
</svg>`)}`;

/* SILVER AGE 1 — Cinderella's castle on screen + cinema seats */
const SVG_SILVER_1 = `data:image/svg+xml,${encodeURIComponent(`<svg viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="s1bg" cx="50%" cy="60%" r="80%"><stop offset="0%" stop-color="#0A1828"/><stop offset="100%" stop-color="#040810"/></radialGradient>
    <radialGradient id="projbeam" cx="15%" cy="30%" r="85%"><stop offset="0%" stop-color="#7FA8C4" stop-opacity="0.22"/><stop offset="100%" stop-color="#7FA8C4" stop-opacity="0"/></radialGradient>
  </defs>
  <rect width="600" height="400" fill="url(#s1bg)"/>
  <rect width="600" height="400" fill="url(#projbeam)"/>
  <!-- cinema screen frame -->
  <rect x="60" y="30" width="480" height="210" rx="3" fill="#7FA8C4" fill-opacity="0.05" stroke="#7FA8C4" stroke-width="1" opacity="0.3"/>
  <!-- Cinderella castle — bold silhouette on screen -->
  <!-- castle glow backdrop -->
  <ellipse cx="300" cy="165" rx="155" ry="100" fill="#7FA8C4" opacity="0.07"/>
  <!-- main keep -->
  <rect x="238" y="128" width="124" height="102" fill="#7FA8C4" opacity="0.38"/>
  <!-- centre main spire — tall and prominent -->
  <polygon points="300,38 282,128 318,128" fill="#7FA8C4" opacity="0.72"/>
  <!-- centre spire tip flag -->
  <line x1="300" y1="38" x2="300" y2="22" stroke="#7FA8C4" stroke-width="1.5" opacity="0.7"/>
  <polygon points="300,22 312,30 300,38" fill="#7FA8C4" opacity="0.65"/>
  <!-- left main tower -->
  <rect x="188" y="150" width="52" height="80" fill="#7FA8C4" opacity="0.32"/>
  <polygon points="214,88 200,150 228,150" fill="#7FA8C4" opacity="0.58"/>
  <line x1="214" y1="88" x2="214" y2="74" stroke="#7FA8C4" stroke-width="1.5" opacity="0.62"/>
  <!-- right main tower -->
  <rect x="358" y="150" width="52" height="80" fill="#7FA8C4" opacity="0.32"/>
  <polygon points="384,88 370,150 398,150" fill="#7FA8C4" opacity="0.58"/>
  <line x1="384" y1="88" x2="384" y2="74" stroke="#7FA8C4" stroke-width="1.5" opacity="0.62"/>
  <!-- outer left turret -->
  <rect x="146" y="168" width="44" height="62" fill="#7FA8C4" opacity="0.26"/>
  <polygon points="168,118 155,168 181,168" fill="#7FA8C4" opacity="0.46"/>
  <!-- outer right turret -->
  <rect x="408" y="168" width="44" height="62" fill="#7FA8C4" opacity="0.26"/>
  <polygon points="430,118 417,168 443,168" fill="#7FA8C4" opacity="0.46"/>
  <!-- castle base wall -->
  <rect x="146" y="228" width="308" height="14" fill="#7FA8C4" opacity="0.38"/>
  <!-- battlements on top of keep -->
  <rect x="242" y="120" width="12" height="10" fill="#7FA8C4" opacity="0.45"/>
  <rect x="262" y="120" width="12" height="10" fill="#7FA8C4" opacity="0.45"/>
  <rect x="326" y="120" width="12" height="10" fill="#7FA8C4" opacity="0.45"/>
  <rect x="346" y="120" width="12" height="10" fill="#7FA8C4" opacity="0.45"/>
  <!-- castle gate arch — bigger -->
  <path d="M272 230 Q300 205 328 230" fill="none" stroke="#7FA8C4" stroke-width="2" opacity="0.58"/>
  <rect x="283" y="214" width="34" height="28" fill="#0A1828" opacity="0.6"/>
  <!-- windows lit with silver glow -->
  <rect x="256" y="148" width="16" height="20" rx="2" fill="#7FA8C4" opacity="0.22"/>
  <rect x="328" y="148" width="16" height="20" rx="2" fill="#7FA8C4" opacity="0.22"/>
  <!-- moon behind castle -->
  <circle cx="300" cy="50" r="28" fill="#7FA8C4" opacity="0.08"/>
  <circle cx="300" cy="50" r="24" fill="none" stroke="#7FA8C4" stroke-width="1" opacity="0.2"/>
  <!-- projector beam -->
  <line x1="80" y1="100" x2="540" y2="40"  stroke="#7FA8C4" stroke-width="0.5" opacity="0.1"/>
  <line x1="80" y1="120" x2="540" y2="240" stroke="#7FA8C4" stroke-width="0.5" opacity="0.1"/>
  <!-- dust motes -->
  <circle cx="150" cy="90" r="1.5" fill="#7FA8C4" opacity="0.4"/><circle cx="220" cy="80" r="1.5" fill="#7FA8C4" opacity="0.35"/><circle cx="320" cy="75" r="1.5" fill="#7FA8C4" opacity="0.4"/><circle cx="420" cy="85" r="1.5" fill="#7FA8C4" opacity="0.35"/><circle cx="500" cy="78" r="1.5" fill="#7FA8C4" opacity="0.4"/>
  <!-- cinema seats -->
  <rect x="60"  y="290" width="38" height="22" rx="5" fill="#0A1828" stroke="#7FA8C4" stroke-width="1" opacity="0.45"/>
  <rect x="112" y="290" width="38" height="22" rx="5" fill="#0A1828" stroke="#7FA8C4" stroke-width="1" opacity="0.45"/>
  <rect x="164" y="290" width="38" height="22" rx="5" fill="#0A1828" stroke="#7FA8C4" stroke-width="1" opacity="0.45"/>
  <rect x="216" y="290" width="38" height="22" rx="5" fill="#0A1828" stroke="#7FA8C4" stroke-width="1" opacity="0.45"/>
  <rect x="268" y="290" width="38" height="22" rx="5" fill="#0A1828" stroke="#7FA8C4" stroke-width="1" opacity="0.45"/>
  <rect x="320" y="290" width="38" height="22" rx="5" fill="#0A1828" stroke="#7FA8C4" stroke-width="1" opacity="0.45"/>
  <rect x="372" y="290" width="38" height="22" rx="5" fill="#0A1828" stroke="#7FA8C4" stroke-width="1" opacity="0.45"/>
  <rect x="424" y="290" width="38" height="22" rx="5" fill="#0A1828" stroke="#7FA8C4" stroke-width="1" opacity="0.45"/>
  <rect x="476" y="290" width="38" height="22" rx="5" fill="#0A1828" stroke="#7FA8C4" stroke-width="1" opacity="0.45"/>
  <rect x="528" y="290" width="38" height="22" rx="5" fill="#0A1828" stroke="#7FA8C4" stroke-width="1" opacity="0.45"/>
  <rect x="60"  y="322" width="38" height="22" rx="5" fill="#0A1828" stroke="#7FA8C4" stroke-width="1" opacity="0.5"/>
  <rect x="112" y="322" width="38" height="22" rx="5" fill="#0A1828" stroke="#7FA8C4" stroke-width="1" opacity="0.5"/>
  <rect x="164" y="322" width="38" height="22" rx="5" fill="#0A1828" stroke="#7FA8C4" stroke-width="1" opacity="0.5"/>
  <rect x="216" y="322" width="38" height="22" rx="5" fill="#0A1828" stroke="#7FA8C4" stroke-width="1" opacity="0.5"/>
  <rect x="268" y="322" width="38" height="22" rx="5" fill="#0A1828" stroke="#7FA8C4" stroke-width="1" opacity="0.5"/>
  <rect x="320" y="322" width="38" height="22" rx="5" fill="#0A1828" stroke="#7FA8C4" stroke-width="1" opacity="0.5"/>
  <rect x="372" y="322" width="38" height="22" rx="5" fill="#0A1828" stroke="#7FA8C4" stroke-width="1" opacity="0.5"/>
  <rect x="424" y="322" width="38" height="22" rx="5" fill="#0A1828" stroke="#7FA8C4" stroke-width="1" opacity="0.5"/>
  <rect x="476" y="322" width="38" height="22" rx="5" fill="#0A1828" stroke="#7FA8C4" stroke-width="1" opacity="0.5"/>
  <rect x="528" y="322" width="38" height="22" rx="5" fill="#0A1828" stroke="#7FA8C4" stroke-width="1" opacity="0.5"/>
  <rect x="60"  y="354" width="38" height="22" rx="5" fill="#0A1828" stroke="#7FA8C4" stroke-width="1" opacity="0.58"/>
  <rect x="112" y="354" width="38" height="22" rx="5" fill="#0A1828" stroke="#7FA8C4" stroke-width="1" opacity="0.58"/>
  <rect x="164" y="354" width="38" height="22" rx="5" fill="#0A1828" stroke="#7FA8C4" stroke-width="1" opacity="0.58"/>
  <rect x="216" y="354" width="38" height="22" rx="5" fill="#0A1828" stroke="#7FA8C4" stroke-width="1" opacity="0.58"/>
  <rect x="268" y="354" width="38" height="22" rx="5" fill="#0A1828" stroke="#7FA8C4" stroke-width="1" opacity="0.58"/>
  <rect x="320" y="354" width="38" height="22" rx="5" fill="#0A1828" stroke="#7FA8C4" stroke-width="1" opacity="0.58"/>
  <rect x="372" y="354" width="38" height="22" rx="5" fill="#0A1828" stroke="#7FA8C4" stroke-width="1" opacity="0.58"/>
  <rect x="424" y="354" width="38" height="22" rx="5" fill="#0A1828" stroke="#7FA8C4" stroke-width="1" opacity="0.58"/>
  <rect x="476" y="354" width="38" height="22" rx="5" fill="#0A1828" stroke="#7FA8C4" stroke-width="1" opacity="0.58"/>
  <rect x="528" y="354" width="38" height="22" rx="5" fill="#0A1828" stroke="#7FA8C4" stroke-width="1" opacity="0.58"/>
  <!-- shooting star -->
  <line x1="450" y1="50" x2="510" y2="15" stroke="#7FA8C4" stroke-width="1.5" opacity="0.4"/>
  <circle cx="450" cy="50" r="2" fill="#7FA8C4" opacity="0.6"/>
  <text x="300" y="392" text-anchor="middle" font-family="Georgia,serif" font-size="12" fill="#7FA8C4" opacity="0.55" letter-spacing="4">SILVER AGE  ·  1950</text>
</svg>`)}`;

/* SILVER AGE 2 — Sleeping Beauty tower + film projector */
const SVG_SILVER_2 = `data:image/svg+xml,${encodeURIComponent(`<svg viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="s2bg" cx="30%" cy="30%" r="90%"><stop offset="0%" stop-color="#0E1E30"/><stop offset="100%" stop-color="#04080E"/></radialGradient>
  </defs>
  <rect width="600" height="400" fill="url(#s2bg)"/>
  <!-- projector body -->
  <rect x="60" y="80" width="120" height="200" rx="8" fill="#0A1420" stroke="#7FA8C4" stroke-width="1.5" opacity="0.8"/>
  <circle cx="120" cy="130" r="38" fill="none" stroke="#7FA8C4" stroke-width="2" opacity="0.7"/>
  <circle cx="120" cy="130" r="25" fill="none" stroke="#7FA8C4" stroke-width="1" opacity="0.4"/>
  <circle cx="120" cy="130" r="8"  fill="#7FA8C4" opacity="0.6"/>
  <line x1="120" y1="130" x2="155" y2="130" stroke="#7FA8C4" stroke-width="1.5" opacity="0.5"/>
  <line x1="120" y1="130" x2="145" y2="155" stroke="#7FA8C4" stroke-width="1.5" opacity="0.5"/>
  <line x1="120" y1="130" x2="120" y2="165" stroke="#7FA8C4" stroke-width="1.5" opacity="0.5"/>
  <line x1="120" y1="130" x2="95"  y2="155" stroke="#7FA8C4" stroke-width="1.5" opacity="0.5"/>
  <line x1="120" y1="130" x2="85"  y2="130" stroke="#7FA8C4" stroke-width="1.5" opacity="0.5"/>
  <line x1="120" y1="130" x2="95"  y2="105" stroke="#7FA8C4" stroke-width="1.5" opacity="0.5"/>
  <line x1="120" y1="130" x2="120" y2="95"  stroke="#7FA8C4" stroke-width="1.5" opacity="0.5"/>
  <line x1="120" y1="130" x2="145" y2="105" stroke="#7FA8C4" stroke-width="1.5" opacity="0.5"/>
  <circle cx="120" cy="240" r="32" fill="none" stroke="#7FA8C4" stroke-width="2" opacity="0.6"/>
  <circle cx="120" cy="240" r="8"  fill="#7FA8C4" opacity="0.5"/>
  <line x1="120" y1="240" x2="147" y2="240" stroke="#7FA8C4" stroke-width="1" opacity="0.4"/>
  <line x1="120" y1="240" x2="139" y2="259" stroke="#7FA8C4" stroke-width="1" opacity="0.4"/>
  <line x1="120" y1="240" x2="120" y2="267" stroke="#7FA8C4" stroke-width="1" opacity="0.4"/>
  <line x1="120" y1="240" x2="101" y2="259" stroke="#7FA8C4" stroke-width="1" opacity="0.4"/>
  <line x1="120" y1="240" x2="93"  y2="240" stroke="#7FA8C4" stroke-width="1" opacity="0.4"/>
  <line x1="120" y1="240" x2="101" y2="221" stroke="#7FA8C4" stroke-width="1" opacity="0.4"/>
  <line x1="120" y1="240" x2="120" y2="213" stroke="#7FA8C4" stroke-width="1" opacity="0.4"/>
  <line x1="120" y1="240" x2="139" y2="221" stroke="#7FA8C4" stroke-width="1" opacity="0.4"/>
  <ellipse cx="185" cy="180" rx="22" ry="22" fill="#050E18" stroke="#7FA8C4" stroke-width="2" opacity="0.9"/>
  <ellipse cx="185" cy="180" rx="14" ry="14" fill="#7FA8C4" opacity="0.15"/>
  <!-- projection beam -->
  <polygon points="207,168 560,60 560,300 207,192" fill="#7FA8C4" opacity="0.04"/>
  <!-- Sleeping Beauty tower on the projected screen -->
  <!-- tower body -->
  <rect x="350" y="100" width="70" height="180" fill="#7FA8C4" fill-opacity="0.12" stroke="#7FA8C4" stroke-width="0.8" opacity="0.3"/>
  <!-- conical tower roof -->
  <polygon points="385,48 340,100 430,100" fill="#7FA8C4" opacity="0.22"/>
  <!-- tower window -->
  <path d="M370 155 Q385 140 400 155 L400 180 L370 180 Z" fill="#7FA8C4" opacity="0.18"/>
  <!-- tower battlements -->
  <rect x="345" y="90"  width="12" height="14" fill="#7FA8C4" opacity="0.22"/>
  <rect x="365" y="90"  width="12" height="14" fill="#7FA8C4" opacity="0.22"/>
  <rect x="385" y="90"  width="12" height="14" fill="#7FA8C4" opacity="0.22"/>
  <rect x="405" y="90"  width="12" height="14" fill="#7FA8C4" opacity="0.22"/>
  <!-- thorny vines on tower (Sleeping Beauty reference) -->
  <path d="M340 150 Q320 170 330 190 Q310 210 320 230" fill="none" stroke="#7FA8C4" stroke-width="1.5" opacity="0.25"/>
  <path d="M430 160 Q450 180 440 200 Q460 220 450 240" fill="none" stroke="#7FA8C4" stroke-width="1.5" opacity="0.25"/>
  <!-- film strip -->
  <rect x="250" y="160" width="220" height="80" fill="none" stroke="#7FA8C4" stroke-width="0.5" opacity="0.2"/>
  <rect x="260" y="168" width="26" height="64" rx="1" fill="#7FA8C4" opacity="0.06"/>
  <rect x="295" y="168" width="26" height="64" rx="1" fill="#7FA8C4" opacity="0.06"/>
  <rect x="330" y="168" width="26" height="64" rx="1" fill="#7FA8C4" opacity="0.06"/>
  <rect x="365" y="168" width="26" height="64" rx="1" fill="#7FA8C4" opacity="0.06"/>
  <rect x="400" y="168" width="26" height="64" rx="1" fill="#7FA8C4" opacity="0.06"/>
  <rect x="435" y="168" width="26" height="64" rx="1" fill="#7FA8C4" opacity="0.06"/>
  <!-- stars -->
  <circle cx="500" cy="40" r="2"   fill="#7FA8C4" opacity="0.5"/>
  <circle cx="540" cy="80" r="1.5" fill="#7FA8C4" opacity="0.4"/>
  <circle cx="480" cy="70" r="1.5" fill="#7FA8C4" opacity="0.45"/>
  <text x="300" y="392" text-anchor="middle" font-family="Georgia,serif" font-size="12" fill="#7FA8C4" opacity="0.55" letter-spacing="4">SLEEPING BEAUTY  ·  1959</text>
</svg>`)}`;

/* BRONZE AGE 1 — Fox and Hound / Aristocats record + turntable */
const SVG_BRONZE_1 = `data:image/svg+xml,${encodeURIComponent(`<svg viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="b1bg" cx="50%" cy="50%" r="75%"><stop offset="0%" stop-color="#2A1800"/><stop offset="100%" stop-color="#0E0800"/></radialGradient>
    <radialGradient id="b1warm" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#E8641A" stop-opacity="0.1"/><stop offset="100%" stop-color="#E8641A" stop-opacity="0"/></radialGradient>
  </defs>
  <rect width="600" height="400" fill="url(#b1bg)"/>
  <rect width="600" height="400" fill="url(#b1warm)"/>
  <!-- vinyl record -->
  <ellipse cx="300" cy="240" rx="160" ry="20" fill="#0E0800" opacity="0.8"/>
  <circle cx="300" cy="215" r="140" fill="#1A1000" stroke="#A07040" stroke-width="1.5" opacity="0.9"/>
  <circle cx="300" cy="215" r="120" fill="none" stroke="#A07040" stroke-width="0.5" opacity="0.3"/>
  <circle cx="300" cy="215" r="100" fill="none" stroke="#A07040" stroke-width="0.5" opacity="0.25"/>
  <circle cx="300" cy="215" r="80"  fill="none" stroke="#A07040" stroke-width="0.5" opacity="0.2"/>
  <circle cx="300" cy="215" r="55"  fill="#E8641A" opacity="0.75"/>
  <circle cx="300" cy="215" r="35"  fill="#A07040" opacity="0.9"/>
  <circle cx="300" cy="215" r="12"  fill="#0E0800"/>
  <!-- second record ghost -->
  <circle cx="340" cy="225" r="135" fill="none" stroke="#A07040" stroke-width="1" opacity="0.25"/>
  <!-- turntable arm -->
  <line x1="430" y1="90" x2="320" y2="190" stroke="#C89060" stroke-width="3" stroke-linecap="round" opacity="0.8"/>
  <circle cx="430" cy="90" r="10" fill="#A07040" opacity="0.8"/>
  <circle cx="318" cy="195" r="5" fill="#E8641A" opacity="0.9"/>
  <!-- Fox silhouette — bolder, left side -->
  <ellipse cx="108" cy="118" rx="38" ry="24" fill="#E8641A" opacity="0.62"/>
  <circle cx="140" cy="102" r="20" fill="#E8641A" opacity="0.65"/>
  <polygon points="132,86 126,62 145,80" fill="#E8641A" opacity="0.62"/>
  <polygon points="146,84 152,60 160,80" fill="#E8641A" opacity="0.62"/>
  <path d="M72 122 Q48 104 52 82 Q56 62 74 72" fill="none" stroke="#E8641A" stroke-width="8" stroke-linecap="round" opacity="0.55"/>
  <circle cx="74" cy="72" r="11" fill="#FAE8D0" opacity="0.35"/>
  <!-- white chest patch -->
  <ellipse cx="128" cy="115" rx="10" ry="8" fill="#FAE8D0" opacity="0.22"/>
  <!-- Hound silhouette — right side, bigger -->
  <ellipse cx="478" cy="120" rx="42" ry="22" fill="#A07040" opacity="0.55"/>
  <circle cx="512" cy="105" r="21" fill="#A07040" opacity="0.58"/>
  <path d="M502 104 Q492 128 496 142" fill="#A07040" opacity="0.52" stroke="none"/>
  <path d="M518 104 Q528 128 524 142" fill="#A07040" opacity="0.52" stroke="none"/>
  <!-- hound nose -->
  <circle cx="522" cy="108" r="4" fill="#5A3010" opacity="0.5"/>
  <!-- forest floor -->
  <rect x="60" y="150" width="200" height="4" rx="2" fill="#A07040" opacity="0.3"/>
  <rect x="390" y="155" width="180" height="4" rx="2" fill="#E8641A" opacity="0.28"/>
  <!-- trees behind animals -->
  <polygon points="60,360 80,200 100,360" fill="#0E0800" opacity="0.5"/>
  <polygon points="500,360 520,195 540,360" fill="#0E0800" opacity="0.5"/>
  <!-- friendship heart between them — subtle -->
  <path d="M270 130 Q300 110 330 130 Q350 145 300 175 Q250 145 270 130 Z" fill="#E8641A" opacity="0.12"/>
  <text x="300" y="392" text-anchor="middle" font-family="Georgia,serif" font-size="12" fill="#A07040" opacity="0.6" letter-spacing="4">BRONZE AGE  ·  1970</text>
</svg>`)}`;

/* BRONZE AGE 2 — The Great Mouse Detective / VHS + magnifying glass */
const SVG_BRONZE_2 = `data:image/svg+xml,${encodeURIComponent(`<svg viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="b2bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#1E1000"/><stop offset="100%" stop-color="#0A0600"/></linearGradient>
  </defs>
  <rect width="600" height="400" fill="url(#b2bg)"/>
  <!-- VHS tape body -->
  <rect x="140" y="120" width="320" height="200" rx="10" fill="#0E0800" stroke="#A07040" stroke-width="2" opacity="0.9"/>
  <rect x="160" y="140" width="280" height="100" rx="4" fill="#1A1000" stroke="#A07040" stroke-width="1" opacity="0.5"/>
  <!-- reels -->
  <circle cx="230" cy="190" r="38" fill="#0A0600" stroke="#A07040" stroke-width="1.5" opacity="0.8"/>
  <line x1="230" y1="190" x2="262" y2="190" stroke="#A07040" stroke-width="1" opacity="0.4"/>
  <line x1="230" y1="190" x2="253" y2="213" stroke="#A07040" stroke-width="1" opacity="0.4"/>
  <line x1="230" y1="190" x2="230" y2="222" stroke="#A07040" stroke-width="1" opacity="0.4"/>
  <line x1="230" y1="190" x2="207" y2="213" stroke="#A07040" stroke-width="1" opacity="0.4"/>
  <line x1="230" y1="190" x2="198" y2="190" stroke="#A07040" stroke-width="1" opacity="0.4"/>
  <line x1="230" y1="190" x2="207" y2="167" stroke="#A07040" stroke-width="1" opacity="0.4"/>
  <line x1="230" y1="190" x2="230" y2="158" stroke="#A07040" stroke-width="1" opacity="0.4"/>
  <line x1="230" y1="190" x2="253" y2="167" stroke="#A07040" stroke-width="1" opacity="0.4"/>
  <circle cx="230" cy="190" r="10" fill="#A07040" opacity="0.6"/>
  <circle cx="370" cy="190" r="38" fill="#0A0600" stroke="#A07040" stroke-width="1.5" opacity="0.8"/>
  <line x1="370" y1="190" x2="402" y2="190" stroke="#A07040" stroke-width="1" opacity="0.4"/>
  <line x1="370" y1="190" x2="393" y2="213" stroke="#A07040" stroke-width="1" opacity="0.4"/>
  <line x1="370" y1="190" x2="370" y2="222" stroke="#A07040" stroke-width="1" opacity="0.4"/>
  <line x1="370" y1="190" x2="347" y2="213" stroke="#A07040" stroke-width="1" opacity="0.4"/>
  <line x1="370" y1="190" x2="338" y2="190" stroke="#A07040" stroke-width="1" opacity="0.4"/>
  <line x1="370" y1="190" x2="347" y2="167" stroke="#A07040" stroke-width="1" opacity="0.4"/>
  <line x1="370" y1="190" x2="370" y2="158" stroke="#A07040" stroke-width="1" opacity="0.4"/>
  <line x1="370" y1="190" x2="393" y2="167" stroke="#A07040" stroke-width="1" opacity="0.4"/>
  <circle cx="370" cy="190" r="10" fill="#A07040" opacity="0.6"/>
  <!-- tape window -->
  <rect x="252" y="158" width="96" height="64" rx="3" fill="#050300" stroke="#A07040" stroke-width="1" opacity="0.7"/>
  <!-- VHS label lines -->
  <rect x="155" y="248" width="290" height="55" rx="3" fill="#E8641A" opacity="0.12"/>
  <rect x="155" y="248" width="290" height="55" rx="3" fill="none" stroke="#E8641A" stroke-width="0.5" opacity="0.4"/>
  <line x1="170" y1="262" x2="430" y2="262" stroke="#A07040" stroke-width="0.5" opacity="0.3"/>
  <line x1="170" y1="272" x2="430" y2="272" stroke="#A07040" stroke-width="0.5" opacity="0.3"/>
  <line x1="170" y1="282" x2="430" y2="282" stroke="#A07040" stroke-width="0.5" opacity="0.3"/>
  <!-- Magnifying glass (Great Mouse Detective reference) -->
  <circle cx="490" cy="90" r="42" fill="none" stroke="#E8641A" stroke-width="3" opacity="0.6"/>
  <circle cx="490" cy="90" r="38" fill="none" stroke="#E8641A" stroke-width="0.8" opacity="0.2"/>
  <!-- glass interior tint -->
  <circle cx="490" cy="90" r="37" fill="#E8641A" opacity="0.04"/>
  <!-- handle -->
  <line x1="522" y1="122" x2="555" y2="158" stroke="#E8641A" stroke-width="5" stroke-linecap="round" opacity="0.55"/>
  <line x1="519" y1="125" x2="552" y2="161" stroke="#C89060" stroke-width="2" stroke-linecap="round" opacity="0.3"/>
  <!-- Basil the Great Mouse Detective inside magnifying glass -->
  <ellipse cx="488" cy="100" rx="20" ry="15" fill="#A07040" opacity="0.72"/>
  <circle cx="503" cy="82" r="14" fill="#A07040" opacity="0.75"/>
  <circle cx="496" cy="70" r="8" fill="#A07040" opacity="0.68"/>
  <circle cx="512" cy="68" r="8" fill="#A07040" opacity="0.68"/>
  <path d="M468 108 Q450 116 453 132" fill="none" stroke="#A07040" stroke-width="3" stroke-linecap="round" opacity="0.55"/>
  <!-- detective hat — deerstalker -->
  <ellipse cx="503" cy="70" rx="17" ry="6" fill="#E8641A" opacity="0.65"/>
  <rect x="488" y="60" width="30" height="14" rx="2" fill="#E8641A" opacity="0.65"/>
  <polygon points="488,60 481,52 496,60" fill="#E8641A" opacity="0.6"/>
  <polygon points="518,60 525,52 510,60" fill="#E8641A" opacity="0.6"/>
  <!-- monocle on mouse -->
  <circle cx="509" cy="84" r="5" fill="none" stroke="#C8A010" stroke-width="1.5" opacity="0.7"/>
  <!-- small stars scattered -->
  <circle cx="80"  cy="60"  r="1.5" fill="#A07040" opacity="0.4"/>
  <circle cx="120" cy="90"  r="1.5" fill="#E8641A" opacity="0.35"/>
  <circle cx="550" cy="200" r="1.5" fill="#A07040" opacity="0.4"/>
  <circle cx="100" cy="340" r="1.5" fill="#E8641A" opacity="0.3"/>
  <text x="300" y="392" text-anchor="middle" font-family="Georgia,serif" font-size="12" fill="#A07040" opacity="0.6" letter-spacing="4">BRONZE AGE  ·  1986</text>
</svg>`)}`;

const ESSAYS = [
  { img: SVG_GOLDEN_1,  era: "Golden Age",  title: "Why Bambi Still Breaks Us",               duration: "18 min" },
  { img: SVG_SILVER_1,  era: "Silver Age",  title: "Sleeping Beauty's Forgotten Grandeur",     duration: "24 min" },
  { img: SVG_BRONZE_1,  era: "Bronze Age",  title: "The Fox & the Hound's Hidden Heart",       duration: "26 min" },
  { img: SVG_GOLDEN_2,  era: "Golden Age",  title: "Fantasia and the Dream of Pure Cinema",    duration: "31 min" },
  { img: SVG_BRONZE_2,  era: "Bronze Age",  title: "The Aristocats: An Honest Look",           duration: "21 min" },
  { img: SVG_SILVER_2,  era: "Silver Age",  title: "Cinderella and the Art of Restraint",      duration: "19 min" },
];

const HERO_SLIDES = [
  { url: `data:image/svg+xml,${encodeURIComponent(`<svg viewBox="0 0 1800 1000" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="h1bg" cx="50%" cy="55%" r="75%"><stop offset="0%" stop-color="#5A3C00"/><stop offset="60%" stop-color="#2A1A00"/><stop offset="100%" stop-color="#0A0600"/></radialGradient>
    <radialGradient id="h1glow" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#E2C227" stop-opacity="0.18"/><stop offset="100%" stop-color="#E2C227" stop-opacity="0"/></radialGradient>
  </defs>
  <rect width="1800" height="1000" fill="url(#h1bg)"/>
  <rect width="1800" height="1000" fill="url(#h1glow)"/>
  <!-- stars -->
  <circle cx="120" cy="80" r="2" fill="#E2C227" opacity="0.7"/><circle cx="300" cy="50" r="1.5" fill="#E2C227" opacity="0.5"/><circle cx="500" cy="90" r="2.5" fill="#E2C227" opacity="0.6"/><circle cx="750" cy="40" r="2" fill="#E2C227" opacity="0.55"/><circle cx="950" cy="70" r="1.5" fill="#E2C227" opacity="0.45"/><circle cx="1150" cy="55" r="2" fill="#E2C227" opacity="0.6"/><circle cx="1350" cy="85" r="2.5" fill="#E2C227" opacity="0.5"/><circle cx="1550" cy="45" r="2" fill="#E2C227" opacity="0.65"/><circle cx="1700" cy="95" r="1.5" fill="#E2C227" opacity="0.4"/><circle cx="200" cy="150" r="1.5" fill="#E2C227" opacity="0.35"/><circle cx="650" cy="130" r="2" fill="#E2C227" opacity="0.4"/><circle cx="1050" cy="110" r="1.5" fill="#E2C227" opacity="0.45"/><circle cx="1450" cy="140" r="2" fill="#E2C227" opacity="0.35"/>
  <!-- large record center -->
  <circle cx="900" cy="540" r="380" fill="#1A1000" stroke="#E2C227" stroke-width="2" opacity="0.85"/>
  <circle cx="900" cy="540" r="340" fill="none" stroke="#E2C227" stroke-width="1" opacity="0.2"/>
  <circle cx="900" cy="540" r="300" fill="none" stroke="#E2C227" stroke-width="1" opacity="0.18"/>
  <circle cx="900" cy="540" r="260" fill="none" stroke="#E2C227" stroke-width="1" opacity="0.15"/>
  <circle cx="900" cy="540" r="220" fill="none" stroke="#E2C227" stroke-width="1" opacity="0.12"/>
  <circle cx="900" cy="540" r="180" fill="none" stroke="#E2C227" stroke-width="0.8" opacity="0.1"/>
  <circle cx="900" cy="540" r="140" fill="#E2C227" opacity="0.7"/>
  <circle cx="900" cy="540" r="90" fill="#C0182A" opacity="0.85"/>
  <circle cx="900" cy="540" r="30" fill="#1A1000"/>
  <!-- film strips left -->
  <rect x="0" y="0" width="80" height="1000" fill="#0A0600" opacity="0.8"/>
  <rect x="5" y="0" width="70" height="1000" fill="none" stroke="#E2C227" stroke-width="0.5" opacity="0.2"/>
  <rect x="12" y="20" width="56" height="44" rx="2" fill="#E2C227" opacity="0.08"/><rect x="12" y="80" width="56" height="44" rx="2" fill="#E2C227" opacity="0.08"/><rect x="12" y="140" width="56" height="44" rx="2" fill="#E2C227" opacity="0.08"/><rect x="12" y="200" width="56" height="44" rx="2" fill="#E2C227" opacity="0.08"/><rect x="12" y="260" width="56" height="44" rx="2" fill="#E2C227" opacity="0.08"/><rect x="12" y="320" width="56" height="44" rx="2" fill="#E2C227" opacity="0.08"/><rect x="12" y="380" width="56" height="44" rx="2" fill="#E2C227" opacity="0.08"/><rect x="12" y="440" width="56" height="44" rx="2" fill="#E2C227" opacity="0.08"/><rect x="12" y="500" width="56" height="44" rx="2" fill="#E2C227" opacity="0.08"/><rect x="12" y="560" width="56" height="44" rx="2" fill="#E2C227" opacity="0.08"/><rect x="12" y="620" width="56" height="44" rx="2" fill="#E2C227" opacity="0.08"/><rect x="12" y="680" width="56" height="44" rx="2" fill="#E2C227" opacity="0.08"/><rect x="12" y="740" width="56" height="44" rx="2" fill="#E2C227" opacity="0.08"/><rect x="12" y="800" width="56" height="44" rx="2" fill="#E2C227" opacity="0.08"/><rect x="12" y="860" width="56" height="44" rx="2" fill="#E2C227" opacity="0.08"/><rect x="12" y="920" width="56" height="44" rx="2" fill="#E2C227" opacity="0.08"/>
  <!-- film strip right -->
  <rect x="1720" y="0" width="80" height="1000" fill="#0A0600" opacity="0.8"/>
  <rect x="1732" y="20" width="56" height="44" rx="2" fill="#E2C227" opacity="0.08"/><rect x="1732" y="80" width="56" height="44" rx="2" fill="#E2C227" opacity="0.08"/><rect x="1732" y="140" width="56" height="44" rx="2" fill="#E2C227" opacity="0.08"/><rect x="1732" y="200" width="56" height="44" rx="2" fill="#E2C227" opacity="0.08"/><rect x="1732" y="260" width="56" height="44" rx="2" fill="#E2C227" opacity="0.08"/><rect x="1732" y="320" width="56" height="44" rx="2" fill="#E2C227" opacity="0.08"/><rect x="1732" y="380" width="56" height="44" rx="2" fill="#E2C227" opacity="0.08"/><rect x="1732" y="440" width="56" height="44" rx="2" fill="#E2C227" opacity="0.08"/><rect x="1732" y="500" width="56" height="44" rx="2" fill="#E2C227" opacity="0.08"/><rect x="1732" y="560" width="56" height="44" rx="2" fill="#E2C227" opacity="0.08"/><rect x="1732" y="620" width="56" height="44" rx="2" fill="#E2C227" opacity="0.08"/><rect x="1732" y="680" width="56" height="44" rx="2" fill="#E2C227" opacity="0.08"/><rect x="1732" y="740" width="56" height="44" rx="2" fill="#E2C227" opacity="0.08"/>
  <!-- era label -->
  <text x="900" y="960" text-anchor="middle" font-family="Georgia,serif" font-size="22" fill="#E2C227" opacity="0.35" letter-spacing="12">GOLDEN AGE  ·  1937 – 1942</text>
</svg>`)}`, caption: "The Golden Age" },

  { url: `data:image/svg+xml,${encodeURIComponent(`<svg viewBox="0 0 1800 1000" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="h2bg" cx="40%" cy="50%" r="80%"><stop offset="0%" stop-color="#0E2240"/><stop offset="60%" stop-color="#060E20"/><stop offset="100%" stop-color="#020408"/></radialGradient>
    <radialGradient id="h2glow" cx="20%" cy="35%" r="60%"><stop offset="0%" stop-color="#7FA8C4" stop-opacity="0.2"/><stop offset="100%" stop-color="#7FA8C4" stop-opacity="0"/></radialGradient>
    <radialGradient id="h2screen" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#7FA8C4" stop-opacity="0.12"/><stop offset="100%" stop-color="#7FA8C4" stop-opacity="0"/></radialGradient>
  </defs>
  <rect width="1800" height="1000" fill="url(#h2bg)"/>
  <rect width="1800" height="1000" fill="url(#h2glow)"/>
  <!-- stars -->
  <circle cx="200" cy="60" r="2" fill="#7FA8C4" opacity="0.6"/><circle cx="450" cy="40" r="1.5" fill="#7FA8C4" opacity="0.5"/><circle cx="700" cy="80" r="2" fill="#7FA8C4" opacity="0.55"/><circle cx="950" cy="50" r="2.5" fill="#7FA8C4" opacity="0.45"/><circle cx="1200" cy="70" r="2" fill="#7FA8C4" opacity="0.6"/><circle cx="1450" cy="45" r="1.5" fill="#7FA8C4" opacity="0.5"/><circle cx="1650" cy="90" r="2" fill="#7FA8C4" opacity="0.55"/>
  <!-- cinema screen -->
  <rect x="350" y="100" width="1100" height="620" rx="4" fill="url(#h2screen)" stroke="#7FA8C4" stroke-width="1.5" opacity="0.25"/>
  <!-- projector beam -->
  <polygon points="200,320 350,100 350,720 200,680" fill="#7FA8C4" opacity="0.05"/>
  <!-- projector body -->
  <rect x="80" y="280" width="140" height="180" rx="8" fill="#060E20" stroke="#7FA8C4" stroke-width="1.5" opacity="0.7"/>
  <circle cx="150" cy="320" r="44" fill="none" stroke="#7FA8C4" stroke-width="2" opacity="0.6"/>
  <circle cx="150" cy="320" r="28" fill="none" stroke="#7FA8C4" stroke-width="1" opacity="0.35"/>
  <circle cx="150" cy="320" r="10" fill="#7FA8C4" opacity="0.5"/>
  <circle cx="150" cy="420" r="38" fill="none" stroke="#7FA8C4" stroke-width="2" opacity="0.5"/>
  <circle cx="150" cy="420" r="10" fill="#7FA8C4" opacity="0.4"/>
  <ellipse cx="222" cy="370" rx="24" ry="24" fill="#020408" stroke="#7FA8C4" stroke-width="2" opacity="0.9"/>
  <!-- cinema seats -->
  <rect x="350" y="760" width="1100" height="220" fill="#040810" opacity="0.6"/>
  <rect x="380" y="780" width="50" height="32" rx="7" fill="#7FA8C4" opacity="0.1"/><rect x="450" y="780" width="50" height="32" rx="7" fill="#7FA8C4" opacity="0.1"/><rect x="520" y="780" width="50" height="32" rx="7" fill="#7FA8C4" opacity="0.1"/><rect x="590" y="780" width="50" height="32" rx="7" fill="#7FA8C4" opacity="0.1"/><rect x="660" y="780" width="50" height="32" rx="7" fill="#7FA8C4" opacity="0.1"/><rect x="730" y="780" width="50" height="32" rx="7" fill="#7FA8C4" opacity="0.1"/><rect x="800" y="780" width="50" height="32" rx="7" fill="#7FA8C4" opacity="0.1"/><rect x="870" y="780" width="50" height="32" rx="7" fill="#7FA8C4" opacity="0.1"/><rect x="940" y="780" width="50" height="32" rx="7" fill="#7FA8C4" opacity="0.1"/><rect x="1010" y="780" width="50" height="32" rx="7" fill="#7FA8C4" opacity="0.1"/><rect x="1080" y="780" width="50" height="32" rx="7" fill="#7FA8C4" opacity="0.1"/><rect x="1150" y="780" width="50" height="32" rx="7" fill="#7FA8C4" opacity="0.1"/><rect x="1220" y="780" width="50" height="32" rx="7" fill="#7FA8C4" opacity="0.1"/><rect x="1290" y="780" width="50" height="32" rx="7" fill="#7FA8C4" opacity="0.1"/><rect x="1360" y="780" width="50" height="32" rx="7" fill="#7FA8C4" opacity="0.1"/>
  <rect x="360" y="830" width="50" height="32" rx="7" fill="#7FA8C4" opacity="0.08"/><rect x="430" y="830" width="50" height="32" rx="7" fill="#7FA8C4" opacity="0.08"/><rect x="500" y="830" width="50" height="32" rx="7" fill="#7FA8C4" opacity="0.08"/><rect x="570" y="830" width="50" height="32" rx="7" fill="#7FA8C4" opacity="0.08"/><rect x="640" y="830" width="50" height="32" rx="7" fill="#7FA8C4" opacity="0.08"/><rect x="710" y="830" width="50" height="32" rx="7" fill="#7FA8C4" opacity="0.08"/><rect x="780" y="830" width="50" height="32" rx="7" fill="#7FA8C4" opacity="0.08"/><rect x="850" y="830" width="50" height="32" rx="7" fill="#7FA8C4" opacity="0.08"/><rect x="920" y="830" width="50" height="32" rx="7" fill="#7FA8C4" opacity="0.08"/><rect x="990" y="830" width="50" height="32" rx="7" fill="#7FA8C4" opacity="0.08"/><rect x="1060" y="830" width="50" height="32" rx="7" fill="#7FA8C4" opacity="0.08"/><rect x="1130" y="830" width="50" height="32" rx="7" fill="#7FA8C4" opacity="0.08"/><rect x="1200" y="830" width="50" height="32" rx="7" fill="#7FA8C4" opacity="0.08"/><rect x="1270" y="830" width="50" height="32" rx="7" fill="#7FA8C4" opacity="0.08"/><rect x="1340" y="830" width="50" height="32" rx="7" fill="#7FA8C4" opacity="0.08"/><rect x="1410" y="830" width="50" height="32" rx="7" fill="#7FA8C4" opacity="0.08"/>
  <text x="900" y="970" text-anchor="middle" font-family="Georgia,serif" font-size="22" fill="#7FA8C4" opacity="0.3" letter-spacing="12">SILVER AGE  ·  1950 – 1967</text>
</svg>`)}`, caption: "Silver Screen Stories" },

  { url: `data:image/svg+xml,${encodeURIComponent(`<svg viewBox="0 0 1800 1000" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="h3bg" cx="55%" cy="50%" r="80%"><stop offset="0%" stop-color="#301800"/><stop offset="60%" stop-color="#140A00"/><stop offset="100%" stop-color="#060200"/></radialGradient>
    <radialGradient id="h3glow" cx="55%" cy="50%" r="55%"><stop offset="0%" stop-color="#E8641A" stop-opacity="0.14"/><stop offset="100%" stop-color="#E8641A" stop-opacity="0"/></radialGradient>
  </defs>
  <rect width="1800" height="1000" fill="url(#h3bg)"/>
  <rect width="1800" height="1000" fill="url(#h3glow)"/>
  <!-- stars -->
  <circle cx="150" cy="70" r="2" fill="#E8641A" opacity="0.45"/><circle cx="400" cy="50" r="1.5" fill="#A07040" opacity="0.5"/><circle cx="650" cy="85" r="2.5" fill="#E8641A" opacity="0.4"/><circle cx="900" cy="55" r="2" fill="#A07040" opacity="0.55"/><circle cx="1150" cy="75" r="2" fill="#E8641A" opacity="0.45"/><circle cx="1400" cy="50" r="2.5" fill="#A07040" opacity="0.5"/><circle cx="1650" cy="80" r="2" fill="#E8641A" opacity="0.4"/>
  <!-- large turntable platter -->
  <circle cx="900" cy="520" r="400" fill="#1A0C00" stroke="#A07040" stroke-width="2" opacity="0.8"/>
  <circle cx="900" cy="520" r="370" fill="none" stroke="#A07040" stroke-width="1" opacity="0.2"/>
  <circle cx="900" cy="520" r="340" fill="none" stroke="#A07040" stroke-width="0.8" opacity="0.18"/>
  <circle cx="900" cy="520" r="300" fill="none" stroke="#A07040" stroke-width="0.8" opacity="0.16"/>
  <circle cx="900" cy="520" r="260" fill="none" stroke="#A07040" stroke-width="0.8" opacity="0.14"/>
  <circle cx="900" cy="520" r="220" fill="none" stroke="#A07040" stroke-width="0.8" opacity="0.12"/>
  <circle cx="900" cy="520" r="180" fill="none" stroke="#A07040" stroke-width="0.8" opacity="0.1"/>
  <circle cx="900" cy="520" r="140" fill="none" stroke="#A07040" stroke-width="0.8" opacity="0.09"/>
  <circle cx="900" cy="520" r="100" fill="#E8641A" opacity="0.7"/>
  <circle cx="900" cy="520" r="60" fill="#A07040" opacity="0.85"/>
  <circle cx="900" cy="520" r="20" fill="#1A0C00"/>
  <!-- tonearm -->
  <line x1="1240" y1="180" x2="960" y2="490" stroke="#C89060" stroke-width="5" stroke-linecap="round" opacity="0.8"/>
  <circle cx="1240" cy="180" r="28" fill="#A07040" opacity="0.7"/>
  <circle cx="957" cy="494" r="10" fill="#E8641A" opacity="0.9"/>
  <!-- VHS tapes stacked bottom left -->
  <rect x="80" y="700" width="240" height="160" rx="8" fill="#0A0600" stroke="#A07040" stroke-width="1.5" opacity="0.8"/>
  <rect x="100" y="718" width="200" height="80" rx="3" fill="#140A00" stroke="#A07040" stroke-width="0.8" opacity="0.5"/>
  <circle cx="155" cy="758" r="28" fill="#060200" stroke="#A07040" stroke-width="1" opacity="0.7"/>
  <circle cx="225" cy="758" r="28" fill="#060200" stroke="#A07040" stroke-width="1" opacity="0.7"/>
  <circle cx="155" cy="758" r="8" fill="#A07040" opacity="0.6"/>
  <circle cx="225" cy="758" r="8" fill="#A07040" opacity="0.6"/>
  <rect x="90" y="808" width="220" height="40" rx="3" fill="#E8641A" fill-opacity="0.1" stroke="#E8641A" stroke-width="0.5" opacity="0.3"/>
  <!-- second tape -->
  <rect x="100" y="680" width="240" height="30" rx="4" fill="#0E0800" stroke="#A07040" stroke-width="1" opacity="0.5"/>
  <text x="900" y="960" text-anchor="middle" font-family="Georgia,serif" font-size="22" fill="#A07040" opacity="0.35" letter-spacing="12">BRONZE AGE  ·  1970 – 1988</text>
</svg>`)}`, caption: "The Bronze Age" },
];

const CAROUSEL = [SVG_GOLDEN_1, SVG_SILVER_1, SVG_BRONZE_1, SVG_GOLDEN_2, SVG_SILVER_2, SVG_BRONZE_2, SVG_GOLDEN_1, SVG_SILVER_2];

const ERA_COLOR = { "Golden Age": C.gold, "Silver Age": "#7FA8C4", "Bronze Age": C.orange };

/* ═══════════════════════════════════════════════════════════
   LOGO COMPONENT — full rainbow top / gold bottom record
═══════════════════════════════════════════════════════════ */
function Logo({ size = 56 }) {
  const id = `logo-${size}`;
  return (
    <svg width={size} height={size} viewBox="0 0 680 680" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0, display: "block" }}>
      <defs>
        <clipPath id={`cc-${id}`}><circle cx="340" cy="340" r="300"/></clipPath>
        <clipPath id={`t40-${id}`}><rect x="40" y="40" width="600" height="262"/></clipPath>
        <clipPath id={`fz-${id}`}><rect x="40" y="245" width="600" height="90"/></clipPath>
        <clipPath id={`bh-${id}`}><rect x="40" y="335" width="600" height="310"/></clipPath>
        <radialGradient id={`rim-${id}`} cx="50%" cy="30%" r="60%">
          <stop offset="0%"   stopColor="#FFFEF5"/>
          <stop offset="100%" stopColor="#EEE8C8"/>
        </radialGradient>
        <radialGradient id={`vg-${id}`} cx="44%" cy="60%" r="65%">
          <stop offset="0%"   stopColor="#F8EC70"/>
          <stop offset="40%"  stopColor="#E4C822"/>
          <stop offset="75%"  stopColor="#C8A812"/>
          <stop offset="100%" stopColor="#9C7A08"/>
        </radialGradient>
        <radialGradient id={`lg-${id}`} cx="50%" cy="38%" r="55%">
          <stop offset="0%"   stopColor="#F4E060"/>
          <stop offset="100%" stopColor="#CCA812"/>
        </radialGradient>
        <radialGradient id={`fg-${id}`} cx="50%" cy="0%" r="100%">
          <stop offset="0%"   stopColor="#E4C822" stopOpacity="0"/>
          <stop offset="100%" stopColor="#E4C822" stopOpacity="1"/>
        </radialGradient>
      </defs>

      {/* Warm white/cream outer rim */}
      <circle cx="340" cy="340" r="312" fill={`url(#rim-${id})`}/>
      {/* Thin gold accent band inside rim */}
      <circle cx="340" cy="340" r="304" fill="none" stroke="#C8A010" strokeWidth="2"/>
      {/* Gold vinyl base */}
      <circle cx="340" cy="340" r="300" fill={`url(#vg-${id})`}/>

      {/* Rainbow rays — top 40% */}
      <g clipPath={`url(#cc-${id})`}>
        <g clipPath={`url(#t40-${id})`}>
          <rect x="40" y="40" width="600" height="262" fill="#E4C822"/>
          <path d="M340 340 L638 268 A300 300 0 0 0 620 190 Z" fill="#E8161A"/>
          <path d="M340 340 L620 190 A300 300 0 0 0 580 130 Z" fill="#E83010"/>
          <path d="M340 340 L580 130 A300 300 0 0 0 530 82 Z"  fill="#F07010"/>
          <path d="M340 340 L530 82  A300 300 0 0 0 460 50 Z"  fill="#F0A010"/>
          <path d="M340 340 L460 50  A300 300 0 0 0 390 42 Z"  fill="#E8D000"/>
          <path d="M340 340 L390 42  A300 300 0 0 0 340 40 Z"  fill="#A8C810"/>
          <path d="M340 340 L340 40  A300 300 0 0 0 290 42 Z"  fill="#20A030"/>
          <path d="M340 340 L290 42  A300 300 0 0 0 220 50 Z"  fill="#10A870"/>
          <path d="M340 340 L220 50  A300 300 0 0 0 160 82 Z"  fill="#10A8C0"/>
          <path d="M340 340 L160 82  A300 300 0 0 0 110 130 Z" fill="#1840C8"/>
          <path d="M340 340 L110 130 A300 300 0 0 0 70 190 Z"  fill="#3020A8"/>
          <path d="M340 340 L70 190  A300 300 0 0 0 42 268 Z"  fill="#8010A0"/>
          <path d="M340 340 L42 268  A300 300 0 0 0 638 268 Z" fill="#1A1A60"/>
          <path d="M340 340 L190 60  A300 300 0 0 1 490 60 Z"  fill="#16165A" opacity="0.88"/>
        </g>
      </g>

      {/* Gold fade blending rainbow into bottom */}
      <g clipPath={`url(#cc-${id})`}>
        <g clipPath={`url(#fz-${id})`}>
          <rect x="40" y="245" width="600" height="90" fill={`url(#fg-${id})`}/>
        </g>
      </g>

      {/* Vinyl groove rings */}
      <circle cx="340" cy="340" r="284" fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth="1.2"/>
      <circle cx="340" cy="340" r="270" fill="none" stroke="rgba(0,0,0,0.07)" strokeWidth="1"/>
      <circle cx="340" cy="340" r="256" fill="none" stroke="rgba(0,0,0,0.07)" strokeWidth="1"/>
      <circle cx="340" cy="340" r="242" fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="1"/>
      <circle cx="340" cy="340" r="228" fill="none" stroke="rgba(0,0,0,0.05)" strokeWidth="1"/>
      <circle cx="340" cy="340" r="214" fill="none" stroke="rgba(0,0,0,0.05)" strokeWidth="1"/>
      <circle cx="340" cy="340" r="200" fill="none" stroke="rgba(0,0,0,0.04)" strokeWidth="1"/>

      {/* Gold bottom sheen */}
      <g clipPath={`url(#cc-${id})`}>
        <g clipPath={`url(#bh-${id})`}>
          <ellipse cx="340" cy="500" rx="290" ry="200" fill="rgba(255,235,80,0.15)"/>
        </g>
      </g>

      {/* Label outer rings — ink black + gold gap + black + dark amber on gold */}
      <circle cx="340" cy="340" r="170" fill="none" stroke="#0E0E0E" strokeWidth="11"/>
      <circle cx="340" cy="340" r="157" fill="none" stroke="#E4C822" strokeWidth="4"/>
      <circle cx="340" cy="340" r="151" fill="none" stroke="#0E0E0E" strokeWidth="6"/>
      <circle cx="340" cy="340" r="143" fill="none" stroke="#7A5A08" strokeWidth="3"/>

      {/* Central label gold fill */}
      <circle cx="340" cy="340" r="139" fill={`url(#lg-${id})`}/>

      {/* Label inner groove rings — dark on gold */}
      <circle cx="340" cy="340" r="130" fill="none" stroke="rgba(0,0,0,0.20)" strokeWidth="1.2"/>
      <circle cx="340" cy="340" r="119" fill="none" stroke="rgba(0,0,0,0.14)" strokeWidth="1"/>
      <circle cx="340" cy="340" r="108" fill="none" stroke="rgba(0,0,0,0.10)" strokeWidth="1"/>
      <circle cx="340" cy="340" r="97"  fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth="1"/>

      {/* Navy star dots at top */}
      <circle cx="340" cy="214" r="5.5" fill="#16165A" opacity="0.80"/>
      <circle cx="296" cy="228" r="3.8" fill="#16165A" opacity="0.58"/>
      <circle cx="384" cy="228" r="3.8" fill="#16165A" opacity="0.58"/>

      {/* Spindle hole */}
      <circle cx="340" cy="340" r="16" fill="#0E0E0E"/>
      <circle cx="340" cy="340" r="10" fill="#1C1400"/>
      <circle cx="340" cy="340" r="5"  fill="#0E0E0E"/>

      {/* Outer edge highlight */}
      <circle cx="340" cy="340" r="300" fill="none" stroke="rgba(255,245,110,0.30)" strokeWidth="2"/>
    </svg>
  );
}

/* ─── Inline YouTube icon ────────────────────────────────── */
function YTIcon({ size = 14 }) {
  return (
    <svg width={size} height={Math.round(size * 0.71)} viewBox="0 0 14 10" fill="none">
      <rect width="14" height="10" rx="2.5" fill="#FF0000"/>
      <path d="M5.5 3L9.5 5L5.5 7V3Z" fill="white"/>
    </svg>
  );
}

/* ─── Patreon icon ───────────────────────────────────────── */
function PatreonIcon({ size = 12, color = "white" }) {
  return (
    <svg width={Math.round(size * 0.83)} height={size} viewBox="0 0 10 12" fill="none">
      <circle cx="6.5" cy="4.5" r="3.5" fill={color}/>
      <rect x="0" y="0" width="2.5" height="12" fill={color} rx="1"/>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════
   NAV — responsive: desktop horizontal / mobile stacked
═══════════════════════════════════════════════════════════ */
function Nav({ heroVisible }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Close menu on nav link click
  const close = () => setMenuOpen(false);

  const bgSolid = `rgba(13,10,0,0.97)`;
  const bgHero  = `linear-gradient(to bottom, rgba(22,22,80,0.45) 0%, transparent 100%)`;

  const linkStyle = {
    fontSize: "11px", letterSpacing: "0.16em", textTransform: "uppercase",
    color: "rgba(255,255,255,0.90)", textDecoration: "none",
    fontFamily: "Cormorant Garamond, Georgia, serif",
    padding: isMobile ? "10px 0" : "0",
    display: "block",
  };

  const ytPill = {
    display: "inline-flex", alignItems: "center", gap: "7px",
    padding: isMobile ? "10px 20px" : "7px 15px",
    background: "rgba(255,255,255,0.12)",
    border: "1px solid rgba(255,255,255,0.55)",
    borderRadius: "2px", textDecoration: "none",
  };

  const patPill = {
    display: "inline-flex", alignItems: "center", gap: "7px",
    padding: isMobile ? "10px 20px" : "7px 15px",
    background: C.crimson, borderRadius: "2px", textDecoration: "none",
    border: `1px solid ${C.crimson}`,
  };

  /* ── DESKTOP ── */
  if (!isMobile) {
    return (
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 2.5rem", height: "72px",
        background: heroVisible ? bgHero : bgSolid,
        backdropFilter: heroVisible ? "none" : "blur(14px)",
        borderBottom: heroVisible ? "none" : `1px solid rgba(226,194,39,0.18)`,
        transition: "background 0.5s ease, border 0.4s ease",
      }}>
        <a href="#top" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
          <Logo size={44} />
        </a>
        <div style={{ display: "flex", gap: "1.75rem", alignItems: "center" }}>
          {["About", "Essays"].map(label => (
            <a key={label} href={`#${label.toLowerCase()}`} style={linkStyle}>{label}</a>
          ))}
          <a href={YT_CHANNEL} target="_blank" rel="noopener noreferrer" style={ytPill}>
            <YTIcon size={13} />
            <span style={{ fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#FFFFFF", fontFamily: "Cormorant Garamond, Georgia, serif" }}>YouTube</span>
          </a>
          <a href={PATREON_URL} target="_blank" rel="noopener noreferrer" style={patPill}>
            <PatreonIcon size={11} />
            <span style={{ fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: "white", fontFamily: "Cormorant Garamond, Georgia, serif" }}>Patreon</span>
          </a>
        </div>
      </nav>
    );
  }

  /* ── MOBILE ── */
  return (
    <>
      {/* Mobile top bar — logo centred, hamburger right */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "0 1rem", height: "64px",
        background: heroVisible && !menuOpen ? bgHero : bgSolid,
        backdropFilter: heroVisible && !menuOpen ? "none" : "blur(14px)",
        borderBottom: heroVisible && !menuOpen ? "none" : `1px solid rgba(226,194,39,0.18)`,
        transition: "background 0.4s ease",
      }}>
        {/* Logo — centred */}
        <a href="#top" onClick={close} style={{ display: "flex", alignItems: "center", textDecoration: "none", position: "absolute", left: "50%", transform: "translateX(-50%)" }}>
          <Logo size={40} />
        </a>

        {/* Hamburger — right side */}
        <button
          onClick={() => setMenuOpen(o => !o)}
          style={{
            position: "absolute", right: "1.25rem",
            background: "none", border: "none", cursor: "pointer",
            padding: "8px", display: "flex", flexDirection: "column",
            gap: "5px", alignItems: "flex-end",
          }}
          aria-label="Toggle menu"
        >
          <span style={{ display: "block", width: menuOpen ? "22px" : "22px", height: "1.5px", background: C.gold, transition: "all 0.3s ease", transform: menuOpen ? "translateY(6.5px) rotate(45deg)" : "none" }}/>
          <span style={{ display: "block", width: "16px", height: "1.5px", background: C.gold, transition: "all 0.3s ease", opacity: menuOpen ? 0 : 1 }}/>
          <span style={{ display: "block", width: "22px", height: "1.5px", background: C.gold, transition: "all 0.3s ease", transform: menuOpen ? "translateY(-6.5px) rotate(-45deg)" : "none" }}/>
        </button>
      </nav>

      {/* Mobile dropdown menu */}
      <div style={{
        position: "fixed", top: "64px", left: 0, right: 0, zIndex: 199,
        background: bgSolid,
        backdropFilter: "blur(14px)",
        borderBottom: `1px solid rgba(226,194,39,0.18)`,
        overflow: "hidden",
        maxHeight: menuOpen ? "400px" : "0",
        transition: "max-height 0.4s cubic-bezier(0.4,0,0.2,1)",
      }}>
        <div style={{
          display: "flex", flexDirection: "column", alignItems: "center",
          padding: menuOpen ? "1.5rem 1.5rem 2rem" : "0 1.5rem",
          gap: "0",
          transition: "padding 0.3s ease",
        }}>
          {/* Text links */}
          {["About", "Essays"].map(label => (
            <a key={label} href={`#${label.toLowerCase()}`} onClick={close} style={{
              ...linkStyle,
              borderBottom: `1px solid rgba(226,194,39,0.1)`,
              width: "100%", textAlign: "center",
            }}>{label}</a>
          ))}

          {/* CTA buttons */}
          <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.25rem", flexWrap: "wrap", justifyContent: "center", width: "100%" }}>
            <a href={YT_CHANNEL} target="_blank" rel="noopener noreferrer" onClick={close} style={{ ...ytPill, flex: "1", justifyContent: "center", minWidth: "120px" }}>
              <YTIcon size={13} />
              <span style={{ fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#FFFFFF", fontFamily: "Cormorant Garamond, Georgia, serif" }}>YouTube</span>
            </a>
            <a href={PATREON_URL} target="_blank" rel="noopener noreferrer" onClick={close} style={{ ...patPill, flex: "1", justifyContent: "center", minWidth: "120px" }}>
              <PatreonIcon size={11} />
              <span style={{ fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: "white", fontFamily: "Cormorant Garamond, Georgia, serif" }}>Patreon</span>
            </a>
          </div>
        </div>
      </div>

      {/* Backdrop tap-to-close */}
      {menuOpen && (
        <div onClick={close} style={{ position: "fixed", inset: 0, zIndex: 198, background: "transparent" }} />
      )}
    </>
  );
}

/* ═══════════════════════════════════════════════════════════
   HERO TITLE — pinned over first screen only
═══════════════════════════════════════════════════════════ */
function HeroTitle({ visible }) {
  return (
    <div style={{
      position: "absolute", inset: 0, zIndex: 10,
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      pointerEvents: "none", padding: "0 2rem", textAlign: "center",
      opacity: visible ? 1 : 0,
      transition: "opacity 0.6s ease",
    }}>
      <div style={{ marginBottom: "2rem", animation: "fadeInUp 1s ease both", pointerEvents: "all" }}>
        <Logo size={120} />
      </div>
      <span style={{ fontSize: "10px", letterSpacing: "0.28em", textTransform: "uppercase", color: "#FFFFFF", fontFamily: "Cormorant Garamond, Georgia, serif", display: "block", marginBottom: "1rem", animation: "fadeInUp 1s 0.15s ease both" }}>
        Disney Video Essays
      </span>
      <h1 style={{ fontFamily: "Cormorant Garamond, Georgia, serif", fontSize: "clamp(3rem, 9vw, 8rem)", fontWeight: 300, fontStyle: "italic", color: "#FFFFFF", margin: "0 0 0.5rem", lineHeight: 0.95, letterSpacing: "-0.01em", animation: "fadeInUp 1s 0.25s ease both", textShadow: "0 2px 30px rgba(0,0,0,0.35)" }}>
        Once Upon<br />a Record
      </h1>
      <div style={{ width: "50px", height: "2px", background: `linear-gradient(90deg, ${C.crimson}, ${C.gold}, ${C.orange})`, margin: "1.5rem auto", animation: "fadeInUp 1s 0.4s ease both" }} />
      <p style={{ fontFamily: "Cormorant Garamond, Georgia, serif", fontSize: "clamp(0.9rem, 1.7vw, 1.2rem)", color: "#FFFFFF", fontWeight: 300, fontStyle: "italic", animation: "fadeInUp 1s 0.5s ease both" }}>
        From an honest fan
      </p>
      <div style={{ display: "flex", gap: "1rem", marginTop: "2.5rem", pointerEvents: "all", flexWrap: "wrap", justifyContent: "center", animation: "fadeInUp 1s 0.65s ease both" }}>
        <a href={YT_CHANNEL} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "9px", padding: "13px 30px", background: "rgba(22,22,80,0.35)", border: "1px solid rgba(255,255,255,0.70)", color: "#FFFFFF", fontSize: "10px", letterSpacing: "0.16em", textTransform: "uppercase", textDecoration: "none", fontFamily: "Cormorant Garamond, Georgia, serif", backdropFilter: "blur(6px)" }}>
          <YTIcon size={14} /> Watch on YouTube
        </a>
        <a href={PATREON_URL} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "9px", padding: "13px 30px", background: C.crimson, color: "white", fontSize: "10px", letterSpacing: "0.16em", textTransform: "uppercase", textDecoration: "none", fontFamily: "Cormorant Garamond, Georgia, serif", fontWeight: 600 }}>
          <PatreonIcon size={11} /> Support on Patreon
        </a>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   ERA SPLIT PANEL — image one side, text other, alternating
═══════════════════════════════════════════════════════════ */
function EraSplitPanel({ era, flip, visible }) {
  return (
    <div style={{
      position: "absolute", inset: 0, zIndex: 11,
      display: "flex",
      flexDirection: flip ? "row-reverse" : "row",
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(18px)",
      transition: "opacity 0.75s ease, transform 0.75s ease",
      pointerEvents: visible ? "all" : "none",
    }}>
      {/* ── Image half ── */}
      <div style={{
        flex: "1",
        position: "relative",
        overflow: "hidden",
      }}>
        <img
          src={era.scene}
          alt={era.name}
          style={{
            width: "100%", height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            display: "block",
            position: "absolute", inset: 0,
          }}
        />
        {/* Subtle inner shadow toward text side */}
        <div style={{
          position: "absolute", inset: 0,
          background: flip
            ? "linear-gradient(to left, rgba(0,0,0,0.45) 0%, transparent 60%)"
            : "linear-gradient(to right, rgba(0,0,0,0.45) 0%, transparent 60%)",
        }}/>
      </div>

      {/* ── Text half ── */}
      <div style={{
        flex: "1",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0 5vw",
        background: `linear-gradient(135deg, rgba(10,5,0,0.96) 0%, rgba(20,12,4,0.98) 100%)`,
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Faint era-color glow blob behind text */}
        <div style={{
          position: "absolute",
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: "360px", height: "360px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${era.color}18 0%, transparent 70%)`,
          pointerEvents: "none",
        }}/>

        {/* Year pill */}
        <span style={{
          display: "inline-block",
          padding: "4px 14px",
          border: `1px solid ${era.color}`,
          color: era.color,
          fontSize: "9px", letterSpacing: "0.24em", textTransform: "uppercase",
          fontFamily: "Cormorant Garamond, Georgia, serif",
          marginBottom: "1.5rem",
          alignSelf: "flex-start",
        }}>{era.years}</span>

        {/* Era name */}
        <h2 style={{
          fontFamily: "Cormorant Garamond, Georgia, serif",
          fontSize: "clamp(2.8rem, 5vw, 5rem)",
          fontWeight: 300, fontStyle: "italic",
          color: era.color,
          margin: "0 0 1rem", lineHeight: 0.95,
          letterSpacing: "-0.01em",
        }}>{era.name}</h2>

        {/* Rule */}
        <div style={{ width: "40px", height: "2px", background: era.color, marginBottom: "1.5rem", borderRadius: "1px", opacity: 0.7 }}/>

        {/* Description */}
        <p style={{
          fontFamily: "Cormorant Garamond, Georgia, serif",
          fontSize: "clamp(0.95rem, 1.4vw, 1.1rem)",
          color: "rgba(247,240,220,0.72)",
          fontWeight: 300, fontStyle: "italic",
          lineHeight: 1.8, marginBottom: "1.75rem",
          maxWidth: "420px",
        }}>{era.desc}</p>

        {/* Films */}
        <div style={{ display: "flex", flexDirection: "column", gap: "7px", marginBottom: "2rem" }}>
          {era.films.map(film => (
            <div key={film} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: era.color, flexShrink: 0, opacity: 0.8 }}/>
              <span style={{ fontFamily: "Cormorant Garamond, Georgia, serif", fontSize: "0.9rem", fontStyle: "italic", color: "rgba(247,240,220,0.6)" }}>{film}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <a href={YT_CHANNEL} target="_blank" rel="noopener noreferrer" style={{
          display: "inline-flex", alignItems: "center", gap: "8px",
          padding: "10px 24px", alignSelf: "flex-start",
          border: `1px solid ${era.color}`,
          color: era.color, fontSize: "10px", letterSpacing: "0.16em",
          textTransform: "uppercase", textDecoration: "none",
          fontFamily: "Cormorant Garamond, Georgia, serif",
        }}>
          <YTIcon size={12}/> Watch Essays
        </a>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   SCROLL HERO — title screen + 3 era split screens
   Total: 4 × 100vh
═══════════════════════════════════════════════════════════ */
function ScrollHeroSection() {
  const [slide, setSlide] = useState(0);
  const ref = useRef(null);
  const TOTAL_SLIDES = 4;

  useEffect(() => {
    const fn = () => {
      if (!ref.current) return;
      const { top, height } = ref.current.getBoundingClientRect();
      const p = Math.max(0, Math.min(1, -top / (height - window.innerHeight)));
      setSlide(Math.min(TOTAL_SLIDES - 1, Math.floor(p * TOTAL_SLIDES)));
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <div ref={ref} style={{ height: `${TOTAL_SLIDES * 100}vh`, position: "relative" }}>
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>

        {/* Slide 0: title — deep navy gradient */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(160deg, #16165A 0%, #0A081E 100%)",
          opacity: slide === 0 ? 1 : 0,
          transition: "opacity 0.85s ease",
        }}/>

        {/* Slides 1-3: dark base for era splits */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(135deg, #0A0500 0%, #140C04 100%)",
          opacity: slide > 0 ? 1 : 0,
          transition: "opacity 0.85s ease",
        }}/>

        {/* Title overlay */}
        <HeroTitle visible={slide === 0} />

        {/* Era split panels — Gold left, Silver right, Bronze left */}
        {ERAS.map((era, i) => (
          <EraSplitPanel
            key={era.id}
            era={era}
            flip={i % 2 !== 0}
            visible={slide === i + 1}
          />
        ))}

        {/* Slide indicator dots */}
        <div style={{
          position: "absolute", bottom: "1.75rem", left: "50%",
          transform: "translateX(-50%)",
          display: "flex", gap: "10px", zIndex: 30,
          pointerEvents: "none",
        }}>
          {[null, ...ERAS].map((era, i) => (
            <div key={i} style={{
              width: slide === i ? "24px" : "7px",
              height: "3px", borderRadius: "2px",
              background: slide === i
                ? (era ? era.color : C.gold)
                : "rgba(255,255,255,0.28)",
              transition: "all 0.4s ease",
            }}/>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   STORY BLOCK
═══════════════════════════════════════════════════════════ */
function StoryBlock() {
  return (
    <section id="about" style={{ background: C.creambright, padding: "120px 2rem", textAlign: "center" }}>
      {/* Small logo in section */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "2rem" }}>
        <Logo size={72} />
      </div>

      <span style={{ fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", color: C.navy, fontFamily: "Cormorant Garamond, Georgia, serif", display: "block", marginBottom: "1.25rem" }}>
        From an honest fan
      </span>

      <h2 style={{ fontFamily: "Cormorant Garamond, Georgia, serif", fontSize: "clamp(1.9rem, 5vw, 3.4rem)", fontWeight: 300, fontStyle: "italic", color: C.ink, margin: "0 auto 1.75rem", maxWidth: "820px", lineHeight: 1.2 }}>
        Dusting off Disney gems from the past<br />and giving them a fresh polish.
      </h2>

      {/* Rainbow rule */}
      <div style={{ width: "60px", height: "3px", background: `linear-gradient(90deg, ${C.navy}, ${C.crimson}, ${C.orange}, ${C.gold})`, margin: "0 auto 2rem", borderRadius: "2px" }} />

      <p style={{ fontFamily: "Cormorant Garamond, Georgia, serif", fontSize: "1.2rem", color: C.muted, maxWidth: "600px", margin: "0 auto 1.5rem", lineHeight: 1.85, fontWeight: 300 }}>
        Hi, my name is Jay. This channel isn't about nostalgia for its own sake — it's about looking honestly at Disney's early films, understanding the artistry behind them, and asking what they still have to say.
      </p>
      <p style={{ fontFamily: "Cormorant Garamond, Georgia, serif", fontSize: "1.2rem", color: C.muted, maxWidth: "600px", margin: "0 auto 2.5rem", lineHeight: 1.85, fontWeight: 300 }}>
        Whether you're a lifelong fan or new to the magic, there's something here to spark your imagination. Pull up a chair. Let's dust off some records together.
      </p>

      <a href={YT_CHANNEL} target="_blank" rel="noopener noreferrer" style={{
        display: "inline-flex", alignItems: "center", gap: "9px",
        padding: "13px 32px",
        border: `1px solid ${C.navy}`,
        color: C.navy, fontSize: "10px", letterSpacing: "0.16em",
        textTransform: "uppercase", textDecoration: "none",
        fontFamily: "Cormorant Garamond, Georgia, serif",
      }}>
        <YTIcon size={14} /> Watch the Essays
      </a>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   ERA SECTIONS — Gold / Silver / Bronze with full-bleed
   illustrated scene panels and descriptive text
═══════════════════════════════════════════════════════════ */

/* SVG scene illustrations for each era — tall portrait format */
const ERA_SCENE_GOLD = `data:image/svg+xml,${encodeURIComponent(`<svg viewBox="0 0 800 900" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="gbg" cx="50%" cy="35%" r="75%"><stop offset="0%" stop-color="#4A3200"/><stop offset="100%" stop-color="#100C00"/></radialGradient>
    <radialGradient id="gglow" cx="50%" cy="30%" r="40%"><stop offset="0%" stop-color="#E2C227" stop-opacity="0.22"/><stop offset="100%" stop-color="#E2C227" stop-opacity="0"/></radialGradient>
  </defs>
  <rect width="800" height="900" fill="url(#gbg)"/>
  <rect width="800" height="900" fill="url(#gglow)"/>
  <!-- stars scattered -->
  <circle cx="100" cy="80"  r="2"   fill="#E2C227" opacity="0.7"/>
  <circle cx="240" cy="50"  r="1.5" fill="#E2C227" opacity="0.5"/>
  <circle cx="400" cy="70"  r="2.5" fill="#E2C227" opacity="0.8"/>
  <circle cx="560" cy="40"  r="1.5" fill="#E2C227" opacity="0.6"/>
  <circle cx="700" cy="90"  r="2"   fill="#E2C227" opacity="0.7"/>
  <circle cx="150" cy="140" r="1.5" fill="#E2C227" opacity="0.4"/>
  <circle cx="650" cy="120" r="1.5" fill="#E2C227" opacity="0.5"/>
  <circle cx="320" cy="55"  r="1.5" fill="#E2C227" opacity="0.45"/>
  <circle cx="480" cy="100" r="1.5" fill="#E2C227" opacity="0.4"/>
  <!-- film strip left -->
  <rect x="0" y="0" width="55" height="900" fill="#080600" opacity="0.8"/>
  <rect x="3" y="0" width="49" height="900" fill="none" stroke="#E2C227" stroke-width="0.5" opacity="0.25"/>
  <rect x="8" y="20"  width="39" height="48" rx="2" fill="#E2C227" opacity="0.08"/>
  <rect x="8" y="80"  width="39" height="48" rx="2" fill="#E2C227" opacity="0.08"/>
  <rect x="8" y="140" width="39" height="48" rx="2" fill="#E2C227" opacity="0.08"/>
  <rect x="8" y="200" width="39" height="48" rx="2" fill="#E2C227" opacity="0.08"/>
  <rect x="8" y="260" width="39" height="48" rx="2" fill="#E2C227" opacity="0.08"/>
  <rect x="8" y="320" width="39" height="48" rx="2" fill="#E2C227" opacity="0.08"/>
  <rect x="8" y="380" width="39" height="48" rx="2" fill="#E2C227" opacity="0.08"/>
  <rect x="8" y="440" width="39" height="48" rx="2" fill="#E2C227" opacity="0.08"/>
  <rect x="8" y="500" width="39" height="48" rx="2" fill="#E2C227" opacity="0.08"/>
  <rect x="8" y="560" width="39" height="48" rx="2" fill="#E2C227" opacity="0.08"/>
  <rect x="8" y="620" width="39" height="48" rx="2" fill="#E2C227" opacity="0.08"/>
  <rect x="8" y="680" width="39" height="48" rx="2" fill="#E2C227" opacity="0.08"/>
  <rect x="8" y="740" width="39" height="48" rx="2" fill="#E2C227" opacity="0.08"/>
  <rect x="8" y="800" width="39" height="48" rx="2" fill="#E2C227" opacity="0.08"/>
  <!-- film strip right -->
  <rect x="745" y="0" width="55" height="900" fill="#080600" opacity="0.8"/>
  <rect x="753" y="20"  width="39" height="48" rx="2" fill="#E2C227" opacity="0.08"/>
  <rect x="753" y="80"  width="39" height="48" rx="2" fill="#E2C227" opacity="0.08"/>
  <rect x="753" y="140" width="39" height="48" rx="2" fill="#E2C227" opacity="0.08"/>
  <rect x="753" y="200" width="39" height="48" rx="2" fill="#E2C227" opacity="0.08"/>
  <rect x="753" y="260" width="39" height="48" rx="2" fill="#E2C227" opacity="0.08"/>
  <rect x="753" y="320" width="39" height="48" rx="2" fill="#E2C227" opacity="0.08"/>
  <rect x="753" y="380" width="39" height="48" rx="2" fill="#E2C227" opacity="0.08"/>
  <rect x="753" y="440" width="39" height="48" rx="2" fill="#E2C227" opacity="0.08"/>
  <rect x="753" y="500" width="39" height="48" rx="2" fill="#E2C227" opacity="0.08"/>
  <rect x="753" y="560" width="39" height="48" rx="2" fill="#E2C227" opacity="0.08"/>
  <rect x="753" y="620" width="39" height="48" rx="2" fill="#E2C227" opacity="0.08"/>
  <rect x="753" y="680" width="39" height="48" rx="2" fill="#E2C227" opacity="0.08"/>
  <rect x="753" y="740" width="39" height="48" rx="2" fill="#E2C227" opacity="0.08"/>
  <!-- Enchanted forest trees flanking record -->
  <polygon points="120,760 170,420 220,760" fill="#0D0A00" opacity="0.7"/>
  <polygon points="80,760 140,380 200,760"  fill="#0D0A00" opacity="0.65"/>
  <polygon points="600,760 650,390 700,760" fill="#0D0A00" opacity="0.65"/>
  <polygon points="580,760 640,420 700,760" fill="#0D0A00" opacity="0.7"/>
  <!-- Dwarfs cottage lower left -->
  <rect x="82" y="680" width="90" height="70" fill="#1A1000" stroke="#E2C227" stroke-width="1" opacity="0.6"/>
  <polygon points="70,682 127,635 184,682" fill="#1A1000" stroke="#E2C227" stroke-width="1" opacity="0.6"/>
  <rect x="112" y="698" width="26" height="38" fill="#0D0A00" opacity="0.7"/>
  <rect x="86" y="690" width="20" height="18" rx="1" fill="#E2C227" opacity="0.1"/>
  <!-- chimney smoke -->
  <rect x="152" y="622" width="14" height="26" fill="#1A1000" stroke="#E2C227" stroke-width="0.8" opacity="0.55"/>
  <path d="M159 622 Q162 606 157 592" fill="none" stroke="#E2C227" stroke-width="1.5" stroke-linecap="round" opacity="0.25"/>
  <!-- Fantasia sorcerer hat above record — bolder -->
  <polygon points="400,142 358,275 442,275" fill="#16165A" stroke="#E2C227" stroke-width="2" opacity="0.92"/>
  <ellipse cx="400" cy="277" rx="48" ry="12" fill="#16165A" stroke="#E2C227" stroke-width="2" opacity="0.92"/>
  <line x1="362" y1="254" x2="438" y2="254" stroke="#E2C227" stroke-width="1.8" opacity="0.75"/>
  <path d="M382 180 L386 169 L390 180 L386 191 Z" fill="#E2C227" opacity="0.9"/>
  <circle cx="410" cy="196" r="3.5" fill="#E2C227" opacity="0.85"/>
  <path d="M374 210 L378 200 L382 210 L378 220 Z" fill="#E2C227" opacity="0.8"/>
  <circle cx="415" cy="226" r="2.5" fill="#E2C227" opacity="0.75"/>
  <!-- wand sparkles radiating from hat tip -->
  <line x1="400" y1="155" x2="400" y2="120" stroke="#E2C227" stroke-width="1.5" opacity="0.55"/>
  <line x1="400" y1="155" x2="428" y2="130" stroke="#E2C227" stroke-width="1.5" opacity="0.5"/>
  <line x1="400" y1="155" x2="372" y2="130" stroke="#E2C227" stroke-width="1.5" opacity="0.5"/>
  <line x1="400" y1="155" x2="432" y2="152" stroke="#E2C227" stroke-width="1.2" opacity="0.4"/>
  <line x1="400" y1="155" x2="368" y2="152" stroke="#E2C227" stroke-width="1.2" opacity="0.4"/>
  <circle cx="400" cy="118" r="3.5" fill="#E2C227" opacity="0.75"/>
  <circle cx="430" cy="128" r="2.5" fill="#E2C227" opacity="0.65"/>
  <circle cx="370" cy="128" r="2.5" fill="#E2C227" opacity="0.65"/>
  <!-- main record -->
  <circle cx="400" cy="560" r="220" fill="#1A1200" stroke="#E2C227" stroke-width="2" opacity="0.9"/>
  <circle cx="400" cy="560" r="192" fill="none" stroke="#E2C227" stroke-width="0.7" opacity="0.22"/>
  <circle cx="400" cy="560" r="164" fill="none" stroke="#E2C227" stroke-width="0.6" opacity="0.18"/>
  <circle cx="400" cy="560" r="136" fill="none" stroke="#E2C227" stroke-width="0.6" opacity="0.15"/>
  <circle cx="400" cy="560" r="108" fill="none" stroke="#E2C227" stroke-width="0.5" opacity="0.12"/>
  <circle cx="400" cy="560" r="80"  fill="none" stroke="#E2C227" stroke-width="0.5" opacity="0.1"/>
  <!-- golden label -->
  <circle cx="400" cy="560" r="65"  fill="#E2C227" opacity="0.88"/>
  <circle cx="400" cy="560" r="44"  fill="#C0182A" opacity="0.85"/>
  <path d="M388 543 L420 560 L388 577 Z" fill="#F7F0DC" opacity="0.9"/>
  <circle cx="400" cy="560" r="13" fill="#1A1200"/>
  <!-- tonearm -->
  <line x1="590" y1="310" x2="430" y2="530" stroke="#C8A010" stroke-width="5" stroke-linecap="round" opacity="0.8"/>
  <circle cx="590" cy="310" r="17" fill="#A07808" opacity="0.8"/>
  <circle cx="426" cy="536" r="8"  fill="#E2C227" opacity="0.9"/>
  <!-- golden sparkle diamonds -->
  <path d="M180 340 L183 330 L188 340 L183 350 Z" fill="#E2C227" opacity="0.4"/>
  <path d="M620 360 L623 350 L628 360 L623 370 Z" fill="#E2C227" opacity="0.35"/>
  <path d="M160 640 L163 630 L168 640 L163 650 Z" fill="#E2C227" opacity="0.38"/>
  <path d="M640 620 L643 610 L648 620 L643 630 Z" fill="#E2C227" opacity="0.35"/>
  <path d="M200 750 L203 742 L208 750 L203 758 Z" fill="#E2C227" opacity="0.32"/>
  <path d="M600 730 L603 722 L608 730 L603 738 Z" fill="#E2C227" opacity="0.32"/>

  <!-- Snow White silhouette — standing right of record, elegant pose -->
  <!-- dress skirt — full and wide -->
  <polygon points="598,780 560,620 636,620" fill="#16165A" opacity="0.55"/>
  <!-- bodice -->
  <rect x="568" y="580" width="56" height="48" rx="4" fill="#C0182A" opacity="0.48"/>
  <!-- collar -->
  <path d="M560 588 Q596 600 632 588" fill="#E2C227" opacity="0.38"/>
  <!-- head -->
  <circle cx="596" cy="558" r="24" fill="#E2C227" opacity="0.48"/>
  <!-- hair bob -->
  <path d="M572 552 Q565 570 572 585" fill="#1A1200" stroke="#1A1200" stroke-width="8" stroke-linecap="round" opacity="0.5"/>
  <path d="M620 552 Q627 570 620 585" fill="#1A1200" stroke="#1A1200" stroke-width="8" stroke-linecap="round" opacity="0.5"/>
  <!-- hair band -->
  <path d="M572 548 Q596 538 620 548" fill="none" stroke="#E2C227" stroke-width="3" opacity="0.45"/>
  <!-- arms out — welcoming gesture -->
  <path d="M568 598 Q544 580 536 560" fill="none" stroke="#E2C227" stroke-width="9" stroke-linecap="round" opacity="0.42"/>
  <path d="M624 598 Q648 582 658 562" fill="none" stroke="#C0182A" stroke-width="9" stroke-linecap="round" opacity="0.42"/>

  <!-- Bambi silhouette — lower centre-left of record, looking up -->
  <!-- body -->
  <ellipse cx="205" cy="730" rx="36" ry="24" fill="#C8A010" opacity="0.38"/>
  <!-- neck -->
  <path d="M222 710 Q234 692 228 672" fill="none" stroke="#C8A010" stroke-width="16" stroke-linecap="round" opacity="0.38"/>
  <!-- head -->
  <circle cx="226" cy="660" r="20" fill="#C8A010" opacity="0.4"/>
  <!-- ear left -->
  <ellipse cx="214" cy="646" rx="8" ry="13" fill="#C8A010" opacity="0.38" transform="rotate(-20 214 646)"/>
  <!-- ear right -->
  <ellipse cx="240" cy="644" rx="8" ry="13" fill="#C8A010" opacity="0.38" transform="rotate(20 240 644)"/>
  <!-- snout -->
  <ellipse cx="232" cy="666" rx="7" ry="5" fill="#E8A050" opacity="0.3"/>
  <!-- nose -->
  <circle cx="234" cy="663" r="2.5" fill="#A06030" opacity="0.4"/>
  <!-- front legs -->
  <line x1="188" y1="752" x2="178" y2="790" stroke="#C8A010" stroke-width="10" stroke-linecap="round" opacity="0.35"/>
  <line x1="210" y1="754" x2="205" y2="792" stroke="#C8A010" stroke-width="10" stroke-linecap="round" opacity="0.35"/>
  <!-- back legs -->
  <line x1="228" y1="752" x2="232" y2="792" stroke="#C8A010" stroke-width="10" stroke-linecap="round" opacity="0.32"/>
  <line x1="248" y1="748" x2="256" y2="786" stroke="#C8A010" stroke-width="10" stroke-linecap="round" opacity="0.32"/>
  <!-- white spots on back -->
  <circle cx="210" cy="722" r="3" fill="#F7F0DC" opacity="0.22"/>
  <circle cx="222" cy="714" r="2.5" fill="#F7F0DC" opacity="0.2"/>
  <circle cx="234" cy="718" r="2" fill="#F7F0DC" opacity="0.18"/>
  <!-- tail -->
  <circle cx="240" cy="728" r="7" fill="#F7F0DC" opacity="0.22"/>

  <text x="400" y="850" text-anchor="middle" font-family="Georgia,serif" font-size="18" fill="#E2C227" opacity="0.5" letter-spacing="6">GOLDEN AGE · 1937–1942</text>
</svg>`)}`;


const ERA_SCENE_SILVER = `data:image/svg+xml,${encodeURIComponent(`<svg viewBox="0 0 800 900" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="sbg" cx="30%" cy="30%" r="80%"><stop offset="0%" stop-color="#0C1C34"/><stop offset="100%" stop-color="#040810"/></radialGradient>
    <radialGradient id="sbeam" cx="15%" cy="25%" r="90%"><stop offset="0%" stop-color="#7FA8C4" stop-opacity="0.18"/><stop offset="100%" stop-color="#7FA8C4" stop-opacity="0"/></radialGradient>
  </defs>
  <rect width="800" height="900" fill="url(#sbg)"/>
  <rect width="800" height="900" fill="url(#sbeam)"/>
  <circle cx="200" cy="60"  r="2"   fill="#7FA8C4" opacity="0.7"/>
  <circle cx="400" cy="40"  r="1.5" fill="#7FA8C4" opacity="0.6"/>
  <circle cx="600" cy="70"  r="2"   fill="#7FA8C4" opacity="0.8"/>
  <circle cx="100" cy="120" r="1.5" fill="#7FA8C4" opacity="0.4"/>
  <circle cx="700" cy="100" r="1.5" fill="#7FA8C4" opacity="0.5"/>
  <rect x="80" y="80" width="640" height="340" rx="4" fill="#7FA8C4" opacity="0.05" stroke="#7FA8C4" stroke-width="1.5"/>
  <line x1="90" y1="100" x2="710" y2="100" stroke="#7FA8C4" stroke-width="0.4" opacity="0.07"/>
  <line x1="90" y1="115" x2="710" y2="115" stroke="#7FA8C4" stroke-width="0.4" opacity="0.07"/>
  <line x1="90" y1="130" x2="710" y2="130" stroke="#7FA8C4" stroke-width="0.4" opacity="0.07"/>
  <line x1="90" y1="145" x2="710" y2="145" stroke="#7FA8C4" stroke-width="0.4" opacity="0.07"/>
  <line x1="90" y1="160" x2="710" y2="160" stroke="#7FA8C4" stroke-width="0.4" opacity="0.07"/>
  <line x1="90" y1="175" x2="710" y2="175" stroke="#7FA8C4" stroke-width="0.4" opacity="0.07"/>
  <line x1="90" y1="190" x2="710" y2="190" stroke="#7FA8C4" stroke-width="0.4" opacity="0.07"/>
  <line x1="90" y1="205" x2="710" y2="205" stroke="#7FA8C4" stroke-width="0.4" opacity="0.07"/>
  <line x1="90" y1="220" x2="710" y2="220" stroke="#7FA8C4" stroke-width="0.4" opacity="0.07"/>
  <line x1="90" y1="235" x2="710" y2="235" stroke="#7FA8C4" stroke-width="0.4" opacity="0.07"/>
  <line x1="90" y1="250" x2="710" y2="250" stroke="#7FA8C4" stroke-width="0.4" opacity="0.07"/>
  <line x1="90" y1="265" x2="710" y2="265" stroke="#7FA8C4" stroke-width="0.4" opacity="0.07"/>
  <line x1="90" y1="280" x2="710" y2="280" stroke="#7FA8C4" stroke-width="0.4" opacity="0.07"/>
  <line x1="90" y1="295" x2="710" y2="295" stroke="#7FA8C4" stroke-width="0.4" opacity="0.07"/>
  <line x1="90" y1="310" x2="710" y2="310" stroke="#7FA8C4" stroke-width="0.4" opacity="0.07"/>
  <line x1="90" y1="325" x2="710" y2="325" stroke="#7FA8C4" stroke-width="0.4" opacity="0.07"/>
  <line x1="90" y1="340" x2="710" y2="340" stroke="#7FA8C4" stroke-width="0.4" opacity="0.07"/>
  <line x1="90" y1="355" x2="710" y2="355" stroke="#7FA8C4" stroke-width="0.4" opacity="0.07"/>
  <line x1="90" y1="370" x2="710" y2="370" stroke="#7FA8C4" stroke-width="0.4" opacity="0.07"/>
  <line x1="90" y1="385" x2="710" y2="385" stroke="#7FA8C4" stroke-width="0.4" opacity="0.07"/>
  <polygon points="60,900 200,430 560,430 700,900" fill="#7FA8C4" opacity="0.03"/>
  <polygon points="60,900 180,430 220,430 60,900"  fill="#7FA8C4" opacity="0.04"/>
  <rect x="60" y="720" width="160" height="120" rx="10" fill="#0A1420" stroke="#7FA8C4" stroke-width="2" opacity="0.85"/>
  <circle cx="100" cy="760" r="35" fill="none" stroke="#7FA8C4" stroke-width="2" opacity="0.7"/>
  <circle cx="100" cy="760" r="22" fill="none" stroke="#7FA8C4" stroke-width="1" opacity="0.4"/>
  <circle cx="100" cy="760" r="8"  fill="#7FA8C4" opacity="0.5"/>
  <line x1="100" y1="760" x2="130" y2="760" stroke="#7FA8C4" stroke-width="1.5" opacity="0.45"/>
  <line x1="100" y1="760" x2="121" y2="781" stroke="#7FA8C4" stroke-width="1.5" opacity="0.45"/>
  <line x1="100" y1="760" x2="100" y2="790" stroke="#7FA8C4" stroke-width="1.5" opacity="0.45"/>
  <line x1="100" y1="760" x2="79"  y2="781" stroke="#7FA8C4" stroke-width="1.5" opacity="0.45"/>
  <line x1="100" y1="760" x2="70"  y2="760" stroke="#7FA8C4" stroke-width="1.5" opacity="0.45"/>
  <line x1="100" y1="760" x2="79"  y2="739" stroke="#7FA8C4" stroke-width="1.5" opacity="0.45"/>
  <line x1="100" y1="760" x2="100" y2="730" stroke="#7FA8C4" stroke-width="1.5" opacity="0.45"/>
  <line x1="100" y1="760" x2="121" y2="739" stroke="#7FA8C4" stroke-width="1.5" opacity="0.45"/>
  <circle cx="185" cy="760" r="30" fill="none" stroke="#7FA8C4" stroke-width="2" opacity="0.6"/>
  <circle cx="185" cy="760" r="8"  fill="#7FA8C4" opacity="0.45"/>
  <line x1="185" y1="760" x2="210" y2="760" stroke="#7FA8C4" stroke-width="1" opacity="0.4"/>
  <line x1="185" y1="760" x2="203" y2="778" stroke="#7FA8C4" stroke-width="1" opacity="0.4"/>
  <line x1="185" y1="760" x2="185" y2="785" stroke="#7FA8C4" stroke-width="1" opacity="0.4"/>
  <line x1="185" y1="760" x2="167" y2="778" stroke="#7FA8C4" stroke-width="1" opacity="0.4"/>
  <line x1="185" y1="760" x2="160" y2="760" stroke="#7FA8C4" stroke-width="1" opacity="0.4"/>
  <line x1="185" y1="760" x2="167" y2="742" stroke="#7FA8C4" stroke-width="1" opacity="0.4"/>
  <line x1="185" y1="760" x2="185" y2="735" stroke="#7FA8C4" stroke-width="1" opacity="0.4"/>
  <line x1="185" y1="760" x2="203" y2="742" stroke="#7FA8C4" stroke-width="1" opacity="0.4"/>
  <ellipse cx="230" cy="790" rx="22" ry="22" fill="#040C18" stroke="#7FA8C4" stroke-width="2" opacity="0.9"/>
  <ellipse cx="230" cy="790" rx="13" ry="13" fill="#7FA8C4" opacity="0.12"/>
  <rect x="70"  y="530" width="54" height="28" rx="7" fill="#0A1824" stroke="#7FA8C4" stroke-width="1" opacity="0.20"/>
  <rect x="144" y="530" width="54" height="28" rx="7" fill="#0A1824" stroke="#7FA8C4" stroke-width="1" opacity="0.20"/>
  <rect x="218" y="530" width="54" height="28" rx="7" fill="#0A1824" stroke="#7FA8C4" stroke-width="1" opacity="0.20"/>
  <rect x="292" y="530" width="54" height="28" rx="7" fill="#0A1824" stroke="#7FA8C4" stroke-width="1" opacity="0.20"/>
  <rect x="366" y="530" width="54" height="28" rx="7" fill="#0A1824" stroke="#7FA8C4" stroke-width="1" opacity="0.20"/>
  <rect x="440" y="530" width="54" height="28" rx="7" fill="#0A1824" stroke="#7FA8C4" stroke-width="1" opacity="0.20"/>
  <rect x="514" y="530" width="54" height="28" rx="7" fill="#0A1824" stroke="#7FA8C4" stroke-width="1" opacity="0.20"/>
  <rect x="588" y="530" width="54" height="28" rx="7" fill="#0A1824" stroke="#7FA8C4" stroke-width="1" opacity="0.20"/>
  <rect x="662" y="530" width="54" height="28" rx="7" fill="#0A1824" stroke="#7FA8C4" stroke-width="1" opacity="0.20"/>
  <rect x="70"  y="570" width="54" height="28" rx="7" fill="#0A1824" stroke="#7FA8C4" stroke-width="1" opacity="0.26"/>
  <rect x="144" y="570" width="54" height="28" rx="7" fill="#0A1824" stroke="#7FA8C4" stroke-width="1" opacity="0.26"/>
  <rect x="218" y="570" width="54" height="28" rx="7" fill="#0A1824" stroke="#7FA8C4" stroke-width="1" opacity="0.26"/>
  <rect x="292" y="570" width="54" height="28" rx="7" fill="#0A1824" stroke="#7FA8C4" stroke-width="1" opacity="0.26"/>
  <rect x="366" y="570" width="54" height="28" rx="7" fill="#0A1824" stroke="#7FA8C4" stroke-width="1" opacity="0.26"/>
  <rect x="440" y="570" width="54" height="28" rx="7" fill="#0A1824" stroke="#7FA8C4" stroke-width="1" opacity="0.26"/>
  <rect x="514" y="570" width="54" height="28" rx="7" fill="#0A1824" stroke="#7FA8C4" stroke-width="1" opacity="0.26"/>
  <rect x="588" y="570" width="54" height="28" rx="7" fill="#0A1824" stroke="#7FA8C4" stroke-width="1" opacity="0.26"/>
  <rect x="662" y="570" width="54" height="28" rx="7" fill="#0A1824" stroke="#7FA8C4" stroke-width="1" opacity="0.26"/>
  <rect x="70"  y="610" width="54" height="28" rx="7" fill="#0A1824" stroke="#7FA8C4" stroke-width="1" opacity="0.32"/>
  <rect x="144" y="610" width="54" height="28" rx="7" fill="#0A1824" stroke="#7FA8C4" stroke-width="1" opacity="0.32"/>
  <rect x="218" y="610" width="54" height="28" rx="7" fill="#0A1824" stroke="#7FA8C4" stroke-width="1" opacity="0.32"/>
  <rect x="292" y="610" width="54" height="28" rx="7" fill="#0A1824" stroke="#7FA8C4" stroke-width="1" opacity="0.32"/>
  <rect x="366" y="610" width="54" height="28" rx="7" fill="#0A1824" stroke="#7FA8C4" stroke-width="1" opacity="0.32"/>
  <rect x="440" y="610" width="54" height="28" rx="7" fill="#0A1824" stroke="#7FA8C4" stroke-width="1" opacity="0.32"/>
  <rect x="514" y="610" width="54" height="28" rx="7" fill="#0A1824" stroke="#7FA8C4" stroke-width="1" opacity="0.32"/>
  <rect x="588" y="610" width="54" height="28" rx="7" fill="#0A1824" stroke="#7FA8C4" stroke-width="1" opacity="0.32"/>
  <rect x="662" y="610" width="54" height="28" rx="7" fill="#0A1824" stroke="#7FA8C4" stroke-width="1" opacity="0.32"/>
  <rect x="70"  y="650" width="54" height="28" rx="7" fill="#0A1824" stroke="#7FA8C4" stroke-width="1" opacity="0.38"/>
  <rect x="144" y="650" width="54" height="28" rx="7" fill="#0A1824" stroke="#7FA8C4" stroke-width="1" opacity="0.38"/>
  <rect x="218" y="650" width="54" height="28" rx="7" fill="#0A1824" stroke="#7FA8C4" stroke-width="1" opacity="0.38"/>
  <rect x="292" y="650" width="54" height="28" rx="7" fill="#0A1824" stroke="#7FA8C4" stroke-width="1" opacity="0.38"/>
  <rect x="366" y="650" width="54" height="28" rx="7" fill="#0A1824" stroke="#7FA8C4" stroke-width="1" opacity="0.38"/>
  <rect x="440" y="650" width="54" height="28" rx="7" fill="#0A1824" stroke="#7FA8C4" stroke-width="1" opacity="0.38"/>
  <rect x="514" y="650" width="54" height="28" rx="7" fill="#0A1824" stroke="#7FA8C4" stroke-width="1" opacity="0.38"/>
  <rect x="588" y="650" width="54" height="28" rx="7" fill="#0A1824" stroke="#7FA8C4" stroke-width="1" opacity="0.38"/>
  <rect x="662" y="650" width="54" height="28" rx="7" fill="#0A1824" stroke="#7FA8C4" stroke-width="1" opacity="0.38"/>
  <circle cx="160" cy="500" r="2" fill="#7FA8C4" opacity="0.35"/>
  <circle cx="250" cy="480" r="2" fill="#7FA8C4" opacity="0.35"/>
  <circle cx="340" cy="465" r="2" fill="#7FA8C4" opacity="0.35"/>
  <circle cx="430" cy="470" r="2" fill="#7FA8C4" opacity="0.35"/>
  <circle cx="520" cy="485" r="2" fill="#7FA8C4" opacity="0.35"/>
  <circle cx="610" cy="500" r="2" fill="#7FA8C4" opacity="0.35"/>
  <circle cx="680" cy="510" r="2" fill="#7FA8C4" opacity="0.35"/>

  <!-- Cinderella castle projected on the cinema screen — centre top section -->
  <!-- castle glow backdrop on screen -->
  <ellipse cx="400" cy="230" rx="210" ry="130" fill="#7FA8C4" opacity="0.06"/>
  <!-- main keep base -->
  <rect x="310" y="198" width="180" height="220" fill="#7FA8C4" opacity="0.28"/>
  <!-- centre main spire — tallest -->
  <polygon points="400,82 376,198 424,198" fill="#7FA8C4" opacity="0.65"/>
  <line x1="400" y1="82" x2="400" y2="62" stroke="#7FA8C4" stroke-width="2" opacity="0.7"/>
  <polygon points="400,62 413,74 400,86" fill="#7FA8C4" opacity="0.7"/>
  <!-- two flanking towers centre -->
  <rect x="286" y="148" width="56" height="90" fill="#7FA8C4" opacity="0.35"/>
  <polygon points="314,98 296,148 332,148" fill="#7FA8C4" opacity="0.55"/>
  <line x1="314" y1="98" x2="314" y2="82" stroke="#7FA8C4" stroke-width="1.5" opacity="0.62"/>
  <rect x="458" y="148" width="56" height="90" fill="#7FA8C4" opacity="0.35"/>
  <polygon points="486,98 468,148 504,148" fill="#7FA8C4" opacity="0.55"/>
  <line x1="486" y1="98" x2="486" y2="82" stroke="#7FA8C4" stroke-width="1.5" opacity="0.62"/>
  <!-- outer short turrets -->
  <rect x="240" y="188" width="46" height="70" fill="#7FA8C4" opacity="0.25"/>
  <polygon points="263,152 248,188 278,188" fill="#7FA8C4" opacity="0.44"/>
  <rect x="514" y="188" width="46" height="70" fill="#7FA8C4" opacity="0.25"/>
  <polygon points="537,152 522,188 552,188" fill="#7FA8C4" opacity="0.44"/>
  <!-- castle arch gateway -->
  <path d="M358 418 Q400 390 442 418" fill="#0A1828" opacity="0.5"/>
  <rect x="368" y="380" width="64" height="38" fill="#0A1828" opacity="0.45"/>
  <!-- castle windows — glowing -->
  <rect x="332" y="215" width="22" height="26" rx="11" fill="#7FA8C4" opacity="0.2"/>
  <rect x="446" y="215" width="22" height="26" rx="11" fill="#7FA8C4" opacity="0.2"/>
  <rect x="386" y="220" width="28" height="32" rx="14" fill="#7FA8C4" opacity="0.18"/>
  <!-- reflection shimmer on screen -->
  <line x1="88" y1="418" x2="712" y2="418" stroke="#7FA8C4" stroke-width="0.5" opacity="0.08"/>

  <!-- Tinker Bell silhouette — flying upper right near screen -->
  <!-- body -->
  <ellipse cx="660" cy="118" rx="10" ry="14" fill="#7FA8C4" opacity="0.62"/>
  <!-- head -->
  <circle cx="660" cy="100" r="10" fill="#7FA8C4" opacity="0.65"/>
  <!-- bun on head -->
  <circle cx="664" cy="92"  r="5" fill="#7FA8C4" opacity="0.6"/>
  <!-- wings -->
  <ellipse cx="678" cy="114" rx="18" ry="9" fill="#7FA8C4" opacity="0.28" transform="rotate(-30 678 114)"/>
  <ellipse cx="643" cy="114" rx="18" ry="9" fill="#7FA8C4" opacity="0.28" transform="rotate(30 643 114)"/>
  <!-- dress flare -->
  <polygon points="652,130 660,152 668,130" fill="#7FA8C4" opacity="0.55"/>
  <!-- legs -->
  <line x1="656" y1="150" x2="651" y2="166" stroke="#7FA8C4" stroke-width="2" opacity="0.45"/>
  <line x1="664" y1="150" x2="669" y2="166" stroke="#7FA8C4" stroke-width="2" opacity="0.45"/>
  <!-- wand sparkle trail -->
  <circle cx="640" cy="108" r="3"   fill="#7FA8C4" opacity="0.7"/>
  <circle cx="628" cy="118" r="2"   fill="#7FA8C4" opacity="0.55"/>
  <circle cx="618" cy="132" r="1.5" fill="#7FA8C4" opacity="0.4"/>
  <circle cx="614" cy="148" r="1"   fill="#7FA8C4" opacity="0.3"/>
  <!-- pixie dust arc -->
  <path d="M638 110 Q610 140 600 170" fill="none" stroke="#7FA8C4" stroke-width="1" stroke-dasharray="3 4" opacity="0.35"/>

  <!-- Peter Pan shadow silhouette lower left flying -->
  <ellipse cx="148" cy="458" rx="24" ry="14" fill="#7FA8C4" opacity="0.38"/>
  <circle  cx="148" cy="440" r="14" fill="#7FA8C4" opacity="0.4"/>
  <polygon points="140,422 148,402 156,422" fill="#7FA8C4" opacity="0.38"/>
  <!-- cape sweep -->
  <path d="M124 462 Q108 480 118 498" fill="none" stroke="#7FA8C4" stroke-width="6" stroke-linecap="round" opacity="0.32"/>
  <!-- shooting star beside Peter Pan -->
  <line x1="180" y1="388" x2="240" y2="350" stroke="#7FA8C4" stroke-width="1.5" opacity="0.45"/>
  <circle cx="180" cy="388" r="2.5" fill="#7FA8C4" opacity="0.7"/>

  <text x="400" y="870" text-anchor="middle" font-family="Georgia,serif" font-size="18" fill="#7FA8C4" opacity="0.5" letter-spacing="6">SILVER AGE · 1950–1967</text>
</svg>`)}`;

const ERA_SCENE_BRONZE = `data:image/svg+xml,${encodeURIComponent(`<svg viewBox="0 0 800 900" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="bbg" cx="50%" cy="50%" r="75%"><stop offset="0%" stop-color="#2E1800"/><stop offset="100%" stop-color="#0A0500"/></radialGradient>
    <radialGradient id="bwarm" cx="50%" cy="45%" r="55%"><stop offset="0%" stop-color="#E8641A" stop-opacity="0.12"/><stop offset="100%" stop-color="#E8641A" stop-opacity="0"/></radialGradient>
  </defs>
  <rect width="800" height="900" fill="url(#bbg)"/>
  <rect width="800" height="900" fill="url(#bwarm)"/>
  <circle cx="150" cy="70"  r="2"   fill="#A07040" opacity="0.6"/>
  <circle cx="380" cy="50"  r="1.5" fill="#E8641A" opacity="0.5"/>
  <circle cx="620" cy="80"  r="2"   fill="#A07040" opacity="0.7"/>
  <circle cx="250" cy="130" r="1.5" fill="#E8641A" opacity="0.4"/>
  <!-- Aristocats cat silhouettes top left — duchess with kittens -->
  <!-- Duchess -->
  <ellipse cx="130" cy="140" rx="28" ry="18" fill="#E8641A" opacity="0.48"/>
  <circle cx="148" cy="124" r="17" fill="#E8641A" opacity="0.5"/>
  <polygon points="142,110 138,92 150,106" fill="#E8641A" opacity="0.48"/>
  <polygon points="153,108 156,90 162,105" fill="#E8641A" opacity="0.48"/>
  <!-- kitten left -->
  <circle cx="95" cy="148" r="11" fill="#A07040" opacity="0.42"/>
  <polygon points="90,138 88,126 96,136" fill="#A07040" opacity="0.42"/>
  <polygon points="100,136 102,124 107,135" fill="#A07040" opacity="0.42"/>
  <!-- kitten right -->
  <circle cx="175" cy="152" r="11" fill="#C8A010" opacity="0.42"/>
  <polygon points="170,142 168,130 176,140" fill="#C8A010" opacity="0.42"/>
  <polygon points="180,140 182,128 187,139" fill="#C8A010" opacity="0.42"/>
  <!-- Robin Hood archer silhouette top right — bow raised -->
  <ellipse cx="640" cy="132" rx="22" ry="15" fill="#A07040" opacity="0.45"/>
  <circle cx="655" cy="116" r="14" fill="#A07040" opacity="0.48"/>
  <!-- fox ears -->
  <polygon points="650,104 647,88 658,102" fill="#A07040" opacity="0.45"/>
  <polygon points="659,102 660,86 668,100" fill="#A07040" opacity="0.45"/>
  <!-- bow -->
  <path d="M685 100 Q710 120 685 148" fill="none" stroke="#C8A010" stroke-width="3" stroke-linecap="round" opacity="0.6"/>
  <line x1="685" y1="100" x2="685" y2="148" stroke="#C8A010" stroke-width="1.2" opacity="0.4"/>
  <!-- arrow -->
  <line x1="665" y1="124" x2="710" y2="124" stroke="#E8641A" stroke-width="2" stroke-linecap="round" opacity="0.55"/>
  <polygon points="710,124 702,119 702,129" fill="#E8641A" opacity="0.55"/>
  <!-- hat on robin hood -->
  <ellipse cx="660" cy="106" rx="18" ry="5" fill="#2A5020" opacity="0.5"/>
  <rect x="646" y="96" width="28" height="12" rx="2" fill="#2A5020" opacity="0.5"/>
  <path d="M670 98 Q676 90 672 84" fill="none" stroke="#E8641A" stroke-width="2" stroke-linecap="round" opacity="0.5"/>
  <ellipse cx="400" cy="530" rx="300" ry="38" fill="#0A0500" opacity="0.7"/>
  <circle  cx="400" cy="480" r="270" fill="#160D00" stroke="#A07040" stroke-width="2.5" opacity="0.95"/>
  <circle cx="400" cy="480" r="240" fill="none" stroke="#A07040" stroke-width="0.7" opacity="0.12"/>
  <circle cx="400" cy="480" r="210" fill="none" stroke="#A07040" stroke-width="0.7" opacity="0.12"/>
  <circle cx="400" cy="480" r="180" fill="none" stroke="#A07040" stroke-width="0.7" opacity="0.12"/>
  <circle cx="400" cy="480" r="150" fill="none" stroke="#A07040" stroke-width="0.7" opacity="0.12"/>
  <circle cx="400" cy="480" r="120" fill="none" stroke="#A07040" stroke-width="0.7" opacity="0.12"/>
  <circle cx="400" cy="480" r="90"  fill="none" stroke="#A07040" stroke-width="0.7" opacity="0.12"/>
  <circle cx="400" cy="480" r="80"  fill="#E8641A" opacity="0.8"/>
  <circle cx="400" cy="480" r="55"  fill="#A07040" opacity="0.9"/>
  <line x1="400" y1="480" x2="640" y2="480" stroke="#A07040" stroke-width="0.7" opacity="0.12"/>
  <line x1="400" y1="480" x2="570" y2="650" stroke="#A07040" stroke-width="0.7" opacity="0.12"/>
  <line x1="400" y1="480" x2="400" y2="720" stroke="#A07040" stroke-width="0.7" opacity="0.12"/>
  <line x1="400" y1="480" x2="230" y2="650" stroke="#A07040" stroke-width="0.7" opacity="0.12"/>
  <line x1="400" y1="480" x2="160" y2="480" stroke="#A07040" stroke-width="0.7" opacity="0.12"/>
  <line x1="400" y1="480" x2="230" y2="310" stroke="#A07040" stroke-width="0.7" opacity="0.12"/>
  <line x1="400" y1="480" x2="400" y2="240" stroke="#A07040" stroke-width="0.7" opacity="0.12"/>
  <line x1="400" y1="480" x2="570" y2="310" stroke="#A07040" stroke-width="0.7" opacity="0.12"/>
  <circle cx="400" cy="480" r="16" fill="#0A0500"/>
  <line x1="650" y1="180" x2="435" y2="450" stroke="#C89060" stroke-width="6" stroke-linecap="round" opacity="0.85"/>
  <circle cx="650" cy="180" r="22" fill="#8A6030" opacity="0.8"/>
  <circle cx="430" cy="458" r="10" fill="#E8641A" opacity="0.9"/>
  <rect x="160" y="700" width="220" height="140" rx="10" fill="#0E0800" stroke="#A07040" stroke-width="2" opacity="0.9"/>
  <rect x="178" y="716" width="184" height="72" rx="4" fill="#160D00" stroke="#A07040" stroke-width="1" opacity="0.6"/>
  <circle cx="222" cy="752" r="26" fill="#0A0600" stroke="#A07040" stroke-width="1.5" opacity="0.8"/>
  <circle cx="222" cy="752" r="8"  fill="#A07040" opacity="0.6"/>
  <line x1="222" y1="752" x2="244" y2="752" stroke="#A07040" stroke-width="1" opacity="0.4"/>
  <line x1="222" y1="752" x2="233" y2="771" stroke="#A07040" stroke-width="1" opacity="0.4"/>
  <line x1="222" y1="752" x2="211" y2="771" stroke="#A07040" stroke-width="1" opacity="0.4"/>
  <line x1="222" y1="752" x2="200" y2="752" stroke="#A07040" stroke-width="1" opacity="0.4"/>
  <line x1="222" y1="752" x2="211" y2="733" stroke="#A07040" stroke-width="1" opacity="0.4"/>
  <line x1="222" y1="752" x2="233" y2="733" stroke="#A07040" stroke-width="1" opacity="0.4"/>
  <circle cx="318" cy="752" r="24" fill="#0A0600" stroke="#A07040" stroke-width="1.5" opacity="0.8"/>
  <circle cx="318" cy="752" r="8"  fill="#A07040" opacity="0.6"/>
  <line x1="318" y1="752" x2="338" y2="752" stroke="#A07040" stroke-width="1" opacity="0.4"/>
  <line x1="318" y1="752" x2="328" y2="769" stroke="#A07040" stroke-width="1" opacity="0.4"/>
  <line x1="318" y1="752" x2="308" y2="769" stroke="#A07040" stroke-width="1" opacity="0.4"/>
  <line x1="318" y1="752" x2="298" y2="752" stroke="#A07040" stroke-width="1" opacity="0.4"/>
  <line x1="318" y1="752" x2="308" y2="735" stroke="#A07040" stroke-width="1" opacity="0.4"/>
  <line x1="318" y1="752" x2="328" y2="735" stroke="#A07040" stroke-width="1" opacity="0.4"/>
  <rect x="420" y="720" width="210" height="130" rx="10" fill="#0E0800" stroke="#E8641A" stroke-width="1.5" opacity="0.7"/>

  <!-- Jungle Book — Baloo the bear dancing silhouette lower left of record -->
  <!-- Baloo body — large round bear -->
  <ellipse cx="155" cy="620" rx="52" ry="42" fill="#A07040" opacity="0.42"/>
  <!-- head -->
  <circle cx="182" cy="582" r="34" fill="#A07040" opacity="0.44"/>
  <!-- round bear ears -->
  <circle cx="165" cy="556" r="12" fill="#A07040" opacity="0.42"/>
  <circle cx="197" cy="552" r="12" fill="#A07040" opacity="0.42"/>
  <!-- bear snout -->
  <ellipse cx="192" cy="588" rx="12" ry="8" fill="#C89060" opacity="0.35"/>
  <!-- arm raised (dancing) -->
  <path d="M200 600 Q230 570 220 545" fill="none" stroke="#A07040" stroke-width="18" stroke-linecap="round" opacity="0.42"/>
  <!-- other arm out -->
  <path d="M110 612 Q82 600 78 575" fill="none" stroke="#A07040" stroke-width="14" stroke-linecap="round" opacity="0.38"/>
  <!-- feet -->
  <ellipse cx="128" cy="662" rx="18" ry="10" fill="#A07040" opacity="0.38"/>
  <ellipse cx="178" cy="668" rx="18" ry="10" fill="#A07040" opacity="0.38"/>

  <!-- Mowgli silhouette — small boy beside Baloo -->
  <ellipse cx="228" cy="648" rx="16" ry="12" fill="#E8641A" opacity="0.5"/>
  <circle  cx="232" cy="628" r="13" fill="#E8641A" opacity="0.52"/>
  <!-- arms up dancing -->
  <path d="M220 638 Q205 622 208 608" fill="none" stroke="#E8641A" stroke-width="7" stroke-linecap="round" opacity="0.45"/>
  <path d="M242 638 Q258 622 255 608" fill="none" stroke="#E8641A" stroke-width="7" stroke-linecap="round" opacity="0.45"/>
  <!-- legs -->
  <line x1="224" y1="660" x2="218" y2="684" stroke="#E8641A" stroke-width="8" stroke-linecap="round" opacity="0.45"/>
  <line x1="236" y1="660" x2="242" y2="684" stroke="#E8641A" stroke-width="8" stroke-linecap="round" opacity="0.45"/>

  <!-- tropical leaves around record — Jungle Book foliage -->
  <path d="M80 400 Q60 360 100 340 Q90 380 120 390 Z" fill="#1A3010" opacity="0.55"/>
  <path d="M100 420 Q72 390 104 362 Q100 400 136 406 Z" fill="#0E2008" opacity="0.5"/>
  <path d="M680 390 Q720 360 700 335 Q710 374 676 382 Z" fill="#1A3010" opacity="0.55"/>
  <path d="M660 415 Q700 390 696 355 Q700 394 664 400 Z" fill="#0E2008" opacity="0.5"/>

  <!-- Winnie the Pooh honey pot on the record label -->
  <rect x="378" y="464" width="44" height="36" rx="6" fill="#E8641A" opacity="0.55"/>
  <ellipse cx="400" cy="464" rx="22" ry="7" fill="#C86010" opacity="0.6"/>
  <ellipse cx="400" cy="500" rx="22" ry="7" fill="#C86010" opacity="0.5"/>
  <!-- honey drip -->
  <path d="M412 500 Q414 508 412 514" fill="none" stroke="#C8A010" stroke-width="3" stroke-linecap="round" opacity="0.6"/>
  <!-- "hunny" label -->
  <rect x="383" y="474" width="34" height="16" rx="2" fill="#FAE8A0" opacity="0.18"/>

  <text x="400" y="870" text-anchor="middle" font-family="Georgia,serif" font-size="18" fill="#A07040" opacity="0.5" letter-spacing="6">BRONZE AGE · 1970–1988</text>
</svg>`)}`;

const ERAS = [
  {
    id: "golden",
    name: "Golden Age",
    years: "1937 – 1942",
    color: "#E2C227",
    bg: "#FAF5E4",
    scene: ERA_SCENE_GOLD,
    films: ["Snow White and the Seven Dwarfs", "Pinocchio", "Fantasia", "Dumbo", "Bambi"],
    desc: "Disney's first golden era produced five feature films that defined animated cinema forever. Hand-drawn with extraordinary care, these films established the art form and set a standard that still moves audiences today.",
  },
  {
    id: "silver",
    name: "Silver Age",
    years: "1950 – 1967",
    color: "#7FA8C4",
    bg: "#EEF3F8",
    scene: ERA_SCENE_SILVER,
    films: ["Cinderella", "Alice in Wonderland", "Peter Pan", "Sleeping Beauty", "The Jungle Book"],
    desc: "After a lean wartime period, Disney returned with a string of beloved classics. The Silver Age brought princess stories, vivid colour, and unforgettable music to audiences around the world.",
  },
  {
    id: "bronze",
    name: "Bronze Age",
    years: "1970 – 1988",
    color: "#A07040",
    bg: "#F5EEE4",
    scene: ERA_SCENE_BRONZE,
    films: ["The Aristocats", "Robin Hood", "The Fox and the Hound", "The Black Cauldron", "Oliver & Company"],
    desc: "Often overlooked, the Bronze Age deserves a second look. Caught between eras, these films carry real heart and risk. They are the underdog chapter of Disney history — and the most honest.",
  },
];

function EraSection({ era, flip }) {
  return (
    <section style={{ background: era.bg, padding: "0" }}>
      <div style={{
        maxWidth: "1200px", margin: "0 auto",
        display: "grid",
        gridTemplateColumns: flip ? "1fr 1fr" : "1fr 1fr",
        minHeight: "520px",
      }}>
        {/* Image panel */}
        <div style={{
          order: flip ? 2 : 1,
          overflow: "hidden",
          position: "relative",
          minHeight: "480px",
        }}>
          <img
            src={era.scene}
            alt={era.name}
            style={{
              width: "100%", height: "100%",
              objectFit: "cover",
              display: "block",
              position: "absolute", inset: 0,
            }}
          />
          {/* Era name overlay */}
          <div style={{
            position: "absolute", inset: 0,
            display: "flex", alignItems: "flex-end",
            padding: "2rem",
            background: "linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 60%)",
          }}>
            <span style={{
              fontFamily: "Cormorant Garamond, Georgia, serif",
              fontSize: "clamp(2rem, 4vw, 3.2rem)",
              fontStyle: "italic", fontWeight: 300,
              color: era.color,
              textShadow: "0 2px 12px rgba(0,0,0,0.5)",
              lineHeight: 1,
            }}>
              {era.name}
            </span>
          </div>
        </div>

        {/* Text panel */}
        <div style={{
          order: flip ? 1 : 2,
          padding: "60px 56px",
          display: "flex", flexDirection: "column", justifyContent: "center",
        }}>
          <span style={{
            fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase",
            color: era.color, fontFamily: "Cormorant Garamond, Georgia, serif",
            display: "block", marginBottom: "0.75rem",
          }}>{era.years}</span>

          <h2 style={{
            fontFamily: "Cormorant Garamond, Georgia, serif",
            fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
            fontWeight: 300, fontStyle: "italic",
            color: C.ink, margin: "0 0 1rem", lineHeight: 1.2,
          }}>{era.name}</h2>

          <div style={{ width: "36px", height: "2px", background: era.color, marginBottom: "1.5rem", borderRadius: "1px" }} />

          <p style={{
            fontFamily: "Cormorant Garamond, Georgia, serif",
            fontSize: "1.05rem", color: C.muted,
            lineHeight: 1.85, fontWeight: 300, marginBottom: "1.75rem",
          }}>{era.desc}</p>

          {/* Film list */}
          <ul style={{ listStyle: "none", padding: 0, margin: "0 0 2rem", display: "flex", flexDirection: "column", gap: "6px" }}>
            {era.films.map(film => (
              <li key={film} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: era.color, flexShrink: 0 }} />
                <span style={{ fontFamily: "Cormorant Garamond, Georgia, serif", fontSize: "0.95rem", fontStyle: "italic", color: C.muted }}>{film}</span>
              </li>
            ))}
          </ul>

          <a href={YT_CHANNEL} target="_blank" rel="noopener noreferrer" style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            padding: "11px 26px", alignSelf: "flex-start",
            border: `1px solid ${era.color}`,
            color: era.color, fontSize: "10px", letterSpacing: "0.16em",
            textTransform: "uppercase", textDecoration: "none",
            fontFamily: "Cormorant Garamond, Georgia, serif",
          }}>
            <YTIcon size={13} /> Watch Essays
          </a>
        </div>
      </div>
    </section>
  );
}

function EraSections() {
  return (
    <>
      {ERAS.map((era, i) => <EraSection key={era.id} era={era} flip={i % 2 !== 0} />)}
    </>
  );
}

/* ─────────────────────────────────────────────────────────────
   YOUTUBE API CONFIG
   1. Get a free API key at console.cloud.google.com
   2. Enable "YouTube Data API v3"
   3. Paste your key below — restrict it to your domain for safety
──────────────────────────────────────────────────────────── */
const YT_API_KEY    = "AIzaSyDcnGgMHJkMeJfMD-uN3LRhTy6twyV6DjI"; // ← paste your key here
const YT_CHANNEL_ID = "UCEI6AH_ZeYSpc6FmJ-FRd8g";
const YT_MAX_RESULTS = 6;

/* Detect era from video title keywords */
function detectEra(title = "") {
  const t = title.toLowerCase();
  if (/golden|snow white|pinocchio|fantasia|dumbo|bambi|1937|1938|1939|1940|1941|1942/.test(t)) return "Golden Age";
  if (/silver|cinderella|alice|peter pan|sleeping|jungle book|lady|tramp|101|1950|1951|1952|1953|1954|1955|1956|1957|1958|1959|1960|1961|1962|1963|1964|1965|1966|1967/.test(t)) return "Silver Age";
  if (/bronze|aristocats|robin hood|fox|hound|rescuers|cauldron|oliver|great mouse|1970|1971|1972|1973|1974|1975|1976|1977|1978|1979|1980|1981|1982|1983|1984|1985|1986|1987|1988/.test(t)) return "Bronze Age";
  return null;
}

/* Format ISO duration or publish date into a readable string */
function formatDate(iso) {
  try {
    return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
  } catch { return ""; }
}

/* ═══════════════════════════════════════════════════════════
   ESSAY CARD — works with both live API data and static data
═══════════════════════════════════════════════════════════ */
function EssayCard({ video }) {
  const [hovered, setHov] = useState(false);
  const era     = detectEra(video.title) || video.era;
  const eraCol  = ERA_COLOR[era] || C.gold;
  const href    = video.videoId
    ? `https://www.youtube.com/watch?v=${video.videoId}`
    : YT_CHANNEL;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ cursor: "pointer", background: C.creambright, overflow: "hidden", display: "block", textDecoration: "none" }}
    >
      {/* Thumbnail */}
      <div style={{ paddingBottom: "56.25%", position: "relative", overflow: "hidden", background: C.ink }}>
        {video.thumbnail ? (
          <img
            src={video.thumbnail}
            alt={video.title}
            style={{
              position: "absolute", inset: 0, width: "100%", height: "100%",
              objectFit: "cover", display: "block",
              transform: hovered ? "scale(1.05)" : "scale(1)",
              transition: "transform 0.6s cubic-bezier(0.4,0,0.2,1)",
            }}
          />
        ) : (
          /* SVG fallback thumbnail if no image available */
          <img
            src={video.img || SVG_GOLDEN_1}
            alt={video.title}
            style={{
              position: "absolute", inset: 0, width: "100%", height: "100%",
              objectFit: "cover", display: "block",
              transform: hovered ? "scale(1.05)" : "scale(1)",
              transition: "transform 0.6s cubic-bezier(0.4,0,0.2,1)",
            }}
          />
        )}
        {/* Play button overlay on hover */}
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          background: "rgba(10,5,0,0.35)",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}>
          <div style={{
            width: "52px", height: "52px", borderRadius: "50%",
            background: "rgba(255,0,0,0.85)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width="18" height="18" viewBox="0 0 14 16"><path d="M2 1l11 7L2 15V1z" fill="white"/></svg>
          </div>
        </div>
      </div>

      {/* Card text */}
      <div style={{ padding: "1.4rem 1.25rem 1.6rem" }}>
        {era && (
          <span style={{
            fontSize: "9px", letterSpacing: "0.18em", textTransform: "uppercase",
            color: eraCol, fontFamily: "Cormorant Garamond, Georgia, serif",
            display: "block", marginBottom: "0.55rem",
          }}>{era}</span>
        )}
        <p style={{
          fontFamily: "Cormorant Garamond, Georgia, serif", fontSize: "1.05rem",
          fontStyle: "italic", color: C.ink, margin: "0 0 0.7rem", lineHeight: 1.35,
        }}>{video.title}</p>
        {video.publishedAt && (
          <span style={{ fontSize: "11px", color: C.muted, letterSpacing: "0.06em" }}>
            {formatDate(video.publishedAt)}
          </span>
        )}
        {video.duration && !video.publishedAt && (
          <span style={{ fontSize: "11px", color: C.muted, letterSpacing: "0.06em" }}>{video.duration}</span>
        )}
      </div>
    </a>
  );
}

/* ═══════════════════════════════════════════════════════════
   ESSAY GRID — fetches live from YouTube API
═══════════════════════════════════════════════════════════ */
function EssayGrid() {
  const [videos,  setVideos]  = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);
  const apiReady = YT_API_KEY && YT_API_KEY !== "YOUR_API_KEY_HERE";

  useEffect(() => {
    if (!apiReady) {
      /* Fall back to static placeholder data */
      setVideos(ESSAYS);
      setLoading(false);
      return;
    }

    const cached    = sessionStorage.getItem("ouar_videos");
    const cachedAt  = sessionStorage.getItem("ouar_videos_ts");
    const CACHE_TTL = 15 * 60 * 1000; // 15 minutes

    if (cached && cachedAt && Date.now() - Number(cachedAt) < CACHE_TTL) {
      setVideos(JSON.parse(cached));
      setLoading(false);
      return;
    }

    async function fetchVideos() {
      try {
        /* Step 1 — get the uploads playlist ID */
        const chanRes = await fetch(
          `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${YT_CHANNEL_ID}&key=${YT_API_KEY}`
        );
        const chanData = await chanRes.json();
        if (chanData.error) throw new Error(chanData.error.message);
        const uploadsId = chanData.items[0].contentDetails.relatedPlaylists.uploads;

        /* Step 2 — fetch latest videos from uploads playlist (1 unit!) */
        const plRes = await fetch(
          `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsId}&maxResults=${YT_MAX_RESULTS}&key=${YT_API_KEY}`
        );
        const plData = await plRes.json();
        if (plData.error) throw new Error(plData.error.message);

        const mapped = plData.items.map(item => ({
          videoId:     item.snippet.resourceId.videoId,
          title:       item.snippet.title,
          thumbnail:   item.snippet.thumbnails?.maxres?.url
                    || item.snippet.thumbnails?.high?.url
                    || item.snippet.thumbnails?.medium?.url,
          publishedAt: item.snippet.publishedAt,
        }));

        sessionStorage.setItem("ouar_videos",    JSON.stringify(mapped));
        sessionStorage.setItem("ouar_videos_ts", String(Date.now()));
        setVideos(mapped);
      } catch (err) {
        console.error("YouTube API error:", err);
        setError(err.message);
        setVideos(ESSAYS); // fall back to static
      } finally {
        setLoading(false);
      }
    }

    fetchVideos();
  }, [apiReady]);

  return (
    <section id="essays" style={{ background: C.warm, padding: "100px 2rem" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <span style={{ fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", color: C.goldDark, fontFamily: "Cormorant Garamond, Georgia, serif", display: "block", marginBottom: "1rem" }}>
            {apiReady ? "Latest Essays" : "Recent Essays"}
          </span>
          <h2 style={{ fontFamily: "Cormorant Garamond, Georgia, serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 300, fontStyle: "italic", color: C.ink, margin: 0 }}>
            From the Archive
          </h2>
          <div style={{ width: "50px", height: "2px", background: `linear-gradient(90deg, ${C.navy}, ${C.crimson}, ${C.gold})`, margin: "1.25rem auto 0", borderRadius: "2px" }} />
          {apiReady && !loading && !error && (
            <p style={{ fontFamily: "Cormorant Garamond, Georgia, serif", fontSize: "0.85rem", fontStyle: "italic", color: C.muted, marginTop: "0.75rem" }}>
              Automatically updated from YouTube
            </p>
          )}
          {error && (
            <p style={{ fontFamily: "Cormorant Garamond, Georgia, serif", fontSize: "0.85rem", fontStyle: "italic", color: C.crimson, marginTop: "0.75rem" }}>
              Showing cached content — couldn't reach YouTube right now.
            </p>
          )}
        </div>

        {/* Loading skeleton */}
        {loading ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2px" }}>
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} style={{ background: C.creambright, overflow: "hidden" }}>
                <div style={{
                  paddingBottom: "56.25%", position: "relative",
                  background: `linear-gradient(90deg, ${C.warm} 25%, #E8E0CE 50%, ${C.warm} 75%)`,
                  backgroundSize: "200% 100%",
                  animation: "shimmer 1.4s infinite",
                }}/>
                <div style={{ padding: "1.4rem 1.25rem 1.6rem" }}>
                  <div style={{ height: "8px", width: "60px", background: C.warm, borderRadius: "4px", marginBottom: "0.75rem" }}/>
                  <div style={{ height: "14px", width: "85%", background: C.warm, borderRadius: "4px", marginBottom: "0.4rem" }}/>
                  <div style={{ height: "14px", width: "65%", background: C.warm, borderRadius: "4px", marginBottom: "0.75rem" }}/>
                  <div style={{ height: "10px", width: "40px", background: C.warm, borderRadius: "4px" }}/>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2px" }}>
            {videos.map((v, i) => <EssayCard key={v.videoId || v.title || i} video={v} />)}
          </div>
        )}

        <div style={{ textAlign: "center", marginTop: "3.5rem" }}>
          <a href={YT_CHANNEL} target="_blank" rel="noopener noreferrer" style={{
            display: "inline-flex", alignItems: "center", gap: "9px",
            padding: "14px 32px", background: C.ink, color: C.cream,
            fontSize: "10px", letterSpacing: "0.16em", textTransform: "uppercase",
            textDecoration: "none", fontFamily: "Cormorant Garamond, Georgia, serif",
          }}>
            <YTIcon size={14} /> View All on YouTube
          </a>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   PATREON BAND — ink bg + gold/crimson/rainbow accents
═══════════════════════════════════════════════════════════ */
/* ═══════════════════════════════════════════════════════════
   PATREON BAND — real tiers from onceuponarecord Patreon page
═══════════════════════════════════════════════════════════ */
const PATREON_TIERS = [
  {
    name:    "The Tip Jar",
    price:   "$3",
    period:  "/ month",
    desc:    "A great way to show support for the channel — thank you!",
    accent:  C.gold,
    joinUrl: "https://www.patreon.com/checkout/onceuponarecord?rid=26916039",
    benefits: [
      "Vote on which Disney films get reviewed next",
      "Early ad-free access to new videos",
      "Your name listed at the end of each video",
    ],
  },
  {
    name:    "The Big Tipper",
    price:   "$5",
    period:  "/ month",
    desc:    "Sometimes 20% isn't enough — thank you so much!",
    accent:  C.orange,
    joinUrl: "https://www.patreon.com/checkout/onceuponarecord?rid=23394822",
    featured: true,
    benefits: [
      "Vote on which Disney films get reviewed next",
      "Early ad-free access to new videos",
      "Your name listed at the end of each video",
    ],
  },
  {
    name:    "The Ardent Supporter",
    price:   "$10",
    period:  "/ month",
    desc:    "Now things are getting serious — thank you so very, very much!",
    accent:  C.crimson,
    joinUrl: "https://www.patreon.com/checkout/onceuponarecord?rid=23394838",
    benefits: [
      "Add a Disney film to the voting (1 per month)",
      "One (1) mp3 album download from Disney Recordland",
      "Vote on which Disney films get reviewed next",
      "Early ad-free access to new videos",
      "Your name listed at the end of each video (special category)",
    ],
  },
];

function TierCard({ tier }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flex: "1",
        minWidth: "260px",
        maxWidth: "340px",
        background: tier.featured
          ? `rgba(255,255,255,0.07)`
          : `rgba(255,255,255,0.03)`,
        border: `1px solid ${tier.featured ? tier.accent : "rgba(226,194,39,0.15)"}`,
        borderTop: `3px solid ${tier.accent}`,
        display: "flex",
        flexDirection: "column",
        position: "relative",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered ? `0 12px 40px rgba(0,0,0,0.4)` : "none",
      }}
    >
      {/* Popular badge */}
      {tier.featured && (
        <div style={{
          position: "absolute", top: "-1px", right: "1.5rem",
          background: tier.accent,
          padding: "3px 12px",
          fontSize: "8px", letterSpacing: "0.18em", textTransform: "uppercase",
          color: C.ink, fontFamily: "Cormorant Garamond, Georgia, serif", fontWeight: 700,
        }}>
          Popular
        </div>
      )}

      {/* Header */}
      <div style={{ padding: "1.75rem 1.75rem 1.25rem" }}>
        <p style={{
          fontFamily: "Cormorant Garamond, Georgia, serif",
          fontSize: "1.05rem", fontStyle: "italic",
          color: tier.accent, marginBottom: "1rem",
          letterSpacing: "0.02em",
        }}>
          {tier.name}
        </p>

        {/* Price */}
        <div style={{ display: "flex", alignItems: "baseline", gap: "6px", marginBottom: "0.75rem" }}>
          <span style={{
            fontFamily: "Cormorant Garamond, Georgia, serif",
            fontSize: "3rem", fontWeight: 300, color: C.cream, lineHeight: 1,
          }}>{tier.price}</span>
          <span style={{
            fontFamily: "Cormorant Garamond, Georgia, serif",
            fontSize: "0.85rem", color: "rgba(247,240,220,0.45)", letterSpacing: "0.04em",
          }}>{tier.period}</span>
        </div>

        <p style={{
          fontFamily: "Cormorant Garamond, Georgia, serif",
          fontSize: "0.88rem", fontStyle: "italic",
          color: "rgba(247,240,220,0.5)", lineHeight: 1.6,
          marginBottom: "1.5rem",
        }}>
          {tier.desc}
        </p>

        {/* Divider */}
        <div style={{ width: "100%", height: "1px", background: `rgba(226,194,39,0.12)`, marginBottom: "1.5rem" }} />

        {/* Benefits */}
        <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1.75rem", display: "flex", flexDirection: "column", gap: "10px" }}>
          {tier.benefits.map((b, i) => (
            <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, marginTop: "2px" }}>
                <circle cx="7" cy="7" r="6.5" stroke={tier.accent} strokeWidth="1" opacity="0.7"/>
                <path d="M4 7L6 9L10 5" stroke={tier.accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span style={{
                fontFamily: "Cormorant Garamond, Georgia, serif",
                fontSize: "0.9rem", color: "rgba(247,240,220,0.72)", lineHeight: 1.55,
              }}>{b}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Join button pinned to bottom */}
      <div style={{ padding: "0 1.75rem 1.75rem", marginTop: "auto" }}>
        <a
          href={tier.joinUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
            width: "100%", padding: "12px",
            background: tier.featured ? tier.accent : "transparent",
            border: `1px solid ${tier.accent}`,
            color: tier.featured ? C.ink : tier.accent,
            fontSize: "10px", letterSpacing: "0.16em", textTransform: "uppercase",
            textDecoration: "none",
            fontFamily: "Cormorant Garamond, Georgia, serif",
            fontWeight: tier.featured ? 700 : 400,
            transition: "all 0.25s ease",
          }}
        >
          <PatreonIcon size={10} color={tier.featured ? C.ink : tier.accent} />
          Join for {tier.price}
        </a>
      </div>
    </div>
  );
}

function PatreonBand() {
  return (
    <section style={{ background: C.ink, padding: "90px 2rem 100px", position: "relative", overflow: "hidden" }}>
      {/* Rainbow top border strip */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "4px", background: `linear-gradient(90deg, ${C.navy}, ${C.crimson}, ${C.orange}, ${C.gold}, ${C.orange}, ${C.crimson}, ${C.navy})` }} />

      {/* Faint radial glow */}
      <div style={{ position: "absolute", top: "30%", left: "50%", transform: "translate(-50%,-50%)", width: "900px", height: "600px", background: `radial-gradient(ellipse, rgba(226,194,39,0.06) 0%, transparent 70%)`, pointerEvents: "none" }} />

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "1.75rem" }}>
          <Logo size={72} />
        </div>

        <span style={{ fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", color: C.gold, fontFamily: "Cormorant Garamond, Georgia, serif", display: "block", marginBottom: "1rem" }}>
          Support the Channel
        </span>

        <h2 style={{ fontFamily: "Cormorant Garamond, Georgia, serif", fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 300, fontStyle: "italic", color: C.cream, margin: "0 auto 1rem", maxWidth: "680px", lineHeight: 1.2 }}>
          Help keep the records spinning
        </h2>

        <div style={{ width: "60px", height: "3px", background: `linear-gradient(90deg, ${C.crimson}, ${C.gold}, ${C.orange})`, margin: "0 auto 1.5rem", borderRadius: "2px" }} />

        <p style={{ fontFamily: "Cormorant Garamond, Georgia, serif", fontSize: "1.05rem", color: "rgba(247,240,220,0.5)", maxWidth: "520px", margin: "0 auto", lineHeight: 1.85, fontWeight: 300, fontStyle: "italic" }}>
          These essays take time, love, and a lot of rewatching. Every contribution helps bring more stories to light.
        </p>
      </div>

      {/* Tier cards */}
      <div style={{
        display: "flex", gap: "1.5rem",
        justifyContent: "center",
        flexWrap: "wrap",
        maxWidth: "1100px",
        margin: "0 auto 3rem",
      }}>
        {PATREON_TIERS.map(tier => <TierCard key={tier.name} tier={tier} />)}
      </div>

      {/* Browse all link */}
      <div style={{ textAlign: "center" }}>
        <a href={PATREON_URL} target="_blank" rel="noopener noreferrer" style={{
          fontFamily: "Cormorant Garamond, Georgia, serif",
          fontSize: "11px", letterSpacing: "0.16em", textTransform: "uppercase",
          color: "rgba(247,240,220,0.4)", textDecoration: "none",
          borderBottom: "1px solid rgba(247,240,220,0.2)",
          paddingBottom: "2px",
        }}>
          View membership page on Patreon →
        </a>
      </div>

      {/* Rainbow bottom strip */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "4px", background: `linear-gradient(90deg, ${C.navy}, ${C.crimson}, ${C.orange}, ${C.gold}, ${C.orange}, ${C.crimson}, ${C.navy})` }} />
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   PHOTO CAROUSEL
═══════════════════════════════════════════════════════════ */
function CarouselModal({ src, onClose }) {
  useEffect(() => {
    const fn = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", fn);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", fn);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "rgba(10,5,0,0.92)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "2rem",
        animation: "fadeInModal 0.25s ease both",
        backdropFilter: "blur(8px)",
        cursor: "zoom-out",
      }}
    >
      {/* Image container — stop click propagation so clicking image doesn't close */}
      <div
        onClick={e => e.stopPropagation()}
        style={{
          position: "relative",
          maxWidth: "min(900px, 90vw)",
          maxHeight: "85vh",
          animation: "scaleInModal 0.3s cubic-bezier(0.34,1.56,0.64,1) both",
          cursor: "default",
          boxShadow: `0 40px 120px rgba(0,0,0,0.7), 0 0 0 1px rgba(226,194,39,0.2)`,
        }}
      >
        <img
          src={src}
          alt="Gallery"
          style={{
            display: "block",
            width: "100%",
            maxHeight: "85vh",
            objectFit: "contain",
            borderRadius: "2px",
          }}
        />

        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute", top: "-16px", right: "-16px",
            width: "36px", height: "36px",
            background: C.ink,
            border: `1px solid rgba(226,194,39,0.4)`,
            borderRadius: "50%",
            color: C.gold,
            fontSize: "18px", lineHeight: 1,
            cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "Georgia, serif",
          }}
          aria-label="Close"
        >
          ×
        </button>

        {/* Hint */}
        <p style={{
          position: "absolute", bottom: "-2rem", left: "50%",
          transform: "translateX(-50%)",
          fontSize: "10px", letterSpacing: "0.16em", textTransform: "uppercase",
          color: "rgba(247,240,220,0.35)",
          fontFamily: "Cormorant Garamond, Georgia, serif",
          whiteSpace: "nowrap",
        }}>
          Click outside or press Esc to close
        </p>
      </div>
    </div>
  );
}

function PhotoCarousel() {
  const [offset, setOffset]     = useState(0);
  const [modalSrc, setModalSrc] = useState(null);
  const raf    = useRef(null);
  const paused = useRef(false);
  const SPEED  = 0.45, ITEM_W = 400, GAP = 4;
  const TOTAL  = (ITEM_W + GAP) * CAROUSEL.length;

  const tick = useCallback(() => {
    if (!paused.current) setOffset(p => { const n = p + SPEED; return n >= TOTAL ? n - TOTAL : n; });
    raf.current = requestAnimationFrame(tick);
  }, [TOTAL]);

  useEffect(() => { raf.current = requestAnimationFrame(tick); return () => cancelAnimationFrame(raf.current); }, [tick]);

  // Only show each unique image once (not duplicates from the doubled array)
  const doubled = [...CAROUSEL, ...CAROUSEL];

  return (
    <>
      {modalSrc && <CarouselModal src={modalSrc} onClose={() => setModalSrc(null)} />}

      <section style={{ background: C.creambright, padding: "64px 0 64px", overflow: "hidden" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem", padding: "0 2rem" }}>
          <span style={{ fontSize: "9px", letterSpacing: "0.28em", textTransform: "uppercase", color: C.goldDark, fontFamily: "Cormorant Garamond, Georgia, serif", display: "block", marginBottom: "0.6rem" }}>Once Upon a Record</span>
          <h2 style={{ fontFamily: "Cormorant Garamond, Georgia, serif", fontSize: "clamp(2.4rem, 5vw, 4rem)", fontWeight: 300, fontStyle: "italic", color: C.ink, margin: "0 0 1rem", lineHeight: 1 }}>Gallery</h2>
          <div style={{ width: "40px", height: "2px", background: `linear-gradient(90deg, ${C.navy}, ${C.crimson}, ${C.gold})`, margin: "0 auto", borderRadius: "2px" }} />
        </div>

        <div
          onMouseEnter={() => { paused.current = true; }}
          onMouseLeave={() => { paused.current = false; }}
          style={{ userSelect: "none" }}
        >
          <div style={{ display: "flex", gap: `${GAP}px`, transform: `translateX(-${offset}px)`, willChange: "transform" }}>
            {doubled.map((url, i) => (
              <div
                key={i}
                onClick={() => setModalSrc(CAROUSEL[i % CAROUSEL.length])}
                style={{
                  flexShrink: 0, width: `${ITEM_W}px`, height: "320px",
                  overflow: "hidden", cursor: "zoom-in", position: "relative",
                }}
                onMouseEnter={e => {
                  e.currentTarget.querySelector("img").style.transform = "scale(1.05)";
                  e.currentTarget.querySelector(".overlay").style.opacity = "1";
                }}
                onMouseLeave={e => {
                  e.currentTarget.querySelector("img").style.transform = "scale(1)";
                  e.currentTarget.querySelector(".overlay").style.opacity = "0";
                }}
              >
                <img
                  src={url}
                  alt=""
                  draggable={false}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.5s ease" }}
                />
                {/* Hover overlay with zoom icon */}
                <div
                  className="overlay"
                  style={{
                    position: "absolute", inset: 0,
                    background: "rgba(10,5,0,0.35)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    opacity: 0, transition: "opacity 0.3s ease",
                    pointerEvents: "none",
                  }}
                >
                  <div style={{
                    width: "44px", height: "44px",
                    border: `1px solid rgba(226,194,39,0.8)`,
                    borderRadius: "50%",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: C.gold, fontSize: "20px",
                  }}>
                    ⊕
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════
   FOOTER
═══════════════════════════════════════════════════════════ */
function Footer() {
  return (
    <footer style={{ background: C.ink, padding: "4rem 3rem", borderTop: `4px solid`, borderImage: `linear-gradient(90deg, ${C.navy}, ${C.crimson}, ${C.orange}, ${C.gold}) 1` }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "2.5rem" }}>

        {/* Logo + tagline */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "1.25rem" }}>
            <Logo size={60} />
            <div>
              <div style={{ fontFamily: "Cormorant Garamond, Georgia, serif", fontSize: "1rem", fontStyle: "italic", color: C.cream, lineHeight: 1.15 }}>Once Upon a Record</div>
              <div style={{ fontFamily: "Cormorant Garamond, Georgia, serif", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: C.gold, marginTop: "3px" }}>Disney Video Essays</div>
            </div>
          </div>
          <p style={{ fontFamily: "Cormorant Garamond, Georgia, serif", fontSize: "0.9rem", fontStyle: "italic", color: "rgba(247,240,220,0.38)", maxWidth: "240px", lineHeight: 1.7, fontWeight: 300 }}>
            Dusting off Disney gems from the past and giving them a fresh polish.
          </p>
        </div>

        {/* Links */}
        <div style={{ display: "flex", gap: "4rem", flexWrap: "wrap" }}>
          <div>
            <p style={{ fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: C.gold, fontFamily: "Cormorant Garamond, Georgia, serif", marginBottom: "1rem" }}>Watch</p>
            <a href={YT_CHANNEL} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "rgba(247,240,220,0.55)", textDecoration: "none", fontFamily: "Cormorant Garamond, Georgia, serif", fontStyle: "italic" }}>
              <YTIcon size={13} /> YouTube Channel
            </a>
          </div>
          <div>
            <p style={{ fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: C.crimson, fontFamily: "Cormorant Garamond, Georgia, serif", marginBottom: "1rem" }}>Support</p>
            <a href={PATREON_URL} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "rgba(247,240,220,0.55)", textDecoration: "none", fontFamily: "Cormorant Garamond, Georgia, serif", fontStyle: "italic" }}>
              <PatreonIcon size={12} color={C.crimson} /> Patreon Membership
            </a>
          </div>
          <div>
            <p style={{ fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#C77DFF", fontFamily: "Cormorant Garamond, Georgia, serif", marginBottom: "1rem" }}>Follow</p>
            <a href="https://www.instagram.com/svotographs" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "rgba(247,240,220,0.55)", textDecoration: "none", fontFamily: "Cormorant Garamond, Georgia, serif", fontStyle: "italic" }}>
              {/* Instagram icon */}
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="2" width="20" height="20" rx="5" stroke="#C77DFF" strokeWidth="2"/>
                <circle cx="12" cy="12" r="5" stroke="#C77DFF" strokeWidth="2"/>
                <circle cx="17.5" cy="6.5" r="1.5" fill="#C77DFF"/>
              </svg>
              @svotographs
            </a>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: "1100px", margin: "2.5rem auto 0", paddingTop: "1.75rem", borderTop: "1px solid rgba(226,194,39,0.1)", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem" }}>
        <span style={{ fontFamily: "Cormorant Garamond, Georgia, serif", fontSize: "11px", fontStyle: "italic", color: "rgba(247,240,220,0.25)" }}>
          © {new Date().getFullYear()} Once Upon a Record
        </span>
        <span style={{ fontFamily: "Cormorant Garamond, Georgia, serif", fontSize: "11px", color: "rgba(247,240,220,0.18)", letterSpacing: "0.08em" }}>
          Disney video essays from an honest fan
        </span>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════
   ROOT APP
═══════════════════════════════════════════════════════════ */
export default function App() {
  const [heroVisible, setHeroVisible] = useState(true);
  const heroRef = useRef(null);

  useEffect(() => {
    const ob = new IntersectionObserver(([e]) => setHeroVisible(e.isIntersecting), { threshold: 0.05 });
    if (heroRef.current) ob.observe(heroRef.current);
    return () => ob.disconnect();
  }, []);

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&display=swap" rel="stylesheet" />
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: ${C.creambright}; }
        @keyframes shimmer {
          from { background-position: 200% 0; }
          to   { background-position: -200% 0; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInModal {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes scaleInModal {
          from { opacity: 0; transform: scale(0.88); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>

      <Nav heroVisible={heroVisible} />

      <div id="top" ref={heroRef} style={{ position: "relative" }}>
        <ScrollHeroSection />
      </div>

      <StoryBlock />
      <EssayGrid />
      <PatreonBand />
      <PhotoCarousel />
      <Footer />
    </>
  );
}
