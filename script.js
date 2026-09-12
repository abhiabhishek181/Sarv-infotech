const inspireBtn = document.getElementById("inspireBtn");
const message = document.getElementById("message");

const quotes = [
    "Dream big. Work hard. Never give up.",
    "Every champion was once a beginner who refused to quit.",
    "Success is built one disciplined day at a time.",
    "The pool is only the beginning. The real victory is believing in yourself."
];

inspireBtn.addEventListener("click", function () {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    message.textContent = randomQuote;
});

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", function () {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (pageYOffset >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.style.color = "";
        if (link.getAttribute("href") === "#" + current) {
            link.style.color = "#ffd23f";
        }
    });
});
