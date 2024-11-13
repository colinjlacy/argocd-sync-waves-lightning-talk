import {getSecretsForUser, deleteSecret} from "./k8sApi/index.js"
import {filterSecrets} from "./filters/secretsFilter.js"

const username = process.env["MYSQL_USERNAME"]
const version = process.env["APP_VERSION"]
const label = process.env["SECRET_LABEL"]

const secrets = await getSecretsForUser(label, username)
const filteredSecrets = filterSecrets(version, secrets)
for (const secret of filteredSecrets) {
    await deleteSecret(secret)
}