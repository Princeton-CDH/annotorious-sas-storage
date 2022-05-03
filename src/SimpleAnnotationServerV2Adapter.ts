/* Convert between v2 (open annotation) and v3 (w3c) annotations
   in order to bridge between annotorious (w3c) and simple annotation server (v2).

   Adapted from mirador-annotations code
   https://github.com/ProjectMirador/mirador-annotations/blob/master/src/SimpleAnnotationServerV2Adapter.js

*/

import type { Annotation as V2Annotation } from "./types/V2/Annotation";
import type { Annotation as V3Annotation } from "./types/V3/Annotation";
import type { AnnotationPage } from "./types/V3/AnnotationPage";
import type { Body as V2Body } from "./types/V2/Body";
import type { Body as V3Body } from "./types/V3/Body";
import type { Selector as V2Selector } from "./types/V2/Selector";
import type { Selector as V3Selector } from "./types/V3/Selector";
import type { Source } from "./types/V3/Source";
import type { Target } from "./types/V3/Target";

export default class SimpleAnnotationServerV2Adapter {
    canvasId: string;
    endpointUrl: string;

    /** */
    constructor(canvasId: string, endpointUrl: string) {
        this.canvasId = canvasId;
        this.endpointUrl = endpointUrl;
    }

    /** */
    get annotationPageId(): string {
        return `${this.endpointUrl}/search?uri=${this.canvasId}`;
    }

    /** */
    async create(annotation: V3Annotation) {
        return fetch(`${this.endpointUrl}/create`, {
            body: JSON.stringify(
                SimpleAnnotationServerV2Adapter.createV2Anno(annotation)
            ),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "POST",
        })
            .then(() => this.all())
            .catch(() => this.all());
    }

    /** */
    async update(annotation: V3Annotation) {
        return fetch(`${this.endpointUrl}/update`, {
            body: JSON.stringify(
                SimpleAnnotationServerV2Adapter.createV2Anno(annotation)
            ),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "POST",
        })
            .then(() => this.all())
            .catch(() => this.all());
    }

    /** */
    async delete(annoId: string) {
        return fetch(
            `${this.endpointUrl}/destroy?uri=${encodeURIComponent(annoId)}`,
            {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                method: "DELETE",
            }
        )
            .then(() => this.all())
            .catch(() => this.all());
    }

    /** */
    async get(annoId: string) {
        // SAS does not have GET for a single annotation
        const annotationPage = await this.all();
        if (annotationPage) {
            return annotationPage.items.find(
                (item: V3Annotation) => item.id === annoId
            );
        }
        return null;
    }

    /** Returns an AnnotationPage with all annotations */
    async all(): Promise<AnnotationPage> {
        const resp = await fetch(this.annotationPageId);
        const annos = await resp.json();
        return this.createAnnotationPage(annos);
    }

    /** Creates a V2 annotation from a V3 annotation */
    static createV2Anno(v3anno: V3Annotation): V2Annotation {
        let resource = null;
        if (Array.isArray(v3anno.body)) {
            resource = v3anno.body.map((b) => this.createV2AnnoBody(b));
        } else {
            resource = this.createV2AnnoBody(v3anno.body);
        }
        const v2anno: V2Annotation = {
            // copy id if it is SAS-generated
            // TODO: What id to use if it is not?
            "@id": v3anno.id && v3anno.id.startsWith("http") ? v3anno.id : "",
            "@context": "http://iiif.io/api/presentation/2/context.json",
            "@type": "oa:Annotation",
            motivation: "oa:commenting", // TODO: use v3anno.motivation
            on: {
                "@type": "oa:SpecificResource",
                full: (v3anno.target.source as Source).id,
            },
            resource,
        };
        if (v3anno.target.selector) {
            if (Array.isArray(v3anno.target.selector)) {
                const selectors = v3anno.target.selector.map((s) => {
                    if (s) {
                        let v2Selector = this.createV2AnnoSelector(s);
                        if (v2Selector) return v2Selector;
                    }
                });
                // create choice, assuming two elements and 0 is default
                v2anno.on.selector = {
                    "@type": "oa:Choice",
                    default: selectors[0],
                    item: selectors[1],
                };
            } else {
                let v2Selector = this.createV2AnnoSelector(
                    v3anno.target.selector
                );
                if (v2Selector) v2anno.on.selector = v2Selector;
            }
            if ((v3anno.target.source as Source).partOf) {
                v2anno.on.within = {
                    "@id": (v3anno.target.source as Source).partOf.id,
                    "@type": "sc:Manifest",
                };
            }
        }
        return v2anno;
    }

