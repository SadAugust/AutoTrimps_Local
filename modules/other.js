MODULES["other"] = {};
MODULES["other"].enableRoboTrimpSpam = true;
var prestraid = !1, dprestraid = !1, failpraid = !1, dfailpraid = !1, bwraided = !1, dbwraided = !1, failbwraid = !1, dfailbwraid = !1, perked = !1, prestraidon = !1, dprestraidon = !1, mapbought = !1, dmapbought = !1, bwraidon = !1, dbwraidon = !1, presteps = null, minMaxMapCost, fMap, pMap, shouldFarmFrags = !1, praidDone = !1;
function armydeath() { if (game.global.mapsActive) return !1; var e = game.global.lastClearedCell + 1, l = game.global.gridArray[e].attack * dailyModifiers.empower.getMult(game.global.dailyChallenge.empower.strength, game.global.dailyChallenge.empower.stacks) * game.portal.Equality.getMult(), a = game.global.soldierHealth + game.global.soldierEnergyShield * (Fluffy.isRewardActive('shieldlayer') ? ((1 + Fluffy.isRewardActive('shieldlayer'))) : 1); "Ice" == getEmpowerment() && (l *= game.empowerments.Ice.getCombatModifier()); var g = game.global.soldierCurrentBlock; return 3 == game.global.formation ? g /= 4 : "0" != game.global.formation && (g *= 2), g > game.global.gridArray[e].attack ? l *= getPierceAmt() : l -= g * (1 - getPierceAmt()), "Daily" == game.global.challengeActive && void 0 !== game.global.dailyChallenge.crits && (l *= dailyModifiers.crits.getMult(game.global.dailyChallenge.crits.strength)), void 0 !== game.global.dailyChallenge.bogged && (a -= game.global.soldierHealthMax * dailyModifiers.bogged.getMult(game.global.dailyChallenge.bogged.strength)), void 0 !== game.global.dailyChallenge.plague && (a -= game.global.soldierHealthMax * dailyModifiers.plague.getMult(game.global.dailyChallenge.plague.strength, game.global.dailyChallenge.plague.stacks)), "Electricity" == game.global.challengeActive && (a -= game.global.soldierHealth -= game.global.soldierHealthMax * (.1 * game.challenges.Electricity.stacks)), "corruptCrit" == game.global.gridArray[e].corrupted ? l *= 5 : "healthyCrit" == game.global.gridArray[e].corrupted ? l *= 7 : "corruptBleed" == game.global.gridArray[e].corrupted ? a *= .8 : "healthyBleed" == game.global.gridArray[e].corrupted && (a *= .7), (a -= l) <= 1e3 }
function autoRoboTrimp() { if (!(0 < game.global.roboTrimpCooldown) && game.global.roboTrimpLevel) { var a = parseInt(getPageSetting("AutoRoboTrimp")); 0 == a || game.global.world >= a && !game.global.useShriek && (magnetoShriek(), MODULES.other.enableRoboTrimpSpam && debug("Activated Robotrimp MagnetoShriek Ability @ z" + game.global.world, "graphs", "*podcast")) } }
function isBelowThreshold(a) { return a != game.global.world }
function buyWeps() { if (!((getPageSetting('BuyWeaponsNew') == 1) || (getPageSetting('BuyWeaponsNew') == 3))) return; preBuy(), game.global.buyAmt = getPageSetting('gearamounttobuy'), game.equipment.Dagger.level < getPageSetting('CapEquip2') && canAffordBuilding('Dagger', null, null, !0) && buyEquipment('Dagger', !0, !0), game.equipment.Mace.level < getPageSetting('CapEquip2') && canAffordBuilding('Mace', null, null, !0) && buyEquipment('Mace', !0, !0), game.equipment.Polearm.level < getPageSetting('CapEquip2') && canAffordBuilding('Polearm', null, null, !0) && buyEquipment('Polearm', !0, !0), game.equipment.Battleaxe.level < getPageSetting('CapEquip2') && canAffordBuilding('Battleaxe', null, null, !0) && buyEquipment('Battleaxe', !0, !0), game.equipment.Greatsword.level < getPageSetting('CapEquip2') && canAffordBuilding('Greatsword', null, null, !0) && buyEquipment('Greatsword', !0, !0), !game.equipment.Arbalest.locked && game.equipment.Arbalest.level < getPageSetting('CapEquip2') && canAffordBuilding('Arbalest', null, null, !0) && buyEquipment('Arbalest', !0, !0), postBuy() }
function buyArms() { if (!((getPageSetting('BuyArmorNew') == 1) || (getPageSetting('BuyArmorNew') == 3))) return; preBuy(), game.global.buyAmt = 10, game.equipment.Shield.level < getPageSetting('CapEquiparm') && canAffordBuilding('Shield', null, null, !0) && buyEquipment('Shield', !0, !0), game.equipment.Boots.level < getPageSetting('CapEquiparm') && canAffordBuilding('Boots', null, null, !0) && buyEquipment('Boots', !0, !0), game.equipment.Helmet.level < getPageSetting('CapEquiparm') && canAffordBuilding('Helmet', null, null, !0) && buyEquipment('Helmet', !0, !0), game.equipment.Pants.level < getPageSetting('CapEquiparm') && canAffordBuilding('Pants', null, null, !0) && buyEquipment('Pants', !0, !0), game.equipment.Shoulderguards.level < getPageSetting('CapEquiparm') && canAffordBuilding('Shoulderguards', null, null, !0) && buyEquipment('Shoulderguards', !0, !0), game.equipment.Breastplate.level < getPageSetting('CapEquiparm') && canAffordBuilding('Breastplate', null, null, !0) && buyEquipment('Breastplate', !0, !0), !game.equipment.Gambeson.locked && game.equipment.Gambeson.level < getPageSetting('CapEquiparm') && canAffordBuilding('Gambeson', null, null, !0) && buyEquipment('Gambeson', !0, !0), postBuy() }
function isActiveSpireAT() { return game.global.challengeActive != 'Daily' && game.global.spireActive && game.global.world >= getPageSetting('IgnoreSpiresUntil') }
function disActiveSpireAT() { return game.global.challengeActive == 'Daily' && game.global.spireActive && game.global.world >= getPageSetting('dIgnoreSpiresUntil') }
function exitSpireCell() { isActiveSpireAT() && game.global.lastClearedCell >= getPageSetting('ExitSpireCell') - 1 && endSpire() }
function dailyexitSpireCell() { disActiveSpireAT() && game.global.lastClearedCell >= getPageSetting('dExitSpireCell') - 1 && endSpire() }
function plusPres() { document.getElementById("biomeAdvMapsSelect").value = "Random", document.getElementById("advExtraLevelSelect").value = plusMapToRun(game.global.world), document.getElementById("advSpecialSelect").value = "p", document.getElementById("lootAdvMapsRange").value = 0, document.getElementById("difficultyAdvMapsRange").value = 9, document.getElementById("sizeAdvMapsRange").value = 9, document.getElementById("advPerfectCheckbox").dataset.checked = !1, document.getElementById("mapLevelInput").value = game.global.world, updateMapCost() }
function plusMapToRun(a) { return 9 == a % 10 ? 6 : 5 > a % 10 ? 5 - a % 10 : 11 - a % 10 }
function findLastBionic() { for (var a = game.global.mapsOwnedArray.length - 1; 0 <= a; a--)if ("Bionic" === game.global.mapsOwnedArray[a].location) return game.global.mapsOwnedArray[a] }
function helptrimpsnotdie() { if (!game.global.preMapsActive && !game.global.fighting) buyArms(); }
function usedaily3() { !0 != getPageSetting('use3daily') || 'Daily' != game.global.challengeActive || daily3 || (daily3 = !0), !1 == getPageSetting('use3daily') && 'Daily' != game.global.challengeActive && daily3 && (daily3 = !1), !0 == getPageSetting('use3daily') && 'Daily' != game.global.challengeActive && daily3 && (daily3 = !1) }
function buyshitspire() { !0 == getPageSetting('spireshitbuy') && game.global.spireActive && game.global.world >= getPageSetting('IgnoreSpiresUntil') && (buyWeps(), buyArms()) }

//Helium

function autoGoldenUpgradesAT(setting) {
	var num = getAvailableGoldenUpgrades();
	var setting2;
	if (num == 0) return;
	if (setting == "Helium")
		setting2 = "Helium";
	if ((!game.global.dailyChallenge.seed && !game.global.runningChallengeSquared && autoTrimpSettings.AutoGoldenUpgrades.selected == "Helium" && getPageSetting('radonbattle') > 0 && game.goldenUpgrades.Helium.purchasedAt.length >= getPageSetting('radonbattle')) || (game.global.dailyChallenge.seed && autoTrimpSettings.dAutoGoldenUpgrades.selected == "Helium" && getPageSetting('dradonbattle') > 0 && game.goldenUpgrades.Helium.purchasedAt.length >= getPageSetting('dradonbattle')))
		setting2 = "Battle";
	if (setting == "Battle")
		setting2 = "Battle";
	if ((!game.global.dailyChallenge.seed && !game.global.runningChallengeSquared && autoTrimpSettings.AutoGoldenUpgrades.selected == "Battle" && getPageSetting('battleradon') > 0 && game.goldenUpgrades.Battle.purchasedAt.length >= getPageSetting('battleradon')) || (game.global.dailyChallenge.seed && autoTrimpSettings.dAutoGoldenUpgrades.selected == "Battle" && getPageSetting('dbattleradon') > 0 && game.goldenUpgrades.Battle.purchasedAt.length >= getPageSetting('dbattleradon')))
		setting2 = "Helium";
	if (setting == "Void" || setting == "Void + Battle")
		setting2 = "Void";
	var success = buyGoldenUpgrade(setting2);
	if (!success && setting2 == "Void") {
		num = getAvailableGoldenUpgrades();
		if (num == 0) return;
		if ((autoTrimpSettings.AutoGoldenUpgrades.selected == "Void" && !game.global.dailyChallenge.seed && !game.global.runningChallengeSquared) || (autoTrimpSettings.dAutoGoldenUpgrades.selected == "Void" && game.global.dailyChallenge.seed))
			setting2 = "Helium";
		if (((autoTrimpSettings.AutoGoldenUpgrades.selected == "Void" && getPageSetting('voidheliumbattle') > 0 && game.global.world >= getPageSetting('voidheliumbattle')) || (autoTrimpSettings.dAutoGoldenUpgrades.selected == "Void" && getPageSetting('dvoidheliumbattle') > 0 && game.global.world >= getPageSetting('dvoidheliumbattle'))) || ((autoTrimpSettings.AutoGoldenUpgrades.selected == "Void + Battle" && !game.global.dailyChallenge.seed && !game.global.runningChallengeSquared) || (autoTrimpSettings.dAutoGoldenUpgrades.selected == "Void + Battle" && game.global.dailyChallenge.seed) || (autoTrimpSettings.cAutoGoldenUpgrades.selected == "Void + Battle" && game.global.runningChallengeSquared)))
			setting2 = "Battle";
		buyGoldenUpgrade(setting2);
	}
}

//Praiding

function plusMapToRun1() {
	var map = 1;
	if (game.global.world % 10 == 5)
		map = 6;
	if (game.global.world % 10 == 6)
		map = 5;
	if (game.global.world % 10 == 7)
		map = 4;
	if (game.global.world % 10 == 8)
		map = 3;
	if (game.global.world % 10 == 9)
		map = 2;
	return map;
}

function plusMapToRun2() {
	var map = 2;
	if (game.global.world % 10 == 4)
		map = 7;
	if (game.global.world % 10 == 5)
		map = 7;
	if (game.global.world % 10 == 6)
		map = 6;
	if (game.global.world % 10 == 7)
		map = 5;
	if (game.global.world % 10 == 8)
		map = 4;
	if (game.global.world % 10 == 9)
		map = 3;
	return map;
}

function plusMapToRun3() {
	var map = 3;
	if (game.global.world % 10 == 3)
		map = 8;
	if (game.global.world % 10 == 4)
		map = 8;
	if (game.global.world % 10 == 5)
		map = 8;
	if (game.global.world % 10 == 6)
		map = 7;
	if (game.global.world % 10 == 7)
		map = 6;
	if (game.global.world % 10 == 8)
		map = 5;
	if (game.global.world % 10 == 9)
		map = 4;
	return map;
}

function plusMapToRun4() {
	var map = 4;
	if (game.global.world % 10 == 2)
		map = 9;
	if (game.global.world % 10 == 3)
		map = 9;
	if (game.global.world % 10 == 4)
		map = 9;
	if (game.global.world % 10 == 5)
		map = 9;
	if (game.global.world % 10 == 6)
		map = 8;
	if (game.global.world % 10 == 7)
		map = 7;
	if (game.global.world % 10 == 8)
		map = 6;
	if (game.global.world % 10 == 9)
		map = 5;
	return map;
}

function plusMapToRun5() {
	var map = 5;
	if (game.global.world % 10 == 1)
		map = 10;
	if (game.global.world % 10 == 2)
		map = 10;
	if (game.global.world % 10 == 3)
		map = 10;
	if (game.global.world % 10 == 4)
		map = 10;
	if (game.global.world % 10 == 5)
		map = 10;
	if (game.global.world % 10 == 6)
		map = 9;
	if (game.global.world % 10 == 7)
		map = 8;
	if (game.global.world % 10 == 8)
		map = 7;
	if (game.global.world % 10 == 9)
		map = 6;
	return map;
}

function plusPres1() {
	document.getElementById("biomeAdvMapsSelect").value = "Depths";
	document.getElementById("advExtraLevelSelect").value = plusMapToRun1();
	document.getElementById("advSpecialSelect").value = "p";
	document.getElementById("lootAdvMapsRange").value = 0;
	document.getElementById("difficultyAdvMapsRange").value = 9;
	document.getElementById("sizeAdvMapsRange").value = 9;
	document.getElementById("advPerfectCheckbox").dataset.checked = true;
	document.getElementById("mapLevelInput").value = game.global.world;
	updateMapCost();

	if (updateMapCost(true) > game.resources.fragments.owned) {
		document.getElementById("biomeAdvMapsSelect").value = "Random";
		updateMapCost();
	}
	if (updateMapCost(true) > game.resources.fragments.owned) {
		document.getElementById("advPerfectCheckbox").dataset.checked = false;
		updateMapCost();
	}

	while (difficultyAdvMapsRange.value > 0 && sizeAdvMapsRange.value > 0 && updateMapCost(true) > game.resources.fragments.owned) {
		difficultyAdvMapsRange.value -= 1;
		if (updateMapCost(true) <= game.resources.fragments.owned) break;
		sizeAdvMapsRange.value -= 1;
	}
	if (updateMapCost(true) <= game.resources.fragments.owned) return updateMapCost(true);

	if (updateMapCost(true) > game.resources.fragments.owned) {
		document.getElementById("advSpecialSelect").value = 0;
		updateMapCost();
	}
}

function plusPres2() {
	document.getElementById("biomeAdvMapsSelect").value = "Depths";
	document.getElementById("advExtraLevelSelect").value = plusMapToRun2();
	document.getElementById("advSpecialSelect").value = "p";
	document.getElementById("lootAdvMapsRange").value = 0;
	document.getElementById("difficultyAdvMapsRange").value = 9;
	document.getElementById("sizeAdvMapsRange").value = 9;
	document.getElementById("advPerfectCheckbox").dataset.checked = true;
	document.getElementById("mapLevelInput").value = game.global.world;
	updateMapCost();

	if (updateMapCost(true) > game.resources.fragments.owned) {
		document.getElementById("biomeAdvMapsSelect").value = "Random";
		updateMapCost();
	}
	if (updateMapCost(true) > game.resources.fragments.owned) {
		document.getElementById("advPerfectCheckbox").dataset.checked = false;
		updateMapCost();
	}

	while (difficultyAdvMapsRange.value > 0 && sizeAdvMapsRange.value > 0 && updateMapCost(true) > game.resources.fragments.owned) {
		difficultyAdvMapsRange.value -= 1;
		if (updateMapCost(true) <= game.resources.fragments.owned) break;
		sizeAdvMapsRange.value -= 1;
	}
	if (updateMapCost(true) <= game.resources.fragments.owned) return updateMapCost(true);

	if (updateMapCost(true) > game.resources.fragments.owned) {
		document.getElementById("advSpecialSelect").value = 0;
		updateMapCost();
	}
}

function plusPres3() {
	document.getElementById("biomeAdvMapsSelect").value = "Depths";
	document.getElementById("advExtraLevelSelect").value = plusMapToRun3();
	document.getElementById("advSpecialSelect").value = "p";
	document.getElementById("lootAdvMapsRange").value = 0;
	document.getElementById("difficultyAdvMapsRange").value = 9;
	document.getElementById("sizeAdvMapsRange").value = 9;
	document.getElementById("advPerfectCheckbox").dataset.checked = true;
	document.getElementById("mapLevelInput").value = game.global.world;
	updateMapCost();

	if (updateMapCost(true) > game.resources.fragments.owned) {
		document.getElementById("biomeAdvMapsSelect").value = "Random";
		updateMapCost();
	}
	if (updateMapCost(true) > game.resources.fragments.owned) {
		document.getElementById("advPerfectCheckbox").dataset.checked = false;
		updateMapCost();
	}

	while (difficultyAdvMapsRange.value > 0 && sizeAdvMapsRange.value > 0 && updateMapCost(true) > game.resources.fragments.owned) {
		difficultyAdvMapsRange.value -= 1;
		if (updateMapCost(true) <= game.resources.fragments.owned) break;
		sizeAdvMapsRange.value -= 1;
	}
	if (updateMapCost(true) <= game.resources.fragments.owned) return updateMapCost(true);

	if (updateMapCost(true) > game.resources.fragments.owned) {
		document.getElementById("advSpecialSelect").value = 0;
		updateMapCost();
	}
}

