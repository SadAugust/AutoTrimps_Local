MODULES["portal"] = {};
MODULES["portal"].timeout = 5000;
MODULES["portal"].bufferExceedFactor = 5;
var portalzone = getPageSetting('CustomAutoPortal');
var zonePostpone = 0;

function autoPortal() {
	if (!game.global.portalActive) return;
	switch (autoTrimpSettings.AutoPortal.selected) {
		case "Helium Per Hour":
			var OKtoPortal = false;
			if (!game.global.runningChallengeSquared) {
				var minZone = getPageSetting('HeHrDontPortalBefore');
				game.stats.bestHeliumHourThisRun.evaluate();
				var bestHeHr = game.stats.bestHeliumHourThisRun.storedValue;
				var bestHeHrZone = game.stats.bestHeliumHourThisRun.atZone;
				var myHeliumHr = game.stats.heliumHour.value();
				var heliumHrBuffer = Math.abs(getPageSetting('HeliumHrBuffer'));
				if (!aWholeNewWorld)
					heliumHrBuffer *= MODULES["portal"].bufferExceedFactor;
				var bufferExceeded = myHeliumHr < bestHeHr * (1 - (heliumHrBuffer / 100));
				if (bufferExceeded && game.global.world >= minZone) {
					OKtoPortal = true;
					if (aWholeNewWorld)
						zonePostpone = 0;
				}
				if (heliumHrBuffer == 0 && !aWholeNewWorld)
					OKtoPortal = false;
				if (OKtoPortal && zonePostpone == 0) {
					zonePostpone += 1;
					debug("My HeliumHr was: " + myHeliumHr + " & the Best HeliumHr was: " + bestHeHr + " at zone: " + bestHeHrZone, "portal");
					cancelTooltip();
					tooltip('confirm', null, 'update', '<b>Auto Portaling NOW!</b><p>Hit Delay Portal to WAIT 1 more zone.', 'zonePostpone+=1', '<b>NOTICE: Auto-Portaling in 5 seconds....</b>', 'Delay Portal');
					setTimeout(cancelTooltip, MODULES["portal"].timeout);
					setTimeout(function () {
						if (zonePostpone >= 2)
							return;
						if (autoTrimpSettings.HeliumHourChallenge.selected != 'None')
							doPortal(autoTrimpSettings.HeliumHourChallenge.selected);
						else
							doPortal();
					}, MODULES["portal"].timeout + 100);
				}
			}
			break;
		case "Custom":
			var portalzone = getPageSetting('CustomAutoPortal');
			if (game.global.world >= portalzone) {
				if (autoTrimpSettings.HeliumHourChallenge.selected != 'None')
					doPortal(autoTrimpSettings.HeliumHourChallenge.selected);
				else
					doPortal();
			}
			break;
		case "Balance":
		case "Decay":
		case "Electricity":
		case "Life":
		case "Crushed":
		case "Nom":
		case "Toxicity":
			if (getPageSetting('MaxTox'))
				settingChanged("MaxTox");
		case "Watch":
		case "Lead":
		case "Corrupted":
		case "Domination":
			if (!game.global.challengeActive) {
				doPortal(autoTrimpSettings.AutoPortal.selected);
			}
			break;
		default:
			break;
	}
}

