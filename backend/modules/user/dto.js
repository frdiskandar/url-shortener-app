import { query } from "../../shared/lib/postgres-connection.js";

export class UserDto {

  static async index(username) {
    const user = await query("select * from users u where u.username = $1", [username]);
    return user;
  }

  static async create(username) {
    const result = await query("insert into users(username) values ($1)", [username]);
    return result;
  }

  static async update(username, newUsername) {
    const result = await query("update users u set username = $2 where u.username = $1 ", [username, newUsername]);
    return result;
  }

  static async delete(username) {
    const result = await query("delete from users u where u.username = $1", [username])
  }
}