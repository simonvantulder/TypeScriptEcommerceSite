import {MongoClient, ServerApiVersion } from 'mongodb';

export async function connectToDb() {
    const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.62wnl0r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });
    try {
        await client.connect();
    }finally {
        await client.close();
    }
}