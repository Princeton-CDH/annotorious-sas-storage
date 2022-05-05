import { Body } from "./Body";
import { Target } from "./Target";

interface Annotation {
    "@context": string;
    "@type": string;
    "@id"?: string;
    motivation: string;
    on: Target;
    resource: Body | Body[];
}

export { Annotation };