function plusPres4() {
	document.getElementById("biomeAdvMapsSelect").value = "Depths";
	document.getElementById("advExtraLevelSelect").value = plusMapToRun4();
	document.getElementById("advSpecialSelect").value = "p";
	document.getElementById("lootAdvMapsRange").value = 0;
	document.getElementById("difficultyAdvMapsRange").value = 9;
	document.getElementById("sizeAdvMapsRange").value = 9;
	document.getElementById("advPerfectCheckbox").dataset.checked = true;
	document.getElementById("mapLevelInput").value = game.global.world;
	updateMapCost();

	if (updateMapCost(true) > game.resources.fragments.owned) {
		document.getElementById("biomeAdvMapsSelect").value = "Random";
		updateMapCost();
	}
	if (updateMapCost(true) > game.resources.fragments.owned) {
		document.getElementById("advPerfectCheckbox").dataset.checked = false;
		updateMapCost();
	}

	while (difficultyAdvMapsRange.value > 0 && sizeAdvMapsRange.value > 0 && updateMapCost(true) > game.resources.fragments.owned) {
		difficultyAdvMapsRange.value -= 1;
		if (updateMapCost(true) <= game.resources.fragments.owned) break;
		sizeAdvMapsRange.value -= 1;
	}
	if (updateMapCost(true) <= game.resources.fragments.owned) return updateMapCost(true);

	if (updateMapCost(true) > game.resources.fragments.owned) {
		document.getElementById("advSpecialSelect").value = 0;
		updateMapCost();
	}
}

function plusPres5() {
	document.getElementById("biomeAdvMapsSelect").value = "Depths";
	document.getElementById("advExtraLevelSelect").value = plusMapToRun5();
	document.getElementById("advSpecialSelect").value = "p";
	document.getElementById("lootAdvMapsRange").value = 0;
	document.getElementById("difficultyAdvMapsRange").value = 9;
	document.getElementById("sizeAdvMapsRange").value = 9;
	document.getElementById("advPerfectCheckbox").dataset.checked = true;
	document.getElementById("mapLevelInput").value = game.global.world;
	updateMapCost();

	if (updateMapCost(true) > game.resources.fragments.owned) {
		document.getElementById("biomeAdvMapsSelect").value = "Random";
		updateMapCost();
	}
	if (updateMapCost(true) > game.resources.fragments.owned) {
		document.getElementById("advPerfectCheckbox").dataset.checked = false;
		updateMapCost();
	}

	while (difficultyAdvMapsRange.value > 0 && sizeAdvMapsRange.value > 0 && updateMapCost(true) > game.resources.fragments.owned) {
		difficultyAdvMapsRange.value -= 1;
		if (updateMapCost(true) <= game.resources.fragments.owned) break;
		sizeAdvMapsRange.value -= 1;
	}
	if (updateMapCost(true) <= game.resources.fragments.owned) return updateMapCost(true);

	if (updateMapCost(true) > game.resources.fragments.owned) {
		document.getElementById("advSpecialSelect").value = 0;
		updateMapCost();
	}
}

function pcheck1() {
	var HD;
	var P;
	var I;

	if (game.global.challengeActive != "Daily") {
		HD = getPageSetting('PraidingHD');
		P = (getPageSetting('PraidingP') > 0 ? getPageSetting('PraidingP') : 0);
		I = (getPageSetting('PraidingI') > 0 ? getPageSetting('PraidingI') : 0);
	}
	if (game.global.challengeActive == "Daily") {
		HD = getPageSetting('dPraidingHD');
		P = (getPageSetting('dPraidingP') > 0 ? getPageSetting('dPraidingP') : 0);
		I = (getPageSetting('dPraidingI') > 0 ? getPageSetting('dPraidingI') : 0);
	}

	var go = false;

	if (HD <= 0) {
		go = true;
	}
	else if (HD > 0) {
		go = (HD >= calcHDratio(game.global.world + plusMapToRun1()));
	}
	if (P > 0 && getEmpowerment() == "Poison") {
		go = (P >= plusMapToRun1());
	}
	if (I > 0 && getEmpowerment() == "Ice") {
		go = (I >= plusMapToRun1());
	}
	return go;
}

function pcheck2() {
	var HD;
	var P;
	var I;

	if (game.global.challengeActive != "Daily") {
		HD = getPageSetting('PraidingHD');
		P = (getPageSetting('PraidingP') > 0 ? getPageSetting('PraidingP') : 0);
		I = (getPageSetting('PraidingI') > 0 ? getPageSetting('PraidingI') : 0);
	}
	if (game.global.challengeActive == "Daily") {
		HD = getPageSetting('dPraidingHD');
		P = (getPageSetting('dPraidingP') > 0 ? getPageSetting('dPraidingP') : 0);
		I = (getPageSetting('dPraidingI') > 0 ? getPageSetting('dPraidingI') : 0);
	}

	var go = false;

	if (HD <= 0) {
		go = true;
	}
	else if (HD > 0) {
		go = (HD >= calcHDratio(game.global.world + plusMapToRun2()));
	}
	if (P > 0 && getEmpowerment() == "Poison") {
		go = (P >= plusMapToRun2());
	}
	if (I > 0 && getEmpowerment() == "Ice") {
		go = (I >= plusMapToRun2());
	}
	return go;
}

function pcheck3() {
	var HD;
	var P;
	var I;

	if (game.global.challengeActive != "Daily") {
		HD = getPageSetting('PraidingHD');
		P = (getPageSetting('PraidingP') > 0 ? getPageSetting('PraidingP') : 0);
		I = (getPageSetting('PraidingI') > 0 ? getPageSetting('PraidingI') : 0);
	}
	if (game.global.challengeActive == "Daily") {
		HD = getPageSetting('dPraidingHD');
		P = (getPageSetting('dPraidingP') > 0 ? getPageSetting('dPraidingP') : 0);
		I = (getPageSetting('dPraidingI') > 0 ? getPageSetting('dPraidingI') : 0);
	}

	var go = false;

	if (HD <= 0) {
		go = true;
	}
	else if (HD > 0) {
		go = (HD >= calcHDratio(game.global.world + plusMapToRun3()));
	}
	if (P > 0 && getEmpowerment() == "Poison") {
		go = (P >= plusMapToRun3());
	}
	if (I > 0 && getEmpowerment() == "Ice") {
		go = (I >= plusMapToRun3());
	}
	return go;
}

function pcheck4() {
	var HD;
	var P;
	var I;

	if (game.global.challengeActive != "Daily") {
		HD = getPageSetting('PraidingHD');
		P = (getPageSetting('PraidingP') > 0 ? getPageSetting('PraidingP') : 0);
		I = (getPageSetting('PraidingI') > 0 ? getPageSetting('PraidingI') : 0);
	}
	if (game.global.challengeActive == "Daily") {
		HD = getPageSetting('dPraidingHD');
		P = (getPageSetting('dPraidingP') > 0 ? getPageSetting('dPraidingP') : 0);
		I = (getPageSetting('dPraidingI') > 0 ? getPageSetting('dPraidingI') : 0);
	}

	var go = false;

	if (HD <= 0) {
		go = true;
	}
	else if (HD > 0) {
		go = (HD >= calcHDratio(game.global.world + plusMapToRun4()));
	}
	if (P > 0 && getEmpowerment() == "Poison") {
		go = (P >= plusMapToRun4());
	}
	if (I > 0 && getEmpowerment() == "Ice") {
		go = (I >= plusMapToRun4());
	}
	return go;
}

function pcheck5() {
	var HD;
	var P;
	var I;

	if (game.global.challengeActive != "Daily") {
		HD = getPageSetting('PraidingHD');
		P = (getPageSetting('PraidingP') > 0 ? getPageSetting('PraidingP') : 0);
		I = (getPageSetting('PraidingI') > 0 ? getPageSetting('PraidingI') : 0);
	}
	if (game.global.challengeActive == "Daily") {
		HD = getPageSetting('dPraidingHD');
		P = (getPageSetting('dPraidingP') > 0 ? getPageSetting('dPraidingP') : 0);
		I = (getPageSetting('dPraidingI') > 0 ? getPageSetting('dPraidingI') : 0);
	}

	var go = false;

	if (HD <= 0) {
		go = true;
	}
	else if (HD > 0) {
		go = (HD >= calcHDratio(game.global.world + plusMapToRun5()));
	}
	if (P > 0 && getEmpowerment() == "Poison") {
		go = (P >= plusMapToRun5());
	}
	if (I > 0 && getEmpowerment() == "Ice") {
		go = (I >= plusMapToRun5());
	}
	return go;
}

function pcheckmap1() {
	var go = false;
	if (game.global.world % 10 == 0 && plusMapToRun1() == 1) {
		go = true;
	}
	if (game.global.world % 10 == 1 && (plusMapToRun1() == 1 || plusMapToRun1() == 10)) {
		go = true;
	}
	if (game.global.world % 10 == 2 && (plusMapToRun1() == 1 || plusMapToRun1() >= 9)) {
		go = true;
	}
	if (game.global.world % 10 == 3 && (plusMapToRun1() == 1 || plusMapToRun1() >= 8)) {
		go = true;
	}
	if (game.global.world % 10 == 4 && (plusMapToRun1() == 1 || plusMapToRun1() >= 7)) {
		go = true;
	}
	if (game.global.world % 10 == 5 && plusMapToRun1() >= 6) {
		go = true;
	}
	if (game.global.world % 10 == 6 && plusMapToRun1() >= 5) {
		go = true;
	}
	if (game.global.world % 10 == 7 && plusMapToRun1() >= 4) {
		go = true;
	}
	if (game.global.world % 10 == 8 && plusMapToRun1() >= 3) {
		go = true;
	}
	if (game.global.world % 10 == 9 && plusMapToRun1() >= 2) {
		go = true;
	}
	return go;
}

function pcheckmap2() {
	var go = false;
	if (game.global.world % 10 == 0 && plusMapToRun2() == 2) {
		go = true;
	}
	if (game.global.world % 10 == 1 && (plusMapToRun2() == 2 || plusMapToRun2() == 10)) {
		go = true;
	}
	if (game.global.world % 10 == 2 && (plusMapToRun2() == 2 || plusMapToRun2() >= 9)) {
		go = true;
	}
	if (game.global.world % 10 == 3 && (plusMapToRun2() == 2 || plusMapToRun2() >= 8)) {
		go = true;
	}
	if (game.global.world % 10 == 4 && plusMapToRun2() >= 7) {
		go = true;
	}
	if (game.global.world % 10 == 5 && plusMapToRun2() >= 6) {
		go = true;
	}
	if (game.global.world % 10 == 6 && plusMapToRun2() >= 6) {
		go = true;
	}
	if (game.global.world % 10 == 7 && plusMapToRun2() >= 5) {
		go = true;
	}
	if (game.global.world % 10 == 8 && plusMapToRun2() >= 4) {
		go = true;
	}
	if (game.global.world % 10 == 9 && plusMapToRun2() >= 3) {
		go = true;
	}
	return go;
}

function pcheckmap3() {
	var go = false;
	if (game.global.world % 10 == 0 && plusMapToRun3() == 3) {
		go = true;
	}
	if (game.global.world % 10 == 1 && (plusMapToRun3() == 3 || plusMapToRun3() == 10)) {
		go = true;
	}
	if (game.global.world % 10 == 2 && (plusMapToRun3() == 3 || plusMapToRun3() >= 9)) {
		go = true;
	}
	if (game.global.world % 10 == 3 && plusMapToRun3() >= 8) {
		go = true;
	}
	if (game.global.world % 10 == 4 && plusMapToRun3() >= 8) {
		go = true;
	}
	if (game.global.world % 10 == 5 && plusMapToRun3() >= 8) {
		go = true;
	}
	if (game.global.world % 10 == 6 && plusMapToRun3() >= 7) {
		go = true;
	}
	if (game.global.world % 10 == 7 && plusMapToRun3() >= 6) {
		go = true;
	}
	if (game.global.world % 10 == 8 && plusMapToRun3() >= 5) {
		go = true;
	}
	if (game.global.world % 10 == 9 && plusMapToRun3() >= 4) {
		go = true;
	}
	return go;
}

function pcheckmap4() {
	var go = false;
	if (game.global.world % 10 == 0 && plusMapToRun4() == 4) {
		go = true;
	}
	if (game.global.world % 10 == 1 && (plusMapToRun4() == 4 || plusMapToRun4() == 10)) {
		go = true;
	}
	if (game.global.world % 10 == 2 && plusMapToRun4() >= 9) {
		go = true;
	}
	if (game.global.world % 10 == 3 && plusMapToRun4() >= 8) {
		go = true;
	}
	if (game.global.world % 10 == 4 && plusMapToRun4() >= 7) {
		go = true;
	}
	if (game.global.world % 10 == 5 && plusMapToRun4() >= 6) {
		go = true;
	}
	if (game.global.world % 10 == 6 && plusMapToRun4() >= 5) {
		go = true;
	}
	if (game.global.world % 10 == 7 && plusMapToRun4() >= 4) {
		go = true;
	}
	if (game.global.world % 10 == 8 && plusMapToRun4() >= 3) {
		go = true;
	}
	if (game.global.world % 10 == 9 && plusMapToRun4() >= 2) {
		go = true;
	}
	return go;
}

function pcheckmap5() {
	var go = false;
	if (game.global.world % 10 == 0 && plusMapToRun5() == 5) {
		go = true;
	}
	if (game.global.world % 10 == 1 && (plusMapToRun5() == 4 || plusMapToRun5() == 10)) {
		go = true;
	}
	if (game.global.world % 10 == 2 && (plusMapToRun5() == 3 || plusMapToRun5() >= 9)) {
		go = true;
	}
	if (game.global.world % 10 == 3 && (plusMapToRun5() == 2 || plusMapToRun5() >= 8)) {
		go = true;
	}
	if (game.global.world % 10 == 4 && (plusMapToRun5() == 1 || plusMapToRun5() >= 7)) {
		go = true;
	}
	if (game.global.world % 10 == 5 && plusMapToRun5() >= 6) {
		go = true;
	}
	if (game.global.world % 10 == 6 && plusMapToRun5() >= 5) {
		go = true;
	}
	if (game.global.world % 10 == 7 && plusMapToRun5() >= 4) {
		go = true;
	}
	if (game.global.world % 10 == 8 && plusMapToRun5() >= 3) {
		go = true;
	}
	if (game.global.world % 10 == 9 && plusMapToRun5() >= 2) {
		go = true;
	}
	return go;
}

var pMap1 = undefined;
var pMap2 = undefined;
var pMap3 = undefined;
var pMap4 = undefined;
var pMap5 = undefined;
var repMap1 = undefined;
var repMap2 = undefined;
var repMap3 = undefined;
var repMap4 = undefined;
var repMap5 = undefined;
var mapbought1 = false;
var mapbought2 = false;
var mapbought3 = false;
var mapbought4 = false;
var mapbought5 = false;

function Praiding() {
	var cell;
	cell = ((getPageSetting('Praidingcell') > 0) ? getPageSetting('Praidingcell') : 0);
	if (getPageSetting('Praidingzone').length) {
		if (getPageSetting('Praidingzone').includes(game.global.world) && ((cell <= 1) || (cell > 1 && (game.global.lastClearedCell + 1) >= cell)) && !prestraid && !failpraid) {
			prestraidon = true;
			if (getPageSetting('AutoMaps') == 1 && !prestraid && !failpraid) {
				autoTrimpSettings["AutoMaps"].value = 0;
			}
			if (!game.global.preMapsActive && !game.global.mapsActive && !prestraid) {
				mapsClicked();
				if (!game.global.preMapsActive) {
					mapsClicked();
				}
				debug("Beginning Prestige Raiding...");
			}
			if (game.options.menu.repeatUntil.enabled != 2 && !prestraid) {
				game.options.menu.repeatUntil.enabled = 2;
			}
			if (game.global.preMapsActive && !game.global.mapsActive && !prestraid) {
				debug("Map Loop");
				if (pcheckmap5() == true && pcheck5() == true && pMap5 == undefined && !mapbought5 && game.global.preMapsActive && !prestraid) {
					debug("Check complete for 5th map");
					plusPres5();
					if ((updateMapCost(true) <= game.resources.fragments.owned)) {
						buyMap();
						mapbought5 = true;
						if (mapbought5) {
							pMap5 = game.global.mapsOwnedArray[game.global.mapsOwnedArray.length - 1].id;
							debug("5th map bought");
						}
					}
				}
				if (pcheckmap4() == true && pcheck4() == true && pMap4 == undefined && !mapbought4 && game.global.preMapsActive && !prestraid) {
					debug("Check complete for 4th map");
					plusPres4();
					if ((updateMapCost(true) <= game.resources.fragments.owned)) {
						buyMap();
						mapbought4 = true;
						if (mapbought4) {
							pMap4 = game.global.mapsOwnedArray[game.global.mapsOwnedArray.length - 1].id;
							debug("4th map bought");
						}
					}
				}
				if (pcheckmap3() == true && pcheck3() == true && pMap3 == undefined && !mapbought3 && game.global.preMapsActive && !prestraid) {
					debug("Check complete for 3rd map");
					plusPres3();
					if ((updateMapCost(true) <= game.resources.fragments.owned)) {
						buyMap();
						mapbought3 = true;
						if (mapbought3) {
							pMap3 = game.global.mapsOwnedArray[game.global.mapsOwnedArray.length - 1].id;
							debug("3rd map bought");
						}
					}
				}
				if (pcheckmap2() == true && pcheck2() == true && pMap2 == undefined && !mapbought2 && game.global.preMapsActive && !prestraid) {
					debug("Check complete for 2nd map");
					plusPres2();
					if ((updateMapCost(true) <= game.resources.fragments.owned)) {
						buyMap();
						mapbought2 = true;
						if (mapbought2) {
							pMap2 = game.global.mapsOwnedArray[game.global.mapsOwnedArray.length - 1].id;
							debug("2nd map bought");
						}
					}
				}
				if (pcheckmap1() == true && pcheck1() == true && pMap1 == undefined && !mapbought1 && game.global.preMapsActive && !prestraid) {
					debug("Check complete for 1st map");
					plusPres1();
					if ((updateMapCost(true) <= game.resources.fragments.owned)) {
						buyMap();
						mapbought1 = true;
						if (mapbought1) {
							pMap1 = game.global.mapsOwnedArray[game.global.mapsOwnedArray.length - 1].id;
							debug("1st map bought");
						}
					}
				}
				if (!mapbought1 && !mapbought2 && !mapbought3 && !mapbought4 && !mapbought5) {
					if (getPageSetting('AutoMaps') == 0 && !prestraid) {
						autoTrimpSettings["AutoMaps"].value = 1;
						game.options.menu.repeatUntil.enabled = 0;
						prestraidon = false;
						failpraid = true;
						praidDone = true;
						pMap1 = undefined;
						pMap2 = undefined;
						pMap3 = undefined;
						pMap4 = undefined;
						pMap5 = undefined;
						debug("Failed to Prestige Raid. Looks like you can't afford to or you are too weak or you have limited yourself in a P/I zone. ");
					}
					return;
				}
			}
			if (game.global.preMapsActive && !game.global.mapsActive && mapbought1 && pMap1 != undefined && !prestraid) {
				debug("running map 1");
				selectMap(pMap1);
				runMap();
				repMap1 = pMap1;
				pMap1 = undefined;
			}
			if (game.global.preMapsActive && !game.global.mapsActive && mapbought2 && pMap2 != undefined && !prestraid) {
				debug("running map 2");
				selectMap(pMap2);
				runMap();
				repMap2 = pMap2;
				pMap2 = undefined;
			}
			if (game.global.preMapsActive && !game.global.mapsActive && mapbought3 && pMap3 != undefined && !prestraid) {
				debug("running map 3");
				selectMap(pMap3);
				runMap();
				repMap3 = pMap3;
				pMap3 = undefined;
			}
			if (game.global.preMapsActive && !game.global.mapsActive && mapbought4 && pMap4 != undefined && !prestraid) {
				debug("running map 4");
				selectMap(pMap4);
				runMap();
				repMap4 = pMap4;
				pMap4 = undefined;
			}
			if (game.global.preMapsActive && !game.global.mapsActive && mapbought5 && pMap5 != undefined && !prestraid) {
				debug("running map 5");
				selectMap(pMap5);
				runMap();
				repMap5 = pMap5;
				pMap5 = undefined;
			}
			if (!prestraid && !game.global.repeatMap) {
				repeatClicked();
			}
		}
	}
	if (game.global.preMapsActive && (mapbought1 || mapbought2 || mapbought3 || mapbought4 || mapbought5) && pMap1 == undefined && pMap2 == undefined && pMap3 == undefined && pMap4 == undefined && pMap5 == undefined && !prestraid && !failpraid) {
		prestraid = true;
		failpraid = false;
		mapbought1 = false;
		mapbought2 = false;
		mapbought3 = false;
		mapbought4 = false;
		mapbought5 = false;
	}
	if (getPageSetting('AutoMaps') == 0 && game.global.preMapsActive && prestraid && !failpraid && prestraidon) {
		praidDone = true;
		prestraidon = false;
		if (repMap1 != undefined) {
			recycleMap(getMapIndex(repMap1));
			repMap1 = undefined;
		}
		if (repMap2 != undefined) {
			recycleMap(getMapIndex(repMap2));
			repMap2 = undefined;
		}
		if (repMap3 != undefined) {
			recycleMap(getMapIndex(repMap3));
			repMap3 = undefined;
		}
		if (repMap4 != undefined) {
			recycleMap(getMapIndex(repMap4));
			repMap4 = undefined;
		}
		if (repMap5 != undefined) {
			recycleMap(getMapIndex(repMap5));
			repMap5 = undefined;
		}
		autoTrimpSettings["AutoMaps"].value = 1;
		game.options.menu.repeatUntil.enabled = 0;
		pMap1 = undefined;
		pMap2 = undefined;
		pMap3 = undefined;
		pMap4 = undefined;
		pMap5 = undefined;
		debug("Prestige raiding successful!");
		debug("Turning AutoMaps back on");
	}
	if (getPageSetting('Praidingzone').every(isBelowThreshold)) {
		prestraid = false;
		failpraid = false;
		prestraidon = false;
		mapbought1 = false;
		mapbought2 = false;
		mapbought3 = false;
		mapbought4 = false;
		mapbought5 = false;
		pMap1 = undefined;
		pMap2 = undefined;
		pMap3 = undefined;
		pMap4 = undefined;
		pMap5 = undefined;
		repMap1 = undefined;
		repMap2 = undefined;
		repMap3 = undefined;
		repMap4 = undefined;
		repMap5 = undefined;
		praidDone = false;
	}
}

