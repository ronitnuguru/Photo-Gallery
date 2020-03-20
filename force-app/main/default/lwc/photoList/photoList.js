import { LightningElement, api, wire, track } from 'lwc';
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
    @api galleryType;

    @track showData;
    @track fullData;
    @track fullDataLength;
    @track isPhotoListDataLoaded = false;
    @track zeroPhotoDataLength;
    @track showFooter;
    @track footerText = "View All";
    @track footerToggle = true;
    @track imageBadge;
    @track isGalleryTypeScrolling;
    @track isThumbnailListHidden = false;
    @track uniformHeightStyle;
    @track imageIndex = 1;
    @track currentImageId;
    @track clickedThumbnailImageUrl;
    @track prefixUrl = `/sfc/servlet.shepherd/version/download/`;
    @track showNextIcon;
    @track showPreviousIcon;

    @track currentImageIndex = 0;
    @track nextImageIndex = this.currentImageIndex + 1;
    @track previousImageIndex = this.currentImageIndex - 1;

    constructor(){
        super();
        this.showPreviousIcon = this.previousImageIndex <= 0 ? false : true;
    }

    connectedCallback(){
        this.isGalleryTypeScrolling = this.galleryType === 'HorizontalScrollGallery' ? true : false;
        if(this.uniformHeight)
            this.uniformHeightStyle = `height: ${this.uniformHeight}px`;
    }

    @wire(getRelatedImagesByRecordId, { recordId: '$recordId' })
    wiredFilesList({ error, data }) {
        if(data) {
            this.zeroPhotoDataLength = data.length === 0 ? true : false;
            
            if(this.minImages)
                this.showFooter = data.length > this.minImages ? true : false;
            
        this.isPhotoListDataLoaded = true;
        this.imageBadge = data.length;
        this.fullDataLength = data.length;
        this.fullData = data;
        this.showMinData();
        this.clickedThumbnailImageUrl = `${this.prefixUrl}${data[0].Id}`;
        this.showNextIcon = this.nextImageIndex >= this.fullDataLength ? false : true;
        }
        else if (error) {
            //Handle Error
        }
    }

    viewAll(){
        this.footerText = this.footerToggle ? "View Less" : "View All";
        this.photoData = this.footerToggle ? this.showMaxData() : this.showMinData();
        this.imageBadge = this.footerToggle ? this.minImages : this.fullDataLength;
        this.footerToggle = !this.footerToggle;
    }

    showMinData(){
        this.showData = this.fullData.slice(0, this.minImages);
    }
    showMaxData(){
        this.showData = this.fullData;
    }

    hideThumbnails(){
        this.isThumbnailListHidden = !this.isThumbnailListHidden;
    }

    @api handleRefresh(){
        location.reload(false);
    }

    handleCurrentSelectedPhoto(event){
        this.clickedThumbnailImageUrl = event.detail;
        let indexVal = event.target.dataset.id;
        this.imageIndex = parseInt(indexVal, 10)+1;
        this.currentImageId = event.target.dataset.img;
        this.previousImageIndex = this.imageIndex-1;
        this.nextImageIndex = this.imageIndex;
        this.showPreviousIcon = this.previousImageIndex <= 0 ? false : true;
        this.showNextIcon = this.nextImageIndex >= this.fullDataLength ? false : true;
    }

    previousImage(){
        const currentIndex = this.imageIndex - 1;
        this.nextImageIndex = currentIndex + 1;
        this.previousImageIndex = currentIndex - 1;
        this.showPreviousIcon = this.previousImageIndex <= 0 ? false : true;
        this.showNextIcon = this.nextImageIndex >= this.fullDataLength ? false : true;
        
        this.clickedThumbnailImageUrl = `${this.prefixUrl}${this.fullData[this.previousImageIndex].Id}`;
        this.imageIndex--;
    }

    nextImage(){
        const currentIndex = this.imageIndex - 1;
        this.nextImageIndex = currentIndex + 1;
        this.previousImageIndex = currentIndex - 1;
        this.showPreviousIcon = this.previousImageIndex <= 0 ? false : true;
        this.showNextIcon = this.nextImageIndex >= this.fullDataLength ? false : true;
        this.clickedThumbnailImageUrl = `${this.prefixUrl}${this.fullData[this.nextImageIndex].Id}`;
        this.imageIndex++;
    }

}