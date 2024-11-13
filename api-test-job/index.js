import {getSeedData} from "./seeds/index.js";
import {init, seedDatabase} from "./data/mysql.js";
import {runTests} from "./tests/index.js";

const seeds = getSeedData();
const serviceProto = process.env.SERVICE_PROTO || "http";
const serviceDomain = process.env.SERVICE_DOMAIN || "localhost:8084";
async function main() {
    // seed database
    await init();
    await seedDatabase(seeds);

    // run tests
    await runTests(serviceProto, serviceDomain, seeds);
}

main().then(() => {
    console.log("done");
    process.exit(0);
});