const display = document.getElementById('display');
const hunger = document.getElementById('hunger-bar');
const happiness = document.getElementById('happiness-bar');
const food = document.getElementById('food');
const hungerTitle = document.getElementById('hunger-title');

const now = new Date().getHours();

const stats = JSON.parse(window.localStorage.getItem('stats')) || { hunger: 100, happiness: 0, intimacy: 0 };
const updateHunger = () => {
    hunger.style.width = stats.hunger / 10 + "em";
    window.localStorage.setItem('stats', JSON.stringify(stats));
};
const updateHappiness = () => {
    happiness.style.width = stats.happiness / 10 + "em";
    window.localStorage.setItem('stats', JSON.stringify(stats));
};

updateHunger(); updateHappiness();

let showFood = true;

const neutral = ['dotted_line', 'expressionless', 'rolling_eyes', 'umamused', 'neutral'];
const sad = ['confused', 'crying', 'diagonal_mouth', 'disapointed', 'frowning', 'pensive', 'slightly_frowning', 'worried'];

const randomFace = () => {
    const random = Math.random();
    if (hunger < 10 || happiness < 10) {
        return sad[Math.floor(Math.random() * sad.length)];
    } else {
        return neutral[Math.floor(Math.random() * neutral.length)];
    }
};

const sleepOrAwake = () => {
    if (now > 20 || now < 6) {
        return "sleeping";
    } else {
        return randomFace();
    }
};

display.src = "public/" + sleepOrAwake() + ".svg";

let countDown;

const handleClick = () => {
    if (stats.happiness < 100) {
        stats.happiness = Math.min(stats.happiness + 5, 100);
        updateHappiness();
    }
    clearTimeout(countDown);
    display.src = "public/happy/grinning_squinting.svg";
    countDown = setTimeout(() => {
        setTimeout(() => {
            display.src = "public/" + sleepOrAwake() + ".svg";
        }, 4000);
        display.src = "public/neutral.svg";
    }, 2000);
};



food.setAttribute('draggable', true);

food.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', 'food');
});

display.addEventListener('dragover', (e) => {
    e.preventDefault();
    display.src = "public/drooling.svg";
});

const tabemono = ['chocolate', 'doughnut', 'dumpling', 'hamburger', 'steaming_bowl'];

display.addEventListener('drop', (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('text/plain');
    if (data === 'food') {
        if (stats.hunger < 100) {
            stats.hunger = Math.min(stats.hunger + 10, 100);
            updateHunger();
        }
        clearTimeout(countDown);
        countDown = setTimeout(() => {
            setTimeout(() => {
                display.src = "public/" + sleepOrAwake() + ".svg";
            }, 4000);
            display.src = "public/neutral.svg";
        }, 2000);
    }
    const nextFood = tabemono[Math.floor(Math.random() * tabemono.length)];

    food.src = `public/food/${nextFood}.svg`;
});

setInterval(() => {
    display.src = "public/" + sleepOrAwake() + ".svg";
}, 180000);

setInterval(() => {
    if (stats.hunger > 0) {
        stats.hunger--;
        hunger.style.width = stats.hunger / 10 + "em";
        window.localStorage.setItem('stats', JSON.stringify(stats));
    }
}, 120000);

setInterval(() => {
    if (stats.happiness > 0) {
        stats.happiness--;
        happiness.style.width = stats.happiness / 10 + "em";
        window.localStorage.setItem('stats', JSON.stringify(stats));
    }
    if (stats.happiness < 10) {

    }
}, 20000);

display.addEventListener('click', handleClick);
hungerTitle.addEventListener('mousedown', () => {
    showFood = !showFood;
    if (!showFood) {
        food.style.display = 'none';
    } else {
        food.style.display = 'block';
    }
    hungerTitle.style.scale = 2;
});
hungerTitle.addEventListener('mouseup', () => {
    hungerTitle.style.scale = 1;
});
