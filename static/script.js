$(document).ready(function() 
 {
  const today = new Date();
  setDateAndGetData('#dateLabel_steps', today, getSteps);
  setDateAndGetData('#dateLabel_sleep', today, getSleep);

$('#prevBtn_steps').click(function() {
  decrementDateAndGetData('#dateLabel_steps', getSteps);
});
$('#nextBtn_steps').click(function() {
  incrementDateAndGetData('#dateLabel_steps', getSteps);
});

$('#prevBtn_sleep').click(function() {
  decrementDateAndGetData('#dateLabel_sleep', getSleep);
});
$('#nextBtn_sleep').click(function() {
  incrementDateAndGetData('#dateLabel_sleep', getSleep);
});

function setDateAndGetData(selector, date, getDataFunc) {
  setDateLabel(selector, date);
  getDataFunc(date);
}

function incrementDateAndGetData(selector, getDataFunc) {
  const date = new Date($(selector).val());
  date.setDate(date.getDate() + 1);
  setDateAndGetData(selector, date, getDataFunc);
}

function decrementDateAndGetData(selector, getDataFunc) {
  const date = new Date($(selector).val());
  date.setDate(date.getDate() - 1);
  setDateAndGetData(selector, date, getDataFunc);
}
  
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

function setDateLabel(selector, date) {
    $(selector).val(date.toISOString().slice(0, 10)); 
    $(selector).text(date.toISOString().slice(0, 10)); 
  
    if (date.toDateString() === today.toDateString()) { 
      $(selector).text("Today");
  
      $('#nextBtn_steps').prop('disabled', true);
      $('#nextBtn_sleep').prop('disabled', true);
    }
    else{ 
      $('#nextBtn_steps').prop('disabled', false);
      $('#nextBtn_sleep').prop('disabled', false);
    }
  }
});