
// When browsing the internet this checks every page to see whether or not that page is in the block list or not. If so, it gets blocked.

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){

	chrome.storage.sync.set({'currentTabURL': request.documentOrigin}, function(){
		console.log('The current tab URL is ' + request.documentOrigin);

		chrome.storage.sync.get('blockedUrls', function(result){
			console.log(result.blockedUrls);
			console.log(request.documentOrigin);

			var matchFound = false;

			for(var a = 0; a < result.blockedUrls.length; a++)
			{
				if(request.documentOrigin === result.blockedUrls[a])
				{
					matchFound = true;

				}
			}

			sendResponse({match: matchFound});
		});
	});

	return true;
});