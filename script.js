const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const selectedSeatsNumber = document.getElementById('count');
const totalPriceOfSelectedSeats = document.getElementById('price');
const selectedMovie = document.getElementById('movie');
let ticketPrice = +selectedMovie.value;

populateUI();

// save selected movie index and price in local storage
function setMovieDataInLocalStorage(movieIndex, movieTicketPrice){
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMovieTicketPrice', movieTicketPrice);
}

// Update count of selected seats and total price
// Update indices of selected seats in local storage 
function updateSelectedSeatInfo(){
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  
  const selectedSeatsCount = selectedSeats.length;
  selectedSeatsNumber.innerText = selectedSeatsCount;
  totalPriceOfSelectedSeats.innerText = selectedSeatsCount*ticketPrice;

  const seatsIndices = [...selectedSeats].map((seat) => [...seats].indexOf(seat));
  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndices));
}

// Get data from localStorage and populate UI
function populateUI(){
  
  const selectedSeatsIndices = JSON.parse(localStorage.getItem('selectedSeats'));
  if(selectedSeatsIndices != null && selectedSeatsIndices.length > 0){
    selectedSeatsIndices.forEach((index) =>{
      seats[index].classList.add('selected');
    });
  }

  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
  if(selectedMovieIndex != null){
    selectedMovie.selectedIndex = selectedMovieIndex;
  }
  ticketPrice = +selectedMovie.value;
  updateSelectedSeatInfo();
}

// event listeners start here

// movie select event listener
selectedMovie.addEventListener('change', (element) =>{
  ticketPrice = +element.target.value;
  const selectedMovieIndex = element.target.selectedIndex; 
  setMovieDataInLocalStorage(selectedMovieIndex, ticketPrice);
  updateSelectedSeatInfo();
});

// seat click event listener
container.addEventListener('click', (element) => {
  if(element.target.classList.contains('seat') && 
    !element.target.classList.contains('occupied')){
    element.target.classList.toggle('selected');
    updateSelectedSeatInfo();
  }
}); 
