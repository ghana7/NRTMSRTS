var pubnub = new PubNub({ //initiates pubnub shit
    subscribeKey: "sub-c-1f95c9dc-b0a5-11e8-b277-3a1ccc7672cd",
    publishKey: "pub-c-d507761c-19d2-440d-836a-601d5963e25a",
    ssl: true
})

var testButton = document.getElementById("testButton");

testButton.addEventListener("click", function() {
		sendMove(2,3,"turret")
	}
);

pubnub.subscribe({ //subscribes to channel, allows script to receive messages
    channels: ['gameChannel'],
});

pubnub.addListener({
	message: function(msg) { //listens for message
        console.log(msg.message.x); //prints x part of message
        console.log(msg.message.y);
		console.log(msg.message.action);
		alert("message received");
    },
})

function sendMove(inputX, inputY, inputAction) { //sends a move to the channel
	console.log("sent");
	var publishConfig = {
		channel:"gameChannel",
		message: { 
			x: inputX,
			y: inputY,
			action: inputAction,
		}
	}
	pubnub.publish(publishConfig, function(status, response) {
		console.log(status, response);
	})
}