function dailyAutoPortal() {
	if (!game.global.portalActive) return;
	if (getPageSetting('AutoPortalDaily') == 1) {
		var OKtoPortal = false;
		if (!game.global.runningChallengeSquared) {
			var minZone = getPageSetting('dHeHrDontPortalBefore');
			game.stats.bestHeliumHourThisRun.evaluate();
			var bestHeHr = game.stats.bestHeliumHourThisRun.storedValue;
			var bestHeHrZone = game.stats.bestHeliumHourThisRun.atZone;
			var myHeliumHr = game.stats.heliumHour.value();
			var heliumHrBuffer = Math.abs(getPageSetting('dHeliumHrBuffer'));
			if (!aWholeNewWorld) {
				heliumHrBuffer *= MODULES["portal"].bufferExceedFactor;
				var bufferExceeded = myHeliumHr < bestHeHr * (1 - (heliumHrBuffer / 100));
				if (bufferExceeded && game.global.world >= minZone) {
					OKtoPortal = true;
					if (aWholeNewWorld)
						zonePostpone = 0;
				}
				if (heliumHrBuffer == 0 && !aWholeNewWorld)
					OKtoPortal = false;
				if (OKtoPortal && zonePostpone == 0) {
					zonePostpone += 1;
					debug("My HeliumHr was: " + myHeliumHr + " & the Best HeliumHr was: " + bestHeHr + " at zone: " + bestHeHrZone, "portal");
					cancelTooltip();
					tooltip('confirm', null, 'update', '<b>Auto Portaling NOW!</b><p>Hit Delay Portal to WAIT 1 more zone.', 'zonePostpone+=1', '<b>NOTICE: Auto-Portaling in 5 seconds....</b>', 'Delay Portal');
					setTimeout(cancelTooltip, MODULES["portal"].timeout);
					setTimeout(function () {
						if (zonePostpone >= 2)
							return;
						if (OKtoPortal) {
							abandonDaily();
							document.getElementById('finishDailyBtnContainer').style.display = 'none';
						}
						if (autoTrimpSettings.dHeliumHourChallenge.selected != 'None' && getPageSetting('u1daily') == false)
							doPortal(autoTrimpSettings.dHeliumHourChallenge.selected);
						else if (autoTrimpSettings.RdHeliumHourChallenge.selected != 'None' && getPageSetting('u1daily') == true)
							doPortal(autoTrimpSettings.RdHeliumHourChallenge.selected);
						else
							doPortal();
					}, MODULES["portal"].timeout + 100);
				}
			}
		}
	}
	if (getPageSetting('AutoPortalDaily') == 2) {
		var portalzone = getPageSetting('dCustomAutoPortal');
		if (game.global.world >= portalzone) {
			abandonDaily();
			document.getElementById('finishDailyBtnContainer').style.display = 'none';
			if (autoTrimpSettings.dHeliumHourChallenge.selected != 'None' && getPageSetting('u1daily') == false)
				doPortal(autoTrimpSettings.dHeliumHourChallenge.selected);
			else if (autoTrimpSettings.RdHeliumHourChallenge.selected != 'None' && getPageSetting('u1daily') == true) {
				doPortal(autoTrimpSettings.RdHeliumHourChallenge.selected);
			}
			else
				doPortal();
		}
	}
}

function c2runnerportal() {
	if (game.global.world > getPageSetting('c2runnerportal')) {
		if (game.global.runningChallengeSquared)
			abandonChallenge();
		if (autoTrimpSettings.HeliumHourChallenge.selected != 'None')
			doPortal(autoTrimpSettings.HeliumHourChallenge.selected);
		else
			doPortal();
	}
}

