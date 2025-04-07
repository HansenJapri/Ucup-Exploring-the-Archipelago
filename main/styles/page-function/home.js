let character = document.querySelector(".character");
let map = document.querySelector(".map");
const locationAlert = document.querySelector(".location-alert");

let x = 90;
let y = 34;
let held_directions = [];
let speed = 1;
let lastLocation = "";


const btnKe1 = document.querySelector(".btn-ke-1");
const btnKe2 = document.querySelector(".btn-ke-2");
const btnKe3 = document.querySelector(".btn-ke-3");
const btnKe4 = document.querySelector(".btn-ke-4");

const hungerBar = document.querySelector('.eat-bar .progress');
const sleepBar = document.querySelector('.sleep-bar .progress');
const funBar = document.querySelector('.happiness-bar .progress');
const hygieneBar = document.querySelector('.hygiene-bar .progress');
const moneyDisplay = document.querySelector('.money');

let hunger = 70;
let sleep = 80;
let fun = 60;
let hygiene = 90;
let money = 100000;

hungerBar.style.width = hunger + "%";
sleepBar.style.width = sleep + "%";
funBar.style.width = fun + "%";
hygieneBar.style.width = hygiene + "%";
moneyDisplay.textContent = money;

btnKe1.textContent = "-";
btnKe2.textContent = "-";
btnKe3.textContent = "-";
btnKe4.textContent = "-";

const actions = {
    HOME: [
        { name: "Eat", hunger: +20, money: -10000 },
        { name: "Shower", hygiene: +20 },
        { name: "Watch", fun: +15, sleep: -5 },
        { name: "Sleep", sleep: +25 }
    ],
    FARM: [
        { name: "Harvest Rice", money: +20000, sleep: -10, hygiene: -15 },
        { name: "Milk Cow", money: +15000, hygiene: -10, fun: -10 },
        { name: "Collect Eggs", money: +10000, hunger: -5, sleep: -5 },
        { name: "Transport Crops", money: +30000, hunger: -15, hygiene: -20 }
    ],
    PIG_ISLAND: [
        { name: "Swim", fun: +25, hygiene: -10 },
        { name: "Feed Pigs", fun: +15, hunger: -5 },
        { name: "Picnic", fun: +20, sleep: -10 },
        { name: "Ride Attraction", fun: +30, money: -10000 }
    ],
    GYM: [
        { name: "Cardio", hunger: -10, sleep: -15, hygiene: -10 },
        { name: "Weightlift", hygiene: -15, fun: -10 },
        { name: "Yoga", fun: +20, sleep: -10 },
        { name: "Sauna", hygiene: -10, sleep: +10 }
    ],
    PARK: [
        { name: "Clean the park", hygiene: +10, fun: -5 },
        { name: "Meditation", fun: +25, sleep: +5 },
        { name: "Buy snack", money: -5000, hunger: +10 },
        { name: "Jogging", fun: +10, hunger: -10, sleep: -10 }
    ]
};


const locations = [
    { name: "HOME", x: 20, y: 15, radius: 30 },
    { name: "FARM", x: 170, y: 10, radius: 30 },
    { name: "PIG ISLAND", x: 160, y: 80, radius: 20 },
    { name: "GYM", x: 30, y: 90, radius: 40 },
    { name: "PARK", x: 100, y: 65, radius: 25 }
];

