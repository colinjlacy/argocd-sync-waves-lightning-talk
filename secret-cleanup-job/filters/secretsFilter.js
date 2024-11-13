export function filterSecrets(version, secretsList) {
    const secretNames = []
    secretsList.items.forEach(s => {
        const name = s.metadata.name;
        const segments = name.split("-")
        if (segments.length < 3 || segments[segments.length - 1] !== version) {
            secretNames.push(name)
        }
    });
    return secretNames
}