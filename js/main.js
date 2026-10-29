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


function markLoaded(item) {

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

if (
    document.readyState ===
    "complete"
) {

    markLoaded("page");

}

else {

    window.addEventListener(
        "load",
        () => {

            markLoaded("page");

        },
        {
            once: true
        }
    );

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


















//==================== THREE.JS IMPORTS ====================//
import * as THREE from "three";

import { GLTFLoader } from
    "three/addons/loaders/GLTFLoader.js";

import { HDRLoader } from
    "three/addons/loaders/HDRLoader.js";

import {
    showPortfolioSection
}
    from "./portfolio-ui.js";

import { EffectComposer }
    from "three/addons/postprocessing/EffectComposer.js";

import { RenderPass }
    from "three/addons/postprocessing/RenderPass.js";

import { UnrealBloomPass }
    from "three/addons/postprocessing/UnrealBloomPass.js";

import { OutputPass }
    from "three/addons/postprocessing/OutputPass.js";

import { SMAAPass }
    from "three/addons/postprocessing/SMAAPass.js";

import { RectAreaLightHelper }
    from "three/addons/helpers/RectAreaLightHelper.js";



// ======================================================
// CANVAS
// ======================================================

const hero3D =
    document.querySelector("#hero-3d");

const canvas =
    document.querySelector("#portfolio-scene");


// ======================================================
// SCENE
// ======================================================

const scene = new THREE.Scene();

const smaaPass =
    new SMAAPass();


// ======================================================
// CAMERA
// ======================================================

const BASE_FOV = 40;

const BASE_ASPECT =
    16 / 9;


const camera =
    new THREE.PerspectiveCamera(
        BASE_FOV,
        1,
        0.1,
        1000
    );

function updateResponsiveCamera(
    aspect
) {

    // Normal desktop/wide screen

    if (
        aspect >= BASE_ASPECT
    ) {

        camera.fov =
            BASE_FOV;

        return;

    }


    // -------------------------------------
    // NARROW WINDOW
    // -------------------------------------

    // Convert our normal vertical FOV
    // into its equivalent horizontal FOV.

    const baseVerticalFov =
        THREE.MathUtils.degToRad(
            BASE_FOV
        );


    const horizontalFov =
        2 *
        Math.atan(
            Math.tan(
                baseVerticalFov / 2
            ) *
            BASE_ASPECT
        );


    // Calculate the vertical FOV needed
    // to preserve that horizontal view
    // at this narrower aspect ratio.

    const responsiveVerticalFov =
        2 *
        Math.atan(
            Math.tan(
                horizontalFov / 2
            ) /
            aspect
        );


    camera.fov =
        Math.min(
            THREE.MathUtils.radToDeg(
                responsiveVerticalFov
            ),

            70
        );

}


// Camera framing found manually earlier.

const cameraBasePosition = new THREE.Vector3(
    -1.5957,
    2.0586,
    1.8238
);

const cameraBaseTarget = new THREE.Vector3(
    0.2076,
    1.4619,
    -1.0662
);

camera.position.copy(cameraBasePosition);
camera.lookAt(cameraBaseTarget);


// ======================================================
// RENDERER
// ======================================================

const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true
});

renderer.setPixelRatio(
    Math.min(
        window.devicePixelRatio,
        2
    )
);

//=====================================================
// RESIZE SCENE
//=====================================================

function resizeScene() {

    const width =
        hero3D.clientWidth;

    const height =
        hero3D.clientHeight;


    if (
        width <= 0 ||
        height <= 0
    ) {
        return;
    }


    const pixelRatio =
        Math.min(
            window.devicePixelRatio,
            2
        );


    // =====================================
    // RENDERER
    // =====================================

    renderer.setPixelRatio(
        pixelRatio
    );

    renderer.setSize(
        width,
        height,
        false
    );


    // =====================================
    // POST PROCESSING
    // =====================================

    composer.setPixelRatio(
        pixelRatio
    );

    composer.setSize(
        width,
        height
    );


    // =====================================
    // CAMERA
    // =====================================

    camera.aspect =
        width / height;

    updateResponsiveCamera(
        camera.aspect
    );

    camera.updateProjectionMatrix();

}

// Color / tone mapping

renderer.outputColorSpace =
    THREE.SRGBColorSpace;

renderer.toneMapping =
    THREE.ACESFilmicToneMapping;

renderer.toneMappingExposure =
    0.85;


// Shadows

renderer.shadowMap.enabled = true;

renderer.shadowMap.type =
    THREE.PCFShadowMap;


// ======================================================
// POST PROCESSING / BLOOM
// ======================================================

const renderPass =
    new RenderPass(
        scene,
        camera
    );


const bloomPass =
    new UnrealBloomPass(
        new THREE.Vector2(
            hero3D.clientWidth,
            hero3D.clientHeight
        ),

        0.8,    // strength
        0.45,   // radius
        1.0     // threshold
    );


const outputPass =
    new OutputPass();


// ======================================================
// POST PROCESSING RENDER TARGET
// ======================================================

const composerRenderTarget =
    new THREE.WebGLRenderTarget(
        hero3D.clientWidth,
        hero3D.clientHeight
    );


// MSAA for smoother edges.

