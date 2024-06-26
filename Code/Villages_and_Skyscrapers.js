var playButton;
var gaming;
var cbonfirming;
var createButton1;
var hideConfirmButton;
var creationButtons = [];
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
var IPAddress
var logindiv
var confirming




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

function getIP(ip) {
	IPAddress = ip.ip;
	console.debug(IPAddress)
}
//Preload images and other stuff
function setup() {
	console.log(JSON.stringify(buildingInfo))






	function generateId(len) {
		var arr = new Uint8Array((len || 40) / 2)
		window.crypto.getRandomValues(arr)
		return Array.from(arr, function (dec) {
			return dec.toString(16).padStart(2, "0")
		}).join('')
	}



	initializeBuildings(); //Initializes some building values
	playerInfo.initializeProduction(); // Initializes resource generation


	logindiv = createDiv(); // Div for Google sign-in
	logindiv.position((windowWidth / 2) - windowWidth / 10.66, windowHeight / 2)
	logindiv.id("logindiv");

	/*
		AWS.config.region = 'us-east-1';
		AWS.config.credentials = new AWS.CognitoIdentityCredentials({

			IdentityPoolId: 'us-east-1:6f08b6e9-cb5a-4ac5-a418-096b814b92c9',
		}); //Get AWS Credentials

		s3 = new AWS.S3({
			apiVersion: '2006-03-01',
			params: {
				Bucket: "vandsbucket"

			}
		}); //Get AWS S3 setup
		*/

	/*

	if (getItem("Identifier") && getItem("Email") && getItem("Password")) {
		console.log("Logging in Autonomously");

		async function autoLogin(err) {
			if (err) {
				return;
			} else {
				try {
					var href = this.request.httpRequest.endpoint.href;
					console.log(href, this)

					bucketUrl = href + "vandsbucket" + "/" + getItem("Email") + "/data" + ".txt"
					let value = httpGet(bucketUrl, "text")
					value.then((successMessage) => {
						info = JSON.parse(successMessage)


						if (info.identifier == getItem("Identifier") && info.password == getItem("Password")) {

							retrieveData(value)
							console.log("Logged in");


						} else {

							console.debug("imposta!", info)

						}
					})
				} catch (err) {
					console.warn(err)
				}
			}
		}
		s3.getObject({
			Key: getItem("Email") + "/data.txt"
		}, autoLogin)


	}
	async function retrieveData(value) {

		value.then((successMessage) => {

			console.debug(JSON.parse(successMessage), bucketUrl);
			userInfo = JSON.parse(successMessage)
			playerInfo = defaultsDeep(userInfo.playerInfo, playerInfo)

			storeItem("Identifier", userInfo.identifier)
			storeItem("Password", userInfo.password)
			storeItem("Email", userInfo.email)

			activeTimers = defaultsDeep(userInfo.activeTimers, activeTimers) || []
			console.debug(activeTimers)
			logindiv.hide()


		})
	}


	async function handleCredentials(response) {
		try {
			console.log(response)

			let credentials = response.credential;

			console.debug(response)

			parsedLoginInfo = parseJwt(credentials)
			console.log(response, parsedLoginInfo)


			try {
				if (parsedLoginInfo) {
					background(0, 0, 0, 200)
					logingin = true;

					await s3.getObject({
						Key: parsedLoginInfo.email + "/data.txt"
					}, login)

					function login(err) {
						if (err) { //New User
							if (err.code === "NoSuchKey") {
								console.debug("first time")
								identifierRecord = generateId(100);
								passwordRecord = generateId(100)
								userInfo = {
									ip: IPAddress,
									identifier: identifierRecord,
									password: passwordRecord,
									email: parsedLoginInfo.email,
									firstLoginTime: parsedLoginInfo.iat,
									playerInfo: playerInfo,

									activeTimers: activeTimers,




								}

								s3.putObject({
									Key: parsedLoginInfo.email + "/data.txt",
									Body: JSON.stringify(userInfo)
								}, function (err, data) {
									if (err) {
										console.debug(err)
									} else {
										console.debug(userInfo)
										storeItem("Identifier", userInfo.identifier)
										storeItem("Password", userInfo.password)
										storeItem("Email", userInfo.email)




									}

									logindiv.hide()
									loop();
									playMenu()
									logingin = false;
								})


							} else {
								console.debug(err)
							}



						} else { //Returning User
							console.debug("not first login", this)
							var href = this.request.httpRequest.endpoint.href;

							bucketUrl = href + "vandsbucket" + "/" + parsedLoginInfo.email + "/data" + ".txt"
							let value = httpGet(bucketUrl, "text")

							retrieveData(value);



							loop()
							playMenu()
							logingin = false;
						}
					};




				}


			} catch (e) {
				console.debug(e)
			}









		} catch (err) {
			console.warn(err)
		}

	}

*/
	async function handleCredentials(response) {
		try {
			console.log(response)

			let credentials = response.credential;

			console.debug(response)

			parsedLoginInfo = parseJwt(credentials)
			console.log(response, parsedLoginInfo)
			



		} catch (err) {
			console.warn(err)
		}
	}

	// Get response from Google. Use response to get user's info.

	google.accounts.id.initialize({
		client_id: '966381614391-cbnnk9begs973tfj216nn3938k5jr3ur.apps.googleusercontent.com',
		callback: handleCredentials,
		auto_select: true
	}); //Initialize Google 


	google.accounts.id.renderButton(
		document.getElementById("logindiv"), {
			theme: "outline",
			size: "large",
			width: windowWidth / 5,
			click_listener: handleCredentials
		} // Render sign in button with Google.
	);

	buildingButtonsText = ["error"]; //If there an error, this will appear



	var cnv = createCanvas(windowWidth, windowHeight); // Canvas


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

	//Checks every second if it should freeze the game.
	checkTimeout = setInterval(timeout, 1000)
	//Save user's data to cloud
	postData = setInterval(postDataHandler, 7000);
	//Update the player's resources every second
	resourceUpdateTimer = setInterval(playerInfo.updateResources, 1000)



}
//Runs on program start

