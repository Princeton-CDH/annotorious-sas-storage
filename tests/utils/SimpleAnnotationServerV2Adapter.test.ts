import SimpleAnnotationServerV2Adapter from "../../src/utils/SimpleAnnotationServerV2Adapter";
// import type { Selector as V2Selector } from "../../src/types/V2/Selector";
import type { Selector as V3Selector } from "../../src/types/V3/Selector";


const testCanvasId = "myTestCanvas";
const testEndpointUrl = "http://fakeEndpoint/annotations";


it("Should instantiate with configured settings", () => {
    // initialize the adapter
    const adapter = new SimpleAnnotationServerV2Adapter(testCanvasId, testEndpointUrl);
    expect(adapter).toBeDefined();
    expect(adapter.canvasId).toBe(testCanvasId);
    expect(adapter.endpointUrl).toBe(testEndpointUrl);
});

it("Should generate annotation page id based on endpoint and canvas id", () => {
    const adapter = new SimpleAnnotationServerV2Adapter(testCanvasId, testEndpointUrl);
    expect(adapter.annotationPageId).toBe(`${testEndpointUrl}/search?uri=${testCanvasId}`);
});

describe("Generate V2 annotation selector from V3", () => {

    it("Should convert svg selector", () => {
        const v3selector = {
            type: "SvgSelector",
            value: "<svg></svg>",
        } as V3Selector;
        const v2selector = SimpleAnnotationServerV2Adapter.createV2AnnoSelector(v3selector);
        // typescript complains because possibly null; how to best handle?
        if (v2selector === null) {
            throw new Error("Expected selector to be converted");
        } else {
            expect(v2selector).not.toBeNull();
            expect(v2selector["@type"]).toBe("oa:SvgSelector");
            expect(v2selector.value).toBe(v3selector.value);
        }
    });

    it("Should convert fragment selector", () => {
        const v3selector = {
            type: "FragmentSelector",
            value: "xywh=pixel:0,0,100,100",
        } as V3Selector;
        const v2selector = SimpleAnnotationServerV2Adapter.createV2AnnoSelector(v3selector);
        // typescript complains because possibly null; how to best handle?
        if (v2selector === null) {
            throw new Error("Expected selector to be converted");
        } else {
            expect(v2selector).not.toBeNull();
            expect(v2selector["@type"]).toBe("oa:FragmentSelector");
            expect(v2selector.value).toBe("xywh=0,0,100,100");
        }
    });

    it("Should ignore unsupported type", () => {
        const v3selector = {
            type: "something else",
            value: "foo",
        } as V3Selector;
        const v2selector = SimpleAnnotationServerV2Adapter.createV2AnnoSelector(v3selector);
        expect(v2selector).toBeNull();
    });

});

