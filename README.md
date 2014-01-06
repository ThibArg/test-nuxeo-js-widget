irs-poc-nuxeo-js-widget
=======================
_Just quick testing/help_

POC about doing JS in a Widget, in Nuxeo, displaying infos about "IRSTask" documents


* To build the POC:
	* (_You need maven to be installed, we build the .jar with it_)
	* cd to the main directory of this plug-in
	* mvn package
	* Install the .jar in the "plugins" or the "bundles" directory o your nuxeo server


* To Test the POC:
	* in a layout (for example, in a "Tab"), add a "Template" widget
	* Add a custom property. Name "template", value: The name of the template, here "irs-poc-widget.xhtml"
	* Save and test


