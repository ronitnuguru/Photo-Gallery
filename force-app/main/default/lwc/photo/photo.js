import { LightningElement, track, api } from 'lwc';

export default class Photo extends LightningElement {
    @api contentId;
    @track imageUrl;
    @api title;
    @track prefixUrl = `/sfc/servlet.shepherd/version/download/`;
    @track isImageClicked = false;
    @track clickedImageUrl;

    connectedCallback(){
        this.imageUrl = `${this.prefixUrl}${this.contentId}`;
    }

    imageClick(event){
        this.clickedImageUrl = event.target.src;
        this.isImageClicked = true;
    }

    handleModalClosed(){
        this.isImageClicked=false;
    }
}