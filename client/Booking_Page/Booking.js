const token = sessionStorage.getItem('token');

let l1amnt=500;
let up1amnt=1000;



function mail(event) {
    event.preventDefault()
    window.location.href = "https://mail.google.com/mail/u/0/#inbox?compose=GTvVlcSBpDfrRJKpvJgBDcxTqCqjSKsDpKLFxDKbzQspkKdDJkgbTVWlbNdpKdnGNsLzScQNtCCpg"
}


window.addEventListener('DOMContentLoaded', () => {
    let time = document.getElementById('time');
    time.textContent = new Date();
    console.log(token);
})


function logoutbutton(event) {
    event.preventDefault();
    sessionStorage.removeItem('token')
    window.location.href = '../Login/Login.html'
}

function openForm() {
    document.getElementById("myForm").style.display = "block";
  }
  
  function closeForm() {
    document.getElementById("myForm").style.display = "none";
  }
