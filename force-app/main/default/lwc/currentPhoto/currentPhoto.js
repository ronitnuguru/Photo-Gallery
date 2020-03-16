import { LightningElement, api, track } from 'lwc';

export default class CurrentPhoto extends LightningElement {
    @api currentImageId;

    @track prefixUrl = `/sfc/servlet.shepherd/version/download/`;
    @track imageUrl;
    

    connectedCallback(){
        this.imageUrl = `${this.prefixUrl}${this.currentImageId}`;
        console.log(this.imageUrl);
    }

}