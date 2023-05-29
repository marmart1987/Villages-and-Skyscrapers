function game() {
	gaming = true;




	text(buildingInfo, windowWidth / 2, windowHeight / 2);
	createButton1.locate(1 / 8, windowHeight / 1.22, windowWidth / 20, windowWidth / 20);
	createButton1.text = "";
	createButton1.image = create;
	createButton1.resize(windowWidth / 15, windowWidth / 15);
	createButton1.strokeWeight = 0;
	createButton1.onHover = function () {

		createMenu();

	}
	for (let updatee = 0; updatee < buildingInfo.length; updatee++) {

		creationButtons[updatee].onPress = function () {

			createMenuMenu(updatee, buildingButtonsText[updatee]);
			//if(updatee == buildingInfo.length){updatee = 0;}


			for (let update = 0; update < buildingButtonsText.length; update++) {
				buildingButtons[update].onPress = function () {
					try {
						BuildConfirm(update, updatee);
					}catch(err){console.warn(err)}




				}
			}



		}
	}

	strokeWeight(5);
	line(0, windowHeight / 10, windowWidth, windowHeight / 10);
}