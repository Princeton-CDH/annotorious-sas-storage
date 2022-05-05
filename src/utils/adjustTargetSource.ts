import { Settings } from "../types/Settings";
import { Source } from "../types/V3/Source";

const adjustTargetSource = (source: Source | string, settings: Settings): Source => {
    // annotorious sets the target source as a string id;
    // we need to structure it to add canvas/manifest info
    if (typeof source == "string") {
        // add manifest id to annotation
        source = {
            // use the configured target (should be canvas id)
            id: settings.target,
            // link to containing manifest
            partOf: {
                id: settings.manifest,
                type: "Manifest",
            },
            type: "Canvas",
        };
    }
    return source;
}

export default adjustTargetSource;