composerRenderTarget.samples =
    4;


// ======================================================
// EFFECT COMPOSER
// ======================================================

const composer =
    new EffectComposer(
        renderer,
        composerRenderTarget
    );

const pixelRatio =
    Math.min(
        window.devicePixelRatio,
        2
    );


renderer.setPixelRatio(
    pixelRatio
);


composer.setPixelRatio(
    pixelRatio
);

composer.addPass(
    renderPass
);

composer.addPass(
    bloomPass
);

composer.addPass(
    smaaPass
);

composer.addPass(
    outputPass
);




// ======================================================
// RECORD HALO
// ======================================================

function setRecordGlow(
    record,
    glowing
) {

    const halo =
        record.userData.halo;


    if (!halo) {
        return;
    }


    halo.visible =
        true;


    halo.userData.targetOpacity =
        glowing
            ? 0.56
            : 0;

}

// ======================================================
// RECORD HALO TEXTURE
// ======================================================

function createHaloTexture() {

    const canvas =
        document.createElement(
            "canvas"
        );

    canvas.width = 256;
    canvas.height = 256;


    const context =
        canvas.getContext("2d");


    const gradient =
        context.createRadialGradient(
            128,
            128,
            30,

            128,
            128,
            128
        );


    gradient.addColorStop(
        0,
        "rgba(255,255,255,1)"
    );

    gradient.addColorStop(
        0.45,
        "rgba(255,255,255,0.9)"
    );

    gradient.addColorStop(
        0.75,
        "rgba(255,255,255,0.35)"
    );

    gradient.addColorStop(
        1,
        "rgba(255,255,255,0)"
    );


    context.fillStyle =
        gradient;

    context.fillRect(
        0,
        0,
        256,
        256
    );


    const texture =
        new THREE.CanvasTexture(
            canvas
        );

    texture.colorSpace =
        THREE.SRGBColorSpace;


    return texture;

}


const haloTexture =
    createHaloTexture();



// ======================================================
// CREATE RECORD HALO
// ======================================================

// ======================================================
// CREATE RECORD HALO
// ======================================================

function createRecordHalo(record) {

    const config =
        recordConfig[
        record.name
        ];


    if (!config) {
        return;
    }


    // --------------------------------------
    // FIND RECORD SIZE
    // --------------------------------------

    const box =
        new THREE.Box3()
            .setFromObject(record);


    const size =
        new THREE.Vector3();


    box.getSize(size);


    const diameter =
        Math.max(
            size.x,
            size.y,
            size.z
        );


    // --------------------------------------
    // HALO COLOR
    // --------------------------------------

    const haloColor =
        new THREE.Color(
            config.glowColor
        );


    // Bright enough for UnrealBloomPass.

    haloColor.multiplyScalar(4);


    // --------------------------------------
    // HALO MATERIAL
    // --------------------------------------

    const haloMaterial =
        new THREE.MeshBasicMaterial({

            map:
                haloTexture,

            color:
                haloColor,

            transparent:
                true,

            opacity:
                0,

            depthWrite:
                false,

            blending:
                THREE.AdditiveBlending,

            toneMapped:
                false,

            side:
                THREE.DoubleSide

        });


    // --------------------------------------
    // HALO PLANE
    // --------------------------------------

    const haloGeometry =
        new THREE.PlaneGeometry(
            1,
            1
        );


    const halo =
        new THREE.Mesh(
            haloGeometry,
            haloMaterial
        );


    const haloSize =
        diameter * 1.4;


    halo.scale.set(
        haloSize,
        haloSize,
        1
    );


    // Slightly behind the record.
    //
    // If this puts it on the wrong side,
    // change -0.015 to +0.015.

    halo.position.set(
        0,
        0,
        -0.015
    );


    // Optional tiny artistic rotation.

    halo.rotation.z =
        THREE.MathUtils.degToRad(-3);


    halo.visible =
        false;


    halo.userData.currentOpacity =
        0;

    halo.userData.targetOpacity =
        0;


    // IMPORTANT:
    // Attach the halo directly to the record.

    record.add(
        halo
    );


    record.userData.halo =
        halo;

}

// ======================================================
// UPDATE RECORD HALOS
// ======================================================

function updateRecordHalos() {

    interactiveRecords.forEach(
        (record) => {

            const halo =
                record.userData.halo;


            if (!halo) {
                return;
            }


            // =====================================
            // FADE
            // =====================================

            halo.userData.currentOpacity =
                THREE.MathUtils.lerp(

                    halo.userData.currentOpacity,

                    halo.userData.targetOpacity,

                    0.08

                );


            halo.material.opacity =
                halo.userData.currentOpacity;


            if (
                halo.userData.currentOpacity <
                0.01 &&

                halo.userData.targetOpacity ===
                0
            ) {

                halo.visible =
                    false;

            }

        }
    );

}


// ======================================================
// HDR ENVIRONMENT
// ======================================================

const hdrLoader =
    new HDRLoader();


