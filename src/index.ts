// annotorious plugin to use simple annotation server as a storage

import SimpleAnnotationServerV2Adapter from "./utils/SimpleAnnotationServerV2Adapter";
import adjustTargetSource from "./utils/adjustTargetSource";
import type { Annotation as V2Annotation } from "./types/V2/Annotation";
import type { Annotation, SavedAnnotation } from "./types/V3/Annotation";
import type { AnnotationPage } from "./types/V3/AnnotationPage";
import type { Settings } from "./types/Settings";

// define a custom event to indicate that annotations have been loaded
const AnnoLoadEvent = new Event("annotations-loaded");

// TODO: Add a typedef for the Annotorious client (anno)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AnnotationServerStorage = async (anno: any, settings: Settings) => {
    const adapter = new SimpleAnnotationServerV2Adapter(
        settings.target, // should be canvas id
        settings.annotationEndpoint,
    );

    // load and display annotations from server
    const annotationPage: AnnotationPage = await adapter.all();
    anno.setAnnotations(annotationPage.items);
    document.dispatchEvent(AnnoLoadEvent);
    
    // create a new annotation
    anno.on("createAnnotation", async (annotation: Annotation) => {
        annotation.target.source = adjustTargetSource(
            annotation.target.source,
            settings,
        );

        // wait for adapter to return saved annotation from SAS
        const newAnnotation: V2Annotation = await adapter.create(annotation);
    
        // remove the annotation with the old ID from Annotorious display
        anno.removeAnnotation(annotation.id);
        // add the saved annotation from SAS to Annotorious display
        anno.addAnnotation(
            SimpleAnnotationServerV2Adapter.createV3Anno(newAnnotation),
        );
        // by default, storage reloads all annotations for this page;
        // signal that annotations have been loaded
        document.dispatchEvent(AnnoLoadEvent);
        return annotation;
    });

    // update an annotation
    anno.on(
        "updateAnnotation",
        (annotation: Annotation, previous: Annotation) => {
            // The posted annotation should have an @id which exists in the store
            // const newId = annotation.id; // do we need to do anything with this?
            annotation.id = previous.id;
            // target needs to be updated if the image selection has changed
            annotation.target.source = adjustTargetSource(
                annotation.target.source,
                settings,
            );
            adapter.update(annotation);
            // add the annotation to annotorious again to make sure the display is up to date
            anno.addAnnotation(annotation);
        },
    );

    // delete an annotation
    anno.on("deleteAnnotation", (annotation: SavedAnnotation) => {
        adapter.delete(annotation.id);
    });

    const storagePlugin = {
        adapter: adapter,
    };

    return storagePlugin;
};

export default AnnotationServerStorage;
