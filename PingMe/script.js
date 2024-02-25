function sendPing() {
    const request = new XMLHttpRequest();
    request.open("POST", "https://discord.com/api/webhooks/1211328285837893662/nCL7b-_gcJwbIfze0Pd-Z7NAo8AHZuKhswyrXtgGohX91kWNYPEyoMZAnO0BCNNehBEl");
    request.setRequestHeader('Content-type', 'application/json');
    const text = document.getElementById("text").value;
    const params = {
        content: `<@324519572806041600> you have been pinged!${text? " message: "+text : ""}`
    }

    request.send(JSON.stringify(params));
    const notif = document.createElement("div");
    const notif_holder = document.querySelector(".notifications");
    notif.style.color = "green";
    notif.append("@Sheref_ has been pinged!");
    notif_holder.appendChild(notif);
    setTimeout(()=>{notif.remove()}, 5000)
}