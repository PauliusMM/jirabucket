import * as vscode from 'vscode';
import { JiraCommand } from './jira';
import { BitbucketCommand } from './bitbucket';

export function activate(context: vscode.ExtensionContext) {
    const openIssue = new JiraCommand();
    const openIssueCmd = vscode.commands.registerCommand('jirabucket.jira', () => openIssue.run());
    context.subscriptions.push(openIssueCmd);

    const bitbucket = new BitbucketCommand();
    const bitbucketCmd = vscode.commands.registerCommand('jirabucket.bitbucket', () => bitbucket.run());
    context.subscriptions.push(bitbucketCmd);
}