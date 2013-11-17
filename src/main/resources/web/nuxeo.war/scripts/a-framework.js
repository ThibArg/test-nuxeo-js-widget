/* a-framework.js */

function ZeFrameworkInit(inSomething) {
	if(typeof inSomething == "string") {
		console.log("Initialisation. Received: < " + inSomething + ">");
	} else {
		console.log("Initialisation. inSomething is not a string, it is a " + typeof inSomething);
	}
}

function ZeFrameworkChangeClass(inId) {
	console.log("Calling ZeFrameworkChangeClass + (" + inId + ")");
	// id of div Hard-coded for the test
	jQuery("#" + inId).text("received: " + inId);
	jQuery("#" + inId).addClass("zeFrameworkYellowAndBlue");
}