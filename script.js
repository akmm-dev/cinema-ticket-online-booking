let movies = document.querySelectorAll('.movie');
movies.forEach((movie, i) => {
    movie.addEventListener('click', () => {
        var movieName = movies[i].querySelector('#moviename').innerHTML.toUpperCase();
        localStorage.setItem('moviename', movieName);
        document.querySelector('.movie-body').style.display = 'none';
        document.querySelector('.CinemaList').style.display = 'flex';
        getCinemaList();
    })
   
})
async function getCinemaList() {
    let response = await fetch('./MovieTicketOnlineBookingSystem.json');
    let Data = await response.json();
    
    let cinemas = Data.Tbl_CinemaList;

    for (let i = 0; i < cinemas.length; i++) { 
        document.querySelector('.CinemaList').innerHTML +=
            `<div class="cinema">${cinemas[i].CinemaName}</div>`;
    }

    let allCinema = document.querySelectorAll('.cinema');
    allCinema.forEach((cinema, i) => { 
        cinema.addEventListener('click', () => { 
            
            localStorage.setItem('cinema', allCinema[i].innerHTML);
            document.querySelector('.CinemaList').style.display = 'none';
            document.querySelector('.movie-body').style.display = 'none';
            document.querySelector('.RoomList').style.display = 'flex';
        });
    });
}

let Rooms = document.querySelectorAll('.Room');

Rooms.forEach((room, i) => {
    room.addEventListener('click', () => {
    localStorage.setItem('Seats', '[]');
    localStorage.setItem('Price', '[]');
        localStorage.setItem('roomNumber', Rooms[i].innerHTML);
        document.querySelector('.RoomList').style.display = 'none';
        document.querySelector('.seatList').style.display = 'flex';
    })
})

let times = document.querySelectorAll('.time');

times.forEach((time, i) => { 
    time.addEventListener('click', () => {
        document.querySelector('.choseTime').innerHTML=times[i].innerHTML;
        document.querySelector('.Time').disabled = true;
        time.disabled = true;
        localStorage.setItem('time', times[i].innerHTML);

    })
})

let seats = document.querySelectorAll('.seat');
let price = [];
seats.forEach((seat, i) => {  
    


    seat.addEventListener('click', () => {
        seats[i].style = 'background-color: lightblue';
        seats[i].classList.add('selected');
        
        

        var choseSeatPrice = JSON.parse(localStorage.getItem('Price'));
        
         if (i <= 39) {
            choseSeatPrice.push("5,000");
            localStorage.setItem('Price', JSON.stringify(choseSeatPrice));
        } else if (i > 39 && i <=69) {
             choseSeatPrice.push('8,000');
            localStorage.setItem('Price', JSON.stringify(choseSeatPrice));
        } else if (i > 69 && i <= 99) {
            choseSeatPrice.push('10,000');
            localStorage.setItem('Price', JSON.stringify(choseSeatPrice));
        } else {
            choseSeatPrice.push('13,000');
            localStorage.setItem('Price', JSON.stringify(choseSeatPrice));
         }
         var choseSeat = JSON.parse(localStorage.getItem('Seats'));

        choseSeat.push(seats[i].innerHTML);
        
        localStorage.setItem('Seats', JSON.stringify(choseSeat));
    })
   

})

document.querySelector('.reset').addEventListener('click', function () {
    localStorage.removeItem('moviename');
    localStorage.removeItem('cinema');
    localStorage.removeItem('roomNumber');
    localStorage.removeItem('time');
    localStorage.setItem('Seats', '[]');
    localStorage.setItem('Price', '[]');
    localStorage.setItem('proceed', 0);
    location.reload();
})

document.querySelector('.proceed').addEventListener('click', function () {
            var SEATS = JSON.parse(localStorage.getItem('Seats'));
            var PRICE = JSON.parse(localStorage.getItem('Price'));
            let moviename = localStorage.getItem('moviename');
            let Cinema = localStorage.getItem('cinema');
            let Room = localStorage.getItem('roomNumber');
    let Time = localStorage.getItem('time');
    

    if (Time !== null && SEATS.length !== 0) {
        localStorage.setItem('proceed', 1);

        document.querySelector('.seatList').style.display = 'none';
        document.querySelector('.ticket-body').style.display = 'flex';
        for (var i = 0; i < SEATS.length; i++) {
            document.querySelector('.ticket-body').innerHTML +=
                `<div class="ticket">
            <p>${moviename}</p>
            <p>location- ${Cinema}</p>
            <p>Cinema- ${Room}</p>
            <p>Time- ${Time}</p>
            <p>Seat- ${SEATS[i]}</p>
            <p>Price- ${PRICE[i]} MMK</p>
        </div>`;
            document.querySelector('.proceed').classList.add('disabled');
        }
        
    } else {
        alert("Can't proceed!")
    }

})
var SEATS = JSON.parse(localStorage.getItem('Seats'));
var PRICE = JSON.parse(localStorage.getItem('Price'));
let moviename = localStorage.getItem('moviename');
let Cinema = localStorage.getItem('cinema');
let Room = localStorage.getItem('roomNumber');
let Time = localStorage.getItem('time');

if (localStorage.getItem('proceed') == 1 ) {
    
    document.querySelector('.movie-body').style.display = 'none';
    document.querySelector('.CinemaList').style.display = 'none';
    document.querySelector('.RoomList').style.display = 'none';
    document.querySelector('.seatList').style.display = 'none';
    document.querySelector('.ticket-body').style.display = 'flex';

    document.querySelector('.proceed').classList.add('disabled');
    for (var i = 0; i < SEATS.length; i++) {

            document.querySelector('.ticket-body').innerHTML +=
                `<div class="ticket">
            <p>${moviename}</p>
            <p>location- ${Cinema}</p>
            <p>Cinema- ${Room}</p>
            <p>Time- ${Time}</p>
            <p>Seat- ${SEATS[i]}</p>
            <p>Price- ${PRICE[i]} MMK</p>
        </div>`;
        }
} else {
    localStorage.removeItem('time');
}

let upComings = document.querySelectorAll('.uc-movie');

upComings.forEach((upComing , i) => {
    upComing.addEventListener('click', () => {
        alert('Coming Soon! Please stay tuned!')
    })
    
})

