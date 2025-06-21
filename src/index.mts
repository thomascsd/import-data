import got from "got";
import dotenv from "dotenv";
import { DataService } from "@thomascsd/stools";

// 載入 .env 設定
dotenv.config();

const { AIRTABLE_API, AIRTABLE_BASE_ID } = process.env;

if (!AIRTABLE_API || !AIRTABLE_BASE_ID) {
  throw new Error("請在 .env 檔案中設定 AIRTABLE_API 與 AIRTABLE_BASE_ID");
}

/**
 * 從 fooapi 取得使用者資料並寫入 Airtable
 * @returns {Promise<void>}
 * @throws {Error} 若 API 請求或資料寫入失敗
 * @example
 *   importUsersToAirtable();
 */
async function importUsersToAirtable() {
  // 取得 fooapi 使用者資料
  const response = await got("https://fooapi.com/docs/users", {
    responseType: "json",
  });
  // 明確轉型 users 為陣列
  const users = response.body as Record<string, any>[];

  // 初始化 DataService
  const ds = new DataService();
  // 批次寫入 Airtable
  for (const user of users) {
    await ds.saveData(AIRTABLE_API!, AIRTABLE_BASE_ID!, "users", user);
  }
}

importUsersToAirtable().catch((err) => {
  // 記錄錯誤，利於診斷
  console.error("導入資料失敗:", err);
  process.exit(1);
});
