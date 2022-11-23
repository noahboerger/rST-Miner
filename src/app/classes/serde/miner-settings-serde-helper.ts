import { RstMinerSettings } from '../models/miner-settings/rst-miner-settings';
import { TypedJSON } from 'typedjson';
import { RstMinerDataService } from '../../services/data/rst-miner-data.service';

export function minerSettingsToJson(settings: RstMinerSettings): string {
    return new TypedJSON(RstMinerSettings).stringify(settings);
}

export function minerSettingsFromJson(json: string): RstMinerSettings {
    const deserialized = new TypedJSON(RstMinerSettings).parse(json);
    if (deserialized == null) {
        alert(
            'Fehler beim Parsen der Miner-Settings,\n' +
                'setze auf Default-Settings zurück.'
        );
        return new RstMinerSettings();
    }
    return deserialized;
}

export function readAndUseMinerSettingsFile(
    file: File,
    rstMinerDataService: RstMinerDataService
) {
    let actualFileExtension = (
        file.name.split('.').pop() as string
    ).toLowerCase();
    if ('json' !== actualFileExtension) {
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
