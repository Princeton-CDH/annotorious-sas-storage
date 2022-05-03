import type { Annotation } from "./Annotation";

interface AnnotationPage {
    id: string;
    items: Annotation[];
    type: string;
}

export { AnnotationPage };
