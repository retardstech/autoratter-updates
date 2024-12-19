/// <reference types="../CTAutocomplete" />
/// <reference lib="es2015" />

import * as Utils from "./utils";
import * as Data from "./data";
import request from "requestv2";
import RenderLibV2 from "RenderLibV2";
import Settings from "./settings";

const Loader = Java.type("net.minecraftforge.fml.common.Loader");
const ogFairyHexes = {
    // Only certain pieces are og fairy
    '#660033': ["chestplate", "leggings", "boots"],
    '#99004C': ["leggings", "boots"],
    '#CC0066': ["boots"],
    '#FFCCE5': ["helmet", "chestplate", "leggings"],
    '#FF99CC': ["helmet", "chestplate"],
    '#FF66B2': ["helmet"],

    // All pieces are og fairy
    '#FF99FF': ["helmet", "chestplate", "leggings", "boots"],
    '#FFCCFF': ["helmet", "chestplate", "leggings", "boots"],
    '#E5CCFF': ["helmet", "chestplate", "leggings", "boots"],
    '#CC99FF': ["helmet", "chestplate", "leggings", "boots"],
    '#CC00CC': ["helmet", "chestplate", "leggings", "boots"],
    '#FF00FF': ["helmet", "chestplate", "leggings", "boots"],
    '#FF33FF': ["helmet", "chestplate", "leggings", "boots"],
    '#FF66FF': ["helmet", "chestplate", "leggings", "boots"],
    '#B266FF': ["helmet", "chestplate", "leggings", "boots"],
    '#9933FF': ["helmet", "chestplate", "leggings", "boots"],
    '#7F00FF': ["helmet", "chestplate", "leggings", "boots"],
    '#660066': ["helmet", "chestplate", "leggings", "boots"],
    '#6600CC': ["helmet", "chestplate", "leggings", "boots"],
    '#4C0099': ["helmet", "chestplate", "leggings", "boots"],
    '#330066': ["helmet", "chestplate", "leggings", "boots"],
    '#990099': ["helmet", "chestplate", "leggings", "boots"]
}

function UpdateSkinName(petSkin)
{
    if (petSkin == "GUARDIAN")
    {
        petSkin = "WATCHER_GUARDIAN"
    }
    if (petSkin == "ENDERMAN")
    {
        petSkin = "SPOOKY_ENDERMAN"
    }
    if (petSkin == "RABBIT")
    {
        petSkin = "PRETTY_RABBIT"
    }
    if (petSkin == "PERFECT_FORGE")
    {
        petSkin = "REINFORCED"
    }
    if (petSkin == "WITHER")
    {
        petSkin = "DARK_WITHER"
    }
    if (petSkin == "SILVERFISH")
    {
        petSkin = "FORTIFIED_SILVERFISH"
    }
    if (petSkin == "WOLF")
    {
        petSkin = "DARK_WOLF"
    }
    if (petSkin == "PET_SKIN_DOLPHIN_SNUBFIN")
    {
        petSkin = "PET_SKIN_DOLPHIN_SNUBFIN_BLUE"
    }
    if (petSkin == "WITHER_GOGGLES_CYBERPUNK")
    {
        petSkin = "CYPERPUNK"
    }
    if (petSkin == "WITHER_GOGGLES_CELESTIAL")
    {
        petSkin = "CELESTIAL"
    }

    return petSkin
}

function UpdateItemID(itemId)
{
    if (itemId.includes("WISE_WITHER")) itemId = itemId.replace("WISE_WITHER", "STORM")
    if (itemId.includes("POWER_WITHER")) itemId = itemId.replace("POWER_WITHER", "NECRON")
    if (itemId.includes("TANK_WITHER")) itemId = itemId.replace("TANK_WITHER", "GOLDOR")
    if (itemId.includes("SPEED_WITHER")) itemId = itemId.replace("SPEED_WITHER", "MAXOR")
    if (itemId.includes("BARDING")) itemId = itemId.replace("BARDING", "HORSE_ARMOR")
    if (itemId.includes("GOD_POTION")) itemId = itemId.replace("GOD_POTION", "LEGACY_GOD_POTION")
    if (itemId.includes("LEATHER_BOOTS:58")) itemId = itemId.replace("LEATHER_BOOTS:58", "NULL_BOOTS")

    return itemId
}

const fairyHexes = [
    // Normal Fairy + Og Fairy
    '#FFCCE5',
    '#FF3399',
    '#99004C',
    '#FF99CC',
    '#FF007F',
    '#660033',
    '#FF66B2',
    '#CC0066',

    // Og Fairy
    '#FF99FF',
    '#FFCCFF',
    '#E5CCFF',
    '#CC99FF',
    '#CC00CC',
    '#FF00FF',
    '#FF33FF',
    '#FF66FF',
    '#B266FF',
    '#9933FF',
    '#7F00FF',
    '#660066',
    '#6600CC',
    '#4C0099',
    '#330066',
    '#990099',
]
const crystalHexes = [
    '#1F0030',
    '#46085E',
    '#54146E',
    '#5D1C78',
    '#63237D',
    '#6A2C82',
    '#7E4196',
    '#8E51A6',
    '#9C64B3',
    '#A875BD',
    '#B88BC9',
    '#C6A3D4',
    '#D9C1E3',
    '#E5D1ED',
    '#EFE1F5',
    '#FCF3FF'
]

const dyesHexes = [
    '#CC5500', // Ranchers

    '#87ff37',
    '#81F83C',
    '#7DF43F',
    '#79EF42',
    '#73E944',
    '#6FE547',
    '#69DF49',
    '#64D84B',
    '#5DD24D',
    '#57CC4E',
    '#52C551',
    '#4ABE52',
    '#44B752',
    '#3DB153',
    '#36AB53',
    '#30A553',
    '#299F54',
    '#239954',
    '#1D9553',
    '#179153',
    '#0F8C52',
    '#098852',
    '#008350',
    '#007D4F',
    '#00774D',
    '#00734B',
    '#006F49',
    '#006C47',
    '#006944',

    '#F06766',
    '#f06766',
    '#f06766',
    '#ee6364',
    '#ee6364',
    '#eb5e61',
    '#e8595e',
    '#e45359',
    '#e04d55',
    '#db4650',
    '#d3404c',
    '#cb3947',
    '#c43043',
    '#bd2b40',
    '#b8293e',
    '#b3263d',
    '#ae243b',
    '#ae243b',
    '#a32038',
    '#9c1e36',
    '#961c34',
    '#901a32',
    '#881731',
    '#81162e',
    '#881830',
    '#81162e',
    '#7b142d',
    '#74122b',
    '#6d1029',
    '#650e27',
    '#5e0d24',
    '#560b22',
    '#500a20',
    '#49081f',
    '#44061d',
    '#3e061b',
    '#39041a',
    '#39041a',
    '#39041a',
    '#39041a',
    '#39041a',

    '#034150',
    '#034150',
    '#034150',
    '#034150',
    '#034150',
    '#024554',
    '#004a59',
    '#004f5e',
    '#005463',
    '#005a68',
    '#005f6d',
    '#006472',
    '#006a76',
    '#006a76',
    '#00757f',
    '#007a84',
    '#008088',
    '#00868c',
    '#008b90',
    '#009194',
    '#009194',
    '#009295',
    '#009295',
    '#009295',

    '#5909c1',
    '#560aba',
    '#520cb1',
    '#5909c1',
    '#490f9c',
    '#440f92',
    '#3f0f8a',
    '#3c1081',
    '#38107b',
    '#361076',
    '#371078',
    '#390f7c',
    '#3a1080',
    '#3c0f85',
    '#3e0e8c',
    '#400d92',
    '#430b9a',
    '#450aa1',
    '#4909a8',
    '#4c08af',
    '#5107b5',
    '#5608bc',
    '#5c0ac1',
    '#620dc5',
    '#680fc9',
    '#6f12ce',
    '#7814d1',
    '#8117d5',
    '#8a18d9',
    '#9419dc',
    '#9e1adf',
    '#a71ae3',
    '#b01ae5',
    '#b919e7',
    '#c117ea',
    '#c816ec',
    '#cf14ef',
    '#d412f0',

    '#960018',
    '#E7413C',
    '#CB4154',
    '#F06766',
    '#310417',
    '#7B3F00',
    '#E25822',
    '#FDBE02',
    '#FFF700',
    '#006944',
    '#E9FFDB',
    '#ACE1AF',
    '#50C878',
    '#3C6746',
    '#7FFFD4',
    '#B2FFFF',
    '#71A6D2',
    '#6699CC',
    '#324D6C',
    '#034150',
    '#009295',
    '#002FA7',
    '#0013FF',
    '#301934',
    '#702670',
    '#702963',
    '#FF43A4',
    '#F56FA1',
    '#F6ADC6',
    '#E3DAC9'
]

let legacyReforgeList = {
    "godly": ["armor", "weapon", "accessory"],
    "keen": ["armor", "weapon", "accessory"],
    "unpleasant": ["armor", "weapon", "accessory"],
    "zealous": ["armor", "weapon", "accessory"],
    "superior": ["armor", "weapon", "accessory"],

    "forceful": ["armor", "weapon"],
    "hurtful": ["armor", "weapon"],
    "itchy": ["armor", "weapon"],
    "shaded": ["armor", "weapon"],
    "strong": ["armor", "weapon"],
    "demonic": ["armor", "weapon"],
    "bizarre": ["armor", "weapon"],
    "silky": ["armor", "weapon", "accessory"],
    "bloody": ["armor", "weapon", "accessory"],
    "simple": ["armor", "weapon", "accessory"],
    "ominous": ["armor", "weapon", "accessory"],
    "pleasant": ["armor", "weapon", "accessory"],
    "pretty": ["armor", "weapon", "accessory"],
    "sweet": ["armor", "weapon", "accessory"],
    "odd_bow": ["weapon"],
    "rich_sword": ["weapon"],
}
function RemoveReforgeFromItemID(itemID)
{
    let reforgeItemID = ChatLib.removeFormatting(itemID.split("_")[0]).toUpperCase()
    Object.keys(legacyReforgeList).forEach(reforge => {
        reforge = ChatLib.removeFormatting(reforge).toUpperCase()
        if (reforgeItemID == reforge)
        {
            if (itemID.startsWith(`${reforge}_DRAGON`))
            {
                return
            }
            itemID = itemID.replace(`${reforge}_`, "")
            return
        }
    })
    return itemID
}
function UpdateLegacyReforgeName(legacyName)
{
    let legacyNameU = legacyName.toLowerCase()
    if (legacyNameU == "odd_bow")
    {
        return "odd"
    }
    else if (legacyNameU == "rich_sword")
    {
        return "rich"
    }
    return legacyName
}

function FormatProfileCuteName(cuteName)
{
    switch (cuteName)
    {
        case "Apple":
            return "&cApple"
        case "Banana":
            return "&eBanana"
        case "Blueberry":
            return "&9Blueberry"
        case "Coconut":
            return "&6Coconut"
        case "Cucumber":
            return "&aCucumber"
        case "Grapes":
            return "&5Grapes"
        case "Kiwi":
            return "&2Kiwi"
        case "Lemon":
            return "&eLemon"
        case "Lime":
            return "&aLime"
        case "Mango":
            return "&6Mango"
        case "Orange":
            return "&6Orange"
        case "Papaya":
            return "&6Papaya"
        case "Peach":
            return "&dPeach"
        case "Pear":
            return "&aPear"
        case "Pineapple":
            return "&6Pineapple"
        case "Pomegranate":
            return "&5Pomegranate"
        case "Raspberry":
            return "&5Raspberry"
        case "Strawberry":
            return "&cStrawberry"
        case "Tomato":
            return "&cTomato"
        case "Watermelon":
            return "&aWatermelon"
        case "Zucchini":
            return "&aZucchini"
    }
    return `&f${cuteName}`
}

if (Data.data.warpHotkeys.length == 0)
{
    Data.data.warpHotkeys = ["", "", "", "", "", "", "", "", ""]
    Data.data.save()
}
SkyblockKeybinds = new SkyblockKeybinds();

register("tick", function()
{
	SkyblockKeybinds.tick();
})

