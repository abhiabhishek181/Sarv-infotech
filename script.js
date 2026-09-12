const button = document.getElementById("inspireBtn");

const message = document.getElementById("message");

const messages = [
    "Great achievements begin with a dream and are achieved through consistent effort.",
    "Hard work can turn talent into excellence.",
    "Never stop improving yourself, even when success takes time.",
    "Stay focused on your goal and keep moving forward."
];

let index = 0;

button.addEventListener("click", function () {

    index++;

    if (index >= messages.length) {
        index = 0;
    }

    message.textContent = messages[index];

});


const navLinks = document.querySelectorAll(".nav-links a");

navLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        navLinks.forEach(function (item) {
            item.style.color = "white";
        });

        link.style.color = "#f4c430";

    });

});


const animatedElements = document.querySelectorAll(
    ".achievement-card, .timeline-item, .qualities > div"
);

const observer = new IntersectionObserver(
    function (entries) {

        entries.forEach(function (entry) {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";

            }

        });

    },
    {
        threshold: 0.15
    }
);


animatedElements.forEach(function (element) {

    element.style.opacity = "0";
    element.style.transform = "translateY(20px)";
    element.style.transition = "0.6s ease";

    observer.observe(element);

});
