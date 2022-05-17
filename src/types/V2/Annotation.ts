import { Body } from "./Body";
import { Target } from "./Target";

/**
 * OpenAnnotation Annotation (serialized into JSON-LD; does not necessarily
 * meet the full spec)
 * http://www.openannotation.org/spec/core/
 */
interface Annotation {
    "@context": string;
    "@type": string;
    "@id"?: string;
    motivation: string;
    on: Target;
    resource: Body | Body[];
}

export { Annotation };
