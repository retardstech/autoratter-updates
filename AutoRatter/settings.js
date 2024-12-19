import { @Vigilant, @CheckboxProperty, @ButtonProperty, @SliderProperty, Color, @ColorProperty, @TextProperty, @SelectorProperty } from 'Vigilance';
import * as Utils from "./utils";    

@Vigilant("With love, from dizzyyss")
class Settings {
    @CheckboxProperty({
        name: 'Toggle Lobby Scanning',
        description: 'Toggles lobby scanning, requires API keys to be loaded.',
        category: 'General',
        subcategory: "Lobby Scanning",
    })
    toggleLobbyScanning = false;
    // @CheckboxProperty({
    //     name: 'Toggle Coop Scanning',
    //     description: 'Toggles coop lobby scanning.',
    //     category: 'General',
    //     subcategory: "Lobby Scanning",
    // })
    // toggleScanningCoopMembers = false;

    @SliderProperty({
        name: "Lobby Scanning Level Cap",
        description: "The maximum level to scan for in the lobby.\n&a0 = No Limit",
        min: 0.0,
        max: 470.0,
        category: 'General',
        subcategory: "Lobby Scanning",
    })
    scanningPlayerLevelCap = 150;

    @CheckboxProperty({
        name: 'Toggle Island Scanning',
        description: 'Toggles scanning of Armor Stands and Item Frames.',
        category: 'General',
        subcategory: "Island Scanning",
    })
    toggleIslandScanning = true;

    @CheckboxProperty({
        name: 'Toggle Fairy And Crystal Scanning',
        description: 'Toggles Fairy/Crystal/Bleached Scanning.',
        category: 'General',
        subcategory: "Scanned Items",
    })
    toggleCrystalScanning = true;

    @CheckboxProperty({
        name: 'Toggle Non Rare Accessory Legacy Scanning',
        description: 'Toggles non rare legacy accessory reforge scanning.',
        category: 'General',
        subcategory: "Scanned Items",
    })
    toggleAccessoryLegacyScanning = false;
    @CheckboxProperty({
        name: 'Toggle Rare Accessory Legacy Scanning',
        description: 'Toggles rare legacy accessory reforge scanning.\nPretty, Simple, etc.',
        category: 'General',
        subcategory: "Scanned Items",
    })
    toggleRareAccessoryLegacyScanning = false;
    @CheckboxProperty({
        name: 'Toggle Armor And Weapon Legacy Scanning',
        description: 'Toggles armor/weapon legacy reforge scanning.',
        category: 'General',
        subcategory: "Scanned Items",
    })
    toggleArmorLegacyScanning = true;
    @CheckboxProperty({
        name: 'Toggle Cake Scanning',
        description: 'Toggles new year cake scanning.',
        category: 'General',
        subcategory: "Scanned Items",
    })
    toggleCakeScanning = true;
    @SliderProperty({
        name: "Cake Year Cap",
        description: "The maximum year to scan for cakes.\n&a0 = No Limit",
        min: 0.0,
        max: 400.0,
        category: 'General',
        subcategory: "Scanned Items",
    })
    cakeYearCap = 50;
    @CheckboxProperty({
        name: 'Toggle Showing Soulbound Items',
        description: 'Toggles whether soulbound items are scanned.',
        category: 'General',
        subcategory: "Scanned Items",
    })
    toggleSoulboundScanning = true;

    @CheckboxProperty({
        name: 'Toggle Showing Old Profiles',
        description: 'Toggles showing old profiles.',
        category: 'Extra Features',
        // subcategory: "Extra Features",
    })
    toggleOldProfileScanning = true;
    @CheckboxProperty({
        name: 'Toggle Showing Ironman Profiles',
        description: 'Toggles showing ironman profiles.',
        category: 'Extra Features',
        // subcategory: "Extra Features",
    })
    toggleIronmanProfileScanning = true;

    @CheckboxProperty({
        name: 'Toggle Scanned Items Display',
        description: 'Toggles tracers, hitboxes, and display names for scanned items.',
        category: 'Render',
    })
    toggleScannedItemsTracers = true;
    @SliderProperty({
        name: 'Hitbox Scale',
        description: 'Controls the scale of hitboxes for scanned island items.',
        category: 'Render',
        min: '1',
        max: '10',
        increment: '1',
    })
    hitboxScale = 5;
    @SliderProperty({
        name: 'Name Scale',
        description: 'Controls the scale of display names for scanned island items.',
        category: 'Render',
        min: '1',
        max: '10',
        increment: '1',
    })
    nameScale = 3;
    @SliderProperty({
        name: 'Tracer Scale',
        description: 'Controls the scale of tracer lines for scanned island items.',
        category: 'Render',
        min: '1',
        max: '10',
        increment: '1',
    })
    tracerScale = 5;

    @SelectorProperty({
        name: 'Island Scanned Item Display Color',
        description: 'Controls the color of scanned items on islands.',
        category: 'Render',
        options: Utils.colorStringArray,
    })
    scannedItemColor = 1;
    @SelectorProperty({
        name: 'Player Tracer Display Color',
        description: 'Controls the color of player tracers.',
        category: 'Render',
        options: Utils.colorStringArray,
    })
    playerTracerColor = 0;

    constructor() {
        this.initialize(this);
    }
}

export default new Settings;
