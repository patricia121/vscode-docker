/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See LICENSE.md in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { AzureWizard, AzureWizardExecuteStep, AzureWizardPromptStep } from 'vscode-azureextensionui';
import { localize } from '../localize';
import { ChoosePlatformStep } from './wizard/ChoosePlatformStep';
import { ChooseWorkspaceFolderStep } from './wizard/ChooseWorkspaceFolderStep';
import { ScaffoldFileStep } from './wizard/ScaffoldFileStep';
import { ScaffoldingWizardContext } from './wizard/ScaffoldingWizardContext';

export async function scaffoldCompose(wizardContext: ScaffoldingWizardContext): Promise<void> {
    const promptSteps: AzureWizardPromptStep<ScaffoldingWizardContext>[] = [
        new ChooseWorkspaceFolderStep(),
        new ChoosePlatformStep(),
    ];

    const executeSteps: AzureWizardExecuteStep<ScaffoldingWizardContext>[] = [
        new ScaffoldFileStep<ScaffoldingWizardContext>('docker-compose.yml', 300),
        new ScaffoldFileStep<ScaffoldingWizardContext>('docker-compose.debug.yml', 400),
    ];

    const wizard = new AzureWizard<ScaffoldingWizardContext>(wizardContext, {
        promptSteps: promptSteps,
        executeSteps: executeSteps,
        title: localize('vscode-docker.scaffold.addDockerFiles', 'Add Docker Compose Files'),
    });

    await wizard.prompt();
    await wizard.execute();
}
