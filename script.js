/* =========================================================
   ELEMENTOS
========================================================= */

const fallingFlower =
    document.getElementById("fallingFlower");

const bouquetSection =
    document.querySelector(".bouquet-section");

const body =
    document.body;


/* =========================================================
   ANIMACIÓN PRINCIPAL CON SCROLL
========================================================= */

function updateScrollAnimation() {

    const scrollY =
        window.scrollY;

    const windowHeight =
        window.innerHeight;

    const documentHeight =
        document.documentElement.scrollHeight;


    /*
    ---------------------------------------------------------
    1. APARICIÓN DEL LIRIO
    ---------------------------------------------------------
    */

    if (scrollY > windowHeight * 0.55) {

        fallingFlower.style.opacity = "1";

    } else {

        fallingFlower.style.opacity = "0";

    }


    /*
    ---------------------------------------------------------
    2. MOVIMIENTO DEL LIRIO
    ---------------------------------------------------------
    */

    const journeyStart =
        windowHeight * 0.65;

    const journeyEnd =
        windowHeight * 2.0;


    let progress =
        (scrollY - journeyStart) /
        (journeyEnd - journeyStart);


    progress =
        Math.max(
            0,
            Math.min(
                1,
                progress
            )
        );


    /*
    Movimiento vertical
    */

    const startPosition = 7;

    const endPosition = 72;

    const currentPosition =
        startPosition +
        (
            endPosition -
            startPosition
        ) *
        progress;


    fallingFlower.style.top =
        `${currentPosition}vh`;


    /*
    Rotación natural
    */

    const rotation =
        Math.sin(
            progress * Math.PI * 4
        ) * 9;


    fallingFlower.style.transform =
        `
        translateX(-50%)
        rotate(${rotation}deg)
        `;


    /*
    ---------------------------------------------------------
    3. ESCALA DEL LIRIO
    ---------------------------------------------------------
    */

    const scale =
        1 -
        (progress * 0.25);


    fallingFlower.style.width =
        `${140 * scale}px`;


    /*
    ---------------------------------------------------------
    4. CAMBIO DEL FONDO
    ---------------------------------------------------------
    */

    const maxColorScroll =
        windowHeight * 2.5;


    let colorProgress =
        scrollY /
        maxColorScroll;


    colorProgress =
        Math.max(
            0,
            Math.min(
                1,
                colorProgress
            )
        );


    /*
    Blanco → crema → amarillo suave
    */

    const red =
        255;

    const green =
        Math.round(
            253 -
            colorProgress * 25
        );

    const blue =
        Math.round(
            244 -
            colorProgress * 95
        );


    body.style.background =
        `
        rgb(
            ${red},
            ${green},
            ${blue}
        )
        `;


    /*
    ---------------------------------------------------------
    5. PROFUNDIDAD DEL FONDO
    ---------------------------------------------------------
    */

    const roses =
        document.querySelectorAll(
            ".background-rose"
        );


    roses.forEach(
        (rose, index) => {

            const movement =
                scrollY *
                (0.015 + index * 0.002);

            rose.style.transform =
                `
                translateY(
                    ${movement}px
                )
                `;

        }
    );
}


/* =========================================================
   SCROLL
========================================================= */

window.addEventListener(
    "scroll",
    updateScrollAnimation,
    {
        passive: true
    }
);


/* =========================================================
   REDIMENSIONAMIENTO
========================================================= */

window.addEventListener(
    "resize",
    updateScrollAnimation
);


/* =========================================================
   INICIALIZACIÓN
========================================================= */

updateScrollAnimation();