function c2runner() {
	if (!game.global.portalActive) return;
	if (getPageSetting('c2runnerstart') == true && getPageSetting('c2runnerportal') > 0 && getPageSetting('c2runnerpercent') > 0) {
		if (game.global.highestLevelCleared > 34 && (100 * (game.c2.Size / (game.global.highestLevelCleared + 1))) < getPageSetting('c2runnerpercent')) {
			challengeSquaredMode = true;
			selectChallenge("Size");
			debug("C2 Runner: Running C2 Challenge Size");
		}
		else if (game.global.highestLevelCleared > 129 && (100 * (game.c2.Slow / (game.global.highestLevelCleared + 1))) < getPageSetting('c2runnerpercent')) {
			challengeSquaredMode = true;
			selectChallenge("Slow");
			debug("C2 Runner: Running C2 Challenge Slow");
		}
		else if (game.global.highestLevelCleared > 179 && (100 * (game.c2.Watch / (game.global.highestLevelCleared + 1))) < getPageSetting('c2runnerpercent')) {
			challengeSquaredMode = true;
			selectChallenge("Watch");
			debug("C2 Runner: Running C2 Challenge Watch");
		}
		else if ((100 * (game.c2.Discipline / (game.global.highestLevelCleared + 1))) < getPageSetting('c2runnerpercent')) {
			challengeSquaredMode = true;
			selectChallenge("Discipline");
			debug("C2 Runner: Running C2 Challenge Discipline");
		}
		else if (game.global.highestLevelCleared > 39 && (100 * (game.c2.Balance / (game.global.highestLevelCleared + 1))) < getPageSetting('c2runnerpercent')) {
			challengeSquaredMode = true;
			selectChallenge("Balance");
			debug("C2 Runner: Running C2 Challenge Balance");
		}
		else if (game.global.highestLevelCleared > 44 && (100 * (game.c2.Meditate / (game.global.highestLevelCleared + 1))) < getPageSetting('c2runnerpercent')) {
			challengeSquaredMode = true;
			selectChallenge("Meditate");
			debug("C2 Runner: Running C2 Challenge Meditate");
		}
		else if (game.global.highestLevelCleared > 24 && (100 * (game.c2.Metal / (game.global.highestLevelCleared + 1))) < getPageSetting('c2runnerpercent')) {
			challengeSquaredMode = true;
			selectChallenge("Metal");
			debug("C2 Runner: Running C2 Challenge Metal");
		}
		else if (game.global.highestLevelCleared > 179 && (100 * (game.c2.Lead / (game.global.highestLevelCleared + 1))) < getPageSetting('c2runnerpercent')) {
			challengeSquaredMode = true;
			selectChallenge("Lead");
			debug("C2 Runner: Running C2 Challenge Lead");
		}
		else if (game.global.highestLevelCleared > 144 && (100 * (game.c2.Nom / (game.global.highestLevelCleared + 1))) < getPageSetting('c2runnerpercent')) {
			challengeSquaredMode = true;
			selectChallenge("Nom");
			debug("C2 Runner: Running C2 Challenge Nom");
		}
		else if ((100 * (game.c2.Electricity / (game.global.highestLevelCleared + 1))) < getPageSetting('c2runnerpercent')) {
			challengeSquaredMode = true;
			selectChallenge("Electricity");
			debug("C2 Runner: Running C2 Challenge Electricity");
		}
		else if (game.global.highestLevelCleared > 164 && (100 * (game.c2.Toxicity / (game.global.highestLevelCleared + 1))) < getPageSetting('c2runnerpercent')) {
			challengeSquaredMode = true;
			selectChallenge("Toxicity");
			debug("C2 Runner: Running C2 Challenge Toxicity");
		}
	}
}

