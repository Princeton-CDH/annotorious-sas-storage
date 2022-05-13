import type { Body } from "./Body";
import type { Target } from "./Target";

/**
 * W3C Annotation (does not necessarily meet the full specification) of the type
 * used by Annotorious.
 * https://www.w3.org/TR/annotation-model/#annotations
 */
interface Annotation {
    "@context": string;
    body: Body | Body[];
    id?: string;
    motivation: string;
    target: Target;   
    type: string;
}

/**
 * An annotation with an id, as retrieved from storage.
 */
interface SavedAnnotation extends Annotation {
    id: string;
}

export { Annotation, SavedAnnotation };
