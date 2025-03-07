let express=require('express');
const { dbConnection } = require('./dbConnection');
const { ObjectId } = require('mongodb');
let app=express();

app.use(express.json())

app.get("/",(req,res)=>{
    res.send("hellloo")
})
app.get("/student-read",async(req,res)=>{
  let myDB=await dbConnection();
  let studentCollection=myDB.collection("students")
  let data=await studentCollection.find().toArray();
  let resObj={
    status:1,
    msg:"student-list",
    data
  }   
    res.send(resObj)
})

app.post("/student-insert",async(req,res)=>{
  let myDB=await dbConnection();
  let studentCollection=myDB.collection("students")
  //METHOD-1
  // let obj={
  //   student:req.body.student,
  //   email:req.body.email
  // }
  //METHOD-2
  let {student,email}=req.body;
  let obj={student,email};
  let checkemail=await studentCollection.findOne({email});
  if(checkemail){
   return res.send({
      status:0,
      msg:"Email already exist"
    })
  }
   console.log(obj);
   let insertRes=await studentCollection.insertOne(obj)
   let resObj={
    status:1,
    msg:"Data inserted",
    insertRes
   }
  res.send(resObj)
})

app.delete("/student-delete/:id", async (req,res) => {
  let {id}=req.params;
  let myDB=await dbConnection();
  let studentCollection=myDB.collection("students")
  let delRes=await studentCollection.deleteOne({_id:new ObjectId(id)})
  let resObj={
    status:1,
    msg:"Data Delete",
    delRes
    }
  res.send(delRes)
})

app.put("/student-update/:id",async(req,res)=>{
  let {id}=req.params;
  let{student,email}=req.body;
  let obj={}
  if(student!==""&&student!==undefined&&student!=null){
    obj['student']=student
  }
  if(email!==""&&email!==undefined&&email!=null){
    obj['email']=email
  }
  console.log(obj);

  let myDB=await dbConnection()
  let studentCollection=myDB.collection("students")
  let updateRes=await studentCollection.updateOne({_id:new ObjectId(id)},{$set:obj})
  let resObj={
    status:1,
    msg:"Data updated",
    updateRes
  }
  res.send(resObj)

})

app.listen("3000")