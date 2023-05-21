var playButton;



//test2
var gaming;
var confirming;

var createButton1;
var hideConfirmButton;

var creationButtons = [];
//var creationButtonsText = ["Housing","Food", "Resources","Safety","Water","Healthcare","Recreation"];
var buttonCreator;
var buttondrawer;
var buttonHider;
var buttonPrecreator;
var sectorImages = [];

var buildingCreator;
var buildingPrecreator;
var buildingHider;
var buildingDrawer;
var buildingButtons = [];
var buildingButtonsText = [];


var sector1;
var update1;
var buildingInfo = [];
var playerInfo;
var activeTimers = [];




var resourceUpdateTimer;
var pastProductionInfo = {};
var playerSave;
var logingin = false;
var userInfo;
var postData;
var s3;
var lastEvent
var lastxy






function preload() {

	Background = loadImage("Assets/Background.png");
	stone = loadImage("Assets/stone.png");
	create = loadImage("Assets/Create.png");
	//close = loadImage("Assets/close.png");


	for (let images = 0; images < 2; images++) {

		sectorImages[images] = loadImage("Assets/Sector" + 1 + ".png");

		//buildingButtons[1] = undefined;

	}



}

function setup() { //Runs on program start

	info(); //Defaults player values
	initializeBuildings(); //Initializes some building values
	playerInfo.initializeProduction();
	let logindiv = createDiv();
	logindiv.position(windowWidth / 2, windowHeight / 2)
	logindiv.id("logindiv");
	AWS.config.region = 'us-east-1';
	var cognitoidentity = new AWS.CognitoIdentity({
		apiVersion: '2014-06-30'
	}); // Region
	let cognitoID;
	AWS.config.credentials = new AWS.CognitoIdentityCredentials({
		//	IdentityId: cognitoID,
		IdentityPoolId: 'us-east-1:6f08b6e9-cb5a-4ac5-a418-096b814b92c9',
		//LoginId: parsedLoginInfo.email,

	});
	s3 = new AWS.S3({
		apiVersion: '2006-03-01',
		params: {
			Bucket: "vandsbucket"

		}
	});








	handleCredentials = function (response) {
		try {

			let credentials = response.credential;
			//credentials = "eyJhbGciOiJSUzI1NiIsImtpZCI6ImM5YWZkYTM2ODJlYmYwOWViMzA1NWMxYzRiZDM5Yjc1MWZiZjgxOTUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJuYmYiOjE2ODMyODMzNzksImF1ZCI6Ijk2NjM4MTYxNDM5MS1jYm5uazliZWdzOTczdGZqMjE2bm4zOTM4azVqcjN1ci5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsInN1YiI6IjExNTc3MDg0NzMwMDg4NjYyNjgzNSIsImVtYWlsIjoibWFybXRrMTgxMUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXpwIjoiOTY2MzgxNjE0MzkxLWNibm5rOWJlZ3M5NzN0ZmoyMTZubjM5MzhrNWpyM3VyLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwibmFtZSI6Ik1hcnRpbiBUaG9tYXMiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUdObXl4YThiRDYxY2U0X09adWx2SGVHMVFqVDBZRkNIanlqUm5CRkpkaXExZz1zOTYtYyIsImdpdmVuX25hbWUiOiJNYXJ0aW4iLCJmYW1pbHlfbmFtZSI6IlRob21hcyIsImlhdCI6MTY4MzI4MzY3OSwiZXhwIjoxNjgzMjg3Mjc5LCJqdGkiOiI2YTlkYjBlMDA0OWViMWZkYTJkYTdhNWU5MzY0MGE3NWIyYjUwOTE0In0.LEkN4Fk037WwkJPMGjRNHXDbIvO38BlIDq8gzxrXUOeP0qdOIXKJ2WGzm4YtoNc7remoELc1s3BpXfgDtWt4qzGH9yw5lnO7wlnoujGuXz8Tq9O6bkTCyDcw4r25nZJ6ghX1xCGiSPNleokOGn-p-2q9H_0aJApDlrYIr6mWGfm6UDxt6xlF6Xo4IBKkxvun4Kl_KT8tzVP-FKageeHC2KhY0g0Mq0zAeH0WnNdtyAi8FpiK8pd2WrdKpGwr_thTF9S3RccMSkg7R2Gv53AkRPPW15dfDLqMz48RGuSdlw-cb7Fmn-9WywyGuwfbOrMHUfC7LGYoeByYifsEmOukPQ"
			console.log(response)

			s3Login(parseJwt(credentials), response)

		} catch (err) {
			console.warn(err)
		}

	}
	//S	handleCredentials()
	async function s3Login(parsedLoginInfo, jwt) {




		try {
			if (parsedLoginInfo) {
				background(0, 0, 0, 200)

				background(0, 0, 0, 200)
				logingin = true;
				/*
				await cognitoidentity.getId({
					IdentityPoolId: 'us-east-1:6f08b6e9-cb5a-4ac5-a418-096b814b92c9'
				}, async function (err, data) {
					if (err) console.log(err, err.stack); // an error occurred
					console.log(data)
					cognitoID = data.IdentityId; // successful response

					/*
										AWS.config.credentials = new AWS.CognitoIdentityCredentials({
											IdentityId: cognitoID,
											IdentityPoolId: 'us-east-1:6f08b6e9-cb5a-4ac5-a418-096b814b92c9',
											LoginId: parsedLoginInfo.email,

										});
										s3 = new AWS.S3({
											apiVersion: '2006-03-01',
											params: {
												Bucket: "vandsbucket"

											}
										});
					


					print(AWS.config.credentials)
				});

					*/
				await s3.getObject({
					Key: parsedLoginInfo.email + "/data.txt"
				}, handleReceived);

				function handleReceived(err) {
					//err = { code : "NoSuchKey" }
					if (err) {
						if (err.code === "NoSuchKey") {
							print("first time")
							userInfo = {
								email: parsedLoginInfo.email,
								firstLoginTime: parsedLoginInfo.iat,
								playerInfo: playerInfo,
								buildingInfo: buildingInfo,
								activeTimers: activeTimers


							}

							s3.putObject({
								Key: parsedLoginInfo.email + "/data.txt",
								Body: JSON.stringify(userInfo)
							}, function (err, data) {
								if (err) {
									console.log(err)
								}

								logindiv.hide()
								loop();
								playMenu()
								logingin = false;
							})


						} else {
							console.log(err)
						}



					} else {
						print("not first login")
						var href = this.request.httpRequest.endpoint.href;

						bucketUrl = href + "vandsbucket" + "/" + parsedLoginInfo.email + "/data" + ".txt"
						let value = httpGet(bucketUrl, "text")


						value.then((successMessage) => {
							playerSave = JSON.parse(successMessage)
							console.log(JSON.parse(successMessage), bucketUrl);
							userInfo = JSON.parse(successMessage)
							logindiv.hide()
							loop();
							playMenu()
							logingin = false;
						})
					}
				}


			}

		} catch (e) {
			print(e)
		}




		return;

	}
	google.accounts.id.initialize({
		client_id: '966381614391-cbnnk9begs973tfj216nn3938k5jr3ur.apps.googleusercontent.com',
		callback: handleCredentials,
		auto_select: true
	});


	google.accounts.id.renderButton(
		document.getElementById("logindiv"), {
			theme: "outline",
			size: "large",
			width: windowWidth,
			click_listener: handleCredentials
		} // customization attributes
	);







	






	buildingButtonsText = ["error"]; //If buttons aren't updated, this will appear



	var cnv = createCanvas(windowWidth, windowHeight); //Create Canvas


	cnv.parent('game-holder'); //Moves canvas to the HTML div "game-holder"



	createButton1 = new Clickable(); //Button to spread out sectors
	createButton1.locate(100000, 10000); //Initializes it's location to out of the screen so you can't see at start
	for (buttonPrecreator = 0; buttonPrecreator < buildingInfo.length; buttonPrecreator++) {
		//precreate the sector buttons and set it to out of the screen
		creationButtons[buttonPrecreator] = new Clickable();
		creationButtons[buttonPrecreator].locate(100000, 10000);

	}
	for (buildingPrecreator = 0; buildingPrecreator < buildingButtonsText.length; buildingPrecreator++) {
		//precreate the building buttons and set it to out of the screen
		buildingButtons[buildingPrecreator] = new Clickable();
		buildingButtons[buildingPrecreator].locate(100000, 100000);


	}


	playMenu(); //display the main menu

	//if(getItem("buildingInfo")){buildingInfo = getItem("buildingInfo");print("saved");} //get the saved values

	print(buildingInfo);

	checkTimeout = setInterval(timeout, 1000)
	postData = setInterval(postDataHandler, 7000);
	resourceUpdateTimer = setInterval(playerInfo.updateResources, 1000)



}

