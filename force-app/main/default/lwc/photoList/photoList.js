import { LightningElement, api, wire, track } from 'lwc';
import {refreshApex} from '@salesforce/apex';
import getRelatedImagesByRecordId from '@salesforce/apex/ImagesListController.getRelatedImagesByRecordId';

export default class PhotoList extends LightningElement {
    
    @api recordId;
    @api minImages;
    @api displayFileName;
    @api imageSize;
    @api smallDeviceSize;
    @api mediumDeviceSize;
    @api largeDeviceSize;
    @api uniformHeight;
    @api uniformWidth;

    @track showData;
    @track fullData;
    @track isPhotoListDataLoaded = false;
    @track zeroPhotoDataLength;
    @track showFooter;
    @track footerText = "View All";
    @track footerToggle = true;
    @track imageBadge;
   
    @wire(getRelatedImagesByRecordId, { recordId: '$recordId' })
    wiredFilesList({ error, data }) {
        if(data) {
            this.zeroPhotoDataLength = data.length === 0 ? true : false;
            
            if(this.minImages)
                this.showFooter = data.length > this.minImages ? true : false;
            
        this.isPhotoListDataLoaded = true;
        this.imageBadge = data.length;
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
        this.imageBadge = this.footerToggle ? this.minImages : this.fullData.length;
        this.footerToggle = !this.footerToggle;
    }

    showMinData(){
        this.showData = this.fullData.slice(0, this.minImages);
    }
    showMaxData(){
        this.showData = this.fullData;
    }

    @api handleRefresh(){
        window.location.reload(false);
    }
}