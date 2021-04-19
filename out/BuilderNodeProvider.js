"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Commands = exports.BuilderNodeProvider = void 0;
const vscode = require("vscode");
const path = require("path");
class BuilderNodeProvider {
    constructor(commandsArray) {
        this.commandsArray = commandsArray;
        this._onDidChangeTreeData = new vscode.EventEmitter();
        this.onDidChangeTreeData = this._onDidChangeTreeData.event;
    }
    getTreeItem(element) {
        return element;
    }
    getChildren(element) {
        return Promise.resolve(this.commandsArray);
    }
}
exports.BuilderNodeProvider = BuilderNodeProvider;
class Commands extends vscode.TreeItem {
    constructor(label, version, command, collapsibleState) {
        super(label, collapsibleState);
        this.label = label;
        this.version = version;
        this.command = command;
        this.collapsibleState = collapsibleState;
        this.iconPath = {
            light: path.join(__filename, '..', '..', 'resources', 'light', 'Commands.svg'),
            dark: path.join(__filename, '..', '..', 'resources', 'dark', 'Commands.svg')
        };
        this.contextValue = 'commands';
        this.tooltip = `${this.label}-${this.version}`;
        this.description = this.version;
    }
}
exports.Commands = Commands;
//# sourceMappingURL=BuilderNodeProvider.js.map