function checkLocation() {
    for (const location of locations) {
        const dx = (location.x - x);
        const dy = (location.y - y);
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < location.radius) {
            if (lastLocation !== location.name) {
                showLocationAlert(location.name);
                lastLocation = location.name;



                if (lastLocation == "HOME") {
                    btnKe1.textContent = "Eat";
                    btnKe2.textContent = "Shower";
                    btnKe3.textContent = "Watch";
                    btnKe4.textContent = "Sleep";
                    btnKe1.addEventListener("click",function() {
                        hunger += 20;
                        money -=10000;
                        hungerBar.style.width = hunger + "%";
                        moneyDisplay.textContent = money;
                    });

                    btnKe2.addEventListener("click",function() {
                        hunger += 20;
                        money -=10000;
                        hungerBar.style.width = hunger + "%";
                        moneyDisplay.textContent = money;
                    });
                    btnKe3.addEventListener("click",function() {
                        hunger += 20;
                        money -=10000;
                        hungerBar.style.width = hunger + "%";
                        moneyDisplay.textContent = money;
                    });
                    btnKe4.addEventListener("click",function() {
                        hunger += 20;
                        money -=10000;
                        hungerBar.style.width = hunger + "%";
                        moneyDisplay.textContent = money;
                    });

                } else if (lastLocation == "FARM") {
                    btnKe1.textContent = "Harvest Rice";
                    btnKe2.textContent = "Milk Cow";
                    btnKe3.textContent = "Collect Eggs";
                    btnKe4.textContent = "Transport Crops";
                    btnKe1.addEventListener("click",function() {
                        sleep -= 10;
                        hygiene -= 15;
                        money += 20000;
                        sleepBar.style.width = sleep + "%";
                        hygieneBar.style.width = hygiene + "%";
                        moneyDisplay.textContent = money;
                    });
                    btnKe2.addEventListener("click",function() {
                        hygiene -= 10;
                        fun -= 10;
                        money += 15000;
                        hygieneBar.style.width = hygiene + "%";
                        funBar.style.width = fun + "%";
                        moneyDisplay.textContent = money;
                    });
                    btnKe3.addEventListener("click",function() {
                        hunger -= 5;
                        sleep -= 5;
                        money += 10000;
                        hungerBar.style.width = hunger + "%";
                        sleepBar.style.width = sleep + "%";
                        moneyDisplay.textContent = money;
                    });
                    btnKe4.addEventListener("click",function() {
                        hunger -= 15;
                        hygiene -= 20;
                        money += 30000;
                        hungerBar.style.width = hunger + "%";
                        hygieneBar.style.width = hygiene + "%";
                        moneyDisplay.textContent = money;
                    });
                } else if (lastLocation == "PIG ISLAND") {
                    btnKe1.textContent = "Swim";
                    btnKe2.textContent = "Feed Pigs";
                    btnKe3.textContent = "Picnic";
                    btnKe4.textContent = "Ride Attraction";
                    btnKe1.addEventListener("click",function() {
                        fun += 25;
                        hygiene -= 10;
                        funBar.style.width = fun + "%";
                        hygieneBar.style.width = hygiene + "%";
                    });
                    btnKe2.addEventListener("click",function() {
                        fun += 15;
                        hunger -= 5;
                        funBar.style.width = fun + "%";
                        hungerBar.style.width = hunger + "%";
                    });
                    btnKe3.addEventListener("click",function() {
                        fun += 20;
                        sleep -= 10;
                        funBar.style.width = fun + "%";
                        sleepBar.style.width = sleep + "%";
                    });
                    btnKe4.addEventListener("click",function() {
                        fun += 30;
                        money -= 10000;
                        funBar.style.width = fun + "%";
                        moneyDisplay.textContent = money;
                    });
                } else if (lastLocation == "GYM") {
                    btnKe1.textContent = "Cardio";
                    btnKe2.textContent = "Weightlift";
                    btnKe3.textContent = "Yoga";
                    btnKe4.textContent = "Sauna";
                    btnKe1.addEventListener("click",function() {
                        hunger -= 10;
                        sleep -= 15;
                        hygiene -= 10;
                        hungerBar.style.width = hunger + "%";
                        sleepBar.style.width = sleep + "%";
                        hygieneBar.style.width = hygiene + "%";
                    });
                    btnKe2.addEventListener("click",function() {
                        hygiene -= 15;
                        fun -= 10;
                        hygieneBar.style.width = hygiene + "%";
                        funBar.style.width = fun + "%";
                    });
                    btnKe3.addEventListener("click",function() {
                        fun += 20;
                        sleep -= 10;
                        funBar.style.width = fun + "%";
                        sleepBar.style.width = sleep + "%";
                    });
                    btnKe4.addEventListener("click",function() {
                        hygiene -= 10;
                        sleep += 10;
                        hygieneBar.style.width = hygiene + "%";
                        sleepBar.style.width = sleep + "%";
                    });
                } else if (lastLocation == "PARK") {
                    btnKe1.textContent = "Clean the park";
                    btnKe2.textContent = "Meditation";
                    btnKe3.textContent = "Buy snack";
                    btnKe4.textContent = "Jogging";
                    btnKe1.addEventListener("click",function() {
                        hygiene += 10;
                        fun -= 5;
                        hygieneBar.style.width = hygiene + "%";
                        funBar.style.width = fun + "%";
                    });
                    btnKe2.addEventListener("click",function() {
                        fun += 25;
                        sleep += 5;
                        funBar.style.width = fun + "%";
                        sleepBar.style.width = sleep + "%";
                    });
                    btnKe3.addEventListener("click",function() {
                        money -= 5000;
                        hunger += 10;
                        moneyDisplay.textContent = money;
                        hungerBar.style.width = hunger + "%";
                    });
                    btnKe4.addEventListener("click",function() {
                        fun += 10;
                        hunger -= 10;
                        sleep -= 10;
                        funBar.style.width = fun + "%";
                        hungerBar.style.width = hunger + "%";
                        sleepBar.style.width = sleep + "%";
                    });
                }
            }
            return;
        }
    }

    lastLocation = "";
}





