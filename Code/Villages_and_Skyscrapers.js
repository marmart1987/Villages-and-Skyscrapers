var TSeconds;
var TMinutes;
var THours;
var savedTimeS;
var savedTimeM;
var savedTimeH;

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


var buildingCreator;
var buildingPrecreator;
var buildingHider;
var buildingDrawer;
var buildingButtons = [];
var buildingButtonsText = [];
var sectorImages = [];

var sector1;
var update1;
var buildingInfo = [];
var playerInfo;
var activeTimers = [];



var startTime;
var resourceUpdateTime = 0;
var pastProductionInfo = {};
var playerSave;
var logingin = false;






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
	
	AWS.config.region = 'us-east-1'; // Region
	AWS.config.credentials = new AWS.CognitoIdentityCredentials({
		IdentityPoolId: 'us-east-1:6f08b6e9-cb5a-4ac5-a418-096b814b92c9',
		Logins: {
			
			//'accounts.google.com': 'GOOGLETOKEN'
		}
	});
	var s3 = new AWS.S3({
		apiVersion: '2006-03-01',
		params: {
			Bucket: "vandsbucket"
		}
	});
	
	
	handleCredentials = function (response) {
		try {
			
			let credentials = response.credential;
			// jwt = "eyJhbGciOiJSUzI1NiIsImtpZCI6ImM5YWZkYTM2ODJlYmYwOWViMzA1NWMxYzRiZDM5Yjc1MWZiZjgxOTUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJuYmYiOjE2ODMyODMzNzksImF1ZCI6Ijk2NjM4MTYxNDM5MS1jYm5uazliZWdzOTczdGZqMjE2bm4zOTM4azVqcjN1ci5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsInN1YiI6IjExNTc3MDg0NzMwMDg4NjYyNjgzNSIsImVtYWlsIjoibWFybXRrMTgxMUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXpwIjoiOTY2MzgxNjE0MzkxLWNibm5rOWJlZ3M5NzN0ZmoyMTZubjM5MzhrNWpyM3VyLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwibmFtZSI6Ik1hcnRpbiBUaG9tYXMiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUdObXl4YThiRDYxY2U0X09adWx2SGVHMVFqVDBZRkNIanlqUm5CRkpkaXExZz1zOTYtYyIsImdpdmVuX25hbWUiOiJNYXJ0aW4iLCJmYW1pbHlfbmFtZSI6IlRob21hcyIsImlhdCI6MTY4MzI4MzY3OSwiZXhwIjoxNjgzMjg3Mjc5LCJqdGkiOiI2YTlkYjBlMDA0OWViMWZkYTJkYTdhNWU5MzY0MGE3NWIyYjUwOTE0In0.LEkN4Fk037WwkJPMGjRNHXDbIvO38BlIDq8gzxrXUOeP0qdOIXKJ2WGzm4YtoNc7remoELc1s3BpXfgDtWt4qzGH9yw5lnO7wlnoujGuXz8Tq9O6bkTCyDcw4r25nZJ6ghX1xCGiSPNleokOGn-p-2q9H_0aJApDlrYIr6mWGfm6UDxt6xlF6Xo4IBKkxvun4Kl_KT8tzVP-FKageeHC2KhY0g0Mq0zAeH0WnNdtyAi8FpiK8pd2WrdKpGwr_thTF9S3RccMSkg7R2Gv53AkRPPW15dfDLqMz48RGuSdlw-cb7Fmn-9WywyGuwfbOrMHUfC7LGYoeByYifsEmOukPQ"
			
			s3Login(parseJwt(credentials))
			
		} catch (err) {
			console.warn(err)
		}
		
	}
	
	async function s3Login(parsedLoginInfo) {
		
		
		
		
		try {
			if (parsedLoginInfo) {
				background(0, 0, 0, 200)
				noLoop(); 
				background(0, 0, 0, 200)
				logingin = true;
				await s3.getObject({
					Key: parsedLoginInfo.email + "/startingJWT" + ".txt"
				}, handleReceived);
				
				function handleReceived(err) {
					if (err) {
						if (err.code === "NoSuchKey") {
							print("firsttimer")
							s3.putObject({
								Key: parsedLoginInfo.email + "/startingJWT.txt",
								Body: JSON.stringify(parsedLoginInfo)
							}, function (err, data) {
								console.log(err)
							})
							
							
						} else {
							console.log(err)
						}
						
						
						
					} else {
						print("notfirst")
						var href = this.request.httpRequest.endpoint.href;
						
						bucketUrl = href + "vandsbucket" + "/" + parsedLoginInfo.email + "/startingJWT" + ".txt"
						let value = httpGet(bucketUrl, "text")
						
						
						value.then((successMessage) => {
							playerSave = successMessage
							console.log(JSON.parse(successMessage), bucketUrl);
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
		document.getElementById("game-holder"), {
			theme: "outline",
			size: "large",
			width: windowWidth,
			click_listener: handleCredentials
		} // customization attributes
		);
		
		
		
		clearStorage();
		info(); //Defaults player values
		
		
		
		initializeBuildings(); //Initializes some building values
		playerInfo.initializeProduction();
		
		
		
		
		
		
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
		
		
		clearStorage();
	}
	
	
	function draw() {
		scroll(0, 0)
		if (buildingInfo !== getItem("buildingInfo")) {
			//	playerInfo.updateResources();
			
			
		}
		
		storeItem("buildingInfo", buildingInfo);
		
		
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
	
	
	function createMenu() {
		for (buttonCreator = 0; buttonCreator < buildingInfo.length; buttonCreator++) {
			creationButtons[buttonCreator].locate(windowWidth / 15 * (buttonCreator + 1), windowHeight / 1.22);
			creationButtons[buttonCreator].resize(windowWidth / 15, windowWidth / 15);
			//creationButtons[buttonCreator].text = creationButtonsText[buttonCreator];
			// creationButtons[buttonCreator].textScaled = true;
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