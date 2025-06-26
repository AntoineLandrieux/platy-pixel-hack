
const screen = document.createElement('canvas');

screen.width = 120;
screen.height = 60;

let loaded = false;

let context = screen.getContext("2d", { willReadFrequently: true });
let image = new Image(120, 60);
image.crossOrigin = "Anonymous";
image.src = "resources/image/image.png";

const output = document.getElementById("msg");

function pushPixel(db, x = 0, y = 0, pixel_color = "000000") {

    const pixel = {
        x: x,
        y: y,
        color: pixel_color
    };

    console.log(pixel);
    const pixelRef = db.collection('pixel').doc(`${x}-${y}`);
    setTimeout(() => { pixelRef.set(pixel, { merge: true }); }, 100);

}

function getPixel(x = 0, y = 0) {

    let rgb = context.getImageData(x, y, x + 1, y + 1);
    let hex = "";
    let tmp = "";

    for (i = 0; i < 3; i++) {

        tmp = rgb.data[i].toString(16);
        tmp = tmp.length == 1 ? "0" + tmp : tmp;
        hex += tmp;

    }

    return hex;

}

document.getElementById("hack").addEventListener("click", function () {

    if (!loaded) {

        return;

    }

    firebase.initializeApp({

        apiKey: document.getElementById("apiKey").value,
        authDomain: document.getElementById("authDomain").value,
        projectId: document.getElementById("projectId").value,
        storageBucket: document.getElementById("storageBucket").value,
        messagingSenderId: document.getElementById("messagingSenderId").value,
        appId: document.getElementById("appId").value

    });

    let db = firebase.firestore();

    context.drawImage(image, 0, 0);
    output.innerText = "Please wait...";

    for (y = 0; y < 60; y++)
        for (x = 0; x < 120; x++)
            pushPixel(db, x * 10, y * 10, `#${getPixel(x, y)}`);

    output.innerText = "[OK]";
    output.classList.add("ok");

})

image.onload = () => {

    if (image) {

        loaded = true;
        output.innerText = "[READY]";

    }

};
