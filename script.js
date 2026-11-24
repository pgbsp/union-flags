const flags = Array.from({ length: 10 }, (_, index) => ({
    id: index + 1,
    title: `Union Flag ${index + 1}`,
    year: "1861",
    designer: "Research Pending",
    status: "In Service",
    image: `flags/${String(index + 1).padStart(2, "0")}.jpg`,
    description:
        "Replace this text with a description of the flag.",
    context:
        "Replace this text with historical background information.",
    interpretation:
        "Replace this text with interpretive narrative content."
}));

flags[0] = {
    id: 1,
    title: "34-Star United States Flag",
    year: "1861",
    designer: "United States Government",
    status: "National Flag",
    image: "flags/01-34-star.jpg",

    description:
        "The 34-star United States flag was the national flag in use when the American Civil War began.",

    context:
        "Kansas entered the Union in January 1861, adding the thirty-fourth star. Despite secession, the federal government did not remove stars representing the seceded states.",

    interpretation:
        "The continued inclusion of all states reflected the Union's position that the United States remained indivisible and that secession was not legally recognized."
};

let current = 0;

const flagImage = document.getElementById("flagImage");
const flagTitle = document.getElementById("flagTitle");
const flagYear = document.getElementById("flagYear");
const flagDesigner = document.getElementById("flagDesigner");
const flagStatus = document.getElementById("flagStatus");

const flagDescription = document.getElementById("flagDescription");
const historicalContext = document.getElementById("historicalContext");
const interpretation = document.getElementById("interpretation");

const currentIndex = document.getElementById("currentIndex");
const totalFlags = document.getElementById("totalFlags");

const timeline = document.getElementById("timeline");

totalFlags.textContent = flags.length;

function buildTimeline() {

    timeline.innerHTML = "";

    flags.forEach((flag, index) => {

        const marker = document.createElement("button");

        marker.classList.add("timeline-marker");

        marker.textContent = index + 1;

        marker.addEventListener("click", () => {

            current = index;
            loadFlag(current);

        });

        timeline.appendChild(marker);
    });
}

function updateTimeline() {

    document
        .querySelectorAll(".timeline-marker")
        .forEach((marker, index) => {

            marker.classList.toggle(
                "active",
                index === current
            );

        });
}

function loadFlag(index) {

    const flag = flags[index];

    flagImage.src = flag.image;
    flagImage.alt = flag.title;

    flagTitle.textContent = flag.title;
    flagYear.textContent = flag.year;
    flagDesigner.textContent = flag.designer;
    flagStatus.textContent = flag.status;

    flagDescription.textContent = flag.description;
    historicalContext.textContent = flag.context;
    interpretation.textContent = flag.interpretation;

    currentIndex.textContent = index + 1;

    updateTimeline();
}

function nextFlag() {

    current++;

    if (current >= flags.length) {

        current = 0;
    }

    loadFlag(current);
}

function prevFlag() {

    current--;

    if (current < 0) {

        current = flags.length - 1;
    }

    loadFlag(current);
}

/* BUTTONS */

document
    .getElementById("nextBtn")
    .addEventListener("click", nextFlag);

document
    .getElementById("prevBtn")
    .addEventListener("click", prevFlag);

/* KEYBOARD */

document.addEventListener("keydown", (e) => {

    if (e.key === "ArrowRight") {

        nextFlag();
    }

    if (e.key === "ArrowLeft") {

        prevFlag();
    }

});

/* SWIPE + DRAG */

const imagePanel = document.getElementById("imagePanel");

let startX = 0;
let currentX = 0;
let isDragging = false;

const SWIPE_THRESHOLD = 75;

/* TOUCH */

imagePanel.addEventListener("touchstart", (e) => {

    startX = e.touches[0].clientX;
    currentX = startX;
    isDragging = true;

}, { passive: true });

imagePanel.addEventListener("touchmove", (e) => {

    if (!isDragging) return;

    currentX = e.touches[0].clientX;

}, { passive: true });

imagePanel.addEventListener("touchend", () => {

    if (!isDragging) return;

    const distance = currentX - startX;

    if (distance > SWIPE_THRESHOLD) {

        prevFlag();
    }
    else if (distance < -SWIPE_THRESHOLD) {

        nextFlag();
    }

    isDragging = false;
});

/* DESKTOP DRAG */

imagePanel.addEventListener("mousedown", (e) => {

    startX = e.clientX;
    currentX = startX;
    isDragging = true;

    imagePanel.classList.add("dragging");

});

window.addEventListener("mousemove", (e) => {

    if (!isDragging) return;

    currentX = e.clientX;

});

window.addEventListener("mouseup", () => {

    if (!isDragging) return;

    const distance = currentX - startX;

    if (distance > SWIPE_THRESHOLD) {

        prevFlag();
    }
    else if (distance < -SWIPE_THRESHOLD) {

        nextFlag();
    }

    imagePanel.classList.remove("dragging");

    isDragging = false;
});

/* PREVENT GHOST DRAG */

flagImage.addEventListener("dragstart", (e) => {

    e.preventDefault();

});

buildTimeline();
loadFlag(current);
