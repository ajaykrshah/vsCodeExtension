import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export class BuilderNodeProvider implements vscode.TreeDataProvider<Commands> {

	private _onDidChangeTreeData: vscode.EventEmitter<Commands | undefined | void> = new vscode.EventEmitter<Commands | undefined | void>();
	readonly onDidChangeTreeData: vscode.Event<Commands | undefined | void> = this._onDidChangeTreeData.event;

	constructor(private commandsArray: Commands[]) {
	}

	
	getTreeItem(element: Commands): vscode.TreeItem {
		return element;
	}

	getChildren(element?: Commands): Thenable<Commands[]> {
	
		return Promise.resolve(this.commandsArray );

	}

	
}

export class Commands extends vscode.TreeItem {

	constructor(
		public readonly label: string,
		private readonly version: string,
		
		public readonly command?: vscode.Command,
        public readonly collapsibleState?: vscode.TreeItemCollapsibleState,
	) {
		super(label, collapsibleState);

		this.tooltip = `${this.label}-${this.version}`;
		this.description = this.version;
	}

	iconPath = {
		light: path.join(__filename, '..', '..', 'resources', 'light', 'Commands.svg'),
		dark: path.join(__filename, '..', '..', 'resources', 'dark', 'Commands.svg')
	};

	contextValue = 'commands';
}