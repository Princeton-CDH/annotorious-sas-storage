import type { Annotation } from "./Annotation";

/**
 * W3C Annotation Page (does not necessarily meet the full specification)
 * https://www.w3.org/TR/annotation-model/#annotation-page
 */
interface AnnotationPage {
    id: string;
    items: Annotation[];
    type: string;
}

export { AnnotationPage };
