import { trafficCop }       from "../router/traffic-cop.js"
import AAHandler            from "../system-handlers/workflow-data.js";
import { getRequiredData }  from "./getRequiredData.js";
// WILL NEED REWORK AFTER THE V10 VERSION IS RELEASED
export function systemHooks() {
    Hooks.on("createChatMessage", async (msg) => {
        console.log("COF ChatMessage", msg)
        if (msg.user.id !== game.user.id) { return };

        function extractItemName(content) {
            try {
                console.log("Item Name if in message flags", content.flags.itemName)
                return content.flags.itemName;
            } catch (exception) {
                console.log("COULD NOT GET ITEM ID")
                return null;
            }
        }

        let compiledData = await getRequiredData({
            itemName: extractItemName(msg),
            actorId: msg.speaker?.actor,
            tokenId: msg.speaker?.token,
            workflow: msg,
        })
        console.log("CompiledData", compiledData)
        if (!compiledData.item) { return; }
        runCOF(compiledData)
    });
}

async function runCOF(input) {
    const handler = await AAHandler.make(input)
    trafficCop(handler);
}