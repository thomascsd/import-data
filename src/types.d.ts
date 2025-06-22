/**
 * @typedef {Object} User
 * @property {string} id - 使用者唯一識別碼
 * @property {string} name - 使用者名稱
 * @property {string} email - 使用者電子郵件
 * @property {string} [phone] - 使用者電話（可選）
 * @property {string} [role] - 使用者角色（可選）
 */

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role?: string;
}
