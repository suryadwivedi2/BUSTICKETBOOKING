const token = sessionStorage.getItem('token');

let l1amnt = 500;
let up1amnt = 1000;



function mail(event) {
    event.preventDefault()
    window.location.href = "https://mail.google.com/mail/u/0/#inbox?compose=GTvVlcSBpDfrRJKpvJgBDcxTqCqjSKsDpKLFxDKbzQspkKdDJkgbTVWlbNdpKdnGNsLzScQNtCCpg"
}


window.addEventListener('DOMContentLoaded', async () => {
    let time = document.getElementById('time');
    let date = new Date();
    time.textContent = new Date();
    console.log(token);

    var today = new Date().toISOString().split('T')[0];
    document.getElementsByName("setTodaysDate")[0].setAttribute('min', today);

})


function logoutbutton(event) {
    event.preventDefault();
    sessionStorage.removeItem('token')
    window.location.href = '../Login/Login.html'
}

let totalamount;

function openForm(value, name) {
    document.getElementById("myForm").style.display = "block";
    const seatname = document.getElementById('seat_name');
    const amnt = document.getElementById('amnt');
    const seatdate = document.getElementById('seat_date');
    totalamount = 0;
    if (value == 'l') {
        totalamount = distance * 5;
    } else if (value == 'U') {
        totalamount = distance * 8;
    }
    //console.log(value)
    amnt.value = `${totalamount} `
    seatname.value = `${name}`
    seatdate.value = `${journey_date}`

}

function closeForm() {
    document.getElementById("myForm").style.display = "none";
}

let distance = 0;


function CheckDistance(event) {
    event.preventDefault();
    const source = document.getElementById('_from').value
    const destination = document.getElementById('_to').value;
    if (source == destination) {
        alert("Please select different Source and Destination")
    }



    if (source == "delhi" && destination == "agra" || source == 'agra' && destination == 'delhi') {
        distance = 240;
    } else if (source == 'delhi' && destination == 'lucknow' || source == 'lucknow' && destination == 'delhi') {
        distance = 554;
    } else if (source == 'agra' && destination == 'lucknow' || source == 'lucknow' && destination == 'agra') {
        distance = 336;
    }

    const input = document.getElementById('kms');
    input.value = `${distance} kms`;
    input.style.visibility = 'visible';
}

async function select_date() {
    let journey_date = document.getElementById('date').value;
    journey_date = journey_date.toString();
    console.log(journey_date)
    const response = await axios.get(`http://localhost:5000/purchase/get-order`);
    for (let i = 0; i < response.data.length; i++) {
        let date = response.data[i].journeydate.toString();
        if (response.data[i].status = 'successfull' && response.data[i].journeydate.split('T')[0] == journey_date) {
            const seat_btn = document.getElementById(`${response.data[i].seat}`);
            seat_btn.disabled = true;
        }else{
            const seat_btn = document.getElementById(`${response.data[i].seat}`);
            seat_btn.disabled = false;
        }
    }
}


async function BookTicket(event) {
    const phonenumber = document.getElementById('phnumber').value;
    const name = document.getElementById('name').value;
    const source = document.getElementById('_from').value;
    const destination = document.getElementById('_to').value;
    const seatname = document.getElementById('seat_name').value;
    const seatdate = document.getElementById('seat_date').value

    event.preventDefault();
    let asnt_detail = {
        "amount": totalamount,
        "name": name,
        "source": source,
        "destination": destination,
        "Mobile": phonenumber,
        "seat": seatname,
        "journey_date": seatdate
    }
    const response = await axios.post('http://localhost:5000/purchase/purchase-ticket', asnt_detail, { headers: { "Authorization": token } });
    console.log(response);

    let options = {
        "key": response.data.key_id,
        "order_id": response.data.order.id,
        "handler": async function (response) {
            const res = await axios.post('http://localhost:5000/purchase/update-transaction', {
                order_id: options.order_id,
                payment_id: response.razorpay_payment_id,
                "name": name,
                "source": source,
                "destination": destination,
                "Mobile": phonenumber
            }, { headers: { "Authorization": token } })
            alert('Ticket Is Booked')
        }
    }
    const rpz1 = new Razorpay(options)
    rpz1.open();


    rpz1.on('payment.failed', async function (response) {
        await axios.post('http://localhost:5000/purchase/update-transaction', {
            order_id: options.order_id,
            payment_id: response.razorpay_payment_id
        }, { headers: { "Authorization": token } })

        alert('Ticket Not booked..please try again');

    })
}

