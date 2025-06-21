  A service designed for dependency injection (using typedi) to interact with Airtable.
  It extends BaseService and exposes its CRUD methods publicly.
  Inject this service into other services or controllers to access Airtable data.
 
  
  ```typescript
  import { Service } from 'typedi';
  import { DataService, BaseModel } from '@thomascsd/stools';
 
  // Define your Airtable model
  export class Contact extends BaseModel {
    name: string;
    email: string;
  }
 
  const AIRTABLE_TOKEN = process.env.AIRTABLE_TOKEN!;
  const BASE_ID = 'appXXXXXXXXXXXXXX';
  const TABLE_NAME = 'Contacts';
 
  @Service()
  export class ContactService {
    constructor(private db: DataService) {}
 
    async getContacts(): Promise<Contact[]> {
      return await this.db.getDatas<Contact>(AIRTABLE_TOKEN, BASE_ID, TABLE_NAME);
    }
 
    async saveContact(contact: Contact) {
     return await this.db.saveData<Contact>(AIRTABLE_TOKEN, BASE_ID, TABLE_NAME, contact);
    }
 
    async updateContact(contact: Contact) {
     return await this.db.updateData<Contact>(AIRTABLE_TOKEN, BASE_ID, TABLE_NAME, contact);
    }
 
    async deleteContact(contact: Contact) {
     return await this.db.deleteData<Contact>(AIRTABLE_TOKEN, BASE_ID, TABLE_NAME, contact);
    }
  }
  '''