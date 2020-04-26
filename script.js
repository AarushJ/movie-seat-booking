const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const selectedSeatsNumber = document.getElementById('count');
const totalPriceOfSelectedSeats = document.getElementById('price');
const selectedMovie = document.getElementById('movie');

let ticketPrice = +selectedMovie.value;

// save selected movie index and price in local storage
function setMovieDataInLocalStorage(movieIndex, movieTicketPrice){
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMovieTicketPrice', movieTicketPrice);
}

/**
 * Update count of selected seats and total price
 * Update count of selected seats in local storage 
 */
function updateSelectedCount(){
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  const seatsIndices = [...selectedSeats].map((seat) => [...seats].indexOf(seat));
  
  const selectedSeatsCount = selectedSeats.length;
  selectedSeatsNumber.innerText = selectedSeatsCount;
  totalPriceOfSelectedSeats.innerText = selectedSeatsCount*ticketPrice;

  localStorage.setItem('selectedSeats', seatsIndices);
}

// event listeners start here

// movie select event listener
selectedMovie.addEventListener('change', (element) =>{
  ticketPrice = +element.target.value;
  const selectedMovieIndex = element.target.selectedIndex; 
  setMovieDataInLocalStorage(selectedMovieIndex, ticketPrice);
  updateSelectedCount();
});

// seat click event listener
container.addEventListener('click', (element) => {
  if(element.target.classList.contains('seat') && 
    !element.target.classList.contains('occupied')){
    element.target.classList.toggle('selected');
    updateSelectedCount();
  }
});


  
