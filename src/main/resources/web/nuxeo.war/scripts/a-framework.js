/* a-framework.js */

function ZeFrameworkInit(inSomething) {
  if (inSomething != null) {
    if (typeof inSomething == "string") {
      alert("Initialisation. Received: < " + inSomething + ">");
    } else {
      alert("Initialisation. inSomething is not a string, it is a "
          + typeof inSomething);
    }
  }
}

function ZeFrameworkSomething(inStr) {
  alert(inStr);
  // id of div Hard-coded for the test
  jQuery("#ze_dashboard").text("received: " + inStr);
}