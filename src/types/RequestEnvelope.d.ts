import { Envelope } from './envelope.d';
// To parse this data:
//
//   import { Convert, RequestEnvelope } from "./file";
//
//   const requestEnvelope = Convert.toRequestEnvelope(json);

export interface RequestEnvelope {
    draw:            number;
    recordsTotal:    number;
    recordsFiltered: number;
    data:            RequestEnvelopeListT[];
    input:           any[];
}

export interface RequestEnvelopeListT {
    id:                    number;
    notary_id:             number;
    reasonOfRequest:       string;
    requestDate:           RequestDate;
    requestTime:           number;
    numOfRecipients:       number;
    requestLocation:       string;
    requestMessage:        RequestMessage;
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
    DT_RowIndex:           number;
}

export enum RequestDate {
    The0925202309252023 = "09/25/2023 - 09/25/2023",
    The1011202310112023 = "10/11/2023 - 10/11/2023",
    The10320231032023 = "10/3/2023 - 10/3/2023",
}

export enum RequestMessage {
    MessageDemo = "Message Demo",
}

// Converts JSON strings to/from your types
export class Convert {
    public static toRequestEnvelope(json: string): RequestEnvelope {
        return JSON.parse(json);
    }

    public static requestEnvelopeToJson(value: RequestEnvelope): string {
        return JSON.stringify(value);
    }
}
