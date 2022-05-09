import type { Annotation } from "../../../src/types/V3/Annotation";

export default class SimpleAnnotationServerV2Adapter {
    canvasId: string;

    endpointUrl: string;
    
    constructor(canvasId: string, endpointUrl: string) {
        this.canvasId = canvasId;
        this.endpointUrl = endpointUrl;
    }

    async create(annotation: Annotation) {
        return new Promise((resolve) => resolve(annotation));
    }

    async all() {
        return new Promise((resolve) =>
            resolve({
                id: "test",
                items: [],
                type: "AnnotationPage",
            }),
        );
    }

    async update() {
        return Promise.resolve();
    }

    async delete() {
        return Promise.resolve();
    }

    static createV3Anno(annotation: Annotation) {
        return annotation;
    }
}
