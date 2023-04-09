var today = new Date(); // Get today's date

$(document).ready(function() 
 {
    //Set Date Label (Value + Text) with Today date
    setDateLabel('#dateLabel_steps', today);
   
    //initialize Data
    getSteps(today);
});

//Steps
$('#prevBtn_steps').click(function() {
    var date = new Date($('#dateLabel_steps').val()); // Get selected date from input field
    date.setDate(date.getDate() - 1); // Decrement date by 1 day
    setDateLabel('#dateLabel_steps', date);
    getSteps(date);
  });
  $('#nextBtn_steps').click(function() {
    var date = new Date($('#dateLabel_steps').val()); // Get selected date from input field
    date.setDate(date.getDate() + 1); // Increment date by 1 day
    setDateLabel('#dateLabel_steps', date);
    getSteps(date);
  });

//Make ajax call to flask route to get steps data 
function getSteps(date){
    date = date.toISOString().slice(0, 10);
    $.ajax({
        url: '/my-steps-route/' + date,
        type: 'GET',
        success: function(response) {
          // Do something with the response from Flask
          //Update Steps Data Labels
          $('#stepsTotal').text(response.stepstotal);
          $('#stepGoal').text(response.stepGoal);
          $('#stepsPer').text(response.stepsPer);
          $('#stepsPer').width(response.stepsPer);
        },
        error: function(error) {
          console.log(error);
        }
      });
}

//Set Date Label value & text to specific date 
function setDateLabel(id, date) {
    $(id).val(date.toISOString().slice(0, 10)); //Set Value
    $(id).text(date.toISOString().slice(0, 10)); //Set Text
  
    if (date.toDateString() == today.toDateString()) { // Check if date is today's date
      $(id).text("Today");
  
      //Disable Next Button
      $('#nextBtn_steps').prop('disabled', true);
    }
    else{ // Re-enable next button
      $('#nextBtn_steps').prop('disabled', false);
    }
  }