function SkyblockKeybinds()
{
	this.key1 = new KeyBind("Warp Hotkey 1", 0, `.${Data.modulePrefixU}`)
	this.key2 = new KeyBind("Warp Hotkey 2", 0, `.${Data.modulePrefixU}`)
    this.key3 = new KeyBind("Warp Hotkey 3", 0, `.${Data.modulePrefixU}`)
    this.key4 = new KeyBind("Warp Hotkey 4", 0, `.${Data.modulePrefixU}`)
    this.key5 = new KeyBind("Warp Hotkey 5", 0, `.${Data.modulePrefixU}`)
    this.key6 = new KeyBind("Warp Hotkey 6", 0, `.${Data.modulePrefixU}`)
    this.key7 = new KeyBind("Warp Hotkey 7", 0, `.${Data.modulePrefixU}`)
    this.key8 = new KeyBind("Warp Hotkey 8", 0, `.${Data.modulePrefixU}`)
    this.key9 = new KeyBind("Warp Hotkey 9", 0, `.${Data.modulePrefixU}`)
    this.keyRescan = new KeyBind("Rescan Lobby", 0, `.${Data.modulePrefixU}`)

    this.tick = function()
    {
		if (this.key1.isPressed()) ChatLib.command("warphotkey activate 1", true)
        if (this.key2.isPressed()) ChatLib.command("warphotkey activate 2", true)
        if (this.key3.isPressed()) ChatLib.command("warphotkey activate 3", true)
        if (this.key4.isPressed()) ChatLib.command("warphotkey activate 4", true)
        if (this.key5.isPressed()) ChatLib.command("warphotkey activate 5", true)
        if (this.key6.isPressed()) ChatLib.command("warphotkey activate 6", true)
        if (this.key7.isPressed()) ChatLib.command("warphotkey activate 7", true)
        if (this.key8.isPressed()) ChatLib.command("warphotkey activate 8", true)
        if (this.key9.isPressed()) ChatLib.command("warphotkey activate 9", true)
        if (this.keyRescan.isPressed()) ChatLib.command("scanlobby", true)
    }
}

let defaultArmorColors = {}
let valuableItems = {}
let nonValuableItems = {}
let ignoredItems = {}
let allScannedPlayers = new Set()
let allOldProfiles = new Set()

function LoadDefaultArmorColors()
{
    let filePath = `./config/ChatTriggers/modules/${Data.modulePrefixU}/DefaultArmorColors.json`
    if (!FileLib.exists(filePath))
    {
        defaultArmorColors = JSON.parse(`{"air":""}`)
        return
    }

    defaultArmorColors = JSON.parse(`${FileLib.read(filePath)}`)
}
function LoadValuableItems()
{
    let filePath = `./config/ChatTriggers/modules/${Data.modulePrefixU}/ValuableItems.json`
    if (!FileLib.exists(filePath))
    {
        valuableItems = JSON.parse(`{"items":["air"]}`)
        return
    }

    valuableItems = JSON.parse(`${FileLib.read(filePath)}`)
}
function LoadNonValuableItems()
{
    let filePath = `./config/ChatTriggers/modules/${Data.modulePrefixU}/NonValuableItems.json`
    if (!FileLib.exists(filePath))
    {
        nonValuableItems = JSON.parse(`{"air":""}`)
        return
    }

    nonValuableItems = JSON.parse(`${FileLib.read(filePath)}`)
}
function LoadIgnoredItems()
{
    let filePath = `./config/ChatTriggers/modules/${Data.modulePrefixU}/IgnoredItems.json`
    if (!FileLib.exists(filePath))
    {
        ignoredItems = JSON.parse(`["air"]`)
        return
    }

    ignoredItems = JSON.parse(`${FileLib.read(filePath)}`)
}
function LoadAllOldProfiles() {
    let filePath = `./config/ChatTriggers/modules/${Data.modulePrefixU}/AllOldProfiles.json`
    if (!FileLib.exists(filePath))
    {
        allOldProfiles = new Set(["air"])
        return
    }

    let data = JSON.parse(FileLib.read(filePath))
    if (data.hasOwnProperty("items"))
    {
        data = data["items"]
    }
    allOldProfiles = new Set(data)
}
function LoadAllScannedPlayers()
{
    let filePath = `./config/ChatTriggers/modules/${Data.modulePrefixU}/AllScannedPlayers.json`
    if (!FileLib.exists(filePath))
    {
        allScannedPlayers = new Set(["air"])
        return
    }

    let data = JSON.parse(FileLib.read(filePath))
    if (data.hasOwnProperty("items"))
    {
        data = data["items"]
    }
    allScannedPlayers = new Set(data)
}

function LoadAllData()
{
    LoadDefaultArmorColors()
    LoadValuableItems()
    LoadNonValuableItems()
    LoadIgnoredItems()
    LoadAllScannedPlayers()
    LoadAllOldProfiles()
}
LoadAllData()

function SaveAllScannedPlayers()
{
    if (allScannedPlayers.size > 0)
    {
        FileLib.write(`./config/ChatTriggers/modules/${Data.modulePrefixU}/AllScannedPlayers.json`, JSON.stringify(Array.from(allScannedPlayers)))
    }
}
function SaveNonValuableItems()
{
    if (Object.keys(nonValuableItems).length > 0)
    {
        FileLib.write(`./config/ChatTriggers/modules/${Data.modulePrefixU}/NonValuableItems.json`, JSON.stringify(nonValuableItems))
    }
}
function SaveAllOldProfiles()
{
    if (allOldProfiles.size > 0)
    {
        FileLib.write(`./config/ChatTriggers/modules/${Data.modulePrefixU}/AllOldProfiles.json`, JSON.stringify(Array.from(allOldProfiles)))
    }
}

function SaveAll()
{
    SaveAllScannedPlayers()
    SaveNonValuableItems()
    SaveAllOldProfiles()
}

let badPetList = [
    "ENDERMAN_SLAYER",
    "ROCK_NORTH_STAR",
    "TURTLE_ANCIENT",
    "BEE_ZOMBEE",
    "ENDERMITE_DYNAMITE",
    "BLACK_CAT_PURRANORMAL",
    "CHICKEN_NESTED",
    "RAT_HIDE_AND_SQUEAK",
    "GUARDIAN_CORRUPT_EYE",
    "SNOWBALL_SPIRIT"
]

let rarePetList = [
    "MYTHIC_ARMADILLO",
    "COMMON_SKELETON_HORSE",
    "RARE_WITHER_SKELETON",
    "COMMON_SNOWMAN"
]

function FormatInventoryName(originalInventoryName, submenuName = '')
{
    switch(originalInventoryName)
    {
        case 'inv_contents':
            return 'Inventory'
        case 'ender_chest_contents':
            return 'Ender Chest'
        case 'wardrobe_contents':
            return 'Wardrobe'
        case 'bag_contents':
            switch(submenuName)
            {
                case 'potion_bag':
                    return 'Potion Bag'
                case 'talisman_bag':
                    return 'Talisman Bag'
                case 'fishing_bag':
                    return 'Fishing Bag'
                case 'sacks_bag':
                    return 'Sacks'
                case 'quiver':
                    return 'Quiver'
            }
        case 'inv_armor':
            return 'Armor'
        case 'equipment_contents':
            return 'Equipment'
        case 'personal_vault_contents':
            return 'Personal Vault'
        case 'backpack_contents':
            return `Backpack ${submenuName}`.trim()
    }
}

function GetArmorTypeFromItemType(itemType)
{
    switch(itemType)
    {
        case 'Leather Cap':
            return 'helmet'
        case 'Leather Tunic':
            return 'chestplate'
        case 'Leather Trousers':
            return 'leggings'
        case 'Leather Boots':
            return 'boots'
    }
    return itemType
}
function GetItemCategoryFromItemType(itemType, itemName)
{
    if (armorItems.includes(itemType))
    {
        return "armor"
    }
    else if (weaponItems.includes(itemType))
    {
        return "weapon"
    }
    else if (itemType == "Skeleton Skull")
    {
        let itemNameU = ChatLib.removeFormatting(itemName).toLowerCase()
        let headItems = ["hat", "helmet", "mask", "crown", "head", "heart", "fedora", "goggles"]
        let returnType = ""
        headItems.forEach(headItem => {
            if (itemNameU.includes(headItem))
            {
                returnType = "armor"
                return
            }
        })
        if (returnType != "")
        {
            return returnType
        }
    }
    return itemType
}

let armorItems = [
    "Leather Cap",
    "Leather Tunic",
    "Leather Pants",
    "Leather Boots",

    "Chain Helmet",
    "Chain Chestplate",
    "Chain Leggings",
    "Chain Boots",

    "Golden Helmet",
    "Golden Chestplate",
    "Golden Leggings",
    "Golden Boots",

    "Iron Helmet",
    "Iron Chestplate",
    "Iron Leggings",
    "Iron Boots",

    "Diamond Helmet",
    "Diamond Chestplate",
    "Diamond Leggings",
    "Diamond Boots",
]

let weaponItems = [
    "Wooden Sword",
    "Stone Sword",
    "Golden Sword",
    "Iron Sword",
    "Diamond Sword",

    "Bow",
    "Iron Axe",

    "Gold Horse Armour",
    "Iron Hoe",
    "Ghast Tear",
    "Stick",
    "Emerald",
    "Fishing Rod",
    "Blaze Rod",
]

function GetFancyChatColorPrefix(fallbackColor)
{
    if (Loader.isModLoaded("skyblockaddons"))
    {
        return "§z"
    }
    return fallbackColor
}

function GetItemListFromEncodedNBT(rawNBTString)
{
    var bytearray = java.util.Base64.getDecoder().decode(rawNBTString);
    return GetItemListFromNBT(bytearray)
}
function GetItemListFromNBT(bytearray)
{
    var inputstream = new java.io.ByteArrayInputStream(bytearray);
    var nbt = net.minecraft.nbt.CompressedStreamTools.func_74796_a(inputstream);
    let items = nbt.func_150295_c("i", 10);
    return items
}

function GetValuablePets(petList)
{
    let valuableItemList = []
    petList.forEach(item => {
        let addItem = false

        let itemId = "PET"
        let petData = item["PetData"]
        if (petData == undefined) return;

        let petType = petData["PetType"]
        let petTier = petData["PetTier"]
        // let petItem = petData["PetItem"]
        // let petCandy = petData["PetCandy"]
        // let petSkin = UpdateSkinName(petData["PetSkin"])
        let petSkin = petData["PetSkin"]

        if (Data.data.itemBlacklist.includes(`${petSkin}`.toUpperCase()))
        {
            return
        }
        if (Data.data.itemWhitelist.includes(`${petSkin}`.toUpperCase()))
        {
            addItem = true
        }

        if (petSkin != null)
        {
            if (badPetList.includes(`${petSkin}`)) return
            itemId = `APPLIED_${petSkin}`
            addItem = true
        }
        else if (rarePetList.includes(`${petTier}_${petType}`))
        {
            itemId = `${petTier}_${petType}`
            addItem = true
        }
        else
        {
            return
        }

        if (addItem)
        {
            item["ItemID"] = itemId
            valuableItemList.push(item)
            addItem = false
        }
    })

    return valuableItemList
}

