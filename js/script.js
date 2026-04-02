/* ADMIN ACCOUNT */

function createAdmin(){

let user=document.getElementById("newUser").value
let pass=document.getElementById("newPass").value

localStorage.setItem("admin",JSON.stringify({user,pass}))

alert("Admin account created")

}



/* ADMIN LOGIN */

function loginAdmin(){

let user=document.getElementById("username").value
let pass=document.getElementById("password").value

let saved=JSON.parse(localStorage.getItem("admin"))

if(saved && saved.user===user && saved.pass===pass){

window.location="dashboard.html"

}else{

alert("Invalid login")

}

}



/* SUBJECTS */

let subjectCount=0

function addSubject(){

subjectCount++

let container=document.getElementById("subjects")

let div=document.createElement("div")

div.innerHTML=

`<input placeholder="Subject Name" id="sub${subjectCount}">
<input placeholder="Marks" id="mark${subjectCount}">`

container.appendChild(div)

}



/* SAVE STUDENT */

function saveStudent(){

let roll=document.getElementById("roll").value
let name=document.getElementById("name").value

let subjects=[]

for(let i=1;i<=subjectCount;i++){

let sub=document.getElementById("sub"+i).value
let mark=parseInt(document.getElementById("mark"+i).value)

subjects.push({sub,mark})

}

let student={roll,name,subjects}

localStorage.setItem("student_"+roll,JSON.stringify(student))

loadStudents()

}



/* LOAD TABLE */

function loadStudents(){

let table=document.querySelector("#studentTable tbody")

if(!table) return

table.innerHTML=""

for(let key in localStorage){

if(key.startsWith("student_")){

let student=JSON.parse(localStorage.getItem(key))

let row=

`<tr>
<td>${student.roll}</td>
<td>${student.name}</td>
<td>
<button onclick="editStudent('${student.roll}')">Edit</button>
<button onclick="deleteStudent('${student.roll}')">Delete</button>
</td>
</tr>`

table.innerHTML+=row

}

}

}



/* DELETE */

function deleteStudent(roll){

localStorage.removeItem("student_"+roll)

loadStudents()

}



/* EDIT */

function editStudent(roll){

let data=JSON.parse(localStorage.getItem("student_"+roll))

document.getElementById("roll").value=data.roll
document.getElementById("name").value=data.name

document.getElementById("subjects").innerHTML=""

subjectCount=0

data.subjects.forEach(s=>{

addSubject()

document.getElementById("sub"+subjectCount).value=s.sub
document.getElementById("mark"+subjectCount).value=s.mark

})

}



/* STUDENT RESULT */

function viewResult(){

let roll=document.getElementById("rollSearch").value

let data=JSON.parse(localStorage.getItem("student_"+roll))

if(!data){

alert("Result not found")
return

}

let html=`<h3>${data.name}</h3><p>Roll: ${data.roll}</p>`

let labels=[]
let marks=[]

let status="PASS"

data.subjects.forEach(s=>{

html+=`<p>${s.sub}: ${s.mark}</p>`

labels.push(s.sub)
marks.push(s.mark)

if(s.mark<28){
status="FAIL"
}

})

html+=`<h3>Status: ${status}</h3>`

document.getElementById("result").innerHTML=html



/* CHART */

let ctx=document.getElementById("chart")

new Chart(ctx,{

type:'bar',

data:{
labels:labels,
datasets:[{
label:'Marks',
data:marks,
backgroundColor:'#3b82f6'
}]
}

})

}



/* LOAD TABLE */

window.onload=function(){

loadStudents()

}