function postDataHandler() {

	if (userInfo) {
		userInfo = {
			ip: IPAddress,
			password: userInfo.password,
			identifier: userInfo.identifier,
			email: userInfo.email,
			firstLoginTime: userInfo.firstLoginTime,
			playerInfo: playerInfo,

			activeTimers: activeTimers,
			rand: random(1, 1000000000)



		}

		console.debug("saving...")
		s3.putObject({
			Key: userInfo.email + "/data.txt",
			Body: JSON.stringify(userInfo)
		}, function (err, data) {
			console.debug("saved", data, userInfo.rand)
			if (err) {
				console.debug(err)
			}


		})




	} else {
		console.debug("not loggedin")
	}

}
//Posts data to cloud

function draw() {
	function drawButtons() {
		playButton.draw();
		if (!confirming) {
			createButton1.draw();
		}

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
	}
	drawButtons()
	//Update buttons


	for (let i = 0; i < activeTimers.length; i++) {
		timerUpdate(i);
	}
	//Update timers for constructing buildings.


}
//Runs every frame

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
			console.debug("game timed out...");
		}


		clearInterval(postData);
		postData = null;
		clearInterval(resourceUpdateTimer)
		resourceUpdateTimer = null;
		noLoop()
	} else if (!postData) {
		console.debug("game resumed...")
		postDataHandler()
		postData = setInterval(postDataHandler, 7000);
		resourceUpdateTimer = setInterval(playerInfo.updateResources, 1000)
		loop()
	}

	lastxy = mouseX + mouseY;


}
//Timeout game after around 30 seconds

function createMenu() {
	for (buttonCreator = 0; buttonCreator < buildingInfo.length; buttonCreator++) {
		console.log(windowHeight / 5 * (buttonCreator + 1) * 1.5 + "," + buttonCreator + "   " + windowWidth);
		if (windowHeight / 4.5 * (buttonCreator + 2) < windowWidth) {
			creationButtons[buttonCreator].locate(windowHeight / 4.5 * (buttonCreator + 1), windowHeight - windowHeight / 3.75); /// 1.22
			creationButtons[buttonCreator].resize(windowHeight / 4.5, windowHeight / 4.5);
			//creationButtons[buttonCreator].text = creationButtonsText[buttonCreator];
			creationButtons[buttonCreator].textScaled = true;
			creationButtons[buttonCreator].text = "";
			creationButtons[buttonCreator].image = sectorImages[buttonCreator];
		}

	}
}
//Create menu for sectors of buildings

function createMenuMenu(sector) {
	if (sector !== sector1) {
		buildingButtonsText = [];

		for (let i = 0; i < buildingInfo[sector].length; i++) {
			buildingButtonsText[i] = buildingInfo[sector][i].name;
			updateBuildings();
		}
	}

	for (buildingCreator = 0; buildingCreator < buildingButtonsText.length; buildingCreator++) {
		try {
			if (buildingButtonsText[buildingCreator] === " ") {
				console.error("Invalid Name for building " + sector + "," + buildingCreator + ".")
			}
			buildingButtons[buildingCreator].locate(windowWidth / 15 * (buildingCreator + 1), windowHeight / 1.22 - windowWidth / 15);
			buildingButtons[buildingCreator].resize(windowWidth / 15, windowWidth / 15);
			buildingButtons[buildingCreator].text = buildingButtonsText[buildingCreator];
			buildingButtons[buildingCreator].textSize = windowWidth / (buildingButtonsText[buildingCreator].length * 9)

		} catch (err) {
			console.error(err)
		}
	}
	sector1 = sector;
}

//Creates menu for buildings inside chosen sector.
function updateBuildings() {

	for (buildingCreator = 0; buildingButtons[buildingCreator] !== undefined; buildingCreator++) {
		buildingButtons[buildingCreator].hide();

	}

	for (buildingPrecreator = 0; buildingPrecreator < buildingButtonsText.length; buildingPrecreator++) {
		buildingButtons[buildingPrecreator] = new Clickable();

	}
}

//Updates menu

function mousePressed() {
	if (confirming) {
		hideConfirm()
	}


}
//Runs on mouse press.