function PraidHarder() {
	var maxPlusZones;
	var mapModifiers = ["p", "fa", "0"];
	var farmFragments;
	var praidBeforeFarm;
	var pRaidIndex;
	var maxPraidZSetting;
	var cell;

	// Determine whether to use daily or normal run settings
	if (game.global.challengeActive == "Daily") {
		praidSetting = 'dPraidingzone';
		maxPraidZSetting = 'dMaxPraidZone';
		farmFragments = getPageSetting('dPraidFarmFragsZ').includes(game.global.world);
		praidBeforeFarm = getPageSetting('dPraidBeforeFarmZ').includes(game.global.world);
		cell = ((getPageSetting('dPraidingcell') > 0) ? getPageSetting('dPraidingcell') : 0);
	} else {
		praidSetting = 'Praidingzone';
		maxPraidZSetting = 'MaxPraidZone';
		farmFragments = getPageSetting('PraidFarmFragsZ').includes(game.global.world);
		praidBeforeFarm = getPageSetting('PraidBeforeFarmZ').includes(game.global.world);
		cell = ((getPageSetting('Praidingcell') > 0) ? getPageSetting('Praidingcell') : 0);
	}

	pRaidIndex = getPageSetting(praidSetting).indexOf(game.global.world);
	if (pRaidIndex == -1 || typeof (getPageSetting(maxPraidZSetting)[pRaidIndex]) === "undefined") maxPlusZones = plusMapToRun(game.global.world);
	else maxPlusZones = getPageSetting(maxPraidZSetting)[pRaidIndex] - game.global.world;

	// Check we have a valid number for maxPlusZones
	maxPlusZones = maxPlusZones > 10 ? 10 : (maxPlusZones < 0 ? 10 : maxPlusZones);

	// Work out the max number of +map zones it's worth farming for prestige.
	if ((game.global.world + maxPlusZones) % 10 > 5)
		maxPlusZones = Math.max(maxPlusZones + (5 - (game.global.world + maxPlusZones) % 10), 0);
	else if ((game.global.world + maxPlusZones) % 10 == 0)
		maxPlusZones = Math.min(5, maxPlusZones);

	// If we have any Praiding zones defined...
	if (getPageSetting(praidSetting).length) {
		if (getPageSetting(praidSetting).includes(game.global.world) && ((game.global.lastClearedCell + 1) >= cell) && !prestraid && !failpraid && !shouldFarmFrags) {
			debug('Beginning Praiding');
			// Initialise shouldFarmFrags to false
			shouldFarmFrags = false;
			// Mark that we are prestige raiding and turn off automaps to stop it interfering
			prestraidon = true;
			autoTrimpSettings["AutoMaps"].value = 0;
			// Get into the preMaps screen
			if (!game.global.preMapsActive && !game.global.mapsActive) {
				mapsClicked();
				if (!game.global.preMapsActive) {
					mapsClicked();
				}
			}
			// Set repeat for items
			game.options.menu.repeatUntil.enabled = 2;
			toggleSetting("repeatUntil", null, false, true);
			// if we can farm for fragments, work out the minimum number we need to get all available prestiges
			if (farmFragments) {
				plusPres();
				document.getElementById('advExtraLevelSelect').value = maxPlusZones;
				document.getElementById('sizeAdvMapsRange').value = 0;
				document.getElementById('difficultyAdvMapsRange').value = 0;
				document.getElementById('advSpecialSelect').value = "0";
				minMaxMapCost = updateMapCost(true);
				// If we are not Praiding before farming, and cannot afford a max plus map, set flags for farming
				if (!praidBeforeFarm && game.resources.fragments.owned < minMaxMapCost) {
					prestraid = true;
					failpraid = false;
					shouldFarmFrags = true;
				}
			}
			// Set map settings to the best map for Praiding (even if we can't afford it)
			plusPres();
			document.getElementById('advExtraLevelSelect').value = maxPlusZones;
			// Iterate down through plusMaps setting until we find one we can afford
			for (var curPlusZones = maxPlusZones; curPlusZones >= 0; curPlusZones--) {
				// If the current targeted zone has no prestiges, decrement the number of plusZones and continue
				if ((game.global.world + curPlusZones) % 10 == 0 || (game.global.world + curPlusZones) % 10 > 5) continue;
				// Otherwise check to see if we can afford a map at the current plusZones setting
				document.getElementById('advExtraLevelSelect').value = curPlusZones;
				// If we find a map we can afford, break out of the loop
				if (relaxMapReqs(mapModifiers)) break;
				// conserve fragments if going to farm after by selecting only maps with no special modifier
				else if (farmFragments) mapModifiers = ["0"];
			}
			// If the map is not at the highest level with prestiges possible, set shouldFarmFrags to true
			if (maxPlusZones > curPlusZones) shouldFarmFrags = true;

			// If we found a suitable map...
			if (curPlusZones >= 0 && (praidBeforeFarm || shouldFarmFrags == false)) {
				// ...buy it
				buyMap();
				pMap = game.global.mapsOwnedArray[game.global.mapsOwnedArray.length - 1].id;
				selectMap(pMap);
				// Set flags to avoid rerunning this step
				prestraid = true;
				// prestraidon = false;
				failpraid = false;
				// Set repeat on and run the map
				game.global.repeatMap = true;
				runMap();
				repeatClicked(true);
			}
			// If we can't afford a map, and can't farm fragments, fail and turn automaps back on
			else if (!farmFragments) {
				failpraid = true;
				prestraidon = false;
				praidDone = true;
				debug("Failed to prestige raid. Looks like you can't afford to.");
			} else {
				debug("Turning AutoMaps back on");
				autoTrimpSettings['AutoMaps'].value = 1;
				game.options.menu.repeatUntil.enabled = 0;
			}
			return;
		}
	}

	if (farmFragments && shouldFarmFrags && game.global.preMapsActive && prestraid && !fMap) {
		if (pMap) recycleMap(getMapIndex(pMap));
		pMap = null;
		// Choose a fragment farming map
		document.getElementById("biomeAdvMapsSelect").value = "Depths";
		document.getElementById('advExtraLevelSelect').value = 0;
		document.getElementById('advSpecialSelect').value = "fa";
		document.getElementById("lootAdvMapsRange").value = 9;
		document.getElementById("difficultyAdvMapsRange").value = 9;
		document.getElementById("sizeAdvMapsRange").value = 9;
		document.getElementById('advPerfectCheckbox').dataset.checked = true;
		document.getElementById("mapLevelInput").value = game.global.world - 1;
		game.options.menu.repeatUntil.enabled = 0;
		toggleSetting("repeatUntil", null, false, true);
		if (updateMapCost(true) <= game.resources.fragments.owned) {
			debug("Buying perfect sliders fragment farming map");
			buyMap();
			fMap = game.global.mapsOwnedArray[game.global.mapsOwnedArray.length - 1].id;
			selectMap(fMap);
			game.global.repeatMap = true;
			runMap();
			repeatClicked(true);
		} else {
			document.getElementById('advPerfectCheckbox').dataset.checked = false;
			if (updateMapCost(true) <= game.resources.fragments.owned) {
				debug("Buying imperfect sliders fragment farming map");
				buyMap();
				fMap = game.global.mapsOwnedArray[game.global.mapsOwnedArray.length - 1].id;
				selectMap(fMap);
				game.global.repeatMap = true;
				runMap();
				repeatClicked(true);
			}
			// if we can't buy a map, wait until the next main loop iteration and try again
			else debug("Can't afford fragment farming map yet");
		}
	}

	if ((game.global.mapsActive || game.global.preMapsActive) && minMaxMapCost <= game.resources.fragments.owned && shouldFarmFrags) {
		game.global.repeatMap = false;
		repeatClicked(true);
		if (game.global.preMapsActive) {
			minMaxMapCost = null;
			shouldFarmFrags = false;
			prestraid = false;
			failpraid = false;
		}
	}
	if (game.global.preMapsActive && prestraid && !failpraid && !shouldFarmFrags && prestraidon) {
		prestraidon = false;
		praidDone = true;
		debug("Prestige raiding successful! - recycling Praid map");
		if (pMap) recycleMap(getMapIndex(pMap));
		if (fMap) recycleMap(getMapIndex(fMap));
		pMap = null;
		fMap = null;
		debug("Turning AutoMaps back on");
		game.options.menu.repeatUntil.enabled = 0;
		autoTrimpSettings['AutoMaps'].value = 1;
	}

	if (!getPageSetting(praidSetting).includes(game.global.world)) {
		prestraid = false;
		failpraid = false;
		prestraidon = false;
		shouldFarmFrags = false;
		praidDone = false;
	}
}

function relaxMapReqs(mapModifiers) {
	for (var j = 0; j < mapModifiers.length; j++) {
		document.getElementById('sizeAdvMapsRange').value = 9;
		document.getElementById('advSpecialSelect').value = mapModifiers[j];
		for (var i = 9; i >= 0; i--) {
			document.getElementById('difficultyAdvMapsRange').value = i;
			if (updateMapCost(true) <= game.resources.fragments.owned) return true;
		}
		for (i = 9; i >= 0; i--) {
			document.getElementById('sizeAdvMapsRange').value = i;
			if (updateMapCost(true) <= game.resources.fragments.owned) return true;
		}
	}
	return false;
}

function BWraiding() {
	var bwraidZ;
	var bwraidSetting;
	var bwraidMax;
	var isBWRaidZ;
	var targetBW;
	var bwIndex;
	var cell;

	if (game.global.challengeActive == "Daily") {
		bwraidZ = 'dBWraidingz';
		bwraidSetting = 'Dailybwraid';
		bwraidMax = 'dBWraidingmax';
		cell = ((getPageSetting('dbwraidcell') > 0) ? getPageSetting('dbwraidcell') : 1);
	} else {
		bwraidZ = 'BWraidingz';
		bwraidSetting = 'BWraid';
		bwraidMax = 'BWraidingmax';
		cell = ((getPageSetting('bwraidcell') > 0) ? getPageSetting('bwraidcell') : 1);
	}

	isBWRaidZ = getPageSetting(bwraidZ).includes(game.global.world) && ((game.global.lastClearedCell + 1) >= cell);
	bwIndex = getPageSetting(bwraidZ).indexOf(game.global.world);
	if (bwIndex == -1 || typeof (getPageSetting(bwraidMax)[bwIndex]) === "undefined") targetBW = -1;
	else targetBW = getPageSetting(bwraidMax)[bwIndex];

	if (isBWRaidZ && !bwraided && !failbwraid && getPageSetting(bwraidSetting)) {
		if (getPageSetting('AutoMaps') == 1 && !bwraided && !failbwraid) {
			autoTrimpSettings["AutoMaps"].value = 0;
		}

		while (!game.global.preMapsActive && !bwraidon) mapsClicked();

		if (game.options.menu.repeatUntil.enabled != 2 && !bwraided && !failbwraid) {
			game.options.menu.repeatUntil.enabled = 2;
		}

		if (game.global.preMapsActive && !bwraided && !failbwraid && findLastBionic()) {
			selectMap(findLastBionic().id);
			failbwraid = false;
			debug("Beginning BW Raiding...");
		} else if (game.global.preMapsActive && !bwraided && !failbwraid) {
			if (getPageSetting('AutoMaps') == 0 && isBWRaidZ && !bwraided) {
				autoTrimpSettings["AutoMaps"].value = 1;
				failbwraid = true;
				debug("Failed to BW raid. Looks like you don't have a BW to raid...");
			}
		}

		if (findLastBionic().level <= targetBW && !bwraided && !failbwraid && game.global.preMapsActive) {
			runMap();
			bwraidon = true;
		}

		if (!game.global.repeatMap && !bwraided && !failbwraid && game.global.mapsActive) {
			repeatClicked();
		}

		if (findLastBionic().level > targetBW && !bwraided && !failbwraid) {
			bwraided = true;
			failbwraid = false;
			bwraidon = false;
			debug("...Successfully BW raided!");
		}
	}

	if (getPageSetting('AutoMaps') == 0 && game.global.preMapsActive && bwraided && !failbwraid) {
		autoTrimpSettings["AutoMaps"].value = 1;
		debug("Turning AutoMaps back on");
	}

	if (!isBWRaidZ) {
		bwraided = false;
		failbwraid = false;
		bwraidon = false;
	}
}

var dpMap1 = undefined;
var dpMap2 = undefined;
var dpMap3 = undefined;
var dpMap4 = undefined;
var dpMap5 = undefined;
var drepMap1 = undefined;
var drepMap2 = undefined;
var drepMap3 = undefined;
var drepMap4 = undefined;
var drepMap5 = undefined;
var dmapbought1 = false;
var dmapbought2 = false;
var dmapbought3 = false;
var dmapbought4 = false;
var dmapbought5 = false;
var dpraidDone = false;

