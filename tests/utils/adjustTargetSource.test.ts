import adjustTargetSource from "../../src/utils/adjustTargetSource";

test("should convert string target source to Source type", () => {
    const settings = {
        annotationEndpoint: "fakeEndpoint",
        manifest: "fakeManifest",
        target: "fakeCanvas",
    };
    const oldSource = "fakeSource";
    const newSource = adjustTargetSource(oldSource, settings);
    expect(newSource).toStrictEqual({
        id: "fakeCanvas",
        partOf: {
            id: "fakeManifest",
            type: "Manifest",
        },
        type: "Canvas",
    });
    // should leave Source type object alone
    expect(adjustTargetSource(newSource, settings)).toBe(newSource);
});
