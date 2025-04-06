import { User } from "./user";
import { Votable } from "./votable";
import { VotingStrategy } from "./voting-strategy";
import { Question } from "./question";
import { SOFComment } from "./comment";

export class Answer implements Votable {
  answerText: string;
  author: User;
  question: Question;
  comments: SOFComment[] = [];
  private votingStrategy: VotingStrategy;

  constructor(answerText: string, question: Question, author: User) {
    this.answerText = answerText;
    this.question = question;
    this.author = author;
    this.votingStrategy = new VotingStrategy(author);
    console.log(
      `Answer created: "${answerText}" by ${author.username} for question: "${question.questionText}"`
    );
  }

  addComment(comment: SOFComment): void {
    this.comments.push(comment);
  }

  upvote(author: User): void {
    this.votingStrategy.upvote(author);
  }

  downvote(author: User): void {
    this.votingStrategy.downvote(author);
  }
}
