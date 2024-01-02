async function getformvalue(event) {
    event.preventDefault();
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    //console.log(email, password)

    let user_details = {
        email,
        password
    }
    const response = await axios.post('http://localhost:5000/user/login-user', user_details);
    if (response.status == 201) {
        alert('Login Successfull')
        sessionStorage.setItem('token', response.data.token)
        window.location.href='../Booking_Page/Booking.html'
    } else if (response.status == 200) {
        alert('Password Invalid')
    }else{
        console.log(response)
    }
}