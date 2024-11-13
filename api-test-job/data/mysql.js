import {Sequelize, DataTypes} from "sequelize";

const host = process.env["MYSQL_HOST"] || "localhost";
const user = process.env["MYSQL_USER"] || "root";
const db = user.split("-").join("_")
const pw = process.env["MYSQL_PW"] || "password";
const dialect = "mysql";

let sequelize;
let Resource;

export async function init() {
    sequelize = new Sequelize(db, user, pw, { host, dialect });

    Resource = sequelize.define(
        'Resource',
        {
            // Model attributes are defined here
            address: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            type: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            module: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            allowDelete: {
                type: DataTypes.BOOLEAN,
            },
        },
        {
            sequelize,


        },
    );

    await Resource.sync({ force: true });
}

export async function seedDatabase(resources) {
    return await Resource.bulkCreate(resources);
}