function dailyPraiding() {
	var cell;
	cell = ((getPageSetting('dPraidingcell') > 0) ? getPageSetting('dPraidingcell') : 0);
	if (getPageSetting('dPraidingzone').length) {
		if (getPageSetting('dPraidingzone').includes(game.global.world) && ((cell <= 1) || (cell > 1 && (game.global.lastClearedCell + 1) >= cell)) && !dprestraid && !dfailpraid) {
			dprestraidon = true;
			if (getPageSetting('AutoMaps') == 1 && !dprestraid && !dfailpraid) {
				autoTrimpSettings["AutoMaps"].value = 0;
			}
			if (!game.global.preMapsActive && !game.global.mapsActive && !dprestraid) {
				mapsClicked();
				if (!game.global.preMapsActive) {
					mapsClicked();
				}
				debug("Beginning Prestige Raiding...");
			}
			if (game.options.menu.repeatUntil.enabled != 2 && !dprestraid) {
				game.options.menu.repeatUntil.enabled = 2;
			}
			if (game.global.preMapsActive && !game.global.mapsActive && !dprestraid) {
				debug("Map Loop");
				if (pcheckmap5() == true && pcheck5() == true && dpMap5 == undefined && !dmapbought5 && game.global.preMapsActive && !dprestraid) {
					debug("Check complete for 5th map");
					plusPres5();
					if ((updateMapCost(true) <= game.resources.fragments.owned)) {
						buyMap();
						dmapbought5 = true;
						if (dmapbought5) {
							dpMap5 = game.global.mapsOwnedArray[game.global.mapsOwnedArray.length - 1].id;
							debug("5th map bought");
						}
					}
				}
				if (pcheckmap4() == true && pcheck4() == true && dpMap4 == undefined && !dmapbought4 && game.global.preMapsActive && !dprestraid) {
					debug("Check complete for 4th map");
					plusPres4();
					if ((updateMapCost(true) <= game.resources.fragments.owned)) {
						buyMap();
						dmapbought4 = true;
						if (dmapbought4) {
							dpMap4 = game.global.mapsOwnedArray[game.global.mapsOwnedArray.length - 1].id;
							debug("4th map bought");
						}
					}
				}
				if (pcheckmap3() == true && pcheck3() == true && dpMap3 == undefined && !dmapbought3 && game.global.preMapsActive && !dprestraid) {
					debug("Check complete for 3rd map");
					plusPres3();
					if ((updateMapCost(true) <= game.resources.fragments.owned)) {
						buyMap();
						dmapbought3 = true;
						if (dmapbought3) {
							dpMap3 = game.global.mapsOwnedArray[game.global.mapsOwnedArray.length - 1].id;
							debug("3rd map bought");
						}
					}
				}
				if (pcheckmap2() == true && pcheck2() == true && dpMap2 == undefined && !dmapbought2 && game.global.preMapsActive && !dprestraid) {
					debug("Check complete for 2nd map");
					plusPres2();
					if ((updateMapCost(true) <= game.resources.fragments.owned)) {
						buyMap();
						dmapbought2 = true;
						if (dmapbought2) {
							dpMap2 = game.global.mapsOwnedArray[game.global.mapsOwnedArray.length - 1].id;
							debug("2nd map bought");
						}
					}
				}
				if (pcheckmap1() == true && pcheck1() == true && dpMap1 == undefined && !dmapbought1 && game.global.preMapsActive && !dprestraid) {
					debug("Check complete for 1st map");
					plusPres1();
					if ((updateMapCost(true) <= game.resources.fragments.owned)) {
						buyMap();
						dmapbought1 = true;
						if (dmapbought1) {
							dpMap1 = game.global.mapsOwnedArray[game.global.mapsOwnedArray.length - 1].id;
							debug("1st map bought");
						}
					}
				}
				if (!dmapbought1 && !dmapbought2 && !dmapbought3 && !dmapbought4 && !dmapbought5) {
					if (getPageSetting('AutoMaps') == 0 && !dprestraid) {
						autoTrimpSettings["AutoMaps"].value = 1;
						game.options.menu.repeatUntil.enabled = 0;
						dprestraidon = false;
						dfailpraid = true;
						dpraidDone = true;
						dpMap1 = undefined;
						dpMap2 = undefined;
						dpMap3 = undefined;
						dpMap4 = undefined;
						dpMap5 = undefined;
						debug("Failed to Prestige Raid. Looks like you can't afford to or you are too weak or you have limited yourself in a P/I zone. ");
					}
					return;
				}
			}
			if (game.global.preMapsActive && !game.global.mapsActive && dmapbought1 && dpMap1 != undefined && !dprestraid) {
				debug("running map 1");
				selectMap(dpMap1);
				runMap();
				drepMap1 = dpMap1;
				dpMap1 = undefined;
			}
			if (game.global.preMapsActive && !game.global.mapsActive && dmapbought2 && dpMap2 != undefined && !dprestraid) {
				debug("running map 2");
				selectMap(dpMap2);
				runMap();
				drepMap2 = dpMap2;
				dpMap2 = undefined;
			}
			if (game.global.preMapsActive && !game.global.mapsActive && dmapbought3 && dpMap3 != undefined && !dprestraid) {
				debug("running map 3");
				selectMap(dpMap3);
				runMap();
				drepMap3 = dpMap3;
				dpMap3 = undefined;
			}
			if (game.global.preMapsActive && !game.global.mapsActive && dmapbought4 && dpMap4 != undefined && !dprestraid) {
				debug("running map 4");
				selectMap(dpMap4);
				runMap();
				drepMap4 = dpMap4;
				dpMap4 = undefined;
			}
			if (game.global.preMapsActive && !game.global.mapsActive && dmapbought5 && dpMap5 != undefined && !dprestraid) {
				debug("running map 5");
				selectMap(dpMap5);
				runMap();
				drepMap5 = dpMap5;
				dpMap5 = undefined;
			}
			if (!dprestraid && !game.global.repeatMap) {
				repeatClicked();
			}
		}
	}
	if (game.global.preMapsActive && (dmapbought1 || dmapbought2 || dmapbought3 || dmapbought4 || dmapbought5) && pMap1 == undefined && dpMap2 == undefined && dpMap3 == undefined && dpMap4 == undefined && dpMap5 == undefined && !dprestraid && !dfailpraid) {
		dprestraid = true;
		dfailpraid = false;
		dmapbought1 = false;
		dmapbought2 = false;
		dmapbought3 = false;
		dmapbought4 = false;
		dmapbought5 = false;
	}
	if (getPageSetting('AutoMaps') == 0 && game.global.preMapsActive && dprestraid && !dfailpraid && dprestraidon) {
		dpraidDone = true;
		dprestraidon = false;
		if (drepMap1 != undefined) {
			recycleMap(getMapIndex(drepMap1));
			drepMap1 = undefined;
		}
		if (drepMap2 != undefined) {
			recycleMap(getMapIndex(drepMap2));
			drepMap2 = undefined;
		}
		if (drepMap3 != undefined) {
			recycleMap(getMapIndex(drepMap3));
			drepMap3 = undefined;
		}
		if (drepMap4 != undefined) {
			recycleMap(getMapIndex(drepMap4));
			drepMap4 = undefined;
		}
		if (drepMap5 != undefined) {
			recycleMap(getMapIndex(drepMap5));
			drepMap5 = undefined;
		}
		autoTrimpSettings["AutoMaps"].value = 1;
		game.options.menu.repeatUntil.enabled = 0;
		pMap1 = undefined;
		dpMap2 = undefined;
		dpMap3 = undefined;
		dpMap4 = undefined;
		dpMap5 = undefined;
		debug("Prestige raiding successful!");
		debug("Turning AutoMaps back on");
	}
	if (getPageSetting('dPraidingzone').every(isBelowThreshold)) {
		dprestraid = false;
		dfailpraid = false;
		dprestraidon = false;
		dmapbought1 = false;
		dmapbought2 = false;
		dmapbought3 = false;
		dmapbought4 = false;
		dmapbought5 = false;
		pMap1 = undefined;
		dpMap2 = undefined;
		dpMap3 = undefined;
		dpMap4 = undefined;
		dpMap5 = undefined;
		repMap1 = undefined;
		repMap2 = undefined;
		repMap3 = undefined;
		repMap4 = undefined;
		repMap5 = undefined;
		dpraidDone = false;
	}
}

function dailyBWraiding() {
	var cell;
	cell = ((getPageSetting('dbwraidcell') > 0) ? getPageSetting('dbwraidcell') : 1);
	if (!dprestraidon && game.global.world == getPageSetting('dBWraidingz') && ((game.global.lastClearedCell + 1) >= cell) && !dbwraided && !dfailbwraid && getPageSetting('Dailybwraid')) {
		if (getPageSetting('AutoMaps') == 1 && !dbwraided && !dfailbwraid) {
			autoTrimpSettings["AutoMaps"].value = 0;
		}
		if (!game.global.preMapsActive && !game.global.mapsActive && !dbwraided && !dfailbwraid) {
			mapsClicked();
			if (!game.global.preMapsActive) {
				mapsClicked();
			}
		}
		if (game.options.menu.repeatUntil.enabled != 2 && !dbwraided && !dfailbwraid) {
			game.options.menu.repeatUntil.enabled = 2;
		}
		if (game.global.preMapsActive && !dbwraided && !dfailbwraid) {
			selectMap(findLastBionic().id);
			dfailbwraid = false;
			debug("Beginning Daily BW Raiding...");
		} else if (game.global.preMapsActive && !dbwraided && !dfailbwraid) {
			if (getPageSetting('AutoMaps') == 0 && game.global.world == getPageSetting('dBWraidingz') && !dbwraided) {
				autoTrimpSettings["AutoMaps"].value = 1;
				dfailbwraid = true;
				debug("Failed to Daily BW raid. Looks like you don't have a BW to raid...");
			}
		}
		if (findLastBionic().level <= getPageSetting('dBWraidingmax') && !dbwraided && !dfailbwraid && game.global.preMapsActive) {
			runMap();
			dbwraidon = true;
		}
		if (!game.global.repeatMap && !dbwraided && !dfailbwraid && game.global.mapsActive) {

		}
		if (findLastBionic().level > getPageSetting('dBWraidingmax') && !dbwraided && !dfailbwraid) {
			dbwraided = true;
			dfailbwraid = false;
			dbwraidon = false;
			debug("...Successfully Daily BW raided!");
		}
		if (getPageSetting('AutoMaps') == 0 && game.global.preMapsActive && game.global.world == getPageSetting('dBWraidingz') && dbwraided && !dfailbwraid) {
			autoTrimpSettings["AutoMaps"].value = 1;
			debug("Turning AutoMaps back on");
		}
	}
	if (getPageSetting('AutoMaps') == 0 && game.global.preMapsActive && dbwraided && !dfailbwraid) {
		autoTrimpSettings["AutoMaps"].value = 1;
		debug("Turning AutoMaps back on");
	}
	if (dbwraided && !dfailbwraid && game.global.world !== getPageSetting('dBWraidingz')) {
		dbwraided = false;
		dfailbwraid = false;
		dbwraidon = false;
	}
}

function trimpcide() {
	if (game.portal.Anticipation.level > 0) {
		var antistacklimit = (game.talents.patience.purchased) ? 45 : 30;
		if (game.global.fighting && ((game.jobs.Amalgamator.owned > 0) ? Math.floor((new Date().getTime() - game.global.lastSoldierSentAt) / 1000) : Math.floor(game.global.lastBreedTime / 1000)) >= antistacklimit && (game.global.antiStacks < antistacklimit || antistacklimit == 0 && game.global.antiStacks >= 1) && !game.global.spireActive)
			forceAbandonTrimps();
		if (game.global.fighting && ((game.jobs.Amalgamator.owned > 0) ? Math.floor((new Date().getTime() - game.global.lastSoldierSentAt) / 1000) : Math.floor(game.global.lastBreedTime / 1000)) >= antistacklimit && game.global.antiStacks < antistacklimit && game.global.mapsActive) {
			if (getCurrentMapObject().location == "Void") {
				abandonVoidMap();
			}
		}
	}
}

function avoidempower() {
	if (game.global.universe == 1 && armydeath()) {
		if (typeof game.global.dailyChallenge.bogged === 'undefined' && typeof game.global.dailyChallenge.plague === 'undefined') {
			mapsClicked(true);
			return;
		}
	}
}

var spirebreeding = false;
function ATspirebreed() {
	if (!spirebreeding && getPageSetting('SpireBreedTimer') > 0 && getPageSetting('IgnoreSpiresUntil') <= game.global.world && game.global.spireActive)
		var prespiretimer = game.global.GeneticistassistSetting;
	if (getPageSetting('SpireBreedTimer') > 0 && getPageSetting('IgnoreSpiresUntil') <= game.global.world && game.global.spireActive && game.global.GeneticistassistSetting != getPageSetting('SpireBreedTimer')) {
		spirebreeding = true;
		if (game.global.GeneticistassistSetting != getPageSetting('SpireBreedTimer'))
			game.global.GeneticistassistSetting = getPageSetting('SpireBreedTimer');
	}
	if (getPageSetting('SpireBreedTimer') > 0 && getPageSetting('IgnoreSpiresUntil') <= game.global.world && !game.global.spireActive && game.global.GeneticistassistSetting == getPageSetting('SpireBreedTimer')) {
		spirebreeding = false;
		if (game.global.GeneticistassistSetting == getPageSetting('SpireBreedTimer')) {
			game.global.GeneticistassistSetting = prespiretimer;
			toggleGeneticistassist();
			toggleGeneticistassist();
			toggleGeneticistassist();
			toggleGeneticistassist();
		}
	}
}

function fightalways() {
	if (game.global.gridArray.length === 0 || game.global.preMapsActive || !game.upgrades.Battle.done || game.global.fighting || (game.global.spireActive && game.global.world >= getPageSetting('IgnoreSpiresUntil')))
		return;
	if (!game.global.fighting)
		fightManual();
}

function armormagic() {
	var armormagicworld = Math.floor((game.global.highestLevelCleared + 1) * 0.8);
	if (((getPageSetting('carmormagic') == 1 || getPageSetting('darmormagic') == 1) && game.global.world >= armormagicworld && (game.global.soldierHealth <= game.global.soldierHealthMax * 0.4)) || ((getPageSetting('carmormagic') == 2 || getPageSetting('darmormagic') == 2) && calcHDratio() >= MODULES["maps"].enoughDamageCutoff && (game.global.soldierHealth <= game.global.soldierHealthMax * 0.4)) || ((getPageSetting('carmormagic') == 3 || getPageSetting('darmormagic') == 3) && (game.global.soldierHealth <= game.global.soldierHealthMax * 0.4)))
		buyArms();
}

trapIndexs = ["", "Fire", "Frost", "Poison", "Lightning", "Strength", "Condenser", "Knowledge"];

function tdStringCode2() {
	var thestring = document.getElementById('importBox').value.replace(/\s/g, '');
	var s = new String(thestring);
	var index = s.indexOf("+", 0);
	s = s.slice(0, index);
	var length = s.length;

	var saveLayout = [];
	for (var i = 0; i < length; i++) {
		saveLayout.push(trapIndexs[s.charAt(i)]);
	}
	playerSpire['savedLayout' + -1] = saveLayout;

	if ((playerSpire.runestones + playerSpire.getCurrentLayoutPrice()) < playerSpire.getSavedLayoutPrice(-1)) return false;
	playerSpire.resetTraps();
	for (var x = 0; x < saveLayout.length; x++) {
		if (!saveLayout[x]) continue;
		playerSpire.buildTrap(x, saveLayout[x]);
	}
}

var oldPlayerSpireDrawInfo = playerSpire.drawInfo;
playerSpire.drawInfo = function (arguments) {
	var ret = oldPlayerSpireDrawInfo.apply(this, arguments);
	var elem = document.getElementById('spireTrapsWindow');
	if (!elem) return arguments;
	var importBtn = "<div onclick='ImportExportTooltip(\"spireImport\")' class='spireControlBox'>Import</div>";
	elem.innerHTML = importBtn + elem.innerHTML;
	return arguments;
}

//Radon
function RbuyWeps() { if (!((getPageSetting('RBuyWeaponsNew') == 1) || (getPageSetting('RBuyWeaponsNew') == 3))) return; preBuy(), game.global.buyAmt = getPageSetting('Rgearamounttobuy'), game.equipment.Dagger.level < getPageSetting('RCapEquip2') && canAffordBuilding('Dagger', null, null, !0) && buyEquipment('Dagger', !0, !0), game.equipment.Mace.level < getPageSetting('RCapEquip2') && canAffordBuilding('Mace', null, null, !0) && buyEquipment('Mace', !0, !0), game.equipment.Polearm.level < getPageSetting('RCapEquip2') && canAffordBuilding('Polearm', null, null, !0) && buyEquipment('Polearm', !0, !0), game.equipment.Battleaxe.level < getPageSetting('RCapEquip2') && canAffordBuilding('Battleaxe', null, null, !0) && buyEquipment('Battleaxe', !0, !0), game.equipment.Greatsword.level < getPageSetting('RCapEquip2') && canAffordBuilding('Greatsword', null, null, !0) && buyEquipment('Greatsword', !0, !0), !game.equipment.Arbalest.locked && game.equipment.Arbalest.level < getPageSetting('RCapEquip2') && canAffordBuilding('Arbalest', null, null, !0) && buyEquipment('Arbalest', !0, !0), postBuy() }
function RbuyArms() { if (!((getPageSetting('RBuyArmorNew') == 1) || (getPageSetting('RBuyArmorNew') == 3))) return; preBuy(), game.global.buyAmt = 10, game.equipment.Shield.level < getPageSetting('RCapEquiparm') && canAffordBuilding('Shield', null, null, !0) && buyEquipment('Shield', !0, !0), game.equipment.Boots.level < getPageSetting('RCapEquiparm') && canAffordBuilding('Boots', null, null, !0) && buyEquipment('Boots', !0, !0), game.equipment.Helmet.level < getPageSetting('RCapEquiparm') && canAffordBuilding('Helmet', null, null, !0) && buyEquipment('Helmet', !0, !0), game.equipment.Pants.level < getPageSetting('RCapEquiparm') && canAffordBuilding('Pants', null, null, !0) && buyEquipment('Pants', !0, !0), game.equipment.Shoulderguards.level < getPageSetting('RCapEquiparm') && canAffordBuilding('Shoulderguards', null, null, !0) && buyEquipment('Shoulderguards', !0, !0), game.equipment.Breastplate.level < getPageSetting('RCapEquiparm') && canAffordBuilding('Breastplate', null, null, !0) && buyEquipment('Breastplate', !0, !0), !game.equipment.Gambeson.locked && game.equipment.Gambeson.level < getPageSetting('RCapEquiparm') && canAffordBuilding('Gambeson', null, null, !0) && buyEquipment('Gambeson', !0, !0), postBuy() }
function Rhelptrimpsnotdie() { if (!game.global.preMapsActive && !game.global.fighting) RbuyArms(); }

var Rprestraid = !1, Rdprestraid = !1, Rfailpraid = !1, Rdfailpraid = !1, Rprestraidon = !1, Rdprestraidon = !1, Rmapbought = !1, Rdmapbought = !1, Rpresteps = null, RminMaxMapCost, RfMap, RpMap, RshouldFarmFrags = !1, RpraidDone = !1;

function Rfightalways() {
	if (game.global.gridArray.length === 0 || game.global.preMapsActive || !game.upgrades.Battle.done || game.global.fighting)
		return;
	if (!game.global.fighting)
		fightManual();
}

function Rarmormagic() {
	var armormagicworld = Math.floor((game.global.highestLevelCleared + 1) * 0.8);
	if (((getPageSetting('Rcarmormagic') == 1 || getPageSetting('Rdarmormagic') == 1) && game.global.world >= armormagicworld && (game.global.soldierHealth <= game.global.soldierHealthMax * 0.4)) || ((getPageSetting('Rcarmormagic') == 2 || getPageSetting('Rdarmormagic') == 2) && RcalcHDratio() >= MODULES["maps"].RenoughDamageCutoff && (game.global.soldierHealth <= game.global.soldierHealthMax * 0.4)) || ((getPageSetting('Rcarmormagic') == 3 || getPageSetting('Rdarmormagic') == 3) && (game.global.soldierHealth <= game.global.soldierHealthMax * 0.4)))
		RbuyArms();
}

