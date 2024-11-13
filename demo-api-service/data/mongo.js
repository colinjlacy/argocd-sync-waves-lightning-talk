import {MongoClient, ObjectId} from "mongodb";

const dbName = "tofu"
const collectionName = "resources"

export async function fetchResources() {
    const client = new MongoClient(process.env.MONGO_URI);
    try {
        const database = client.db(dbName);
        const collection = database.collection(collectionName);

        const cursor = await collection.find()
        return await cursor.toArray()
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}

export async function setResources(tofuResources) {
    const client = new MongoClient(process.env.MONGO_URI);
    const docs = tofuResources.map(x => {
        x.allowDelete = false;
        return x;
    });

    try {
        const database = client.db(dbName);
        const collection = database.collection(collectionName)
        // clears out the collection first
        await collection.deleteMany()
        // sets all the docs in the collection
        return await collection.insertMany(docs)
    } catch (e) {
        console.log(`unable to set resources: ${e}`)
        throw new Error(e)
    } finally {
        await client.close()
    }
}

export async function setAllowDelete(id, allow)  {
    const client = new MongoClient(process.env.MONGO_URI);
    try {
        const database = client.db(dbName);
        const collection = database.collection(collectionName)

        return await collection.updateOne(
            {_id: new ObjectId(id)},
            {$set: {allowDelete: allow}}
        )
    } catch (e) {
        console.log(`unable to set resources: ${e}`)
        throw new Error(e)
    } finally {
        await client.close()
    }
}