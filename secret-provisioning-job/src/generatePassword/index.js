export function generatePassword() {
    const chars = Math.random().toString(36).slice(2) +
        Math.random().toString(36).toUpperCase().slice(2)
    return shuffle(chars)
}

function shuffle(str) {
    const a = str.split(""),
        n = a.length;

    for(let i = n - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
    }
    return a.join("");
}