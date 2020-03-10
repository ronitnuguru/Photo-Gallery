import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class PhotoGalleryCard extends LightningElement {

    @api recordId;
    @api minImages;
    @api displayFileName;
    @api imageSize;
    @api icon;
    @api label;    

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