/* test-js-widget.js */

// Pseudo-constants
var kTask_HOURS = "irstaskcommon:hours";
var kTask_HOURS_ESTIMATE = "irstaskcommon:hours_estimate";
var kTask_ACTIVITY_TITLE = "irstaskcommon:parent_title";
var kDOCTYPE_ENGAGEMENT = "Engagement";
var kDOCTYPE_TASKS_FOLDER = "EngagementTasksFolder";
var kTASKS_FOLDER_IN_PATH = "/Tasks";
var kDOCTYPE_ACTIVITIES_FOLDER = "EngagementActivityFolder";

var tips = {};

function drawDashboard(inDocId, inDocPath, inDocType, inDivId) {
	var allTasks = false;

	var theURL = window.location.origin
				+ "/nuxeo/api/v1/id/" + inDocId
				+ "/@search?query=select * from Task where ecm:isCheckedInVersion = 0 AND ecm:currentLifeCycleState != 'deleted'";
	
	if(inDocType == kDOCTYPE_ENGAGEMENT) {
		theURL += " AND ecm:path STARTSWITH '" + inDocPath + "' ORDER BY " + kTask_ACTIVITY_TITLE;
		allTasks = true;
	} else if (inDocType == kDOCTYPE_TASKS_FOLDER) {
		theURL += " AND ecm:path STARTSWITH '" + inDocPath.replace(kTASKS_FOLDER_IN_PATH, "") + "' ORDER BY " + kTask_ACTIVITY_TITLE;
		allTasks = true;
	} else {
		theURL += " AND ecm:parentId = '" + inDocId +"'";
	}

	jQuery.ajax({
		url: theURL,
		contentType: "application/json+nxrequest",
		headers: {	"X-NXDocumentProperties": "IRSTaskCommon"
				 }
	})
	.done(function(inData, inStatusText, inXHR) {
		_do_drawTheDashboard(inDivId, allTasks, inData, inStatusText, inXHR);
	})
	.fail(function(inXHR, inStatusText, inErrorText) {
		var dashboardDiv = jQuery("#" + inDivId),
			div;
		
		dashboardDiv.empty();
		_drawDawhboardMainTitle(dashboardDiv);
		
		div = "<div id='irs_xhr_error' class='irs_fonts irs_xhr_error'>"
				+ "<p style='font-weight:bold'>An error occured</p>"
				+ "<p style='align: left'><b>Status</b>: " + inStatusText +" </p>"
				+ "<p style='align: left'><b>Error</b>: " + inErrorText +" </p>"
				+ "</div>";
		
		dashboardDiv.append( div );
	});
}

function _drawDawhboardMainTitle(inMainDivObj) {
	inMainDivObj.append("<div id='irs_tasks_main_title' class='irs_fonts tasks_title'>Tasks Dashboard</div>");
}

/*	do_drawTheDashboard
 *	(Private)
 */
function _do_drawTheDashboard(inDivId, inDoAllTasks, inData, inStatusText, inXHR) {
	var dashboardDiv = jQuery("#" + inDivId),
		totalHours = 0,
		totalEstimate = 0,
		div;
	
	dashboardDiv.empty();
	
	_drawDawhboardMainTitle(dashboardDiv);
	
	if(inData.entries.size() == 0) {
		dashboardDiv.append("<div class='irs_fonts no_tasks'>(No tasks)</div>");
		return;
	}
	
	inData.entries.forEach( function(inIRSTask) {
		var props = inIRSTask.properties,
			hours = 0,
			hours_estimate = 0,
			percent = 0,
			doSpecial = false,
			label = "",
			htmlLabel = "",
			labelId = "", progId = "";
	
		if(props[kTask_HOURS]) {
			hours = parseFloat( props[kTask_HOURS] );
		}
		if(props[kTask_HOURS_ESTIMATE]) {
			hours_estimate = parseFloat( props[kTask_HOURS_ESTIMATE] );
		}
	
		if(hours_estimate > 0) {
			percent = Math.round( (hours / hours_estimate) * 100 );
		}
	
		if(percent > 100) {
			doSpecial = true;
		}
		
		totalHours += hours;
		totalEstimate += hours_estimate;
	
		label = inIRSTask.title + " (" + hours + "h/" + hours_estimate + "h): ";
		
		if(doSpecial) {
			htmlLabel = "<span>" + label + "</span><span class='irs_fonts progress_label_overloaded'>" + percent + "%</span>";
		} else {
			htmlLabel = "<span>" + label + percent + "%</span>";
		}
		
		progId = "prog" + inIRSTask.uid;
		labelId = "label" + inIRSTask.uid;
	
		var div = "<div id='" + inIRSTask.uid +"' class='irs_fonts irs_main_class oneTask'>";
			if(inDoAllTasks) {
				div += "<p class='progress_main_label'>" + props[kTask_ACTIVITY_TITLE] + "</p>";
			}
			div += "<progress id='" + progId +"'";
				div += " value='" + props[kTask_HOURS] + "'";
				div += " max='" + props[kTask_HOURS_ESTIMATE] + "' />";
			
			div += "<div id='" + labelId + "' class='irs_fonts progress_label'>" + htmlLabel + "</div>";
			
		div += "</div>";
	
		dashboardDiv.append(div);
		
		// Just setup the label div
		var labelElt = jQuery("#" + labelId);
		var progressElt = jQuery("#" + progId);
		labelElt.css("top", progressElt.position().top);
		labelElt.css("left", progressElt.position().left);
		labelElt.width( "100%"/**progressElt.width()*/ );
		
	}); // inData.entries.forEach
	
	div = "<div class='irs_fonts irs_main_class oneTask' style='padding: 5px !important'>"
			+ "<progress id='irs_tasks_summary'"
			+ " value='" + totalHours + "'"
			+ " max='" + totalEstimate + "' />"
			+ "<div id='irs_tasks_summary_label' class='irs_fonts progress_label_summary'>All tasks: " + (totalEstimate == 0 ? 0 : Math.round((totalHours/totalEstimate) * 100)) + "%</div>"
			+ "</div>";
	
	jQuery("#irs_tasks_main_title").after(div);
	
	var labelElt = jQuery("#irs_tasks_summary_label");
	var progressElt = jQuery("#irs_tasks_summary");
	labelElt.css("top", progressElt.position().top);
	labelElt.css("left", progressElt.position().left);
	labelElt.width( "100%"/**progressElt.width()*/ );
	
	
}

//--EOF--

