import { Recipient } from './recipient.d';
export interface IRequest {
  notary_id: string;
  reasonOfRequest: string;
  requestDate: string;
  requestTime: string;
  requestLocation: string;
  requestMessage: string;
  numOfRecipients: number;
  Recipients: Recipient[];
}