function GetValuablePlayerItems(playerItems, playerUUID)
{
    let valuableItemList = []
    playerItems["ItemList"].forEach(item => {
        if (item == null) return
        if (!Settings.toggleSoulboundScanning && item["Soulbound"]) return

        let extraData = ""
        let addItem = false
        let dontAddItem = false

        let itemId = item["ItemID"]

        if (Data.data.itemBlacklist.includes(`${itemId}`.toUpperCase()))
        {
            return
        }
        if (Data.data.itemWhitelist.includes(`${itemId}`.toUpperCase()))
        {
            addItem = true
        }

        if (valuableItems["items"].includes(`${itemId}`))
        {
            addItem = true
        }

        if (item["hexCode"])
        {
            (function() {
                let hexCode = item["hexCode"]
                if (defaultArmorColors.hasOwnProperty(`${itemId}`))
                {
                    if ((crystalHexes.includes(`#${hexCode}`) || fairyHexes.includes(`#${hexCode}`)) && !Settings.toggleCrystalScanning) return;
    
                    let armorColor = defaultArmorColors[`${itemId}`]["hexCode"]
                    if (armorColor == "ignore")
                    {
                        return
                    }
                    else if (armorColor == "fairy")
                    {
                        // let itemType = item["ItemType"]
                        // if (ogFairyHexes.hasOwnProperty(`#${hexCode}`))
                        // {
                        //     if (!(ogFairyHexes[`#${hexCode}`].includes(`${GetArmorTypeFromItemType(itemType)}`)))
                        //     {
                        //         return;
                        //     }
                        // }
                        if (fairyHexes.includes(`#${hexCode}`)) return;
                    }
                    else if (armorColor == "crystal")
                    {
                        if (crystalHexes.includes(`#${hexCode}`)) return;
                    }
                    else if (armorColor == "leather")
                    {
                        if (!(crystalHexes.includes(`#${hexCode}`) || fairyHexes.includes(`#${hexCode}`))) return;
                    }
    
                    let itemName = item["ItemName"]
    
                    if (`#${hexCode}` == armorColor) return
                    if (itemName.includes("✿")) return;
                    if (dyesHexes.includes(`#${hexCode}`)) return;
    
                    extraData = `${itemName}-#${hexCode}`
                    addItem = true
                }
            }())
        }
        
        if (item["PetData"])
        {
            let valuablePets = GetValuablePets([item])
            if (valuablePets.length > 0)
            {
                addItem = true
                itemId = `APPLIED_${item["PetData"]["PetSkin"]}`
            }
        }

        if (item["CakeData"] && itemId == "NEW_YEAR_CAKE")
        {
            (function() {
                if (!Settings.toggleCakeScanning) return

                let cakeData = item["CakeData"]
                if (cakeData == null) return;

                if (Settings.cakeYearCap != 0)
                {
                    if (cakeData >= Settings.cakeYearCap) return;
                }

                itemId = `${itemId}_${cakeData}`
                addItem = true
            }())
        }

        if (itemId == "DCTR_SPACE_HELM")
        {
            if (item["RaffleYear"])
            {
                itemId = itemId.replace("DCTR", "RAFFLE")
            }
            else if (!item["SenderName"])
            {
                itemId = itemId.replace("DCTR", "GARDEN")
            }
        }

        itemId = itemId.replace("WISE_WITHER", "STORM")
        itemId = itemId.replace("POWER_WITHER", "NECRON")
        itemId = itemId.replace("TANK_WITHER", "GOLDOR")
        itemId = itemId.replace("SPEED_WITHER", "MAXOR")
        itemId = itemId.replace("BARDING", "HORSE_ARMOR")
        itemId = itemId.replace("GOD_POTION", "LEGACY_GOD_POTION")
        itemId = itemId.replace("LEATHER_BOOTS:58", "NULL_BOOTS")

        if (item["PaidData"])
        {
            (function() {
                let paidData = item["PaidData"]
                if (paidData == null) return;
    
                itemId = `${Utils.CompactNumber(paidData).toUpperCase()}_${itemId}`
            }())
        }
        
        if (item["BackpackData"])
        {
            (function() {
                let backpackData = item["BackpackData"]
                if (backpackData == null) return;
    
                let backpackItemList = GetValuablePlayerItems(GetAllPlayerItemsFromNBT(backpackData, playerUUID))
                if (backpackItemList.length == 0) return;
    
                backpackItemList.forEach(backpackItem => {
                    let newItemID = backpackItem["ItemID"]
                    backpackItem["ItemID"] = `${newItemID} (Backpack)`
                    valuableItemList.push(backpackItem)
                })
            }())
        }

        if (item["CakeBagData"])
        {
            (function() {
                let cakeBagData = item["CakeBagData"]
                if (cakeBagData == null) return;

                let cakeBagItemList = GetValuablePlayerItems(GetAllPlayerItemsFromNBT(cakeBagData, playerUUID))
                if (cakeBagItemList.length == 0) return;

                cakeBagItemList.forEach(cakeBagItem => {
                    let newItemID = cakeBagItem["ItemID"]
                    cakeBagItem["ItemID"] = `${newItemID} (Cake Bag)`
                    valuableItemList.push(cakeBagItem)
                })
            }())
        }

        if (item["Reforge"])
        {
            (function() {
                if (!Settings.toggleAccessoryLegacyScanning && !Settings.toggleRareAccessoryLegacyScanning && !Settings.toggleArmorLegacyScanning) return;

                let reforgeData = item["Reforge"]
                if (reforgeData == null) return;
    
                if (!Utils.isNullOrUndefined(legacyReforgeList[`${reforgeData.toLowerCase()}`]))
                {
                    let itemType = item["ItemType"]
                    let itemName = item["ItemName"]
                    let itemCategory = GetItemCategoryFromItemType(itemType, itemName)
    
                    if ((itemCategory == "armor" || itemCategory == "weapon"))
                    {
                        if (Settings.toggleArmorLegacyScanning)
                        {
                            addItem = true
                        }
                    }
                    else
                    {
                        if (Settings.toggleAccessoryLegacyScanning)
                        {
                            addItem = true
                        }
                        else if (Settings.toggleRareAccessoryLegacyScanning)
                        {
                            let reforgeItemList = legacyReforgeList[`${reforgeData.toLowerCase()}`]
                            if (reforgeItemList.includes(`accessory`))
                            {
                                addItem = true
                            }
                        }
                    }

                    if (addItem)
                    {
                        itemId = `${reforgeData.toUpperCase()}_${itemId}`
                    }
                }
            }())
        }

        if (item["SkinData"])
        {
            (function() {
                let skinData = item["SkinData"]
                if (skinData == null) return;
    
                if (Data.data.itemBlacklist.includes(`${skinData}`.toUpperCase()))
                {
                    dontAddItem = true
                    return
                }
                if (Data.data.itemWhitelist.includes(`${skinData}`.toUpperCase()))
                {
                    addItem = true
                }
                if (valuableItems["items"].includes(`${skinData}`))
                {
                    addItem = true
                }

                if (addItem)
                {
                    itemId = `APPLIED_${skinData}`
                }
            }())
        }
        if (item["RuneData"])
        {
            (function() {
                let runeData = item["RuneData"]
                if (runeData == null) return;
    
                if (Data.data.itemBlacklist.includes(`${runeData}`.toUpperCase()))
                {
                    dontAddItem = true
                    return
                }
                if (Data.data.itemWhitelist.includes(`${runeData}`.toUpperCase()))
                {
                    addItem = true
                }

                if (valuableItems["items"].includes(`${runeData}`))
                {
                    addItem = true
                }

                if (addItem)
                {
                    itemId = `APPLIED_${runeData}_${itemId}`
                }
            }())
        }

        if (!Utils.isNullOrUndefined(playerUUID))
        {
            (function() {
                if (!ignoredItems.includes(`${itemId}`) || addItem)
                {
                    if (nonValuableItems.hasOwnProperty(`${itemId}`))
                    {
                        let playerList = nonValuableItems[`${itemId}`]["playerList"]
                        if (playerList == null || playerList == undefined) return;
    
                        if (extraData == "")
                        {
                            if (playerList.includes(`${playerUUID}`)) return;
                            playerList.push(playerUUID)
                        }
                        else if (playerList.includes(`${playerUUID}-${extraData}`)) return;
                        else
                        {
                            playerList.push(`${playerUUID}-${extraData}`)
                        }
                        nonValuableItems[`${itemId}`]["playerList"] = playerList
                    }
                    else
                    {
                        if (extraData == "")
                        {
                            nonValuableItems[`${itemId}`] = {
                                "playerList": [playerUUID]
                            }
                        }
                        else
                        {
                            nonValuableItems[`${itemId}`] = {
                                "playerList": [`${playerUUID}-${extraData}`]
                            }
                        }
                    }
                }
            }())
        }

        if (dontAddItem) return

        if (addItem)
        {
            item["ItemID"] = UpdateItemID(itemId)
            item["extraData"] = extraData
            valuableItemList.push(item)
            addItem = false
        }
    })

    return valuableItemList
}

function GetAllPlayerItemsFromNBT(rawNBT)
{
    let originalItemList = GetItemListFromNBT(rawNBT)
    return GetAllPlayerItems(originalItemList)
}
function GetAllPlayerItemsEncodedFromNBT(rawNBT)
{
    let originalItemList = GetItemListFromEncodedNBT(rawNBT)
    return GetAllPlayerItems(originalItemList)
}
function GetAllPlayerItems(originalItemList)
{
    let itemList = []

    let tagCount = originalItemList.func_74745_c()
    for (let i = 0; i < tagCount; i++)
    {
        let itemData = GetItemDataFromNBT(originalItemList.func_150305_b(i))
        if (Utils.isNullOrUndefined(itemData)) continue
        itemList.push(itemData)
    }

    return {'ItemList': itemList}
}

function GetItemDataFromNBT(itemNBT, baseTagSkipped)
{
    try
    {
        let itemLore, itemName, itemTimestamp, itemID, itemUUID, hexCodeString, petData, runeData, skinData, backpackData, backpackName, itemType, itemReforge, colorData, cakeData, paidData, senderName, raffleYear, cakeBagData
        let soulbound = false

        try 
        {
            let itemTypeTag = itemNBT.func_74781_a("id")
            if (itemTypeTag != null)
            {
                let itemTypeInt = itemTypeTag.toString().split("s")[0]
                itemType = new Item(parseInt(itemTypeInt)).getName()
            }
        }
        catch (e) {}

        let baseTag
        if (baseTagSkipped)
        {
            baseTag = itemNBT
        }
        else
        {
            baseTag = itemNBT.func_74775_l("tag")
        }

        if (baseTag.func_74764_b("display"))
        {
            let displayTag = baseTag.func_74775_l("display")
            if (displayTag.func_150297_b("Lore", 9))
            {
                itemLore = displayTag.func_150295_c("Lore", 8)
                for (let i = 0; i < itemLore.func_74745_c(); i++)
                {
                    let loreLine = itemLore.func_150307_f(i)
                    if (ChatLib.removeFormatting(`${loreLine}`).toLowerCase().includes("soulbound"))
                    {
                        soulbound = true
                    }
                }
            }
            
            if (displayTag.func_74764_b("Name"))
            {
                itemName = displayTag.func_74779_i("Name")
            }
            if (displayTag.func_74764_b("color"))
            {
                let itemIntColor = displayTag.func_74762_e("color")
                hexCodeString = itemIntColor.toString(16).toUpperCase().padStart(6, '0')
            }
        }

        if (baseTag.func_74764_b("ExtraAttributes"))
        {
            let extraTag = baseTag.func_74775_l("ExtraAttributes")
            if (extraTag.func_74764_b("id"))
            {
                itemID = extraTag.func_74779_i("id")
            }
            if (extraTag.func_74764_b("uuid"))
            {
                itemUUID = extraTag.func_74779_i("uuid")
            }
            if (extraTag.func_74764_b("timestamp"))
            {
                itemTimestamp = extraTag.func_74763_f("timestamp")
            }
            if (extraTag.func_74764_b("petInfo"))
            {
                let petDataString = extraTag.func_74779_i("petInfo")
                let petDataJson = JSON.parse(petDataString)

                let petType = petDataJson["type"]
                let petTier = petDataJson["tier"]
                let petItem = petDataJson["heldItem"]
                let petCandy = petDataJson["candyUsed"]
                let petSkin = UpdateSkinName(petDataJson["skin"])

                petData = {
                    "PetType": petType,
                    "PetTier": petTier,
                    "PetItem": petItem,
                    "PetCandy": petCandy,
                    "PetSkin": petSkin
                }
            }
            if (baseTag.func_74764_b("runes"))
            {
                runes = extraTag.func_74775_l("runes")
            }
            if (extraTag.func_74764_b("skin"))
            {
                skinData = extraTag.func_74779_i("skin")
            }
            if (extraTag.func_74764_b("color"))
            {
                colorData = extraTag.func_74779_i("color")
            }
            if (extraTag.func_74764_b("modifier"))
            {
                itemReforge = extraTag.func_74779_i("modifier")
            }
            if (extraTag.func_74764_b("sender_name"))
            {
                senderName = extraTag.func_74779_i("sender_name")
            }
            if (extraTag.func_74764_b("raffle_year"))
            {
                raffleYear = extraTag.func_74762_e("raffle_year")
            }
            if (extraTag.func_74764_b("winning_bid"))
            {
                paidData = extraTag.func_74762_e("winning_bid")
            }
            if (extraTag.func_74764_b("new_years_cake"))
            {
                cakeData = extraTag.func_74762_e("new_years_cake")
            }

            if (extraTag.func_74764_b("small_backpack_data"))
            {
                backpackData = extraTag.func_74770_j("small_backpack_data")
                backpackName = "small_backpack_data"
            }
            else if (extraTag.func_74764_b("medium_backpack_data"))
            {
                backpackData = extraTag.func_74770_j("medium_backpack_data")
                backpackName = "medium_backpack_data"
            }
            else if (extraTag.func_74764_b("large_backpack_data"))
            {
                backpackData = extraTag.func_74770_j("large_backpack_data")
                backpackName = "large_backpack_data"
            }
            else if (extraTag.func_74764_b("greater_backpack_data"))
            {
                backpackData = extraTag.func_74770_j("greater_backpack_data")
                backpackName = "greater_backpack_data"
            }
            else if (extraTag.func_74764_b("jumbo_backpack_data"))
            {
                backpackData = extraTag.func_74770_j("jumbo_backpack_data")
                backpackName = "jumbo_backpack_data"
            }
            if (extraTag.func_74764_b("new_year_cake_bag_data"))
            {
                cakeBagData = extraTag.func_74770_j("new_year_cake_bag_data")
            }
        }

        if (itemID == undefined) return null

        if (colorData != null && hexCodeString == null)
        {
            hexCodeString = "-1"
        }

        let item = {
            "ItemID": itemID,
            "itemUUID": itemUUID,
            "timestamp": itemTimestamp,
            "hexCode": hexCodeString,
            "ItemName": itemName,
            "Soulbound": soulbound,
            "PetData": petData,
            "RuneData": runeData,
            "SkinData": skinData,
            "BackpackData": backpackData,
            "BackpackName": backpackName,
            "ItemType": itemType,
            "Reforge": itemReforge,
            "PaidData": paidData,
            "CakeData": cakeData,
            "SenderName": senderName,
            "RaffleYear": raffleYear,
            "CakeBagData": cakeBagData
        }
        return item
    }
    catch (e)
    {
        Utils.ChatLog("ERROR", e)
    }
    return null
}