hdrLoader.load(

    "/hdr/sunrise.hdr",

    (hdrTexture) => {

        hdrTexture.mapping =
            THREE.EquirectangularReflectionMapping;


        scene.environment =
            hdrTexture;

        scene.background =
            hdrTexture;


        // ==================================
        // HDR LIGHTING
        // ==================================

        scene.environmentIntensity =
            1.15;


        // ==================================
        // HDR BACKGROUND
        // ==================================

        scene.backgroundIntensity =
            3;


        // What the user visually sees.

        scene.backgroundRotation.x =
            THREE.MathUtils.degToRad(0);

        scene.backgroundRotation.y =
            THREE.MathUtils.degToRad(-2);

        scene.backgroundRotation.z =
            THREE.MathUtils.degToRad(-7.5);


        // ==================================
        // HDR LIGHTING DIRECTION
        // ==================================

        scene.environmentRotation.x =
            THREE.MathUtils.degToRad(0);

        scene.environmentRotation.y =
            THREE.MathUtils.degToRad(1);

        scene.environmentRotation.z =
            THREE.MathUtils.degToRad(0);


        // ==================================
        // BACKGROUND BLUR
        // ==================================

        scene.backgroundBlurriness =
            0.06;


        console.log(
            "HDR environment loaded!"
        );


        markLoaded(
            "hdr"
        );

    },


    undefined,


    (error) => {

        console.error(
            "HDR failed:",
            error
        );


        markLoaded(
            "hdr"
        );

    }

);

// ======================================================
// HTML NAVIGATION -> 3D RECORDS
// ======================================================

window.addEventListener(
    "portfolio-section-selected",
    (event) => {

        const sectionName =
            event.detail.section;


        // Don't interrupt an animation
        // already in progress.

        if (
            recordAnimationPlaying
        ) {

            return;

        }


        const record =
            getRecordBySection(
                sectionName
            );


        if (record) {

            // false because portfolio-ui.js
            // already changed the HTML.

            selectRecord(
                record,
                false
            );

        }

    }
);

// ======================================================
// MOUSE / CAMERA PARALLAX
// ======================================================



const mouse = {
    x: 0,
    y: 0
};


const cameraMoveAmount = {
    x: 0.12,
    y: 0.07
};



window.addEventListener(
    "pointermove",
    (event) => {

        const rect =
            canvas.getBoundingClientRect();


        const x =
            (
                event.clientX -
                rect.left
            ) / rect.width;


        const y =
            (
                event.clientY -
                rect.top
            ) / rect.height;


        // Used for raycasting

        pointer.x =
            x * 2 - 1;

        pointer.y =
            -(y * 2 - 1);


        // Used for camera parallax

        mouse.x =
            pointer.x;

        mouse.y =
            pointer.y;

    }
);



// ======================================================
// LIGHTING
// ======================================================


// ------------------------------------------------------
// Ambient Light
// ------------------------------------------------------

const ambientLight =
    new THREE.AmbientLight(
        0xffe2c8,
        0.28
    );

scene.add(ambientLight);


// ------------------------------------------------------
// Window / Key Light
// ------------------------------------------------------

const keyLight =
    new THREE.DirectionalLight(
        0xffb36b,
        3.5
    );


keyLight.position.set(
    5,
    2,
    2
);

keyLight.target.position.set(
    3,
    1,
    1
);


keyLight.castShadow = true;


// Reduce shadow acne.

keyLight.shadow.normalBias =
    0.025;

keyLight.shadow.bias =
    -0.0002;


// Shadow area.

keyLight.shadow.camera.left =
    -4;

keyLight.shadow.camera.right =
    6;

keyLight.shadow.camera.top =
    6;

keyLight.shadow.camera.bottom =
    -6;

keyLight.shadow.camera.near =
    0.1;

keyLight.shadow.camera.far =
    30;


// Shadow quality.

keyLight.shadow.mapSize.width =
    2048;

keyLight.shadow.mapSize.height =
    2048;


scene.add(keyLight);
scene.add(keyLight.target);

//------------------------------------------------------
// WINDOW GLOW
//------------------------------------------------------

const windowGlow =
    new THREE.RectAreaLight(
        0xff806e,
        2.5,
        3,
        2
    );


windowGlow.position.set(
    4.5,
    2.5,
    -1
);


windowGlow.lookAt(
    0,
    1,
    -2
);


scene.add(
    windowGlow
);


// ------------------------------------------------------
// Fill Light
// ------------------------------------------------------

const fillLight =
    new THREE.DirectionalLight(
        0xc4cbea,
        3
    );


fillLight.position.set(
    -4,
    5.5,
    4
);


scene.add(fillLight);


// ------------------------------------------------------
// Lamp Light
// ------------------------------------------------------

const lampLight =
    new THREE.PointLight(
        0xffb46b,
        1.5,
        8,
        2
    );


lampLight.position.set(
    2.5,
    1.8,
    -2.8
);

lampLight.castShadow = true;

lampLight.shadow.normalBias =
    0.02;

lampLight.shadow.bias =
    -0.0002;


scene.add(lampLight);

const lampSoftLight =
    new THREE.RectAreaLight(
        0xffc27a,
        1.4,
        1.1,
        0.7
    );


lampSoftLight.position.set(
    2.4,
    1.8,
    -2.8
);


lampSoftLight.lookAt(
    1.5,
    0.5,
    -2.8
);


scene.add(
    lampSoftLight
);

//------------------------------------------------------
// SUNSET FILL LIGHT
//------------------------------------------------------


