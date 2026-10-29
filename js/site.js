/*!
* Start Bootstrap - Resume v7.0.6 (https://startbootstrap.com/theme/resume)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-resume/blob/master/LICENSE)
*/
//
//==================== NAVIGATION ====================//
// 








window.addEventListener('DOMContentLoaded', event => {


    const sideNav = document.body.querySelector('#sideNav');
    if (sideNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#sideNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});

// ======================================================
// SITE LOADING STATE
// ======================================================

const siteLoader =
    document.getElementById("siteLoader");

const siteShell =
    document.getElementById("siteShell");


const loadingState = {
    page: false,
    model: false,
    hdr: false
};


let portfolioRevealed =
    false;


export function markLoaded(item) {

    loadingState[item] =
        true;


    console.log(
        `✓ ${item} loaded`
    );


    console.table(
        loadingState
    );


    checkSiteReady();

}


function checkSiteReady() {

    if (portfolioRevealed) {
        return;
    }


    const everythingReady =
        loadingState.page &&
        loadingState.model &&
        loadingState.hdr;


    console.log(
        "Checking site:",
        loadingState
    );


    if (!everythingReady) {
        return;
    }


    portfolioRevealed =
        true;


    revealPortfolio();

}


function revealPortfolio() {

    console.log(
        "REVEALING PORTFOLIO"
    );


    // Make actual website accessible again.

    if (siteShell) {

        siteShell.inert =
            false;

        siteShell.removeAttribute(
            "inert"
        );

        siteShell.setAttribute(
            "aria-hidden",
            "false"
        );

    }


    // Reveal site underneath.

    document.body.classList.add(
        "site-ready"
    );


    // Fade loader away.

    if (siteLoader) {

        siteLoader.classList.add(
            "is-finished"
        );


        window.setTimeout(
            () => {

                siteLoader.remove();

            },
            700
        );

    }

}

// ======================================================
// NORMAL PAGE LOADING
// ======================================================

if (document.readyState === "loading") {

    document.addEventListener(
        "DOMContentLoaded",
        () => {
            markLoaded("page");
        },
        { once: true }
    );

}

else {

    markLoaded("page");

}

// ======================================================
// LOGO COIN / THEME SWITCH
// ======================================================

const profileFlip =
    document.getElementById(
        "profileFlip"
    );


function setPortfolioTheme(
    useAlternateTheme
) {

    if (useAlternateTheme) {

        document.documentElement.dataset.theme =
            "alternate";

    }

    else {

        delete document.documentElement.dataset.theme;

    }

}


if (profileFlip) {

    profileFlip.addEventListener(
        "click",
        () => {

            profileFlip.classList.toggle(
                "is-flipped"
            );


            const isFlipped =
                profileFlip.classList.contains(
                    "is-flipped"
                );


            profileFlip.setAttribute(
                "aria-pressed",
                String(isFlipped)
            );


            setPortfolioTheme(
                isFlipped
            );

        }
    );

}




document.addEventListener("DOMContentLoaded", () => {
    //==================== IMAGE GALLERIES AND MODALS ====================//
    const assetModal = document.getElementById("assetImageModal");
    const realmCompareModal = document.getElementById("realmCompareModal");

    const modalImg = document.getElementById("assetModalImage");
    const modalTitle = assetModal ? assetModal.querySelector(".modal-title") : null;
    const prevBtn = assetModal ? assetModal.querySelector(".asset-nav-left") : null;
    const nextBtn = assetModal ? assetModal.querySelector(".asset-nav-right") : null;

    const compareTitle = document.getElementById("realmCompareModalLabel");
    const compareFrontImg = document.getElementById("realmCompareFrontImage");
    const compareBackImg = document.getElementById("realmCompareBackImage");
    const compareFrontLabel = document.getElementById("realmCompareFrontLabel");
    const compareBackLabel = document.getElementById("realmCompareBackLabel");
    const comparePrevBtn = realmCompareModal ? realmCompareModal.querySelector(".realm-nav-left") : null;
    const compareNextBtn = realmCompareModal ? realmCompareModal.querySelector(".realm-nav-right") : null;

    let currentGallery = [];
    let currentIndex = 0;

    let currentCompareGallery = [];
    let currentCompareIndex = 0;



    // Use only visible images so hidden tabs do not enter the gallery.
    function getGalleryImages(clickedImg) {
        const uiSection = clickedImg.closest('.proj-group[data-category="ui"]');
        if (uiSection) {
            return Array.from(uiSection.querySelectorAll("img.asset-pop"))
                .filter(img => img.offsetParent !== null && img.dataset.bsTarget !== "#realmCompareModal");
        }

        const tabPane = clickedImg.closest(".tab-pane");
        if (tabPane) {
            const tabImages = Array.from(tabPane.querySelectorAll("img.asset-pop"))
                .filter(img => img.offsetParent !== null && img.dataset.bsTarget !== "#realmCompareModal");
            if (tabImages.length) return tabImages;
        }

        const card = clickedImg.closest(".card");
        if (card) {
            const cardImages = Array.from(card.querySelectorAll("img.asset-pop"))
                .filter(img => img.offsetParent !== null && img.dataset.bsTarget !== "#realmCompareModal");
            if (cardImages.length) return cardImages;
        }

        return [clickedImg];
    }

    // Keep comparison assets separate from regular image-modal galleries.
    function getCompareGallery(clickedImg) {
        const tabPane = clickedImg.closest(".tab-pane");
        if (tabPane) {
            const compareImages = Array.from(

                tabPane.querySelectorAll('img.asset-pop[data-bs-target="#realmCompareModal"]')
                // Track the active section and collapse the mobile menu after navigation.
            ).filter(img => img.offsetParent !== null);

            if (compareImages.length) return compareImages;
        }

        const card = clickedImg.closest(".card");
        if (card) {
            const compareImages = Array.from(
                card.querySelectorAll('img.asset-pop[data-bs-target="#realmCompareModal"]')
            ).filter(img => img.offsetParent !== null);

            if (compareImages.length) return compareImages;
        }

        return [clickedImg];
    }

    // Show the active asset and disable navigation at either end.
    function updateModalImage() {
        const activeImg = currentGallery[currentIndex];
        if (!activeImg || !modalImg || !modalTitle || !prevBtn || !nextBtn) return;

        modalImg.src = activeImg.src;
        modalImg.alt = activeImg.alt || "Full Size Image";
        modalTitle.textContent = activeImg.alt || "Full Size Image";

        prevBtn.disabled = currentGallery.length <= 1 || currentIndex === 0;
        nextBtn.disabled = currentGallery.length <= 1 || currentIndex === currentGallery.length - 1;
    }

    // Load both comparison sides and update the matching labels and controls.
    function updateCompareModal() {
        const activeCompare = currentCompareGallery[currentCompareIndex];
        if (
            !activeCompare ||
            !compareTitle ||
            !compareFrontImg ||
            !compareBackImg ||
            !compareFrontLabel ||
            !compareBackLabel ||
            !comparePrevBtn ||
            !compareNextBtn
        ) return;

        compareTitle.textContent = activeCompare.dataset.title || activeCompare.alt || "Asset Comparison";
        compareFrontImg.src = activeCompare.dataset.front || activeCompare.src;
        compareBackImg.src = activeCompare.dataset.back || "";
        compareFrontImg.alt = activeCompare.dataset.frontLabel || "3D Model Recreation";
        compareBackImg.alt = activeCompare.dataset.backLabel || "Illustration Reference";
        compareFrontLabel.textContent = activeCompare.dataset.frontLabel || "3D Model Recreation";
        compareBackLabel.textContent = activeCompare.dataset.backLabel || "Illustration Reference";

        comparePrevBtn.disabled = currentCompareGallery.length <= 1 || currentCompareIndex === 0;
        compareNextBtn.disabled = currentCompareGallery.length <= 1 || currentCompareIndex === currentCompareGallery.length - 1;
    }

    // Handle asset flips and open the correct gallery modal from one listener.
    document.addEventListener("click", (e) => {
        const flipBtn = e.target.closest(".flip-btn");
        if (flipBtn) {
            e.preventDefault();
            e.stopPropagation();

            const wrapper = flipBtn.closest(".asset-wrapper");
            const front = wrapper.querySelector(".asset-front");
            const back = wrapper.querySelector(".asset-back");

            const frontVisible = window.getComputedStyle(front).display !== "none";

            if (frontVisible) {
                front.style.display = "none";
                back.style.display = "block";
            } else {
                back.style.display = "none";
                front.style.display = "block";
            }
            return;
        }

        const compareImg = e.target.closest('img.asset-pop[data-bs-target="#realmCompareModal"]');
        if (compareImg && realmCompareModal) {
            currentCompareGallery = getCompareGallery(compareImg);
            currentCompareIndex = currentCompareGallery.indexOf(compareImg);

            if (currentCompareIndex < 0) currentCompareIndex = 0;
            updateCompareModal();
            return;
        }

        const img = e.target.closest('img.asset-pop:not([data-bs-target="#realmCompareModal"])');
        if (!img || !assetModal) return;

        currentGallery = getGalleryImages(img);
        currentIndex = currentGallery.indexOf(img);

        if (currentIndex < 0) currentIndex = 0;
        updateModalImage();
    });

    // Previous/next controls move through the selected gallery.
    if (prevBtn) {
        prevBtn.addEventListener("click", () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateModalImage();
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            if (currentIndex < currentGallery.length - 1) {
                currentIndex++;
                updateModalImage();
            }
        });
    }

    if (comparePrevBtn) {
        comparePrevBtn.addEventListener("click", () => {
            if (currentCompareIndex > 0) {
                currentCompareIndex--;
                updateCompareModal();
            }
        });
    }

    if (compareNextBtn) {
        compareNextBtn.addEventListener("click", () => {
            if (currentCompareIndex < currentCompareGallery.length - 1) {
                currentCompareIndex++;
                updateCompareModal();
            }
        });
    }

    // Arrow keys navigate the currently open gallery.
    document.addEventListener("keydown", (e) => {
        if (assetModal && assetModal.classList.contains("show")) {
            if (e.key === "ArrowLeft" && currentIndex > 0) {
                currentIndex--;
                updateModalImage();
            }

            if (e.key === "ArrowRight" && currentIndex < currentGallery.length - 1) {
                currentIndex++;
                updateModalImage();
            }
        }

        if (realmCompareModal && realmCompareModal.classList.contains("show")) {
            if (e.key === "ArrowLeft" && currentCompareIndex > 0) {
                currentCompareIndex--;
                updateCompareModal();
            }

            if (e.key === "ArrowRight" && currentCompareIndex < currentCompareGallery.length - 1) {
                currentCompareIndex++;
                updateCompareModal();
            }
        }
    });

    // Release loaded image references and reset indexes when a modal closes.
    if (assetModal) {
        assetModal.addEventListener("hidden.bs.modal", () => {
            if (modalImg) {
                modalImg.src = "";
                modalImg.alt = "";
            }
            currentGallery = [];
            currentIndex = 0;
        });
    }

    if (realmCompareModal) {
        realmCompareModal.addEventListener("hidden.bs.modal", () => {
            if (compareFrontImg) {
                compareFrontImg.src = "";
                compareFrontImg.alt = "";
            }

            if (compareBackImg) {
                compareBackImg.src = "";
                compareBackImg.alt = "";
            }

            currentCompareGallery = [];
            currentCompareIndex = 0;
        });
    }
});


//==================== MODAL VIDEO CLEANUP ====================//
document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('hidden.bs.modal', () => {
        const videos = modal.querySelectorAll('video');

        videos.forEach(video => {
            video.pause();
            video.currentTime = 0;
        });
    });
});








