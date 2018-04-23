import { AppearCommand } from './AppearCommand';

import {
    IConfigurationExtend,
    IConfigurationModify,
    IEnvironmentRead,
    IHttp,
    IRead,
} from '@rocket.chat/apps-ts-definition/accessors';
import { App } from '@rocket.chat/apps-ts-definition/App';
import { ISetting, SettingType } from '@rocket.chat/apps-ts-definition/settings';

export class AppearCommandApp extends App {
    private appearId = 'appear_cmd';

    public onEnable(environmentRead: IEnvironmentRead, configModify: IConfigurationModify): boolean {
        const sets = environmentRead.getSettings();

        this.enableOrDisableCommand(this.appearId, sets.getValueById(this.appearId), configModify);

        return true;
    }

    public onSettingUpdated(setting: ISetting, configModify: IConfigurationModify, read: IRead, http: IHttp): void {
        this.enableOrDisableCommand(setting.id, setting.value as boolean, configModify);
    }

    protected extendConfiguration(configuration: IConfigurationExtend): void {
        configuration.settings.provideSetting({
            id: this.appearId,
            type: SettingType.BOOLEAN,
            packageValue: true,
            required: false,
            public: false,
            i18nLabel: 'Enable_Appear_Command',
            i18nDescription: 'Enable_Appear_Command_Description',
        });

        configuration.slashCommands.provideSlashCommand(new AppearCommand());

    }

    private enableOrDisableCommand(id: string, doEnable: boolean, configModify: IConfigurationModify): void {
        switch (id) {
            case this.appearId:
                if (doEnable) {
                    configModify.slashCommands.enableSlashCommand(AppearCommand.CommandName);
                } else {
                    configModify.slashCommands.disableSlashCommand(AppearCommand.CommandName);
                }
                return;
        }
    }
}