const sunsetFill =
    new THREE.DirectionalLight(
        0xffa6b5,
        0.22
    );


sunsetFill.position.set(
    5.5,
    3.8,
    1.5
);

sunsetFill.target.position.set(
    -8,
    1,
    -8
);

scene.add(
    sunsetFill.target
);
scene.add(
    sunsetFill.target
);



// ======================================================
// ANIMATION SETTINGS
// ======================================================

const timer =
    new THREE.Timer();

timer.connect(document);


let mixer = null;

let animationClips = [];

const actions = {};

// =========================================
// RECORD INTERACTION 
// =========================================

const raycaster =
    new THREE.Raycaster();

const pointer =
    new THREE.Vector2();


const interactiveRecords = [];


let hoveredRecord = null;

let selectedRecord = null;

let recordAnimationPlaying =
    false;


// Keep your Blender animation names here.
// "Experiance" intentionally matches the Blender clip name.

const ANIMATIONS = {

    plantIdle: [
        "leafAction",
        "leaf.001Action",
        "leaf.002Action",
        "leaf.003Action",
        "leaf.004Action",
        "leaf.005Action",
        "leaf.006Action",
        "leaf.007Action"
    ],

    characterIdle:
        "Idle",

    recordPlayer:
        "RecordPlayer",


    projects: {
        hover: "ProjectsHover",
        play: "ProjectsPlay"
    },


    skills: {
        hover: "SkillsHover",
        play: "SkillsPlay"
    },


    experience: {
        hover: "ExperienceHover",
        play: "ExperiencePlay"
    }

};


const recordConfig = {

    Record_Projects: {
        hover: ANIMATIONS.projects.hover,
        play: ANIMATIONS.projects.play,
        section: "projects",
        glowColor: 0xCC5500
    },

    Record_Skills: {
        hover: ANIMATIONS.skills.hover,
        play: ANIMATIONS.skills.play,
        section: "skills",
        glowColor: 0xA8DCAB
    },

    Record_Experience: {
        hover: ANIMATIONS.experience.hover,
        play: ANIMATIONS.experience.play,
        section: "experience",
        glowColor: 0xFFBF00
    }

};

// ======================================================
// ANIMATION FUNCTIONS
// ======================================================

function setupAnimations(gltf) {

    mixer =
        new THREE.AnimationMixer(
            portfolioModel
        );

    animationClips =
        gltf.animations;


    // Create actions for every clip

    animationClips.forEach(
        (clip) => {

            actions[clip.name] =
                mixer.clipAction(clip);

        }
    );


    // -------------------------------------
    // PLANT IDLE
    // -------------------------------------

    playAnimationGroup(
        ANIMATIONS.plantIdle,
        THREE.LoopRepeat
    );


    // -------------------------------------
    // CHARACTER IDLE
    // -------------------------------------

    playAnimation(
        ANIMATIONS.characterIdle,
        THREE.LoopRepeat
    );



    // Helpful while developing.

    console.table(
        animationClips.map(
            (clip) => ({

                name:
                    clip.name,

                duration:
                    clip.duration

            })
        )
    );

    mixer.addEventListener(
        "finished",
        handleAnimationFinished
    );

}




function playAnimation(
    name,
    loop = THREE.LoopRepeat
) {

    const action =
        actions[name];


    if (!action) {

        console.warn(
            `Animation not found: ${name}`
        );

        return null;

    }


    action.reset();


    action.setLoop(
        loop,
        loop === THREE.LoopOnce
            ? 1
            : Infinity
    );


    action.clampWhenFinished =
        loop === THREE.LoopOnce;


    action.play();


    return action;

}

function playAnimationGroup(
    names,
    loop = THREE.LoopRepeat
) {

    names.forEach((name) => {

        playAnimation(
            name,
            loop
        );

    });

}

function debugAnimation(name) {

    console.group(`DEBUG ANIMATION: ${name}`);


    const clip =
        animationClips.find(
            clip => clip.name === name
        );

    const action =
        actions[name];


    console.log(
        "Clip found:",
        clip
    );

    console.log(
        "Action found:",
        action
    );


    if (clip) {

        console.log(
            "Duration:",
            clip.duration
        );


        console.log(
            "Tracks:",
            clip.tracks.map(
                track => track.name
            )
        );

    }


    if (action) {

        console.log(
            "Action enabled:",
            action.enabled
        );

        console.log(
            "Action paused:",
            action.paused
        );

        console.log(
            "Action weight:",
            action.getEffectiveWeight()
        );

        console.log(
            "Action time scale:",
            action.getEffectiveTimeScale()
        );

        console.log(
            "Action time:",
            action.time
        );

        console.log(
            "Action running:",
            action.isRunning()
        );

    }


    console.groupEnd();

}


// ======================================================
// COFFEE STEAM
// ======================================================

const steamParticles = [];

let steamAnchor = null;


