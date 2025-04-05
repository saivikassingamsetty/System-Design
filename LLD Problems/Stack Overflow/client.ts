import { StackOverFlow } from "./stackoverflow";
import { User } from "./user";

const stackOverFlow = StackOverFlow.getInstance();
const userA = new User("Vikas", "Vikas@123");
const userB = new User("Sai", "Sai@123");
const userC = new User("SV", "SV@123");

const question1 = userA.postQuestion("How to create an arrow function?", [
  "javascript",
  "es6",
]);

userB.upvote(question1);
const answer1 = userB.postAnswer(
  question1,
  "Here is how to do it .. blah ... blah .."
);
userB.upvote(answer1);

userC.upvote(question1);
userC.postComment(question1, "here's the correct way ... ");
userC.downvote(answer1);
userC.postComment(answer1, "that's not how we do it!");

stackOverFlow.showReputation(userB);
