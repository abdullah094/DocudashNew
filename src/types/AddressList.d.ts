// To parse this data:
//
//   import { Convert, AddressList } from "./file";
//
//   const addressList = Convert.toAddressList(json);

export interface AddressList {
    draw:            number;
    recordsTotal:    number;
    recordsFiltered: number;
    data:            Datum[];
    input:           any[];
}

export interface Addresses {
    id?:          number;
    user_id?:     number;
    name:        string;
    address:     string;
    city:        string;
    state:       string;
    country:     string;
    zip_code:    string;
    lat:         string;
    long:        string;
    uuid?:        string;
    status?:      number;
    created_by?:  number;
    updated_by?:  number;
    deleted?:     number;
    created_at?:  Date;
    updated_at?:  Date;
    DT_RowIndex?: number;
}