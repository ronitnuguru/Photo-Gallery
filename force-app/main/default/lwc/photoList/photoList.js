import { LightningElement, api, wire, track } from 'lwc';
import getRelatedImagesByRecordId from '@salesforce/apex/ImagesListController.getRelatedImagesByRecordId';

export default class PhotoList extends LightningElement {

    @api recordId;
    @api minImages;
    @api displayFileName;
    @track showData;
    @track fullData;
    @track isPhotoListDataLoaded = false;
    @track zeroPhotoDataLength;
    @track showFooter;
    @track footerText = "View All";
    @track footerToggle = true;

    @wire(getRelatedImagesByRecordId, { recordId: '$recordId' })
    wiredFilesList({ error, data }) {
        if(data) {
            this.zeroPhotoDataLength = data.length === 0 ? true : false;
            
            if(this.minImages)
                this.showFooter = data.length > this.minImages ? true : false;
            
            this.isPhotoListDataLoaded = true;
            this.fullData = data;
            this.showMinData();
        }
        else if (error) {
            console.log(error);
        }
    }

    viewAll(){
        this.footerText = this.footerToggle ? "View Less" : "View All";
        this.photoData = this.footerToggle ? this.showMaxData() : this.showMinData();
        this.footerToggle = !this.footerToggle;
    }

    showMinData(){
        this.showData = this.fullData.slice(0, this.minImages);
    }
    showMaxData(){
        this.showData = this.fullData;
    }
}