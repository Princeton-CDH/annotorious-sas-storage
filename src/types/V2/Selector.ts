
/**
 * OpenAnnotation Selector (serialized into JSON-LD; does not necessarily
 * meet the full spec)
 * http://www.openannotation.org/spec/core/specific.html#Selectors
 */
interface Selector {
    "@type": string;
    value?: string;
    item?: Selector;
    default?: Selector;
}

export { Selector };
