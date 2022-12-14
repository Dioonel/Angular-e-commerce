import { Item } from "./item.model";
import { User } from "./user.model";

export class Cart {
  _id!: string;
  user!: string | User;
  items!: Item[] | [];
  total?: number;
}
