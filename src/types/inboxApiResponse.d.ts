
export interface InboxApiResponse {
    draw: number;
    recordsTotal: number;
    recordsFiltered: number;
    data: Envelope[];
    input: Input;
  }