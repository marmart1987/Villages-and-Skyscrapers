function windowResized() {

	// let fs = fullscreen();
	if (gaming == true) {
		//fullscreen(1);
		createButton1.hide();
		resizeCanvas(windowWidth, windowHeight);
		clear();
		game();

		// hideConfirmButton.hide();
	} else {
		google.accounts.id.renderButton(
			document.getElementById("logindiv"), {
				theme: "outline",
				size: "large",
				width: windowWidth / 5,
				click_listener: handleCredentials
			} // Render sign in button with Google.
		);
		logindiv.position(windowWidth / 2 - windowWidth / 10.66, windowHeight / 2)

		resizeCanvas(windowWidth, windowHeight);
		playMenu();




	}
}