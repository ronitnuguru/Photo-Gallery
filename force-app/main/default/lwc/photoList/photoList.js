import { LightningElement, api, wire, track } from 'lwc';
import getRelatedImagesByRecordId from '@salesforce/apex/ImagesListController.getRelatedImagesByRecordId';

export default class PhotoList extends LightningElement {

    @api recordId;
    @track photoData;
    @track isPhotoListDataLoaded = false;
    @track zeroPhotoDataLength;

    @wire(getRelatedImagesByRecordId, { recordId: '$recordId' })
    wiredFilesList({ error, data }) {
        if(data) {
            console.log(data.length);
            if(data.length === 0){
                this.zeroPhotoDataLength = true;
            }
            this.photoData = data;
            this.isPhotoListDataLoaded = true;
        }
        else if (error) {
            console.log(error);
        }
    }
}