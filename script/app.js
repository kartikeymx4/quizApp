import { Student } from "./Student.js"
import { Teacher } from "./Teacher.js"

const users = JSON.parse(localStorage.getItem("users")) || []
const loggedUser = JSON.parse(localStorage.getItem("loggedUser"))

if(loggedUser!=null){
  document.getElementById("heading").innerHTML = `${loggedUser.name} Your welcome`
}

document.addEventListener("DOMContentLoaded", ()=>{
  let signupForm = document.getElementById("signup-form")
  signupForm.addEventListener("submit", createAccount)

  let loginForm = document.getElementById("login-form")
  loginForm.addEventListener("submit", loginAccount)
})

const createAccount = (e) =>{
  e.preventDefault()
  let userName = document.getElementById("user-name").value
  let userRole = document.getElementById("user-role").value
  let userMail = document.getElementById("user-mail").value
  let userConfirmPassword = document.getElementById("user-confirm-password").value
  let userPassword = document.getElementById("user-password").value
  let user = null
  if(userPassword === userConfirmPassword){
    switch(userRole){
      case "teacher":
        user = new Teacher(userName, userMail, userPassword)
        break
      case "student":
        user = new Student(userName, userMail, userPassword)
        break
      default:
        return console.log("User Role is required")
    }
    users.push(user)
    let jsonString = JSON.stringify(users)
    localStorage.setItem("users", jsonString)
    console.log(JSON.parse(localStorage.getItem("users")))
  }
  else{
    console.log("password does not match")
  }
}

const loginAccount = (e) => {
  e.preventDefault()
  let role = document.getElementById("login-role").value
  let mail = document.getElementById("login-mail").value
  let password = document.getElementById("login-password").value
  for(let i = 0; i < users.length; i++){
    let user = users[i]
    if(user.password === password && user.email === mail && user.role === role){
      localStorage.setItem("loggedUser", JSON.stringify(users[i]))
      document.getElementById("heading").innerHTML = `${user.name} Your welcome`
      console.log(user.name + " Your welcome")
      return
    }
  }
}