function doPortal(challenge) {
	var c2done = true;
	if (!game.global.portalActive) return;
	if (getPageSetting('downloadSaves')) {
		tooltip('Export', null, 'update');
		document.getElementById("downloadLink").click();
	}
	if (getPageSetting('spendmagmite') == 1) {
		autoMagmiteSpender();
	}
	if (getPageSetting('autoheirlooms') == true && getPageSetting('typetokeep') != 'None' && getPageSetting('raretokeep') != 'None') {
		autoheirlooms3();
	}
	if (game.global.ShieldEquipped.name != getPageSetting('highdmg') || game.global.ShieldEquipped.name != getPageSetting('dhighdmg')) {
		if (highdmgshield() != undefined) {
			selectHeirloom(game.global.heirloomsCarried.indexOf(loom), "heirloomsCarried", true);
			equipHeirloom();
		}
	}
	if (getPageSetting('AutoAllocatePerks') == 2) {
		viewPortalUpgrades();
		numTab(6, true)
		buyPortalUpgrade('Looting_II');
		activateClicked();
		cancelPortal();
		debug('First Stage: Bought Max Looting II');
	}
	portalClicked();
	if (!portalWindowOpen) {
		portalClicked();
	}
	if (portalWindowOpen && getPageSetting('AutoAllocatePerks') == 1 && (typeof MODULES["perks"] !== 'undefined' || typeof AutoPerks !== 'undefined')) {
		AutoPerks.clickAllocate();
	}
	if (portalWindowOpen && getPageSetting('c2runnerstart') == true && getPageSetting('c2runnerportal') > 0 && getPageSetting('c2runnerpercent') > 0) {
		c2runner();
		if (challengeSquaredMode == true) {
			c2done = false;
		}
		else debug("C2 Runner: All C2s above Threshold!");
	}
	if (portalWindowOpen && getPageSetting('AutoStartDaily') == true && c2done) {
		if (getPageSetting('u2daily') == true && portalUniverse == 1) {
			swapPortalUniverse();
		}
		selectChallenge('Daily');
		checkCompleteDailies();
		var lastUndone = -7;
		while (++lastUndone <= 0) {
			var done = (game.global.recentDailies.indexOf(getDailyTimeString(lastUndone)) != -1);
			if (!done)
				break;
		}
		if (lastUndone == 1) {
			debug("All available Dailies already completed.", "portal");
			if ((getPageSetting('u1daily') == true && portalUniverse == 1 && challenge == autoTrimpSettings.RdHeliumHourChallenge.selected) || (getPageSetting('u2daily') == true && portalUniverse == 2)) {
				swapPortalUniverse();
			}
			selectChallenge(challenge || 0);
		} else {
			getDailyChallenge(lastUndone);
			debug("Portaling into Daily for: " + getDailyTimeString(lastUndone, true) + " now!", "portal");
		}
	}
	else if (portalWindowOpen && challenge && c2done) {
		if (getPageSetting('u1daily') == true && portalUniverse == 1 && challenge == autoTrimpSettings.RdHeliumHourChallenge.selected)
			swapPortalUniverse();
		selectChallenge(challenge);
		if (portalUniverse == 2 && getPageSetting('RPerkSwapping')) {
			presetTab(1);
			loadPerkPreset();
		}
	}
	if (portalWindowOpen && portalUniverse == 1 && getPageSetting('AutoAllocatePerks') == 2) {
		numTab(6, true)
		buyPortalUpgrade('Looting_II');
		debug('Second Stage: Bought Max Looting II');
	}
	pushData();
	activatePortal();
	lastHeliumZone = 0;
	zonePostpone = 0;
}

function finishChallengeSquared() { var a = getPageSetting("FinishC2"); game.global.world >= a && (abandonChallenge(), debug("Finished challenge2 because we are on zone " + game.global.world, "other", "oil")) }
function findOutCurrentPortalLevel() { var a = -1, b = !1, d = getPageSetting("AutoPortal"); switch (d) { case "Off": break; case "Custom": "Daily" != game.global.challengeActive && (a = getPageSetting("CustomAutoPortal") + 1), "Daily" == game.global.challengeActive && (a = getPageSetting("Dailyportal") + 1), b = !("Lead" != getPageSetting("HeliumHourChallenge")); break; default: var e = { Balance: 41, Decay: 56, Electricity: 82, Crushed: 126, Nom: 146, Toxicity: 166, Lead: 181, Watch: 181, Corrupted: 191 }[d]; e && (a = e); }return { level: a, lead: b } }


//Radon
MODULES["portal"].Rtimeout = 5000;
MODULES["portal"].RbufferExceedFactor = 5;
var Rportalzone = getPageSetting('RCustomAutoPortal');
var RzonePostpone = 0;

