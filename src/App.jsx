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

/* ── SVG placeholder thumbnails — fully self-contained, no external URLs ── */
const SVG_GOLDEN_1 = `data:image/svg+xml,${encodeURIComponent(`<svg viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="g1bg" cx="50%" cy="40%" r="70%"><stop offset="0%" stop-color="#4A3800"/><stop offset="100%" stop-color="#1A1200"/></radialGradient>
    <radialGradient id="g1glow" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#E2C227" stop-opacity="0.25"/><stop offset="100%" stop-color="#E2C227" stop-opacity="0"/></radialGradient>
  </defs>
  <rect width="600" height="400" fill="url(#g1bg)"/>
  <rect width="600" height="400" fill="url(#g1glow)"/>
  <!-- film strip left -->
  <rect x="20" y="0" width="60" height="400" fill="#0A0800" opacity="0.7"/>
  <rect x="22" y="0" width="56" height="400" fill="none" stroke="#E2C227" stroke-width="1" opacity="0.3"/>
  ${[30,80,130,180,230,280,330,380].map(y=>`<rect x="28" y="${y}" width="44" height="36" rx="2" fill="#E2C227" opacity="0.12"/>`).join('')}
  <!-- film strip right -->
  <rect x="520" y="0" width="60" height="400" fill="#0A0800" opacity="0.7"/>
  ${[30,80,130,180,230,280,330,380].map(y=>`<rect x="528" y="${y}" width="44" height="36" rx="2" fill="#E2C227" opacity="0.12"/>`).join('')}
  <!-- star cluster -->
  ${[[300,80],[260,120],[340,110],[220,160],[380,150],[200,200],[400,190],[300,200]].map(([x,y],i)=>`<circle cx="${x}" cy="${y}" r="${1+i%3}" fill="#E2C227" opacity="${0.3+i*0.08}"/>`).join('')}
  <!-- large record -->
  <circle cx="300" cy="230" r="130" fill="#1C1600" stroke="#E2C227" stroke-width="1.5" opacity="0.9"/>
  <circle cx="300" cy="230" r="115" fill="none" stroke="#E2C227" stroke-width="0.5" opacity="0.3"/>
  <circle cx="300" cy="230" r="95"  fill="none" stroke="#E2C227" stroke-width="0.5" opacity="0.25"/>
  <circle cx="300" cy="230" r="75"  fill="none" stroke="#E2C227" stroke-width="0.5" opacity="0.2"/>
  <circle cx="300" cy="230" r="50"  fill="#E2C227" opacity="0.85"/>
  <circle cx="300" cy="230" r="32"  fill="#C0182A" opacity="0.9"/>
  <circle cx="300" cy="230" r="10"  fill="#1C1600"/>
  <!-- Golden Age text -->
  <text x="300" y="370" text-anchor="middle" font-family="Georgia,serif" font-size="13" fill="#E2C227" opacity="0.6" letter-spacing="4">GOLDEN AGE  ·  1937</text>
</svg>`)}`;

