import 'dotenv/config';
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFile } from 'fs/promises';
import { MongoClient, ServerApiVersion, ObjectId } from 'mongodb';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const uri = process.env.MONGO_URI;

app.use(express.static(join(__dirname,'public')));
app.use(express.json());

const client = new MongoClient(uri,{
serverApi:{
version:ServerApiVersion.v1,
strict:true,
deprecationErrors:true
}
});

app.get('/',(req,res)=>{
res.sendFile(join(__dirname,'public','attend.html'))
});

app.get('/inject',(req,res)=>{
readFile(join(__dirname,'public','index.html'),'utf8')
.then(html=>{
const injectedHtml = html.replace('{{myVar}}','injected from server')
res.send(injectedHtml)
})
.catch(err=>{
res.status(500).send('Error loading page')
})
});

app.get('/api/class',(req,res)=>{

const classInfo={
courseNumber:'CIS 486',
courseName:'Projects in IS',
nickname:'Full Stack DevOps',
semester:'Spring 2026',
calendar:'Class calendar coming soon!'
}

res.json(classInfo)

})

app.post('/api/attendance',async(req,res)=>{

try{

const {studentName,date,keyword}=req.body

if(!studentName || !date || !keyword){
return res.status(400).json({error:'Missing fields'})
}

const db = client.db('cis486')
const collection = db.collection('attendance')

const result = await collection.insertOne({
studentName,
date,
keyword,
timestamp:new Date()
})

res.json({
message:'Attendance recorded',
id:result.insertedId
})

}catch(err){

res.status(500).json({error:'Failed to record'})

}

})

app.get('/api/attendance',async(req,res)=>{

try{

const db = client.db('cis486')
const collection = db.collection('attendance')

const records = await collection.find({}).toArray()

res.json(records)

}catch(err){

res.status(500).json({error:'Failed to read'})

}

})

app.put('/api/attendance/:id',async(req,res)=>{

try{

const {id}=req.params
const {studentName,date,keyword}=req.body

const db = client.db('cis486')
const collection = db.collection('attendance')

const result = await collection.updateOne(
{_id:new ObjectId(id)},
{$set:{studentName,date,keyword}}
)

if(result.matchedCount===0){
return res.status(404).json({error:'Not found'})
}

res.json({message:'Updated'})

}catch(err){

res.status(500).json({error:'Update failed'})

}

})

app.delete('/api/attendance/:id',async(req,res)=>{

try{

const {id}=req.params

const db = client.db('cis486')
const collection = db.collection('attendance')

const result = await collection.deleteOne({_id:new ObjectId(id)})

if(result.deletedCount===0){
return res.status(404).json({error:'Not found'})
}

res.json({message:'Deleted'})

}catch(err){

res.status(500).json({error:'Delete failed'})

}

})

app.listen(3000,()=>{
console.log('Server running http://localhost:3000')
})is running on http://localhost:3000')
})
