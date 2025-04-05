import { User } from "./user";
import { Question } from "./question";
import { Answer } from "./answer";

export class SOFComment {
  commentText: string;
  author: User;

  constructor(entity: Question | Answer, commentText: string, author: User) {
    this.commentText = commentText;
    this.author = author;
    console.log(
      `Comment posted by ${author.username}: "${commentText}" on ${entity instanceof Question ? "question" : "answer"}`
    );
  }
}
