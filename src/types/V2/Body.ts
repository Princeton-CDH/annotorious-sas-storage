
/**
 * OpenAnnotation Annotation Body (serialized into JSON-LD; does not necessarily
 * meet the full spec)
 * http://www.openannotation.org/spec/core/core.html#BodyTarget
 */
interface Body {
    "@type": string;
    chars: string;
    format?: string;
    language?: string;
}

export { Body };
