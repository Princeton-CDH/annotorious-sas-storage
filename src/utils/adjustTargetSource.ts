import { Settings } from "../types/Settings";
import { Target } from "../types/V3/Target";

const adjustTargetSource = (target: Target, settings: Settings) => {
    // annotorious sets the target source as a string id;
    // we need to structure it to add canvas/manifest info
    if (typeof target.source == "string") {
        // add manifest id to annotation
        target.source = {
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
}

export default adjustTargetSource;
