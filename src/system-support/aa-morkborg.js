import { trafficCop }       from "../router/traffic-cop.js"
import AAHandler            from "../system-handlers/workflow-data.js";
import { getRequiredData }  from "./getRequiredData.js";
// WILL NEED REWORK AFTER THE V10 VERSION IS RELEASED
export function systemHooks() {
    Hooks.on("createChatMessage", async (msg) => {
        console.log("MorkBorg ChatMessage", msg)
        if (msg.user.id !== game.user.id) { return };

        function extractItemName(content) {
            const parser = new DOMParser();
            const html = parser.parseFromString(content, 'text/html');
            console.log("CONTENT", content)
            console.log("CONTENTHTML", html)
            console.log("ItemName", html.querySelector(".item-name").innerHTML)
            try {
                return html.querySelector(".item-name").innerHTML;
            } catch (exception) {
                console.log("COULD NOT GET ITEM ID")
                return null;
            }
        }

        let compiledData = await getRequiredData({
            itemName: extractItemName(msg.content),
            actorId: msg.speaker?.actor,
            tokenId: msg.speaker?.token,
            workflow: msg,
        })
        console.log("CompiledData", compiledData)
        if (!compiledData.item) { return; }
        runMorkborg(compiledData)
    });
}

async function runMorkborg(input) {
    const handler = await AAHandler.make(input)
    trafficCop(handler);
}