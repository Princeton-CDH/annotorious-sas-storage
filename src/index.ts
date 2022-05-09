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
class AnnotationServerStorage {
    anno;

    settings: Settings;

    adapter: SimpleAnnotationServerV2Adapter;

    // TODO: Add a typedef for the Annotorious client (anno)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(anno: any, settings: Settings) {
        this.anno = anno;
        this.settings = settings;
        this.adapter = new SimpleAnnotationServerV2Adapter(
            settings.target,
            settings.annotationEndpoint,
        );
        // bind event handlers
        this.anno.on("createAnnotation", this.handleCreateAnnotation.bind(this));
        this.anno.on("updateAnnotation", this.handleUpdateAnnotation.bind(this));
        this.anno.on("deleteAnnotation", this.handleDeleteAnnotation.bind(this));

        // load annotations from the server and signal for display
        this.loadAnnotations();
    }

    async loadAnnotations() {
        const annotationPage: AnnotationPage = await this.adapter.all();
        this.anno.setAnnotations(annotationPage.items);
        document.dispatchEvent(AnnoLoadEvent);
    }

    // handle create annotation event
    async handleCreateAnnotation(annotation: Annotation): Promise<Annotation> {
        annotation.target.source = adjustTargetSource(
            annotation.target.source,
            this.settings,
        );

        // wait for adapter to return saved annotation from SAS
        const newAnnotation: V2Annotation = await this.adapter.create(annotation);
        const newAnnotationV3 = SimpleAnnotationServerV2Adapter.createV3Anno(newAnnotation);
    
        // remove the annotation with the old ID from Annotorious display
        this.anno.removeAnnotation(annotation.id);
        // add the saved annotation from SAS to Annotorious display
        this.anno.addAnnotation(newAnnotationV3);
        return Promise.resolve(newAnnotationV3);
    }

    // update an annotation
    handleUpdateAnnotation(annotation: SavedAnnotation, previous: SavedAnnotation) {

        // The posted annotation should have an @id which exists in the store
        // const newId = annotation.id; // do we need to do anything with this?
        annotation.id = previous.id;
        // target needs to be updated if the image selection has changed
        annotation.target.source = adjustTargetSource(
            annotation.target.source,
            this.settings,
        );
        this.adapter.update(annotation);
        // add the annotation to annotorious again to make sure the display is up to date
        this.anno.addAnnotation(annotation);
    }

    // delete an annotation
    handleDeleteAnnotation(annotation: SavedAnnotation) {
        this.adapter.delete(annotation.id);
    }

}

export default AnnotationServerStorage;
