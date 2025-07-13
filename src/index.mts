import got from 'got';
import dotenv from 'dotenv';
import { DataService } from '@thomascsd/stools';
import { FooApiUser, FooApiUserResponse } from './models/FooApiUser.mjs';
import { Contact } from './models/Contact.mjs';
import { argv } from 'process';

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
 * 解析命令列參數，取得 tableName
 * @returns {string} tableName
 * @throws {Error} 若未指定 tableName
 */
function getTableNameFromArgs(): string {
  const nIdx = argv.findIndex((arg) => arg === '-n' || arg === '--name');
  if (nIdx !== -1 && argv[nIdx + 1]) {
    return argv[nIdx + 1];
  }
  throw new Error('請以 -n <tableName> 指定 Airtable 表名');
}

/**
 * 從 fooapi 取得使用者資料並寫入 Airtable 指定表
 * @returns {Promise<void>}
 * @throws {Error} 若 API 請求或資料寫入失敗
 * @example
 *   importUsersToAirtable('Contract');
 */
async function importUsersToAirtable(tableName: string) {
  const response = await got('https://fooapi.com/api/users', {
    responseType: 'json',
  });
  const res = response.body as FooApiUserResponse;

  const ds = new DataService();
  for (const user of res.data) {
    const contact = mapFooApiUserToContact(user);
    await ds.saveData<Contact>(AIRTABLE_API!, AIRTABLE_BASE_ID!, tableName, contact);
  }
}

(async () => {
  try {
    const tableName = getTableNameFromArgs();
    await importUsersToAirtable(tableName);
  } catch (err) {
    console.error('導入資料失敗:', err);
    process.exit(1);
  }
})();