function createSteamTexture() {

    const size = 128;

    const canvas =
        document.createElement("canvas");

    canvas.width = size;
    canvas.height = size;


    const context =
        canvas.getContext("2d");


    const gradient =
        context.createRadialGradient(
            size / 2,
            size / 2,
            0,

            size / 2,
            size / 2,
            size / 2
        );


    gradient.addColorStop(
        0,
        "rgba(255,255,255,0.55)"
    );

    gradient.addColorStop(
        0.4,
        "rgba(255,255,255,0.25)"
    );

    gradient.addColorStop(
        1,
        "rgba(255,255,255,0)"
    );


    context.fillStyle =
        gradient;

    context.fillRect(
        0,
        0,
        size,
        size
    );


    return new THREE.CanvasTexture(
        canvas
    );

}

const steamTexture =
    createSteamTexture();

function createSteam() {

    if (!steamAnchor) {
        return;
    }


    for (
        let i = 0;
        i < 8;
        i++
    ) {

        const material =
            new THREE.SpriteMaterial({

                map:
                    steamTexture,

                transparent:
                    true,

                opacity:
                    0.22,

                depthWrite:
                    false

            });


        const particle =
            new THREE.Sprite(
                material
            );


        particle.scale.set(
            0.10,
            0.10,
            0.10
        );


        particle.userData = {

            speed:
                0.08 +
                Math.random() * 0.04,

            offset:
                Math.random(),

            drift:
                (
                    Math.random() -
                    0.5
                ) * 0.05

        };


        steamAnchor.add(
            particle
        );


        steamParticles.push(
            particle
        );

    }

}

function updateSteam(delta) {

    if (!steamParticles.length) {
        return;
    }


    const time =
        timer.getElapsed();


    steamParticles.forEach(
        (particle, index) => {

            const data =
                particle.userData;


            data.offset +=
                delta *
                data.speed;


            if (data.offset > 1) {

                data.offset = 0;

            }


            const progress =
                data.offset;


            // Rise upward

            particle.position.y =
                progress * 0.55;


            // Slight sideways wandering

            particle.position.x =
                Math.sin(
                    time * 1.5 +
                    index
                ) *
                0.025 +
                data.drift *
                progress;


            // Grow as it rises

            const size =
                0.07 +
                progress * 0.17;


            particle.scale.set(
                size,
                size,
                size
            );


            // Fade out toward the top

            particle.material.opacity =
                0.22 *
                (1 - progress);

        }

    );

}


// ======================================================
// LOAD BLENDER SCENE
// ======================================================

const loader =
    new GLTFLoader();


let portfolioModel = null;


loader.load(

    "./models/Stage.glb",


    // =========================================
    // SUCCESS
    // =========================================

    (gltf) => {

        portfolioModel =
            gltf.scene;


        scene.add(
            portfolioModel
        );


        // -------------------------------------
        // MESH / MATERIAL SETUP
        // -------------------------------------

        portfolioModel.traverse(
            (object) => {

                if (!object.isMesh) {
                    return;
                }


                object.castShadow =
                    true;

                object.receiveShadow =
                    true;


                if (
                    object.material?.transparent
                ) {

                    object.castShadow =
                        false;

                }


                if (
                    object.name
                        .toLowerCase()
                        .includes("character") ||

                    object.name
                        .toLowerCase()
                        .includes("rig") ||

                    object.isSkinnedMesh
                ) {

                    console.log(
                        "CHARACTER CANDIDATE:",
                        object.name,
                        object.type,
                        object
                    );

                }

            }
        );


        // -------------------------------------
        // ANIMATIONS
        // -------------------------------------

        setupAnimations(
            gltf
        );


        // -------------------------------------
        // INTERACTIVE RECORDS
        // -------------------------------------

        Object.keys(
            recordConfig
        ).forEach(
            (recordName) => {

                const record =
                    portfolioModel.getObjectByName(
                        recordName
                    );

                if (record) {

                    interactiveRecords.push(
                        record
                    );


                    createRecordHalo(
                        record
                    );

                }

                else {

                    console.warn(
                        `Record not found: ${recordName}`
                    );

                }

            }
        );



        // -------------------------------------
        // STEAM
        // -------------------------------------

        steamAnchor =
            portfolioModel.getObjectByName(
                "CoffeeSteamAnchor"
            );


        if (steamAnchor) {

            createSteam();

        }


        console.log(
            "Stage loaded!"
        );

        // ======================================================
        // FIND CHARACTER HITBOX
        // ======================================================

        characterHitbox =
            portfolioModel.getObjectByName(
                "CharacterHitbox"
            );


        if (characterHitbox) {

            console.log(
                "Character hitbox ready:",
                characterHitbox
            );


            // Keep the mesh raycastable,
            // but make it invisible.

            characterHitbox.material =
                new THREE.MeshBasicMaterial({
                    transparent: true,
                    opacity: 0,
                    depthWrite: false
                });

            characterHitbox.castShadow = false;
            characterHitbox.receiveShadow = false;

        }

        else {

            console.warn(
                "CharacterHitbox not found"
            );

        }


        // =====================================
        // IMPORTANT:
        // Tell loader that 3D model is ready.
        // =====================================

        markLoaded(
            "model"
        );

    },




    // =========================================
    // PROGRESS
    // =========================================

    (progress) => {

        if (!progress.total) {
            return;
        }


        const percent =
            Math.round(
                (
                    progress.loaded /
                    progress.total
                ) * 100
            );


        console.log(
            `Loading: ${percent}%`
        );

    },


    // =========================================
    // ERROR
    // =========================================

    (error) => {

        console.error(
            "Stage failed to load:",
            error
        );


        // Don't trap the user
        // on the loading screen.

        markLoaded(
            "model"
        );

    }

);


