export interface iStep4 {
    success:       boolean;
    message:       string;
    next:          string;
    next_access:   string;
    industries:    Industry[];
    signUpReasons: Industry[];
    data:          Data;
}

export interface Data {
    id:                      number;
    first_name:              string;
    last_name:               string;
    name:                    string;
    email:                   string;
    user_type:               number;
    country:                 null;
    state:                   null;
    city:                    null;
    address1:                null;
    address2:                null;
    zip_code:                number;
    video_call:              null;
    licence_number:          null;
    account_type:            number;
    mobile:                  null;
    image:                   string;
    phone:                   string;
    verification_code:       string;
    verification_status:     number;
    verification_date:       Date;
    industry_id:             number;
    sign_up_reasons_id:      number;
    lat:                     null;
    long:                    null;
    steps:                   number;
    logged_in:               number;
    logged_in_at:            Date;
    logged_out_at:           Date;
    ip_sign_up:              string;
    location_sign_up:        string;
    ip_sign_in:              string;
    location_sign_in:        string;
    email_verified_at:       null;
    about_notary:            null;
    hired_time:              null;
    bussiness_start_up_date: null;
    status:                  number;
    deleted:                 number;
    created_by:              number;
    updated_by:              number;
    created_at:              Date;
    updated_at:              Date;
    profile_photo_url:       string;
}

export interface Industry {
    id:         number;
    title:      string;
    slug:       string;
    order_at:   number;
    status:     number;
    created_by: number;
    updated_by: number;
    deleted:    number;
    created_at: Date;
    updated_at: Date;
}

export interface EmailBar {
    id:                  number;
    signature_id:        number;
    uniqid:              string;
    recName:             string;
    recEmail:            string;
    sign_type:           number;
    emailSubject:        string;
    emailMessage:        string;
    access_code:         string;
    private_message:     string;
    hostName:            string;
    hostEmail:           string;
    recipient_id:        number;
    trash:               number;
    deleted_by:          number;
    draft_status:        number;
    complete_incomplete: string;
    status:              number;
    created_by:          string;
    updated_by:          number;
    deleted:             number;
    created_at:          Date;
    updated_at:          string;
    download_btn:        string;
    view_btn:            string;
    action:              string;
    DT_RowIndex:         number;

}

export interface IUserData {
    id:                      number;
    first_name:              string;
    last_name:               string;
    name:                    string;
    email:                   string;
    user_type:               number;
    country:                 null;
    state:                   null;
    city:                    null;
    address1:                null;
    address2:                null;
    zip_code:                number;
    video_call:              null;
    licence_number:          null;
    account_type:            number;
    mobile:                  null;
    image:                   string;
    phone:                   string;
    verification_code:       string;
    verification_status:     number;
    verification_date:       Date;
    industry_id:             number;
    sign_up_reasons_id:      number;
    lat:                     null;
    long:                    null;
    steps:                   number;
    logged_in:               number;
    logged_in_at:            Date;
    logged_out_at:           Date;
    ip_sign_up:              string;
    location_sign_up:        string;
    ip_sign_in:              string;
    location_sign_in:        string;
    email_verified_at:       null;
    about_notary:            null;
    hired_time:              null;
    bussiness_start_up_date: null;
    status:                  number;
    deleted:                 number;
    created_by:              number;
    updated_by:              number;
    created_at:              Date;
    updated_at:              Date;
    trial_account_expired:   number;
    trial_account:           number;
    remains_days:            number;
    profile_photo_url:       string;
}