function showLocationAlert(locationName) {
    // locations.forEach(location => {
    //     locationAlert.textContent = `${location.name} posisi x : ${location.x} , y : ${location.y}`
    // })
    locationAlert.textContent = `Arrived at ${locationName}!`;
    locationAlert.style.display = "block";

}


const placeCharacter = () => {

    let pixelSize = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue('--pixel-size')
    );

    const held_direction = held_directions[0];
    if (held_direction) {
        if (held_direction === directions.right) { x += speed; }
        if (held_direction === directions.left) { x -= speed; }
        if (held_direction === directions.down) { y += speed; }
        if (held_direction === directions.up) { y -= speed; }
        character.setAttribute("facing", held_direction);
    }
    character.setAttribute("walking", held_direction ? "true" : "false");

    let leftLimit = -4;
    let rightLimit = (16 * 13) + 5;
    let topLimit = 18;
    let bottomLimit = (16 * 8);
    if (x < leftLimit) { x = leftLimit; }
    if (x > rightLimit) { x = rightLimit; }
    if (y < topLimit) { y = topLimit; }
    if (y > bottomLimit) { y = bottomLimit; }

    checkLocation();
    //   let camera_left = pixelSize * 66;
    //   let camera_top = pixelSize * 42;

    //   map.style.transform = `translate3d( ${-x*pixelSize+camera_left}px, ${-y*pixelSize+camera_top}px, 0 )`;
    character.style.transform = `translate3d( ${x * pixelSize}px, ${y * pixelSize - 80}px, 0 )`;
}


const step = () => {
    placeCharacter();
    window.requestAnimationFrame(() => {
        step();
    })
}
step();




const directions = {
    up: "up",
    down: "down",
    left: "left",
    right: "right",
}
const keys = {
    38: directions.up,
    87: directions.up,
    37: directions.left,
    65: directions.left,
    39: directions.right,
    68: directions.right,
    40: directions.down,
    83: directions.down,
}
document.addEventListener("keydown", (e) => {
    var dir = keys[e.which];
    if (dir && held_directions.indexOf(dir) === -1) {
        held_directions.unshift(dir)
    }
})

