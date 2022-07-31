//Source: https://codepen.io/WebSeed/pen/pvgqEq

var colourIsLight = function (r, g, b) {

    // Counting the perceptive luminance
    // human eye favors green color... 
    var a = 1 - (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    // console.log(a);
    return (a < 0.5);
}


var colourFromRgb = function (r, g, b) {
    return 'rgb(' + r + ',' + g + ',' + b + ')';
};

var rgbFromColor = function (color) {
    let [r, g, b] = color.slice(4, color.length - 1).split(",")  // color = "rgb(r, g, b)"
    r = Number(r)
    g = Number(g)
    b = Number(b)
    return [r, g, b]
}

//Customized function according to need 
export default function contrastColorFinder(colorString) {
    if (!colorString) return 'black'
    const [r, g, b] = rgbFromColor(colorString)
    const textColour = colourIsLight(r, g, b) ? 'black' : 'white'
    return textColour
}

export function hexToRgb(hex) {
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function (m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    const { r, g, b } = result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
    console.log(colourFromRgb(r, g, b))
    return colourFromRgb(r, g, b)
}
