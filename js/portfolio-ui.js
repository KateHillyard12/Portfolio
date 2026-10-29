// ======================================================
// PORTFOLIO UI
// Controls HTML content + accessible navigation
// ======================================================

const portfolioSections =
    document.querySelectorAll(
        "[data-portfolio-section]"
    );

const portfolioButtons =
    document.querySelectorAll(
        ".portfolio-nav [data-section]"
    );


let activePortfolioSection =
    "projects";


// ======================================================
// SHOW PORTFOLIO SECTION
// ======================================================

export function showPortfolioSection(
    sectionName
) {

    console.log(
        `Showing portfolio section: ${sectionName}`
    );


    // -------------------------------------
    // SHOW / HIDE CONTENT
    // -------------------------------------

    portfolioSections.forEach(
        (section) => {

            const isSelected =
                section.id === sectionName;

            section.hidden =
                !isSelected;

        }
    );


    // -------------------------------------
    // UPDATE BUTTON STATE
    // -------------------------------------

    portfolioButtons.forEach(
        (button) => {

            const isSelected =
                button.dataset.section ===
                sectionName;


            button.classList.toggle(
                "is-active",
                isSelected
            );


            button.setAttribute(
                "aria-pressed",
                String(isSelected)
            );

        }
    );

    // =====================================
    // CHANGE COLOR THEME
    // =====================================

    document.documentElement.dataset.portfolioTheme =
        sectionName;

    activePortfolioSection =
        sectionName;

}


// ======================================================
// HTML BUTTONS
// ======================================================

portfolioButtons.forEach(
    (button) => {

        button.addEventListener(
            "click",
            () => {

                const sectionName =
                    button.dataset.section;


                // Change the HTML immediately.

                showPortfolioSection(
                    sectionName
                );


                // Tell main.js that a section
                // was selected.

                window.dispatchEvent(
                    new CustomEvent(
                        "portfolio-section-selected",
                        {
                            detail: {
                                section:
                                    sectionName
                            }
                        }
                    )
                );

            }
        );

    }
);


// ======================================================
// INITIAL SECTION
// ======================================================

showPortfolioSection(
    activePortfolioSection
);




// ======================================================
// NAVBAR SCROLL DETECTION
// ======================================================

const portfolioNav =
    document.getElementById("portfolioNav");

const heroSection =
    document.getElementById("hero-3d");


// ======================================================
// CHECK SCROLL POSITION
// ======================================================

function updateNavbar() {

    if (!portfolioNav || !heroSection) {
        return;
    }

    // Find the bottom of our 3D canvas.

    const heroBottom =
        heroSection.getBoundingClientRect().bottom;


    // Find the height of our navbar.

    const navbarHeight =
        portfolioNav.offsetHeight;


    // On mobile, the 3D hero may be hidden.

    const heroHidden =
        getComputedStyle(heroSection).display === "none";


    // Check whether we've scrolled past the canvas.

    const passedHero =
        heroHidden || heroBottom <= navbarHeight;


    // Add/remove our CSS class.

    portfolioNav.classList.toggle(
        "has-passed-hero",
        passedHero
    );

}


// ======================================================
// LISTEN FOR SCROLLING
// ======================================================

window.addEventListener(
    "scroll",
    updateNavbar,
    { passive: true }
);


// Check when the browser is resized.

window.addEventListener(
    "resize",
    updateNavbar
);


// Check immediately when the page loads.

updateNavbar();

// ======================================================
// PROJECT CATEGORY NAVIGATION
// ======================================================

// Find all project category buttons.

const projectCategoryButtons =
    document.querySelectorAll(
        "[data-project-category]"
    );


// Find all expandable project panels.

const projectCategoryPanels =
    document.querySelectorAll(
        ".project-category-panel"
    );


// ======================================================
// CATEGORY BUTTON EVENTS
// ======================================================

