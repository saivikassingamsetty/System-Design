abstract class Command {
  protected app: Application;
  protected editor: Editor;
  protected backup: string = "";

  constructor(app: Application, editor: Editor) {
    this.app = app;
    this.editor = editor;
  }

  saveBackup() {
    this.backup = this.editor.text;
  }

  undo() {
    this.editor.text = this.backup;
  }

  abstract execute(): boolean;
}

class CopyCommand extends Command {
  execute(): boolean {
    this.app.clipboard = this.editor.getSelection();
    return true;
  }
}

class CutCommand extends Command {
  execute(): boolean {
    this.saveBackup();
    this.app.clipboard = this.editor.getSelection();
    this.editor.deleteSelection();
    return true;
  }
}

class PasteCommand extends Command {
  execute(): boolean {
    this.saveBackup();
    this.editor.replaceSelection(this.app.clipboard);
    return true;
  }
}

class UndoCommand extends Command {
  execute(): boolean {
    this.app.undo();
    return false;
  }
}

class Editor {
  text: string = "";

  getSelection() {
    return this.text;
  }

  deleteSelection() {
    this.text = "";
  }

  replaceSelection(text: string) {
    this.text = text;
  }
}

class CommandHistory {
  private history: Command[] = [];

  push(c: Command) {
    this.history.push(c);
  }

  pop(): Command | undefined {
    return this.history.pop();
  }
}

class Application {
  clipboard: string = "";
  editors: Editor[] = [new Editor()];
  activeEditor: Editor = this.editors[0];
  history: CommandHistory = new CommandHistory();

  createUI() {
    const copy = () =>
      this.executeCommand(new CopyCommand(this, this.activeEditor));
    const cut = () =>
      this.executeCommand(new CutCommand(this, this.activeEditor));
    const paste = () =>
      this.executeCommand(new PasteCommand(this, this.activeEditor));
    const undo = () =>
      this.executeCommand(new UndoCommand(this, this.activeEditor));

    // Pseudo-code for actual UI integration
    // copyButton.setCommand(copy);
    // cutButton.setCommand(cut);
    // pasteButton.setCommand(paste);
    // undoButton.setCommand(undo);
    // shortcuts.onKeyPress("Ctrl+C", copy);
    // shortcuts.onKeyPress("Ctrl+X", cut);
    // shortcuts.onKeyPress("Ctrl+V", paste);
    // shortcuts.onKeyPress("Ctrl+Z", undo);
  }

  executeCommand(command: Command) {
    if (command.execute()) this.history.push(command);
  }

  undo() {
    const command = this.history.pop();
    if (command) {
      command.undo();
    }
  }
}
