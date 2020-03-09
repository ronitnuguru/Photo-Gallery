public with sharing class ImagesListController {
    
    @AuraEnabled(cacheable=true)
    public static List<ContentVersion> getRelatedImagesByRecordId(String recordId){
        String[] supportedImageExtensions = new string[] {'jpg', 'jpeg', 'png', 'svg', 'gif'};
        List<ContentDocumentLink> images = [SELECT ContentDocumentId FROM ContentDocumentLink WHERE LinkedEntityId = :recordId];
        List<ID> imageIDs = new List<ID>();
        for (ContentDocumentLink imageLink : images) {
            imageIDs.add(imageLink.ContentDocumentId);
        }

        List<ContentVersion> filteredImages = [SELECT ContentDocumentId, FileExtension, Title FROM ContentVersion WHERE ContentDocumentId IN :imageIDs AND FileExtension IN :supportedImageExtensions];
        return filteredImages;
    }
}
