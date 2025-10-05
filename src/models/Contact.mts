import { BaseModel } from '@thomascsd/stools';

/**
 * Airtable Contact Model
 */
export class Contact extends BaseModel {
  name!: string;
  email!: string;
}