function RautoPortal() {
	if (!game.global.portalActive) return;
	switch (autoTrimpSettings.RAutoPortal.selected) {
		case "Radon Per Hour":
			var OKtoPortal = false;
			if (!game.global.runningChallengeSquared) {
				var minZone = getPageSetting('RnHrDontPortalBefore');
				game.stats.bestHeliumHourThisRun.evaluate();
				var bestHeHr = game.stats.bestHeliumHourThisRun.storedValue;
				var bestHeHrZone = game.stats.bestHeliumHourThisRun.atZone;
				var myHeliumHr = game.stats.heliumHour.value();
				var heliumHrBuffer = Math.abs(getPageSetting('RadonHrBuffer'));
				if (!aWholeNewWorld)
					heliumHrBuffer *= MODULES["portal"].RbufferExceedFactor;
				var bufferExceeded = myHeliumHr < bestHeHr * (1 - (heliumHrBuffer / 100));
				if (bufferExceeded && game.global.world >= minZone) {
					OKtoPortal = true;
					if (aWholeNewWorld)
						zonePostpone = 0;
				}
				if (heliumHrBuffer == 0 && !aWholeNewWorld)
					OKtoPortal = false;
				if (OKtoPortal && zonePostpone == 0) {
					zonePostpone += 1;
					debug("My RadonHr was: " + myHeliumHr + " & the Best RadonHr was: " + bestHeHr + " at zone: " + bestHeHrZone, "portal");
					cancelTooltip();
					tooltip('confirm', null, 'update', '<b>Auto Portaling NOW!</b><p>Hit Delay Portal to WAIT 1 more zone.', 'zonePostpone+=1', '<b>NOTICE: Auto-Portaling in 5 seconds....</b>', 'Delay Portal');
					setTimeout(cancelTooltip, MODULES["portal"].Rtimeout);
					setTimeout(function () {
						if (zonePostpone >= 2)
							return;
						if (autoTrimpSettings.RadonHourChallenge.selected != 'None')
							RdoPortal(autoTrimpSettings.RadonHourChallenge.selected);
						else
							RdoPortal();
					}, MODULES["portal"].Rtimeout + 100);
				}
			}
			break;
		case "Custom":
			var portalzone = getPageSetting('RCustomAutoPortal');
			var dailyportalzone = getPageSetting('rCustomDailyAutoPortal');
			if (game.global.world >= portalzone) {
				if (autoTrimpSettings.RadonHourChallenge.selected != 'None')
					RdoPortal(autoTrimpSettings.RadonHourChallenge.selected);
				else
					RdoPortal();
			}
			if (game.global.world >= dailyportalzone && getPageSetting('RAutoStartDaily')) {
				checkCompleteDailies();
				if (game.global.recentDailies.length !== 7 && !(getPageSetting('dontCapDailies') && game.global.recentDailies.length != 0))
					RdoPortal(null, true);
			}
			break;
		case "Melt":
		case "Bubl??":
		case "Quagmire":
		case "Archaeology":
		case "Mayhem":
		case "Insanity":
		case "Nurture":
		case "Pandemonium":
		case "Alchemy":
		case "Hypothermia":
			if (!game.global.challengeActive) {
				RdoPortal(autoTrimpSettings.RAutoPortal.selected);
			}
			break;
		default:
			break;
	}
}

