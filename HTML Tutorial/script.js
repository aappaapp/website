function navbar() {
	$('body').append('<div class=\'navbar\'></div>');
	$('.navbar').append('<a class=\'nav-title h2\' href=\'index.html\'>Aden\'s Web Tutorial</a>').append('<a class=\'nav-item\'>HTML Tricks</a>').append('<a class=\'nav-item\'>CSS Tricks</a>').append('<a class=\'nav-item\' href=\'gdexample.html\'>Good Example</a>');
}
$(document).ready(function () {
	navbar();
});
