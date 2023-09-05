export interface ContactList {
  draw: number;
  recordsTotal: number;
  recordsFiltered: number;
  data: Contact[];
  input: any[];
}

export interface Contact {
  id?: number;
  name: string;
  email: string;
  user_id?: number;
  recipient_id?: number;
  status?: number;
  created_by?: number;
  updated_by?: number;
  deleted?: number;
  created_at?: string;
  updated_at?: Date;
  user?: string;
  DT_RowIndex?: number;
}