function postDataHandler() {

	if (playerSave) {
		userInfo = {

			email: userInfo.email,
			firstLoginTime: userInfo.firstLoginTime,
			playerInfo: playerInfo,
			buildingInfo: buildingInfo,
			activeTimers: activeTimers,
			rand: random(1, 1000000000)



		}

		console.log("saving...")
		s3.putObject({
			Key: userInfo.email + "/data.txt",
			Body: JSON.stringify(userInfo)
		}, function (err, data) {
			console.log("saved", data, userInfo.rand)
			if (err) {
				console.log(err)
			}


		})




	}

}

function draw() {
	//dscroll(0, 0)

	if (buildingInfo !== getItem("buildingInfo")) {
		//	playerInfo.updateResources();


	}

	//	storeItem("buildingInfo", buildingInfo);


	playButton.draw();
	createButton1.draw();

	for (buttondrawer = 0; buttondrawer < buildingInfo.length; buttondrawer++) {
		creationButtons[buttondrawer].draw();
	}

	for (buildingDrawer = 0; buildingDrawer < buildingButtonsText.length; buildingDrawer++) {
		buildingButtons[buildingDrawer].draw();
	}


	if (mouseY < windowHeight / 1.22 - windowWidth / 15 && gaming == true) {
		for (buttonHider = 0; buttonHider < buildingInfo.length; buttonHider++) {
			creationButtons[buttonHider].hide();
		}
		for (buildingHider = 0; buildingHider < buildingButtonsText.length; buildingHider++) {
			buildingButtons[buildingHider].hide();
		}



	}

	//buildingInfo[0][0].timer.updateTimer()
	//let buildingEditor = new buildings();
	//buildingEditor.add(1,0,0);
	for (let i = 0; i < activeTimers.length; i++) {
		activeTimers[i].timerUpdate(i);
		//print(activeTimers[i]);
	}


}

