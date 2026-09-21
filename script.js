/* ==========================================================
   ELEMENTOS
========================================================== */

const fallingLily =
    document.getElementById("fallingLily");

const introLily =
    document.getElementById("introLily");

const bouquetSection =
    document.getElementById("bouquet");


/* ==========================================================
   VARIABLES RESPONSIVE
========================================================== */

function getResponsiveValues() {

    const width = window.innerWidth;
    const height = window.innerHeight;

    /*
       El punto final del lirio cambia según
       el dispositivo.

       En móvil necesitamos que termine
       un poco más arriba porque el florero
       ocupa proporcionalmente más espacio.
    */

    let endTop;

    if (width <= 390) {

        endTop = 54;

    } else if (width <= 600) {

        endTop = 57;

    } else if (width <= 900) {

        endTop = 59;

    } else {

        endTop = 61;

    }


    /*
       Movimiento lateral más pequeño
       en teléfonos.
    */

    let sideMovement;

    if (width <= 600) {

        sideMovement = 22;

    } else if (width <= 900) {

        sideMovement = 32;

    } else {

        sideMovement = 45;

    }


    return {
        width,
        height,
        endTop,
        sideMovement
    };
}


/* ==========================================================
   FUNCIÓN PRINCIPAL
========================================================== */

function updatePage() {

    const scrollY =
        window.scrollY;

    const viewportHeight =
        window.innerHeight;

    const {
        endTop,
        sideMovement
    } =
        getResponsiveValues();


    /* ======================================================
       01. LIRIO ORIGINAL
    ====================================================== */

    const introProgress =
        Math.min(
            scrollY /
            (viewportHeight * 0.65),
            1
        );


    introLily.style.opacity =
        String(
            1 - introProgress
        );


    introLily.style.transform =
        `
        translateY(
            ${introProgress * -35}px
        )
        `;


    /* ======================================================
       02. CAÍDA
    ====================================================== */

    const fallStart =
        viewportHeight * 0.45;

    /*
       En pantallas pequeñas hacemos
       que la animación termine un poco
       antes para sincronizarla con el ramo.
    */

    const fallDistance =
        viewportHeight *
        (
            window.innerWidth <= 600
                ? 1.45
                : 1.60
        );

    const fallEnd =
        fallStart +
        fallDistance;


    let fallProgress =
        (
            scrollY - fallStart
        ) /
        (
            fallEnd - fallStart
        );


    fallProgress =
        Math.max(
            0,
            Math.min(
                1,
                fallProgress
            )
        );


    /* ======================================================
       03. APARICIÓN
    ====================================================== */

    fallingLily.style.opacity =
        String(
            fallProgress > 0
                ? 1
                : 0
        );


    /* ======================================================
       04. POSICIÓN VERTICAL
    ====================================================== */

    const startTop = 7;

    const currentTop =
        startTop +
        (
            endTop -
            startTop
        ) *
        fallProgress;


    fallingLily.style.top =
        `${currentTop}vh`;


    /* ======================================================
       05. MOVIMIENTO LATERAL
    ====================================================== */

    const currentSideMovement =
        Math.sin(
            fallProgress *
            Math.PI *
            3
        ) *
        sideMovement;


    /* ======================================================
       06. ROTACIÓN
    ====================================================== */

    const rotation =
        Math.sin(
            fallProgress *
            Math.PI *
            4
        ) *
        (
            window.innerWidth <= 600
                ? 9
                : 12
        );


    /* ======================================================
       07. ESCALA
    ====================================================== */

    const scale =
        1 -
        (
            fallProgress *
            0.20
        );


    fallingLily.style.transform =
        `
        translateX(
            calc(
                -50% +
                ${currentSideMovement}px
            )
        )
        rotate(${rotation}deg)
        scale(${scale})
        `;


    /* ======================================================
       08. ENTRADA AL FLORERO
    ====================================================== */

    if (fallProgress > 0.86) {

        const finalProgress =
            (
                fallProgress - 0.86
            ) /
            0.14;


        fallingLily.style.opacity =
            String(
                1 -
                finalProgress
            );
    }


    /* ======================================================
       09. COLOR DEL FONDO
    ====================================================== */

    const colorStart =
        viewportHeight * 0.3;

    const colorEnd =
        viewportHeight * 2.4;


    let colorProgress =
        (
            scrollY - colorStart
        ) /
        (
            colorEnd - colorStart
        );


    colorProgress =
        Math.max(
            0,
            Math.min(
                1,
                colorProgress
            )
        );


    const red = 255;

    const green =
        Math.round(
            253 -
            colorProgress * 27
        );

    const blue =
        Math.round(
            244 -
            colorProgress * 105
        );


    document.body.style.backgroundColor =
        `rgb(
            ${red},
            ${green},
            ${blue}
        )`;
}


/* ==========================================================
   SCROLL
========================================================== */

window.addEventListener(
    "scroll",
    updatePage,
    {
        passive: true
    }
);


/* ==========================================================
   RESIZE
========================================================== */

window.addEventListener(
    "resize",
    updatePage
);


/* ==========================================================
   ORIENTACIÓN
========================================================== */

window.addEventListener(
    "orientationchange",
    () => {

        setTimeout(
            updatePage,
            100
        );

    }
);


/* ==========================================================
   INICIO
========================================================== */

updatePage();