    /** */
    static createV2AnnoBody(v3body: V3Body) {
        const v2body: V2Body = {
            "@type": v3body.purpose === "tagging" ? "oa:Tag" : "dctypes:Text",
            chars: v3body.value,
        };
        if (v3body.format) {
            v2body.format = v3body.format;
        }
        if (v3body.language) {
            v2body.language = v3body.language;
        }
        return v2body;
    }

    /** */
    static createV2AnnoSelector(v3selector: V3Selector): V2Selector | null {
        switch (v3selector.type) {
            case "SvgSelector":
                return {
                    "@type": "oa:SvgSelector",
                    value: v3selector.value,
                };
            case "FragmentSelector":
                return {
                    "@type": "oa:FragmentSelector",
                    // SAS uses location in xywh=x,y,w,h format; annotorious uses pixel:x,y,w,h
                    value: v3selector.value.replace("xywh=pixel:", "xywh="),
                };
            default:
                return null;
        }
    }

    /** Creates an AnnotationPage from a list of V2 annotations */
    createAnnotationPage(v2annos: V2Annotation[]): AnnotationPage {
        if (Array.isArray(v2annos)) {
            const v3annos = v2annos.map((a) =>
                SimpleAnnotationServerV2Adapter.createV3Anno(a)
            );
            return {
                id: this.annotationPageId,
                items: v3annos,
                type: "AnnotationPage",
            };
        }
        return v2annos;
    }

    /** Creates a V3 annotation from a V2 annotation */
    static createV3Anno(v2anno: V2Annotation): V3Annotation {
        let body = null;
        if (Array.isArray(v2anno.resource)) {
            body = v2anno.resource.map((b: V2Body) => this.createV3AnnoBody(b));
        } else {
            body = this.createV3AnnoBody(v2anno.resource);
        }
        let v2target = v2anno.on;
        if (Array.isArray(v2target)) {
            [v2target] = v2target;
        }
        let target: Target = {
            selector: v2target.selector ? this.createV3AnnoSelector(v2target.selector) : undefined,
            source: v2target.full,
        };
        if (v2target.within) {
            target.source = {
                id: v2target.full,
                partOf: {
                    id: v2target.within["@id"],
                    type: "Manifest",
                },
                type: "Canvas",
            };
        }
        return {
            "@context": "http://www.w3.org/ns/anno.jsonld",
            id: v2anno["@id"],
            motivation: "commenting",
            type: "Annotation",
            target,
            body,
        };
    }

    /** */
    static createV3AnnoBody(v2body: V2Body): V3Body {
        const v3body: V3Body = {
            type: "TextualBody",
            value: v2body.chars,
        };
        if (v2body.format) {
            v3body.format = v2body.format;
        }
        if (v2body.language) {
            v3body.language = v2body.language;
        }
        if (v2body["@type"] === "oa:Tag") {
            v3body.purpose = "tagging";
        }
        return v3body;
    }

    /** */
    static createV3AnnoSelector(v2selector: V2Selector): any {
        // TODO: type-safe this return value
        switch (v2selector["@type"]) {
            case "oa:SvgSelector":
                return {
                    type: "SvgSelector",
                    value: v2selector.value,
                };
            case "oa:FragmentSelector":
                return {
                    type: "FragmentSelector",
                    conformsTo: "http://www.w3.org/TR/media-frags/",
                    // SAS returns location in xywh=x,y,w,h format; annotorious uses pixel:x,y,w,h
                    value: v2selector.value ? v2selector.value.replace("xywh=", "xywh=pixel:") : "",
                };
            case "oa:Choice":
                /* create alternate selectors */
                return [
                    v2selector.default
                        ? this.createV3AnnoSelector(v2selector.default)
                        : null,
                    v2selector.item
                        ? this.createV3AnnoSelector(v2selector.item)
                        : null,
                ];
            default:
                return null;
        }
    }
}