projectCategoryButtons.forEach((button) => {

    button.addEventListener("click", () => {

        // Find which category was clicked.

        const category =
            button.dataset.projectCategory;


        // Find the matching content panel.

        const targetPanel =
            document.getElementById(
                `project-panel-${category}`
            );


        // Check whether this card is already open.

        const wasExpanded =
            button.getAttribute("aria-expanded") === "true";


        // Close all existing panels.

        projectCategoryPanels.forEach((panel) => {

            panel.hidden = true;

        });


        // Reset all category buttons.

        projectCategoryButtons.forEach((btn) => {

            btn.setAttribute("aria-expanded", "false");

        });


        // If the clicked card was already open,
        // leave everything closed.

        if (wasExpanded) {
            return;
        }


        // Open the selected panel.

        if (targetPanel) {

            targetPanel.hidden = false;

            button.setAttribute("aria-expanded", "true");

        }

    });

});



// ======================================================
// PROJECT IMAGE GALLERIES
// ======================================================

// Find every gallery navigation button.

const galleryButtons =
    document.querySelectorAll(
        "[data-gallery-direction]"
    );


// ======================================================
// GALLERY BUTTON INTERACTION
// ======================================================

galleryButtons.forEach((button) => {

    button.addEventListener("click", () => {

        // Find the project containing this button.

        const showcase =
            button.closest(".project-showcase");


        // Find the gallery inside that project.

        const gallery =
            showcase?.querySelector(".project-gallery");


        // Find the first image card.

        const image =
            gallery?.querySelector(".project-gallery-item");


        if (!gallery || !image) {
            return;
        }


        // Determine the direction.

        const direction =
            Number(button.dataset.galleryDirection);


        // Get the width of one image card.

        const imageWidth =
            image.getBoundingClientRect().width;


        // Get the spacing between images.

        const gap =
            parseFloat(
                getComputedStyle(gallery).columnGap
            ) || 0;


        // Calculate how far to scroll.

        const distance =
            (imageWidth + gap) * direction;


        // Scroll the gallery.

        gallery.scrollBy({

            left: distance,

            behavior:
                window.matchMedia(
                    "(prefers-reduced-motion: reduce)"
                ).matches
                    ? "auto"
                    : "smooth"

        });

    });

});

// ======================================================
// PROJECT IMAGE LIGHTBOX
// ======================================================

// Main dialog element

const projectLightbox =
    document.getElementById("projectLightbox");


// Large image inside the dialog

const lightboxImage =
    document.getElementById("lightboxImage");


// Image caption

const lightboxCaption =
    document.getElementById("lightboxCaption");


// Image counter

const lightboxCount =
    document.getElementById("lightboxCount");


// Close button

const lightboxCloseButton =
    document.querySelector(".lightbox-close");


// Navigation arrows

const lightboxArrows =
    document.querySelectorAll("[data-lightbox-step]");


// Store the images belonging to the open gallery

let activeGalleryImages = [];


// Track which image is currently displayed

let activeImageIndex = 0;


// Remember the page's previous scrolling setting

let previousBodyOverflow = "";

// ======================================================
// UPDATE LIGHTBOX IMAGE
// ======================================================

function updateLightboxImage() {

    const figure =
        activeGalleryImages[activeImageIndex];

    if (!figure) {
        return;
    }


    // Find the image inside the selected figure

    const image =
        figure.querySelector("img");


    // Find its caption

    const caption =
        figure.querySelector("figcaption");


    if (!image) {
        return;
    }


    // Update the enlarged image

    lightboxImage.src =
        image.currentSrc || image.src;

    lightboxImage.alt =
        image.alt;


    // Update the caption

    lightboxCaption.textContent =
        caption?.textContent.trim() || "";


    // Update the image counter

    lightboxCount.textContent =
        `${activeImageIndex + 1} / ${activeGalleryImages.length}`;


    // Disable arrows if there's only one image

    lightboxArrows.forEach((button) => {

        button.disabled =
            activeGalleryImages.length <= 1;

    });

}

// ======================================================
// OPEN IMAGE LIGHTBOX
// ======================================================