// ======================================================
// CHARACTER INTERACTION
// ======================================================

let characterHitbox = null;
let characterHovered = false;



// Point on the character that was clicked.

const aboutBubbleAnchor =
    new THREE.Vector3();

const aboutBubbleWorldPosition =
    new THREE.Vector3();

const aboutBubbleScreenPosition =
    new THREE.Vector3();

let hasAboutBubbleAnchor =
    false;



const characterScreenPosition =
    new THREE.Vector3();

const characterWorldPosition =
    new THREE.Vector3();

// ======================================================
// RECORD INTERACTION FUNCTIONS
// ======================================================


// Find the root record object from a child object.
function findRecordRoot(object) {

    let current =
        object;


    while (current) {

        if (
            interactiveRecords.includes(
                current
            )
        ) {

            return current;

        }


        current =
            current.parent;

    }


    return null;

}

// Start the hover animation for a record.
function startRecordHover(record) {

    const config =
        recordConfig[
        record.name
        ];


    if (!config) {
        return;
    }


    const action =
        actions[
        config.hover
        ];


    if (!action) {
        return;
    }

    setRecordGlow(
        record,
        true
    );

    action.enabled =
        true;

    action.paused =
        false;

    action.timeScale =
        1;


    action.setLoop(
        THREE.LoopOnce,
        1
    );

    action.clampWhenFinished =
        true;


    action.reset();

    action.play();

}

// End the hover animation for a record.
function endRecordHover(record) {

    const config =
        recordConfig[
        record.name
        ];


    if (!config) {
        return;
    }


    const action =
        actions[
        config.hover
        ];


    if (!action) {
        return;
    }

    setRecordGlow(
        record,
        false
    );

    action.enabled =
        true;

    action.paused =
        false;


    // Reverse the Blender hover animation.

    action.timeScale =
        -1;


    // If it already finished,
    // begin reversing from the end.

    if (action.time === 0) {

        action.time =
            action.getClip().duration;

    }


    action.play();

}

// ======================================================
// ABOUT BUBBLE
// ======================================================



const aboutBubble =
    document.getElementById(
        "aboutBubble"
    );

const closeAboutBubble =
    document.getElementById(
        "closeAboutBubble"
    );

canvas.addEventListener(
    "click",
    () => {

        // =====================================
        // CHARACTER / ABOUT
        // =====================================

        if (characterHovered) {

            raycaster.setFromCamera(
                pointer,
                camera
            );


            const hits =
                raycaster.intersectObject(
                    characterHitbox,
                    false
                );


            if (hits.length > 0) {

                // The raycaster gives us the clicked
                // point in WORLD coordinates.

                aboutBubbleAnchor.copy(
                    hits[0].point
                );


                // Convert it into CharacterHitbox's
                // LOCAL coordinates.
                //
                // This lets the anchor move with
                // the character/hitbox later.

                characterHitbox.worldToLocal(
                    aboutBubbleAnchor
                );


                hasAboutBubbleAnchor =
                    true;

            }


            toggleAboutBubble();

            return;

        }


        // =====================================
        // RECORDS
        // =====================================

        if (
            !hoveredRecord ||
            recordAnimationPlaying
        ) {

            return;

        }


        selectRecord(
            hoveredRecord
        );

    }
);

// ======================================================
// CLOSE ABOUT BUBBLE ON SCROLL
// ======================================================

window.addEventListener("scroll", () => {

    // Make sure our bubble exists.

    if (!aboutBubble) {
        return;
    }

    // If the bubble is currently open, close it.

    if (!aboutBubble.hidden) {

        aboutBubble.hidden = true;

    }

}, { passive: true });

