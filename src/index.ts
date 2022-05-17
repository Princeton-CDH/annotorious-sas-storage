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
/**
 * Annotorious plugin to use simple annotation server as a storage
 */
class AnnotationServerStorage {
    anno;

    settings: Settings;

    adapter: SimpleAnnotationServerV2Adapter;

    // TODO: Add a typedef for the Annotorious client (anno)

    /**
     * Instantiate the storage plugin.
     *
     * @param {any} anno Instance of the Annotorious client.
     * @param {Settings} settings Settings object for the storage plugin.
     */
    constructor(
        anno: any, // eslint-disable-line @typescript-eslint/no-explicit-any
        settings: Settings,
    ) {
        this.anno = anno;
        this.settings = settings;
        this.adapter = new SimpleAnnotationServerV2Adapter(
            settings.target,
            settings.annotationEndpoint,
        );
        // bind event handlers
        this.anno.on(
            "createAnnotation",
            this.handleCreateAnnotation.bind(this),
        );
        this.anno.on(
            "updateAnnotation",
            this.handleUpdateAnnotation.bind(this),
        );
        this.anno.on(
            "deleteAnnotation",
            this.handleDeleteAnnotation.bind(this),
        );

        // load annotations from the server and signal for display
        this.loadAnnotations();
    }

    /**
     * Helper function to load annotations asynchronously once the plugin
     * is initialized.
     */
    async loadAnnotations() {
        const annotationPage: AnnotationPage = await this.adapter.all();
        this.anno.setAnnotations(annotationPage.items);
        document.dispatchEvent(AnnoLoadEvent);
    }

    /**
     * Event handler for the createAnnotation event; adjusts the source if
     * needed, saves the annotation to the store and Annotorious, then returns
     * the stored annotation retrieved from SAS in a Promise.
     *
     * @param {Annotation} annotation V3 (W3C) annotation
     */
    async handleCreateAnnotation(annotation: Annotation): Promise<Annotation> {
        annotation.target.source = adjustTargetSource(
            annotation.target.source,
            this.settings,
        );

        // wait for adapter to return saved annotation from SAS
        const newAnnotation: V2Annotation = await this.adapter.create(
            annotation,
        );
        const newAnnotationV3 =
            SimpleAnnotationServerV2Adapter.createV3Anno(newAnnotation);

        // remove the annotation with the old ID from Annotorious display
        this.anno.removeAnnotation(annotation.id);
        // add the saved annotation from SAS to Annotorious display
        this.anno.addAnnotation(newAnnotationV3);

        // reload annotations
        document.dispatchEvent(AnnoLoadEvent);
        return Promise.resolve(newAnnotationV3);
    }

    /**
     * Event handler for the updateAnnotation event; adjusts the source if
     * needed, then updates the annotation in the store and in Annotorious,
     *
     * @param {SavedAnnotation} annotation Updated annotation.
     * @param {SavedAnnotation} previous Previously saved annotation.
     */
    handleUpdateAnnotation(
        annotation: SavedAnnotation,
        previous: SavedAnnotation,
    ): void {
        // The posted annotation should have an @id which exists in the store
        // const newId = annotation.id; // do we need to do anything with this?
        annotation.id = previous.id;
        // target needs to be updated if the image selection has changed
        annotation.target.source = adjustTargetSource(
            annotation.target.source,
            this.settings,
        );
        this.adapter.update(annotation);
        // add the annotation to annotorious again to make sure the display is
        // up to date
        this.anno.addAnnotation(annotation);
    }

    /**
     * Event handler for the deleteAnnotation event; deletes the annotation
     * from the store.
     *
     * @param {SavedAnnotation} annotation Annotation to delete; must have an
     * id property that matches its id property in the store.
     */
    handleDeleteAnnotation(annotation: SavedAnnotation) {
        this.adapter.delete(annotation.id);
    }
}

export default AnnotationServerStorage;
