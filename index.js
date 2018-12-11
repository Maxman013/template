/*
 * This is a basic template for creating Facebook bots in JavaScript (node)
 * There are a few things you want to have done first before using this template:
 * 1. Download node.js if you haven't already (https://nodejs.org/en/download/ - choose LTS)
 * 2. Learn a bit of JavaScript so you can create a program that outputs what you want your bot to generate
 * 3. Create a page for your bot on Facebook. Choose Community Figure and not Business. Get your Page ID from the About section
 * 4. Visit https://maxman013.github.io/token to generate an access token for your page. DO NOT SHOW THIS TOKEN PUBLICLY!!!
 * 5. Open a command prompt or terminal window and navigate to the folder the bot script is in by running the command $ cd <folder path> (don't include the $)
 * 6. Install the necessary node modules (which are "fb" and "node-cron" without quotation marks) through $ npm i <module name> --s
 * 7. Install other node modules as you need to for your script
 * 8. Put the code that generates the output inside the genPost() function below, making sure it returns the right things as detailed below, and edit other parts as needed
 * 9. Run the script through $ node index in the cmd/terminal window
 * Your bot should now be running!
 * To create more complicated or complex bots, or information on how this works, check out the Facebook Graph API documentation here:
 * https://developers.facebook.com/docs/pages/
 *
 * Basic Bot Template created by Paintmin 2018
 */

//PUT INFORMATION HERE - for each line, put the relevant bit of information inside the quotation marks
const TOKEN = ""; //put Access Token obtained from Step 4
const pageID = ""; //put Page ID obtained in Step 3

//Facebook API framework
const FB = require("FB");
FB.setAccessToken(TOKEN);

//Scheduling framework
const cron = require("node-cron");

//COMMENT CHAINS - copy paste this block of code into the cron.schedule() function where needed, and delete it here.
FB.api(`${postID}/comments`, "post", {
	message: "" //put what you want the bot to comment here - you can do this in any way you like. Image comments aren't supported in this basic template.
}, res => {
	//if no response or error, throw error
	if (!res || res.error) {
		console.log(!res ? "Error occurred" : res.error);
		return;
	}
	var commentID = res.id;
	console.log("Comment/Reply ID: " + commentID); //log post id
	//insert comment chains below if needed, but change ${postID} in the first line to ${commentID}
});

//Generate post on schedule - every hour in this template
const task = cron.schedule("0 * * * *", () => {
	//depending on what your bot will be posting, delete the blocks of code you don't need.

	//TEXT ONLY POSTS - keep this and delete the others
	FB.api(`${pageID}/feed`, "post", {
		message: genPost() //the output of genPost() (what it returns) will be what the bot posts
	}, res => {
		//if no response or error, throw error
		if (!res || res.error) {
	    	console.log(!res ? "Error occurred" : res.error);
	    	return;
  		}
  		var postID = res.post_id;
  		console.log("Post ID: " + postID); //log post id
  		//insert comment chains below if needed
	});

	//IMAGE ONLY POSTS - keep this and delete the others
	FB.api(`${pageID}/photos`, "post", {
		url: genPost() //the output of genPost() (what it returns) will be the image the bot posts
	}, res => {
		//if no response or error, throw error
		if (!res || res.error) {
	    	console.log(!res ? "Error occurred" : res.error);
	    	return;
  		}
  		var postID = res.post_id;
  		console.log("Post ID: " + postID); //log post id
  		//insert comment chains below if needed
	});

	//IMAGE AND TEXT POSTS - keep this and delete the others
	FB.api(`${pageID}/photos`, "post", {
		url: genPost()[0], //the first output of genPost() (what it returns) will be the image the bot posts
		caption: genPost()[1] //the second output of genPost() (what it returns) will be the caption the bot posts
	}, res => {
		//if no response or error, throw error
		if (!res || res.error) {
	    	console.log(!res ? "Error occurred" : res.error);
	    	return;
  		}
  		var postID = res.post_id;
  		console.log("Post ID: " + postID); //log post id
  		//insert comment chains below if needed
	});
});

//Put the code that the bot uses to generate stuff inside this function!
function genPost() {
	//You want this function to return different things depending on what you want the bot to post. In this basic template videos aren't supported.
	//TEXT ONLY POSTS - return a String: this is the text that the bot will post
	//IMAGE ONLY POSTS - return a String: this is the **IMAGE URL** of the image the bot will post
	//IMAGE AND TEXT POSTS - return an Array: the first element is the image URL of the image the bot will post as a String, and the second element is the caption the bot posts with the image as a String

}

task.start(); //begin scheduled posting