// To parse this data:
//
//   import { Convert, NotarySignUpStep5 } from "./file";
//
//   const notarySignUpStep5 = Convert.toNotarySignUpStep5(json);

export interface NotarySignUpStep5 {
    status:    boolean;
    success:   boolean;
    message:   string;
    next:      string;
    next_code: string;
    data:      Data;
}

export interface Data {
    id:                          number;
    first_name:                  string;
    last_name:                   string;
    name:                        string;
    email:                       string;
    user_type:                   number;
    country:                     string;
    state:                       string;
    city:                        null;
    address1:                    string;
    address2:                    string;
    zip_code:                    number;
    video_call:                  null;
    licence_number:              null;
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
    logged_in_at:                Date;
    logged_out_at:               Date;
    ip_sign_up:                  string;
    location_sign_up:            string;
    ip_sign_in:                  string;
    location_sign_in:            string;
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
    notary_document:             string;
    notary_document_staus:       number;
    verification_code_expire_at: Date;
    profile_photo_url:           string;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toNotarySignUpStep5(json: string): NotarySignUpStep5 {
        return JSON.parse(json);
    }

    public static notarySignUpStep5ToJson(value: NotarySignUpStep5): string {
        return JSON.stringify(value);
    }
}
