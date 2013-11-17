test-nuxeo-js-widget
====================
_Just quick testing/help_

POC about doing JS in a Widget, in Nuxeo: We want a DIV, a framework and a css, and check our JS is called when we want and our css are available as expected.


* To build the POC:
	* (_You need maven to be installed, we build the .jar with it_)
	* cd to the main directory of this plug-in
	* mvn package
	* Install the .jar in the "plugins" or the "bundles" directory o your nuxeo server


* To Test the POC:
	* In your Nuxeo Studio project, go to "Resources", expand "Widget Templates"
	* Upload the "test-js-widget.xhtml" file, located in {the source}/src/main/resources/web/nuxeo.war/widgets
	* in a layout (for example, in a "Tab"), add a "Template" widget
	* Select "test-js-widget.xhtml" as the template to use
	* Save and test


