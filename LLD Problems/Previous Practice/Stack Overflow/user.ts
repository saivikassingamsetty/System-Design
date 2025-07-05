import { Answer } from "./answer";
import { SOFComment } from "./comment";
import { Question } from "./question";
import { StackOverFlow } from "./stackoverflow";
import { Votable } from "./votable";

export class User {
  username: string;
  private password: string;
  private platform: StackOverFlow;
  private questions: Question[] = [];
  private answers: Answer[] = [];
  private comments: SOFComment[] = [];
  reputation: number = 0;
  private reputationQueue: { change: number; resolve: () => void }[] = [];
  private isQueueProcessing = false;

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
    this.platform = StackOverFlow.getInstance();
    this.platform.addUser(this);
    console.log(`User created: ${this.username}`);
  }

  postQuestion(text: string, tags: string[]): Question {
    const question = new Question(text, this, tags);
    this.platform.addQuestion(question);
    this.questions.push(question);
    this.increaseReputation();
    console.log(
      `${this.username} posted a question: "${text}" with tags: ${tags.join(", ")}`
    );
    return question;
  }

  postAnswer(question: Question, text: string): Answer {
    const answer = new Answer(text, question, this);
    this.platform.addAnswer(answer);
    question.addAnswer(answer);
    this.answers.push(answer);
    this.increaseReputation();
    console.log(
      `${this.username} posted an answer: "${text}" for question: "${question.questionText}"`
    );
    return answer;
  }

  postComment(entity: Question | Answer, text: string): void {
    const comment = new SOFComment(entity, text, this);
    entity.addComment(comment);
    this.comments.push(comment);
    this.increaseReputation();
    console.log(
      `${this.username} commented: "${text}" on ${entity instanceof Question ? "question" : "answer"}`
    );
  }

  upvote(entity: Votable): void {
    console.log(
      `${this.username} upvoted the ${entity instanceof Question ? "question" : "answer"}`
    );
    entity.upvote(this);
  }

  downvote(entity: Votable): void {
    console.log(
      `${this.username} downvoted the ${entity instanceof Question ? "question" : "answer"}`
    );
    entity.downvote(this);
  }

  increaseReputation() {
    this.updateReputation(1);
    // this.reputation++;
  }

  decreaseReputation() {
    this.updateReputation(-1);
    // this.reputation--;
  }

  private updateReputation(change: number) {
    this.reputationQueue.push({
      change,
      resolve: () => {},
    });

    if (!this.isQueueProcessing) {
      this.processQueue();
    }
  }

  private async processQueue() {
    if (this.isQueueProcessing) return;

    this.isQueueProcessing = true;

    while (this.reputationQueue.length > 0) {
      const { change } = this.reputationQueue.shift()!;
      this.reputation += change;
    }

    this.isQueueProcessing = false;
  }
}
