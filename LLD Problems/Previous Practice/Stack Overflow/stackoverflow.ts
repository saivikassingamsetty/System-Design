import { Answer } from "./answer";
import { Question } from "./question";
import { User } from "./user";

export class StackOverFlow {
  private static instance: StackOverFlow | null = null;
  private questions: Question[] = [];
  private answers: Answer[] = [];
  private users: User[] = [];

  private constructor() {}

  static getInstance(): StackOverFlow {
    if (!this.instance) {
      this.instance = new StackOverFlow();
    }
    return this.instance;
  }

  addQuestion(question: Question): void {
    this.questions.push(question);
    console.log(`Question added to StackOverflow: "${question.questionText}"`);
  }

  addAnswer(answer: Answer): void {
    this.answers.push(answer);
    console.log(
      `Answer added to StackOverflow for question: "${answer.question.questionText}"`
    );
  }

  addUser(user: User) {
    this.users.push(user);
    console.log(`User added to StackOverflow: "${user.username}"`);
  }

  showReputation(user: User): void {
    console.log(`User ${user.username} has a reputation of ${user.reputation}`);
  }

  search(searchString: string, type: string) {
    if (type.toLowerCase() == "user") {
      const user = this.users.find((u: User) => {
        return u.username.toLowerCase().includes(searchString.toLowerCase());
      });
      return user;
    }

    if (type.toLowerCase() == "question") {
      const question = this.questions.find((q: Question) =>
        q.questionText.toLowerCase().includes(searchString.toLowerCase())
      );
      return question;
    }

    if (type.toLowerCase() == "answer") {
      const answer = this.answers.find((ans: Answer) =>
        ans.answerText.toLowerCase().includes(searchString.toLowerCase())
      );
      return answer;
    }

    return;
  }
}
