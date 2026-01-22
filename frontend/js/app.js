const API="http://localhost:5000/api";
async function login(){
 const email=document.getElementById("email").value;
 const password=document.getElementById("password").value;
 const r=await fetch(API+"/login",{method:"POST",headers:{"Content-Type":"application/json"},
 body:JSON.stringify({email,password})});
 const d=await r.json();localStorage.token=d.token;location="dashboard.html";
}
async function loadDashboard(){
 const r=await fetch(API+"/dashboard",{headers:{Authorization:localStorage.token}});
 const d=await r.json();
 document.getElementById("balance").innerText="₹"+d.balance;
 d.transactions.forEach(t=>tx.innerHTML+=`<li>${t.type} ₹${t.amount}</li>`);
}