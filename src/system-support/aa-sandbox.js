import { trafficCop }       from "../router/traffic-cop.js"
import AAHandler            from "../system-handlers/workflow-data.js";
import { getRequiredData }  from "./getRequiredData.js";

export function systemHooks() {
    Hooks.on("createChatMessage", async (msg) => {
        if (msg.user.id !== game.user.id) { return };
        // console.log("MESSAGE DATA", msg)
        const item = msg.flags.item;

    
   
    let compiledData = await getRequiredData({
        item: item,
        workflow: msg,
    })
    console.log("compiledData", compiledData)

  

    if (!compiledData.item) { return; }

        runSandbox(compiledData)
    });
}

async function runSandbox(input) {
    const handler = await AAHandler.make(input)
    trafficCop(handler);
}