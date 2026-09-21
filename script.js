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
   FUNCIÓN PRINCIPAL
========================================================== */

function updatePage() {

    const scrollY =
        window.scrollY;

    const viewportHeight =
        window.innerHeight;


    /* ======================================================
       01. OCULTAR LIRIO ORIGINAL
    ====================================================== */

    /*
       El lirio inicial desaparece poco a poco
       cuando comienza el scroll.
    */

    const introProgress =
        Math.min(
            scrollY / (viewportHeight * 0.65),
            1
        );


    introLily.style.opacity =
        String(1 - introProgress);


    introLily.style.transform =
        `
        translateY(
            ${introProgress * -35}px
        )
        `;



    /* ======================================================
       02. APARECE EL LIRIO QUE CAE
    ====================================================== */

    const fallStart =
        viewportHeight * 0.45;

    const fallEnd =
        viewportHeight * 2.05;


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


    /*
       Aparecer
    */

    fallingLily.style.opacity =
        String(
            fallProgress > 0
                ? 1
                : 0
        );


    /* ======================================================
       03. CAÍDA
    ====================================================== */

    /*
       Empieza arriba de la pantalla.

       Termina aproximadamente
       en la boca del florero.
    */

    const startTop = 8;

    const endTop = 61;


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
       04. MOVIMIENTO LATERAL
    ====================================================== */

    /*
       Hace que la flor no caiga
       perfectamente recta.
    */

    const sideMovement =
        Math.sin(
            fallProgress *
            Math.PI *
            3
        ) * 45;


    /* ======================================================
       05. ROTACIÓN
    ====================================================== */

    const rotation =
        Math.sin(
            fallProgress *
            Math.PI *
            4
        ) * 12;


    /* ======================================================
       06. ESCALA
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
            calc(-50% + ${sideMovement}px)
        )
        rotate(${rotation}deg)
        scale(${scale})
        `;



    /* ======================================================
       07. CUANDO LLEGA AL FLORERO
    ====================================================== */

    /*
       Durante el último tramo hacemos que
       el lirio se vuelva ligeramente transparente.

       La sensación será que entra dentro
       del ramo.
    */

    if (fallProgress > 0.86) {

        const finalProgress =
            (
                fallProgress - 0.86
            ) / 0.14;


        fallingLily.style.opacity =
            String(
                1 - finalProgress
            );

    }



    /* ======================================================
       08. CAMBIO DE COLOR DEL FONDO
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


    /*
       Blanco
          ↓
       Crema
          ↓
       Amarillo
    */

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
        `rgb(${red}, ${green}, ${blue})`;

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
   INICIO
========================================================== */

updatePage();