function timeout() {

	if (!lastEvent) {
		lastEvent = Date.now();
		lastxy = mouseX + mouseY;
	}
	if (mouseIsPressed || lastxy != mouseX + mouseY || keyIsPressed) {
		lastEvent = Date.now()
	}
	if ((Date.now() - lastEvent) / 1000 > 27) {
		if (postData) {
			postDataHandler();
			console.log("game timed out...");
		}


		clearInterval(postData);
		postData = null;
		clearInterval(resourceUpdateTimer)
		resourceUpdateTimer = null;
		noLoop()
	} else if (!postData) {
		console.log("game resumed...")
		postDataHandler()
		postData = setInterval(postDataHandler, 7000);
		resourceUpdateTimer = setInterval(playerInfo.updateResources, 1000)
	}

	lastxy = mouseX + mouseY;


}

function createMenu() {
	for (buttonCreator = 0; buttonCreator < buildingInfo.length; buttonCreator++) {
		creationButtons[buttonCreator].locate(windowWidth / 15 * (buttonCreator + 1), windowHeight / 1.22);
		creationButtons[buttonCreator].resize(windowWidth / 15, windowWidth / 15);
		//creationButtons[buttonCreator].text = creationButtonsText[buttonCreator];
		creationButtons[buttonCreator].textScaled = true;
		creationButtons[buttonCreator].text = "";
		creationButtons[buttonCreator].image = sectorImages[buttonCreator];

	}
}

function createMenuMenu(sector) {
	//buildingInfo[0][0].timestart();

	//let buildingMenuName = creationButtonsText[sector];
	//print(buildingMenuName);


	if (sector !== sector1) {
		buildingButtonsText = [];
		//for(let ii = 0; ii < buildingButtonsText.length; ii++){
		//buildingButtonsText[ii] = undefined;
		// print(buildingButtonsText+" blahblahblah");
		// }

		for (let i = 0; i < buildingInfo[sector].length; i++) {


			buildingButtonsText[i] = buildingInfo[sector][i].name;


			// print(buildingButtonsText);

			updateBuildings();
		}









	}






	for (buildingCreator = 0; buildingCreator < buildingButtonsText.length; buildingCreator++) {

		buildingButtons[buildingCreator].locate(windowWidth / 15 * (buildingCreator + 1), windowHeight / 1.22 - windowWidth / 15);
		buildingButtons[buildingCreator].resize(windowWidth / 15, windowWidth / 15);
		buildingButtons[buildingCreator].text = buildingButtonsText[buildingCreator];
		buildingButtons[buildingCreator].textScaled = true;
		//print (buildingButtonsText+",");

	}
	sector1 = sector;
}

function updateBuildings() {

	for (buildingCreator = 0; buildingButtons[buildingCreator] !== undefined; buildingCreator++) {
		buildingButtons[buildingCreator].hide();
		//buildingButtons[1] = undefined;

	}





	for (buildingPrecreator = 0; buildingPrecreator < buildingButtonsText.length; buildingPrecreator++) {
		buildingButtons[buildingPrecreator] = new Clickable();
		//buildingButtons[buildingPrecreator].locate(100000,100000);
		//if(buildingButtonsText[buildingPrecreator] == null){buildingButtons[buildingPrecreator].hide();}

	}





}