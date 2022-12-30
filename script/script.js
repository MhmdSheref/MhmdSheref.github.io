addEventListener("resize", function(){
    document.documentElement.style.setProperty("--vh", outerHeight/100)
    console.log(outerHeight)
})