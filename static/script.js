$(document).ready(function() 
 {
  const today = new Date();
    //Set Date Label (Value + Text) with Today date
    setDateLabel('#dateLabel_steps', today);
    setDateLabel('#dateLabel_sleep', today);
   
    //initialize Data
    getSteps(today);
    getSleep(today);

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

  //Sleep
$('#prevBtn_sleep').click(function() {
    var date = new Date($('#dateLabel_sleep').val()); // Get selected date from input field
    date.setDate(date.getDate() - 1); // Decrement date by 1 day
    setDateLabel('#dateLabel_sleep', date);
    getSleep(date);
  });
  $('#nextBtn_sleep').click(function() {
    var date = new Date($('#dateLabel_sleep').val()); // Get selected date from input field
    date.setDate(date.getDate() + 1); // Increment date by 1 day
    setDateLabel('#dateLabel_sleep', date);
    getSleep(date);
  });
  
  function getSteps(date) {
    makeAjaxCall('/my-steps-route/' + getDateString(date), updateStepsData);
  }
  function getSleep(date) {
    makeAjaxCall('/my-sleep-route/' + getDateString(date), updateSleepData);
  }
  function makeAjaxCall(url, successFunc, errorFunc = console.log) {
    $.ajax({
      url: url,
      type: 'GET',
      success: successFunc,
      error: errorFunc,
    });
  }
  function updateStepsData(response) {
    $('#stepsTotal').text(response.stepstotal);
    $('#stepGoal').text(response.stepGoal);
    $('#stepsPer').text(response.stepsPer).width(response.stepsPer);
  }
  function updateSleepData(response) {
    $('#sleepTotal').text(response.sleepTotal);
    $('#sleepStart').text(response.sleepStart);
    $('#sleepEnd').text(response.sleepEnd);
  }
  function getDateString(date) {
    return date.toISOString().slice(0, 10);
  }

//Set Date Label value & text to specific date 
function setDateLabel(id, date) {
    $(id).val(date.toISOString().slice(0, 10)); //Set Value
    $(id).text(date.toISOString().slice(0, 10)); //Set Text
  
    if (date.toDateString() == today.toDateString()) { // Check if date is today's date
      $(id).text("Today");
  
      //Disable Next Button
      $('#nextBtn_steps').prop('disabled', true);
      $('#nextBtn_sleep').prop('disabled', true);
    }
    else{ // Re-enable next button
      $('#nextBtn_steps').prop('disabled', false);
      $('#nextBtn_sleep').prop('disabled', false);
    }
  }
});