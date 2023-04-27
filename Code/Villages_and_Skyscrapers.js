var TSeconds;
var TMinutes;
var THours;
var savedTimeS;
var savedTimeM;
var savedTimeH;

var playButton;




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


var tstob = {
a : 0,
b : {
	l:function(no){print(no)}
	
    }


}
var tstob2 = {
	a : 1,
    b : {
	 c:900
	
    },
	f: function(){
      print("no")

	}





}



function preload() {
  Background = loadImage("Assets/Background.png");
  stone = loadImage("Assets/stone.png");
  create = loadImage("Assets/Create.png");
  //close = loadImage("Assets/close.png");


  for(let images = 0;images < 2;images++){

	sectorImages[images] = loadImage("Assets/Sector"+1+".png");
	
	//buildingButtons[1] = undefined;

    }
 


}
function setup() { //Runs on program start

	let pfkb = defaultsDeep(tstob2,tstob)
	
	clearStorage();
	info();        //Defaults player values
	
	
	
	initializeBuildings(); //Initializes some building values
	playerInfo.initializeProduction();
	
	
	
	
	
 
 buildingButtonsText = ["error"]; //If buttons aren't updated, this will appear



var cnv = createCanvas(windowWidth, windowHeight); //Create Canvas
	
	 
cnv.parent('game-holder');  //Moves canvas to the HTML div "game-holder"



createButton1 = new Clickable(); //Button to spread out sectors
createButton1.locate(100000,10000);  //Initializes it's location to out of the screen so you can't see at start
for(buttonPrecreator = 0; buttonPrecreator < buildingInfo.length;buttonPrecreator++){
//precreate the sector buttons and set it to out of the screen
creationButtons[buttonPrecreator] = new Clickable();
creationButtons[buttonPrecreator].locate(100000,10000);

}
for(buildingPrecreator = 0; buildingPrecreator<buildingButtonsText.length;buildingPrecreator++){
	//precreate the building buttons and set it to out of the screen
	 buildingButtons[buildingPrecreator] = new Clickable();
	 buildingButtons[buildingPrecreator].locate(100000,100000);
	
	
	}

 
	playMenu(); //display the main menu
  
	//if(getItem("buildingInfo")){buildingInfo = getItem("buildingInfo");print("saved");} //get the saved values

	print(buildingInfo);

	
clearStorage();
}


function draw() {
playerInfo.updateResources();


	playButton.draw(); 
	createButton1.draw();
	
	for(buttondrawer = 0; buttondrawer<buildingInfo.length; buttondrawer++){
	creationButtons[buttondrawer].draw();
    }
	
	for(buildingDrawer = 0; buildingDrawer<buildingButtonsText.length; buildingDrawer++){
		buildingButtons[buildingDrawer].draw();
	}
	
	
	if(mouseY<windowHeight/1.22-windowWidth/15 &&gaming == true ){
		for(buttonHider = 0; buttonHider<buildingInfo.length; buttonHider++){
			creationButtons[buttonHider].hide();
			}
			for(buildingHider = 0; buildingHider<buildingButtonsText.length; buildingHider++){
				buildingButtons[buildingHider].hide();
				}
		
	
	
	}
	
	//buildingInfo[0][0].timer.updateTimer()
	//let buildingEditor = new buildings();
	//buildingEditor.add(1,0,0);
	for(let i = 0; i<activeTimers.length; i++){
		activeTimers[i].timerUpdate(i);
	//print(activeTimers[i]);
	}
	
	storeItem("buildingInfo",buildingInfo);

}


function createMenu(){
  for(buttonCreator = 0;buttonCreator<buildingInfo.length;buttonCreator++){
   creationButtons[buttonCreator].locate(windowWidth/15*(buttonCreator+1),windowHeight/1.22);
   creationButtons[buttonCreator].resize(windowWidth/15,windowWidth/15);
   //creationButtons[buttonCreator].text = creationButtonsText[buttonCreator];
  // creationButtons[buttonCreator].textScaled = true;
   creationButtons[buttonCreator].text = "";
   creationButtons[buttonCreator].image = sectorImages[buttonCreator];

    }
}


function createMenuMenu(sector){
	//buildingInfo[0][0].timestart();
	
	//let buildingMenuName = creationButtonsText[sector];
	//print(buildingMenuName);
	

	if(sector !== sector1){
		buildingButtonsText = [];
		//for(let ii = 0; ii < buildingButtonsText.length; ii++){
		//buildingButtonsText[ii] = undefined;
				// print(buildingButtonsText+" blahblahblah");
		// }

		for(let i = 0; i < buildingInfo[sector].length; i++){
			
         
			               buildingButtonsText[i] = buildingInfo[sector][i].name;
						   
						   
						  // print(buildingButtonsText);
						   
						  updateBuildings();		 
		  }
		  
		 


           
		  


		   
		}
	
		
	/*
	if(sector == 0){ buildingButtonsText = [buildingInfo[0][0].name];updateBuildings();}
	else if(sector == 1){ buildingButtonsText = ["Scho","example",9];updateBuildings();}
	else if(sector == 2){ buildingButtonsText = ["Schdgvd","example",9];updateBuildings();}
	else if(sector == 3){ buildingButtonsText = ["Schogdfge","example",9];updateBuildings();}
	else if(sector == 4){ buildingButtonsText = ["Schgfgo","example",9];updateBuildings();}
	else if(sector == 5){ buildingButtonsText = ["Schdfdo","example",9];updateBuildings();}
	else if(sector == 6){ buildingButtonsText = ["Hi"];updateBuildings();}
	else {buildingButtonsText = ["error"];updateBuildings();}
	*/
	
	

	for(buildingCreator = 0;buildingCreator<buildingButtonsText.length;buildingCreator++){
		
		buildingButtons[buildingCreator].locate(windowWidth/15*(buildingCreator+1),windowHeight/1.22-windowWidth/15);
		buildingButtons[buildingCreator].resize(windowWidth/15,windowWidth/15);
		buildingButtons[buildingCreator].text = buildingButtonsText[buildingCreator];
		buildingButtons[buildingCreator].textScaled = true;
		//print (buildingButtonsText+",");
		
	}
	sector1 = sector;
}



    

function updateBuildings(){
	
	for(buildingCreator = 0; buildingButtons[buildingCreator] !== undefined;buildingCreator++){
	buildingButtons[buildingCreator].hide();
	//buildingButtons[1] = undefined;

    }
	
	
	
	

	for(buildingPrecreator = 0; buildingPrecreator<buildingButtonsText.length;buildingPrecreator++){
		buildingButtons[buildingPrecreator] = new Clickable();
		//buildingButtons[buildingPrecreator].locate(100000,100000);
		//if(buildingButtonsText[buildingPrecreator] == null){buildingButtons[buildingPrecreator].hide();}
		
	}
	




}
function mousePressed(){
	if(confirming == true){
hideConfirm();
	}



}

  