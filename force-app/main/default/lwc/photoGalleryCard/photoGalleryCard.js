import { LightningElement, api, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

const defaultLabel = "Photo Gallery";
const defaultIcon = "action:add_photo_video";

export default class PhotoGalleryCard extends LightningElement {

    @api recordId;
    @api minImages;
    @api displayFileName;
    
    @track cardLabel = defaultLabel;
    @track cardIcon = defaultIcon;
    
    @api get label(){
        return this.cardLabel;
    }
    set label(value) {
        this.cardLabel = value || defaultLabel;
    }

    @api get icon(){
        return this.cardIcon;
    }
    set icon(value) {
        this.cardIcon = value || defaultIcon;
    }

    get acceptedFormats() {
        return ['.jpg', '.jpeg', '.png', '.svg', '.gif'];
    }

    handleUploadFinished(event) {
        // Get the list of uploaded files
        this.dispatchEvent(new ShowToastEvent({
            title: `Success`,
            message: `Image(s) have been uploaded`,
            variant: 'success',
        }));
    }

}