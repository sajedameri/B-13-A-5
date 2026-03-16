
function login(){

const user=document.getElementById("username").value
const pass=document.getElementById("password").value

if(user==="admin" && pass==="admin123"){
window.location.href="Issues.html"
}
else{
alert("Invalid Credentials")
}

}



  const container=document.getElementById("issuesContainer")



async function loadIssues(type){

container.innerHTML="Loading..."

const res=await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
const data=await res.json()

let issues=data.data

if(type==="open"){
issues=issues.filter(i=>i.status==="open")
}

if(type==="closed"){
issues=issues.filter(i=>i.status==="closed")
}

document.getElementById("issueCount").innerText=issues.length

showIssues(issues)

}


function showIssues(issues){

container.innerHTML=""

issues.forEach(issue=>{

const card=document.createElement("div")

const border=
issue.status==="open"
?"border-t-4 border-green-500"
:"border-t-4 border-purple-500"

card.className=`bg-white p-4 rounded shadow cursor-pointer ${border}`

card.innerHTML=`

<h3 class="font-bold">${issue.title}</h3>

<p class="text-sm text-gray-500">
${issue.description}
</p>

<p class="text-xs mt-2">Status: ${issue.status}</p>

<p class="text-xs">Author: ${issue.author}</p>

<p class="text-xs">Priority: ${issue.priority}</p>

<p class="text-xs">Label: ${issue.label}</p>

<p class="text-xs">${issue.createdAt}</p>

`

card.onclick=()=>openModal(issue.id)

container.appendChild(card)

})

}



async function openModal(id){

const res=await fetch(
`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`
)

const data=await res.json()

const issue=data.data

document.getElementById("modalTitle").innerText=issue.title
document.getElementById("modalDesc").innerText=issue.description
document.getElementById("modalAuthor").innerText="Author: "+issue.author
document.getElementById("modalPriority").innerText="Priority: "+issue.priority
document.getElementById("modalLabel").innerText="Label: "+issue.label
document.getElementById("modalDate").innerText="Created: "+issue.createdAt

document.getElementById("modal").classList.remove("hidden")

}

function closeModal(){
document.getElementById("modal").classList.add("hidden")
}



async function searchIssue(){

const text=document.getElementById("searchInput").value

const res=await fetch(
`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchtext}`
)

const data=await res.json()

showIssues(data.data)

}


loadIssues("all")