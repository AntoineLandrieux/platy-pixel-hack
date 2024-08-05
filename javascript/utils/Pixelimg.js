
const game = document.createElement('canvas');

game.height = 60
game.width = 120

var context = game.getContext("2d", { willReadFrequently: true });

var image = new Image(120, 60);

image.crossOrigin = "Anonymous";
image.src = "resources/image/image.png";

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
    img = [[]];
    context.drawImage(image, 0, 0);
    for (y = 0; y < 120; y++) {
        for (x = 0; x < 60; x++)
            img[y].push(getPixel(x, y));
        img.push([]);
    }
    console.log(img);
}
