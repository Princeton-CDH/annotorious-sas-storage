import AnnotationServerStorage from "../src/index";
import { Annotation } from "../src/types/V3/Annotation";
import SimpleAnnotationServerV2Adapter from "../src/utils/SimpleAnnotationServerV2Adapter";
import adjustTargetSource from "../src/utils/adjustTargetSource";

// Mock the adjustTargetSource util
jest.mock("../src/utils/adjustTargetSource", () => {
    return {
        __esModule: true,
        default: jest.fn(),
    };
});
const adjustTargetSourceMock = adjustTargetSource as jest.Mock;

// Mock the V2-V3 adapter
const mockCreate = jest
    .fn()
    .mockImplementation(
        (annotation: Annotation) =>
            new Promise((resolve) => resolve(annotation)),
    );
const mockAll = jest.fn().mockImplementation(
    () =>
        new Promise((resolve) =>
            resolve({
                id: "test",
                items: [],
                type: "AnnotationPage",
            }),
        ),
);
const mockUpdate = jest.fn();
const mockDelete = jest.fn();
jest.mock("../src/utils/SimpleAnnotationServerV2Adapter", () => {
    return {
        __esModule: true,
        default: jest.fn().mockImplementation(() => ({
            // Mock the Promise and data returned by all()
            all: mockAll,
            create: mockCreate,
            update: mockUpdate,
            delete: mockDelete,
        })),
    };
});
// This is required for TypeScript to accept the mock as an instance of the mocked class:
const adapterMock =
    SimpleAnnotationServerV2Adapter as unknown as jest.Mock<SimpleAnnotationServerV2Adapter>;

// Mock the Annotorious client
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const eventArray: { name: string; fn: (data?: any) => any }[] = [];
const clientMock = {
    addAnnotation: jest.fn(),
    setAnnotations: jest.fn(),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    on: jest.fn().mockImplementation((evtName: string, handler: () => any) => {
        // add name/handler pair to events array
        eventArray.push({ name: evtName, fn: handler });
    }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    emit: jest.fn().mockImplementation((evtName: string, data?: any) => {
        // match event name to a handler in events array, pass data
        eventArray.find((evt) => evt.name === evtName)?.fn(data);
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
        adapterMock.mockClear();
        clientMock.on.mockClear();
        clientMock.setAnnotations.mockClear();
    });

    it("Should instantiate the adapter with the above settings", () => {
        // initialize the storage
        new AnnotationServerStorage(clientMock, settings);
        expect(adapterMock).toHaveBeenCalled();
        expect(adapterMock).toHaveBeenCalledWith("fakeCanvas", "fakeEndpoint");
    });

    it("Should dispatch the anno load event", async () => {
        // spy on dispatch event to ensure it is called later
        const dispatchEventSpy = jest.spyOn(document, "dispatchEvent");

        // initialize the storage
        new AnnotationServerStorage(clientMock, settings);
        // ensure then() is called
        await Promise.resolve();

        // Should dispatch the event "annotations-loaded"
        expect(dispatchEventSpy).toHaveBeenCalledWith(
            new Event("annotations-loaded"),
        );
    });

    it("Should call setAnnotations with an empty array from settings", async () => {
        // initialize the storage
        new AnnotationServerStorage(clientMock, settings);
        // ensure then() is called
        await Promise.resolve();

        expect(clientMock.setAnnotations).toHaveBeenCalled();
        expect(clientMock.setAnnotations.mock.calls[0][0]).toStrictEqual([]);
    });

    it("Should initialize the event listeners", async () => {
        // initialize the storage
        new AnnotationServerStorage(clientMock, settings);
        // ensure then() is called
        await Promise.resolve();

        expect(clientMock.on).toHaveBeenCalledTimes(3);
    });
});

describe("Event handlers", () => {
    beforeEach(() => {
        // Reset mocks before each test
        adapterMock.mockClear();
        clientMock.on.mockClear();
        clientMock.emit.mockClear();
        // initialize the storage
        new AnnotationServerStorage(clientMock, settings);
    });

    it("should respond to emitted createAnnotation event with handler", async () => {
        const annotation = {
            "@context": "fakeContext",
            body: {},
            motivation: "commenting",
            target: { source: "fakesource" },
            type: "Annotation",
        };
        clientMock.emit("createAnnotation", annotation);
        // should call AdjustTargetSource
        expect(adjustTargetSourceMock).toHaveBeenCalledWith(
            "fakesource",
            settings,
        );
        // should call adapter.create
        expect(mockCreate).toHaveBeenCalledWith(annotation);
        // should call addAnnotation on client
        expect(clientMock.addAnnotation).toHaveBeenCalledWith(annotation);
    });

    it("should respond to emitted updateAnnotation event with handler", async () => {
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
        expect(mockUpdate).toHaveBeenCalledWith(annotation);
        // should call addAnnotation on client
        expect(clientMock.addAnnotation).toHaveBeenCalledWith(annotation);
    });

    it("should respond to emitted deleteAnnotation event with handler", async () => {
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
        expect(mockDelete).toHaveBeenCalledWith(annotation.id);
    });
});
