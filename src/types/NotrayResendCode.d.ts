// To parse this data:
//
//   import { Convert, NotaryResendCode } from "./file";
//
//   const notaryResendCode = Convert.toNotaryResendCode(json);

export interface NotaryResendCode {
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
    country:                     null;
    state:                       null;
    city:                        null;
    address1:                    null;
    address2:                    null;
    zip_code:                    number;
    video_call:                  null;
    licence_number:              null;
    account_type:                number;
    mobile:                      null;
    image:                       string;
    phone:                       string;
    verification_code:           number;
    verification_status:         number;
    verification_date:           null;
    industry_id:                 number;
    sign_up_reasons_id:          number;
    lat:                         null;
    long:                        null;
    steps:                       number;
    logged_in:                   number;
    logged_in_at:                null;
    logged_out_at:               null;
    ip_sign_up:                  string;
    location_sign_up:            string;
    ip_sign_in:                  null;
    location_sign_in:            null;
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
    notary_document:             null;
    notary_document_staus:       number;
    verification_code_expire_at: Date;
    profile_photo_url:           string;
}


