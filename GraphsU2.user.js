// ==UserScript==
// @name         AT-SA-GraphsU1
// @namespace    https://github.com/SadAugust/AutoTrimps_Local
// @version      3.0.0-SA
// @updateURL    https://github.com/SadAugust/AutoTrimps_Local/GraphsU2.user.js
// @description  Graphs Module (only for U1) from AutoTrimps
// @author       zininzinin, spindrjr, belaith, ishakaru, genBTC, Zek
// @include      *trimps.github.io*
// @include      *kongregate.com/games/GreenSatellite/trimps
// @grant        none
// ==/UserScript==
var script = document.createElement('script');
script.id = 'AutoTrimps-GraphsU1';
script.src = 'https://SadAugust.github.io/AutoTrimps_Local/GraphsU2.js';
script.setAttribute('crossorigin', "anonymous");
document.head.appendChild(script);