const SVG_GOLDEN_2 = `data:image/svg+xml,${encodeURIComponent(`<svg viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g2bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#2A1E00"/><stop offset="100%" stop-color="#0E0A00"/></linearGradient>
  </defs>
  <rect width="600" height="400" fill="url(#g2bg)"/>
  <!-- animation desk -->
  <rect x="80" y="200" width="440" height="160" rx="4" fill="#1A1400" stroke="#E2C227" stroke-width="1" opacity="0.7"/>
  <rect x="100" y="185" width="400" height="150" rx="3" fill="#F5E8B0" opacity="0.08"/>
  <!-- pencils -->
  <line x1="160" y1="180" x2="145" y2="310" stroke="#C8A010" stroke-width="4" stroke-linecap="round" opacity="0.7"/>
  <polygon points="145,310 139,328 155,318" fill="#E2C227" opacity="0.7"/>
  <line x1="200" y1="175" x2="188" y2="310" stroke="#A07830" stroke-width="4" stroke-linecap="round" opacity="0.6"/>
  <!-- sketch lines on paper -->
  <line x1="220" y1="210" x2="359" y2="210" stroke="#E2C227" stroke-width="1" opacity="0.15"/>
  <line x1="220" y1="225" x2="331" y2="225" stroke="#E2C227" stroke-width="1" opacity="0.15"/>
  <line x1="220" y1="240" x2="369" y2="240" stroke="#E2C227" stroke-width="1" opacity="0.15"/>
  <line x1="220" y1="255" x2="340" y2="255" stroke="#E2C227" stroke-width="1" opacity="0.15"/>
  <line x1="220" y1="270" x2="346" y2="270" stroke="#E2C227" stroke-width="1" opacity="0.15"/>
  <line x1="220" y1="285" x2="365" y2="285" stroke="#E2C227" stroke-width="1" opacity="0.15"/>
  <circle cx="480" cy="80" r="12" fill="#E2C227" opacity="0.7"/>
  <line x1="480" y1="80" x2="520" y2="80"  stroke="#E2C227" stroke-width="1.5" opacity="0.15"/>
  <line x1="480" y1="80" x2="515" y2="100" stroke="#E2C227" stroke-width="1.5" opacity="0.18"/>
  <line x1="480" y1="80" x2="500" y2="115" stroke="#E2C227" stroke-width="1.5" opacity="0.21"/>
  <line x1="480" y1="80" x2="480" y2="120" stroke="#E2C227" stroke-width="1.5" opacity="0.24"/>
  <line x1="480" y1="80" x2="460" y2="115" stroke="#E2C227" stroke-width="1.5" opacity="0.27"/>
  <line x1="480" y1="80" x2="445" y2="100" stroke="#E2C227" stroke-width="1.5" opacity="0.30"/>
  <line x1="480" y1="80" x2="440" y2="80"  stroke="#E2C227" stroke-width="1.5" opacity="0.33"/>
  <line x1="480" y1="80" x2="445" y2="60"  stroke="#E2C227" stroke-width="1.5" opacity="0.36"/>
  <line x1="480" y1="80" x2="460" y2="45"  stroke="#E2C227" stroke-width="1.5" opacity="0.39"/>
  <line x1="480" y1="80" x2="480" y2="40"  stroke="#E2C227" stroke-width="1.5" opacity="0.42"/>
  <line x1="480" y1="80" x2="500" y2="45"  stroke="#E2C227" stroke-width="1.5" opacity="0.45"/>
  <line x1="480" y1="80" x2="515" y2="60"  stroke="#E2C227" stroke-width="1.5" opacity="0.48"/>
  <text x="300" y="375" text-anchor="middle" font-family="Georgia,serif" font-size="13" fill="#E2C227" opacity="0.55" letter-spacing="4">THE ANIMATOR'S DESK</text>
</svg>`)}`;

