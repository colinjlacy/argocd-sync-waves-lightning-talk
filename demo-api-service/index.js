import express from 'express';
import {listResources, replaceResources, patchAllowDelete} from "./endpoints/resources.js";
import {init} from "./data/mysql.js";
const app = express();
const version = "0.6"

app.use(express.json());
await init();

app.listen(8084, () => {
    console.log(`Server running on port 8084 | version ${version}`);
});

app.get("/resources", await listResources);
app.post("/resources", await replaceResources);
app.patch("/resources/:id/allowDelete", await patchAllowDelete);