function GetRandomAPIKey()
{
    if (Data.data.apiKeys.length == 0)
    {
        let fancyColor = GetFancyChatColorPrefix("&c")
        Utils.ChatLog(`${fancyColor}No API keys. Add one with \`&b/scannerkey add <key>${fancyColor}\`.`)
        return false
    }

    let randomIndex = Math.floor(Math.random() * Data.data.apiKeys.length)
    return Data.data.apiKeys[randomIndex]
}

function GetServerPlayerList()
{
    const NetHandlerPlayClient = Client.getConnection();
    const scoreboard = World.getWorld()?.func_96441_U();
    const teams = scoreboard?.func_96525_g();

    if (Utils.isNullOrUndefined(teams)) return [];
    const PLAYERARRAY = [];
    teams.forEach(team => {
        const players = team.func_96670_d();
        players.forEach(player => {
            const networkPlayerInfo = NetHandlerPlayClient.func_175104_a(player);
            if (networkPlayerInfo !== null) {
                PLAYERARRAY.push(new PlayerMP(
                    new net.minecraft.client.entity.EntityOtherPlayerMP(World.getWorld(), networkPlayerInfo.func_178845_a()))
                )
            }
        });
    });

    return PLAYERARRAY;
};

let newlyScannedPlayers = []
function ListAllPlayers()
{
    newlyScannedPlayers = []
    let playerCount = 0
    let selfUUID = Player.getUUID().toString()
    GetServerPlayerList().forEach(player => {
        let playerUUID = player.getUUID().toString()
        if (playerUUID == selfUUID) return;

        let originalPlayerName = player.getDisplayName().getText().trim()
        let unformattedPlayerName = ChatLib.removeFormatting(originalPlayerName)

        let playerUsername = ""
        let playerRank = ""
        let split = originalPlayerName.split(" ")
        
        if (unformattedPlayerName == originalPlayerName) return
        if (unformattedPlayerName.includes("[NPC]")) return

        if (Utils.isOnSkyblock())
        {
            // 2 = ingame,player level + player name
            // 3 = ingame,player level + player name + player postfix
            if (split.length == 2 || split.length == 3)
            {
                playerUsername = split[1].trim()
            }
            else return
        }
        else
        {
            // 1 = lobby,player name
            if (split.length == 1)
            {
                playerUsername = split[0].trim()
            }
            else if (split.length == 2)
            {
                // 3 = lobby,player rank + player name
                if (split[0].includes("[") || split[0].includes("]"))
                {
                    playerUsername = split[1].trim()
                    playerRank = split[0].trim()
                }

                // 2 = lobby,player name + player postfix
                else
                {
                    playerUsername = split[0].trim()
                }
            }

            // 3 = lobby,player rank + player name + player postfix
            else if (split.length == 3)
            {
                playerUsername = split[1].trim()
                playerRank = split[0].trim()
            }
        }

        playerCount++

        GetPlayerProfilesFromUUID(playerUUID, playerUsername, playerRank)
    })

    let fancyColor = GetFancyChatColorPrefix("&a")
    Utils.ChatLog(`${fancyColor}Players in lobby: ${playerCount}.`)
    Utils.ChatLog(`${fancyColor}Newly scanned players: ${newlyScannedPlayers.length}.`)
}

