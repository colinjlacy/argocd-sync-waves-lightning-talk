import {Sequelize, DataTypes} from "sequelize";


const user = process.env["MYSQL_USER"]
const db = user.split("-").join("_")
let sequelize;
let Resource;

export async function init() {
    sequelize = new Sequelize(db, user, process.env["MYSQL_PW"], {
        host: process.env["MYSQL_HOST"],
        dialect: "mysql"
    });

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

export async function fetchResources() {
    return await Resource.findAll()
}

export async function setResources(tofuResources) {
    const rows = tofuResources.map(x => {
        x.allowDelete = false;
        return x;
    });

    await Resource.destroy({
        truncate: true,
    })

    return await Resource.bulkCreate(rows)
}

export async function setAllowDelete(id, allowDelete)  {
    await Resource.update(
        { allowDelete },
        {
            where: { id },
        },
    );
}