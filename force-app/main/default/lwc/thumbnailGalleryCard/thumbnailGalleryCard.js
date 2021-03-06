import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class ThumbnailGalleryCard extends LightningElement {
    @api recordId;
    @api galleryType;
    @api minImages;
    @api displayFileName;
    @api imageSize;
    @api smallDeviceSize;
    @api mediumDeviceSize;
    @api largeDeviceSize;
    @api icon;
    @api label;
    @api uploadFiles;
    @api uniformHeight;
    @api uniformWidth;

    get acceptedFormats() {
        return ['.jpg', '.jpeg', '.png', '.svg', '.gif'];
    }

    handleUploadFinished() {
        this.dispatchEvent(new ShowToastEvent({
            title: `Success`,
            message: `Image(s) have been uploaded`,
            variant: 'success',
        }));
        this.template.querySelector("c-photo-list").handleRefresh();
    }

}