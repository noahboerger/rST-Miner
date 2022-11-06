import {MinerSettings} from "./miner-settings";
import {TypedJSON} from "typedjson";
import {RstMinerDataService} from "../../services/data/rst-miner-data.service";


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

export function readAndUseMinerSettingsFile(file: File, rstMinerDataService : RstMinerDataService) {
    let actualFileExtension = (
        file.name.split('.').pop() as string
    ).toLowerCase();
    if ("json" !== actualFileExtension) {
        alert(
            'Only rST-Miner-Settings Files of type .json are currently supported'
        );
        return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
        const fileContent = fileReader.result as string;
        rstMinerDataService.minerSettings = minerSettingsFromJson(fileContent);
    };
    fileReader.readAsText(file);
}