document
    .querySelectorAll(".gallery-image-button")
    .forEach((button) => {

        button.addEventListener("click", () => {

            // Find the gallery containing this image

            const gallery =
                button.closest(".project-gallery");


            // Find the clicked image card

            const clickedFigure =
                button.closest(".project-gallery-item");


            if (!gallery || !clickedFigure || !projectLightbox) {
                return;
            }


            // Store only images from this gallery

            activeGalleryImages =
                Array.from(
                    gallery.querySelectorAll(".project-gallery-item")
                );


            // Find which image was clicked

            activeImageIndex =
                activeGalleryImages.indexOf(clickedFigure);


            if (activeImageIndex === -1) {
                return;
            }


            // Display the correct image

            updateLightboxImage();


            // Remember the current scrolling style

            previousBodyOverflow =
                document.body.style.overflow;


            // Open the dialog

            projectLightbox.showModal();


            // Prevent scrolling behind the viewer

            document.body.style.overflow = "hidden";

        });

    });

// ======================================================
// NAVIGATE BETWEEN LIGHTBOX IMAGES
// ======================================================

function moveLightboxImage(direction) {

    if (activeGalleryImages.length <= 1) {
        return;
    }


    // Calculate the next image index

    activeImageIndex =
        (
            activeImageIndex +
            direction +
            activeGalleryImages.length
        ) % activeGalleryImages.length;


    // Display the new image

    updateLightboxImage();

}

// ======================================================
// LIGHTBOX ARROW EVENTS
// ======================================================

lightboxArrows.forEach((button) => {

    button.addEventListener("click", () => {

        const direction =
            Number(button.dataset.lightboxStep);

        moveLightboxImage(direction);

    });

});

// ======================================================
// CLOSE LIGHTBOX
// ======================================================

lightboxCloseButton?.addEventListener("click", () => {

    projectLightbox.close();

});


// Restore page scrolling when the dialog closes

projectLightbox?.addEventListener("close", () => {

    document.body.style.overflow =
        previousBodyOverflow;

    lightboxImage.removeAttribute("src");

});

// ======================================================
// LIGHTBOX KEYBOARD CONTROLS
// ======================================================

projectLightbox?.addEventListener("keydown", (event) => {

    if (event.key === "ArrowRight") {

        event.preventDefault();

        moveLightboxImage(1);

    }

    if (event.key === "ArrowLeft") {

        event.preventDefault();

        moveLightboxImage(-1);

    }

});

// ======================================================
// SKILLS - RELATED PROJECTS
// ======================================================

const skillProjects = {

    room: {
        title: "Interactive Portfolio Room",
        category: "3d",
        id: "project-room"
    },

    realms: {
        title: "R.E.A.L.M.S.",
        category: "3d",
        id: "project-realms"
    },

    silicon: {
        title: "Silicon Sam",
        category: "3d",
        id: "project-silicon"
    },

    cyan: {
        title: "Cyan Swans",
        category: "graphic",
        id: "project-cyan"
    },

    brainBranding: {
        title: "Brain Health Branding",
        category: "graphic",
        id: "project-brain-branding"
    },

    brews: {
        title: "Brews & Bloodshed",
        category: "game",
        id: "project-brews"
    },

    spike: {
        title: "Set & Spike",
        category: "game",
        id: "project-spike"
    },

    brain: {
        title: "Brain Health",
        category: "game",
        id: "project-brain"
    }

};

// ======================================================
// SKILLS - DESCRIPTIONS AND PROJECTS
// ======================================================

