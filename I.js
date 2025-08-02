document.addEventListener("DOMContentLoaded", function () {
    const slider = document.querySelector(".slider");
    const nextBtn = document.querySelector(".next");
    const prevBtn = document.querySelector(".prev");
    const buttons = document.querySelectorAll(".content button"); // Get all "See Detail" buttons
    let isSliding = false;

    function moveSlide(direction) {
        if (isSliding) return;
        isSliding = true;

        let items = document.querySelectorAll(".item");

        if (direction === "next") {
            slider.appendChild(items[0]);
        } else {
            slider.prepend(items[items.length - 1]);
        }

        setTimeout(() => {
            isSliding = false;
        }, 500);
    }

    // Click Events for Buttons
    nextBtn.addEventListener("click", () => moveSlide("next"));
    prevBtn.addEventListener("click", () => moveSlide("prev"));

    // Touch Events for Swipe (Mobile Support)
    let startX = 0;
    let endX = 0;

    slider.addEventListener("touchstart", (event) => {
        startX = event.touches[0].clientX;
    });

    slider.addEventListener("touchmove", (event) => {
        endX = event.touches[0].clientX;
    });

    slider.addEventListener("touchend", () => {
        if (startX > endX + 50) {
            moveSlide("next");
        } else if (startX < endX - 50) {
            moveSlide("prev");
        }
    });

    // Function to open full-screen image
    function openFullScreen(event) {
        const item = event.target.closest(".item"); // Find the parent item
        if (item) {
            const imageUrl = item.style.backgroundImage.slice(5, -2); // Extract URL from background-image
            const fullScreenDiv = document.createElement("div");
            fullScreenDiv.classList.add("fullscreen");
            fullScreenDiv.innerHTML = `<img src="${imageUrl}" alt="Full Image">`;
            document.body.appendChild(fullScreenDiv);

            // Close full-screen on click
            fullScreenDiv.addEventListener("click", () => {
                fullScreenDiv.remove();
            });
        }
    }

    // Attach event listeners to all "See Detail" buttons
    buttons.forEach(button => {
        button.addEventListener("click", openFullScreen);
    });
});