function HandlePlayerProfile(playerUUID, playerUsername, playerRank, playerProfile, bypass = false, printAll = false)
{
    let playerLevelList = {}
    let validPlayerProfileList = {}
    let allPlayerProfileList = {}
    let oldProfileList = []
    let apiDisabledCount = 0

    if (!playerProfile.hasOwnProperty("profiles"))
    {
        if (!bypass) return;
        Utils.ChatLog("No profiles found.", JSON.stringify(playerProfile))
        new Message([
            new TextComponent("&cPlayer has no profiles."),
            new TextComponent(JSON.stringify(playerProfile)),
            new TextComponent(" | "),
            new TextComponent(`&7${playerRank} ${playerUsername}`.trim())
                .setClick("open_url", `https://namemc.com/profile/${playerUUID}`)
                .setHover("show_text", `&7Open NameMC.`),
        ]).chat();
        return;
    }
    else if (playerProfile["profiles"] == null)
    {
        if (!bypass) return;
        new Message([
            new TextComponent("&cPlayer has no profiles."),
            new TextComponent(" | "),
            new TextComponent(`&7${playerRank} ${playerUsername}`.trim())
                .setClick("open_url", `https://namemc.com/profile/${playerUUID}`)
                .setHover("show_text", `&7Open NameMC.`),
        ]).chat();
        return;
    }
    
    let profiles = playerProfile["profiles"]
    if (profiles.length == 0) return;

    profiles.forEach(profile => {
        let profileCuteName = profile["cute_name"]
        let profileSelected = profile["selected"]
        let profileId = profile["profile_id"]

        let ironmanProfile = false
        if (profile.hasOwnProperty("game_mode"))
        {
            ironmanProfile = true
            if (!Settings.toggleIronmanProfileScanning) return;
        }

        let members = profile["members"]
        Object.keys(members).forEach(memberUUID => {
            memberUUID = memberUUID.toLowerCase()
            
            let isScannedPlayer = memberUUID == playerUUID
            
            if (!isScannedPlayer) return;

            if (!allScannedPlayers.has(memberUUID) && isScannedPlayer)
            {
                allScannedPlayers.add(memberUUID)
            }
            
            let member = members[`${memberUUID}`]
            let firstJoinTime = member["profile"]["first_join"]

            let playerLevel = -1
            if (member.hasOwnProperty("leveling"))
            {
                let leveling = member['leveling']
                if (leveling.hasOwnProperty("experience"))
                {
                    let experience = leveling['experience']
                    playerLevel = Math.floor(experience / 100)
                }
            }

            if (!playerLevelList.hasOwnProperty(`${memberUUID}`))
            {
                playerLevelList[`${memberUUID}`] = []
            }
            playerLevelList[`${memberUUID}`].push(playerLevel)

            // Tue Nov 19 2019 00:00:00 EST
            if (firstJoinTime <= 1574139600000)
            {
                if (!oldProfileList.includes(`${profileId}`))
                {
                    oldProfileList[`${profileId}`] = []
                }

                oldProfileList[`${profileId}`].push({
                    "PlayerUUID": memberUUID,
                    "ProfileName": profileCuteName,
                    "FirstJoinTime": firstJoinTime
                })
            }

            let petList = []
            if (member.hasOwnProperty("pets_data"))
            {
                let petData = member["pets_data"]
                if (petData.hasOwnProperty("pets"))
                {
                    let pets = petData["pets"]

                    let beforePetList = []
                    pets.forEach(pet => {
                        let petType = pet["type"]
                        let petTier = pet["tier"]
                        let petItem = pet["heldItem"]
                        let petCandy = pet["candyUsed"]
                        let petSkin = UpdateSkinName(pet["skin"])

                        beforePetList.push(
                        {
                            "PetData": {
                                "PetType": petType,
                                "PetTier": petTier,
                                "PetItem": petItem,
                                "PetCandy": petCandy,
                                "PetSkin": petSkin
                            }
                        })
                    })

                    let valuablePetList = GetValuablePets(beforePetList)
                    valuablePetList.forEach(valuablePet => {
                        petList.push(valuablePet)
                    })
                }
            }

            let itemListList = []
            if (member.hasOwnProperty("inventory"))
            {
                let inventory = member["inventory"]

                let inventoryKeyCount = Object.keys(inventory).length

                if (inventoryKeyCount == 1)
                {
                    apiDisabledCount++
                }

                Object.keys(inventory).forEach(inventoryMenuName => {
                    if (["backpack_icons", "sacks_counts", "wardrobe_equipped_slot"].includes(inventoryMenuName)) return;

                    if (inventory.hasOwnProperty(`${inventoryMenuName}`))
                    {
                        if (["bag_contents", "backpack_contents"].includes(inventoryMenuName))
                        {
                            let inventorySubMenus = inventory[`${inventoryMenuName}`]
                            Object.keys(inventorySubMenus).forEach(inventorySubMenuName => {
                                let nbtData = inventorySubMenus[`${inventorySubMenuName}`]["data"]

                                let newItemList = {}
                                newItemList["ItemList"] = GetValuablePlayerItems(GetAllPlayerItemsEncodedFromNBT(nbtData), playerUUID)
                                if (newItemList["ItemList"].length == 0) return;

                                newItemList["ItemLocation"] = FormatInventoryName(inventoryMenuName, inventorySubMenuName)
                                itemListList = itemListList.concat(newItemList)
                            })
                        }
                        else
                        {
                            let nbtData = inventory[`${inventoryMenuName}`]["data"]
                            let newItemList = {}
                            newItemList["ItemList"] = GetValuablePlayerItems(GetAllPlayerItemsEncodedFromNBT(nbtData), playerUUID)
                            if (newItemList["ItemList"].length == 0) return;
                            
                            newItemList["ItemLocation"] = FormatInventoryName(inventoryMenuName)
                            itemListList = itemListList.concat(newItemList)
                        }
                    }
                })
            }
            else if (isScannedPlayer)
            {
                apiDisabledCount++
            }

            if (itemListList.length > 0 || firstJoinTime <= 1574139600000 || petList.length > 0)
            {
                if (!validPlayerProfileList.hasOwnProperty(`${memberUUID}`))
                {
                    validPlayerProfileList[`${memberUUID}`] = []
                }

                // if (itemListList.length > 0)
                // {
                //     itemListList.forEach(itemList => {
                //         Utils.ChatLog(1, typeof itemList, JSON.stringify(itemList))
                //         itemList["ItemList"].forEach(item => {
                //             let hexData = GetHexMarkerData(item)
                //             let itemId = hexData["ItemID"]
                //             Utils.ChatLog(2, `Item: ${itemId}`)
                //         })
                //     })
                // }

                // if (petList.length > 0)
                // {
                //     Utils.ChatLog(3, typeof petList, JSON.stringify(petList))
                //     petList.forEach(item => {
                //         let petData = item["PetData"]
                //         let petExtraData = UpdateSkinName(petData["PetSkin"])
                //         Utils.ChatLog(4, `Pet: ${petData["PetType"]} - ${petExtraData} - (${petData["PetCandy"]}/10)`)
                //     })
                // }

                // if (firstJoinTime <= 1574139600000)
                // {
                //     Utils.ChatLog(5, `Player: ${memberUUID} - ${profileCuteName} - ${playerLevel} - ${itemListList.length} - ${petList.length}`)
                // }

                // Utils.ChatLog(`Player: ${memberUUID} - ${profileCuteName} - ${playerLevel} - ${itemListList.length} - ${petList.length}`)
                validPlayerProfileList[`${memberUUID}`].push({
                    "PlayerUUID": memberUUID,
                    "IsScannedPlayer": isScannedPlayer,
                    "ProfileId": profileId,
                    "ProfileName": profileCuteName,
                    "ProfileSelected": profileSelected,
                    "FirstJoinTime": firstJoinTime,
                    "IronmanProfile": ironmanProfile,
                    "PlayerLevel": playerLevel,
                    "ItemList": itemListList,
                    "PetList": petList
                })
            }

            if (!allPlayerProfileList.hasOwnProperty(`${memberUUID}`))
            {
                allPlayerProfileList[`${memberUUID}`] = []
            }

            allPlayerProfileList[`${memberUUID}`].push({
                "PlayerUUID": memberUUID,
                "ProfileId": profileId,
                "ProfileName": profileCuteName,
                "ProfileSelected": profileSelected,
                "FirstJoinTime": firstJoinTime,
                "IronmanProfile": ironmanProfile,
                "PlayerLevel": playerLevel,
                "ItemList": itemListList,
                "PetList": petList
            })
        })
    })

    let playerNameAndRank = `${playerRank} ${playerUsername}`.trim()
    let nameText = new TextComponent(`&7Name: &e${playerNameAndRank}`)

    let scannedProfileIds = []
    if (Object.keys(validPlayerProfileList).length > 0)
    {
        Object.keys(validPlayerProfileList).forEach(playerUUID => {
            let levelList = playerLevelList[`${playerUUID}`]
            let maxPlayerLevel = Math.max(...levelList)

            if (Settings.scanningPlayerLevelCap != 0)
            {
                if (maxPlayerLevel >= Settings.scanningPlayerLevelCap && !bypass)
                {
                    return
                }
            }
    
            let validProfilesText = ""
            let firstJoinTexts = ""
    
            let itemsText = new TextComponent(`&bItems`)
    
            let itemFound = false
            let finalText = ""
            let shouldReturn = false
            validPlayerProfileList[`${playerUUID}`].forEach(playerProfile => {
                // if (playerProfile["ItemList"].length == 0 && playerProfile["PetList"].length == 0) return

                if (shouldReturn)
                {
                    shouldReturn = false
                }

                if (playerProfile["ItemList"].length == 0 && playerProfile["PetList"].length == 0)
                {
                    shouldReturn = true
                    return
                }
                // if (scannedProfileIds.includes(playerProfile["ProfileId"]))
                // {
                //     shouldReturn = true
                //     return
                // }

                scannedProfileIds.push(playerProfile["ProfileId"])

                let joinDate = new Date(playerProfile["FirstJoinTime"])
                let profileSelected = playerProfile["ProfileSelected"]
    
                let ironmanIcon = playerProfile["IronmanProfile"] ? "&7♲" : ""
                let profileName = FormatProfileCuteName(playerProfile["ProfileName"]) + ironmanIcon

                if (profileSelected)
                {
                    profileName = `${profileName} &6✯`
                }
                else
                {
                    profileName = `${profileName} &c✯`
                }
                if (validProfilesText != "") validProfilesText += `&7, `
                validProfilesText += `${profileName}`
                if (firstJoinTexts != "") firstJoinTexts += `\n`
                firstJoinTexts += `${profileName} - ${joinDate.toDateString()}`
        
                let currentText = ""
                playerProfile["ItemList"].forEach(itemList => {
                    let itemLocation = itemList["ItemLocation"]
                    if (currentText != "") currentText += `\n\n`
                    currentText += `&b${itemLocation} - ${profileName}`
                    itemList["ItemList"].forEach(item => {
                        itemFound = true
                        let hexData = GetHexMarkerData(item)
                        let hexCode = hexData["hexCode"]
                        let itemId = hexData["ItemID"]
                        let soulbound = hexData["Soulbound"]
    
                        currentText += `\n&aItem: ${itemId}${hexCode}${soulbound}`
                    })
                })
    
                let petList = playerProfile["PetList"]
                if (petList.length > 0)
                {
                    if (currentText != "") currentText += `\n\n`
                    currentText += `&bPets - ${profileName}`
                    petList.forEach(item => {
                        itemFound = true
    
                        let petData = item["PetData"]
    
                        // let petExtraData = UpdateSkinName(petData["PetSkin"])
                        let petExtraData = petData["PetSkin"]
                        if (!petExtraData)
                        {
                            petExtraData = `${petData["PetTier"]}`
                        }
    
                        currentText += `\n&aPet: ${petData["PetType"]} - ${petExtraData} - (${petData["PetCandy"]}/10)`
                    })
                }
    
                if (finalText != "") finalText += `\n\n`
                finalText += currentText
            })

            if (shouldReturn)
            {
                return
            }
    
            if (!itemFound)
            {
                currentText = "&cNo items found."
                itemsText.setText("&cNo items found.")
    
                if (!bypass)
                {
                    return
                }
            }
            itemsText.setHover("show_text", finalText)
    
            ChatLib.chat(Utils.divider)
            new Message([
                nameText,
                new TextComponent(`\n&7Profiles: ${validProfilesText}`)
                    .setHover("show_text", `${firstJoinTexts}`),
                new TextComponent(`\n`),
        
                new TextComponent(`\n&aActions: `),
                new TextComponent("&a[Party]")
                    .setClick("run_command", `/p ${playerUUID}`)
                    .setHover("show_text", `&7Send party invite.`),
                new TextComponent(" "),
                new TextComponent("&a[Friend]")
                    .setClick("run_command", `/f add ${playerUUID}`)
                    .setHover("show_text", `&7Send a friend request.`),
                new TextComponent(" "),
                new TextComponent("&a[Invite]")
                    .setClick("run_command", `/invite ${playerUUID}`)
                    .setHover("show_text", `&7Invite player to your island.`),
                new TextComponent(" "),
                new TextComponent("&a[Visit]")
                    .setClick("run_command", `/visit ${playerUUID}`)
                    .setHover("show_text", `&7Open visit menu.`),
                new TextComponent(" "),
                new TextComponent("&a[Message]")
                    .setClick("run_command", `/msg ${ChatLib.removeFormatting(playerUsername)}`)
                    .setHover("show_text", `&7Start a message conversation.`),
                new TextComponent(" "),
                new TextComponent("&a[PV]")
                    .setClick("run_command", `/pv ${ChatLib.removeFormatting(playerUsername)}`)
                    .setHover("show_text", `&7Inspects player.`),
    
                new TextComponent(`\n&aWebsites: `),
                new TextComponent("&a[SkyCrypt]")
                    .setClick("open_url", `https://sky.shiiyu.moe/stats/${playerUUID}`)
                    .setHover("show_text", `&7Open SkyCrypt.`),
                new TextComponent(" "),
                new TextComponent("&a[Planke]")
                    .setClick("open_url", `https://plancke.io/hypixel/player/stats/${playerUUID}`)
                    .setHover("show_text", `&7Open Planke.`),
                new TextComponent(" "),
                new TextComponent("&a[NameMC]")
                    .setClick("open_url", `https://namemc.com/profile/${playerUUID}`)
                    .setHover("show_text", `&7Open NameMC.`),
    
                new TextComponent(`\n&aExtra Buttons: `),
                new TextComponent("&a[Send All Requests]")
                    .setClick("run_command", `/sendallrequests ${playerUUID}`)
                    .setHover("show_text", `&7Sends a friend request, party invite, and a island invite.`),
                new TextComponent(" "),
                new TextComponent("&a[Tracer]")
                    .setClick("run_command", `/lobbytracer ${playerUsername}`)
                    .setHover("show_text", `&7Makes a tracer to the player.`),
    
                new TextComponent("\n"),
                itemsText,
                new TextComponent(`\n&7API Disabled Profiles: ${apiDisabledCount}/${profiles.length}`),
                new TextComponent(`\n&7Highest Level: ${maxPlayerLevel}`)
            ]).chat();
            ChatLib.chat(Utils.divider)

            if (printAll)
            {
                Utils.ChatLog(finalText)
            }
        })
    }
    else if (bypass)
    {
        new Message([
            new TextComponent("&cNo items or old profiles found."),
            new TextComponent(" | "),
            new TextComponent(`&7${playerRank} ${playerUsername}`.trim())
                .setClick("open_url", `https://namemc.com/profile/${playerUUID}`)
                .setHover("show_text", `&7Open NameMC.`),
        ]).chat();
    }

    if (Settings.toggleOldProfileScanning && Object.keys(validPlayerProfileList).length > 0)
    {
        let oldProfilesText = ""
        Object.keys(oldProfileList).forEach(profileId => {
            let profileList = oldProfileList[`${profileId}`]

            profileList.forEach(profile => {
                let joinDate = new Date(profile["FirstJoinTime"])
                let profileName = FormatProfileCuteName(profile["ProfileName"])
                if (oldProfilesText != "") oldProfilesText += `&7, `
                oldProfilesText += `${profileName} &7- &e${joinDate.toDateString()}`
            })
        })
    
        if (oldProfilesText != "")
        {
            new Message([
                new TextComponent(`&a${nameText.getText()} &7| &aOld Profiles`)
                    .setClick("run_command", `/visit ${playerUUID}`)
                    .setHover("show_text", `&7Open visit menu.`),
                new TextComponent(" "),
                new TextComponent("&a[Visit]")
                    .setClick("run_command", `/visit ${playerUUID}`)
                    .setHover("show_text", `&7Open visit menu.`),
                new TextComponent(" "),
                new TextComponent("&a[PV]")
                    .setClick("run_command", `/pv ${ChatLib.removeFormatting(playerUsername)}`)
                    .setHover("show_text", `&7Inspects player.`),
                new TextComponent(`\n${oldProfilesText}`)
            ]).chat()
        }
    }
}

let socketFactory
function LoadCertificates()
{
    let certificates = ["DigiCertRootG2.cer"]
    const KeyStore = Java.type("java.security.KeyStore"),
        Paths = Java.type("java.nio.file.Paths"),
        System = Java.type("java.lang.System"),
        Files = Java.type("java.nio.file.Files"),
        CertificateFactory = Java.type("java.security.cert.CertificateFactory"),
        JavaString = Java.type("java.lang.String"),
        ByteArrayInputStream = Java.type("java.io.ByteArrayInputStream"),
        TrustManagerFactory = Java.type("javax.net.ssl.TrustManagerFactory"),
        SSLContext = Java.type("javax.net.ssl.SSLContext")
    let keyStore = KeyStore.getInstance(KeyStore.getDefaultType())
    let ksPath = Paths.get(System.getProperty("java.home"), "lib", "security", "cacerts")
    keyStore.load(Files.newInputStream(ksPath), new JavaString("changeit").toCharArray())
    let cf = CertificateFactory.getInstance("X.509")
    for (let i of certificates) {
        let pathStr = `${Config.modulesFolder}/${Data.modulePrefixU}/certs/${i}`
        let path = Paths.get(pathStr)
        let data = Files.readAllBytes(path)
        let cert = cf.generateCertificate(new ByteArrayInputStream(data))
        keyStore.setCertificateEntry("dev.semisol.letsencryptsupport:" + i, cert)
    }
    let tmf = TrustManagerFactory.getInstance(TrustManagerFactory.getDefaultAlgorithm())
    tmf.init(keyStore)
    let sslContext = SSLContext.getInstance("TLS")
    sslContext.init(null, tmf.getTrustManagers(), null)
    SSLContext.setDefault(sslContext)
    socketFactory = sslContext.getSocketFactory()
}
LoadCertificates()

