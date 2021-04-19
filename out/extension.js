"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const BuilderNodeProvider_1 = require("./BuilderNodeProvider");
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const DepNodeProvider_1 = require("./DepNodeProvider");
const cp = require("child_process");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    //TODO sayHello command section start.
    /*const command = 'myExtension.sayHello';

    const commandHandler = (name: string = 'Ajay') => {
    console.log(`Hello ${name}!!!`);
    };

    context.subscriptions.push(vscode.commands.registerCommand(command, commandHandler));*/
    //TODO sayHello command section end.
    //TODO VIEW section start
    // Samples of `window.registerTreeDataProvider`
    if (vscode.workspace.workspaceFolders) {
        // registerConfigurationView(vscode.workspace.workspaceFolders);
        registerConfigView();
        registerBuilderView();
    }
    else {
        console.log('Issue encounter in extension "builder-beb-sunbird"!');
    }
    //TODO VIEW section end
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "builder-beb-sunbird" is now active!');
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('builder-beb-sunbird.helloWorld', () => {
        // The code you place here will be executed every time your command is executed
        // Display a message box to the user
        vscode.window.showInformationMessage('Hello World from Builder-BEB-sunBird!');
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//TODO Excute cmd command using code.
const execShell = (cmd) => new Promise((resolve, reject) => {
    cp.exec(cmd, (err, out) => {
        if (err) {
            return reject(err);
        }
        return resolve(out);
    });
});
//TODO CMD color function
function colorText(text) {
    let output = '';
    let colorIndex = 1;
    for (let i = 0; i < text.length; i++) {
        const char = text.charAt(i);
        if (char === ' ' || char === '\r' || char === '\n') {
            output += char;
        }
        else {
            output += `\x1b[3${colorIndex++}m${text.charAt(i)}\x1b[0m`;
            if (colorIndex > 6) {
                colorIndex = 1;
            }
        }
    }
    return output;
}
function registerConfigurationView(workspaceFolders) {
    const nodeDependenciesProvider = new DepNodeProvider_1.DepNodeProvider(workspaceFolders.workspaceFolders[0].uri.fsPath);
    vscode.window.registerTreeDataProvider('configurations', nodeDependenciesProvider);
    //TODO refreshEntry command
    vscode.commands.registerCommand('configurations.refreshEntry', () => nodeDependenciesProvider.refresh());
    //TODO addEntry command
    vscode.commands.registerCommand('configurations.addEntry', () => vscode.window.showInformationMessage(`Successfully called add entry.`));
    //TODO editEntry command
    // vscode.commands.registerCommand('configurations.editEntry', (node: Dependency) => vscode.window.showInformationMessage(`Successfully called edit entry on ${node.label}.`));
    vscode.commands.registerCommand('configurations.editEntry', (node) => __awaiter(this, void 0, void 0, function* () {
        const sunBirdConfigSettings = vscode.workspace.getConfiguration('sunbird');
        const shellPath = sunBirdConfigSettings.get('GitBashPath');
        vscode.window.showInformationMessage(`${shellPath}`);
        const vim = vscode.window.createTerminal("Sunbird Builder", `${shellPath}`);
        vim.show();
        // vim.sendText("rm -rf 'NewFolder'",true);			//TODO worked in deletion of folder.
        // vim.sendText(`echo '${shellPath} ==> deletion completed.'`,true);
        //TODO working for getting Input from user and display as message.
        /*
        let options: InputBoxOptions = {
            prompt: "Label: ",
            placeHolder: "(placeholder)"
        };
        
        window.showInputBox(options).then(value => {
            if (!value) {return;}
            const answer1 = value;
            // show the next dialog, etc.
            vscode.window.showInformationMessage("You have entered "+answer1);
        });*/
        //TODO working for getting Path from settings
        /*
            const  configSettings = vscode.workspace.getConfiguration('sunbird');
            vscode.window.showWarningMessage("Tomcat ==> " + configSettings.get('tomcatPath')+
            "\n Maven ==> " + configSettings.get('mavenPath')+
            "\n ANT ==> " + configSettings.get('antPath'))+
            "\n FullGlass ==> " + configSettings.get('d1FullGlassPath');
        */
    }));
    vscode.commands.registerCommand('configurations.deleteEntry', (node) => vscode.window.showInformationMessage(`Successfully called delete entry on ${node.label}.`));
    // vscode.commands.registerCommand('extension.openPackageOnNpm', moduleName => vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(`https://www.npmjs.com/package/${moduleName}`)));
}
function registerBuilderView() {
    //TODO make-build screen
    let commandsArray = [new BuilderNodeProvider_1.Commands("Deleting files", "from Glass-App/cuBeb/src", {
            command: 'step1',
            title: '',
        }),
        new BuilderNodeProvider_1.Commands("Copying files", "over src directory from Glass to Glass-App", {
            command: 'step2',
            title: '',
        }),
        new BuilderNodeProvider_1.Commands("Createing Build Artifects", "run npm run build in Glass-App/cuBeb", {
            command: 'step3',
            title: '',
        }),
        new BuilderNodeProvider_1.Commands("Copying File from ", "cordova/wwwand to Tomcat", {
            command: 'step4',
            title: '',
        }),
        new BuilderNodeProvider_1.Commands("Run SunBird Butilder", "all builduing commands at once", {
            command: 'All',
            title: '',
        })
    ];
    const builderProvider = new BuilderNodeProvider_1.BuilderNodeProvider(commandsArray);
    vscode.window.registerTreeDataProvider('make-build', builderProvider);
    //TODO Run command
    vscode.commands.registerCommand('make-build.runCommand', (node) => __awaiter(this, void 0, void 0, function* () {
        // vscode.window.showInformationMessage(`Successfully called run Command.${node.command?.command}
        // ${node.id}
        // `);
        var _a, _b, _c, _d, _e, _f;
        const sunBirdConfigSettings = vscode.workspace.getConfiguration('sunbird');
        const shellPath = String(sunBirdConfigSettings.get('GitBashPath')).trim();
        var d1FullGlassPath = String(sunBirdConfigSettings.get("d1FullGlassPath")).trim();
        ;
        d1FullGlassPath = d1FullGlassPath.split("\\").join('/').trim();
        var tomcatPath = String(sunBirdConfigSettings.get("tomcatPath")).trim();
        ;
        tomcatPath = tomcatPath.split("\\").join('/').trim();
        vscode.window.showInformationMessage(`Please wait. ${(_a = node.command) === null || _a === void 0 ? void 0 : _a.command} started running.`);
        const vim = vscode.window.createTerminal("Sunbird Builder", `${shellPath}`);
        vim.show();
        vim.sendText(`cd ${d1FullGlassPath} `);
        if (((_b = node.command) === null || _b === void 0 ? void 0 : _b.command) === 'step1') {
            vim.sendText(`rm -rf Glass-App/cuBeb/src`);
        }
        else if (((_c = node.command) === null || _c === void 0 ? void 0 : _c.command) === 'step2') {
            vim.sendText(`cp -R Glass/beb/src/ Glass-App/cuBeb/`);
        }
        else if (((_d = node.command) === null || _d === void 0 ? void 0 : _d.command) === 'step3') {
            vim.sendText(`cd Glass-App/cuBeb`);
            vim.sendText(`npm run build`);
        }
        else if (((_e = node.command) === null || _e === void 0 ? void 0 : _e.command) === 'step4') {
            vim.sendText(`cd Glass-App/cuBeb/cordova/www `);
            tomcatPath += "/webapps//bebanking";
            vim.sendText(`cp *.js "${tomcatPath}"`);
            vim.sendText(`cp *.map "${tomcatPath}"`);
        }
        else if (((_f = node.command) === null || _f === void 0 ? void 0 : _f.command) === 'All') {
            vim.sendText(`rm -rf Glass-App/cuBeb/src`);
            vim.sendText(`cp -R Glass/beb/src/ Glass-App/cuBeb/`);
            vim.sendText(`cd Glass-App/cuBeb`);
            vim.sendText(`npm run build`);
            vim.sendText(`cd Glass-App/cuBeb/cordova/www `);
            tomcatPath += "/webapps//bebanking";
            vim.sendText(`cp *.js "${tomcatPath}"`);
            vim.sendText(`cp *.map "${tomcatPath}"`);
        }
        // vim.sendText("rm -rf 'NewFolder'",true);			//TODO worked in deletion of folder.
    }));
    // vscode.commands.registerCommand('steprunCommand', () => vscode.window.showInformationMessage(`Successfully called run Command.`));
}
function registerConfigView() {
    //TODO make-build screen
    let commandsArray = [new BuilderNodeProvider_1.Commands("Add Envirnment Variable for", "Java", {
            command: 'printenv MAVEN_HOME',
            title: '',
        }),
        new BuilderNodeProvider_1.Commands("Add Envirnment Variable for", "Maven", {
            command: 'printenv MAVEN_HOME',
            title: '',
        }),
        new BuilderNodeProvider_1.Commands("Add Envirnment Variable for", "ANT", {
            command: 'printenv ANT_HOME',
            title: '',
        }),
        new BuilderNodeProvider_1.Commands("Add Envirnment Variable for", "Tomcat", {
            command: 'printenv CATALINA_HOME',
            title: '',
        }),
        new BuilderNodeProvider_1.Commands("Add All Envirnment Variable at once for", "Sungard", {
            command: 'printenv CATALINA_HOME',
            title: '',
        }),
    ];
    const builderProvider = new BuilderNodeProvider_1.BuilderNodeProvider(commandsArray);
    vscode.window.registerTreeDataProvider('configurations', builderProvider);
    //TODO Run command
    vscode.commands.registerCommand('configurations.runCommand', (node) => __awaiter(this, void 0, void 0, function* () {
        // vscode.window.showInformationMessage(`Successfully called run Command.${node.command?.command}
        // ${node.id}
        // `);
        var _a, _b, _c, _d, _e, _f;
        const sunBirdConfigSettings = vscode.workspace.getConfiguration('sunbird');
        const shellPath = "C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe";
        // const shellPath = sunBirdConfigSettings.get('GitBashPath');
        const tomacatPath = String(sunBirdConfigSettings.get("tomcatPath")).trim();
        const mavenPath = String(sunBirdConfigSettings.get("mavenPath")).trim();
        const antPath = String(sunBirdConfigSettings.get("antPath")).trim();
        const d1FullGlassPath = String(sunBirdConfigSettings.get("d1FullGlassPath")).trim();
        const javaPath = String(sunBirdConfigSettings.get("javaPath")).trim();
        vscode.window.showInformationMessage(`Please wait. ${(_a = node.command) === null || _a === void 0 ? void 0 : _a.command} started running.`);
        const vim = vscode.window.createTerminal("Sunbird Builder", `${shellPath}`);
        vim.show();
        if (sunBirdConfigSettings.get("needPathBackup")) {
            vim.sendText(`$AppData = $env:APPDATA`);
            vim.sendText(`cd $AppData`);
            vim.sendText(`Get-ChildItem env: | Export-CliXml ./env-vars.clixml`);
        }
        if (((_b = node.description) === null || _b === void 0 ? void 0 : _b.toString()) === "Java") {
            //Set Java variable
            vim.sendText(`setx JAVA_HOME "${javaPath}" /m`);
            addToPath("%JAVA_HOME%\\bin;", vim);
            // vim.sendText(`setx PATH "%PATH%;%JAVA_HOME%\\bin" /m`);
        }
        else if (((_c = node.description) === null || _c === void 0 ? void 0 : _c.toString()) === "Maven") {
            //Set MAVEN variable
            vim.sendText(`SETX M2 "${mavenPath}\\bin" `);
            vim.sendText(`SETX M2_HOME "${mavenPath}" `);
            vim.sendText(`SETX MAVEN_HOME "${mavenPath}" `);
            vim.sendText(`SETX M2 "${mavenPath}\\bin" /m`);
            vim.sendText(`SETX M2_HOME "${mavenPath}" /m`);
            vim.sendText(`SETX MAVEN_HOME "${mavenPath}" /m`);
            // vim.sendText(`setx Path "%Path%;%M2_HOME%\\bin;" /m`);
            addToPath("%M2_HOME%\\bin;", vim);
        }
        else if (((_d = node.description) === null || _d === void 0 ? void 0 : _d.toString()) === "ANT") {
            //Set ANT variable
            vim.sendText(`SETX ANT_HOME "${antPath}" `);
            vim.sendText(`SETX ANT_HOME "${antPath}" /m`);
            // vim.sendText(`setx Path "%Path%;%ANT_HOME%\\bin;" /m`);
            addToPath("%ANT_HOME%\\bin;", vim);
        }
        else if (((_e = node.description) === null || _e === void 0 ? void 0 : _e.toString()) === "Tomcat") {
            //Set Tomcat variable
            vim.sendText(`SETX CATALINA_HOME "${tomacatPath}" `);
            vim.sendText(`SETX CATALINA_HOME "${tomacatPath}" /m`);
            // vim.sendText(`setx PATH "%PATH%;%CATALINA_HOME%\\bin;" /m`);
            addToPath("%CATALINA_HOME%\\bin;", vim);
        }
        else if (((_f = node.description) === null || _f === void 0 ? void 0 : _f.toString()) === "Sungard") {
            //Set Java variable
            vim.sendText(`setx JAVA_HOME "${javaPath}" /m`);
            //Set MAVEN variable
            vim.sendText(`SETX M2 "${mavenPath}\\bin" `);
            vim.sendText(`SETX M2_HOME "${mavenPath}" `);
            vim.sendText(`SETX MAVEN_HOME "${mavenPath}" `);
            vim.sendText(`SETX M2 "${mavenPath}\\bin" /m`);
            vim.sendText(`SETX M2_HOME "${mavenPath}" /m`);
            vim.sendText(`SETX MAVEN_HOME "${mavenPath}" /m`);
            //Set ANT variable
            vim.sendText(`SETX ANT_HOME "${antPath}" `);
            vim.sendText(`SETX ANT_HOME "${antPath}" /m`);
            //Set Tomcat variable
            vim.sendText(`SETX CATALINA_HOME "${tomacatPath}" `);
            vim.sendText(`SETX CATALINA_HOME "${tomacatPath}" /m`);
            //Set in Path variabel
            // vim.sendText(`setx PATH "%PATH%;%JAVA_HOME%\\bin;%M2_HOME%\\bin;%ANT_HOME%\\bin;%CATALINA_HOME%\\bin;" /m`);
            addToPath("%JAVA_HOME%\\bin;%M2_HOME%\\bin;%ANT_HOME%\\bin;%CATALINA_HOME%\\bin;", vim);
        }
    }));
}
function addToPath(pathTobeAdded, vim) {
    vim.sendText(`$PATH = [Environment]::GetEnvironmentVariable("PATH", "Machine")`);
    vim.sendText(`[Environment]::SetEnvironmentVariable("PATH", "$PATH;${pathTobeAdded}", "Machine")`);
}
//# sourceMappingURL=extension.js.map