const loginUserInput = document.getElementById("LOGIN_USER_INPUT")
function login(){
  if(!isInputHasValue(loginUserInput)){
    alert("請輸入user name")
    return
  }

  localStorage.setItem('userName', loginUserInput.value);
  window.location.href = "index.html";
}