function GetPlayerProfilesFromUUID(playerUUID, playerUsername, playerRank, bypass = false, printAll = false)
{
    playerUUID = playerUUID.toString().replaceAll("-", "").toLowerCase()

    if (!bypass)
    {
        if (allScannedPlayers.has(playerUUID))
        {
            return
        }
    }
    newlyScannedPlayers.push(playerUUID)

    let apiKey = GetRandomAPIKey()
    if (!apiKey)
    {
        return
    }

    let selfErrorMessage = false
    request({
        url: `https://api.hypixel.net/v2/skyblock/profiles?uuid=${playerUUID}&key=${apiKey}`,
        json: true
    }).then(playerInfo => {
        if (playerInfo.status == 403)
        {
            selfErrorMessage = true
            throw new Error("&cInvalid API key.");
        }
        else if (playerInfo.status == 429)
        {
            selfErrorMessage = true
            throw new Error("&cAPI Key Rate limited.");
        }
        else if (playerInfo.status == 422)
        {
            selfErrorMessage = true
            throw new Error("&cInvalid player UUID.");
        }

        if (playerInfo["success"] == true)
        {
            if (!allScannedPlayers.has(playerUUID))
            {
                allScannedPlayers.add(playerUUID)
            }

            HandlePlayerProfile(playerUUID, playerUsername, playerRank, playerInfo, bypass, printAll)
        }
        else
        {
            Utils.ChatLog("Failed to get player info.")
        }
    }).catch(error => {
        // Utils.ChatLog("ERROR", error, error.stack)

        if (selfErrorMessage)
        {
            Utils.ChatLog(error.message)
            return
        }
        let errorCause = error.cause
        let errorCauseLower = errorCause.toLowerCase()

        let fancyColor = GetFancyChatColorPrefix("&c")
        Utils.ChatLog(`${fancyColor}Unexpected Error: \`&6${errorCause}${fancyColor}\` using API key #${Data.data.apiKeys.indexOf(apiKey)} \`&6${apiKey}${fancyColor}\``)

        if (errorCauseLower.includes("invalid api key") || errorCauseLower.includes("daily developer"))
        {
            let keyIndex = Data.data.apiKeys.indexOf(apiKey)
            if (keyIndex == -1) return

            if (Data.data.apiKeys[keyIndex] != apiKey) return
            let fancyColor2 = GetFancyChatColorPrefix("&a")
            Utils.ChatLog(`${fancyColor2}Automatically removed API key #${keyIndex} \`&6${apiKey}${fancyColor2}\`.`)
            Data.data.apiKeys.splice(keyIndex, 1)
            Data.data.save()
            Utils.ChatLog(`${fancyColor2}API keys remaining: ${Data.data.apiKeys.length}.`)
        }
    })
}

function GetHexColor(hex)
{
    let split = hex.split("")
    let red = parseInt(`0x${split[0]}${split[1]}`)
    let green = parseInt(`0x${split[2]}${split[3]}`)
    let blue = parseInt(`0x${split[4]}${split[5]}`)
    return [red, green, blue]
}

let colorNamesDictionary = {
    "red": "red",
    "orange": "orange",
    "yellow": "yellow",
    "lime": "lime",
    "lg": "lime",
    "darkgreen": "darkgreen",
    "lightblue": "lightblue",
    "lb": "lightblue",
    "cyan": "cyan",
    "darkblue": "darkblue",
    "db": "darkblue",
    "blue": "darkblue",
    "pink": "pink",
    "purple": "purple",
    "magenta": "magenta",
    "brown": "brown",
    "white": "white",
    "gray": "lightgray",
    "grey": "lightgray",
    "lightgrey": "lightgray",
    "lightgray": "lightgray",
    "darkgrey": "darkgray",
    "darkgray": "darkgray",
    "black": "black",
    "trueblack": "trueblack",

    "mint": "mint",
    "truemint": "mint",
    "navy": "navy",
    "truenavy": "navy"
}
function GetHexFromColorName(colorName)
{
    pureHexList = {
        "red": "993333",
        "orange": "D87F33",
        "yellow": "E5E533",
        "lime": "7FCC19",
        "darkgreen": "667F33",
        "lightblue": "6699D8",
        "cyan": "4C7F99",
        "darkblue": "334CB2",
        "pink": "F27FA5",
        "purple": "7F3FB2",
        "magenta": "B24CD8",
        "brown": "664C33",
        "white": "FFFFFF",
        "lightgray": "999999",
        "darkgray": "4C4C4C",
        "black": "191919",
        "mint": "86D28D",
        "navy": "263265",
        "trueblack": "000000",
    }

    if (colorNamesDictionary.hasOwnProperty(colorName))
    {
        colorName = colorNamesDictionary[colorName]
    }

    if (pureHexList.hasOwnProperty(colorName))
    {
        return pureHexList[colorName]
    }
    return null
}

function CheckIfOnPrivateIsland()
{
    let scoreboardLines = Scoreboard.getLines(false)

    if (scoreboardLines.length == 0) return;
    onPrivateIsland = 1

    scoreboardLines.forEach(line => {
        line = ChatLib.removeFormatting(line).trim()

        if (line.includes("✌") || line.includes("??? Island"))
        {
            onPrivateIsland = 2
            return
        }
        else if (line.includes("Your Island") || line.includes("Your Isla⚽nd"))
        {
            onPrivateIsland = 2
            return
        }
    })
}

let testArmorStandDelay = 0
let testArmorStandDelayMax = 1 * 20

let islandScannedEntityLocations = []
let tracerPlayerNames = []
let tracerItemLocations = []

// 0 = not checked, 1 = checked and not on private island, 2 = checked and on private island
let onPrivateIsland = 0

function GetHexMarkerData(item)
{
    let soulBound = item["Soulbound"] ? " - Soulbound" : ""
    let hexString = item["hexCode"]
    let itemId = item["ItemID"]
    let hexMarker = ""

    let isLegacyReforge = false
    let legacyReforgeString = ""

    if (crystalHexes.includes(`#${hexString}`) && !itemId.includes("CRYSTAL_"))
    {
        hexMarker = "&fCrystal"
    }
    else if (fairyHexes.includes(`#${hexString}`))
    {
        let itemType = item["ItemType"]
        
        if (!itemId.includes("FAIRY_"))
        {
            hexMarker = "&dFairy"
        }

        if (ogFairyHexes.hasOwnProperty(`#${hexString}`))
        {
            if (ogFairyHexes[`#${hexString}`].includes(`${GetArmorTypeFromItemType(itemType)}`))
            {
                hexMarker = "&bOG Fairy"
            }
        }
    }
    
    if (item["Reforge"])
    {
        let reforgeData = item["Reforge"]
        if (reforgeData != null)
        {
            if (!Utils.isNullOrUndefined(legacyReforgeList[`${reforgeData.toLowerCase()}`]))
            {
                isLegacyReforge = true
                // legacyReforgeString = UpdateLegacyReforgeName(reforgeData)
                // itemId = `${legacyReforgeString.toUpperCase()}_${itemId}`
            }
        }
    }

    (function() {
        let newItemID = RemoveReforgeFromItemID(itemId)
        if (defaultArmorColors.hasOwnProperty(`${newItemID}`))
        {
            if (crystalHexes.includes(`#${hexString}`) || fairyHexes.includes(`#${hexString}`)) return;

            let armorColor = defaultArmorColors[`${newItemID}`]["hexCode"]
            let itemName = item["ItemName"]

            if (`#${hexString}` == armorColor) return
            if (itemName.includes("✿")) return;
            if (dyesHexes.includes(`#${hexString}`)) return;

            hexMarker = "&6Exotic"
        }
    }())

    if (hexString == "-1")
    {
        hexMarker = "&7Bleached"
        hexString = "_"
    }

    if (isLegacyReforge)
    {
        let hexMarkerExtra = (hexMarker == "") ? "" : "&7, "

        legacyReforgeString = UpdateLegacyReforgeName(legacyReforgeString.toUpperCase())
        hexMarker += `${hexMarkerExtra}&9Legacy ${legacyReforgeString.toUpperCase()}`
    }

    hexMarker = hexMarker.trim()
    let hexCode = ""
    if (hexString == "_")
    {
        hexCode = ` - &a(${hexMarker}&a)`
    }
    else if (hexString)
    {
        hexCode = ` - #${hexString} &a(${hexMarker}&a)`
    }

    return {
        "hexCode": hexCode,
        "ItemID": itemId,
        "Soulbound": soulBound
    }
}

register('command', (...args) => {
    if (!(Utils.isNullOrUndefined(args) || !args[0]))
    {
        let arg1 = args[0].toLowerCase()
        if (arg1 == "help")
        {
            let fancyColor = GetFancyChatColorPrefix("&a")
            let fancyColor2 = GetFancyChatColorPrefix("&6")

            Utils.ChatLog(`${fancyColor2}AutoRatter Help:`)
            Utils.ChatLog(`${fancyColor}/lobbyscanner &7- ${fancyColor}Opens the lobby scanner GUI.`)
            Utils.ChatLog(`${fancyColor}/scanlobby &7- ${fancyColor}Lists all players in the lobby.`)
            Utils.ChatLog(`${fancyColor}/warphotkey &7<&bclear&7, &bset&7, &blist&7, &bremove&7> &7<&bindex&7> &7[&bcommand&7] &7- ${fancyColor}Manages warp hotkeys.`)
            Utils.ChatLog(`${fancyColor}/scannerkey &7<&badd&7, &bremove&7, &blist&7> &7<&bkey&7> &7- ${fancyColor}Manages API keys.`)
            Utils.ChatLog(`${fancyColor}/scanplayer &7<&bplayername> &7- ${fancyColor}Scans a player.`)
            // Utils.ChatLog(`${fancyColor}/scanplayeruuid &7<&bplayeruuid> &7- ${fancyColor}Scans a player by UUID.`)
            Utils.ChatLog(`${fancyColor}/itemblacklist &7<&badd&7, &bremove&7, &blist&7> [&bitemid&7] &7- ${fancyColor}Manages item blacklist.`)
            Utils.ChatLog(`${fancyColor}/itemwhitelist &7<&badd&7, &bremove&7, &blist&7> [&bitemid&7] &7- ${fancyColor}Manages item whitelist.`)
            return
        }
    }
    Settings.openGUI();
}).setName("lobbyscanner").setAliases(["autoratter"]);

register('command', () => {
    ListAllPlayers();
}).setName("scanlobby");

let lastAllRequestedPlayer = ""
register('command', (...args) => {
    let fancyColor = GetFancyChatColorPrefix("&c");
    if (Utils.isNullOrUndefined(args) || !args[0])
    {
        Utils.ChatLog(`${fancyColor}Invalid player UUID.`)
        return
    }
    let playerUUID = args[0]

    if (lastAllRequestedPlayer == playerUUID)
    {
        ChatLib.command(`friend ${playerUUID}`, false)
        ChatLib.command(`party ${playerUUID}`, false)
        ChatLib.command(`invite ${playerUUID}`, false)
        ChatLib.command(`msg ${playerUUID}`, false)

        let fancyColor2 = GetFancyChatColorPrefix("&a")
        Utils.ChatLog(`${fancyColor2}Sending all requests.`)
        return
    }
    Utils.ChatLog(`${fancyColor}Click the button again to confirm.`)
    lastAllRequestedPlayer = playerUUID
}).setName("sendallrequests");

