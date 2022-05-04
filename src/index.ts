// annotorious plugin to use simple annotation server as a storage

import SimpleAnnotationServerV2Adapter from "./SimpleAnnotationServerV2Adapter";
import type { Annotation, AnnotationWithId } from "./types/V3/Annotation";
import type { AnnotationPage } from "./types/V3/AnnotationPage";
import type { Settings } from "./types/Settings";
import type { Target } from "./types/V3/Target";

// define a custom event to indicate that annotations have been loaded
const AnnoLoadEvent = new Event("annotations-loaded");

const AnnotationServerStorage = (anno: any, settings: Settings) => {
    let adapter = new SimpleAnnotationServerV2Adapter(
        settings.target, // should be canvas id
        settings.annotationEndpoint
    );

    // load and display annotations from server
    adapter.all().then((annotationPage: AnnotationPage) => {
        anno.setAnnotations(annotationPage.items);
        document.dispatchEvent(AnnoLoadEvent);
    });

    function adjustTargetSource(target: Target) {
        // annotorious sets the target source as a string id;
        // we need to structure it to add canvas/manifest info
        if (typeof target.source == "string") {
            // add manifest id to annotation
            target.source = {
                // use the configured target (should be canvas id)
                id: settings.target,
                // link to containing manifest
                partOf: {
                    id: settings.manifest,
                    type: "Manifest",
                },
                type: "Canvas",
            };
        }
    }

    // create a new annotation
    anno.on("createAnnotation", async (annotation: Annotation) => {
        adjustTargetSource(annotation.target);
        adapter.create(annotation).then(() => {
            // by default, storage reloads all annotations for this page;
            // signal that annotations have been loaded
            document.dispatchEvent(AnnoLoadEvent);
        });
        // how to update id for annotorious?
        console.log(annotation);
        anno.addAnnotation(annotation);
        return annotation;
    });

    // update an annotation
    anno.on(
        "updateAnnotation",
        (annotation: Annotation, previous: Annotation) => {
            // The posted annotation should have an @id which exists in the store
            let newId = annotation.id; // do we need to do anything with this?
            annotation.id = previous.id;
            // target needs to be updated if the image selection has changed
            adjustTargetSource(annotation.target);
            adapter.update(annotation);
            // add the annotation to annotorious again to make sure the display is up to date
            anno.addAnnotation(annotation);
        }
    );

    // delete an annotation
    anno.on("deleteAnnotation", (annotation: AnnotationWithId) => {
        adapter.delete(annotation.id);
    });

    const storagePlugin = {
        adapter: adapter,
    };

    return storagePlugin;
};

export default AnnotationServerStorage;
