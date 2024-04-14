import { trafficCop }       from "../router/traffic-cop.js"
import AAHandler            from "../system-handlers/workflow-data.js";
import { getRequiredData }  from "./getRequiredData.js";

export function systemHooks() {
    Hooks.on("createChatMessage", async (msg) => {
        if (msg.user.id !== game.user.id) { return };
        // console.log("MESSAGE DATA", msg)

        const actor = game.actors.get(msg.flags.actorId)
        const [token] = actor.getActiveTokens();
        const itemName = await extractItemName(msg.content); 
        const items = Array.from(actor.collections.items)
        const item = items.find(x => x.name === itemName)
        const ono = item._source._id
              

async function extractItemName (content) {

    const index1 = content.indexOf("<h3>")
    const index2 = content.indexOf("</h3>")
    const index3 = index1 + 4
    const onono = content.slice(index3, index2)  

                    
    return onono
    
    }
    
   
    let compiledData = await getRequiredData({
        itemName: itemName,
        actor: actor,
        token: token,
        workflow: msg,
    })
    console.log("compiledData", compiledData)

  

    if (!compiledData.item) { return; }

        runMYO(compiledData)
    });
}

async function runMYO(input) {
    const handler = await AAHandler.make(input)
    trafficCop(handler);
}