function updateAboutBubblePosition() {

    if (
        !characterHitbox ||
        !aboutBubble ||
        aboutBubble.hidden ||
        !hasAboutBubbleAnchor
    ) {

        return;

    }


    // =====================================
    // GET SAVED CLICK POINT IN WORLD SPACE
    // =====================================

    aboutBubbleWorldPosition.copy(
        aboutBubbleAnchor
    );


    characterHitbox.localToWorld(
        aboutBubbleWorldPosition
    );


    // =====================================
    // PROJECT 3D POINT TO SCREEN
    // =====================================

    aboutBubbleScreenPosition.copy(
        aboutBubbleWorldPosition
    );


    aboutBubbleScreenPosition.project(
        camera
    );


    // =====================================
    // CONVERT TO HERO PIXELS
    // =====================================

    const heroWidth =
        hero3D.clientWidth;

    const heroHeight =
        hero3D.clientHeight;

    // =====================================
    // SCALE BUBBLE WITH 3D SCENE
    // =====================================

    // Approximate size where your scene
    // looks "normal" at full scale.

    const baseHeroWidth =
        1400;

    const baseHeroHeight =
        800;


    // Compare current canvas size to
    // our normal desktop canvas size.

    const widthScale =
        heroWidth /
        baseHeroWidth;

    const heightScale =
        heroHeight /
        baseHeroHeight;


    // Use whichever dimension has
    // shrunk more.

    const bubbleScale =
        Math.min(
            widthScale,
            heightScale,
            1
        );


    // Prevent it from becoming unusably tiny.

    const finalBubbleScale =
        Math.max(
            bubbleScale,
            0.6
        );


    aboutBubble.style.setProperty(
        "--bubble-scale",
        finalBubbleScale
    );

    const clickX =
        (
            aboutBubbleScreenPosition.x + 1
        ) / 2 *
        heroWidth;


    const clickY =
        (
            1 -
            aboutBubbleScreenPosition.y
        ) / 2 *
        heroHeight;


    // =====================================
    // POSITION BUBBLE NEAR CLICK
    // =====================================
    const bubbleWidth =
        aboutBubble.offsetWidth *
        finalBubbleScale;

    const bubbleHeight =
        aboutBubble.offsetHeight *
        finalBubbleScale;




    let bubbleX =
        clickX - bubbleWidth;

    let bubbleY =
        clickY -
        bubbleHeight;


    // =====================================
    // POSITION RELATIVE TO BROWSER WINDOW
    // =====================================

    // Get the position of the hero on the screen.

    const heroRect =
        hero3D.getBoundingClientRect();


    // Convert hero coordinates into viewport coordinates.

    bubbleX += heroRect.left;

    bubbleY += heroRect.top;


    // =====================================
    // KEEP BUBBLE INSIDE THE BROWSER WINDOW
    // =====================================

    const padding = 12;


    // Calculate maximum positions.

    const maxX =
        Math.max(
            padding,
            window.innerWidth - bubbleWidth - padding
        );

    const maxY =
        Math.max(
            padding,
            window.innerHeight - bubbleHeight - padding
        );


    // Keep it inside the visible browser window,
    // NOT inside the Three.js canvas.

    bubbleX =
        THREE.MathUtils.clamp(
            bubbleX,
            padding,
            maxX
        );

    bubbleY =
        THREE.MathUtils.clamp(
            bubbleY,
            padding,
            maxY
        );


    // =====================================
    // APPLY POSITION
    // =====================================

    aboutBubble.style.left =
        `${bubbleX}px`;

    aboutBubble.style.top =
        `${bubbleY}px`;

}

// ======================================================
// BUBBLE CLICK
// ======================================================
function toggleAboutBubble() {

    if (!aboutBubble) {
        return;
    }

    const isCurrentlyOpen =
        !aboutBubble.hidden;


    aboutBubble.hidden =
        isCurrentlyOpen;


    if (!isCurrentlyOpen) {

        // Wait until the bubble is visible
        // before calculating its size/position.

        requestAnimationFrame(
            updateAboutBubblePosition
        );

    }

}

// ======================================================
// CLOSE ABOUT BUBBLE
// ======================================================

closeAboutBubble?.addEventListener("click", () => {
    aboutBubble.hidden = true;
});


window.addEventListener("keydown", (event) => {

    if (event.key === "Escape" && aboutBubble) {
        aboutBubble.hidden = true;
    }

});


// ======================================================
// ABOUT ME NAVIGATION BUTTON
// ======================================================

const openAboutButton =
    document.getElementById("openAboutButton");


openAboutButton?.addEventListener("click", () => {

    if (!characterHitbox || !aboutBubble) {
        return;
    }

    // Find the character's bounding box.

    const bounds =
        new THREE.Box3().setFromObject(characterHitbox);

    // Find the middle of the character.

    const characterCenter =
        bounds.getCenter(new THREE.Vector3());


    // Move our anchor toward the character's head.

    characterCenter.y =
        bounds.min.y +
        (bounds.max.y - bounds.min.y) * 0.85;


    // Save the position using our existing system.

    aboutBubbleAnchor.copy(characterCenter);

    characterHitbox.worldToLocal(aboutBubbleAnchor);

    hasAboutBubbleAnchor = true;


    // Open the same bubble used by clicking the character.

    toggleAboutBubble();

});


// ======================================================
//   RECORD CLICK
// ======================================================
function selectRecord(
    record,
    updateContent = true
) {

    const config =
        recordConfig[
        record.name
        ];


    if (!config) {
        return;
    }


    recordAnimationPlaying =
        true;

    selectedRecord =
        record;

    hoveredRecord = null;

    setRecordGlow(
        record,
        false
    );


    if (updateContent) {

        showPortfolioSection(
            config.section
        );

    }


    canvas.style.cursor =
        "default";


    // -------------------------------------
    // STOP HOVER ANIMATION
    // -------------------------------------

    const hoverAction =
        actions[
        config.hover
        ];


    if (hoverAction) {

        hoverAction.stop();

    }


    // -------------------------------------
    // GET RECORD PLAY ANIMATION
    // -------------------------------------

    const playAction =
        actions[
        config.play
        ];


    // -------------------------------------
    // GET RECORD PLAYER ANIMATION
    // -------------------------------------

    const recordPlayerAction =
        actions[
        ANIMATIONS.recordPlayer
        ];


    if (
        !playAction ||
        !recordPlayerAction
    ) {

        console.warn(
            "Missing record or record-player animation"
        );

        recordAnimationPlaying =
            false;

        return;

    }


    // -------------------------------------
    // PREPARE BOTH ANIMATIONS
    // -------------------------------------

    playAction.reset();

    playAction.setLoop(
        THREE.LoopOnce,
        1
    );

    playAction.clampWhenFinished =
        true;


    recordPlayerAction.reset();

    recordPlayerAction.setLoop(
        THREE.LoopOnce,
        1
    );

    recordPlayerAction.clampWhenFinished =
        true;


    // -------------------------------------
    // PLAY BOTH AT THE SAME TIME
    // -------------------------------------

    playAction.play();

    recordPlayerAction.play();


    console.log(
        `Selected: ${record.name}`
    );

}

