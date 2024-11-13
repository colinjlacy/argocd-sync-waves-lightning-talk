import { readFileSync } from "fs"

const proto = process.env.K8S_API_PROTO || 'https';
const domain = process.env.K8S_API_DOMAIN || 'kubernetes.default.svc';
const namespace = process.env.K8S_NAMESPACE || 'default';

export async function getSecretsForUser(label, username) {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${fetchToken()}`
        },
    };

    return await fetch(`${proto}://${domain}/api/v1/namespaces/${namespace}/secrets?labelSelector=${label}%3D${username}`, options)
        .then(response => response.json())
}

export async function deleteSecret(secretName) {
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${fetchToken()}`
        },
    };

    return await fetch(`${proto}://${domain}/api/v1/namespaces/${namespace}/secrets/${secretName}`, options)
        .then(response => response.json())
}

function fetchToken() {
    return readFileSync("/var/run/secrets/kubernetes.io/serviceaccount/token", {encoding: "utf8"})
}