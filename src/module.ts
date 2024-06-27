import {
  createAzurePipelineAction,
  permitAzurePipelineAction,
  runAzurePipelineAction,
} from './actions';

import {
  createBackendModule,
  coreServices,
} from '@backstage/backend-plugin-api';
import { ScmIntegrations } from '@backstage/integration';
import { scaffolderActionsExtensionPoint } from '@backstage/plugin-scaffolder-node/alpha';

/**
 * @public
 * The Azure Pipeline Module for the Scaffolder Backend
 */
export const azurePipelineModule = createBackendModule({
  moduleId: 'azure-pipeline',
  pluginId: 'scaffolder',
  register({ registerInit }) {
    registerInit({
      deps: {
        scaffolderActions: scaffolderActionsExtensionPoint,
        config: coreServices.rootConfig,
      },
      async init({ scaffolderActions, config }) {
        const integrations = ScmIntegrations.fromConfig(config);
        scaffolderActions.addActions(
          createAzurePipelineAction({
            integrations,
          }),
          permitAzurePipelineAction({
            integrations,
          }),
          runAzurePipelineAction({
            integrations,
          })
        );
      },
    });
  },
});
