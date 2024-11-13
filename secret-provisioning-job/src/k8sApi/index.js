import { readFileSync } from "fs"

const proto = process.env.K8S_API_PROTO || 'https';
const domain = process.env.K8S_API_DOMAIN || 'kubernetes.default.svc';

export async function createSecretForUser(namespace, label, username, password, version) {
    const secretName = `${username}-secret-${version}`
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${fetchToken()}`
    }
    const response = await fetch(`${proto}://${domain}/api/v1/namespaces/default/secrets/${secretName}`, { headers })
    let method, suffix;
    if (response.status === 200) {
        method = 'PUT';
        suffix = secretName;
    } else if (response.status === 404) {
        method = 'POST';
        suffix = '';
    } else {
        throw new Error(`Unexpected status code ${response.status}`)
    }
    const body = JSON.stringify(formatBody(namespace, label, username, password, secretName))
    return await fetch(`${proto}://${domain}/api/v1/namespaces/default/secrets/${suffix}`, {headers, method, body})
}

function fetchToken() {
    return readFileSync("/var/run/secrets/kubernetes.io/serviceaccount/token", {encoding: "utf8"})
}

function formatBody(namespace, label, username, password, name) {
    const labels = { [label]: username }
    return {
        apiVersion: 'v1',
        kind: 'Secret',
        metadata: { name, namespace, labels },
        data: {
            username: Buffer.from(username).toString('base64'),
            password: Buffer.from(password).toString('base64')
        }
    };
}