function questcheck() {
	if (game.global.challengeActive !== 'Quest')
		return 0;
	if (game.global.world < game.challenges.Quest.getQuestStartZone()) {
		return 0;
	}
	var questnotcomplete = game.challenges.Quest.getQuestProgress() != "Quest Complete!";
	if (game.challenges.Quest.getQuestProgress() == "Failed!") return 0;
	//Resource multipliers
	else if (game.challenges.Quest.getQuestDescription().includes("food") && questnotcomplete) return 1;
	else if (game.challenges.Quest.getQuestDescription().includes("wood") && questnotcomplete) return 2;
	else if (game.challenges.Quest.getQuestDescription().includes("metal") && questnotcomplete) return 3;
	else if (game.challenges.Quest.getQuestDescription().includes("gems") && questnotcomplete) return 4;
	else if (game.challenges.Quest.getQuestDescription().includes("science") && questnotcomplete) return 5;
	//Everything else
	else if (game.challenges.Quest.getQuestDescription() == "Complete 5 Maps at Zone level" && questnotcomplete) return 6;
	else if (game.challenges.Quest.getQuestDescription() == "One-shot 5 world enemies" && questnotcomplete) return 7;
	else if (game.challenges.Quest.getQuestDescription() == "Don't let your shield break before Cell 100" && questnotcomplete) return 8;
	else if (game.challenges.Quest.getQuestDescription() == "Don't run a map before Cell 100") return 9;
	else if (game.challenges.Quest.getQuestDescription() == "Buy a Smithy" && questnotcomplete) return 10;
	else return 0;
}

function Rgetequipcost(equip, resource, amt) {
	var artBoost = Math.pow(amt - game.portal.Artisanistry.modifier, game.portal.Artisanistry.radLevel);
	artBoost *= autoBattle.oneTimers.Artisan.owned ? autoBattle.oneTimers.Artisan.getMult() : 1;
	if (game.global.challengeActive == "Pandemonium") artBoost *= game.challenges.Pandemonium.getEnemyMult();
	var cost = Math.ceil(getBuildingItemPrice(game.equipment[equip], resource, true, amt) * artBoost);
	return cost;
}

function archstring() {
	if (!getPageSetting('Rarchon')) return;
	if (getPageSetting('Rarchstring1') != "undefined" && getPageSetting('Rarchstring2') != "undefined" && getPageSetting('Rarchstring3') != "undefined") {
		var string1 = getPageSetting('Rarchstring1'), string2 = getPageSetting('Rarchstring2'), string3 = getPageSetting('Rarchstring3');
		var string1z = string1.split(',')[0], string2z = string2.split(',')[0];
		var string1split = string1.split(',').slice(1).toString(), string2split = string2.split(',').slice(1).toString();
		if (game.global.world <= string1z && game.global.archString != string1split) game.global.archString = string1split;
		if (game.global.world > string1z && game.global.world <= string2z && game.global.archString != string2split) game.global.archString = string2split;
		if (game.global.world > string2z && game.global.archString != string3) game.global.archString = string3;
	}
}

//RAMP - Prestige Raiding
function RAMPplusMapToRun(number, raidzones) {
	var map;
	if (rShouldPrestigeRaid) {

		map = (raidzones - game.global.world - number);

		if ((raidzones - number).toString().slice(-1) == 0) map = map - 5
		if ((raidzones - number).toString().slice(-1) == 9) map = map - 5
		if ((raidzones - number).toString().slice(-1) == 8) map = map - 5
		if ((raidzones - number).toString().slice(-1) == 7) map = map - 5
		if ((raidzones - number).toString().slice(-1) == 6) map = map - 5
		return map;
	}
}

function RAMPshouldrunmap(number, raidzones) {
	var go = false;
	if (rShouldPrestigeRaid) {
		var actualraidzone = (raidzones - number);

		if (Rgetequips(actualraidzone, false) > 0) go = true;
	}
	return go;
}

function RAMPplusPres(number, raidzones) {
	document.getElementById("biomeAdvMapsSelect").value = game.global.farmlandsUnlocked ? "Farmlands" : "Plentiful";
	document.getElementById("mapLevelInput").value = game.global.world;
	document.getElementById("advExtraLevelSelect").value = RAMPplusMapToRun(number, raidzones);
	document.getElementById("advSpecialSelect").value = "p";
	document.getElementById("lootAdvMapsRange").value = 9;
	document.getElementById("difficultyAdvMapsRange").value = 9;
	document.getElementById("sizeAdvMapsRange").value = 9;
	document.getElementById("advPerfectCheckbox").dataset.checked = true;
	updateMapCost();
	if (updateMapCost(true) <= game.resources.fragments.owned) return updateMapCost(true);
	document.getElementById("advPerfectCheckbox").dataset.checked = false;
	if (updateMapCost(true) <= game.resources.fragments.owned) return updateMapCost(true);
	document.getElementById("biomeAdvMapsSelect").value = "Random";
	if (updateMapCost(true) <= game.resources.fragments.owned) return updateMapCost(true);

	while (lootAdvMapsRange.value > 0 && updateMapCost(true) > game.resources.fragments.owned) {
		lootAdvMapsRange.value -= 1;
	}
	while (difficultyAdvMapsRange.value > 0 && sizeAdvMapsRange.value > 0 && updateMapCost(true) > game.resources.fragments.owned) {
		difficultyAdvMapsRange.value -= 1;
		if (updateMapCost(true) <= game.resources.fragments.owned) break;
		sizeAdvMapsRange.value -= 1;
	}
	if (updateMapCost(true) <= game.resources.fragments.owned) return updateMapCost(true);
	if (updateMapCost(true) > game.resources.fragments.owned) {
		document.getElementById("advSpecialSelect").value = "0";
		updateMapCost();
	}
	if (document.getElementById("advSpecialSelect").value == "0") return updateMapCost(true);
}

function RAMPplusPresfragmax(number, raidzones) {
	document.getElementById("biomeAdvMapsSelect").value = game.global.farmlandsUnlocked ? "Farmlands" : game.global.decayDone ? "Plentiful" : "Mountains";
	document.getElementById("mapLevelInput").value = game.global.world;
	document.getElementById("advExtraLevelSelect").value = RAMPplusMapToRun(number, raidzones);
	document.getElementById("advSpecialSelect").value = "p";
	document.getElementById("lootAdvMapsRange").value = 9;
	document.getElementById("difficultyAdvMapsRange").value = 9;
	document.getElementById("sizeAdvMapsRange").value = 9;
	document.getElementById("advPerfectCheckbox").dataset.checked = true;
	updateMapCost();
	return updateMapCost(true);
}

function RAMPplusPresfragmin(number, raidzones) {
	document.getElementById("biomeAdvMapsSelect").value = game.global.farmlandsUnlocked ? "Farmlands" : game.global.decayDone ? "Plentiful" : "Mountains";
	document.getElementById("mapLevelInput").value = game.global.world;
	document.getElementById("advExtraLevelSelect").value = RAMPplusMapToRun(number, raidzones);
	document.getElementById("advSpecialSelect").value = "p";
	document.getElementById("lootAdvMapsRange").value = 0;
	document.getElementById("difficultyAdvMapsRange").value = 9;
	document.getElementById("sizeAdvMapsRange").value = 9;
	document.getElementById("advPerfectCheckbox").dataset.checked = false;
	updateMapCost();
	if (updateMapCost(true) <= game.resources.fragments.owned) {
		return updateMapCost(true);
	}
	if (updateMapCost(true) > game.resources.fragments.owned) {
		document.getElementById("biomeAdvMapsSelect").value = "Random";
		updateMapCost();
	}
	if (updateMapCost(true) <= game.resources.fragments.owned) return updateMapCost(true);

	while (difficultyAdvMapsRange.value > 0 && sizeAdvMapsRange.value > 0 && updateMapCost(true) > game.resources.fragments.owned) {
		difficultyAdvMapsRange.value -= 1;
		if (updateMapCost(true) <= game.resources.fragments.owned) break;
		sizeAdvMapsRange.value -= 1;
	}
	if (updateMapCost(true) <= game.resources.fragments.owned) return updateMapCost(true);

	document.getElementById("advSpecialSelect").value = "fa";
	updateMapCost();

	if (updateMapCost(true) <= game.resources.fragments.owned) return updateMapCost(true);

	document.getElementById("advSpecialSelect").value = "0";
	updateMapCost();
	return updateMapCost(true);
}

function RAMPfrag(raidzones, fragtype) {
	var cost = 0;
	if (rShouldPrestigeRaid) {

		if (Rgetequips(raidzones, false)) {
			if (fragtype == 1) cost += RAMPplusPresfragmin(0);
			else if (fragtype == 2) cost += RAMPplusPresfragmax(0);
		}
		if (Rgetequips((raidzones - 1), false)) {
			if (fragtype == 1) cost += RAMPplusPresfragmin(1);
			else if (fragtype == 2) cost += RAMPplusPresfragmax(1);
		}
		if (Rgetequips((raidzones - 2), false)) {
			if (fragtype == 1) cost += RAMPplusPresfragmin(2);
			else if (fragtype == 2) cost += RAMPplusPresfragmax(2);
		}
		if (Rgetequips((raidzones - 3), false)) {
			if (fragtype == 1) cost += RAMPplusPresfragmin(3);
			else if (fragtype == 2) cost += RAMPplusPresfragmax(3);
		}
		if (Rgetequips((raidzones - 4), false)) {
			if (fragtype == 1) cost += RAMPplusPresfragmin(4);
			else if (fragtype == 2) cost += RAMPplusPresfragmax(4);
		}

		if (game.resources.fragments.owned >= cost) return true;
		else return false;
	}
}

function fragmap() {
	document.getElementById("biomeAdvMapsSelect").value = game.global.farmlandsUnlocked ? "Farmlands" : game.global.decayDone ? "Plentiful" : "Mountains";
	document.getElementById("advExtraLevelSelect").value = 0;
	document.getElementById("advSpecialSelect").value = "fa";
	document.getElementById("lootAdvMapsRange").value = 9;
	document.getElementById("difficultyAdvMapsRange").value = 9;
	document.getElementById("sizeAdvMapsRange").value = 9;
	document.getElementById("advPerfectCheckbox").dataset.checked = true;
	document.getElementById("mapLevelInput").value = game.global.world;
	updateMapCost();

	if (updateMapCost(true) > game.resources.fragments.owned) {
		document.getElementById("biomeAdvMapsSelect").value = "Random";
		updateMapCost();
	}
	if (updateMapCost(true) > game.resources.fragments.owned) {
		document.getElementById("advPerfectCheckbox").dataset.checked = false;
		updateMapCost();
	}

	while (difficultyAdvMapsRange.value > 0 && sizeAdvMapsRange.value > 0 && updateMapCost(true) > game.resources.fragments.owned) {
		difficultyAdvMapsRange.value -= 1;
		if (updateMapCost(true) <= game.resources.fragments.owned) break;
		sizeAdvMapsRange.value -= 1;
	}
	if (updateMapCost(true) <= game.resources.fragments.owned) return updateMapCost(true);

	if (updateMapCost(true) > game.resources.fragments.owned) {
		document.getElementById("advSpecialSelect").value = 0;
		updateMapCost();
	}
}

function fragmin(number) {
	document.getElementById("biomeAdvMapsSelect").value = game.global.farmlandsUnlocked ? "Farmlands" : game.global.decayDone ? "Plentiful" : "Mountains";
	document.getElementById("advExtraLevelSelect").value = number;
	document.getElementById("advSpecialSelect").value = "fa";
	document.getElementById("lootAdvMapsRange").value = 9;
	document.getElementById("difficultyAdvMapsRange").value = 9;
	document.getElementById("sizeAdvMapsRange").value = 9;
	document.getElementById("advPerfectCheckbox").dataset.checked = true;
	document.getElementById("mapLevelInput").value = game.global.world;
	updateMapCost();

	if (updateMapCost(true) <= game.resources.fragments.owned) {
		return updateMapCost(true);
	}
	if (updateMapCost(true) > game.resources.fragments.owned) {
		document.getElementById("biomeAdvMapsSelect").value = "Random";
		updateMapCost();
		if (updateMapCost(true) <= game.resources.fragments.owned) {
			return updateMapCost(true);
		}
	}
	if (updateMapCost(true) > game.resources.fragments.owned) {
		document.getElementById("advPerfectCheckbox").dataset.checked = false;
		updateMapCost();
		if (updateMapCost(true) <= game.resources.fragments.owned) {
			return updateMapCost(true);
		}
	}
	if (updateMapCost(true) > game.resources.fragments.owned) {
		document.getElementById("lootAdvMapsRange").value = 8;
		updateMapCost();
		if (updateMapCost(true) <= game.resources.fragments.owned) {
			return updateMapCost(true);
		}
	}

	while (difficultyAdvMapsRange.value > 0 && sizeAdvMapsRange.value > 0 && updateMapCost(true) > game.resources.fragments.owned) {
		difficultyAdvMapsRange.value -= 1;
		if (updateMapCost(true) <= game.resources.fragments.owned) break;
		sizeAdvMapsRange.value -= 1;
	}
	if (updateMapCost(true) <= game.resources.fragments.owned) return updateMapCost(true);
	if (document.getElementById("sizeAdvMapsRange").value == 0) {
		return updateMapCost(true);
	}
}

function fragmapcost() {
	var cost = 0;

	if (rShouldInsanityFarm) {
		var insanityfarmzone = getPageSetting('Rinsanityfarmzone');
		var insanityfarmlevel = getPageSetting('Rinsanityfarmlevel');
		var insanityfarmlevelindex = insanityfarmzone.indexOf(game.global.world);
		var insanitylevelzones = insanityfarmlevel[insanityfarmlevelindex];

		if (getPageSetting('Rinsanityfarmfrag')) cost = PerfectMapCost(insanitylevelzones, 'fa');
	}
	else if (rShouldWorshipperFarm) {
		var shipfarmzone = getPageSetting('Rshipfarmzone');
		var shipfarmlevel = getPageSetting('Rshipfarmlevel');
		var shipfarmlevelindex = shipfarmzone.indexOf(game.global.world);
		var shiplevelzones = shipfarmlevel[shipfarmlevelindex];

		if (getPageSetting('Rshipfarmfrag'))
			cost = fragmin(shiplevelzones);
	}
	else
		cost = 0;

	if (game.resources.fragments.owned >= cost)
		return true;
	else
		return false;
}

function rFragmentFarm(type, level, special, perfect) {

	var perfect = !perfect ? null : perfect;

	//Worshipper farming
	var rFragCheck = true;
	if (getPageSetting('R' + type + 'farmfrag')) {
		if (fragmapcost() == true) {
			rFragCheck = true;
			rFragmentFarming = false;
		} else if (fragmapcost() == false) {
			rFragmentFarming = true;
			rFragCheck = false;
			if (!rFragCheck && rInitialFragmentMapID == undefined && !rFragMapBought && game.global.preMapsActive) {
				debug("Check complete for fragment farming map");
				fragmap();
				if ((updateMapCost(true) <= game.resources.fragments.owned)) {
					buyMap();
					rFragMapBought = true;
					if (rFragMapBought) {
						rInitialFragmentMapID = game.global.mapsOwnedArray[game.global.mapsOwnedArray.length - 1].id;
						debug("Fragment farming map purchased");
					}
				}
			}
			if (!rFragCheck && game.global.preMapsActive && !game.global.mapsActive && rFragMapBought && rInitialFragmentMapID != undefined) {
				debug("Running fragment farming map");
				selectedMap = rInitialFragmentMapID;
				selectMap(rInitialFragmentMapID);
				runMap();
				RlastMapWeWereIn = getCurrentMapObject();
				rFragmentMapID = rInitialFragmentMapID;
				rInitialFragmentMapID = undefined;
			}
			if (!rFragCheck && game.resources.fragments.owned >= PerfectMapCost(level, special) && game.global.mapsActive && rFragMapBought && rFragmentMapID != undefined) {
				if (fragmapcost() == false) {
					if (!game.global.repeatMap) {
						repeatClicked();
					}
				} else if (fragmapcost() == true) {
					if (game.global.repeatMap) {
						repeatClicked();
						//mapsClicked();
					}
					if (game.global.preMapsActive && rFragMapBought && rFragmentMapID != undefined) {
						rFragMapBought = false;
					}
					rFragCheck = true;
					rFragmentFarming = false;
				}
			}
		} else {
			rFragCheck = true;
			rFragmentFarming = false;
		}
	}

	if (rFragCheck) {
		if (type == 'insanity')
			PerfectMapCost(level, special);
		if (type == 'ship')
			RShouldFarmMapCost(level, special);
	}
	updateMapCost();
}

function PerfectMapLevel(special) {

	var mult = 1;
	mult *= game.global.challengeActive == 'Unbalance' ? 1.5 : 1;
	mult *= game.global.challengeActive == 'Wither' && game.challenges.Wither.enemyStacks > 0 ? game.challenges.Wither.getEnemyAttackMult() : 1;
	mult *= game.global.challengeActive == 'Archaeology' ? game.challenges.Archaeology.getStatMult('enemyAttack') : 1;
	mult *= game.global.challengeActive == 'Mayhem' ? game.challenges.Mayhem.getEnemyMult() : 1;
	mult *= game.global.challengeActive == 'Mayhem' ? game.challenges.Mayhem.getBossMult() : 1;
	mult *= game.global.challengeActive == 'Storm' ? game.challenges.Storm.getAttackMult() : 1;
	mult *= game.global.challengeActive == 'Berserk' ? 1.5 : 1;
	mult *= game.global.challengeActive == 'Exterminate' ? game.challenges.Exterminate.getSwarmMult() : 1;
	mult *= game.global.challengeActive == 'Nurture' ? 2 : 1;
	mult *= game.global.challengeActive == 'Nurture' && game.buildings.Laboratory.owned > 0 ? game.buildings.Laboratory.getEnemyMult() : 1;
	mult *= game.global.challengeActive == 'Pandemonium' ? game.challenges.Pandemonium.getPandMult() : 1;
	mult *= game.global.challengeActive == 'Alchemy' ? ((alchObj.getEnemyStats(false, false)) + 1) : 1;

	multpanda = game.global.challengeActive == 'Pandemonium' ? game.challenges.Pandemonium.getBossMult() : 1;

	gammaburstmult = getPageSetting('RPandemoniumHits') < 5 && (RcalcOurHealth() / (RcalcBadGuyDmg(null, RgetEnemyAvgAttack(game.global.world, 20, 'Snimp')) * 1.125)) >= 5 ? (1 + (getHeirloomBonus("Shield", "gammaBurst")) / 500) : 1;
	hitsmap = getPageSetting('RPandemoniumHits') > 0 ? getPageSetting('RPandemoniumHits') : 10;
	hitssurv = getPageSetting('RPandemoniumHits') < 5 ? getPageSetting('RPandemoniumHits') : 5;
	go = false;
	for (var i = 10; 0 < i; i--) {
		if (!go) {
			pluslevels = i;
			var bm2 = pluslevels > 0 ? 1.5 : 1;
			if ((game.resources.fragments.owned >= PerfectMapCost(pluslevels, special)) && ((RcalcEnemyBaseHealth("map", game.global.world + pluslevels, 20, 'Turtlimp') * mult * 0.75) <= ((RcalcOurDmg("avg", false, true) / gammaburstmult) * bm2 * hitsmap))
				&& ((((((RcalcBadGuyDmg(null, RgetEnemyAvgAttack((game.global.world + pluslevels), 20, 'Snimp')) * 1.125) / multpanda) * mult) * (hitssurv)) <= (RcalcOurHealth() * 2)))) {
				go = true;
				return i;
			}
		}
		if (!go && i == 0) {
			pluslevels = -1;
			if (game.global.challengeActive == 'Pandemonium') pluslevels = 1;
			go = true;
			return i;
		}
	}

}

