function windowResized() {
	
	 // let fs = fullscreen();
      if(gaming == true){
	  //fullscreen(1);
	  createButton1.hide();
	  resizeCanvas(windowWidth, windowHeight);
	  game();
	  clear();
	  // hideConfirmButton.hide();
	  }else{
		resizeCanvas(windowWidth, windowHeight);
		playMenu();
		


	  }
	  }