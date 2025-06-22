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
  
# Get a random element GET /api/users/rand
Usage Example

fetch('https://fooapi.com/api/users/rand')
  .then(res => res.json())
  .then(data => console.log(data))

Payload Example

EMPTY

Response Example

{
    "id": "1",
    "name": "John",
    "lastname": "Doe",
    "username": "JohnxDoe11",
    "birthdate": "1990-01-01",
    "age": 30,
    "gender": "Male",
    "phone": "+63 791 675 8914",
    "email": "foo@example.com",
    "country": "USA",
    "height": 170,
    "weight": 70
}