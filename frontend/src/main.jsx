import React,{useState} from "react";
import {createRoot} from "react-dom/client";
import {BookOpen,LayoutDashboard,Users,ShieldCheck,Brain,CheckCircle,PlayCircle,MessageSquare,FileText,ChevronRight,Menu,X,Search,Bell,LogOut, Award,BarChart3} from "lucide-react";
import "./style.css";

const courses=[
 {id:1,title:"Full Stack Web Development",cat:"Development",level:"Intermediate",progress:72,lessons:18,color:"violet",desc:"Build modern web applications with React, Node.js and databases."},
 {id:2,title:"Data Structures & Algorithms",cat:"Computer Science",level:"Intermediate",progress:45,lessons:24,color:"blue",desc:"Master arrays, trees, graphs, sorting and problem solving."},
 {id:3,title:"Artificial Intelligence Fundamentals",cat:"AI & ML",level:"Beginner",progress:18,lessons:16,color:"green",desc:"Understand machine learning, neural networks and generative AI."}
];

function App(){
 const [role,setRole]=useState("Student"),[page,setPage]=useState("Dashboard"),[mobile,setMobile]=useState(false),[chat,setChat]=useState([]),[q,setQ]=useState("");
 const nav=role==="Student"?["Dashboard","My Courses","Assignments","Quizzes","AI Tutor","Certificates"]:role==="Instructor"?["Dashboard","My Courses","Create Course","Analytics","Announcements"]:["Dashboard","Users","Course Approval","Platform Metrics","Moderation"];
 const ask=async()=>{if(!q.trim())return; const question=q;setQ("");setChat(c=>[...c,{me:question}]); try{let r=await fetch("http://localhost:8000/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({question,course_id:1})});let d=await r.json();setChat(c=>[...c,{bot:d.answer,sources:d.sources}])}catch{setChat(c=>[...c,{bot:"AI service is starting. Please try again in a moment."}])}};
 return <div className="app">
  <aside className={mobile?"side open":"side"}><div className="brand"><div className="logo">V</div><div><b>VertexLearn</b><small>AI Learning Platform</small></div></div>
   <div className="rolebox"><span>Viewing as</span><select value={role} onChange={e=>{setRole(e.target.value);setPage("Dashboard")}}><option>Student</option><option>Instructor</option><option>Admin</option></select></div>
   <nav>{nav.map(n=><button className={page===n?"active":""} onClick={()=>{setPage(n);setMobile(false)}} key={n}>{icon(n)}<span>{n}</span></button>)}</nav>
   <div className="sidebottom"><button><LogOut size={17}/> Sign out</button></div>
  </aside>
  <main><header><button className="hamb" onClick={()=>setMobile(!mobile)}>{mobile?<X/>:<Menu/>}</button><div className="crumb">Workspace <ChevronRight size={14}/> {page}</div><div className="headright"><Search/><Bell/><div className="avatar">BB</div></div></header>
   <section className="content">{page==="Dashboard"&&<Dashboard role={role} setPage={setPage}/>}
   {page==="My Courses"&&<Courses/>}{page==="Assignments"&&<Assignments/>}{page==="Quizzes"&&<Quizzes/>}
   {page==="AI Tutor"&&<AITutor chat={chat} q={q} setQ={setQ} ask={ask}/>}
   {page==="Certificates"&&<Certificates/>}{page==="Create Course"&&<CreateCourse/>}{page==="Analytics"&&<Analytics/>}
   {page==="Announcements"&&<Announcements/>}{page==="Users"&&<UsersPage/>}{page==="Course Approval"&&<Approval/>}
   {page==="Platform Metrics"&&<Metrics/>}{page==="Moderation"&&<Moderation/>}
   </section></main>
 </div>
}
const icon=n=>({Dashboard:<LayoutDashboard/>, "My Courses":<BookOpen/>,Assignments:<FileText/>,Quizzes:<CheckCircle/>,"AI Tutor":<Brain/>,Certificates:<Award/>, "Create Course":<BookOpen/>,Analytics:<BarChart3/>,Announcements:<Bell/>,Users:<Users/>,"Course Approval":<ShieldCheck/>,"Platform Metrics":<BarChart3/>,Moderation:<MessageSquare/>}[n]||<BookOpen/>);

function Dashboard({role,setPage}){return <><div className="hero"><div><p className="eyebrow">GOOD EVENING, BHUMIKA 👋</p><h1>Keep learning.<br/><em>Keep growing.</em></h1><p className="muted">Your personalized learning workspace powered by AI.</p><button className="primary" onClick={()=>setPage("My Courses")}>Continue learning <ChevronRight size={17}/></button></div><div className="heroart"><Brain size={86}/><span>AI<br/>Tutor</span></div></div>
 <div className="stats">{role==="Student"?[["72%","Overall progress"],["6","Courses enrolled"],["14","Day streak"],["3","Certificates"]]:role==="Instructor"?[["12","Published courses"],["1,284","Learners"],["86%","Avg. completion"],["4.8","Avg. rating"]]:[["2,418","Users"],["86","Courses"],["1,932","Enrollments"],["98.6%","Uptime"]] .map?.(x=>x)||[]}{role==="Student"?[["72%","Overall progress"],["6","Courses enrolled"],["14","Day streak"],["3","Certificates"]].map(([a,b])=><div className="stat" key={b}><strong>{a}</strong><span>{b}</span></div>):null}{role!=="Student"&&[["12","Published courses"],["1,284","Learners"],["86%","Avg. completion"],["4.8","Avg. rating"]].map(([a,b])=><div className="stat" key={b}><strong>{a}</strong><span>{b}</span></div>)}</div>
 <div className="sectiontitle"><div><h2>{role==="Student"?"Continue learning":"Overview"}</h2><p>Pick up where you left off.</p></div></div><div className="cards">{courses.map(c=><CourseCard c={c} key={c.id}/>)}</div></>}
function CourseCard({c}){return <div className="course"><div className={"cover "+c.color}><Brain size={35}/><span>{c.cat}</span></div><div className="coursebody"><div className="tag">{c.level}</div><h3>{c.title}</h3><p>{c.desc}</p><div className="progress"><span style={{width:c.progress+"%"}}/></div><div className="row"><small>{c.progress}% complete · {c.lessons} lessons</small><button className="iconbtn"><PlayCircle size={18}/></button></div></div></div>}
function Courses(){
  const [selected, setSelected] = useState(null);

  const courses = [
    {
      id: 1,
      title: "JavaScript Fundamentals",
      instructor: "Dr. Priya Sharma",
      progress: 72,
      lessons: 24,
      completed: 17,
      category: "Programming",
      description:
        "Learn JavaScript fundamentals, functions, arrays, objects, DOM and modern JavaScript concepts."
    },
    {
      id: 2,
      title: "Data Structures",
      instructor: "Prof. Rahul Patil",
      progress: 45,
      lessons: 30,
      completed: 14,
      category: "Computer Science",
      description:
        "Understand arrays, linked lists, stacks, queues, trees, graphs and searching algorithms."
    },
    {
      id: 3,
      title: "Artificial Intelligence",
      instructor: "Dr. Neha Kulkarni",
      progress: 28,
      lessons: 20,
      completed: 6,
      category: "AI & ML",
      description:
        "Explore artificial intelligence, machine learning, neural networks and practical AI applications."
    }
  ];

  if(selected){
    return (
      <>
        <Title
          t={selected.title}
          s={`${selected.category} • ${selected.instructor}`}
        />

        <div className="quiz">
          <h2>{selected.title}</h2>

          <p style={{marginTop:"12px"}}>
            {selected.description}
          </p>

          <div style={{marginTop:"25px"}}>
            <strong>Course Progress</strong>

            <div
              style={{
                marginTop:"10px",
                height:"10px",
                background:"#e5e7eb",
                borderRadius:"10px",
                overflow:"hidden"
              }}
            >
              <div
                style={{
                  width:`${selected.progress}%`,
                  height:"100%",
                  background:"#4f46e5"
                }}
              />
            </div>

            <p style={{marginTop:"8px"}}>
              {selected.progress}% completed
            </p>
          </div>

          <div
            style={{
              display:"grid",
              gridTemplateColumns:"repeat(3,1fr)",
              gap:"15px",
              marginTop:"25px"
            }}
          >
            <div className="stat">
              <h3>{selected.lessons}</h3>
              <p>Total Lessons</p>
            </div>

            <div className="stat">
              <h3>{selected.completed}</h3>
              <p>Completed</p>
            </div>

            <div className="stat">
              <h3>{selected.lessons - selected.completed}</h3>
              <p>Remaining</p>
            </div>
          </div>

          <div style={{marginTop:"25px"}}>
            <button
              className="primary"
              onClick={() =>
                alert(`Continuing ${selected.title}...`)
              }
            >
              Continue Learning
            </button>

            <button
              style={{
                marginLeft:"10px",
                padding:"12px 18px",
                borderRadius:"8px",
                border:"1px solid #ddd",
                background:"#fff",
                cursor:"pointer"
              }}
              onClick={() => setSelected(null)}
            >
              Back to My Courses
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Title
        t="My Courses"
        s="Continue learning and track your progress"
      />

      <div className="quizgrid">
        {courses.map(course => (
          <div className="quiz" key={course.id}>

            <h3>{course.title}</h3>

            <p style={{marginTop:"8px"}}>
              <strong>Instructor:</strong> {course.instructor}
            </p>

            <p style={{marginTop:"8px"}}>
              {course.lessons} lessons
            </p>

            <div style={{marginTop:"18px"}}>
              <div
                style={{
                  height:"8px",
                  background:"#e5e7eb",
                  borderRadius:"10px",
                  overflow:"hidden"
                }}
              >
                <div
                  style={{
                    width:`${course.progress}%`,
                    height:"100%",
                    background:"#4f46e5"
                  }}
                />
              </div>

              <p style={{marginTop:"7px"}}>
                {course.progress}% completed
              </p>
            </div>

            <button
              className="primary"
              style={{marginTop:"15px"}}
              onClick={() => setSelected(course)}
            >
              Open Course
            </button>

          </div>
        ))}
      </div>
    </>
  );
}function Assignments(){
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [fileName, setFileName] = useState("");

  const assignments = [
    {
      id: 1,
      title: "JavaScript Functions Assignment",
      course: "JavaScript Fundamentals",
      due: "Oct 8, 2026",
      points: 100,
      description: "Write JavaScript functions to solve basic programming problems."
    },
    {
      id: 2,
      title: "Data Structures Implementation",
      course: "Data Structures",
      due: "Oct 12, 2026",
      points: 100,
      description: "Implement Stack and Queue operations using a programming language of your choice."
    },
    {
      id: 3,
      title: "AI Mini Project",
      course: "Artificial Intelligence",
      due: "Oct 15, 2026",
      points: 100,
      description: "Create a small AI-based application and explain its working."
    }
  ];

  const openAssignment = (assignment) => {
    setSelected(assignment);
    setSubmitted(false);
    setFileName("");
  };

  const handleFile = (event) => {
    const file = event.target.files[0];

    if (file) {
      setFileName(file.name);
    }
  };

  const submitAssignment = () => {
    if (!fileName) {
      alert("Please select a file before submitting.");
      return;
    }

    setSubmitted(true);
  };

  if (selected) {
    return (
      <>
        <Title
          t={selected.title}
          s={`${selected.course} • ${selected.points} points`}
        />

        <div className="quiz">
          <h2>{selected.title}</h2>

          <p style={{ marginTop: "10px" }}>
            <strong>Due date:</strong> {selected.due}
          </p>

          <p style={{ marginTop: "15px" }}>
            {selected.description}
          </p>

          {!submitted ? (
            <>
              <div
                style={{
                  marginTop: "25px",
                  padding: "25px",
                  border: "2px dashed #dfe2e8",
                  borderRadius: "12px",
                  textAlign: "center"
                }}
              >
                <h3>Upload your assignment</h3>

                <p style={{ margin: "10px 0 20px" }}>
                  Select your assignment file.
                </p>

                <input
                  type="file"
                  onChange={handleFile}
                  accept=".pdf,.doc,.docx,.zip,.txt"
                />

                {fileName && (
                  <p style={{ marginTop: "15px" }}>
                    Selected file: <strong>{fileName}</strong>
                  </p>
                )}
              </div>

              <div style={{ marginTop: "20px" }}>
                <button
                  className="primary"
                  onClick={submitAssignment}
                >
                  Submit Assignment
                </button>

                <button
                  style={{
                    marginLeft: "10px",
                    padding: "12px 18px",
                    borderRadius: "8px",
                    border: "1px solid #ddd",
                    background: "#fff",
                    cursor: "pointer"
                  }}
                  onClick={() => setSelected(null)}
                >
                  Back
                </button>
              </div>
            </>
          ) : (
            <div
              style={{
                marginTop: "25px",
                padding: "25px",
                borderRadius: "12px",
                background: "#f0fdf4"
              }}
            >
              <h2>✓ Assignment Submitted</h2>

              <p style={{ marginTop: "10px" }}>
                Your assignment has been submitted successfully.
              </p>

              <p style={{ marginTop: "8px" }}>
                File: <strong>{fileName}</strong>
              </p>

              <button
                className="primary"
                style={{ marginTop: "20px" }}
                onClick={() => setSelected(null)}
              >
                Back to Assignments
              </button>
            </div>
          )}
        </div>
      </>
    );
  }

  return (
    <>
      <Title
        t="Assignments"
        s="View, upload and submit your course assignments"
      />

      <div className="quizgrid">
        {assignments.map((assignment) => (
          <div className="quiz" key={assignment.id}>
            <h3>{assignment.title}</h3>

            <p style={{ marginTop: "8px" }}>
              <strong>Course:</strong> {assignment.course}
            </p>

            <p style={{ marginTop: "8px" }}>
              <strong>Due:</strong> {assignment.due}
            </p>

            <p style={{ marginTop: "8px" }}>
              {assignment.points} points
            </p>

            <button
              className="primary"
              style={{ marginTop: "15px" }}
              onClick={() => openAssignment(assignment)}
            >
              Open Assignment
            </button>
          </div>
        ))}
      </div>
    </>
  );
}function Quizzes(){
 const [selected,setSelected]=useState(null);
 const [current,setCurrent]=useState(0);
 const [score,setScore]=useState(0);

 const quizzes={
  "JavaScript Fundamentals":[
   {q:"Which keyword declares a constant in JavaScript?",o:["var","let","const","static"],a:2},
   {q:"Which method adds an element to the end of an array?",o:["push()","pop()","shift()","slice()"],a:0},
   {q:"What does === check?",o:["Only value","Only type","Value and type","Neither"],a:2}
  ],
  "Data Structures":[
   {q:"Which data structure follows FIFO?",o:["Stack","Queue","Tree","Graph"],a:1},
   {q:"Which data structure follows LIFO?",o:["Queue","Stack","Array","Graph"],a:1},
   {q:"Which structure is commonly used for BFS?",o:["Stack","Queue","Heap","Set"],a:1}
  ],
  "AI Basics":[
   {q:"What does AI stand for?",o:["Automated Internet","Artificial Intelligence","Advanced Input","Applied Information"],a:1},
   {q:"What is machine learning?",o:["A database","A programming language","Learning patterns from data","A web browser"],a:2},
   {q:"Which is an example of generative AI?",o:["Calculator","Chatbot generating text","Keyboard","Monitor"],a:1}
  ]
 };

 const startQuiz=(name)=>{
  setSelected(name);
  setCurrent(0);
  setScore(0);
 };

 const answer=(index)=>{
  const questions=quizzes[selected];
  if(index===questions[current].a) setScore(s=>s+1);

  if(current < questions.length-1){
   setCurrent(c=>c+1);
  }else{
   setCurrent(questions.length);
  }
 };

 if(selected){
  const questions=quizzes[selected];

  if(current>=questions.length){
   return <>
    <Title t={selected} s="Quiz completed"/>
    <div className="quiz">
     <CheckCircle size={45}/>
     <h2>Quiz Completed! 🎉</h2>
     <p>Your score: <strong>{score} / {questions.length}</strong></p>
     <button className="primary" onClick={()=>setSelected(null)}>
      Back to Quiz Center
     </button>
    </div>
   </>
  }

  const question=questions[current];

  return <>
   <Title t={selected} s={`Question ${current+1} of ${questions.length}`}/>
   <div className="quiz">
    <h2>{question.q}</h2>

    <div style={{display:"grid",gap:"10px",marginTop:"20px"}}>
     {question.o.map((option,index)=>
      <button
       key={option}
       onClick={()=>answer(index)}
       style={{
        padding:"14px",
        textAlign:"left",
        border:"1px solid #dfe2e8",
        background:"#fff",
        borderRadius:"10px",
        cursor:"pointer"
       }}
      >
       {String.fromCharCode(65+index)}. {option}
      </button>
     )}
    </div>
   </div>
  </>
 }

 return <>
  <Title t="Quiz Center" s="Test your knowledge and build mastery"/>

  <div className="quizgrid">
   {Object.keys(quizzes).map(name=>
    <div className="quiz" key={name}>
     <CheckCircle/>
     <h3>{name}</h3>
     <p>{quizzes[name].length} questions · Adaptive difficulty</p>
     <button className="primary" onClick={()=>startQuiz(name)}>
      Start quiz
     </button>
    </div>
   )}
  </div>
 </>
}
function AITutor({chat,q,setQ,ask}){return <><Title t="AI Tutor" s="Ask questions grounded in your course materials"/><div className="aiwrap"><div className="aihead"><div className="aiorb"><Brain/></div><div><b>Vertex AI Tutor</b><small>Course-scoped · RAG enabled · Source citations</small></div></div><div className="chat">{chat.length===0&&<div className="welcome"><Brain size={42}/><h3>What would you like to learn?</h3><p>Ask for explanations, summaries, examples or practice questions.</p><div className="prompts"><button onClick={()=>setQ("Explain React hooks simply")}>Explain React hooks simply</button><button onClick={()=>setQ("Give me a quiz on this course")}>Give me a quiz</button></div></div>}{chat.map((m,i)=>m.me?<div className="msg me" key={i}>{m.me}</div>:<div className="msg bot" key={i}><Brain size={18}/><div>{m.bot}{m.sources&&<small className="sources">Sources: {m.sources.join(", ")}</small>}</div></div>)}</div><div className="composer"><input value={q} onChange={e=>setQ(e.target.value)} onKeyDown={e=>e.key==="Enter"&&ask()} placeholder="Ask your course tutor..."/><button className="primary" onClick={ask}>Ask</button></div></div></>}
function Certificates(){return <><Title t="Certificates & Achievements" s="Your completed learning milestones"/><div className="cert"><Award size={52}/><div><span>VERIFIED CERTIFICATE</span><h2>Full Stack Web Development</h2><p>Completed with 94% final score · Issued Sep 2026</p></div><button>View certificate</button></div><div className="badges"><div><Award/><b>7 Day Streak</b><span>Earned</span></div><div><Brain/><b>AI Explorer</b><span>Earned</span></div><div><CheckCircle/><b>Quiz Master</b><span>Earned</span></div></div></>}
function CreateCourse(){return <><Title t="Create Course" s="Build a new learning experience"/><div className="formcard">{["Course title","Short description","Category","Difficulty"].map(x=><label key={x}>{x}<input placeholder={"Enter "+x.toLowerCase()}/></label>)}<label>Course materials<textarea placeholder="Upload PDF, slides or video links"/></label><button className="primary">Create draft course</button></div></>}
function Analytics(){return <><Title t="Instructor Analytics" s="Monitor learner engagement and outcomes"/><div className="chart"><div className="bars">{[42,58,49,72,66,82,76,91].map((h,i)=><div key={i} style={{height:h+"%"}}><span>W{i+1}</span></div>)}</div></div></>}
function Announcements(){return <><Title t="Announcements" s="Communicate with your learners"/><div className="formcard"><label>Announcement title<input placeholder="Enter title"/></label><label>Message<textarea placeholder="Write your announcement..."/></label><button className="primary">Publish announcement</button></div></>}
function UsersPage(){return <><Title t="User Management" s="Manage platform users and roles"/><div className="table">{["Bhumika Badghare","Aarav Sharma","Meera Patil","Rohan Kulkarni"].map((x,i)=><div className="tr"><div><b>{x}</b><small>{["Student","Instructor","Student","Student"][i]}</small></div><span className="status done">Active</span><button>Manage</button></div>)}</div></>}
function Approval(){return <><Title t="Course Approval" s="Review courses submitted by instructors"/><div className="table">{["Advanced Python","UI/UX Essentials","Machine Learning Lab"].map(x=><div className="tr"><div><b>{x}</b><small>Submitted for review</small></div><span className="status pending">Pending</span><button>Review</button></div>)}</div></>}
function Metrics(){return <><Title t="Platform Metrics" s="System-wide learning activity"/><div className="stats">{[["2,418","Total users"],["86","Courses"],["7,842","Quiz attempts"],["13,490","AI questions"]].map(([a,b])=><div className="stat"><strong>{a}</strong><span>{b}</span></div>)}</div></>}
function Moderation(){return <><Title t="Forum Moderation" s="Review reported discussions"/><div className="table">{["Question about assignment deadline","Study group discussion","Course feedback"].map((x,i)=><div className="tr"><div><b>{x}</b><small>Reported discussion #{i+104}</small></div><span className="status pending">Review</span><button>Moderate</button></div>)}</div></>}
function Title({t,s}){return <div className="sectiontitle"><div><h1>{t}</h1><p>{s}</p></div></div>}
createRoot(document.getElementById("root")).render(<App/>);