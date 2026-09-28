/*!
* Start Bootstrap - Resume v7.0.6 (https://startbootstrap.com/theme/resume)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-resume/blob/master/LICENSE)
*/
//
// Scripts
// 



window.addEventListener('DOMContentLoaded', event => {
    

    // Activate Bootstrap scrollspy on the main nav element
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


const profileFlip = document.getElementById("profileFlip");

if (profileFlip) {
    profileFlip.addEventListener("click", () => {
        profileFlip.classList.toggle("is-flipped");
    });
}





        document.addEventListener("DOMContentLoaded", () => {
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

            function getCompareGallery(clickedImg) {
                const tabPane = clickedImg.closest(".tab-pane");
                if (tabPane) {
                    const compareImages = Array.from(
                        tabPane.querySelectorAll('img.asset-pop[data-bs-target="#realmCompareModal"]')
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

            function updateModalImage() {
                const activeImg = currentGallery[currentIndex];
                if (!activeImg || !modalImg || !modalTitle || !prevBtn || !nextBtn) return;

                modalImg.src = activeImg.src;
                modalImg.alt = activeImg.alt || "Full Size Image";
                modalTitle.textContent = activeImg.alt || "Full Size Image";

                prevBtn.disabled = currentGallery.length <= 1 || currentIndex === 0;
                nextBtn.disabled = currentGallery.length <= 1 || currentIndex === currentGallery.length - 1;
            }

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


        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('hidden.bs.modal', () => {
                const videos = modal.querySelectorAll('video');

                videos.forEach(video => {
                    video.pause();
                    video.currentTime = 0;
                });
            });
        });


        import * as THREE from "three";

import { GLTFLoader } from
    "three/addons/loaders/GLTFLoader.js";

import { OrbitControls } from
    "three/addons/controls/OrbitControls.js";


// =========================================
// CANVAS
// =========================================

const canvas =
    document.querySelector("#portfolio-scene");


// =========================================
// SCENE
// =========================================

const scene =
    new THREE.Scene();

// =========================================
// SCENE BACKGROUND
// =========================================

scene.background = new THREE.Color(0xe8e2d8);


// =========================================
// CAMERA
// =========================================

const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);


// This is the camera position we found
// manually while using OrbitControls.

const cameraBasePosition = new THREE.Vector3(
    -1.5957,
    2.0586,
    1.8238
);


// This is the point the camera looks toward.

const cameraBaseTarget = new THREE.Vector3(
    0.2076,
    1.4619,
    -1.0662
);


// Start the camera at its default position.

camera.position.copy(cameraBasePosition);

camera.lookAt(cameraBaseTarget);


// =========================================
// MOUSE POSITION
// =========================================

// Mouse values will range from:
//
// -1 to 1 horizontally
// -1 to 1 vertically

const mouse = {
    x: 0,
    y: 0
};


window.addEventListener("pointermove", (event) => {

    mouse.x =
        (event.clientX / window.innerWidth) * 2 - 1;

    mouse.y =
        -(event.clientY / window.innerHeight) * 2 + 1;

});


// How far the camera is allowed to move.
//
// Keep these numbers small so the user
// cannot see outside of the stage.

const cameraMoveAmount = {
    x: 0.12,
    y: 0.07
};


// =========================================
// RENDERER
// =========================================

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
});


renderer.setSize(
    window.innerWidth,
    window.innerHeight
);


renderer.setPixelRatio(
    Math.min(
        window.devicePixelRatio,
        2
    )
);


// Helps colors from Blender display properly.

renderer.outputColorSpace =
    THREE.SRGBColorSpace;


// Gives the scene a nicer lighting response.

renderer.toneMapping =
    THREE.ACESFilmicToneMapping;

renderer.toneMappingExposure = 1;


// =========================================
// SHADOWS
// =========================================

renderer.shadowMap.enabled = true;


// PCFSoftShadowMap was removed in newer
// versions of Three.js.

renderer.shadowMap.type =
    THREE.PCFShadowMap;


// =========================================
// LIGHTING
// =========================================


// General soft lighting throughout
// the entire scene.

const ambientLight =
    new THREE.AmbientLight(
        0xffffff,
        1.2
    );

scene.add(ambientLight);


// -----------------------------------------
// MAIN / KEY LIGHT
// -----------------------------------------

const keyLight =
    new THREE.DirectionalLight(
        0xfff1df,
        3
    );


keyLight.position.set(
    -4,
    8,
    6
);


keyLight.castShadow = true;

// Helps prevent the mesh from shadowing itself
keyLight.shadow.normalBias = 0.02;

// Tiny depth adjustment
keyLight.shadow.bias = -0.0002;


// Give the shadow camera enough room
// to cover the little stage.

keyLight.shadow.camera.left = -6;
keyLight.shadow.camera.right = 6;
keyLight.shadow.camera.top = 6;
keyLight.shadow.camera.bottom = -6;

keyLight.shadow.camera.near = 0.1;
keyLight.shadow.camera.far = 30;


// Shadow resolution.

keyLight.shadow.mapSize.width = 2048;
keyLight.shadow.mapSize.height = 2048;


scene.add(keyLight);


// -----------------------------------------
// FILL LIGHT
// -----------------------------------------

const fillLight =
    new THREE.DirectionalLight(
        0xdde7ff,
        0.8
    );


fillLight.position.set(
    5,
    3,
    3
);


scene.add(fillLight);


// =========================================
// LOAD THE BLENDER SCENE
// =========================================

const loader = new GLTFLoader();


let portfolioModel;


loader.load(

    "./models/Stage.glb",


    // -------------------------------------
    // MODEL SUCCESSFULLY LOADED
    // -------------------------------------

    (gltf) => {

        portfolioModel = gltf.scene;


        scene.add(portfolioModel);


        // Enable shadows for meshes
        // exported from Blender.

        portfolioModel.traverse((object) => {

            if (object.isMesh) {

                object.castShadow = true;

                object.receiveShadow = true;

            }

        });


        console.log("Stage loaded!");

        console.log(
            "Scene:",
            portfolioModel
        );

        console.log(
            "Animations:",
            gltf.animations
        );


        // Hide the loading message.

        const loading =
            document.querySelector(
                "#scene-loading"
            );


        if (loading) {

            loading.style.display =
                "none";

        }

    },


    // -------------------------------------
    // LOADING PROGRESS
    // -------------------------------------

    (progress) => {

        if (progress.total) {

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

        }

    },


    // -------------------------------------
    // LOAD ERROR
    // -------------------------------------

    (error) => {

        console.error(
            "Stage failed to load:",
            error
        );

    }

);


// =========================================
// WINDOW RESIZE
// =========================================

window.addEventListener(
    "resize",
    () => {

        // Update camera aspect ratio.

        camera.aspect =
            window.innerWidth /
            window.innerHeight;


        camera.updateProjectionMatrix();


        // Resize the renderer.

        renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );


        // Limit pixel density for performance.

        renderer.setPixelRatio(
            Math.min(
                window.devicePixelRatio,
                2
            )
        );

    }
);


// =========================================
// RENDER / ANIMATION LOOP
// =========================================

function animate() {

    requestAnimationFrame(animate);


    // -------------------------------------
    // CAMERA MOUSE PARALLAX
    // -------------------------------------

    // Figure out where the camera
    // should move based on the mouse.

    const targetX =
        cameraBasePosition.x +
        mouse.x * cameraMoveAmount.x;


    const targetY =
        cameraBasePosition.y +
        mouse.y * cameraMoveAmount.y;


    // Slowly move toward that position
    // instead of snapping instantly.

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


    // Keep the camera facing the
    // center of the portfolio stage.

    camera.lookAt(
        cameraBaseTarget
    );


    // -------------------------------------
    // DRAW THE FRAME
    // -------------------------------------

    renderer.render(
        scene,
        camera
    );

}


animate();