function getRecordBySection(
    sectionName
) {

    return interactiveRecords.find(
        (record) => {

            const config =
                recordConfig[
                record.name
                ];


            return (
                config?.section ===
                sectionName
            );

        }
    );

}

function handleAnimationFinished(event) {

    if (!selectedRecord) {
        return;
    }


    const config =
        recordConfig[
        selectedRecord.name
        ];


    if (!config) {
        return;
    }


    // Wait for the selected record's
    // Play animation to finish.

    if (
        event.action ===
        actions[config.play]
    ) {

        console.log(
            `${config.section} animation finished`
        );


        // Allow hovering/clicking again
        recordAnimationPlaying =
            false;


        // Reset hover state
        hoveredRecord =
            null;


        // Reset the hover animation back
        // to its starting pose
        const hoverAction =
            actions[config.hover];

        if (hoverAction) {

            hoverAction.stop();
            hoverAction.reset();

        }


        // This record is no longer locked
        // out of raycasting
        selectedRecord =
            null;


        return;

    }
}






// ======================================================
// WINDOW RESIZE
// ======================================================

const resizeObserver =
    new ResizeObserver(
        resizeScene
    );


resizeObserver.observe(
    hero3D
);


resizeScene();

// ======================================================
// RENDER LOOP
// ======================================================

function animate() {

    requestAnimationFrame(
        animate
    );


    // --------------------------------------------------
    // TIME / BLENDER ANIMATIONS
    // --------------------------------------------------

    timer.update();

    const delta =
        timer.getDelta();


    if (mixer) {

        mixer.update(
            delta
        );

    }

    // Update steam particles
    updateSteam(delta);

    // =========================================
    // RECORD HOVER
    // =========================================

    if (
        interactiveRecords.length > 0 &&
        !recordAnimationPlaying
    ) {

        raycaster.setFromCamera(
            pointer,
            camera
        );


        const intersections =
            raycaster.intersectObjects(
                interactiveRecords,
                true
            );


        const newHoveredRecord =
            intersections.length > 0
                ? findRecordRoot(
                    intersections[0].object
                )
                : null;


        if (
            newHoveredRecord !==
            hoveredRecord
        ) {

            // Leave old record

            if (hoveredRecord) {

                endRecordHover(
                    hoveredRecord
                );

            }


            hoveredRecord =
                newHoveredRecord;


            // Enter new record

            if (hoveredRecord) {

                startRecordHover(
                    hoveredRecord
                );


                canvas.style.cursor =
                    "pointer";

            }

            else {

                canvas.style.cursor =
                    "default";

            }

        }

        // ======================================================
        // CHARACTER HOVER
        // ======================================================

        let characterHit = false;


        if (
            characterHitbox &&
            !recordAnimationPlaying
        ) {

            const characterIntersections =
                raycaster.intersectObject(
                    characterHitbox,
                    false
                );


            characterHit =
                characterIntersections.length > 0;

        }


        if (
            characterHit !==
            characterHovered
        ) {

            characterHovered =
                characterHit;


            document.body.classList.toggle(
                "character-hovering",
                characterHovered
            );


            if (characterHovered) {

                // Hide normal mouse cursor
                // so our custom ? cursor appears.

                canvas.style.cursor =
                    "none";

            }

            else if (hoveredRecord) {

                canvas.style.cursor =
                    "pointer";

            }

            else {

                canvas.style.cursor =
                    "default";

            }

        }

    }

    const characterCursor =
        document.getElementById("characterCursor");


    window.addEventListener("pointermove", (event) => {

        if (characterCursor) {

            characterCursor.style.left =
                `${event.clientX}px`;

            characterCursor.style.top =
                `${event.clientY}px`;

        }

    });



    // --------------------------------------------------
    // CAMERA PARALLAX
    // --------------------------------------------------

    const targetX =
        cameraBasePosition.x +
        mouse.x *
        cameraMoveAmount.x;


    const targetY =
        cameraBasePosition.y +
        mouse.y *
        cameraMoveAmount.y;


    camera.position.x =
        THREE.MathUtils.lerp(
            camera.position.x,
            targetX,
            0.03
        );


    camera.position.y =
        THREE.MathUtils.lerp(
            camera.position.y,
            targetY,
            0.03
        );


    camera.lookAt(
        cameraBaseTarget
    );

    if (
        aboutBubble &&
        !aboutBubble.hidden
    ) {

        updateAboutBubblePosition();

    }


    // --------------------------------------------------
    // RENDER
    // --------------------------------------------------

    updateRecordHalos();

    composer.render();

}


animate();