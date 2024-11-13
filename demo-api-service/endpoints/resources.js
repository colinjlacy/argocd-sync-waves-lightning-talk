import {fetchResources, setResources, setAllowDelete} from '../data/mysql.js'

export async function listResources(req, res) {
    res.json({"resources": await fetchResources()});
}

export async function replaceResources(req, res) {
    const data = req.body
    await setResources(data.resources)
    res.json({"message": "Resources updated", "ok": true})
}

export async function patchAllowDelete(req, res) {
    const {allowDelete} = req.body
    const {id} = req.params
    await setAllowDelete(id, allowDelete)
    res.json({"message": `resource ${id} updated as allow delete ${allowDelete}`, "ok": true})
}