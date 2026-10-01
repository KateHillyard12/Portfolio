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

import { HDRLoader } from
    "three/addons/loaders/HDRLoader.js";


// ======================================================
// CANVAS
// ======================================================

const canvas =
    document.querySelector("#portfolio-scene");


// ======================================================
// SCENE
// ======================================================

const scene = new THREE.Scene();


// ======================================================
// CAMERA
// ======================================================

const camera = new THREE.PerspectiveCamera(
    40,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);


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
// HDR ENVIRONMENT
// ======================================================

const hdrLoader =
    new HDRLoader();


hdrLoader.load(

    "/hdr/sunrise.hdr",

    (hdrTexture) => {

        hdrTexture.mapping =
            THREE.EquirectangularReflectionMapping;


        // Use HDR for scene lighting.

        scene.environment =
            hdrTexture;


        // Show HDR through window/background.

        scene.background =
            hdrTexture;


        scene.environmentIntensity =
            0.8;


        // Position visible HDR.

        scene.backgroundRotation.y =
            THREE.MathUtils.degToRad(1);

        scene.backgroundRotation.z =
            THREE.MathUtils.degToRad(-7.5);


        // Position HDR lighting.

        scene.environmentRotation.y =
            THREE.MathUtils.degToRad(1);


        // Slight background softness.

        scene.backgroundBlurriness =
            0.02;


        console.log(
            "HDR environment loaded!"
        );

    },


    undefined,


    (error) => {

        console.error(
            "HDR failed to load:",
            error
        );

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

        mouse.x =
            (event.clientX / window.innerWidth)
            * 2 - 1;

        mouse.y =
            -(event.clientY / window.innerHeight)
            * 2 + 1;

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
        0xfff4e8,
        0.9
    );

scene.add(ambientLight);


// ------------------------------------------------------
// Window / Key Light
// ------------------------------------------------------

const keyLight =
    new THREE.DirectionalLight(
        0xffdfb8,
        3
    );


keyLight.position.set(
    7.8,
    3.4,
    2.6
);


keyLight.target.position.set(
    -2,
    -1,
    -4
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


// ------------------------------------------------------
// Fill Light
// ------------------------------------------------------

const fillLight =
    new THREE.DirectionalLight(
        0xc9d8ff,
        1.4
    );


fillLight.position.set(
    -4,
    3,
    4
);


scene.add(fillLight);


// ------------------------------------------------------
// Lamp Light
// ------------------------------------------------------

const lampLight =
    new THREE.PointLight(
        0xff9b4a,
        1,
        2,
        1.5
    );


lampLight.position.set(
    2.4,
    0.6,
    -2.7
);


lampLight.castShadow = true;

lampLight.shadow.normalBias =
    0.02;

lampLight.shadow.bias =
    -0.0002;


scene.add(lampLight);


// ======================================================
// OPTIONAL LIGHT HELPERS
// ======================================================

// Turn this on while adjusting lights.

const SHOW_LIGHT_HELPERS =
    false;


if (SHOW_LIGHT_HELPERS) {

    const keyLightHelper =
        new THREE.DirectionalLightHelper(
            keyLight,
            2
        );


    const lampLightHelper =
        new THREE.PointLightHelper(
            lampLight,
            1.5
        );


    scene.add(keyLightHelper);
    scene.add(lampLightHelper);

}


// ======================================================
// ANIMATION SETTINGS
// ======================================================

const clock =
    new THREE.Timer();


let mixer = null;

let animationClips = [];

const actions = {};


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


    // Turn every Blender clip into an
    // AnimationAction and save it.

    animationClips.forEach(
        (clip) => {

            actions[clip.name] =
                mixer.clipAction(clip);

        }
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

    playAnimation(
    ANIMATIONS.skills.play,
    THREE.LoopRepeat
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

// ======================================================
// LOAD BLENDER SCENE
// ======================================================

const loader =
    new GLTFLoader();


let portfolioModel = null;


loader.load(

    "./models/Stage.glb",


    // --------------------------------------------------
    // SUCCESS
    // --------------------------------------------------

    (gltf) => {

        portfolioModel =
            gltf.scene;


        scene.add(
            portfolioModel
        );


        // ----------------------------------------------
        // MODEL MATERIAL / SHADOW SETUP
        // ----------------------------------------------

        portfolioModel.traverse(
            (object) => {

                if (!object.isMesh) {
                    return;
                }


                object.castShadow =
                    true;

                object.receiveShadow =
                    true;


                // Transparent meshes such as smoke
                // generally should not cast solid shadows.

                if (
                    object.material?.transparent
                ) {

                    object.castShadow =
                        false;

                }


                // Slightly limit very rough materials
                // so the HDR environment can show.

                if (
                    object.material &&
                    "roughness" in object.material
                ) {

                    object.material.roughness =
                        Math.min(
                            object.material.roughness,
                            0.75
                        );

                }

            }
        );


        // ----------------------------------------------
        // ANIMATIONS
        // ----------------------------------------------

        setupAnimations(gltf);


        console.log(
            "Stage loaded!"
        );


        // Hide loading message.

        const loading =
            document.querySelector(
                "#scene-loading"
            );


        if (loading) {

            loading.style.display =
                "none";

        }

    },


    // --------------------------------------------------
    // LOADING PROGRESS
    // --------------------------------------------------

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


    // --------------------------------------------------
    // ERROR
    // --------------------------------------------------

    (error) => {

        console.error(
            "Stage failed to load:",
            error
        );

    }

);


// ======================================================
// WINDOW RESIZE
// ======================================================

window.addEventListener(
    "resize",
    () => {

        camera.aspect =
            window.innerWidth /
            window.innerHeight;


        camera.updateProjectionMatrix();


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

    }
);


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

    const delta =
        clock.getDelta();


    if (mixer) {

        mixer.update(
            delta
        );

    }


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


    // --------------------------------------------------
    // RENDER
    // --------------------------------------------------

    renderer.render(
        scene,
        camera
    );

}


animate();