function PerfectMapCost(pluslevel, special, biome) {
	maplevel = pluslevel < 0 ? game.global.world + pluslevel : game.global.world;
	if (!pluslevel || pluslevel < 0) pluslevel = 0;
	if (!special) special = '0';
	if (!biome) biome = game.global.farmlandsUnlocked && game.global.universe == 2 ? "Farmlands" : game.global.decayDone ? "Plentiful" : "Random";
	document.getElementById("biomeAdvMapsSelect").value = biome;
	document.getElementById("advExtraLevelSelect").value = pluslevel;
	document.getElementById("advSpecialSelect").value = special;
	document.getElementById("lootAdvMapsRange").value = 9;
	document.getElementById("difficultyAdvMapsRange").value = 9;
	document.getElementById("sizeAdvMapsRange").value = 9;
	document.getElementById("advPerfectCheckbox").dataset.checked = true;
	document.getElementById("mapLevelInput").value = maplevel;
	updateMapCost();

	return updateMapCost(true);
}

function RShouldFarmMapCost(pluslevel, special, farmzone, biome) {
	//Pre-init
	maplevel = pluslevel < 0 ? game.global.world + pluslevel : game.global.world;
	if (!pluslevel || pluslevel < 0) pluslevel = 0;
	if (!special) special = game.global.highestRadonLevelCleared > 83 ? "lmc" : "smc";
	if (!farmzone) farmzone = [game.global.world];
	if (!biome) biome = game.global.farmlandsUnlocked && game.global.universe == 2 ? "Farmlands" : game.global.decayDone ? "Plentiful" : "Mountains";
	go = false;

	//Working out appropriate map settings
	if (farmzone.includes(game.global.world)) {
		document.getElementById("mapLevelInput").value = maplevel;
		document.getElementById("advExtraLevelSelect").value = pluslevel;
		document.getElementById("biomeAdvMapsSelect").value = biome;
		document.getElementById("advSpecialSelect").value = special;
	}
	updateMapCost();
	return updateMapCost(true);
}

function RShouldFarmMapCreation(pluslevel, special, biome, difficulty, loot, size) {
	//Pre-Init
	if (!pluslevel) pluslevel = 0;
	if (!special) special = game.global.highestRadonLevelCleared > 83 ? "lmc" : "smc";
	if (!biome) biome = game.global.farmlandsUnlocked && game.global.universe == 2 ? "Farmlands" : game.global.decayDone ? "Plentiful" : "Mountains";
	if (!difficulty) difficulty = 0.75;
	if (!loot) loot = game.global.farmlandsUnlocked && game.singleRunBonuses.goldMaps.owned ? 3.6 : game.global.farmlandsUnlocked ? 2.6 : game.singleRunBonuses.goldMaps.owned ? 2.85 : 1.85;
	if (!size) size = 20;
	var create = false;
	go = false;

	for (var mapping in game.global.mapsOwnedArray) {
		if (!game.global.mapsOwnedArray[mapping].noRecycle && (
			(game.global.world + pluslevel) == game.global.mapsOwnedArray[mapping].level) &&
			(game.global.mapsOwnedArray[mapping].bonus == special || game.global.mapsOwnedArray[mapping].bonus === undefined && special === '0') &&
			game.global.mapsOwnedArray[mapping].location == biome/*  &&
			game.global.mapsOwnedArray[mapping].difficulty == difficulty &&
			game.global.mapsOwnedArray[mapping].loot == loot &&
			game.global.mapsOwnedArray[mapping].size == size */) {

			return (game.global.mapsOwnedArray[mapping].id);
			break;
		} else {
			create = true;
		}
	}
	if (create) {
		return ("create");
	}
}

function rRunMap() {
	if (game.options.menu.pauseGame.enabled) return;
	if (game.global.lookingAtMap === "") return;
	if (game.achievements.mapless.earnable) {
		game.achievements.mapless.earnable = false;
		game.achievements.mapless.lastZone = game.global.world;
	}
	if (game.global.challengeActive == "Quest" && game.challenges.Quest.questId == 5 && !game.challenges.Quest.questComplete) {
		game.challenges.Quest.questProgress++;
		if (game.challenges.Quest.questProgress == 1) game.challenges.Quest.failQuest();
	}
	var mapId = game.global.lookingAtMap;
	game.global.preMapsActive = false;
	game.global.mapsActive = true;
	game.global.currentMapId = mapId;
	mapsSwitch(true);
	var mapObj = getCurrentMapObject();
	if (mapObj.bonus) {
		game.global.mapExtraBonus = mapObj.bonus;
	}
	if (game.global.lastClearedMapCell == -1) {
		buildMapGrid(mapId);
		drawGrid(true);

		if (mapObj.location == "Void") {
			game.global.voidDeaths = 0;
			game.global.voidBuff = mapObj.voidBuff;
			setVoidBuffTooltip();
		}
	}
	if (game.global.challengeActive == "Insanity") game.challenges.Insanity.drawStacks();
	if (game.global.challengeActive == "Pandemonium") game.challenges.Pandemonium.drawStacks();
}

var fastimps =
	[
		"Snimp",
		"Kittimp",
		"Gorillimp",
		"Squimp",
		"Shrimp",
		"Chickimp",
		"Frimp",
		"Slagimp",
		"Lavimp",
		"Kangarimp",
		"Entimp",
		"Fusimp",
		"Carbimp",
		"Shadimp",
		"Voidsnimp",
		"Prismimp",
		"Sweltimp",
		"Indianimp",
		"Improbability",
		"Neutrimp",
		"Cthulimp",
		"Omnipotrimp",
		"Mutimp",
		"Hulking_Mutimp",
		"Liquimp",
		"Poseidimp",
		"Darknimp",
		"Horrimp",
		"Arachnimp",
		"Beetlimp",
		"Mantimp",
		"Butterflimp",
		"Frosnimp"
	];

function remainingHealth() {
	var soldierHealth = game.global.soldierHealth
	if (game.global.universe == 2) {
		var maxLayers = Fluffy.isRewardActive('shieldlayer');
		var layers = maxLayers - game.global.shieldLayersUsed;
		var shieldHealth = 0;
		for (var i = 0; i <= maxLayers; i++) {
			if (layers != maxLayers && i > layers)
				continue;
			if (i == maxLayers - layers) {
				shieldHealth += game.global.soldierEnergyShieldMax;
			}
			else
				shieldHealth += game.global.soldierEnergyShield;
		}
		shieldHealth = shieldHealth < 0 ? 0 : shieldHealth;
	}
	var remainingHealth = shieldHealth + soldierHealth;
	if (game.global.challengeActive == 'Quest' && questcheck() == 8)
		remainingHealth = shieldHealth;
	if (shieldHealth + soldierHealth == 0) {
		remainingHealth = game.global.soldierHealthMax + (game.global.soldierEnergyShieldMax * (maxLayers + 1))
		if (game.global.challengeActive == 'Quest' && questcheck() == 8)
			remainingHealth = game.global.soldierEnergyShieldMax * (maxLayers + 1);
	}

	return (remainingHealth)
}

function rManageEquality() {
	if (!game.global.preMapsActive && game.global.gridArray.length > 0) {

		//Looking to see if the enemy that's currently being fought is fast.
		var fastEnemy = game.global.preMapsActive ? fastimps.includes(game.global.gridArray[game.global.lastClearedCell + 1].name) : fastimps.includes(getCurrentEnemy().name);
		//Checking if the map that's active is a Deadly voice map which always has first attack.
		var voidDoubleAttack = game.global.mapsActive && getCurrentMapObject().location == "Void" && getCurrentMapObject().voidBuff == 'doubleAttack';
		//Checking if the Frenzy buff is active.
		var noFrenzy = game.portal.Frenzy.frenzyStarted == "-1" && !autoBattle.oneTimers.Mass_Hysteria.owned && game.portal.Frenzy.radLevel > 0;
		//Checking if the experience buff is active during Exterminate.
		var experienced = game.global.challengeActive == 'Exterminate' && game.challenges.Exterminate.experienced;
		//Checking to see if the Glass challenge is being run where all enemies are fast.
		var runningGlass = game.global.challengeActive == 'Glass';

		//Toggles equality scaling on
		if ((fastEnemy && !experienced) || voidDoubleAttack || noFrenzy || runningGlass) {
			if (!game.portal.Equality.scalingActive) {
				game.portal.Equality.scalingActive = true;
				manageEqualityStacks();
				updateEqualityScaling();
			}
			//Toggles equality scaling off and sets equality stacks to 0
		} else {
			if (game.portal.Equality.scalingActive) {
				game.portal.Equality.scalingActive = false;
				game.portal.Equality.disabledStackCount = "0";
				manageEqualityStacks();
				updateEqualityScaling();
			}
		}
	}
}


function autoMapLevel(maxLevel, special, biome) {
	maxLevel = !maxLevel ? 10 : maxLevel;
	special = !special ? 'lmc' : special;
	biome = !biome ? 'Farmlands' : biome;

	var go = false;
	if (maxLevel > 10) maxLevel = 10;
	if (game.global.world + maxLevel < 6) maxLevel = 0 - (game.global.world + 6);
	var runningUnlucky = game.global.challengeActive == 'Unlucky';
	var questShieldBreak = game.global.challengeActive == 'Quest' && questcheck() == 8;
	var minZone = 0 - game.global.world + 6

	var difficulty = 0.75;
	var ourHealth = RcalcOurHealth(questShieldBreak) * 2;

	for (y = maxLevel; y > minZone; y--) {
		mapLevel = y;
		var equalityAmt = equalityQuery(true, false, 'Snimp', game.global.world + mapLevel, 20, 'map', difficulty, true)
		var ourDmg = RcalcOurDmg('avg', equalityAmt, true, true, false, runningUnlucky) * 2;
		var enemyHealth = RcalcEnemyHealthMod(game.global.world + mapLevel, 20, 'Snimp', 'map', true) * difficulty;
		var enemyDmg = RcalcBadGuyDmg(null, RgetEnemyAvgAttack(game.global.world + mapLevel, 20, 'Snimp', 'map', true), equalityAmt, true) * 1.5 * difficulty;

		if (!go) {
			if ((game.resources.fragments.owned >= PerfectMapCost(mapLevel, special, biome) && enemyHealth <= ourDmg) && ((enemyDmg <= ourHealth))) {
				return mapLevel;
			}
		}
		if (!go && y === minZone) {
			return minZone;
		}

	}
}

function equalityQuery(query, forceGamma, name, zone, cell, mapType, difficulty, forceOneShot) {
	if (!game.global.preMapsActive && game.global.gridArray.length > 0) {
		//Turning off equality scaling
		game.portal.Equality.scalingActive = false;
		//Misc vars

		var currentCell = !cell && mapping ? game.global.lastClearedMapCell : !cell ? game.global.lastClearedCell : cell - 2;
		var enemyName = !name ? game.global[mapGrid][currentCell + 1].name : name;

		var mapping = game.global.mapsActive ? true : false;
		var mapType = !mapType && !mapping ? "world" : !mapType ? (getCurrentMapObject().location == "Void" ? "void" : "map") : mapType;
		var zone = !zone && (mapType == "world" || !mapping) ? game.global.world : !zone ? getCurrentMapObject().level : zone;



		//var mapping = game.global.mapsActive ? true : false;
		//var currentCell = !cell && mapping ? game.global.lastClearedMapCell : !cell ? game.global.lastClearedCell : cell;
		var mapGrid = game.global.mapsActive ? 'mapGridArray' : 'gridArray';
		//var type = (!mapping) ? "world" : (getCurrentMapObject().location == "Void" ? "void" : "map");
		var forceGamma = !forceGamma ? false : forceGamma;
		var forceOneShot = !forceOneShot ? false : forceOneShot;
		var query = !query ? false : query;
		//var zone = (type == "world" || !mapping) ? game.global.world : getCurrentMapObject().level;
		var difficulty = !query && !difficulty && !mapping ? 1 : !query && !difficulty ? getCurrentMapObject().difficulty : difficulty ? difficulty : 1;
		//Challenge conditions
		var runningUnlucky = game.global.challengeActive == 'Unlucky';
		var runningTrappa = game.global.challengeActive == 'Trappapalooza'
		var questShieldBreak = game.global.challengeActive == 'Quest' && questcheck() == 8;
		var runningGlass = game.global.challengeActive == 'Glass';

		//Initialising name/health/dmg variables
		//Enemy stats
		var enemyName = !name ? game.global[mapGrid][currentCell + 1].name : name;
		if (enemyName === 'Improbability' && zone <= 58) enemyName = 'Blimp';
		var enemyHealth = !query ? game.global[mapGrid][currentCell + 1].health : RcalcEnemyHealthMod(zone, currentCell + 2, enemyName, mapType, true) * difficulty;
		var enemyAttack = !query && getCurrentEnemy() ? getCurrentEnemy().attack * RcalcBadGuyDmgMod() :
			RcalcBadGuyDmg(null, RgetEnemyAvgAttack(zone, currentCell + 2, enemyName, mapType, query), 0, query);
		var enemyDmg = RcalcBadGuyDmg(null, RgetEnemyAvgAttack(zone, currentCell + 2, enemyName, mapType, query), 0) * difficulty == enemyAttack ? RcalcBadGuyDmg(null, RgetEnemyAvgAttack(zone, currentCell + 2, enemyName, mapType, query), 0, query) * 1.5 * difficulty : enemyAttack * 1.5 * difficulty;
		if (!query) enemyDmg *= game.global.voidBuff == 'doubleAttack' ? 2 : game.global.voidBuff == 'getCrit' ? 4 : 1;
		var enemyDmgEquality = 0;
		//Our stats
		var ourHealth = query ? RcalcOurHealth(questShieldBreak) : remainingHealth();
		var ourHealthMax = RcalcOurHealth(questShieldBreak)
		var ourDmg = RcalcOurDmg('min', 0, mapping, true, false);
		if (forceOneShot) ourDmg *= 2;
		var ourDmgEquality = 0;
		//Figuring out gamma burst stacks to proc and dmg bonus
		var gammaToTrigger = forceGamma ? 0 : forceOneShot ? 999 : (autoBattle.oneTimers.Burstier.owned ? 4 : 5) - game.heirlooms.Shield.gammaBurst.stacks;
		var gammaDmg = getHeirloomBonus("Shield", "gammaBurst") / 100;
		var fastEnemy = !game.global.preMapsActive ? fastimps.includes(enemyName) : false;
		if (game.global.mapsActive && game.talents.mapHealth.purchased) ourHealthMax *= 2;
		if (query && (game.global.mapsActive || forceOneShot) && game.talents.mapHealth.purchased) ourHealth *= 2;

		if (enemyHealth !== 0 && enemyHealth !== -1) {
			for (var i = 0; i <= game.portal.Equality.radLevel; i++) {
				enemyDmgEquality = enemyDmg * Math.pow(game.portal.Equality.getModifier(), i) * (runningTrappa ? 1.25 : 1);
				ourDmgEquality = ourDmg * Math.pow(game.portal.Equality.getModifier(1), i);
				if (runningUnlucky && Number(RcalcOurDmg('min', i, mapping, true, true, true).toString()[0] % 2 == 1))
					continue;
				if (!fastEnemy && !runningGlass && !runningTrappa && game.global.voidBuff != 'doubleAttack' && !questShieldBreak) {
					return i;
				}
				else if (ourHealth >= enemyDmgEquality && gammaToTrigger <= 1) {
					if (query) {
						return i;
					}
					return i;
				}
				else if (ourDmgEquality > enemyHealth && ourHealth >= enemyDmgEquality) {
					return i;
				}
				else if (!forceOneShot && ourDmgEquality * gammaDmg > enemyHealth && ourHealth >= enemyDmgEquality * 2 && gammaToTrigger == 2) {
					return i;
				}
				else if (!forceOneShot && ourDmgEquality * 2 > enemyHealth && ourHealth >= enemyDmgEquality * 2) {
					return i;
				}
				else if (!forceOneShot && ourDmgEquality * gammaDmg > enemyHealth && ourHealth >= enemyDmgEquality * 3 && gammaToTrigger == 3) {
					return i;
				}
				else if (!forceOneShot && ourDmgEquality * 3 > enemyHealth && ourHealth >= enemyDmgEquality * 3) {
					return i;
				}
				else if (!forceOneShot && ourDmgEquality * gammaDmg > enemyHealth && ourHealth >= enemyDmgEquality * 4 && gammaToTrigger == 4) {
					return i;
				}
				else if (!forceOneShot && ourHealth >= enemyDmgEquality * 4 && gammaToTrigger == 4) {
					return i;
				}
				else if (!forceOneShot && ourHealth >= enemyDmgEquality * 3 && gammaToTrigger == 3) {
					return i;
				}
				else if (!forceOneShot && ourHealth >= enemyDmgEquality * 2 && gammaToTrigger == 2) {
					return i;
				}
				else if (!forceOneShot && ourHealth >= enemyDmgEquality && gammaToTrigger <= 1) {
					return i;
				}
				else if (!forceOneShot && ourHealth >= enemyDmgEquality && gammaToTrigger == 0) {
					return i;
				}
				else if (i === game.portal.Equality.radLevel) {
					return i;
				}
			}
		}
	}

}

