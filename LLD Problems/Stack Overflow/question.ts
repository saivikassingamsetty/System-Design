import { Answer } from "./answer";
import { SOFComment } from "./comment";
import { User } from "./user";
import { Votable } from "./votable";
import { VotingStrategy } from "./voting-strategy";

export class Question implements Votable {
  questionText: string;
  author: User;
  tags: Set<string>;
  answers: Answer[] = [];
  comments: SOFComment[] = [];
  private votingStrategy: VotingStrategy;

  constructor(questionText: string, author: User, tags: string[]) {
    this.questionText = questionText;
    this.author = author;
    this.tags = new Set(tags);
    this.votingStrategy = new VotingStrategy(author);
    console.log(`Question created: "${questionText}" by ${author.username}`);
  }

  addAnswer(answer: Answer): void {
    this.answers.push(answer);
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
