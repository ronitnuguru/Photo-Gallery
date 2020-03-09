import { LightningElement, api } from 'lwc';

export default class PhotoModal extends LightningElement {
    @api clickedImageUrl;
    @api title;
    @api displayFileName;

    connectedCallback(){
        this.title = this.title.toUpperCase();
    }

    closeModal(){
        this.dispatchEvent(new CustomEvent('selected'));
    }
}