/**
 * @typedef {Object} FooApiUser
 * @property {string} id - 使用者唯一識別碼
 * @property {string} name - 名
 * @property {string} lastname - 姓
 * @property {string} username - 用戶名
 * @property {string} birthdate - 出生日期
 * @property {number} age - 年齡
 * @property {string} gender - 性別
 * @property {string} phone - 電話
 * @property {string} email - 電子郵件
 * @property {string} country - 國家
 * @property {number} height - 身高
 * @property {number} weight - 體重
 */

export interface FooApiUser {
  id: string;
  name: string;
  lastname: string;
  username: string;
  birthdate: string;
  age: number;
  gender: string;
  phone: string;
  email: string;
  country: string;
  height: number;
  weight: number;
}
