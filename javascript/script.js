
const game = document.createElement('canvas');

game.width = 120;
game.height = 60;

var context = game.getContext("2d", { willReadFrequently: true });

var image = new Image(120, 60);

image.crossOrigin = "Anonymous";
image.src = "resources/image/image.png";

const output = document.getElementById("msg");

const firebaseConfig = {
	// 👀
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

function pushPixel(_X = 0, _Y = 0, _PixelColor = "ea0") {
    const pixel = {
        x: _X,
        y: _Y,
        color: _PixelColor
    };

    console.log(pixel);
    const pixelRef = db.collection('pixel').doc(`${_X}-${_Y}`);
    setTimeout(() => { pixelRef.set(pixel, { merge: true }); }, 100);
}

function getPixel(_X = 0, _Y = 0) {
    let rgb = context.getImageData(_X, _Y, _X + 1, _Y + 1);
    let hex = "";
    let tmp = "";

    for (i = 0; i < 3; i++) {
        tmp = rgb.data[i].toString(16);
        tmp = tmp.length == 1 ? "0" + tmp : tmp;
        hex += tmp;
    }

    return hex;
}


image.onload = () => {
    if (!image)
        return;

    context.drawImage(image, 0, 0);
    output.innerText = "Please wait...";

    for (y = 0; y < 60; y++)
        for (x = 0; x < 120; x++)
            pushPixel(x * 10, y * 10, `#${getPixel(x, y)}`);

    output.innerText = "[OK]";
    output.classList.add("ok");
};
