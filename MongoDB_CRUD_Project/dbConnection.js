const { MongoClient } = require('mongodb');
const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);

let dbConnection=async()=>{
  await client.connect();
  let db=client.db("mongoDBProject_DB")
   return db;
}
module.exports={dbConnection}