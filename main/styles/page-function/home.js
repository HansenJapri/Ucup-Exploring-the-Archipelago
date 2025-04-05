let character = document.querySelector(".character");
let map = document.querySelector(".map");
const locationAlert = document.querySelector(".location-alert");

let x = 90;
let y = 34;
let held_directions = [];
let speed = 1;
let lastLocation = "";



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