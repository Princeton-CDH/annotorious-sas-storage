import AnnotationServerStorage from "../src/index";
import SimpleAnnotationServerV2Adapter from "../src/SimpleAnnotationServerV2Adapter";

// Mock the adapter
jest.mock("../src/SimpleAnnotationServerV2Adapter", () => {
    return {
        __esModule: true,
        default: jest.fn().mockImplementation(() => ({
            // Mock the Promise and data returned by all()
            all: jest.fn().mockImplementation(
                () =>
                    new Promise((resolve, reject) =>
                        resolve({
                            id: "test",
                            items: [],
                            type: "AnnotationPage",
                        })
                    )
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
const clientMock = {
    setAnnotations: jest.fn(),
    on: jest.fn(),
};

test("should instantiate the plugin and dispatch the anno load event", async () => {
    const settings = {
        annotationEndpoint: "fakeEndpoint",
        manifest: "fakeManifest",
        target: "fakeCanvas",
    };
    const dispatchEventSpy = jest.spyOn(document, 'dispatchEvent');
    AnnotationServerStorage(clientMock, settings);

    // Should instantiate the adapter with the above settings
    expect(adapterMock).toHaveBeenCalled();
    expect(adapterMock).toHaveBeenCalledWith("fakeCanvas", "fakeEndpoint");

    // ensure then() is called
    await Promise.resolve();

    // should call setAnnotations with the empty array
    expect(clientMock.setAnnotations).toHaveBeenCalled();
    expect(clientMock.setAnnotations.mock.calls[0][0]).toStrictEqual([]);

    // should dispatch the event "annotations-loaded"
    expect(adapterMock).toHaveBeenCalled();
    expect(dispatchEventSpy).toHaveBeenCalledWith(new Event("annotations-loaded"));
});
