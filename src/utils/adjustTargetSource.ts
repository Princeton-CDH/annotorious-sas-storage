import { Settings } from "../types/Settings";
import { Source } from "../types/V3/Source";

/**
 * Utility function to change a source string (Annotorious output) into a
 * Source object, in order to to add canvas/manifest info.
 *
 * @param {Source|string} source Source to be adjusted
 * @param {Settings} settings Settings object containing canvas and manifest
 * @returns {Source} Source object with set target and manifest
 */
const adjustTargetSource = (
    source: Source | string,
    settings: Settings,
): Source => {
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
};

export default adjustTargetSource;
