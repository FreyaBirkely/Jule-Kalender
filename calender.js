let dateObject = new Date()

let currentDate = dateObject.getDate()
// currentDate = 24

const items = document.querySelectorAll(".item")


// Tomt array der holder styr på om lågerne er åbne
let openOrClosed = []


// Check local storage
if (localStorage.days) {
    openOrClosed = JSON.parse(localStorage.getItem("days"))
}


// Loop hvor vi sætter en click event på hver låge
items.forEach(function (element, index) {
    element.addEventListener("click", clickHandler)

    if (openOrClosed[index] == true) {
        element.classList.add("open")
    }
})


function clickHandler(event) {
    if (currentDate >= this.dataset.date) {

        if (this.classList.contains("open")) {
            this.classList.remove("open")
            openOrClosed[this.dataset.date - 1] = false
        }
        else {
            this.classList.add("open")
            openOrClosed[this.dataset.date - 1] = true
        }

        localStorage.setItem("days", JSON.stringify(openOrClosed))
    }
    else {
        alert("Du må endnu ikke åbnne denne låge")
    }
}



// MASONRY LOGIK (Forbliver uændret og tilpasser højdere automatisk)
function resizeGridItems() {
    const container = document.querySelector(".item__container");
    const rowGap =
        parseInt(
            window
                .getComputedStyle(container)
                .getPropertyValue("grid-row-gap"),
        ) || 40;
    const rowHeight = 10;

    items.forEach((item) => {
        const backImage = item.querySelector(".open__bg");

        if (backImage) {
            const updateHeight = () => {
                const itemWidth =
                    item.getBoundingClientRect().width;
                const originalWidth = backImage.naturalWidth || 300;
                const originalHeight =
                    backImage.naturalHeight || 400;
                const scaledHeight =
                    (itemWidth / originalWidth) * originalHeight;

                const rowSpan = Math.ceil(
                    (scaledHeight + rowGap) / (rowHeight + rowGap),
                );
                item.style.gridRowEnd = `span ${rowSpan}`;
            };

            if (backImage.complete) {
                updateHeight();
            } else {
                backImage.addEventListener("load", updateHeight);
            }
        }
    });
}

window.addEventListener("load", resizeGridItems);
window.addEventListener("resize", resizeGridItems);