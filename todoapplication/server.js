const express = require("express");
const app = express();
const { v4: uuid } = require("uuid");
const file = require("fs/promises");
const { fstat } = require("fs");
const cors = require("cors");
const mongoose = require("mongoose");
const { response } = require("express");
app.use(express.json());
app.use(cors({ origin: "http://localhost:3001", optionsSuccessStatus: 200 }));
app.options(
  "*",
  cors({ origin: "http://localhost:3001", optionsSuccessStatus: 200 })
);
mongoose.connect("mongodb://127.0.0.1:27017/myDB ", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const schema = new mongoose.Schema({
  username: "string",
  task: "string",
  user_id: "string",
  time_created: "string",
  completion_status: "boolean",
  completion_time: "string",
});

const mdb = mongoose.model("task", schema);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});
app.post("/ins", function (req, res) {
  let newtask = {
    ...req.body,
    user_id: uuid(),
    time_created: new Date().toLocaleTimeString(),
    completion_status: false,
    completion_time: "",
  };
  mdb.insertMany(newtask);
  res.send("success");
});

app.get("/tasks", async function (req, res) {
  try {
    const all = await mdb.find({});
    res.send(all);
  } catch {
    res.status(500).send("error");
  }
});

app.patch("/task/:id/:status", async function (req, res) {
  let taskId = req.params.id;
  let state = req.params.status;
  console.log(taskId);

  mdb.findByIdAndUpdate(
    taskId,
    { completion_status: state },
    function (err, docs) {
      if (err) {
        console.log(err);
        res.status(500).send("error");
      } else {
        console.log("Updated User : ", docs);
        res.send("success");
      }
    }
  );
});

app.delete("/del/:id", async function (req, res) {
  let taskId = req.params.id;
  try {
    await mdb.deleteOne({ user_id: taskId });
    res.send("success");
  } catch (e) {
    res.status(500).send("error");
  }
});
app.listen(3000, function (err) {
  if (err) console.log(err);
  console.log("listening to port", 3000);
});

// app.post('/db',function(req,res){

//     var name=req.body.key
//          try{
//             if(name!=="") {
//                 res.send("success")
//                 db.createCollection(name)
//             }
//             else{
//                 throw "error"
//             }
//          }
//          catch(error)
//          {
//             res.status(404).send("error")
//          }

// })
// app.post('/task',async function(req,res){

//     let newtask={
//         ...req.body,
//         id:uuid(),
//         time_created:new Date().toLocaleTimeString(),
//         completion_status:false,
//         completion_time:""
//      }
//      try{
//         await AddTask(newtask)
//         res.send(newtask)
//      }
//      catch(error)
//      {
//        res.status(500).send(error)
//      }
// })
// async function  AddTask(task){
//     let tasks=[]
//     try{
//        const result= await file.readFile("body.json")
//        console.log(result.toString())
//        tasks=JSON.parse(result.toString())
//        console.log(tasks);
//     }
//     catch(err){
//         if(err.code!="ENOENT"){
//         throw err
//         }
//     }
//     try{
//         tasks=tasks.concat(task)
//         await file.writeFile("body.json",JSON.stringify(tasks))
//      }
//      catch(err){
//         console.log(err);
//          throw err
//      }

// }
//  async function DeleteTask(taskId){
//     let tasks=[]
//     try{
//         const result=await file.readFile("body.json")
//        tasks=JSON.parse(result.toString())
//        var count=0
//        tasks.forEach(task => {
//         if(task.id===taskId){
//             tasks.splice(count,1)
//             console.log("hello")
//             found =true
//         }
//         count+=1
//        });
//        if(found){
//        await file.writeFile('body.json',JSON.stringify(tasks))
//        return true
//        }
//        return false

//     }
//     catch(error){
//        return error
//     }

//  }