const skillData = {

    // =====================================
    // CREATIVE SOFTWARE
    // =====================================

    "Blender": {
        description:
            "I use Blender to create stylized 3D environments, models, and assets for games, animations, and interactive websites.",
        projects: ["room", "realms", "silicon"]
    },

    "Adobe Illustrator": {
        description:
            "I use Illustrator for vector graphics, logo development, branding, and preparing clean, scalable artwork.",
        projects: ["cyan", "brainBranding"]
    },

    "Adobe Photoshop": {
        description:
            "I use Photoshop for image editing, graphic design, and preparing visual assets for creative projects.",
        projects: ["cyan"]
    },

    "After Effects": {
        description:
            "I use After Effects for animation, compositing, motion graphics, and visual storytelling.",
        projects: ["silicon"]
    },

    "Premiere Pro": {
        description:
            "I use Premiere Pro to edit videos, adjust pacing, and assemble polished visual content.",
        projects: ["silicon"]
    },

    "Figma": {
        description:
            "I use Figma to design user interfaces, create prototypes, and plan interactive experiences.",
        projects: ["brain"]
    },

    "Maya": {
        description:
            "I've trained in Maya and explored its 3D modeling and animation workflows.",
        projects: []
    },


    // =====================================
    // WEB & PROGRAMMING
    // =====================================

    "HTML": {
        description:
            "I use semantic HTML to structure websites and build accessible user interfaces.",
        projects: ["room"]
    },

    "CSS": {
        description:
            "I use CSS to develop responsive layouts, animations, and custom visual designs.",
        projects: ["room"]
    },

    "JavaScript": {
        description:
            "I use JavaScript to develop interactive websites, user interfaces, and application functionality.",
        projects: ["room", "brain"]
    },

    "Three.js": {
        description:
            "I use Three.js to bring Blender environments into the browser with interactive objects, animation, and lighting.",
        projects: ["room"]
    },

    "Node.js": {
        description:
            "I use Node.js to build application functionality and connect interfaces with other systems.",
        projects: ["brain"]
    },

    "Express": {
        description:
            "I've used Express to create server routes and REST API functionality for web applications.",
        projects: []
    },

    "C#": {
        description:
            "I use C# to program gameplay systems, interactions, and mechanics in Unity.",
        projects: ["brews", "spike"]
    },

    "SQL / MySQL": {
        description:
            "I've used SQL and MySQL to create and manage relational databases for web applications.",
        projects: []
    },

    "Git & GitHub": {
        description:
            "I use Git and GitHub for version control, managing source code, and sharing development projects.",
        projects: ["brews", "spike"]
    },

    "Web Accessibility": {
        description:
            "I have professional experience reviewing and improving website accessibility, including WCAG-related issues.",
        projects: []
    },


    // =====================================
    // GAME & INTERACTIVE
    // =====================================

    "Unity": {
        description:
            "I use Unity to develop interactive games, VR experiences, and real-time 3D applications.",
        projects: ["brews", "spike", "brain"]
    },

    "Unity HDRP / URP": {
        description:
            "I've worked with Unity's render pipelines to develop and visually refine real-time environments.",
        projects: ["brews"]
    },

    "Shader Graph": {
        description:
            "I use Shader Graph to build custom materials and visual effects in Unity.",
        projects: ["brews"]
    },

    "VFX Graph": {
        description:
            "I've used VFX Graph to create effects such as particles and environmental details.",
        projects: ["brews"]
    },

    "XR Interaction Toolkit": {
        description:
            "I've worked with XR Interaction Toolkit to build interactions for immersive VR experiences.",
        projects: ["realms"]
    },

    "Unity Timeline": {
        description:
            "I've used Unity Timeline to organize and control animation sequences.",
        projects: []
    },

    "Game Design": {
        description:
            "I enjoy designing gameplay mechanics, interactive systems, and memorable player experiences.",
        projects: ["brews", "spike"]
    },

    "UI / UX Design": {
        description:
            "I design interfaces that balance visual personality, accessibility, and usability.",
        projects: ["brain", "room"]
    },

    "3D Environment Design": {
        description:
            "I create stylized environments with attention to composition, lighting, atmosphere, and performance.",
        projects: ["room", "realms", "silicon"]
    }

};

// ======================================================
// INTERACTIVE SKILL STICKERS
// ======================================================

