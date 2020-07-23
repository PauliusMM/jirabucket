# JiraBucket

Quickly find the commit or issue that introduced a line of code.

## Features

The following commands are available under "Bitbucket" from the context menu as well as the command palette. They are not assigned to keyboard shortcuts by default, but see the "Extension Settings" section below for instructions on how to do that.

### Open Jirra Issue

Looks up the commit where the current line was last changed and opens the issue in your issue tracker (e.g., in JIRA) with which that change is associated. 

### Open

Opens the selected line(s) in Bitbucket, preserving all highlighted ranges. Ideal for sending someone a link to a code block.

## Requirements

You must have `git` installed and it has to be on the `$PATH`.

## Extension Settings

### Configure Issue Trackers

```json
"jirabucket.projectKeys": [
  "ABC",
  "CBS"
]
```

* The `"projectsKeys"` attribute is an array of project keys for identifying issue references. In the example above, with `["ABC"]` in there, references to `ABC-1234` in a commit message would be detected and opened on https://mycompany.atlassian.net.

Bitbucket issue keys are detected by looking for `ABC-1234` in the commit messages.

```json
"jirabucket.jiraHost": "mycompany.atlassian.net"
```

### Configure Bitbucket Server

```json
"jirabucket.bitbucketHost": "bitbucket.example.com"
```

```json
"jirabucket.gitHosts": [
  "bitbucket.example.com:7999",
  "bitbucket.example.com:7990"
]
```

* `gitHosts`: The hosts name shown in `git remote -v`, including port, of the Bitbucket Server instance.
* `bitbucketHost`: The base URL of the Bitbucket Server UI.

## Release Notes

### 0.0.1

* Bare example of simple jira/bitbucket toolset
