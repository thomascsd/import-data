import got from 'got';
import dotenv from 'dotenv';
import { DataService } from '@thomascsd/stools';
import { FooApiUser, FooApiUserResponse } from './models/FooApiUser.mjs';
import { Contact } from './models/Contact.mjs';

// 載入 .env 設定
dotenv.config();

const { AIRTABLE_API, AIRTABLE_BASE_ID } = process.env;

if (!AIRTABLE_API || !AIRTABLE_BASE_ID) {
  throw new Error('請在 .env 檔案中設定 AIRTABLE_API 與 AIRTABLE_BASE_ID');
}

/**
 * 將 FooApiUser 轉換為 Contact
 * @param {FooApiUser} user - 來自 fooapi 的原始資料
 * @returns {Contact}
 */
function mapFooApiUserToContact(user: FooApiUser): Contact {
  return {
    name: `${user.name} ${user.lastname}`,
    email: user.email,
  };
}

/**
 * 從 fooapi 取得使用者資料並寫入 Airtable Contact
 * @returns {Promise<void>}
 * @throws {Error} 若 API 請求或資料寫入失敗
 * @example
 *   importUsersToAirtable();
 */
async function importUsersToAirtable() {
  const response = await got('https://fooapi.com/api/users', {
    responseType: 'json',
  });
  const res = response.body as FooApiUserResponse;

  const ds = new DataService();
  for (const user of res.data) {
    const contact = mapFooApiUserToContact(user);
    await ds.saveData<Contact>(AIRTABLE_API!, AIRTABLE_BASE_ID!, 'Contact', contact);
  }
}

importUsersToAirtable().catch((err) => {
  console.error('導入資料失敗:', err);
  process.exit(1);
});