document.querySelectorAll(".skills-card").forEach((card) => {

    const detailPanel =
        card.querySelector(".skill-detail");

    if (!detailPanel) return;

    const title =
        detailPanel.querySelector(".skill-detail-title");

    const description =
        detailPanel.querySelector(".skill-detail-description");

    const projectContainer =
        detailPanel.querySelector(".skill-detail-projects");

    const skillButtons = [];


    // =====================================
    // CONVERT STICKERS TO BUTTONS
    // =====================================

    card.querySelectorAll(".skills-stickers li")
        .forEach((sticker) => {

            const skillName =
                sticker.textContent.trim();

            const info =
                skillData[skillName];

            if (!info) return;


            // Create an accessible button.

            const button =
                document.createElement("button");

            button.type = "button";

            button.className =
                "skill-sticker-button";

            button.textContent =
                skillName;

            button.setAttribute(
                "aria-expanded",
                "false"
            );

            button.setAttribute(
                "aria-controls",
                detailPanel.id
            );


            // Replace plain text with the button.

            sticker.replaceChildren(button);

            sticker.classList.add(
                "skill-interactive"
            );

            skillButtons.push(button);


            // =====================================
            // STICKER CLICK EVENT
            // =====================================

            button.addEventListener("click", () => {

                const alreadySelected =
                    button.getAttribute(
                        "aria-expanded"
                    ) === "true";


                // Reset all stickers in this card.

                skillButtons.forEach((otherButton) => {

                    otherButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                    otherButton.parentElement
                        .classList.remove(
                            "skill-selected"
                        );

                });


                // Clicking the same sticker closes it.

                if (alreadySelected) {

                    detailPanel.hidden = true;

                    return;

                }


                // Mark the selected sticker.

                button.setAttribute(
                    "aria-expanded",
                    "true"
                );

                sticker.classList.add(
                    "skill-selected"
                );


                // Update the panel.

                title.textContent =
                    skillName;

                description.textContent =
                    info.description;


                // Clear previous project links.

                projectContainer.replaceChildren();


                // Create links to related projects.

                info.projects.forEach((projectKey) => {

                    const project =
                        skillProjects[projectKey];

                    if (!project) return;


                    const projectButton =
                        document.createElement("button");

                    projectButton.type = "button";

                    projectButton.className =
                        "skill-project-link";

                    projectButton.textContent =
                        `${project.title} `;


                    projectButton.addEventListener(
                        "click",
                        () => {
                            openProjectFromSkill(project);
                        }
                    );

                    projectContainer.appendChild(
                        projectButton
                    );

                });


                // Show the information panel.

                detailPanel.hidden = false;

            });

        });

});

// ======================================================
// NAVIGATE FROM SKILLS TO PROJECTS
// ======================================================

function openProjectFromSkill(project) {

    // =====================================
    // 1. SWITCH TO PROJECTS
    // =====================================

    showPortfolioSection("projects");


    // =====================================
    // 2. FIND THE CORRECT CATEGORY
    // =====================================

    const categoryButton =
        document.querySelector(
            `#projects [data-project-category="${project.category}"]`
        );

    if (!categoryButton) {
        return;
    }


    // Open the category if it isn't already selected.

    const isExpanded =
        categoryButton.getAttribute(
            "aria-expanded"
        ) === "true";

    if (!isExpanded) {

        categoryButton.click();

    }


    // =====================================
    // 3. FIND THE PROJECT DROPDOWN
    // =====================================

    const projectDropdown =
        document.getElementById(project.id);

    if (!projectDropdown) {
        return;
    }


    // Expand the project.

    projectDropdown.open = true;


    // =====================================
    // 4. SCROLL TO THE PROJECT
    // =====================================

    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    requestAnimationFrame(() => {

        projectDropdown.scrollIntoView({

            behavior: reducedMotion
                ? "auto"
                : "smooth",

            block: "start"

        });

        // Place keyboard focus on the project heading.

        projectDropdown.querySelector("summary")
            ?.focus({ preventScroll: true });

    });

}

// ======================================================
// SCROLL REVEAL ANIMATIONS
// ======================================================

// Elements we want to animate

const revealElements = document.querySelectorAll(
    [
        ".portfolio-section-heading",
        "#projects .project-category-card",
        "#projects .project-accordion",
        "#skills .skills-card",
        "#experience .experience-item",
        "#experience .experience-resources",
        ".footer-main",
        ".footer-bottom"
    ].join(",")
);


