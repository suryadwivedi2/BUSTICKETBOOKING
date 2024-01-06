function redirectlogin(event) {
    event.preventDefault();
    window.location.href = '../Login/Login.html'
}


function redirectsignup(event) {
    event.preventDefault();
    window.location.href = '../Signup/Signup.html'
}


function mail(event) {
    event.preventDefault()
    window.location.href = "https://mail.google.com/mail/u/0/#inbox?compose=GTvVlcSBpDfrRJKpvJgBDcxTqCqjSKsDpKLFxDKbzQspkKdDJkgbTVWlbNdpKdnGNsLzScQNtCCpg"
}

window.addEventListener('DOMContentLoaded',()=>{
    let time=document.getElementById('time');
    time.textContent=new Date();
})