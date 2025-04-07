document.addEventListener('DOMContentLoaded', () => {
    let character = document.querySelector(".character");
    let map = document.querySelector(".map");
    const locationAlert = document.querySelector(".notification");

    let x = 90;
    let y = 34;
    let held_directions = [];
    let speed = 0.3; //walking speed nya gw lamain
    let lastLocation = "";

    let btnKe1 = document.querySelector(".btn-ke-1");
    let btnKe2 = document.querySelector(".btn-ke-2");
    let btnKe3 = document.querySelector(".btn-ke-3");
    let btnKe4 = document.querySelector(".btn-ke-4");

    const hungerBar = document.querySelector('.eat-bar .progress');
    const energyBar = document.querySelector('.energy-bar .progress');
    const funBar = document.querySelector('.happiness-bar .progress');
    const hygieneBar = document.querySelector('.hygiene-bar .progress');
    const moneyDisplay = document.querySelector('.money');

    //status awal
    let hunger = 100;
    let energy = 100;
    let fun = 100;
    let hygiene = 100;
    let money = 30000;

    //button awal
    btnKe1.textContent = "-";
    btnKe2.textContent = "-";
    btnKe3.textContent = "-";
    btnKe4.textContent = "-";

    function updateStats() {
        //biar bar nya ga overflow
        hunger = Math.max(0, Math.min(100, hunger));
        energy = Math.max(0, Math.min(100, energy));
        fun = Math.max(0, Math.min(100, fun));
        hygiene = Math.max(0, Math.min(100, hygiene));
        money = Math.max(0, money);

        //style bar biar persennya sesuai ukuran bar, bukan screen
        hungerBar.style.width = hunger + "%";
        energyBar.style.width = energy + "%";
        funBar.style.width = fun + "%";
        hygieneBar.style.width = hygiene + "%";
        moneyDisplay.textContent = money;

        if (hunger <= 20 || energy <= 20 || hygiene <= 20 || fun <= 20) {
            showLocationAlert("Warning: Low stats!");
        }
    }
    updateStats();

    //update koordinat lokasinya biar lebih tepat
    const locations = [
        { name: "HOME", x: 40, y: 45, radius: 36},
        { name: "FARM", x: 180, y: 20, radius: 40},
        { name: "PIG ISLAND", x: 200, y: 130, radius:40},
        { name: "GYM", x: 37, y: 88, radius: 35 },
        { name: "PARK", x: 122, y: 83, radius:35}
    ];

    //bikin marker lokasi buat deteksi karakter nanti
    function createLocationMarkers() {
        const pixelSize = parseInt(
            getComputedStyle(document.documentElement).getPropertyValue('--pixel-size')
        );

        locations.forEach(location => {
            const marker = document.createElement('div');
            marker.className = 'location-marker';
            
            const size = location.radius * 2 * pixelSize;
            
            marker.style.width = `${size}px`;
            marker.style.height = `${size}px`;
            marker.style.left = `${(location.x * pixelSize) - (size / 2)}px`;
            marker.style.top = `${(location.y * pixelSize) - (size / 2)}px`;
            
            marker.style.border = '2px solid rgba(255, 255, 255, 0.3)';
            marker.style.borderRadius = '50%';
            marker.style.pointerEvents = 'none';
            
            const label = document.createElement('div');
            label.className = 'location-label';
            label.textContent = location.name;
            label.style.left = `${location.x * pixelSize}px`;
            label.style.top = `${location.y * pixelSize - 20}px`;
            
            map.appendChild(marker);
            map.appendChild(label);
        });
    }

    createLocationMarkers();

    //reset button setiap pindah lokasi
    //bikin button baru biar ga ada event listener yang nempel di button lama
    function clearButtonListeners() {
        const newBtn1 = btnKe1.cloneNode(true);
        const newBtn2 = btnKe2.cloneNode(true);
        const newBtn3 = btnKe3.cloneNode(true);
        const newBtn4 = btnKe4.cloneNode(true);
        
        btnKe1.parentNode.replaceChild(newBtn1, btnKe1);
        btnKe2.parentNode.replaceChild(newBtn2, btnKe2);
        btnKe3.parentNode.replaceChild(newBtn3, btnKe3);
        btnKe4.parentNode.replaceChild(newBtn4, btnKe4);

        return {
            btnKe1: newBtn1,
            btnKe2: newBtn2,
            btnKe3: newBtn3,
            btnKe4: newBtn4
        };
    }

    //kalo uang ga cukup, action ga dilakuin > status ga berubah, kasih alert
    //kalo cukup, action dilakuin > status berubah
    function canAfford(cost) {
        if (money < Math.abs(cost)) {
            showLocationAlert("Not enough money!");
            return false;
        }
        return true;
    }

    //cek lokasi karakter, kalo di dalam radius lokasi, kasih alert dan update button
    function checkLocation() {
        let inLocation = false;
        let closestLocation = null;
        let shortestDistance = Infinity;

        for (const location of locations) {
            const dx = location.x - x;
            const dy = location.y - y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance <= location.radius) {
                inLocation = true;
                
                //buat kalo karakter ada di 2 lokasi, ambil yang paling deket
                if (distance < shortestDistance) { 
                    shortestDistance = distance;
                    closestLocation = location;
                }
            }
        }

        //kalo karakter di lokasi yang sama, ga usah kasih alert lagi
        if (inLocation && closestLocation) {
            if (lastLocation !== closestLocation.name) {
                lastLocation = closestLocation.name;
                showLocationAlert(closestLocation.name);
                
                const buttons = clearButtonListeners();
                btnKe1 = buttons.btnKe1;
                btnKe2 = buttons.btnKe2;
                btnKe3 = buttons.btnKe3;
                btnKe4 = buttons.btnKe4;

                updateLocationButtons(closestLocation.name);
            }
        } else if (!inLocation && lastLocation !== "") { //kalo karakter ga di lokasi, reset button dan alert
            lastLocation = "";
            const buttons = clearButtonListeners();
            btnKe1 = buttons.btnKe1;
            btnKe2 = buttons.btnKe2;
            btnKe3 = buttons.btnKe3;
            btnKe4 = buttons.btnKe4;
            
            btnKe1.textContent = "-";
            btnKe2.textContent = "-";
            btnKe3.textContent = "-";
            btnKe4.textContent = "-";
            showLocationAlert("Welcome to Piggy Playhouse!");
        }
    }

    //update button sesuai lokasi karakter
    function updateLocationButtons(locationName) {
        switch(locationName) {
            case "HOME":
                btnKe1.textContent = "Eat";
                btnKe2.textContent = "Shower";
                btnKe3.textContent = "Watch TV";
                btnKe4.textContent = "Sleep";
                setupHomeButtons();
                break;
            case "FARM":
                btnKe1.textContent = "Harvest Rice";
                btnKe2.textContent = "Milk Cow";
                btnKe3.textContent = "Collect Eggs";
                btnKe4.textContent = "Transport Crops";
                setupFarmButtons();
                break;
            case "PIG ISLAND":
                btnKe1.textContent = "Swim";
                btnKe2.textContent = "Feed Pigs";
                btnKe3.textContent = "Picnic";
                btnKe4.textContent = "Ride Rollercoaster";
                setupPigIslandButtons();
                break;
            case "GYM":
                btnKe1.textContent = "Buy Pre-Workout Drink";
                btnKe2.textContent = "Workout";
                btnKe3.textContent = "Shower";
                btnKe4.textContent = "Sauna";
                setupGymButtons();
                break;
            case "PARK":
                btnKe1.textContent = "Clean the park";
                btnKe2.textContent = "Meditation";
                btnKe3.textContent = "Buy snack";
                btnKe4.textContent = "Jogging";
                setupParkButtons();
                break;
        }
    }

    //isi button sesuai lokasi
    function setupHomeButtons() {
        btnKe1.addEventListener("click", function() {
            if (!canAfford(-10000)) return;
            hunger += 20;
            energy += 10;
            fun += 5;
            hygiene -= 5;
            money -= 10000;
            updateStats();
        });

        btnKe2.addEventListener("click", function() {
            hygiene += 20;
            energy -= 5;
            updateStats();
        });

        btnKe3.addEventListener("click", function() {
            fun += 10;
            energy -= 5;
            hunger -= 5;
            updateStats();
        });

        btnKe4.addEventListener("click", function() {
            energy += 25;
            hygiene -= 10;
            updateStats();
        });
    }

    function setupFarmButtons() {
        btnKe1.addEventListener("click", function() {
            energy -= 10;
            hygiene -= 10;
            hunger -= 5;
            fun -= 5;
            money += 15000;
            updateStats();
        });

        btnKe2.addEventListener("click", function() {
            energy -= 10;
            hygiene -= 10;
            hunger -= 5;
            fun -= 5;
            money += 15000;
            updateStats();
        });

        btnKe3.addEventListener("click", function() {
            energy -= 10;
            hygiene -= 10;
            hunger -= 5;
            fun -= 5;
            money += 10000;
            updateStats();
        });

        btnKe4.addEventListener("click", function() {
            energy -= 20;
            hygiene -= 15;
            hunger -= 10;
            fun += 5;
            money += 25000;
            updateStats();
        });
    }

    function setupPigIslandButtons() {
        btnKe1.addEventListener("click", function() {
            fun += 25;
            energy -= 15;
            hunger -= 5;
            hygiene -= 10;
            updateStats();
        });

        btnKe2.addEventListener("click", function() {
            if (!canAfford(-10000)) return;
            fun += 15;
            hunger -= 5;
            hygiene -= 5;
            energy -= 5;
            money -= 10000;
            updateStats();
        });

        btnKe3.addEventListener("click", function() {
            if (!canAfford(-15000)) return;
            fun += 15;
            hunger += 10;
            energy += 5;
            hygiene -= 10;
            money -= 15000;
            updateStats();
        });

        btnKe4.addEventListener("click", function() {
            if (!canAfford(-15000)) return;
            fun += 30;
            hygiene -= 10;
            energy -= 10;
            money -= 15000;
            updateStats();
        });
    }

    function setupGymButtons() {
        btnKe1.addEventListener("click", function() {
            if (!canAfford(-10000)) return;
            hunger += 5;
            energy += 25;
            money -= 10000;
            updateStats();
        });

        btnKe2.addEventListener("click", function() {
            if (!canAfford(-20000)) return;
            hygiene -= 15;
            energy -= 20;
            hunger -= 20;
            fun += 20;
            money -= 10000;
            updateStats();
        });

        btnKe3.addEventListener("click", function() {
            hygiene += 20;
            energy -= 5;
            updateStats();
        });

        btnKe4.addEventListener("click", function() {
            hygiene -= 10;
            energy += 10;
            fun += 5;
            updateStats();
        });
    }

    function setupParkButtons() {
        btnKe1.addEventListener("click", function() {
            hygiene -= 10;
            hunger -= 5;
            energy -= 10;
            fun -= 5;
            money += 10000;
            updateStats();
        });

        btnKe2.addEventListener("click", function() {
            fun += 25;
            energy += 5;
            updateStats();
        });

        btnKe3.addEventListener("click", function() {
            if (!canAfford(-5000)) return;
            hunger += 10;
            money -= 5000;
            updateStats();
        });

        btnKe4.addEventListener("click", function() {
            fun += 10;
            hunger -= 10;
            energy -= 10;
            hygiene -= 10;
            updateStats();
        });
    }

    //fungsi buat ngasih tau lokasi karakter
    function showLocationAlert(message) {
        locationAlert.textContent = message;
        locationAlert.style.display = "block";
        
        
        if (lastLocation && message === lastLocation) {
            locationAlert.textContent = `At ${lastLocation}`;
        }
    }

    const placeCharacter = () => {
        let pixelSize = parseInt(
            getComputedStyle(document.documentElement).getPropertyValue('--pixel-size')
        );

        const held_direction = held_directions[0];
        if (held_direction) {
            let newX = x;
            let newY = y;

            if (held_direction === directions.right) { newX += speed; }
            if (held_direction === directions.left) { newX -= speed; }
            if (held_direction === directions.down) { newY += speed; }
            if (held_direction === directions.up) { newY -= speed; }

            let leftLimit = -4;
            let rightLimit = (16 * 13) + 5;
            let topLimit = 18;
            let bottomLimit = (15 * 8);

            x = Math.max(leftLimit, Math.min(rightLimit, newX));
            y = Math.max(topLimit, Math.min(bottomLimit, newY));

            character.setAttribute("facing", held_direction);
        }
        character.setAttribute("walking", held_direction ? "true" : "false");

        checkLocation();
        
        character.style.transform = `translate3d( ${x * pixelSize}px, ${y * pixelSize - 80}px, 0 )`;
    }

    const step = () => {
        placeCharacter();
        window.requestAnimationFrame(() => {
            step();
        });
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
            held_directions.unshift(dir);
        }
    });

    document.addEventListener("keyup", (e) => {
        var dir = keys[e.which];
        var index = held_directions.indexOf(dir);
        if (index > -1) {
            held_directions.splice(index, 1);
        }
    });

    var isPressed = false;
    const removePressedAll = () => {
        document.querySelectorAll(".dpad-button").forEach(d => {
            d.classList.remove("pressed");
        });
    }
    document.body.addEventListener("mousedown", () => {
        isPressed = true;
    });
    document.body.addEventListener("mouseup", () => {
        isPressed = false;
        held_directions = [];
        removePressedAll();
    });
    const handleDpadPress = (direction, click) => {
        if (click) {
            isPressed = true;
        }
        held_directions = (isPressed) ? [direction] : [];

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

        if (gameHour >= 1 && gameHour < 12) {
            morning.textContent = "Good morning ";
        } else if (gameHour >= 12 && gameHour < 18) {
            morning.textContent = "Good afternoon ";
        } else {
            morning.textContent = "Good evening ";
        }

        dayEl.textContent = dayNames[currentDayIndex];
        dayKeEl.textContent = `Day ${gameDay}`;
    }

    //1 detik = 1 menit, tiap jam kurangin status
    setInterval(() => {
        gameMinute += 1; 
        
        if (gameMinute >= 60) {
            gameMinute = 0;
            gameHour += 1;
            
            hunger -= 5;
            energy -= 5;
            hygiene -= 5;
            fun -= 5;
            updateStats();
        }

        if (gameHour >= 24) {
            gameHour = 0;
            currentDayIndex = (currentDayIndex + 1) % 7;
            gameDay += 1;
        }

        updateUI();
    }, 1000);

    updateUI();

    // Initialize character sprite
    const characterSprite = document.querySelector('.character_spritesheet');
    if (characterSprite) {
        characterSprite.style.opacity = '0';
        setTimeout(() => {
            characterSprite.style.opacity = '1';
        }, 100);
    }
});
