
// Add a new website to the block list

function addNewURL(url){


		chrome.storage.sync.get("blockedUrls", function(result) {

			if(Object.keys(result).length === 0)
			{
				chrome.storage.sync.set({'blockedUrls': [url]}, function(){
					console.log('Success! Added ' + url + " to the block list.");
					var newParagraph = document.createElement("p"); 
					var newContent = document.createTextNode("website successfully added!"); 
					newParagraph.appendChild(newContent);
					newParagraph.setAttribute('class', 'status');

					// add the newly created element and its content into the DOM 
					var section = document.getElementById("script"); 
					document.body.insertBefore(newParagraph, section);

					var myTimer = setTimeout(function(){document.querySelector('.status').remove();}, 3000);
					setTimeout(function(){window.clearTimeout(myTimer);}, 3000);
					window.location.reload(true);
				});
			}
			else
			{
				var allUrls = result.blockedUrls;

				allUrls.push(url);

	          	chrome.storage.sync.set({'blockedUrls': allUrls}, function(){
					
					console.log('Success! Added ' + url + " to the block list.");

					// create a new div element 
					var newParagraph = document.createElement("p"); 
					// and give it some content 
					var newContent = document.createTextNode("website successfully added!"); 
					// add the text node to the newly created div
					newParagraph.appendChild(newContent);
					newParagraph.setAttribute('class', 'status');

					// add the newly created element and its content into the DOM 
					var section = document.getElementById("script"); 
					document.body.insertBefore(newParagraph, section);
				

					var myTimer = setTimeout(function(){document.querySelector('.status').remove();}, 3000);
					setTimeout(function(){window.clearTimeout(myTimer);}, 3000);
					window.location.reload(true);
				});					
			}
        });
	}


var inputBox = document.querySelector('input');
var button = document.querySelector('#button');

// When popup.html loads, automatically grab a list of the blocked websites.

window.onload = function() {
  
 chrome.storage.sync.get('currentTabURL', function(result){
  	console.log(result.currentTabURL);

  	inputBox.value = result.currentTabURL;

  });

 chrome.storage.sync.get("blockedUrls", function(result){

 	var table = document.querySelector('table');

 	if(result.blockedUrls)
 	{
	 	for(var b = 0; b < result.blockedUrls.length; b++)
	 	{
	 		// Creating the table data for popup.html
	 		
	 		console.log(result.blockedUrls[b])
		 	var firstRow = document.createElement("tr");
		 	firstRow.setAttribute('data-blocked-item','');
		 	var firstData = document.createElement("td");
		 	firstData.textContent = result.blockedUrls[b];
		 	firstData.setAttribute('data-index-number', b);
		 	firstRow.appendChild(firstData);
		 	var secondData = document.createElement("td");
		 	secondData.innerHTML = "<button id=id" + b + ">remove</button>";
		 	firstRow.appendChild(secondData);

		 	document.querySelector('tbody').insertBefore(firstRow, null);
		 	
	 	}
 	}
 	
 });

}

//When the button to add a new url is clicked, run the addNewURL function

button.addEventListener('click', function(){

	addNewURL(inputBox.value);

}, false);

//Create a table that holds and displays the URLS and automatically adds new sites to the displayed list

var table = document.querySelector('table');

function removeURL(e){
	var target = e.target;
	var parent = target.parentElement;
	var grandparent = target.parentElement.parentElement;
	var findMatchingEl = function(element){return element === target.parentElement.previousElementSibling.textContent};
	
	chrome.storage.sync.get("blockedUrls", function(result){
		var oldArray = result.blockedUrls;
		console.log(oldArray);


		oldArray.splice(oldArray.findIndex(findMatchingEl), 1);

		var updatedList = oldArray;

		chrome.storage.sync.remove('blockedUrls');

		chrome.storage.sync.set({'blockedUrls': updatedList}, function(){
			window.location.reload(true);
		});

	});
	

}

// When the remove button is clicked, remove the URLS from the block list

table.addEventListener('click', function(e){
	removeURL(e);
}, false);
