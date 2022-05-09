import AnnotationServerStorage from "../src/index";
import SimpleAnnotationServerV2Adapter from "../src/utils/SimpleAnnotationServerV2Adapter";
import adjustTargetSource from "../src/utils/adjustTargetSource";

// Mock the V2-V3 adapter
jest.mock("../src/utils/SimpleAnnotationServerV2Adapter");

// Mock the adjustTargetSource util
jest.mock("../src/utils/adjustTargetSource", () => {
    return {
        __esModule: true,
        default: jest.fn(),
    };
});
const adjustTargetSourceMock = adjustTargetSource as jest.Mock;

// Mock the Annotorious client
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const eventArray: { name: string; fn: (...data: any) => any }[] = [];
const clientMock = {
    addAnnotation: jest.fn(),
    setAnnotations: jest.fn(),
    removeAnnotation: jest.fn(),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    on: jest.fn().mockImplementation((evtName: string, handler: () => any) => {
        // add name/handler pair to events array
        eventArray.push({ name: evtName, fn: handler });
    }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    emit: jest.fn().mockImplementation(async (evtName: string, ...data: any) => {
        // match event name to a handler in events array, pass data
        await eventArray.find((evt) => evt.name === evtName)?.fn(...data);
    }),
};

// mock settings object
const settings = {
    annotationEndpoint: "fakeEndpoint",
    manifest: "fakeManifest",
    target: "fakeCanvas",
};

describe("Plugin instantiation", () => {
    beforeEach(() => {
        // Reset mocks before each test
        clientMock.on.mockClear();
        clientMock.setAnnotations.mockClear();
    });

    it("Should instantiate the adapter with the above settings", async () => {
        // initialize the storage
        const allSpy = jest.spyOn(SimpleAnnotationServerV2Adapter.prototype, "all");
        new AnnotationServerStorage(clientMock, settings);
        expect(allSpy).toHaveBeenCalled();
    });

    it("Should dispatch the anno load event", async () => {
        // spy on dispatch event to ensure it is called later
        const dispatchEventSpy = jest.spyOn(document, "dispatchEvent");

        // initialize the storage
        const storage = new AnnotationServerStorage(clientMock, settings);
        await storage.loadAnnotations();

        // Should dispatch the event "annotations-loaded"
        expect(dispatchEventSpy).toHaveBeenCalledWith(
            new Event("annotations-loaded"),
        );
    });

    it("Should call setAnnotations with an empty array from settings", async () => {
        // initialize the storage
        const storage = new AnnotationServerStorage(clientMock, settings);
        await storage.loadAnnotations();

        expect(clientMock.setAnnotations).toHaveBeenCalled();
        expect(clientMock.setAnnotations.mock.calls[0][0]).toStrictEqual([]);
    });

    it("Should initialize the event listeners", async () => {
        // initialize the storage
        new AnnotationServerStorage(clientMock, settings);

        expect(clientMock.on).toHaveBeenCalledTimes(3);
    });
});

describe("Event handlers", () => {
    beforeEach(async () => {
        // Reset mocks before each test
        clientMock.on.mockClear();
        clientMock.emit.mockClear();
    });

    it("should respond to emitted createAnnotation event with handler", async () => {
        const createSpy = jest.spyOn(SimpleAnnotationServerV2Adapter.prototype, "create");

        // initialize the storage
        new AnnotationServerStorage(clientMock, settings);

        const annotation = {
            "@context": "fakeContext",
            body: {},
            motivation: "commenting",
            target: { source: "fakesource" },
            type: "Annotation",
        };
        await clientMock.emit("createAnnotation", annotation);
        // should call AdjustTargetSource
        expect(adjustTargetSourceMock).toHaveBeenCalledWith(
            "fakesource",
            settings,
        );
        // should call adapter.create
        expect(createSpy).toHaveBeenCalledWith(annotation);
        // should call addAnnotation on client
        expect(clientMock.addAnnotation).toHaveBeenCalledWith(annotation);
    });

    it("should respond to emitted updateAnnotation event with handler", async () => {
        const updateSpy = jest.spyOn(SimpleAnnotationServerV2Adapter.prototype, "update");

        // initialize the storage
        new AnnotationServerStorage(clientMock, settings);
        const annotation = {
            "@context": "fakeContext",
            id: "newId",
            body: {},
            motivation: "commenting",
            target: { source: "fakesource" },
            type: "Annotation",
        };
        const previous = {
            "@context": "oldfakeContext",
            id: "oldId",
            body: {},
            motivation: "commenting",
            target: { source: "oldfakesource" },
            type: "Annotation",
        };

        clientMock.emit("updateAnnotation", annotation, previous);
        // should call AdjustTargetSource
        expect(adjustTargetSourceMock).toHaveBeenCalledWith(
            "fakesource",
            settings,
        );
        // should call adapter.update
        expect(updateSpy).toHaveBeenCalledWith(annotation);
        // should call addAnnotation on client
        expect(clientMock.addAnnotation).toHaveBeenCalledWith(annotation);
    });

    it("should respond to emitted deleteAnnotation event with handler", async () => {
        const deleteSpy = jest.spyOn(SimpleAnnotationServerV2Adapter.prototype, "delete");

        // initialize the storage
        new AnnotationServerStorage(clientMock, settings);
        const annotation = {
            "@context": "fakeContext",
            id: "someId",
            body: {},
            motivation: "commenting",
            target: { source: "fakesource" },
            type: "Annotation",
        };
        clientMock.emit("deleteAnnotation", annotation);
        // should call adapter.delete
        expect(deleteSpy).toHaveBeenCalledWith(annotation.id);
    });
});
