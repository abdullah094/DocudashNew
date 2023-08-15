//header Api
export interface HeaderAPI {
    data: HeaderOption;
    message: string;
    status: boolean;
  }
  
  export interface HeaderOption {
    Send_Documents_for_Signature: number;
    Upload_Your_Photo: number;
    adopt_your_signature: number;
    brand: number;
    percentage?: number;
    sign_up: number;
    template: number;
  }