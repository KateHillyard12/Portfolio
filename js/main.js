// ======================================================
// PORTFOLIO MAIN CONTROLLER
// ======================================================

// Shared website functionality
import { markLoaded } from "./site.js";

// Portfolio navigation, galleries, and content
import "./portfolio-ui.js";


// ======================================================
// MOBILE / DESKTOP DETECTION
// ======================================================

const mobileLayout = window.matchMedia(
    "(max-width: 700px)"
);


// ======================================================
// MOBILE EXPERIENCE
// ======================================================

if (mobileLayout.matches) {

    console.log("Loading mobile portfolio");

    // Mobile does not need the 3D model or HDR.
    markLoaded("model");
    markLoaded("hdr");

}


// ======================================================
// DESKTOP EXPERIENCE
// ======================================================

else {

    console.log("Loading desktop 3D portfolio");

    // ======================================================
    // DESKTOP LOADING SAFETY TIMEOUT
    // ======================================================

    window.setTimeout(() => {

        const loader = document.getElementById("siteLoader");

        if (loader && !loader.classList.contains("is-finished")) {

            console.warn(
                "3D loading timeout: revealing portfolio content"
            );

            markLoaded("model");
            markLoaded("hdr");

        }

    }, 20000);

    // Only desktop downloads the 3D JavaScript.
    import("./scene.js").catch((error) => {

        console.error(
            "3D experience failed to initialize:",
            error
        );

        // Allow visitors to use the HTML portfolio
        // even when the 3D scene cannot initialize.

        document.body.classList.add("scene-unavailable");

        const hero = document.getElementById("hero-3d");

        if (hero) {
            hero.style.display = "none";
        }

        window.dispatchEvent(new Event("resize"));

        markLoaded("model");
        markLoaded("hdr");

    });

}


// ======================================================
// RESPONSIVE MODE CHANGES
// ======================================================

// Reload only when crossing the mobile/desktop
// breakpoint so the correct experience initializes.

mobileLayout.addEventListener("change", () => {

    window.location.reload();

});

if (mobileLayout.matches) {

    const brand = document.querySelector(".portfolio-brand");

    if (brand) {
        brand.href = "#mobile-intro";
    }

}
