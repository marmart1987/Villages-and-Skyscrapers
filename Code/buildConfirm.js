function BuildConfirm(BuildingNo,sector){
  confirming = true;

    //print(BuildingNo+","+sector);
    strokeWeight(10);
    
    for(buildingHider = 0; buildingHider<buildingInfo.length; buildingHider++){
      creationButtons[buildingHider].hide();
      }
    for(buildingHider = 0; buildingHider<buildingButtonsText.length; buildingHider++){
				buildingButtons[buildingHider].hide();
		  }
     
    background(0,0,0,150)
    stroke(0);
    rect(windowWidth/3, windowHeight/10+5,windowWidth/3,(windowHeight/1.22)-(windowHeight/10+10),30);
    
    stroke(0);
    strokeWeight(1);
    textSize(windowWidth/30);
    textAlign(CENTER);
     
    
    
    text(buildingInfo[sector][BuildingNo].name,windowWidth/2,windowHeight/5);
    textSize(windowWidth/80);
    for(i = 0; i<Object.values(buildingInfo[sector][BuildingNo].resources).length;i++){
      length = Object.values(buildingInfo[sector][BuildingNo].resources).length;
      let pos;
      let pos2;
      let pos3;
      if(length < 3){
          
      pos = windowWidth/2;


      }else if(length < 6){
        pos = windowWidth/2.5;
        pos2 = windowWidth/1.7;



      }else if(length < 9){
        pos = windowWidth/2.5;
        pos2 = windowWidth/1.7;
        pos3 = windowWidth/2;



      }




      if(i < 3){
      text(Object.values(buildingInfo[sector][BuildingNo].resources)[i] + " " + Object.keys(buildingInfo[sector][BuildingNo].resources)[i],pos,(windowHeight/3.25)+((windowHeight/20)*(i+1)));

      } else if(i < 6){
        let j = i-3;
        text(Object.values(buildingInfo[sector][BuildingNo].resources)[i] + " " +  Object.keys(buildingInfo[sector][BuildingNo].resources)[i] ,pos2,(windowHeight/3.25)+((windowHeight/20)*(j+1)));

      } else if (i <10){
        let m = i-6;
        text(Object.values(buildingInfo[sector][BuildingNo].resources)[i] + " " +  Object.keys(buildingInfo[sector][BuildingNo].resources)[i] ,pos3,(windowHeight/3.25)+((windowHeight/20)*(m+1)));



      }


    }


    
    addBuildings(1,sector,BuildingNo);
    strokeWeight(4);
    stroke(0);
    line(windowWidth/3,windowHeight/4,windowWidth/1.5,windowHeight/4);
    strokeWeight(1);
    textSize(30);
    text("Cost:",windowWidth/2,windowHeight/3.25);
    
    
      }
    function hideConfirm(){
      clear();
      hideConfirmButton.locate(100000,100000);
      game();


      }