import '../scss/style.scss'
 
 const btnGetLocation = document.getElementById("geoloc");
 const geolocURI = "https://www.openstreetmap.org/";

 function letsChat(){
   const input = document.getElementById("input");
   const sendBtn = document.getElementById("sendBtn");
   const chatOutput = document.getElementById("chatOutput");
   const wbsURI = "wss://echo-ws-service.herokuapp.com";
   const websocket = new WebSocket(wbsURI);
   websocket.onopen = (event)=>{
     console.log("Connected");
   }; 
   websocket.onmessage = (event)=>{
     writeToChat(event.data, true);
   };
   websocket.onerror = (error)=>{
     alert("Houston we have a problem with connection!");
     console.log("Error:", error);
   };
  
   function writeToChat(message, isRecieved){
     let messageHTML=`
     	<div class="${isRecieved?"recievedMessage":"sentMessage"}">${message}</div>`;
     chatOutput.innerHTML += messageHTML;  
   } 

   function sendMessage(){
     if(!input.value){
			alert("Please enter a message");
			return;
		 };
     websocket.send(input.value);
     writeToChat(input.value, false);
     input.value = "";
   }

   function getLocation() {
     if ("geolocation" in navigator) {
       navigator.geolocation.getCurrentPosition(locationSuccess, locationError);
     } else {
       alert("Your browser doesn't support geolocation");
     }
   }

   function locationSuccess(data) {
     let link = `
     	${geolocURI}#map=18/${data.coords.latitude}/${data.coords.longitude}`;
     writeOutput(`<a href="${link}" target="_blank">Your geolocation</a>`);
   }

   function locationError() {
     alert("Houston we have a problem! It's connection's error");
   }

   function writeOutput(message) {
     chatOutput.innerHTML += `
     	<div id="coords" class="recievedMessage">${message}</div>`;
   }

   sendBtn.addEventListener("click", sendMessage)
   btnGetLocation.addEventListener("click", getLocation)
 }
 
 document.addEventListener("DOMContentLoaded", letsChat);




