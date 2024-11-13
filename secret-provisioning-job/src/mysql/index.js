import mysql from "mysql2/promise"
export async function setUserPassword(username, password) {

    const connection = await mysql.createConnection({
        host: process.env.MYSQL_DOMAIN || "localhost",
        user: process.env.MYSQL_ADMIN_USERNAME || "root",
        password: process.env.MYSQL_ADMIN_PW || "password",
    });

    const db = username.split("-").join("_")

    const out = await connection.query(`SELECT EXISTS(SELECT 1 FROM mysql.user WHERE user = '${username}') AS 'exists'`)
    if (!!out[0][0].exists) {
        console.log("User exists");
        await connection.query(`ALTER USER '${username}'@'%' IDENTIFIED BY '${password}';`);
        await connection.query(`CREATE SCHEMA IF NOT EXISTS ${db};`);
        await connection.query(`GRANT ALL PRIVILEGES ON ${db}.* TO '${username}'@'%';`);
        console.log("Password changed");
    } else {
        await connection.query(`CREATE USER '${username}'@'%' IDENTIFIED BY '${password}';`);
        await connection.query(`CREATE SCHEMA IF NOT EXISTS ${db};`);
        await connection.query(`GRANT ALL PRIVILEGES ON ${db}.* TO '${username}'@'%';`);
        console.log("User created");
    }

    await connection.end();
}