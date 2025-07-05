import { User } from "./user";

export interface Votable {
  upvote(author: User): void;
  downvote(author: User): void;
}
