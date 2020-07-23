import * as path from 'path';
import * as vscode from 'vscode';
import { CommandBase } from './base';

export class BitbucketCommand extends CommandBase{

    private bitbucketHost: string | undefined;
    protected project: string | undefined;
    protected repo: string | undefined;

    protected setUpConfig(): void {
        const config = vscode.workspace.getConfiguration('jirabucket');
        this.bitbucketHost = config.get<string>('bitbucketHost') || '';
        this.setUpRepoInfo();
    }

    protected async execute(): Promise<void> {
        let lineSelection = this.getOpenEditor().selection.start.line + 1;

        if (this.rootPath) {
            let realPath = path.relative(this.rootPath, this.getOpenEditor().document.fileName);
            const output = await this.shell.output(`git blame --root -L ${lineSelection},${lineSelection} ${realPath}`);
            let match = output.match(/^(\w+)/);
            if (match && match[1] != '00000000000') {
                this.openUrl(`http://${this.bitbucketHost}/projects/${this.project}/repos/${this.repo}/commits/${match[1]}#${encodeURIComponent(realPath)}`);
            }
        }
    }

    private async setUpRepoInfo(): Promise<void> {
        let remotes = await this.getGitRepo();

        const config = vscode.workspace.getConfiguration('jirabucket');
        let hosts = config.get<string[]>('gitHosts') || [];

        for (const host of hosts) {
            for (const remote of remotes) {
                const splits = remote.split(host + '/');
                
                if (splits[1]) {
                    let repInfo = splits[1].replace('scm/' , '').replace('.git', '').split(' ');
                    if (repInfo[0]) {
                        let realInfo = repInfo[0].split('/');
                        this.project = realInfo[0];
                        this.repo = realInfo[1];

                        return;
                    }
                }
            }
        }
    }

    private async getGitRepo(): Promise<string[]> {
        return await this.shell.lines('git remote -v');
    }
}