var username = JSON.parse(window.localStorage.getItem("AutoJoomerUsername"));
var password = JSON.parse(window.localStorage.getItem("AutoJoomerPassword"));
var branch = JSON.parse(window.localStorage.getItem("AutoJoomerBranch"));
var confirmation = JSON.parse(window.localStorage.getItem("AutoJoomerConfirmation"));

if ((branch == null) || (branch == "null") || (username == null) || (password == null) || (username == "null") || (password == "null") || (username == "") || (password == "") || (confirmation == null)) {
	alert("Some values have not been set. Navigate to the extensions panel in your browser, choose \"AutoJoomer\",  save your values and restart your browser for changes to take effect.");
}
else {
	runningscript();
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	if (message === 'getUsername') {
		sendResponse(username);
	}
	if (message === 'getPassword') {
		sendResponse(password);
	}
});

function runningscript() {
	console.log("Username = " + username);
	console.log("Password = " + password);
	console.log("Branch = " + branch);
	console.log("Confirmation Required = " + confirmation);

	var now = new Date();
	var h = [0, 8, 9, 10, 12, 14, 16];
	var m = [0, 30, 40, 50, 0, 0, 0];
	var thatClassLink = ['', '', '', '', '', '', '', '']
	var thatClassName = ['', '', '', '', '', '', '', '']
	var millisOfThatClass = [0, 0, 0, 0, 0, 0, 0, 0]

	var day = now.getDay();
	if (day != 0 && day != 6) {

		if ((day == 3 || day == 5) && branch == "C")
			m[1] = 0;

		var fetchLink = ""
		if (branch == "C")
			fetchLink = "https://autojoomer-45dc2-default-rtdb.asia-southeast1.firebasedatabase.app/links/CSE.json";
		else
			fetchLink = "https://autojoomer-45dc2-default-rtdb.asia-southeast1.firebasedatabase.app/links/ECE.json";

		$.getJSON(fetchLink, function (links) {
			console.log("Started AutoJoomer");

			var thatDay = (links[day])
			for (let i = 1; i < 7; i++) {

				var thatClass = thatDay[i];
				thatClassName[i] = thatClass['class_name'];
				thatClassLink[i] = thatClass['class_link'];

				if (thatClassName[i] == '') continue;

				if (thatClassLink[i] == '') continue;

				millisOfThatClass[i] = new Date(now.getFullYear(), now.getMonth(), now.getDate(), h[i], m[i], 0, 0) - now;

				if (millisOfThatClass[i] > 0) {
					setTimeout(function () {
						if (confirmation == 1) {
							if (window.confirm('Now the class is ' + thatClassName[i] + ' at ' + h[i] + ":" + m[i])) {
								window.open(thatClassLink[i], "_blank");
							}
						}
						else
							window.open(thatClassLink[i], "_blank");
					}, millisOfThatClass[i]);
				}
				else if (millisOfThatClass[i] > -3600000) {
					if (confirmation == 1) {
						if (window.confirm('Now the class is ' + thatClassName[i] + ' at ' + h[i] + ":" + m[i])) {
							window.open(thatClassLink[i], "_blank");
						}
					}
					else
						window.open(thatClassLink[i], "_blank");
				}
			}
		});
	}
}
