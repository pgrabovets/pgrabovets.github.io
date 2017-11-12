window.addEventListener("load", function() {
	var navExpander = document.getElementById("nav-expander");
	var menu = document.getElementById("menu");
	var closeMenu = document.getElementById("close-menu");

	menu.toggleClass = function (className) {
		if (this.state == undefined | this.state == false) {
			this.classList.add(className);
			this.state = true;
		} else {
			this.classList.remove(className);
			this.state = false;
		}
		
	}

	navExpander.addEventListener("click", function(e) {
		e.preventDefault();
		menu.toggleClass("nav-expanded");
	});

	closeMenu.addEventListener("click", function(e) {
		e.preventDefault();
		menu.toggleClass("nav-expanded");
	});

	homeFullScreen();
});

window.addEventListener("resize", function() {
	homeFullScreen();
});

function homeFullScreen() {
	var homeSection = document.getElementById("home");
	var windowHeight = window.innerHeight;
	home.style.height =  windowHeight+"px";
}

