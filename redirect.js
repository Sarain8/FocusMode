//Sends the current tab URL to background_page.js to check if it's on the block list or not.

var currentPage = document.location.origin;

console.log(currentPage);

chrome.runtime.sendMessage({documentOrigin: currentPage}, function(response) {
  console.log(response.match);

  if(response.match === true)
  {
  	document.location.href = chrome.runtime.getURL("redirect.html");

  }

});
