function playMenu() {
	image(Background, 0, 0, windowWidth, windowHeight)
	playButton = new Clickable();
	playButton.textScaled = true;
	playButton.strokeWeight = 10;
	playButton.stroke = "#00ff00"
	playButton.imageScale = 0.96; // useful if your image has some extra transparent padding
	playButton.textColor = "#ff9900";
	playButton.locate(windowWidth / 2.5, windowHeight / 3);
	playButton.resize(windowWidth / 5, windowHeight / 7);

	playButton.onPress = function () {
		if (playerSave) {
			playButton.locate(100000000000000, 1000000000000000);
			playButton.resize(0, 0);

			clear();
			game();

		} else if (logingin == false) {

			window.alert("Please login before playing. \n Progress made without logging in will not be saved")
		}
		if (logingin == true) {
			window.alert("Waiting for login information to arrive.")
		}
	}

	playButton.text = "Play";
	playButton.image = stone;

}