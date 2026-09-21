const fallingLily = document.getElementById("fallingLily");
const body = document.body;

window.addEventListener("scroll", () => {

    const scroll = window.scrollY;

    const maxScroll =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const progress = scroll / maxScroll;


    /*
    ========================================
    POSICIÓN DEL LIRIO
    ========================================
    */

    if (scroll > 100) {

        fallingLily.style.opacity = "1";

        /*
        El lirio comienza arriba
        y termina cerca del florero.
        */

        const movement =
            Math.min(scroll - 100, 900);

        fallingLily.style.top =
            `${15 + movement * 0.08}vh`;

        /*
        Pequeña rotación durante la caída
        */

        const rotation =
            Math.sin(scroll * 0.02) * 8;

        fallingLily.style.transform =
            `translateX(-50%) rotate(${rotation}deg)`;

    } else {

        fallingLily.style.opacity = "0";
    }


    /*
    ========================================
    CAMBIO DE COLOR DEL FONDO
    ========================================
    */

    const colorProgress =
        Math.min(progress * 2.2, 1);

    /*
    Blanco
    ↓
    Crema
    ↓
    Amarillo muy suave
    */

    const r =
        Math.round(255 - colorProgress * 3);

    const g =
        Math.round(255 - colorProgress * 20);

    const b =
        Math.round(255 - colorProgress * 80);

    body.style.backgroundColor =
        `rgb(${r}, ${g}, ${b})`;

});