register('command', (...args) => {
    let fancyColor = GetFancyChatColorPrefix("&c");
    let fancyColor2 = GetFancyChatColorPrefix("&a")
    if (Utils.isNullOrUndefined(args) || !args[0])
    {
        Utils.ChatLog(`${fancyColor}Invalid command. Usage: /warphotkey <[clear, set, list, remove]>`)
        return
    }
    else if (args[0] == "clear")
    {
        Data.data.warpHotkeys = ["", "", "", "", "", "", "", "", ""]
        Data.data.save()
        Utils.ChatLog(`${fancyColor2}Cleared warp hotkeys.`)
        return
    }
    else if (args[0] == "list")
    {
        let validWarpHotkeys = []

        let i = 0
        Data.data.warpHotkeys.forEach(warpHotkey => {
            i++
            if (warpHotkey == "") return
            validWarpHotkeys.push([i, warpHotkey])
        })

        if (validWarpHotkeys.length == 0)
        {
            Utils.ChatLog(`${fancyColor}No warp hotkeys.`)
            return
        }
        let fancyColor3 = GetFancyChatColorPrefix("&6")
        Utils.ChatLog(`${fancyColor2}Warp Hotkeys:`)
        validWarpHotkeys.forEach(warpHotkey => {
            Utils.ChatLog(`   ${fancyColor3}Hotkey #${warpHotkey[0]} -> /${warpHotkey[1]}`)
        })
        return
    }
    else if (args[0] == "set")
    {
        if (!args[1])
        {
            Utils.ChatLog("&cInvalid hotkey index. Usage: /warphotkey set <index [1-9]> <warpcommand>")
            return
        }
        if (!args[2])
        {
            Utils.ChatLog("&cInvalid warp command. Usage: /warphotkey set <index [1-9]> <warpcommand>")
            return
        }
        let keyIndex = parseInt(args[1])

        let warpArgs = args.slice(2)
        let warpCommand = warpArgs.join(" ").replace("/", "")
        Data.data.warpHotkeys[keyIndex - 1] = warpCommand
        Data.data.save()

        Utils.ChatLog(`${fancyColor2}Set warp hotkey #${keyIndex}: &a/${warpCommand}`)
        return
    }
    else if (args[0] == "remove")
    {
        if (!args[1])
        {
            Utils.ChatLog("&cInvalid hotkey index. Usage: /warphotkey remove <index [1-9]>")
            return
        }
        let keyIndex = parseInt(args[1])

        Utils.ChatLog(`${fancyColor2}Removed warp hotkey #${keyIndex}: &c/${Data.data.warpHotkeys[keyIndex - 1]}`)

        Data.data.warpHotkeys[keyIndex - 1] = ""
        Data.data.save()
        return
    }
    else if (args[0] == "activate")
    {
        if (!args[1])
        {
            Utils.ChatLog("&cInvalid hotkey index. Usage: /warphotkey activate <index [1-9]>")
            return
        }
        let keyIndex = parseInt(args[1])
        let warpCommand = Data.data.warpHotkeys[keyIndex - 1]
        if (warpCommand === "")
        {
            Utils.ChatLog(`&cNo warp command set for hotkey #${keyIndex}.`)
            return
        }

        Utils.ChatLog(`${fancyColor2}Activating warp hotkey #${keyIndex}: &a/${warpCommand}`)
        ChatLib.command(warpCommand)
        return
    }
    else
    {
        Utils.ChatLog(`${fancyColor}Invalid command. Usage: /warphotkey <[clear, set, list, remove]>`)
    }
}).setName("warphotkey");

register('command', (...args) => {
    let fancyColor = GetFancyChatColorPrefix("&c");
    let fancyColor2 = GetFancyChatColorPrefix("&a")
    if (Utils.isNullOrUndefined(args || !args[0]))
    {
        ChatLib.command("scannerkey list", true)
        return
    }
    else if (args[0] == "clear")
    {
        Data.data.apiKeys = []
        Data.data.save()
        
        Utils.ChatLog(`${fancyColor2}Cleared API keys.`)
        return
    }
    else if (args[0] == "list")
    {
        if (Data.data.apiKeys.length == 0)
        {
            Utils.ChatLog(`${fancyColor}No API keys.`)
            return
        }

        let fancyColor3 = GetFancyChatColorPrefix("&6")
        Utils.ChatLog(`${fancyColor2}API Keys:`)
        let i = -1
        Data.data.apiKeys.forEach(apiKey => {
            i++
            Utils.ChatLog(`   ${fancyColor3}API Key #${i} -> ${apiKey}`)
        })
        return
    }
    else if (args[0] == "set")
    {
        if (!args[1])
        {
            Utils.ChatLog("&cInvalid key index. Usage: /scannerkey set <index> <key>")
            return
        }
        if (!args[2])
        {
            Utils.ChatLog("&cInvalid key. Usage: /scannerkey set <index> <key>")
            return
        }
        let keyIndex = parseInt(args[1])
        let apiKey = args[2]
        Data.data.apiKeys[keyIndex] = apiKey
        Data.data.save()

        Utils.ChatLog(`${fancyColor2}Set key #${keyIndex}: ${apiKey}`)
        return
    }
    else if (args[0] == "remove")
    {
        if (!args[1])
        {
            Utils.ChatLog("&cInvalid key index. Usage: /scannerkey remove <index>")
            return
        }
        let keyIndex = parseInt(args[1])
        Data.data.apiKeys.splice(keyIndex, 1)
        Data.data.save()
        Utils.ChatLog(`${fancyColor2}Removed key #${keyIndex}`)
        return
    }
    else if (args[0] == "add")
    {
        if (!args[1])
        {
            Utils.ChatLog("&cInvalid key. Usage: /scannerkey add <key>")
            return
        }
        let apiKey = args[1]
        Data.data.apiKeys.push(apiKey)
        Data.data.save()
        Utils.ChatLog(`${fancyColor2}Added key: ${apiKey}`)
        return
    }
    else if (args[0] == "validate")
    {
        let playerUUID = "4f6848b0b95341758abdbad2d1bf0206" // my uuid

        if (Data.data.apiKeys.length == 0)
        {
            Utils.ChatLog(`${fancyColor}No API keys.`)
            return
        }

        Data.data.apiKeys.forEach(apiKey => {
            request({
                url: `https://api.hypixel.net/v2/status?uuid=${playerUUID}&key=${apiKey}`,
                headers: {
                    "User-Agent": "Mozilla/5.0 (ChatTriggers)",
                    'Content-Type': 'application/json'
                },
                json: true
            }).then(keyInfo => {
                if (keyInfo.hasOwnProperty("success"))
                {
                    let i = Data.data.apiKeys.indexOf(apiKey)
                    Utils.ChatLog(`${fancyColor2}Request Success: ${i} | ${apiKey} | ${keyInfo["success"]}`)
                }
            }).catch(error => {
                if (error.hasOwnProperty("cause"))
                {
                    let i = Data.data.apiKeys.indexOf(apiKey)
                    Utils.ChatLog(`${fancyColor}Request Failed: ${i} | ${apiKey} | ${JSON.stringify(error)}`)
                }
            })
        })
        return
    }
    else
    {
        Utils.ChatLog("&cInvalid command.")
    }
}).setName("scannerkey");

function ManuallyScanPlayer(playerDataToScan)
{
    request({
        url: `https://crafthead.net/profile/${playerDataToScan}`,
        headers: {
            "User-Agent": "Mozilla/5.0 (ChatTriggers)",
            'Content-Type': 'application/json'
        },
        json: true
    }).then(playerInfo => {
        if (playerInfo.hasOwnProperty("name"))
        {
            let playerUsername = playerInfo["name"]
            let playerUUID = playerInfo["id"]
            GetPlayerProfilesFromUUID(playerUUID, playerUsername, "", true, true)
        }
    }).catch(error => {
        Utils.ChatLog("ERROR", JSON.stringify(error), error.stack)
    })
}

register('command', (...args) => {
    if (Utils.isNullOrUndefined(args) || !args[0])
    {
        Utils.ChatLog("&cNo arguments provided. Usage: /scanplayer <playername>")
        return
    }
    let playerName = args[0].replace("-", "").toLowerCase().trim()
    ManuallyScanPlayer(playerName)
}).setName("scanplayer");

register('command', (...args) => {
    if (Utils.isNullOrUndefined(args) || !args[0])
    {
        Utils.ChatLog("&cNo arguments provided. Usage: /offpurechecker <hex1> <hex2>")
        return
    }

    let realHex = args[0]
    let pureHex = args[1]

    if (colorNamesDictionary.hasOwnProperty(realHex))
    {
        realHex = GetHexFromColorName(realHex)
    }
    if (colorNamesDictionary.hasOwnProperty(pureHex))
    {
        pureHex = GetHexFromColorName(pureHex)
    }

    let realColor = GetHexColor(realHex)
    let pureColor = GetHexColor(pureHex)

    let redOff = Math.abs(realColor[0] - pureColor[0])
    let greenOff = Math.abs(realColor[1] - pureColor[1])
    let blueOff = Math.abs(realColor[2] - pureColor[2])
    let totalOff = redOff + greenOff + blueOff

    Utils.ChatLog(`&7Given: &c${realColor.toString().replaceAll(",", ", ")} (#${realHex.toUpperCase()})`)
    Utils.ChatLog(`&7Pure: &a${pureColor.toString().replaceAll(",", ", ")} (#${pureHex.toUpperCase()})`)
    Utils.ChatLog(`&7Off: &e${totalOff}`)
}).setName("offpurechecker");

register('command', (...args) => {
    if (Utils.isNullOrUndefined(args) || !args[0])
    {
        ChatLib.command("itemblacklist list", true)
        return
    }
    else if (args[0] == "clear")
    {
        Data.data.itemBlacklist = []
        Data.data.save()
        let fancyColor = GetFancyChatColorPrefix("&a")
        Utils.ChatLog(`${fancyColor}Cleared Item Blacklist.`)
        return
    }
    else if (args[0] == "list")
    {
        if (Data.data.itemBlacklist.length == 0)
        {
            let fancyColor = GetFancyChatColorPrefix("&c")
            Utils.ChatLog(`${fancyColor}No Blacklisted Items.`)
            return
        }

        let fancyColor = GetFancyChatColorPrefix("&a")
        let fancyColor2 = GetFancyChatColorPrefix("&6")
        Utils.ChatLog(`${fancyColor}Blacklisted Items:`)
        let i = -1
        Data.data.itemBlacklist.forEach(item => {
            i++
            Utils.ChatLog(`   ${fancyColor2}Item #${i} -> ${item.toUpperCase()}`)
        })
        return
    }
    else if (args[0] == "remove")
    {
        if (!args[1])
        {
            Utils.ChatLog("&cInvalid item. Usage: /itemblacklist remove <item>")
            return
        }
        let itemID = args[1].toUpperCase()
        if (!Data.data.itemBlacklist.includes(itemID.toUpperCase()))
        {
            Utils.ChatLog("&cItem not found in blacklist.")
            return
        }

        let keyIndex = Data.data.itemBlacklist.indexOf(itemID.toUpperCase())
        Data.data.itemBlacklist.splice(keyIndex, 1)
        Data.data.save()
        let fancyColor = GetFancyChatColorPrefix("&a")
        Utils.ChatLog(`${fancyColor}Removed blacklisted item: ${itemID.toUpperCase()}`)
        return
    }
    else if (args[0] == "add")
    {
        if (!args[1])
        {
            Utils.ChatLog("&cInvalid item. Usage: /itemblacklist add <item>")
            return
        }
        let itemId = args[1].toUpperCase()

        Data.data.itemBlacklist.push(itemId)
        Data.data.save()
        let fancyColor = GetFancyChatColorPrefix("&a")
        Utils.ChatLog(`${fancyColor}Added Blacklisted item: ${itemId}`)
        return
    }
    else
    {
        ChatLib.command(`itemblacklist add ${args[0]}`, true)
    }
}).setName("itemblacklist");
register('command', (...args) => {
    if (Utils.isNullOrUndefined(args) || !args[0])
    {
        ChatLib.command("itemwhitelist list", true)
        return
    }
    else if (args[0] == "clear")
    {
        Data.data.itemWhitelist = []
        Data.data.save()
        let fancyColor = GetFancyChatColorPrefix("&a")
        Utils.ChatLog(`${fancyColor}Cleared Item Whitelist.`)
        return
    }
    else if (args[0] == "list")
    {
        if (Data.data.itemWhitelist.length == 0)
        {
            let fancyColor = GetFancyChatColorPrefix("&c")
            Utils.ChatLog(`${fancyColor}No Whitelisted Items.`)
            return
        }

        let fancyColor = GetFancyChatColorPrefix("&a")
        let fancyColor2 = GetFancyChatColorPrefix("&6")
        Utils.ChatLog(`${fancyColor}Whitelisted Items:`)
        let i = -1
        Data.data.itemWhitelist.forEach(item => {
            i++
            Utils.ChatLog(`   ${fancyColor2}Item #${i} -> ${item.toUpperCase()}`)
        })
        return
    }
    else if (args[0] == "remove")
    {
        if (!args[1])
        {
            Utils.ChatLog("&cInvalid item. Usage: /itemwhitelist remove <item>")
            return
        }
        let itemID = args[1]
        if (!Data.data.itemWhitelist.includes(itemID.toUpperCase()))
        {
            Utils.ChatLog("&cItem not found in whitelist.")
            return
        }

        let keyIndex = Data.data.itemWhitelist.indexOf(itemID.toUpperCase())
        Data.data.itemWhitelist.splice(keyIndex, 1)
        Data.data.save()
        let fancyColor = GetFancyChatColorPrefix("&a")
        Utils.ChatLog(`${fancyColor}Removed whitelisted item: ${itemID.toUpperCase()}`)
        return
    }
    else if (args[0] == "add")
    {
        if (!args[1])
        {
            Utils.ChatLog("&cInvalid item. Usage: /itemwhitelist add <item>")
            return
        }
        let itemId = args[1].toUpperCase()

        Data.data.itemWhitelist.push(itemId)
        Data.data.save()
        let fancyColor = GetFancyChatColorPrefix("&a")
        Utils.ChatLog(`${fancyColor}Added Whitelisted item: ${itemId}`)
        return
    }
    else
    {
        ChatLib.command(`itemwhitelist add ${args[0]}`, true)
    }
}).setName("itemwhitelist");

