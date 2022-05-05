import { Selector } from "./Selector";

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
