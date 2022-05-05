import AnnotationServerStorage from "../src/index";
import SimpleAnnotationServerV2Adapter from "../src/utils/SimpleAnnotationServerV2Adapter";

// Mock the adapter
jest.mock("../src/utils/SimpleAnnotationServerV2Adapter", () => {
    return {
        __esModule: true,
        default: jest.fn().mockImplementation(() => ({
            // Mock the Promise and data returned by all()
            all: jest.fn().mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve({
                            id: "test",
                            items: [],
                            type: "AnnotationPage",
                        }),
                    ),
            ),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        })),
    };
});
// This is required for TypeScript to accept the mock as an instance of the mocked class:
const adapterMock =
    SimpleAnnotationServerV2Adapter as unknown as jest.Mock<SimpleAnnotationServerV2Adapter>;

// Mock the Annotorious client
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const eventArray: { name: string; fn: () => any }[] = [];
const clientMock = {
    setAnnotations: jest.fn(),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    on: jest.fn().mockImplementation((evtName: string, handler: () => any) => {
        // add name/handler pair to events array
        eventArray.push({ name: evtName, fn: handler });
    }),
    emit: jest.fn().mockImplementation((evtName: string) => {
        // match event name to a handler in events array
        eventArray.find((evt) => evt.name === evtName)?.fn();
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
        AnnotationServerStorage(clientMock, settings);
        expect(adapterMock).toHaveBeenCalled();
        expect(adapterMock).toHaveBeenCalledWith("fakeCanvas", "fakeEndpoint");
    });

    it("Should dispatch the anno load event", async () => {
        // spy on dispatch event to ensure it is called later
        const dispatchEventSpy = jest.spyOn(document, "dispatchEvent");

        // initialize the storage
        AnnotationServerStorage(clientMock, settings);
        // ensure then() is called
        await Promise.resolve();

        // Should dispatch the event "annotations-loaded"
        expect(dispatchEventSpy).toHaveBeenCalledWith(
            new Event("annotations-loaded"),
        );
    });

    it("Should call setAnnotations with an empty array from settings", async () => {
        // initialize the storage
        AnnotationServerStorage(clientMock, settings);
        // ensure then() is called
        await Promise.resolve();

        expect(clientMock.setAnnotations).toHaveBeenCalled();
        expect(clientMock.setAnnotations.mock.calls[0][0]).toStrictEqual([]);
    });

    it("Should initialize the event listeners", async () => {
        // initialize the storage
        AnnotationServerStorage(clientMock, settings);
        // ensure then() is called
        await Promise.resolve();

        expect(clientMock.on).toHaveBeenCalledTimes(3);
    });
});
