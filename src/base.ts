import * as vscode from 'vscode';
import { Shell } from './shell';

export abstract class CommandBase {

    protected shell: Shell;
    protected rootPath: string | undefined;

    constructor() {
        this.rootPath = vscode.workspace.rootPath;
        this.shell = new Shell(this.rootPath ? this.rootPath : '');
        this.setUpConfig();
    }

    /**
     * Run the command and handle any resulting errors
     */
    public async run(): Promise<void> {
        try {
            await this.execute();
        } catch (e) {
            if (e instanceof Error) {
                vscode.window.showInformationMessage(e.message);
            } else {
                console.error(e);
                vscode.window.showErrorMessage(`Encountered an unexpected error: ${e.message}`);
            }
        }
    }

    /**
     * Command implementation
     */
    protected abstract async execute(): Promise<void>;

    /**
     * Command implementation
     */
    protected abstract setUpConfig(): void;

    protected getOpenEditor(): vscode.TextEditor {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            throw new Error('No open editor');
        }
        return editor;
    }

    protected openUrl(url: string): void {
        const uri = vscode.Uri.parse(url);
        vscode.commands.executeCommand('vscode.open', uri);
    }
}