function RdailyAutoPortal() {
	if (!game.global.portalActive) return;
	if (getPageSetting('RAutoPortalDaily') == 1) {
		var OKtoPortal = false;
		if (!game.global.runningChallengeSquared) {
			var minZone = autoTrimpSettings.rDailyPortalSettingsArray.value.portalZone + dailyModiferReduction();
			game.stats.bestHeliumHourThisRun.evaluate();
			var bestHeHr = game.stats.bestHeliumHourThisRun.storedValue;
			var bestHeHrZone = game.stats.bestHeliumHourThisRun.atZone;
			var myHeliumHr = game.stats.heliumHour.value();
			var heliumHrBuffer = Math.abs(getPageSetting('RdHeliumHrBuffer'));
			if (!aWholeNewWorld) {
				heliumHrBuffer *= MODULES["portal"].bufferExceedFactor;
				var bufferExceeded = myHeliumHr < bestHeHr * (1 - (heliumHrBuffer / 100));
				if (minZone > 0 && bufferExceeded && game.global.world >= minZone) {
					OKtoPortal = true;
					if (aWholeNewWorld)
						zonePostpone = 0;
				}
				if (heliumHrBuffer == 0 && !aWholeNewWorld)
					OKtoPortal = false;
				if (OKtoPortal && zonePostpone == 0) {
					zonePostpone += 1;
					debug("My RadonHr was: " + myHeliumHr + " & the Best RadonHr was: " + bestHeHr + " at zone: " + bestHeHrZone, "portal");
					cancelTooltip();
					tooltip('confirm', null, 'update', '<b>Auto Portaling NOW!</b><p>Hit Delay Portal to WAIT 1 more zone.', 'zonePostpone+=1', '<b>NOTICE: Auto-Portaling in 5 seconds....</b>', 'Delay Portal');
					setTimeout(cancelTooltip, MODULES["portal"].Rtimeout);
					setTimeout(function () {
						if (zonePostpone >= 2)
							return;
						if (OKtoPortal) {
							abandonDaily();
							document.getElementById('finishDailyBtnContainer').style.display = 'none';
						}
						if (autoTrimpSettings.RdHeliumHourChallenge.selected != 'None' && getPageSetting('u2daily') == false)
							RdoPortal(autoTrimpSettings.RdHeliumHourChallenge.selected);
						else if (autoTrimpSettings.dHeliumHourChallenge.selected != 'None' && getPageSetting('u2daily') == true)
							RdoPortal(autoTrimpSettings.dHeliumHourChallenge.selected);
						else
							RdoPortal();
					}, MODULES["portal"].timeout + 100);
				}
			}
		}
	}
	if (getPageSetting('RAutoPortalDaily') == 2) {
		var portalzone = autoTrimpSettings.rDailyPortalSettingsArray.value.portalZone + dailyModiferReduction();
		if (portalzone > 0 && game.global.world >= portalzone) {
			if (autoTrimpSettings.rDailyPortalSettingsArray.value.portalChallenge != 'None' && getPageSetting('u2daily') == false)
				RdoPortal(autoTrimpSettings.rDailyPortalSettingsArray.value.portalChallenge);
			else if (autoTrimpSettings.dHeliumHourChallenge.selected != 'None' && getPageSetting('u2daily') === true)
				RdoPortal(autoTrimpSettings.dHeliumHourChallenge.selected);
			else {
				abandonDaily();
				document.getElementById('finishDailyBtnContainer').style.display = 'none';
				RdoPortal();
			}
		}
	}
}

function RdoPortal(challenge, daily) {
	var daily = !daily ? false : true;
	var preset = 0;
	if (daily) {
		checkCompleteDailies();
		if (game.global.recentDailies.length == 7 && !(getPageSetting('dontCapDailies') && game.global.recentDailies.length != 0))
			return;
	}
	if (!game.global.portalActive) return;
	if (getPageSetting('autoheirlooms') && getPageSetting('typetokeep') != 'None' && getPageSetting('raretokeep') != 'None') autoheirlooms3();
	portalClicked();
	if (!portalWindowOpen) {
		portalClicked();
	}
	if (portalWindowOpen && getPageSetting('RAutoStartDaily')) {
		if (getPageSetting('u1daily') == true && portalUniverse == 2)
			swapPortalUniverse();
		selectChallenge('Daily');
		checkCompleteDailies();
		var lastUndone = -7;
		while (++lastUndone <= 0) {
			var done = (game.global.recentDailies.indexOf(getDailyTimeString(lastUndone)) != -1);
			if (!done)
				break;
		}
		if (getPageSetting('dontCapDailies') && game.global.recentDailies.length !== 0)
			lastUndone = 1;
		if (lastUndone == 1) {
			debug("All available Dailies already completed.", "portal");
			if ((getPageSetting('u2daily') && portalUniverse == 2 && challenge == autoTrimpSettings.dHeliumHourChallenge.selected) || (getPageSetting('u1daily') == true && portalUniverse == 1))
				swapPortalUniverse();
			selectChallenge(challenge || 0);
			preset = 1; //Loads preset 1 for fillers
		} else {
			if (game.global.challengeActive == 'Daily' && portalUniverse == 2 && getPageSetting('RFillerRun')) {
				if (autoTrimpSettings.RdHeliumHourChallenge.selected != 'None') {
					selectChallenge(autoTrimpSettings.RdHeliumHourChallenge.selected);
					preset = 1; //Loads preset 1 for fillers
				}
			} else {
				getDailyChallenge(lastUndone);
				debug("Portaling into Daily for: " + getDailyTimeString(lastUndone, true) + " now!", "portal");
				preset = 2; //Loads preset 2 for dailies
			}
		}

	} else if (portalWindowOpen && challenge) {
		if (getPageSetting('u2daily') == true && portalUniverse == 2 && challenge == autoTrimpSettings.dHeliumHourChallenge.selected) {
			swapPortalUniverse();
		}
		selectChallenge(challenge);
	}

	if (portalWindowOpen && portalUniverse == 2) PresetSwapping(preset);
	if (portalWindowOpen && portalUniverse == 2) hypoPackratReset(challenge);
	if (portalWindowOpen && portalUniverse == 2 && getPageSetting('RAutoAllocatePerks') > 0) AllocatePerks();
	if (getPageSetting('RdownloadSaves')) {
		tooltip('Export', null, 'update');
		document.getElementById("downloadLink").click();
	}
	pushData();

	activatePortal();
	lastRadonZone = 0; RzonePostpone = 0;
	Rresetmapvars();
}