function equalityManagement() {
	if (!game.global.preMapsActive && game.global.gridArray.length > 0) {
		//Turning off equality scaling
		game.portal.Equality.scalingActive = false;
		//Misc vars
		var mapping = game.global.mapsActive ? true : false;
		var currentCell = mapping ? game.global.lastClearedMapCell : game.global.lastClearedCell;
		var mapGrid = game.global.mapsActive ? 'mapGridArray' : 'gridArray';
		var type = (!mapping) ? "world" : (getCurrentMapObject().location == "Void" ? "void" : "map");
		var zone = (type == "world" || !mapping) ? game.global.world : getCurrentMapObject().level;
		var difficulty = !mapping ? 1 : getCurrentMapObject().difficulty;
		//Challenge conditions
		var runningUnlucky = game.global.challengeActive == 'Unlucky';
		var runningTrappa = game.global.challengeActive == 'Trappapalooza'
		var questShieldBreak = game.global.challengeActive == 'Quest' && questcheck() == 8;
		var runningGlass = game.global.challengeActive == 'Glass';

		//Initialising name/health/dmg variables
		//Enemy stats
		var enemyName = game.global[mapGrid][currentCell + 1].name;
		var enemyHealth = game.global[mapGrid][currentCell + 1].health;
		var enemyAttack = getCurrentEnemy() ? getCurrentEnemy().attack * RcalcBadGuyDmgMod() : RcalcBadGuyDmg(null, RgetEnemyAvgAttack(zone, currentCell + 2, enemyName), 0) * difficulty;
		var enemyDmg = RcalcBadGuyDmg(null, RgetEnemyAvgAttack(zone, currentCell + 2, enemyName), 0) * difficulty == enemyAttack ? RcalcBadGuyDmg(null, RgetEnemyAvgAttack(zone, currentCell + 2, enemyName), 0) * 1.5 * difficulty : enemyAttack * 1.5;
		enemyDmg *= game.global.voidBuff == 'doubleAttack' ? 2 : game.global.voidBuff == 'getCrit' ? 4 : 1;
		var enemyDmgEquality = 0;
		//Our stats
		var ourHealth = remainingHealth();
		var ourHealthMax = RcalcOurHealth(questShieldBreak)
		var ourDmg = RcalcOurDmg('min', 0, mapping, true, true);
		var ourDmgEquality = 0;
		//Figuring out gamma burst stacks to proc and dmg bonus
		var gammaToTrigger = (autoBattle.oneTimers.Burstier.owned ? 4 : 5) - game.heirlooms.Shield.gammaBurst.stacks;
		var gammaDmg = getHeirloomBonus("Shield", "gammaBurst") / 100;

		var fastEnemy = !game.global.preMapsActive ? fastimps.includes(enemyName) : false;
		/* var fastEnemy2 = currentCell + 3 > game.global[mapGrid].length ? false :
			getPageSetting('RhsPlagueBringerSwap') && !game.global.preMapsActive && fastimps.includes(game.global[mapGrid][currentCell + 2].name) ? true :
				false;
		var plaguebringer = currentCell + 3 > game.global[mapGrid].length ? 1e300 : typeof (game.global[mapGrid][currentCell + 2].plaguebringer) === 'undefined' ? 0 : game.global[mapGrid][currentCell + 1].plaguebringer */
		if (game.global.mapsActive && game.talents.mapHealth.purchased) ourHealthMax *= 2;

		if (enemyHealth !== 0 && enemyHealth !== -1) {
			for (var i = 0; i <= game.portal.Equality.radLevel; i++) {
				enemyDmgEquality = enemyDmg * Math.pow(game.portal.Equality.getModifier(), i) * (runningTrappa ? 1.1 : 1);
				ourDmgEquality = ourDmg * Math.pow(game.portal.Equality.getModifier(1), i);
				if (runningUnlucky && Number(RcalcOurDmg('min', i, mapping, true, true, true).toString()[0] % 2 == 1))
					continue;
				/* if (fastEnemy2 && !fastEnemy && !runningGlass && !runningTrappa && game.global.voidBuff != 'doubleAttack' && !questShieldBreak && ourDmgEquality * 1.25 > enemyHealth && plaguebringer === 0) { //Insert some code to check Plaguebringer damage here
					continue;
				} */
				if (!fastEnemy && !runningGlass && !runningTrappa && game.global.voidBuff != 'doubleAttack' && !questShieldBreak) {
					game.portal.Equality.disabledStackCount = i;
					manageEqualityStacks();
					updateEqualityScaling();
					break;
				}
				else if (ourHealth < (ourHealthMax * 0.99) && gammaToTrigger == 4 && !runningTrappa) {
					if ((questShieldBreak) || !mapping) {
						mapsClicked();
						mapsClicked();
					}
					else if (mapping && currentCell !== -1 && type !== 'void' && game.global.titimpLeft == 0) {
						mapsClicked();
						rRunMap();
					}
					else
						game.portal.Equality.disabledStackCount = 0;
					manageEqualityStacks();
					updateEqualityScaling();
					break;
				}
				else if ((ourDmgEquality * gammaDmg) < enemyHealth && gammaToTrigger > 1) {
					game.portal.Equality.disabledStackCount = game.portal.Equality.radLevel;
					manageEqualityStacks();
					updateEqualityScaling();
					break;
				}
				else if (ourHealth >= enemyDmgEquality && gammaToTrigger <= 1) {
					game.portal.Equality.disabledStackCount = i;
					manageEqualityStacks();
					updateEqualityScaling();
					break;
				}
				else if (ourDmgEquality > enemyHealth && ourHealth >= enemyDmgEquality) {
					game.portal.Equality.disabledStackCount = i;
					manageEqualityStacks();
					updateEqualityScaling();
					break;
				}
				else if (ourDmgEquality * gammaDmg > enemyHealth && ourHealth >= enemyDmgEquality * 2 && gammaToTrigger == 2) {
					game.portal.Equality.disabledStackCount = i;
					manageEqualityStacks();
					updateEqualityScaling();
					break;
				}
				else if (ourDmgEquality * 2 > enemyHealth && ourHealth >= enemyDmgEquality * 2) {
					game.portal.Equality.disabledStackCount = i;
					manageEqualityStacks();
					updateEqualityScaling();
					break;
				}
				else if (ourDmgEquality * gammaDmg > enemyHealth && ourHealth >= enemyDmgEquality * 3 && gammaToTrigger == 3) {
					game.portal.Equality.disabledStackCount = i;
					manageEqualityStacks();
					updateEqualityScaling();
					break;
				}
				else if (ourDmgEquality * 3 > enemyHealth && ourHealth >= enemyDmgEquality * 3) {
					game.portal.Equality.disabledStackCount = i;
					manageEqualityStacks();
					updateEqualityScaling();
					break;
				}
				else if (ourDmgEquality * gammaDmg > enemyHealth && ourHealth >= enemyDmgEquality * 4 && gammaToTrigger == 4) {
					game.portal.Equality.disabledStackCount = i;
					manageEqualityStacks();
					updateEqualityScaling();
					break;
				}
				else if (ourHealth >= enemyDmgEquality * 4 && gammaToTrigger == 4) {
					game.portal.Equality.disabledStackCount = i;
					manageEqualityStacks();
					updateEqualityScaling();
					break;
				}
				else if (ourHealth >= enemyDmgEquality * 3 && gammaToTrigger == 3) {
					game.portal.Equality.disabledStackCount = i;
					manageEqualityStacks();
					updateEqualityScaling();
					break;
				}
				else if (ourHealth >= enemyDmgEquality * 2 && gammaToTrigger == 2) {
					game.portal.Equality.disabledStackCount = i;
					manageEqualityStacks();
					updateEqualityScaling();
					break;
				}
				else if (ourHealth >= enemyDmgEquality && gammaToTrigger <= 1) {
					game.portal.Equality.disabledStackCount = i;
					manageEqualityStacks();
					updateEqualityScaling();
					break;
				}
				else if (ourHealth >= enemyDmgEquality && gammaToTrigger == 0) {
					game.portal.Equality.disabledStackCount = i;
					manageEqualityStacks();
					updateEqualityScaling();
					break;
				}
				else {
					game.portal.Equality.disabledStackCount = i;
					manageEqualityStacks();
					updateEqualityScaling();
				}
			}
		}
	}
}

function* finder(array, item) {
	let index = -1;
	while ((index = array.indexOf(item, index + 1)) > -1) {
		yield index;
	}
	return -1;
}

function simpleSecondsLocal(what, seconds, event, ssWorkerRatio) {
	var event = !event ? null : event;
	var ssWorkerRatio = !ssWorkerRatio ? null : ssWorkerRatio;

	if (typeof ssWorkerRatio !== 'undefined' && ssWorkerRatio !== null) {
		var desiredRatios = Array.from(ssWorkerRatio.split(','))
		desiredRatios = [desiredRatios[0] !== undefined ? parseInt(desiredRatios[0]) : 0,
		desiredRatios[1] !== undefined ? parseInt(desiredRatios[1]) : 0,
		desiredRatios[2] !== undefined ? parseInt(desiredRatios[2]) : 0,
		desiredRatios[3] !== undefined ? parseInt(desiredRatios[3]) : 0]
		var totalFraction = desiredRatios.reduce((a, b) => { return a + b; });
	}
	//Come home to the impossible flavour of balanced resource gain. Come home, to simple seconds.
	var jobName;
	var pos;
	switch (what) {
		case "food":
			jobName = "Farmer";
			pos = 0
			break;
		case "wood":
			jobName = "Lumberjack";
			pos = 1
			break;
		case "metal":
			jobName = "Miner";
			pos = 2
			break;
		case "gems":
			jobName = "Dragimp";
			break;
		case "fragments":
			jobName = "Explorer";
			break;
		case "science":
			jobName = "Scientist";
			pos = 3
			break;
	}
	var heirloom = !jobName ? null :
		jobName == "Miner" && game.challengeActive == "Pandemonium" && getPageSetting("RhsPandStaff") !== 'undefined' ? "RhsPandStaff" :
			jobName == "Farmer" && getPageSetting("RhsFoodStaff") != 'undefined' ? "RhsFoodStaff" :
				jobName == "Lumberjack" && getPageSetting("RhsWoodStaff") != 'undefined' ? "RhsWoodStaff" :
					jobName == "Miner" && getPageSetting("RhsMetalStaff") != 'undefined' ? "RhsMetalStaff" :
						getPageSetting("RhsMapStaff") != 'undefined' ? "RhsMapStaff" :
							getPageSetting("RhsWorldStaff") != 'undefined' ? "RhsWorldStaff" :
								null;
	var job = game.jobs[jobName];
	var trimpworkers = ((game.resources.trimps.realMax() / 2) - game.jobs.Explorer.owned - game.jobs.Meteorologist.owned - game.jobs.Worshipper.owned);
	var workers = game.global.challengeActive == "Pandemonium" && jobName == "Miner" ? (trimpworkers / 1000) * 997.90440075 :
		ssWorkerRatio !== null ? Math.floor(trimpworkers * desiredRatios[pos] / totalFraction) :
			rShouldWorshipperFarm ? trimpworkers :
				job.owned;

	var amt_local = workers * job.modifier * seconds;
	amt_local += (amt_local * getPerkLevel("Motivation") * game.portal.Motivation.modifier);
	if (what != "gems" && game.permaBoneBonuses.multitasking.owned > 0 && (game.resources.trimps.owned >= game.resources.trimps.realMax()))
		amt_local *= (1 + game.permaBoneBonuses.multitasking.mult());
	if (what != "science" && what != "fragments" && game.global.challengeActive == "Alchemy")
		amt_local *= alchObj.getPotionEffect("Potion of Finding");
	if (game.global.pandCompletions && game.global.universe == 2 && what != "fragments")
		amt_local *= game.challenges.Pandemonium.getTrimpMult();
	if (getPerkLevel("Observation") > 0 && game.portal.Observation.trinkets > 0)
		amt_local *= game.portal.Observation.getMult();

	if (what == "food" || what == "wood" || what == "metal") {
		amt_local *= getParityBonus();
		if (autoBattle.oneTimers.Gathermate.owned)
			amt_local *= autoBattle.oneTimers.Gathermate.getMult();
	}
	if ((what == "food" && game.buildings.Antenna.owned >= 5) || (what == "metal" && game.buildings.Antenna.owned >= 15))
		amt_local *= game.jobs.Meteorologist.getExtraMult();
	if (Fluffy.isRewardActive('gatherer'))
		amt_local *= 2;
	if (what == "wood" && game.global.challengeActive == "Hypothermia")
		amt_local *= game.challenges.Hypothermia.getWoodMult();
	if (game.global.challengeActive == "Unbalance")
		amt_local *= game.challenges.Unbalance.getGatherMult();

	if (game.global.challengeActive == "Daily") {
		if (typeof game.global.dailyChallenge.famine !== 'undefined' && what != "fragments" && what != "science")
			amt_local *= dailyModifiers.famine.getMult(game.global.dailyChallenge.famine.strength);
		if (typeof game.global.dailyChallenge.dedication !== 'undefined')
			amt_local *= dailyModifiers.dedication.getMult(game.global.dailyChallenge.dedication.strength);
	}
	if (game.global.challengeActive == "Melt") {
		amt_local *= 10;
		amt_local *= Math.pow(game.challenges.Melt.decayValue, game.challenges.Melt.stacks);
	}

	if (game.challenges.Nurture.boostsActive())
		amt_local *= game.challenges.Nurture.getResourceBoost();
	if (event == null || heirloom == null || game.global.StaffEquipped.name == autoTrimpSettings[heirloom].value) {
		amt_local = calcHeirloomBonus("Staff", jobName + "Speed", amt_local);
	}
	//Calculating proper value for the staff we should be using instead of equipped
	else if (event != null && game.global.StaffEquipped != getPageSetting(heirloom)) {
		if (what == "food" || what == "wood" || what == "metal") {
			amt_local /= getParityBonus();
			amt_local *= getHazardParityMult(HeirloomSearch(heirloom))
		}
		amt_local = calcHeirloomBonusLocal(HeirloomModSearch(heirloom, jobName + "Speed"), amt_local);
	}
	var turkimpBonus = game.talents.turkimp2.purchased ? 2 : game.talents.turkimp2.purchased ? 1.75 : 1.5;

	if ((game.talents.turkimp2.purchased || game.global.turkimpTimer > 0) && (what == "food" || what == "metal" || what == "wood")) {
		amt_local *= turkimpBonus;
		amt_local += getPlayerModifier() * seconds;
	}
	return amt_local;
}

function calcHeirloomBonusLocal(mod, number) {
	var mod = mod;
	if (!mod) return;

	return (number * ((mod / 100) + 1));
}

function scaleToCurrentMapLocal(amt_local, ignoreBonuses, ignoreScry, map) {
	var map = !map && game.global.challengeActive == "Pandemonium" ? game.global.world - 1 :
		!map ? game.global.world :
			game.global.world + map;
	var compare = game.global.world;
	if (map > compare && map.location != "Bionic") {
		amt_local *= Math.pow(1.1, (map - compare));
	} else {
		if (game.talents.mapLoot.purchased)
			compare--;
		if (map < compare) {
			//-20% loot compounding for each level below world
			amt_local *= Math.pow(0.8, (compare - map));
		}
	}
	var maploot = game.global.mapsActive ? getCurrentMapObject().loot : game.global.farmlandsUnlocked && game.singleRunBonuses.goldMaps.owned ? 3.6 : game.global.decayDone && game.singleRunBonuses.goldMaps.owned ? 2.85 : game.global.farmlandsUnlocked ? 2.6 : game.global.decayDone ? 1.85 : 1.6;
	//Add map loot bonus
	amt_local = Math.round(amt_local * maploot);
	if (ignoreBonuses) return amt_local;
	amt_local = scaleLootBonuses(amt_local, ignoreScry);
	return amt_local;
}

function calculateMaxAffordLocal(itemObj, isBuilding, isEquipment, isJob, forceMax, forceRatio, resources) { //don't use forceMax for jobs until you fix that second return. forceMax and forceRatio indicate that they're from an auto, and ignore firing
	if (!itemObj.cost) return 1;

	var mostAfford = -1;
	var currentOwned = (itemObj.purchased) ? itemObj.purchased : ((itemObj.level) ? itemObj.level : itemObj.owned);
	if (!currentOwned) currentOwned = 0;
	if (isJob && game.global.firing && !forceRatio) return Math.floor(currentOwned * game.global.maxSplit);
	//if (itemObj == game.equipment.Shield) console.log(currentOwned);
	for (var item in itemObj.cost) {
		var price = itemObj.cost[item];
		var toBuy;
		var resource = game.resources[item];
		var resourcesAvailable = !resources ? resource.owned : resources;
		if (resourcesAvailable < 0) resourcesAvailable = 0;
		if (game.global.maxSplit != 1 && !forceMax && !forceRatio) resourcesAvailable = Math.floor(resourcesAvailable * game.global.maxSplit);
		else if (forceRatio) resourcesAvailable = Math.floor(resourcesAvailable * forceRatio);

		if (item === 'fragments') resourcesAvailable = autoTrimpSettings.rBuildingSettingsArray.value.SafeGateway.zone !== 0 && game.global.world >= autoTrimpSettings.rBuildingSettingsArray.value.SafeGateway.zone ? resourcesAvailable :
			autoTrimpSettings.rBuildingSettingsArray.value.SafeGateway.enabled && resourcesAvailable > resource.owned - (PerfectMapCost_Actual(10, 'lmc') * autoTrimpSettings.rBuildingSettingsArray.value.SafeGateway.mapCount) ? resource.owned - (PerfectMapCost_Actual(10, 'lmc') * autoTrimpSettings.rBuildingSettingsArray.value.SafeGateway.mapCount) :
				resourcesAvailable;
		if (!resource || typeof resourcesAvailable === 'undefined') {
			console.log("resource " + item + " not found");
			return 1;
		}
		if (typeof price[1] !== 'undefined') {
			var start = price[0];
			if (isEquipment) {
				var artMult = getEquipPriceMult();
				start = Math.ceil(start * artMult);
			}
			if (isBuilding && getPerkLevel("Resourceful")) start = start * (Math.pow(1 - game.portal.Resourceful.modifier, getPerkLevel("Resourceful")));
			toBuy = Math.floor(log10(((resourcesAvailable / (start * Math.pow(price[1], currentOwned))) * (price[1] - 1)) + 1) / log10(price[1]));

		}
		else if (typeof price === 'function') {
			return 1;
		}
		else {
			if (isBuilding && getPerkLevel("Resourceful")) price = Math.ceil(price * (Math.pow(1 - game.portal.Resourceful.modifier, getPerkLevel("Resourceful"))));
			toBuy = Math.floor(resourcesAvailable / price);
		}
		if (mostAfford == -1 || mostAfford > toBuy) mostAfford = toBuy;
	}
	if (forceRatio && (mostAfford <= 0 || isNaN(mostAfford))) return 0;
	if (isBuilding && mostAfford > 1000000000) return 1000000000;
	if (mostAfford <= 0) return 1;
	if (isJob && itemObj.max && itemObj.owned + mostAfford > itemObj.max) return (itemObj.max - itemObj.owned);
	return mostAfford;
}

