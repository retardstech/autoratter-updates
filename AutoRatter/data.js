import PogObject from "PogData";

export const modulePrefix = "&cAutoRatter"
export const modulePrefixU = ChatLib.removeFormatting(modulePrefix)
export const moduleChat = (text) => { ChatLib.chat(`&6[${modulePrefix}&6] ${text}`) }

export const data = new PogObject("AutoRatter", {
    apiKeys: [],
    warpHotkeys: ["", "", "", "", "", "", "", "", ""],
    itemBlacklist: [],
    itemWhitelist: [],
});
data.autosave(2);