document.addEventListener("keyup", (e) => {
    var dir = keys[e.which];
    var index = held_directions.indexOf(dir);
    if (index > -1) {
        held_directions.splice(index, 1)
    }
});



var isPressed = false;
const removePressedAll = () => {
    document.querySelectorAll(".dpad-button").forEach(d => {
        d.classList.remove("pressed")
    })
}
document.body.addEventListener("mousedown", () => {
    console.log('mouse is down')
    isPressed = true;
})
document.body.addEventListener("mouseup", () => {
    console.log('mouse is up')
    isPressed = false;
    held_directions = [];
    removePressedAll();
})
const handleDpadPress = (direction, click) => {
    if (click) {
        isPressed = true;
    }
    held_directions = (isPressed) ? [direction] : []

    if (isPressed) {
        removePressedAll();
        document.querySelector(".dpad-" + direction).classList.add("pressed");
    }
}
document.querySelector(".dpad-left").addEventListener("touchstart", (e) => handleDpadPress(directions.left, true));
document.querySelector(".dpad-up").addEventListener("touchstart", (e) => handleDpadPress(directions.up, true));
document.querySelector(".dpad-right").addEventListener("touchstart", (e) => handleDpadPress(directions.right, true));
document.querySelector(".dpad-down").addEventListener("touchstart", (e) => handleDpadPress(directions.down, true));

document.querySelector(".dpad-left").addEventListener("mousedown", (e) => handleDpadPress(directions.left, true));
document.querySelector(".dpad-up").addEventListener("mousedown", (e) => handleDpadPress(directions.up, true));
document.querySelector(".dpad-right").addEventListener("mousedown", (e) => handleDpadPress(directions.right, true));
document.querySelector(".dpad-down").addEventListener("mousedown", (e) => handleDpadPress(directions.down, true));

document.querySelector(".dpad-left").addEventListener("mouseover", (e) => handleDpadPress(directions.left));
document.querySelector(".dpad-up").addEventListener("mouseover", (e) => handleDpadPress(directions.up));
document.querySelector(".dpad-right").addEventListener("mouseover", (e) => handleDpadPress(directions.right));
document.querySelector(".dpad-down").addEventListener("mouseover", (e) => handleDpadPress(directions.down));


// function readMouse(e) {
//     let result_x = document.getElementById("resultX");
//     let result_y = document.getElementById("resultY");

//     result_x.innerHTML = e.clientX;
//     result_y.innerHTML = e.clientX;
// }

// document.onmousemove = readMouse;


let nameTitle = document.querySelector(".name");
let storedName = localStorage.getItem("playerName");

if (storedName) {
    nameTitle.textContent = storedName;

    localStorage.removeItem("playerName");
}


let morning = document.querySelector(".morning");
let dayEl = document.querySelector(".day");
let dayKeEl = document.querySelector(".day-ke");
let timeEl = document.querySelector(".time");


let gameHour = 9;
let gameMinute = 0;
let gameDay = 1;
let dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
let currentDayIndex = 0;

function updateUI() {
    let hourStr = gameHour.toString().padStart(2, '0');
    let minuteStr = gameMinute.toString().padStart(2, '0');
    timeEl.textContent = `${hourStr}:${minuteStr}`;

    if (gameHour >= 1 && gameHour <= 10) {
        morning.textContent = "Good morning ";
    } else if (gameHour >= 11 && gameHour <= 18) {
        morning.textContent = "Good afternoon ";
    } else {
        morning.textContent = "Good night ";
    }

    dayEl.textContent = dayNames[currentDayIndex];
    dayKeEl.textContent = `Day ${gameDay}`;
}


setInterval(() => {
    gameHour += 1;

    if (gameHour > 24) {
        gameHour = 1;
        currentDayIndex = (currentDayIndex + 1) % 7;
        gameDay += 1;
    }

    updateUI();
}, 5000);

updateUI();