const SVG_SILVER_1 = `data:image/svg+xml,${encodeURIComponent(`<svg viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="s1bg" cx="50%" cy="60%" r="80%"><stop offset="0%" stop-color="#0A1828"/><stop offset="100%" stop-color="#040810"/></radialGradient>
    <radialGradient id="projbeam" cx="15%" cy="30%" r="85%"><stop offset="0%" stop-color="#7FA8C4" stop-opacity="0.22"/><stop offset="100%" stop-color="#7FA8C4" stop-opacity="0"/></radialGradient>
  </defs>
  <rect width="600" height="400" fill="url(#s1bg)"/>
  <rect width="600" height="400" fill="url(#projbeam)"/>
  <!-- cinema seats rows -->
  ${[280,310,340,370].map((y,row)=>
    Array.from({length:10},(_,i)=>`<rect x="${60+i*52}" y="${y}" width="38" height="24" rx="6" fill="#0A1828" stroke="#7FA8C4" stroke-width="1" opacity="${0.4+row*0.1}"/>`).join('')
  ).join('')}
  <!-- screen glow at top -->
  <rect x="60" y="40" width="480" height="180" rx="4" fill="#7FA8C4" opacity="0.06"/>
  <rect x="60" y="40" width="480" height="180" rx="4" fill="none" stroke="#7FA8C4" stroke-width="1" opacity="0.3"/>
  <!-- projector beam lines -->
  <line x1="80" y1="100" x2="540" y2="40"  stroke="#7FA8C4" stroke-width="0.5" opacity="0.12"/>
  <line x1="80" y1="120" x2="540" y2="220" stroke="#7FA8C4" stroke-width="0.5" opacity="0.12"/>
  <!-- dust motes in beam -->
  ${[[150,90],[200,110],[280,85],[350,105],[420,95],[480,88]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="1.5" fill="#7FA8C4" opacity="0.4"/>`).join('')}
  <text x="300" y="386" text-anchor="middle" font-family="Georgia,serif" font-size="13" fill="#7FA8C4" opacity="0.55" letter-spacing="4">SILVER AGE  ·  1950</text>
</svg>`)}`;

const SVG_SILVER_2 = `data:image/svg+xml,${encodeURIComponent(`<svg viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="s2bg" cx="30%" cy="30%" r="90%"><stop offset="0%" stop-color="#0E1E30"/><stop offset="100%" stop-color="#04080E"/></radialGradient>
  </defs>
  <rect width="600" height="400" fill="url(#s2bg)"/>
  <!-- film projector body -->
  <rect x="60" y="80" width="120" height="200" rx="8" fill="#0A1420" stroke="#7FA8C4" stroke-width="1.5" opacity="0.8"/>
  <!-- reels -->
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
  <rect x="260" y="168" width="26" height="64" rx="1" fill="#7FA8C4" opacity="0.06"/>
  <rect x="295" y="168" width="26" height="64" rx="1" fill="#7FA8C4" opacity="0.06"/>
  <rect x="330" y="168" width="26" height="64" rx="1" fill="#7FA8C4" opacity="0.06"/>
  <rect x="365" y="168" width="26" height="64" rx="1" fill="#7FA8C4" opacity="0.06"/>
  <rect x="400" y="168" width="26" height="64" rx="1" fill="#7FA8C4" opacity="0.06"/>
  <rect x="435" y="168" width="26" height="64" rx="1" fill="#7FA8C4" opacity="0.06"/>
  <text x="300" y="386" text-anchor="middle" font-family="Georgia,serif" font-size="13" fill="#7FA8C4" opacity="0.55" letter-spacing="4">THE SILVER SCREEN</text>
</svg>`)}`;

const SVG_BRONZE_1 = `data:image/svg+xml,${encodeURIComponent(`<svg viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="b1bg" cx="50%" cy="50%" r="75%"><stop offset="0%" stop-color="#2A1800"/><stop offset="100%" stop-color="#0E0800"/></radialGradient>
    <radialGradient id="b1warm" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#E8641A" stop-opacity="0.1"/><stop offset="100%" stop-color="#E8641A" stop-opacity="0"/></radialGradient>
  </defs>
  <rect width="600" height="400" fill="url(#b1bg)"/>
  <rect width="600" height="400" fill="url(#b1warm)"/>
  <!-- vinyl records stacked -->
  <ellipse cx="300" cy="240" rx="160" ry="20" fill="#0E0800" opacity="0.8"/>
  <circle cx="300" cy="215" r="140" fill="#1A1000" stroke="#A07040" stroke-width="1.5" opacity="0.9"/>
  <circle cx="300" cy="215" r="120" fill="none" stroke="#A07040" stroke-width="0.5" opacity="0.3"/>
  <circle cx="300" cy="215" r="100" fill="none" stroke="#A07040" stroke-width="0.5" opacity="0.25"/>
  <circle cx="300" cy="215" r="80"  fill="none" stroke="#A07040" stroke-width="0.5" opacity="0.2"/>
  <circle cx="300" cy="215" r="55"  fill="#E8641A" opacity="0.75"/>
  <circle cx="300" cy="215" r="35"  fill="#A07040" opacity="0.9"/>
  <circle cx="300" cy="215" r="12"  fill="#0E0800"/>
  <!-- second record behind -->
  <circle cx="340" cy="225" r="135" fill="none" stroke="#A07040" stroke-width="1" opacity="0.3"/>
  <!-- turntable arm -->
  <line x1="430" y1="90" x2="320" y2="190" stroke="#C89060" stroke-width="3" stroke-linecap="round" opacity="0.8"/>
  <circle cx="430" cy="90" r="10" fill="#A07040" opacity="0.8"/>
  <circle cx="318" cy="195" r="5" fill="#E8641A" opacity="0.9"/>
  <text x="300" y="386" text-anchor="middle" font-family="Georgia,serif" font-size="13" fill="#A07040" opacity="0.6" letter-spacing="4">BRONZE AGE  ·  1970</text>
</svg>`)}`;

const SVG_BRONZE_2 = `data:image/svg+xml,${encodeURIComponent(`<svg viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="b2bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#1E1000"/><stop offset="100%" stop-color="#0A0600"/></linearGradient>
  </defs>
  <rect width="600" height="400" fill="url(#b2bg)"/>
  <!-- VHS tape body -->
  <rect x="140" y="120" width="320" height="200" rx="10" fill="#0E0800" stroke="#A07040" stroke-width="2" opacity="0.9"/>
  <rect x="160" y="140" width="280" height="100" rx="4" fill="#1A1000" stroke="#A07040" stroke-width="1" opacity="0.5"/>
  <!-- reels inside -->
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
  <rect x="252" y="158" width="96" height="64" rx="3" fill="#050300" stroke="#A07040" stroke-width="1" opacity="0.7"/>
  <rect x="155" y="248" width="290" height="55" rx="3" fill="#E8641A" opacity="0.12"/>
  <rect x="155" y="248" width="290" height="55" rx="3" fill="none" stroke="#E8641A" stroke-width="0.5" opacity="0.4"/>
  <line x1="170" y1="262" x2="430" y2="262" stroke="#A07040" stroke-width="0.5" opacity="0.3"/>
  <line x1="170" y1="272" x2="430" y2="272" stroke="#A07040" stroke-width="0.5" opacity="0.3"/>
  <line x1="170" y1="282" x2="430" y2="282" stroke="#A07040" stroke-width="0.5" opacity="0.3"/>
  <text x="300" y="386" text-anchor="middle" font-family="Georgia,serif" font-size="13" fill="#A07040" opacity="0.6" letter-spacing="4">BRONZE AGE  ·  1988</text>
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
  <rect x="90" y="808" width="220" height="40" rx="3" fill="#E8641A" opacity="0.1" stroke="#E8641A" stroke-width="0.5" opacity="0.3"/>
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
    <radialGradient id="gglow" cx="50%" cy="30%" r="40%"><stop offset="0%" stop-color="#E2C227" stop-opacity="0.18"/><stop offset="100%" stop-color="#E2C227" stop-opacity="0"/></radialGradient>
  </defs>
  <rect width="800" height="900" fill="url(#gbg)"/>
  <rect width="800" height="900" fill="url(#gglow)"/>
  <!-- stars -->
  <circle cx="100" cy="80"  r="2"   fill="#E2C227" opacity="0.7"/>
  <circle cx="240" cy="50"  r="1.5" fill="#E2C227" opacity="0.5"/>
  <circle cx="400" cy="70"  r="2.5" fill="#E2C227" opacity="0.8"/>
  <circle cx="560" cy="40"  r="1.5" fill="#E2C227" opacity="0.6"/>
  <circle cx="700" cy="90"  r="2"   fill="#E2C227" opacity="0.7"/>
  <circle cx="150" cy="140" r="1.5" fill="#E2C227" opacity="0.4"/>
  <circle cx="650" cy="120" r="1.5" fill="#E2C227" opacity="0.5"/>
  <!-- film strip left border -->
  <rect x="0" y="0" width="55" height="900" fill="#080600" opacity="0.8"/>
  <rect x="3" y="0" width="49" height="900" fill="none" stroke="#E2C227" stroke-width="0.5" opacity="0.25"/>
  ${[20,80,140,200,260,320,380,440,500,560,620,680,740,800,860].map(y=>`<rect x="8" y="${y}" width="39" height="48" rx="2" fill="#E2C227" opacity="0.08"/>`).join('')}
  <!-- film strip right border -->
  <rect x="745" y="0" width="55" height="900" fill="#080600" opacity="0.8"/>
  ${[20,80,140,200,260,320,380,440,500,560,620,680,740,800,860].map(y=>`<rect x="753" y="${y}" width="39" height="48" rx="2" fill="#E2C227" opacity="0.08"/>`).join('')}
  <!-- main record -->
  <circle cx="400" cy="460" r="240" fill="#1A1200" stroke="#E2C227" stroke-width="2" opacity="0.9"/>
  <circle cx="400" cy="460" r="210" fill="none" stroke="#E2C227" stroke-width="0.7" opacity="0.25"/>
  <circle cx="400" cy="460" r="180" fill="none" stroke="#E2C227" stroke-width="0.6" opacity="0.2"/>
  <circle cx="400" cy="460" r="150" fill="none" stroke="#E2C227" stroke-width="0.6" opacity="0.18"/>
  <circle cx="400" cy="460" r="120" fill="none" stroke="#E2C227" stroke-width="0.5" opacity="0.15"/>
  <circle cx="400" cy="460" r="90"  fill="none" stroke="#E2C227" stroke-width="0.5" opacity="0.12"/>
  <!-- golden label -->
  <circle cx="400" cy="460" r="70"  fill="#E2C227" opacity="0.9"/>
  <circle cx="400" cy="460" r="48"  fill="#C0182A" opacity="0.85"/>
  <!-- play icon -->
  <path d="M388 443 L420 460 L388 477 Z" fill="#F7F0DC" opacity="0.9"/>
  <!-- spindle -->
  <circle cx="400" cy="460" r="14" fill="#1A1200"/>
  <circle cx="400" cy="460" r="8"  fill="#100C00"/>
  <!-- tonearm -->
  <line x1="600" y1="200" x2="430" y2="430" stroke="#C8A010" stroke-width="5" stroke-linecap="round" opacity="0.8"/>
  <circle cx="600" cy="200" r="18" fill="#A07808" opacity="0.8"/>
  <circle cx="425" cy="438" r="8" fill="#E2C227" opacity="0.9"/>
  <!-- stardust sparkles -->
  ${[[180,260],[620,280],[160,560],[640,550],[200,750],[600,730]].map(([x,y])=>`<path d="M${x} ${y-8} L${x+3} ${y-2} L${x+8} ${y} L${x+3} ${y+2} L${x} ${y+8} L${x-3} ${y+2} L${x-8} ${y} L${x-3} ${y-2} Z" fill="#E2C227" opacity="0.35"/>`).join('')}
  <!-- bottom label text -->
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
function PatreonBand() {
  return (
    <section style={{ background: C.ink, padding: "110px 2rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
      {/* Rainbow top border strip */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "4px", background: `linear-gradient(90deg, ${C.navy}, ${C.crimson}, ${C.orange}, ${C.gold}, ${C.orange}, ${C.crimson}, ${C.navy})` }} />

      {/* Faint radial glow */}
      <div style={{ position: "absolute", top: "40%", left: "50%", transform: "translate(-50%,-50%)", width: "800px", height: "600px", background: `radial-gradient(ellipse, rgba(226,194,39,0.07) 0%, transparent 70%)`, pointerEvents: "none" }} />

      {/* Logo */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "2rem" }}>
        <Logo size={88} />
      </div>

      <span style={{ fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", color: C.gold, fontFamily: "Cormorant Garamond, Georgia, serif", display: "block", marginBottom: "1.5rem" }}>
        Support the Channel
      </span>

      <h2 style={{ fontFamily: "Cormorant Garamond, Georgia, serif", fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 300, fontStyle: "italic", color: C.cream, margin: "0 auto 1.5rem", maxWidth: "680px", lineHeight: 1.2 }}>
        Help keep the records spinning
      </h2>

      <div style={{ width: "60px", height: "3px", background: `linear-gradient(90deg, ${C.crimson}, ${C.gold}, ${C.orange})`, margin: "0 auto 2rem", borderRadius: "2px" }} />

      <p style={{ fontFamily: "Cormorant Garamond, Georgia, serif", fontSize: "1.1rem", color: "rgba(247,240,220,0.55)", maxWidth: "480px", margin: "0 auto 3rem", lineHeight: 1.85, fontWeight: 300 }}>
        These essays take time, love, and a lot of rewatching. Every contribution on Patreon helps bring more stories to light.
      </p>

      {/* Tier cards with navy/gold styling from the logo */}
      <div style={{ display: "flex", gap: "1.5rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "3rem" }}>
        {[
          { tier: "Record Spinner", price: "$3 / mo", desc: "Early access to new essays", accent: C.gold },
          { tier: "Film Scholar",   price: "$7 / mo", desc: "Behind-the-scenes notes & polls", accent: C.orange },
          { tier: "Disney Archivist", price: "$15 / mo", desc: "Extended cuts & direct Q&A with Jay", accent: C.crimson },
        ].map(t => (
          <div key={t.tier} style={{
            background: "rgba(255,255,255,0.04)",
            border: `1px solid rgba(226,194,39,0.2)`,
            borderTop: `3px solid ${t.accent}`,
            padding: "1.75rem 1.5rem", minWidth: "180px", maxWidth: "220px", textAlign: "center",
          }}>
            <p style={{ fontFamily: "Cormorant Garamond, Georgia, serif", fontSize: "0.95rem", fontStyle: "italic", color: t.accent, marginBottom: "0.5rem" }}>{t.tier}</p>
            <p style={{ fontFamily: "Cormorant Garamond, Georgia, serif", fontSize: "1.4rem", color: C.cream, fontWeight: 300, marginBottom: "0.75rem" }}>{t.price}</p>
            <p style={{ fontFamily: "Cormorant Garamond, Georgia, serif", fontSize: "0.85rem", color: "rgba(247,240,220,0.45)", lineHeight: 1.6 }}>{t.desc}</p>
          </div>
        ))}
      </div>

      <a href={PATREON_URL} target="_blank" rel="noopener noreferrer" style={{
        display: "inline-flex", alignItems: "center", gap: "10px",
        padding: "15px 38px",
        background: C.crimson,
        color: "white", fontSize: "11px", letterSpacing: "0.16em",
        textTransform: "uppercase", textDecoration: "none",
        fontFamily: "Cormorant Garamond, Georgia, serif", fontWeight: 600,
      }}>
        <PatreonIcon size={12} /> Join on Patreon
      </a>

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
