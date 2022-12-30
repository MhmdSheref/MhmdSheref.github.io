addEventListener("resize", function(){
    this.document.documentElement.style.setProperty("--vh", this.outerHeight/100)
})