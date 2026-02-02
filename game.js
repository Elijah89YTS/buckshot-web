let playerHP = 3;
let dealerHP = 3;
let shells = [];
let playerTurn = true;
let peekNext = false;

const statusDiv = document.getElementById("status");
const playerHPSpan = document.getElementById("playerHP");
const dealerHPSpan = document.getElementById("dealerHP");
const items = document.querySelectorAll(".item");

function log(msg) {
statusDiv.textContent = msg;
}

function updateHP() {
playerHPSpan.textContent = playerHP;
dealerHPSpan.textContent = dealerHP;
}

function loadShells() {
shells = [];
const liveCount = Math.floor(Math.random() * 3) + 1;
const blankCount = 6 - liveCount;
for (let i = 0; i < liveCount; i++) shells.push(true);
for (let i = 0; i < blankCount; i++) shells.push(false);
shells.sort(() => Math.random() - 0.5);
log("Gun loaded...");
enableItems(true);
}

function shoot(targetSelf) {
if (shells.length === 0) loadShells();

const shell = shells.shift();
const damage = shell ? 1 : 0;

if (shell) log("💥 BANG!");
else log("😮‍💨 Click...");

if (targetSelf) {
if (playerTurn) playerHP -= damage;
else dealerHP -= damage;
} else {
if (playerTurn) dealerHP -= damage;
else playerHP -= damage;
}

updateHP();
checkGameOver();
endTurn();
}

function endTurn() {
playerTurn = !playerTurn;
enableItems(playerTurn);

if (!playerTurn) setTimeout(dealerMove, 1200);
}

function dealerMove() {
const shootSelfChance = Math.random() < 0.5;
shoot(shootSelfChance);
}

function checkGameOver() {
if (playerHP <= 0) log("💀 You lost!");
if (dealerHP <= 0) log("🎉 You win!");
}

function enableItems(state) {
items.forEach(i => i.classList.toggle("enabled", state));
}

items.forEach(item => {
item.onclick = () => {
if (!item.classList.contains("enabled")) return;

const type = item.dataset.item;

if (type === "peek") {
peekNext = true;
log("Next shell revealed!");
}

if (type === "heal") {
playerHP++;
updateHP();
log("You healed 1 HP");
}

if (type === "skip") {
log("Dealer turn skipped!");
playerTurn = true;
}

item.classList.remove("enabled");
};
});

document.getElementById("shootSelf").onclick = () => {
if (!playerTurn) return;
shoot(true);
};

document.getElementById("shootDealer").onclick = () => {
if (!playerTurn) return;
shoot(false);
};

updateHP();
loadShells();
