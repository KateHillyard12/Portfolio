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

const hero3D =
    document.querySelector("#hero-3d");

const canvas =
    document.querySelector("#portfolio-scene");


// ======================================================
// SCENE
// ======================================================

const scene = new THREE.Scene();


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
        width === 0 ||
        height === 0
    ) {

        console.warn(
            "3D hero currently has no size."
        );

        return;

    }

    // -------------------------------------
    // RENDERER
    // -------------------------------------

    renderer.setSize(
        width,
        height,
        false
    );


    renderer.setPixelRatio(
        Math.min(
            window.devicePixelRatio,
            2
        )
    );


    // -------------------------------------
    // CAMERA
    // -------------------------------------

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
            1;


        // Position visible HDR.

        scene.backgroundRotation.y =
            THREE.MathUtils.degToRad(-2);

        scene.backgroundRotation.z =
            THREE.MathUtils.degToRad(-7.5);


        // Position HDR lighting.

        scene.environmentRotation.y =
            THREE.MathUtils.degToRad(1);


        // Slight background softness.

        scene.backgroundBlurriness =
            0.06;


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
        section: "projects"
    },

    Record_Skills: {
        hover: ANIMATIONS.skills.hover,
        play: ANIMATIONS.skills.play,
        section: "skills"
    },

    Record_Experience: {
        hover: ANIMATIONS.experience.hover,
        play: ANIMATIONS.experience.play,
        section: "experience"
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

        // =========================================
        // FIND INTERACTIVE RECORDS
        // =========================================

        Object.keys(recordConfig).forEach(
            (recordName) => {

                const record =
                    portfolioModel.getObjectByName(
                        recordName
                    );


                if (record) {

                    interactiveRecords.push(
                        record
                    );

                    console.log(
                        `Record ready: ${recordName}`
                    );

                }

                else {

                    console.warn(
                        `Record not found: ${recordName}`
                    );

                }

            }
        );

        steamAnchor =
            portfolioModel.getObjectByName(
                "CoffeeSteamAnchor"
            );


        if (steamAnchor) {

            createSteam();

        }
        else {

            console.warn(
                "CoffeeSteamAnchor not found"
            );

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


canvas.addEventListener(
    "click",
    () => {

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


function selectRecord(record) {

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