import {MinerSettings} from "./miner-settings";
import {TypedJSON} from "typedjson";


export function minerSettingsToJson(settings: MinerSettings): string {
    return new TypedJSON(MinerSettings).stringify(settings);
}

export function minerSettingsFromJson(json: string): MinerSettings {
    const deserialized = new TypedJSON(MinerSettings).parse(json);
    if (deserialized == null) {
        alert("Fehler beim Parsen der Miner-Settings,\n" +
            "setze auf Default-Settings zurück.")
        return new MinerSettings();
    }
    return deserialized;
}