register('command', (playerName) => {
    if (Utils.isNullOrUndefined(playerName))
    {
        Utils.ChatLog("&cNo arguments provided. Usage: /lobbytracer <playername>")
        return
    }

    tracerPlayerNames.push(ChatLib.removeFormatting(playerName).toLowerCase())

    let fancyColor = GetFancyChatColorPrefix("&a")
    Utils.ChatLog(`${fancyColor}Added '&b${playerName}${fancyColor}' to tracer list.`)
}).setName("lobbytracer");

function ColorToInt(r, g, b)
{
	return r * 65536 + g * 256 + b
}

function DrawEntityNametag(entity, colorList, scale)
{
    let entityName = entity.getName()
    let x = entity.getX()
    let y = entity.getY() + entity.getHeight() + 0.75
    let z = entity.getZ()

    DrawText(entityName, x, y, z, colorList, scale)
}
function DrawText(text, x, y, z, colorList, scale)
{
    Tessellator.drawString(
        text,
        x,
        y,
        z,
        ColorToInt(colorList[0], colorList[1], colorList[2]),
        false,
        scale / 50,
        false
    )
}
function DrawTracerEntity(entity, colorList, scale, partialTicks)
{
	let x = entity.getLastX() + (entity.getX() - entity.getLastX()) * partialTicks;
	let y = entity.getLastY() + (entity.getY() - entity.getLastY()) * partialTicks;
	let z = entity.getLastZ() + (entity.getZ() - entity.getLastZ()) * partialTicks;

	DrawTracerPosition(x, y + entity.getHeight() / 2, z, scale, colorList);
}
function DrawTracerPosition(x, y, z, scale, colorList)
{
    let r = colorList[0]
    let g = colorList[1]
    let b = colorList[2]

    GL11.glPushMatrix() // GlStateManager.func_179094_E() // PushMatrix?
    GL11.glEnable(GL11.GL_LINE_SMOOTH)
    GL11.glDisable(GL11.GL_DEPTH_TEST)
    GL11.glDisable(GL11.GL_TEXTURE_2D)
    GL11.glDepthMask(false)
    GL11.glBlendFunc(770, 771) // GL11.glBlendFunc(GL11.GL_SRC_ALPHA, GL11.GL_ONE_MINUS_SRC_ALPHA);
    GL11.glEnable(GL11.GL_BLEND)
    GL11.glLineWidth(scale)

    const currentX = Player.getX();
    const currentY = Player.getY();
    const currentZ = Player.getZ();

    x = x - currentX;
    y = y - currentY;
    z = z - currentZ;

    GL11.glColor3f(colorList[0] / 255, colorList[1] / 255, colorList[2] / 255)
    
    GL11.glBegin(GL11.GL_LINE_LOOP);
    
    GL11.glVertex3d(x, y, z);
    GL11.glVertex3d(0, 1.5, 0);

    GL11.glEnd();
    
    GL11.glDisable(GL11.GL_BLEND)
    GL11.glDepthMask(true)
    GL11.glEnable(GL11.GL_TEXTURE_2D)
    GL11.glEnable(GL11.GL_DEPTH_TEST)
    GL11.glDisable(GL11.GL_LINE_SMOOTH)
    GL11.glPopMatrix() // GlStateManager.func_179121_F() // PopMatrix?
}

function DrawBoxEntity(entity, colorList, scale, partialTicks)
{
	let width = entity.getWidth() * 1.25;
	let height = entity.getHeight() * 1;

    let entityX = entity.getX()
    let entityY = entity.getY()
    let entityZ = entity.getZ()

    let x = entityX + (entityX - entity.getLastX()) * partialTicks
    let y = entityY + (entityY - entity.getLastY()) * partialTicks
    let z = entityZ + (entityZ - entity.getLastZ()) * partialTicks

    DrawBoxHollow(x, y, z, width, height, scale, colorList)
}
function DrawBoxHollow(x, y, z, width, height, scale, colorList)
{
    let halfWidth = width / 2
    let centerObject = RenderLibV2.calculateCenter(x - halfWidth, y, z - halfWidth, x + halfWidth, y + height, z + halfWidth);

    DrawCenteredBoxHollow(
        centerObject.cx, centerObject.cy, centerObject.cz,
        centerObject.wx, centerObject.h, centerObject.wz,
        scale, colorList
    )
}
function DrawCenteredBoxHollow(x, y, z, xSize, ySize, zSize, scale, colorList)
{
    let r = colorList[0]
    let g = colorList[1]
    let b = colorList[2]
    let a = 1

    RenderLibV2.drawEspBoxV2(
        x, y, z,
        xSize, ySize, zSize,
        r, g, b, a,
        true, scale)
}

register("renderWorld", (ticks) => {
    let shouldLobbyScan = false
    let shouldTracerScan = false
    if (Settings.toggleIslandScanning)
    {
        shouldLobbyScan = true

        if (onPrivateIsland == 0)
        {
            CheckIfOnPrivateIsland()
        }
        if (onPrivateIsland == 1)
        {
            shouldLobbyScan = false
        }
    
        if (testArmorStandDelay < testArmorStandDelayMax)
        {
            testArmorStandDelay += ticks
            shouldLobbyScan = false
        }
        else
        {
            testArmorStandDelay = 0
        }
    }

    if (tracerPlayerNames.length > 0)
    {
        shouldTracerScan = true
    }

    let validClassList = []
    if (shouldTracerScan)
    {
        validClassList.push("entityotherplayermp")
    }
    if (shouldLobbyScan)
    {
        validClassList.push("entityarmorstand")
        validClassList.push("entityitemframe")
        validClassList.push("entityitem")
    }

    if (tracerItemLocations.length > 0 && Settings.toggleScannedItemsTracers)
    {
        tracerItemLocations.forEach(tracerItemLocation => {
            let itemLocation = tracerItemLocation["ItemLocation"]
            let itemID = tracerItemLocation["ItemID"]

            let x = parseInt(itemLocation[0]) - 0.5
            let y = parseInt(itemLocation[1]) - 1
            let z = parseInt(itemLocation[2])

            let colorData = Utils.GetColorDataFromIndex(Settings.scannedItemColor)
            let colorList = colorData["ColorList"]

            DrawBoxHollow(x, y, z, 1, 1, 5, colorList)
            DrawTracerPosition(x, y, z, 5, colorList)
            DrawText(itemID, x, y + 1.5, z, colorList, 3)
        })
    }

    if (shouldTracerScan || shouldLobbyScan)
    {
        let valuableItemList = []

        World.getAllEntities().filter(entity => {
            return validClassList.includes(ChatLib.removeFormatting(entity.getName()).toLowerCase()) || validClassList.includes(entity.getClassName().toLowerCase())
        }).forEach(entity => {
            let className = entity.getClassName().toLowerCase()
    
            if (className == "entityotherplayermp")
            {
                let playerName = ChatLib.removeFormatting(entity.getName()).toLowerCase()
                if (!tracerPlayerNames.includes(playerName))
                {
                    return
                }
    
                let colorData = Utils.GetColorDataFromIndex(Settings.playerTracerColor)
                let colorList = colorData["ColorList"]

                DrawBoxEntity(entity, colorList, Settings.hitboxScale, ticks)
                DrawTracerEntity(entity, colorList, Settings.tracerScale, ticks)
                DrawEntityNametag(entity, colorList, Settings.nameScale)
                return
            }

            let entityX = entity.getX().toFixed(0)
            let entityY = entity.getY().toFixed(0)
            let entityZ = entity.getZ().toFixed(0)

            let itemLocation = [entityX, entityY, entityZ]
            let itemLocationString = itemLocation.join(",")
    
            if (islandScannedEntityLocations.includes(itemLocationString))
            {
                return
            }
            islandScannedEntityLocations.push(itemLocationString)
    
            javaEntity = entity.getEntity()
    
            let entityType = ""
    
            let validItemList = []
    
            if (className == "entityitemframe")
            {
                entityType = "Item Frame"
                try
                {
                    let displayedItem = javaEntity.func_82335_i()
                    let itemName = displayedItem.func_82833_r()
    
                    validItemList.push(displayedItem)
                }
                catch (e) {}
            }
            else if (className == "entityarmorstand")
            {
                entityType = "Armor Stand"
    
                let weaponItem = javaEntity.func_71124_b(0)
                let helmetItem = javaEntity.func_71124_b(1)
                let chestplateItem = javaEntity.func_71124_b(2)
                let leggingsItem = javaEntity.func_71124_b(3)
                let bootsItem = javaEntity.func_71124_b(4)
    
                try {
                    weaponName = weaponItem.func_82833_r()
                    validItemList.push(weaponItem)
                } catch (e) {}
    
                try {
                    helmetName = helmetItem.func_82833_r()
                    validItemList.push(helmetItem)
                } catch (e) {}
    
                try {
                    chestplateName = chestplateItem.func_82833_r()
                    validItemList.push(chestplateItem)
                } catch (e) {}
    
                try {
                    leggingsName = leggingsItem.func_82833_r()
                    validItemList.push(leggingsItem)
                } catch (e) {}
    
                try {
                    bootsName = bootsItem.func_82833_r()
                    validItemList.push(bootsItem)
                } catch (e) {}
            }
            else if (className == "entityitem")
            {
                entityType = "Showcase Block"
                try
                {
                    let displayedItem = javaEntity.func_92059_d()
                    let itemName = displayedItem.func_82833_r()
    
                    validItemList.push(displayedItem)
                }
                catch (e) {}
            }
    
            let itemList = []
            if (validItemList.length > 0)
            {
                validItemList.forEach((item) => {
                    let itemNBT = item.func_77978_p()
                    let itemType = item.func_77973_b().func_77653_i(item)
    
                    if (Utils.isNullOrUndefined(itemNBT)) return
    
                    let itemData = GetItemDataFromNBT(itemNBT, true)
                    if (Utils.isNullOrUndefined(itemData)) return
    
                    itemData["ItemType"] = itemType

                    itemList.push(itemData)
                })
            }
            else return
            
            GetValuablePlayerItems({'ItemList': itemList}).forEach(item => {
                valuableItemList.push({"Item": item, "EntityType": entityType, "ItemLocation": itemLocation})
            })
            // ! make nulls work scan zapt_x
        });

        valuableItemList.forEach(valuableItem => {
            let item = valuableItem["Item"]
            let entityType = valuableItem["EntityType"]
            let itemLocation = valuableItem["ItemLocation"]

            tracerItemLocations.push({"ItemLocation": itemLocation, "ItemID": item["ItemID"]})

            let hexData = GetHexMarkerData(item)
            let hexCode = hexData["hexCode"]
            let itemId = hexData["ItemID"]
            let soulbound = hexData["Soulbound"]
            Utils.ChatLog(`&a${itemId}${hexCode}${soulbound}_${entityType}_${itemLocation}`)
        })
    }
})

let isScanning = false
register("worldLoad", () => {
    islandScannedEntityLocations = []
    tracerPlayerNames = []
    tracerItemLocations = []
    onPrivateIsland = 0

    if (!Settings.toggleLobbyScanning) return

    if (isScanning) return
    isScanning = true

    new Thread(() => {
        Thread.sleep(1 * 1000)
        ListAllPlayers()
        isScanning = false
    }).start();
})

register("gameUnload", () => {
    ;
	Data.data.save();
    SaveAll()
});

register("step", () => SaveAll()).setDelay(60 * 2)