export interface UploadDocumentAPI {
    status: boolean;
    message: string;
    generateSignatureDetails: GenerateSignatureDetail[];
    generateSignatureDetailsImages: GenerateSignatureDetailsImage[];
    uniqid: string;
    signature_id: number;
  }