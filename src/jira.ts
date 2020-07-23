import * as path from 'path';
import * as vscode from 'vscode';
import { CommandBase } from './base';

export class JiraCommand extends CommandBase{

    private projectKeys: string | undefined;
    private jiraHost: string | undefined;

    protected setUpConfig(): void {
        const config = vscode.workspace.getConfiguration('jirabucket');
        this.jiraHost = config.get<string>('jiraHost') || '';

        const projectKeys = config.get<string[]>('projectKeys') || [];

        projectKeys.forEach((part, index) => {
            projectKeys[index] = part + '-';
        });

        this.projectKeys = projectKeys.join('|');
    }

    protected async execute(): Promise<void> {
        let lineSelection = this.getOpenEditor().selection.start.line + 1;

        if (this.rootPath) {
            let realPath = path.relative(this.rootPath, this.getOpenEditor().document.fileName);
            const output = await this.shell.output(`git blame --root -L ${lineSelection},${lineSelection} ${realPath}`);
            let match = output.match(/^(\w+)/);
            if (match && match[1] != '00000000000') {
                const output2 = await this.shell.output(`git show ${match[1]} --format="%s%n%n%b" --no-patch`);
                
                let match2 = output2.match(`\\b((${this.projectKeys})\\d+)\\b`);
                if (match2) {
                    this.openUrl(`http://${this.jiraHost}/browse/${match2[1]}`);
                }
            }
        }
    }
}