function isNextU1DailyWind() {
	var currWindCost = game.empowerments.Wind.nextUberCost;
	var windCostChange = Math.max(currWindCost * .33, 50);
	var nextWindCost = currWindCost - (windCostChange < 100 ? windCostChange : 100);

	var currPoisonCost = game.empowerments.Poison.nextUberCost;
	var poisonCostChange = Math.max(currPoisonCost * .33, 50);
	var nextPoisonCost = currPoisonCost - (poisonCostChange < 100 ? poisonCostChange : 100);

	var currIceCost = game.empowerments.Ice.nextUberCost;
	var iceCostChange = Math.max(currIceCost * .33, 50);
	var nextIceCost = currIceCost - (iceCostChange < 100 ? iceCostChange : 100);

	var dnature = "None";
	var dailynature = [], dpoison, dpoisondiff, dwind, dwinddiff, dice, dicediff;

	if (getPageSetting('pdailyenlightthresh') >= 0) {
		dpoison = (nextPoisonCost <= getPageSetting('pdailyenlightthresh') && nextPoisonCost <= game.empowerments.Poison.tokens);
		if (dpoison) {
			dpoisondiff = (getPageSetting('pdailyenlightthresh') - nextPoisonCost);
		}
		else
			dpoisondiff = -999999;
	}
	else
		dpoisondiff = -999999;

	if (getPageSetting('wdailyenlightthresh') >= 0) {
		dwind = (nextWindCost <= getPageSetting('wdailyenlightthresh') && nextWindCost <= game.empowerments.Wind.tokens);
		if (dwind) {
			dwinddiff = (getPageSetting('wdailyenlightthresh') - nextWindCost);
		}
		else
			dwinddiff = -999999;
	}
	else
		dwinddiff = -999999;

	if (getPageSetting('idailyenlightthresh') >= 0) {
		dice = (nextIceCost <= getPageSetting('idailyenlightthresh') && nextIceCost <= game.empowerments.Ice.tokens);
		if (dice) {
			dicediff = (getPageSetting('idailyenlightthresh') - nextIceCost);
		}
		else
			dicediff = -999999;
	}
	else
		dicediff = -999999;

	dailynature = [{ nature: 'Poison', cost: dpoisondiff }, { nature: 'Wind', cost: dwinddiff }, { nature: 'Ice', cost: dicediff }].sort(function (a, b) { return a.cost > b.cost ? -1 : a.cost < b.cost ? 1 : 0; });

	if (dailynature[0].cost > 0) {
		dnature = dailynature[0].nature;
	}
	else {
		dnature = "None";
	}
	if (dnature == "Wind")
		return true;
	else
		return false;
}

