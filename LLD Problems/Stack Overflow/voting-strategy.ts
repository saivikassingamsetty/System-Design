import { User } from "./user";
import { Votable } from "./votable";

export class VotingStrategy implements Votable {
  private author: User;
  private votes: number = 0;

  constructor(author: User) {
    this.author = author;
  }

  upvote(voter: User): void {
    if (voter === this.author) {
      console.log("You can't self upvote!");
      return;
    }
    this.votes++;
    this.author.increaseReputation(); // Increase the author's reputation when an upvote occurs.
    console.log(
      `Reputation updated: ${this.author.username} now has ${this.author.reputation} reputation.`
    );
  }

  downvote(voter: User): void {
    if (voter === this.author) {
      console.log("You can't self downvote!");
      return;
    }
    this.votes--;
    // Assuming downvotes reduce reputation
    this.author.decreaseReputation(); // Decrease the author's reputation when a downvote occurs.
    console.log(
      `Reputation updated: ${this.author.username} now has ${this.author.reputation} reputation.`
    );
  }

  getVotes(): number {
    return this.votes;
  }
}
