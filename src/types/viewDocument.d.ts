export interface ViewDocument {
    success: boolean;
    message: string;
    generateSignature: GenerateSignature;
    generateSignatureDetails: GenerateSignatureDetail[];
    generateSignatureDetailsFinalise: GenerateSignatureDetailsFinalise;
  }