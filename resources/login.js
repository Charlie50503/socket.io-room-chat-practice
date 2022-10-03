const loginUserInput = document.getElementById("LOGIN_USER_INPUT")
const roomNameInput = document.getElementById("ROOM_NAME_INPUT")

var alertToast = null

function login(){
  if(!isInputHasValue(roomNameInput)){
    showAlert("請輸入 Room name")
    return
  }

  if(!isInputHasValue(loginUserInput)){
    showAlert("請輸入 User name")
    return
  }
  

  localStorage.setItem('userName', loginUserInput.value);
  window.location.href = "index.html";
}

function init(){
  addEnterEvent()
  alertToast = createToast('liveToast')
}

function addEnterEvent(){
  window.document.onkeydown = function(event){
    if (event.key === 'Enter') login()
  }
}

function showAlert(messageHtml){
  const alertToastBody = document.getElementById("ALERT_TOAST_BODY")
  alertToastBody.innerHTML = /*html*/`<p font="noto" class="mb-0">${messageHtml}</p>`
  alertToast.show();
  timeToHideToast(2000,alertToast)
}