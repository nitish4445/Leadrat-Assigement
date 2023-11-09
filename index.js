document.addEventListener("DOMContentLoaded", function () {
    const dropdown = document.getElementById('dropdown');
    const qtyDropdown = document.getElementById('Qty-dropdown');
    const seats = document.querySelectorAll('.seat');
  
    let selectedSeats = 0;
    let selectedType = 'Standard'; // Default type
  
    // Function to update selected seats count
    function updateSelectedCount() {
      const selected = document.querySelectorAll('.seat.selected').length;
      selectedSeats = selected;
    }
  
    // Event listener for changing ticket type
    dropdown.addEventListener('change', function (e) {
      selectedType = e.target.options[e.target.selectedIndex].text;
      updateSelectedCount();
    });
  
    // Event listener for selecting seats
    seats.forEach(seat => {
      seat.addEventListener('click', function () {
        if (!seat.classList.contains('occupied')) {
          const selectedQty = parseInt(qtyDropdown.value);
          const selected = document.querySelectorAll('.seat.selected').length;
  
          if (seat.classList.contains('selected')) {
            seat.classList.remove('selected');
          } else {
            if (selected < selectedQty) {
              seat.classList.add('selected');
            }
          }
  
          updateSelectedCount();
        }
      });
    });
  
    // Event listener for selecting ticket quantity
    qtyDropdown.addEventListener('change', function () {
      const selectedQty = parseInt(qtyDropdown.value);
      const selected = document.querySelectorAll('.seat.selected');
  
      if (selected.length > selectedQty) {
        selected.forEach((seat, index) => {
          if (index >= selectedQty) {
            seat.classList.remove('selected');
          }
        });
      } else if (selected.length < selectedQty) {
        seats.forEach((seat, index) => {
          if (!seat.classList.contains('occupied')) {
            if (index < selectedQty) {
              seat.classList.add('selected');
            }
          }
        });
      }
  
      updateSelectedCount();
    });
  
    // Event listener for the PROCEED button
    document.querySelector('.proceddBtn').addEventListener('click', function () {
      const totalSelected = selectedSeats;
      const selectedTypeSeats = document.querySelectorAll('.seat.selected').length;
  
      if (totalSelected > 0 && selectedTypeSeats === totalSelected) {
        alert(`Booking confirmed for ${totalSelected} ${selectedType} seat(s).`);
        // Simulate booking: Mark selected seats as occupied
        document.querySelectorAll('.seat.selected').forEach(seat => {
          seat.classList.remove('selected');
          seat.classList.add('occupied');
        });
      } else {
        alert('Please select the correct number of seats or type.');
      }
    });
  });
  