// Check whether the user prefers reduced motion

const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

// ======================================================
// WATCH ELEMENTS ENTERING THE VIEWPORT
// ======================================================

if (
    !prefersReducedMotion &&
    "IntersectionObserver" in window
) {

    const revealObserver = new IntersectionObserver(

        (entries, observer) => {

            entries.forEach((entry) => {

                // Only animate when the element
                // enters the visible area

                if (!entry.isIntersecting) {
                    return;
                }


                // Trigger the CSS animation

                entry.target.classList.add(
                    "is-visible"
                );


                // Stop watching once revealed

                observer.unobserve(entry.target);

            });

        },

        {
            threshold: 0,

            rootMargin: "0px 0px -50px 0px"
        }

    );


    // Start watching each element

    revealElements.forEach((element) => {

        element.classList.add(
            "scroll-reveal"
        );

        revealObserver.observe(element);

    });

}

// ======================================================
// NAVBAR / PAGE BLENDING
// ======================================================

// Find our navbar and 3D hero

const blendNavbar =
    document.querySelector(".portfolio-nav");

const blendHero =
    document.getElementById("hero-3d");


// Prevent unnecessary updates

let navBlendUpdateQueued = false;


// ======================================================
// UPDATE NAVBAR APPEARANCE
// ======================================================

function updateNavbarBlend() {

    if (!blendNavbar || !blendHero) {
        return;
    }


    // Find the bottom of the 3D scene

    const heroBottom =
        blendHero.getBoundingClientRect().bottom;


    // Account for the navbar's height

    const navHeight =
        blendNavbar.offsetHeight;

    const heroHidden =
        getComputedStyle(blendHero).display === "none";

    const hasPassedHero =
        !heroHidden && heroBottom <= navHeight;


    // Toggle blended appearance

    blendNavbar.classList.toggle(
        "is-blended",
        hasPassedHero
    );

}


// ======================================================
// SCROLL EVENT
// ======================================================

function requestNavbarBlendUpdate() {

    if (navBlendUpdateQueued) {
        return;
    }

    navBlendUpdateQueued = true;

    requestAnimationFrame(() => {

        updateNavbarBlend();

        navBlendUpdateQueued = false;

    });

}


// Watch scrolling

window.addEventListener(
    "scroll",
    requestNavbarBlendUpdate,
    { passive: true }
);


// Watch resizing

window.addEventListener(
    "resize",
    requestNavbarBlendUpdate
);


// Set the correct state when the page loads

updateNavbarBlend();


// ======================================================
// MOBILE INTRO - TYPEWRITER EFFECT
// ======================================================

const mobileTypeName =
    document.getElementById("mobileTypeName");

const isMobile =
    window.matchMedia("(max-width: 700px)");

const reducedMotion =
    window.matchMedia("(prefers-reduced-motion: reduce)");

if (
    mobileTypeName &&
    isMobile.matches &&
    !reducedMotion.matches
) {

    const fullName = mobileTypeName.textContent.trim();

    let typingStarted = false;

    function startNameTyping() {

        if (typingStarted) return;

        typingStarted = true;

        let characterIndex = 0;

        mobileTypeName.textContent = "";

        mobileTypeName.classList.add("is-typing");

        function typeNextCharacter() {

            characterIndex++;

            mobileTypeName.textContent =
                fullName.slice(0, characterIndex);

            if (characterIndex < fullName.length) {

                setTimeout(typeNextCharacter, 110);

            } else {

                // Remove cursor when typing finishes
                mobileTypeName.classList.remove("is-typing");

            }

        }

        // Small delay before typing begins
        setTimeout(typeNextCharacter, 1500);

    }

    // Wait until the loading screen reveals the site

    if (document.body.classList.contains("site-ready")) {

        startNameTyping();

    } else {

        const observer = new MutationObserver(() => {

            if (document.body.classList.contains("site-ready")) {

                observer.disconnect();

                startNameTyping();

            }

        });

        observer.observe(document.body, {
            attributes: true,
            attributeFilter: ["class"]
        });

    }

}