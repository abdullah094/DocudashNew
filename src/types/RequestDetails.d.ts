// To parse this data:
//
//   import { Convert, RequestDetailsPage } from "./file";
//
//   const requestDetailsPage = Convert.toRequestDetailsPage(json);

export interface RequestDetailsPage {
    status:                         boolean;
    message:                        string;
    NotaryRequests:                 NotaryRequests;
    NotaryRequestsDetails:          NotaryRequestsDetail[];
    NotaryRequestsDetailsDocuments: NotaryRequestsDetailsDocument[];
}

export interface NotaryRequests {
    id:                    number;
    notary_id:             number;
    reasonOfRequest:       string;
    requestDate:           string;
    requestTime:           number;
    numOfRecipients:       number;
    requestLocation:       string;
    requestMessage:        string;
    notary_request_status: number;
    status:                number;
    created_by:            number;
    updated_by:            number;
    deleted:               number;
    created_at:            Date;
    updated_at:            Date;
    read_status:           number;
    draggedElArr:          null;
    uniqid:                null;
}

export interface NotaryRequestsDetail {
    id:                     number;
    notary_id:              number;
    NotaryRequestsReturnID: number;
    sign_type:              number;
    recName:                string;
    recEmail:               string;
    hostName:               null;
    hostEmail:              null;
    status:                 number;
    created_by:             number;
    updated_by:             number;
    deleted:                number;
    created_at:             Date;
    updated_at:             Date;
    uniqid:                 null;
    view_final_response:    null;
    complete_incomplete:    number;
}

export interface NotaryRequestsDetailsDocument {
    id:                     number;
    notary_id:              number;
    NotaryRequestsReturnID: number;
    document:               string;
    status:                 number;
    created_by:             number;
    updated_by:             number;
    deleted:                number;
    created_at:             Date;
    updated_at:             Date;
    uniqid:                 null;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toRequestDetailsPage(json: string): RequestDetailsPage {
        return JSON.parse(json);
    }

    public static requestDetailsPageToJson(value: RequestDetailsPage): string {
        return JSON.stringify(value);
    }
}
