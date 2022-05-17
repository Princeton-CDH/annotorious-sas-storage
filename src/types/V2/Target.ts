import { Selector } from "./Selector";
/**
 * OpenAnnotation Target (serialized into JSON-LD; does not necessarily
 * meet the full spec)
 * http://www.openannotation.org/spec/core/core.html#BodyTarget
 */
interface Target {
    full: string;
    "@type": string;
    selector?: Selector;
    within?: {
        "@id": string;
        "@type": string;
    };
}

export { Target };
