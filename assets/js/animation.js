var controller = new ScrollMagic.Controller();
new ScrollMagic.Scene({
    duration: 100, 
    offset: 50
})
.setPin("#myStickeyElement")
.addTo(controller)