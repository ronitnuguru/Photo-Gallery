import { LightningElement, track, api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class Photo extends NavigationMixin(LightningElement) {
    @api contentId;
    @api contentDocumentId;
    @track imageUrl;
    @api title;
    @api displayFileName;
    @api uniformHeight;
    @api uniformWidth;
    
    @track prefixUrl = `/sfc/servlet.shepherd/version/download/`;

    connectedCallback(){
        this.imageUrl = `${this.prefixUrl}${this.contentId}`;
    }

    imageClick(){
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
}