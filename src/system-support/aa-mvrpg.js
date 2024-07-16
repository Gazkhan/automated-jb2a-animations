import { trafficCop }       from "../router/traffic-cop.js"
import AAHandler            from "../system-handlers/workflow-data.js";
import { getRequiredData }  from "./getRequiredData.js";

export function systemHooks() {
    Hooks.on("createChatMessage", async (msg) => {
        if (msg.user.id !== game.user.id) { return };
        // console.log("MESSAGE DATA", msg)
        console.log("MESSAGE DATA:", msg)
        let itemName;
        let item;
        if(msg.rolls.length){
            item = msg.rolls[0].item;
            itemName = msg.rolls[0].item.name;
        }
        const actorId = msg.speaker?.actor;
        const tokenId = msg.speaker?.token;
    
   
    let compiledData = await getRequiredData({
        itemName: itemName,
        actorId: actorId,
        tokenId: tokenId,
        workflow: msg,
    })
    console.log("compiledData", compiledData)

  

    if (!compiledData.item) { return; }

        runMvrpg(compiledData)
    });
}

async function runMvrpg(input) {
    const handler = await AAHandler.make(input)
    trafficCop(handler);
}