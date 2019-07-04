import { Client } from 'pg';
import {readConstFromFile} from './const/util';
import {Config} from "./const/types";
export  const  connectToDb = async ():Promise<void> => {
    const dev:Config = readConstFromFile();
    const client = new Client(dev.postGreSql.connectionString);
    await client.connect();
    const res = await client.query('SELECT $1::text as message', ['Hello world!']);
    console.log(res.rows[0].message); // Hello world!
    await client.end()
};