import express from "express"; import cors from "cors";
const app=express(); app.use(cors()); app.use(express.json());
app.get("/api/health",(req,res)=>res.json({status:"ok",service:"lms-backend"}));
app.get("/api/v1/courses",(req,res)=>res.json({courses:[
{id:1,title:"Full Stack Web Development",progress:72},{id:2,title:"Data Structures & Algorithms",progress:45},{id:3,title:"Artificial Intelligence Fundamentals",progress:18}]}));
app.post("/api/v1/enrollments",(req,res)=>res.status(201).json({message:"Enrollment created",course_id:req.body.course_id}));
app.listen(process.env.PORT||4000,()=>console.log("LMS backend online on port 4000"));