function Rresetmapvars() {
	//General
	RshouldDoMaps = false;
	RlastMapWeWereIn = null;
	RdoMaxMapBonus = false;
	RvanillaMapatZone = false;
	rShouldMaxMapBonus = false;
	rMBCurrentMap = undefined;
	rC3EndZoneSetting = -1;
	//Void Maps
	RdoVoids = false;
	RneedToVoid = false;
	//Time Farm
	rShouldTimeFarm = false;
	rTFCurrentMap = undefined;
	rTFZoneCleared = 0;
	//Tribute Farm
	rTributeFarming = false;
	rShouldTributeFarm = false;
	rShouldMetFarm = false;
	rTrFCurrentMap = undefined;
	//Unbalance
	rShouldUnbalance = false;
	//Worshipper
	rShouldWorshipperFarm = false;
	Rshipfragfarming = false;
	shipfragmappy = undefined;
	shipprefragmappy = undefined;
	shipfragmappybought = false;
	worshipperdebug = 0;
	rWorshipperCurrentMap = undefined;
	//Quagmire
	Rshoulddobogs = false;
	rBlackBogCurrentMap = undefined;
	//Quest
	rShouldQuest = false;
	Rquestequalityscale = false;
	Rquestshieldzone = 0;
	RquestSmithyWarning = -1;
	RquestSmithyWarning_Setting = -1;
	//Mayhem
	Rshouldmayhem = 0;
	//Storm
	Rstormfarm = false;
	Rshouldstormfarm = false;
	//Insanity
	rShouldInsanityFarm = false;
	Rinsanityfragfarming = false;
	insanityfragmappy = undefined;
	insanityprefragmappy = undefined;
	insanityfragmappybought = false;
	rInsanityCurrentMap = undefined;
	//Equip Farm
	Requipfarm = !1;
	Rshouldequipfarm = !1;
	Requipminusglobal = -1;
	//Pandemonium
	rShouldPandemoniumDestack = false;
	rShouldPandemoniumFarm = false;
	rShouldPandemoniumJestimpFarm = false;
	savefile = null;
	jestFarmMap = false;
	rPandemoniumCurrentMap = undefined;
	//Alchemy
	Rshouldalchfarm = false;
	RAlchFarm = false;
	rAlchSpecialError = 0;
	rAlchemyCurrentMap = undefined;
	//Hypothermia
	rHypoFarm = false;
	rHFSaveWood = false;
	rShouldHypoFarm = false;
	rHFCurrentMap = undefined;
	rHFBonfireCostTotal = 0;
	rHypoRespecced = null;
	rHypoBuyPackrat = false;
	//Prestige
	rShouldPrestigeRaid = false;
	RAMPfragmappy = undefined;
	RAMPprefragmappy = undefined;
	RAMPpMap = new Array(5);
	RAMPrepMap = new Array(5);
	RAMPmapbought = [[false], [false], [false], [false], [false]];
	RAMPmapbought.fill(false); //Unsure if necessary - Need to test
	RAMPfragmappybought = false;
	RAMPfragfarming = false;
	runningPrestigeMaps = false;
	//Bone Shrine
	rShouldBoneShrine = false;
	rBoneShrineUsedZone = 0;
	workerRatio = null;
	//Smithy Farming
	rShouldSmithyFarm = false;
	rShouldSmithyGemFarm = false;
	rShouldSmithyWoodFarm = false;
	rShouldSmithyMetalFarm = false;
	smithyMapCount = [0, 0, 0];

	if (document.getElementById('hiderStatus').style.display == 'None' && getPageSetting('Rshowrnhr') && !game.global.runningChallengeSquared) {
		turnOn("hiderStatus")
		document.getElementById('hiderStatus').parentNode.style = 'display: block; font-size: 1.1vw; text-align: center; background-color: rgba(0,0,0,0.3);'
	}

}
