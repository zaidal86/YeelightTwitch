var W3CWebSocket = require('websocket').w3cwebsocket;
const { ip,port,token} = require('./Config.json');
const { couleur, hasNumber, RGB} = require('./RGBString.js');
const { Yeelight } = require('yeelight-node');

var client = new W3CWebSocket('wss://pubsub-edge.twitch.tv');

client.onerror = function() {
    console.log('Connection Error');
};

client.onopen = function() {
    console.log('WebSocket Client Connected');
    client.send(JSON.stringify({ "type": "LISTEN","data":{"topics":["channel-points-channel-v1.169292139"],"auth_token": token}}));
};

client.onclose = function() {
    console.log('echo-protocol Client Closed');
};

client.onmessage = function(e) {
    if (typeof e.data === 'string') {
        var data = JSON.parse(e.data);
        const type = data;
        if(type.type === "MESSAGE"){
            if(type.data.topic === "channel-points-channel-v1.169292139"){
                var NameOfReward = JSON.parse(type.data.message);
                if(NameOfReward.data.redemption.reward.title === "change la couleur de ma lampe"){
                    console.log(NameOfReward.data.redemption.user.display_name + " vient d'utiliser ces points de chaine pour: " + NameOfReward.data.redemption.reward.title);
                    console.log("La lampe passe a la couleur: " + NameOfReward.data.redemption.user_input);

                    const yeelight = new Yeelight({ ip: ip, port: port});

                    if(hasNumber(NameOfReward.data.redemption.user_input)){
                        console.log("has number");
                        yeelight.set_rgb(RGB(NameOfReward.data.redemption.user_input));
                      }else{
                        console.log("No number");
                        if(NameOfReward.data.redemption.user_inputsage !== "e") yeelight.set_rgb(couleur(NameOfReward.data.redemption.user_input));
                      }

                }
            };
        };
    }
};