function boneShrineOutput(charges) {
	if (game.permaBoneBonuses.boosts.charges <= 0) return;

	charges = !charges ? 0 : charges;

	var eligible = ["food", "wood", "metal"];
	var storage = ["Barn", "Shed", "Forge"];
	var rewarded = [0, 0, 0];
	var hasNeg = false;
	for (var x = 0; x < eligible.length; x++) {
		var resName = eligible[x];
		var resObj = game.resources[resName];
		var amt = simpleSeconds(resName, (game.permaBoneBonuses.boosts.timeGranted() * 60));
		amt = scaleLootBonuses(amt, true);
		amt *= charges
		var tempMax = resObj.max;
		var packMod = getPerkLevel("Packrat") * game.portal.Packrat.modifier;
		var newTotal = resObj.owned + amt;
		while (newTotal > calcHeirloomBonus("Shield", "storageSize", tempMax + (tempMax * packMod))) {
			var nextCost = calculatePercentageBuildingCost(storage[x], resName, 0.25, tempMax);
			if (newTotal < nextCost) break;
			newTotal -= nextCost;
			amt -= nextCost;
			tempMax *= 2;
		}
		rewarded[x] = amt;
		if (amt < 0) hasNeg = true;
	}
	var text = prettify(rewarded[0]) + " Food, " + prettify(rewarded[1]) + " Wood, and " + prettify(rewarded[2]) + " Metal."

	return text;
}

function PerfectMapCost_Actual(plusLevel, specialModifier) {
	if (!specialModifier) return Infinity
	if (!plusLevel) return Infinity
	var specialModifier = specialModifier;
	var plusLevel = plusLevel;
	var baseCost = 27;
	var mapLevel = game.global.world;
	if (plusLevel < 0)
		mapLevel = mapLevel - plusLevel;
	if (mapLevel < 6)
		mapLevel = 6;
	baseCost *= (game.global.world >= 60) ? 0.74 : 1;
	baseCost += 6
	if (plusLevel > 0)
		baseCost += (plusLevel * 10)
	if (specialModifier != "0")
		baseCost += 18
	baseCost += mapLevel;
	baseCost = Math.floor((((baseCost / 150) * (Math.pow(1.14, baseCost - 1))) * mapLevel * 2) * Math.pow((1.03 + (mapLevel / 50000)), mapLevel));
	baseCost *= 2;
	return baseCost;
}

function runAtlantrimp() {
	if (!game.global.preMapsActive && !game.global.mapsActive)
		mapsClicked();
	if (game.global.mapsActive && getCurrentMapObject().name !== 'Atlantrimp') {
		mapsClicked();
		recycleMap();
	}
	if (game.global.preMapsActive) {
		for (var map in game.global.mapsOwnedArray) {
			if (game.global.mapsOwnedArray[map].name == 'Atlantrimp') {
				selectMap(game.global.mapsOwnedArray[map].id)
				rRunMap();
				debug('Running Atlantrimp');
				rBSRunningAtlantrimp = true;
			}
		}
	}
}

function ABItemSwap(items, ring) {
	items = !items ? false : items;
	ring = !ring ? false : ring;
	var changeitems = false;
	if (items) {
		if (changeitems = true) {
			for (var item in autoBattle.items) {
				if (autoBattle.items[item].equipped) {
					autoBattle.items[item].equipped = false;
					changeitems = false;
				}
			}
		}
		for (var item of items) {
			if (autoBattle.items[item].equipped == false) {
				changeitems = true;
				if (autoBattle.items[item].hidden)
					autoBattle.items[item].hidden = false;
				autoBattle.items[item].equipped = true;
			}
		}
	}

	if (ring) {
		autoBattle.rings.mods = ring;
	}
}

function automateSpireAssault() {

	if (autoBattle.activeContract === '') {
		if (!autoBattle.items.Stormbringer.owned)
			autoBattle.acceptContract('Stormbringer')
		if (!autoBattle.items.Nullifium_Armor.owned)
			autoBattle.acceptContract('Nullifium_Armor')
		if (!autoBattle.items.Haunted_Harpoon.owned)
			autoBattle.acceptContract('Haunted_Harpoon')
		if (!autoBattle.items.Handful_of_Mold.owned)
			autoBattle.acceptContract('Handful_of_Mold')
		if (!autoBattle.items.Box_of_Spores.owned)
			autoBattle.acceptContract('Box_of_Spores')
	}

	if (autoBattle.items.Stormbringer.owned && autoBattle.items.Nullifium_Armor.owned && autoBattle.items.Haunted_Harpoon.owned) {
		if (autoBattle.items.Stormbringer.owned && autoBattle.items.Stormbringer.level != 5)
			autoBattle.upgrade('Stormbringer')
		if (autoBattle.items.Nullifium_Armor.owned && autoBattle.items.Nullifium_Armor.level != 4)
			autoBattle.upgrade('Nullifium_Armor')
		if (autoBattle.items.Haunted_Harpoon.owned && autoBattle.items.Haunted_Harpoon.level != 3)
			autoBattle.upgrade('Haunted_Harpoon')
		if (autoBattle.items.Handful_of_Mold.owned && autoBattle.items.Handful_of_Mold.level != 3)
			autoBattle.upgrade('Handful_of_Mold')

		if (!autoBattle.autoLevel && autoBattle.maxEnemyLevel < 99)
			autoBattle.toggleAutoLevel();

		if (autoBattle.enemyLevel == 92) {
			var items = [['Rusty_Dagger'], ['Bad_Medkit'], ['Shock_and_Awl'], ['Spiked_Gloves'], ['Bloodstained_Gloves'], ['Big_Cleaver'], ['Sacrificial_Shank'], ['Fearsome_Piercer'], ['Doppelganger_Signet'], ['Basket_of_Souls'], ['Omni_Enhancer'], ['Nullifium_Armor'], ['Haunted_Harpoon']];
			var ring = [['attack'], ['health']]
		}
		if (autoBattle.enemyLevel == 93) {
			var items = [['Rusty_Dagger'], ['Bad_Medkit'], ['Shock_and_Awl'], ['Spiked_Gloves'], ['Bloodstained_Gloves'], ['Fearsome_Piercer'], ['Bag_of_Nails'], ['Doppelganger_Signet'], ['Basket_of_Souls'], ['Omni_Enhancer'], ['Stormbringer'], ['Nullifium_Armor'], ['Haunted_Harpoon']];
			var ring = [['lifesteal'], ['health']]
		}
		if (autoBattle.enemyLevel == 94) {
			var items = [['Rusty_Dagger'], ['Shock_and_Awl'], ['Spiked_Gloves'], ['Wired_Wristguards'], ['Aegis'], ['Bloodstained_Gloves'], ['Sacrificial_Shank'], ['Fearsome_Piercer'], ['Doppelganger_Signet'], ['Basket_of_Souls'], ['Omni_Enhancer'], ['Nullifium_Armor'], ['Haunted_Harpoon']];
			var ring = [['attack'], ['lifesteal']]
		}
		if (autoBattle.enemyLevel == 95) {
			var items = [['Rusty_Dagger'], ['Bad_Medkit'], ['Shock_and_Awl'], ['Spiked_Gloves'], ['Bloodstained_Gloves'], ['Big_Cleaver'], ['Sacrificial_Shank'], ['Fearsome_Piercer'], ['Doppelganger_Signet'], ['Basket_of_Souls'], ['Omni_Enhancer'], ['Nullifium_Armor'], ['Haunted_Harpoon']];
			var ring = [['attack'], ['health']]
		}
		if (autoBattle.enemyLevel == 96) {
			var items = [['Rusty_Dagger'], ['Shock_and_Awl'], ['Spiked_Gloves'], ['Wired_Wristguards'], ['Aegis'], ['Bloodstained_Gloves'], ['Sacrificial_Shank'], ['Fearsome_Piercer'], ['Doppelganger_Signet'], ['Basket_of_Souls'], ['Omni_Enhancer'], ['Nullifium_Armor'], ['Haunted_Harpoon']];
			var ring = [['attack'], ['health']]
		}
		if (autoBattle.enemyLevel == 97) {
			var items = [['Rusty_Dagger'], ['Shock_and_Awl'], ['Spiked_Gloves'], ['Wired_Wristguards'], ['Aegis'], ['Bloodstained_Gloves'], ['Sacrificial_Shank'], ['Fearsome_Piercer'], ['Doppelganger_Signet'], ['Basket_of_Souls'], ['Omni_Enhancer'], ['Nullifium_Armor'], ['Haunted_Harpoon']];
			var ring = [['attack'], ['health']]
		}
		if (autoBattle.enemyLevel == 98) {
			var items = [['Hungering_Mold'], ['Shock_and_Awl'], ['Sacrificial_Shank'], ['Plague_Bringer'], ['Very_Large_Slime'], ['Snimp__Fanged_Blade'], ['Doppelganger_Signet'], ['Basket_of_Souls'], ['Goo_Golem'], ['Omni_Enhancer'], ['Stormbringer'], ['Nullifium_Armor'], ['Handful_of_Mold']];
			var ring = [['attack'], ['health']]
		}
		if (autoBattle.enemyLevel == 99) {
			var items = [['Lifegiving_Gem'], ['Shock_and_Awl'], ['Spiked_Gloves'], ['Bloodstained_Gloves'], ['Sacrificial_Shank'], ['Fearsome_Piercer'], ['Bag_of_Nails'], ['Doppelganger_Signet'], ['Basket_of_Souls'], ['Omni_Enhancer'], ['Stormbringer'], ['Nullifium_Armor'], ['Haunted_Harpoon']];
			var ring = [['lifesteal'], ['dustMult']]
		}

		if (autoBattle.maxEnemyLevel === 99 && autoBattle.autoLevel) {
			autoBattle.toggleAutoLevel();
		}

		if (autoBattle.sessionEnemiesKilled == 0 && autoBattle.enemy.baseHealth == autoBattle.enemy.health) {
			ABItemSwap(items, ring);
			autoBattle.popup(true, false, true);
		}
	}
}


function PresetSwapping(preset) {
	if (!getPageSetting('RPerkSwapping')) return

	var preset = !preset ? null :
		(preset != 1 && preset != 2 && preset != 3) ? null :
			preset;

	if (preset == null) {
		debug("Invalid input. Needs to be a value between 1 and 3.");
		return;
	}

	presetTab(preset);
	loadPerkPreset();
}

function hypoPackratReset(challenge) {

	if (challenge == 'Hypothermia' && autoTrimpSettings.rHypoDefaultSettings.value.packrat) {
		toggleRemovePerks();
		numTab(6, true);
		buyPortalUpgrade('Packrat');
		toggleRemovePerks();
		tooltip('Custom', null, 'update', true);
		document.getElementById('customNumberBox').value = 3;
		numTab(5, true)
		buyPortalUpgrade('Packrat');
	}
}

function AllocatePerks() {
	if (!game.global.portalActive) return;
	if (getPageSetting('RAutoAllocatePerks') === 0) return;
	var allocatePerk = getPageSetting('RAutoAllocatePerks') == 1 ? 'Looting' : getPageSetting('RAutoAllocatePerks') == 2 ? 'Greed' : getPageSetting('RAutoAllocatePerks') == 3 ? 'Motivation' : null;
	if (allocatePerk !== null) {
		numTab(6, true)
		buyPortalUpgrade(allocatePerk);
		debug('Bought Max ' + allocatePerk);
	}
}

function PerkRespec(preset) {
	//Swaps between presets depending on the input provided. Will only function if the input is between 1 and 3.
	var preset = !preset ? null :
		(preset != 1 && preset != 2 && preset != 3) ? null :
			preset;

	if (preset == null) {
		debug("Invalid input. Needs to be a value between 1 and 3.");
		return;
	}

	//Respecs to a different preset and fires all workers to ensure that decreases in carp levels won't impact its ability to respec
	if (game.global.canRespecPerks) {
		viewPortalUpgrades();
		respecPerks();
		presetTab(preset);
		loadPerkPreset();
		game.jobs.Miner.owned = 0;
		game.jobs.Farmer.owned = 0;
		game.jobs.Lumberjack.owned = 0;
		activateClicked();
		debug("Respecced to preset " + preset);
	} else
		debug("No respec available");
}

function AbandonChallengeRuns(zone) {
	//Abandons challenge runs when a certain zone has been reached.
	var zone = !zone ? (getPageSetting('c3finishrun') === -1 ? Infinity : getPageSetting('c3finishrun')) :
		zone;
	var hasPaused = false;

	if (zone === null) return
	if (game.global.world == zone && game.global.runningChallengeSquared && !hasPaused) {
		toggleSetting('pauseGame');
		hasPaused = true;
	}
	if (game.options.menu.pauseGame.enabled && game.global.world == zone && hasPaused) {
		tooltip('Export', null, 'update');
		document.getElementById("downloadLink").click();
		cancelTooltip();
		if (game.global.runningChallengeSquared) {
			confirmAbandonChallenge();
			abandonChallenge();
			cancelTooltip();
		}
		toggleSetting('pauseGame');
	}
}

function dailyModifiersOutput() {
	var daily = game.global.dailyChallenge;
	if (!daily) return "";
	//var returnText = ''
	var returnText = "";
	for (var item in daily) {
		if (item == 'seed') continue;
		returnText += dailyModifiers[item].description(daily[item].strength) + "<br>";
	}
	return returnText
}

function dailyModiferReduction() {
	if (game.global.challengeActive !== 'Daily') return 0;
	var dailyMods = dailyModifiersOutput().split('<br>')
	dailyMods.length = dailyMods.length - 1;
	var dailyReduction = 0;

	for (var item in autoTrimpSettings.rDailyPortalSettingsArray.value) {
		if (item === 'portalZone' || item === 'portalChallenge') continue;
		if (!autoTrimpSettings.rDailyPortalSettingsArray.value[item].enabled) continue;
		var dailyReductionTemp = 0;
		var modifier = item;
		if (modifier.includes('Shred')) modifier = 'Every 15';
		if (modifier.includes('Weakness')) modifier = 'Enemies stack a debuff with each attack, reducing Trimp attack by';
		if (modifier.includes('Famine')) modifier = 'less Metal, Food, Wood, and Gems from all sources';
		if (modifier.includes('Large')) modifier = 'All housing can store';

		for (var x = 0; x < dailyMods.length; x++) {
			if (dailyMods[x].includes(modifier)) {
				if (modifier.includes('Every 15') && dailyMods[x].includes(item.split('Shred')[1]))
					dailyReductionTemp = autoTrimpSettings.rDailyPortalSettingsArray.value[item].zone
				else
					dailyReductionTemp = autoTrimpSettings.rDailyPortalSettingsArray.value[item].zone
			}
			if (dailyReduction > dailyReductionTemp) dailyReduction = dailyReductionTemp;
		}
	}
	return dailyReduction
}

function displayMostEfficientEquipment() {

	var $eqNamePrestige = null;

	var highlightSetting = getPageSetting('rEquipEfficientEquipDisplay');
	if (!highlightSetting) {
		for (var item in game.equipment) {
			if (game.upgrades[RequipmentList[item].Upgrade].locked == 0) {
				$eqNamePrestige = document.getElementById(RequipmentList[item].Upgrade);
				if (document.getElementsByClassName(item).length == 0) {
					document.getElementById(RequipmentList[item].Upgrade).classList.add("efficient");
					document.getElementById(RequipmentList[item].Upgrade).classList.add(item);
				}
			}

			var $eqName = document.getElementById(item);
			if (!$eqName)
				continue;

			swapClass('efficient', 'efficientNo', $eqName)
			if ($eqNamePrestige != null)
				swapClass('efficient', 'efficientNo', $eqNamePrestige)
		}

	}
	if (!highlightSetting) return;

	for (var item in game.equipment) {
		if (game.equipment[item].locked) continue;
		if (item == "Shield") continue;
		var rEquipZone = game.global.challengeActive == "Daily" && getPageSetting('Rdequipon') ? getPageSetting('Rdequipzone') : getPageSetting('Requipzone');
		var zoneGo = !zoneGo && (rEquipZone[0] > 0 && (rEquipZone.includes(game.global.world)) || game.global.world >= rEquipZone[rEquipZone.length - 1]) ? true :
			zoneGo;
		var bestBuys = mostEfficientEquipment(1, true, true, false);
		var isAttack = (RequipmentList[item].Stat === 'attack' ? 0 : 1);
		var $eqNamePrestige = null;
		if (game.upgrades[RequipmentList[item].Upgrade].locked == 0) {
			$eqNamePrestige = document.getElementById(RequipmentList[item].Upgrade);
			if (document.getElementsByClassName(item).length == 0) {
				document.getElementById(RequipmentList[item].Upgrade).classList.add("efficient");
				document.getElementById(RequipmentList[item].Upgrade).classList.add(item);
			}
			if (document.getElementById(RequipmentList[item].Upgrade).classList.contains('efficientYes') && (item != bestBuys[isAttack] || (item == bestBuys[isAttack] && bestBuys[isAttack + 4] !== true)))
				swapClass('efficient', 'efficientNo', $eqNamePrestige)
		}
		if (item == bestBuys[isAttack] && bestBuys[isAttack + 4] === true) {
			bestBuys[isAttack] = RequipmentList[item].Upgrade;
			if (document.getElementById(item).classList.contains('efficientYes'))
				swapClass('efficient', 'efficientNo', document.getElementById(item))
			item = RequipmentList[item].Upgrade;
		}

		var $eqName = document.getElementById(item);
		if (!$eqName)
			continue;
		if (item == bestBuys[isAttack])
			swapClass('efficient', 'efficientYes', $eqName)
		else {
			swapClass('efficient', 'efficientNo', $eqName)
		}
	}
}
