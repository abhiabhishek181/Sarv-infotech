const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", function () {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        themeBtn.textContent = "Light Mode";
    } else {
        themeBtn.textContent = "Dark Mode";
    }

});

const quoteBtn = document.getElementById("quoteBtn");
const message = document.getElementById("message");

const messages = [
    "Dream big and keep working for it.",
    "Hard work creates extraordinary results.",
    "Never give up when the goal is important.",
    "Discipline is the foundation of success.",
    "Believe in yourself and keep moving forward."
];

quoteBtn.addEventListener("click", function () {

    const randomNumber =
        Math.floor(Math.random() * messages.length);

    message.textContent = messages[randomNumber];

});
