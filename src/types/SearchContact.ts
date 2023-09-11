export interface SearchContact {
    status:  boolean;
    message: string;
    data:    SearchContactList[];
}

export interface SearchContactList {
    id:           number;
    name:         string;
    email:        string;
    user_id:      number;
    recipient_id: number;
    status:       number;
    created_by:   number;
    updated_by:   number;
    deleted:      number;
    created_at:   Date;
    updated_at:   Date;
}
