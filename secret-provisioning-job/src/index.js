import { generatePassword } from "./generatePassword/index.js";
import { setUserPassword } from "./mysql/index.js"
import {createSecretForUser} from "./k8sApi/index.js";

console.log("Starting password generation");

const version = process.env["APP_VERSION"]
const username = process.env["MYSQL_USERNAME"]
const label = process.env["SECRET_LABEL"]
const pw = generatePassword();
await setUserPassword(username, pw);
const res = await createSecretForUser("default", label, username, pw, version);
if (res.status === 200) {
    console.log("Secret updated")
} else if (res.status === 201) {
    console.log("Secret created")
} else {
    console.log(`Unexpected status code: ${res.status}`)
    const json = await res.json()
    console.log(json)
    process.exit(1)
}
