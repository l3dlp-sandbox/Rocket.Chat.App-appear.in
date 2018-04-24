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

    public async onEnable(environmentRead: IEnvironmentRead, configModify: IConfigurationModify): Promise<boolean> {
        const sets = environmentRead.getSettings();

        this.enableOrDisableCommand(this.appearId, await sets.getValueById(this.appearId), configModify);

        return true;
    }

    public async onSettingUpdated(setting: ISetting, configModify: IConfigurationModify, read: IRead, http: IHttp): Promise<void> {
        await this.enableOrDisableCommand(setting.id, setting.value as boolean, configModify);
    }

    protected async extendConfiguration(configuration: IConfigurationExtend): Promise<void> {
        await configuration.settings.provideSetting({
            id: this.appearId,
            type: SettingType.BOOLEAN,
            packageValue: true,
            required: false,
            public: false,
            i18nLabel: 'Enable_Appear_Command',
            i18nDescription: 'Enable_Appear_Command_Description',
        });

        await configuration.settings.provideSetting({
            id: 'appear_username',
            type: SettingType.STRING,
            packageValue: 'Appear.in',
            required: true,
            public: true,
            i18nLabel: 'Username',
            i18nDescription: 'Username_Description',
        });

        await configuration.settings.provideSetting({
            id: 'appear_avatar',
            type: SettingType.STRING,
            packageValue: 'https://raw.githubusercontent.com/kaiiiiiiiii/AppearCommandApp/master/icon.png',
            required: true,
            public: true,
            i18nLabel: 'Avatar',
            i18nDescription: 'Avatar_Description',
        });

        await configuration.slashCommands.provideSlashCommand(new AppearCommand());
    }

    private async enableOrDisableCommand(id: string, doEnable: boolean, configModify: IConfigurationModify): Promise<void> {
        switch (id) {
            case this.appearId:
                if (doEnable) {
                    await configModify.slashCommands.enableSlashCommand(AppearCommand.CommandName);
                } else {
                    await configModify.slashCommands.disableSlashCommand(AppearCommand.CommandName);
                }
                return;
        }
    }
}
