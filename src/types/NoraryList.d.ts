// To parse this data:
//
//   import { Convert, NotaryList } from "./file";
//
//   const notaryList = Convert.toNotaryList(json);

export interface NotaryList {
    status: boolean;
    Notary: Notary;
}

export interface Notary {
    current_page:   number;
    data:           Notaries[];
    first_page_url: string;
    from:           number;
    last_page:      number;
    last_page_url:  string;
    links:          Link[];
    next_page_url:  null;
    path:           string;
    per_page:       number;
    prev_page_url:  null;
    to:             number;
    total:          number;
}

export interface Notaries {
    id:                          number;
    first_name:                  string;
    last_name:                   string;
    name:                        string;
    email:                       string;
    user_type:                   number;
    country:                     null | string;
    state:                       null | string;
    city:                        null;
    address1:                    string;
    address2:                    null | string;
    zip_code:                    number;
    video_call:                  null;
    licence_number:              null;
    notary_image: string;
    account_type:                number;
    mobile:                      null;
    image:                       string;
    phone:                       string;
    verification_code:           string;
    verification_status:         number;
    verification_date:           Date;
    industry_id:                 number;
    sign_up_reasons_id:          number;
    lat:                         string;
    long:                        string;
    steps:                       number;
    logged_in:                   number;
    logged_in_at:                Date | null;
    logged_out_at:               Date | null;
    ip_sign_up:                  string;
    location_sign_up:            string;
    ip_sign_in:                  null | string;
    location_sign_in:            null | string;
    email_verified_at:           null;
    about_notary:                null;
    hired_time:                  null;
    bussiness_start_up_date:     null;
    status:                      number;
    deleted:                     number;
    created_by:                  number;
    updated_by:                  number;
    created_at:                  Date;
    updated_at:                  Date;
    trial_account_expired:       number;
    trial_account:               number;
    company:                     null;
    notary_document:             null | string;
    notary_document_staus:       number;
    verification_code_expire_at: Date | null;
    profile_photo_url:           string;
    user_roles:                  UserRoles;
}

export interface UserRoles {
    id:         number;
    title:      string;
    status:     number;
    deleted:    number;
    deleted_by: number;
    created_by: number;
    updated_by: number;
    created_at: Date;
    updated_at: Date;
}

export interface Link {
    url:    null | string;
    label:  string;
    active: boolean;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toNotaryList(json: string): NotaryList {
        return JSON.parse(json);
    }

    public static notaryListToJson(value: NotaryList): string {
        return JSON.stringify(value);
    }
}
