import type { Selector } from "./Selector";
import type { Source } from "./Source";

/**
 * W3C Annotation Target (does not necessarily meet the full specification).
 * https://www.w3.org/TR/annotation-model/#bodies-and-targets
 */
interface Target {
    selector?: Selector | null | (Selector | null)[];
    source: Source | string;
}

export { Target };
