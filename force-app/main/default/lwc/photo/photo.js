import { LightningElement, track, api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class Photo extends NavigationMixin(LightningElement) {
    @api contentId;
    @api contentDocumentId;
    @api title;
    @api displayFileName;
    @api uniformHeight;
    @api uniformWidth;
    @api galleryType;
    
    @track prefixUrl = `/sfc/servlet.shepherd/version/download/`;
    @track imageUrl;
    @track isImageClicked = false;
    @track clickedImageUrl;

    connectedCallback(){
        this.imageUrl = `${this.prefixUrl}${this.contentId}`;
    }

    imageClick(event){
        if(this.galleryType === 'HorizontalScrollGallery'){
            this[NavigationMixin.Navigate]({
                type: 'standard__namedPage',
                attributes: {
                    pageName: 'filePreview'
                },
                state : {
                    recordIds: this.contentDocumentId
                }
            })
        }
        else {
            //this.clickedImageUrl = event.target.src;
            //this.isImageClicked = true;
            this.dispatchEvent(new CustomEvent('selected', { detail: event.target.src }));
        }
    }

    handleModalClosed(){
        this.isImageClicked=false;
    }
}