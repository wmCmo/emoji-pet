const display = document.getElementById('display');

const now = new Date().getHours();

const randomBoredFace = () => {
    const random = Math.random();
    if (random > 0.75) {
        return "unamused";
    } else if (random > 0.5) {
        return "expressionless";
    } else if (random > 0.25) {
        return "dotted_line";
    } else {
        return "rolling_eyes";
    }
};

const sleepOrAwake = () => {
    if (now > 20 || now < 6) {
        return randomBoredFace();
    } else {
        return "sleeping";
    }
};

display.src = "public/" + sleepOrAwake() + ".svg";

let countDown;

const sleepCountDown = () => {
    clearTimeout(countDown);
    display.src = "public/" + "neutral.svg";
    countDown = setTimeout(() => {
        display.src = "public/" + sleepOrAwake() + ".svg";
    }, 180000);
};

display.addEventListener('click', sleepCountDown);
display.addEventListener('mouseover', sleepCountDown);
