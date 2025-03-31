interface Mediator {
  notify(sender: Component, event: string): void;
}

class ConcreteMediator implements Mediator {
  title: string;
  loginOrRegisterCheckbox: Checkbox;
  loginUserName: Textbox;
  loginPassword: Textbox;
  registrationUsername: Textbox;
  registrationPassword: Textbox;
  registrationEmail: Textbox;
  okBtn: Button;
  cancelBtn: Button;
  userFound: boolean = false;

  constructor() {
    this.title = "";
    this.loginOrRegisterCheckbox = new Checkbox(this);
    this.loginUserName = new Textbox(this);
    this.loginPassword = new Textbox(this);
    this.registrationUsername = new Textbox(this);
    this.registrationPassword = new Textbox(this);
    this.registrationEmail = new Textbox(this);
    this.okBtn = new Button(this);
    this.cancelBtn = new Button(this);
  }

  notify(sender: Component, event: string): void {
    if (sender === this.loginOrRegisterCheckbox && event === "check") {
      if (this.loginOrRegisterCheckbox.checked) {
        this.title = "Login";
        console.log("Showing login form");
        // Show the login form
      } else {
        this.title = "Signup";
        console.log("Showing signup form");
        // Show the signup form
      }
    }

    if (sender === this.okBtn && event === "click") {
      if (this.loginOrRegisterCheckbox.checked) {
        if (!this.checkUserExistence()) {
          console.log("Error: User not found");
        } else {
          console.log("Login successful");
        }
      } else {
        // Handle user registration (simplified)
        console.log("Registration attempted");
      }
    }
  }

  checkUserExistence(): boolean {
    // Simulated user existence check
    this.userFound = true; // You can change this to false to simulate a "user not found" scenario
    return this.userFound;
  }
}

class Component {
  dialog: Mediator;

  constructor(dialog: Mediator) {
    this.dialog = dialog;
  }

  click(): void {
    this.dialog.notify(this, "click");
  }

  keypress(): void {
    this.dialog.notify(this, "keypress");
  }
}

class Button extends Component {}

class Textbox extends Component {}

class Checkbox extends Component {
  checked: boolean = false;

  check(): void {
    this.dialog.notify(this, "check");
  }
}

// Simulating user interactions
const dialog = new ConcreteMediator();
const loginOrRegisterCheckbox = dialog.loginOrRegisterCheckbox;
const loginUserName = dialog.loginUserName;
const loginPassword = dialog.loginPassword;
const registrationUsername = dialog.registrationUsername;
const registrationPassword = dialog.registrationPassword;
const registrationEmail = dialog.registrationEmail;
const okBtn = dialog.okBtn;
const cancelBtn = dialog.cancelBtn;

console.log("Initial state: Signup mode");
loginOrRegisterCheckbox.checked = false;
loginOrRegisterCheckbox.check(); // Unchecked initially, indicating signup

console.log("\nSwitching to Login mode");
loginOrRegisterCheckbox.checked = true;
loginOrRegisterCheckbox.check(); // Checked: Switching to login

console.log("\nFilling in login details...");
loginUserName.keypress();
loginPassword.keypress();

console.log("\nAttempting to login...");
okBtn.click(); // Attempting login

console.log("\nSwitching back to Signup mode");
loginOrRegisterCheckbox.checked = false;
loginOrRegisterCheckbox.check(); // Unchecked: Switching back to signup

console.log("\nFilling in signup details...");
registrationUsername.keypress();
registrationPassword.keypress();
registrationEmail.keypress();

console.log("\nAttempting to register...");
okBtn.click(); // Attempt registration
