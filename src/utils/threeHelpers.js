export function objectToCssColor({ r, g, b }) {
    return `rgb(${r}, ${g}, ${b})`;
}

export function randomRGB() {
    return {
        r: Math.round(Math.random() * 255),
        g: Math.round(Math.random() * 255),
        b: Math.round(Math.random() * 255)
    };
}