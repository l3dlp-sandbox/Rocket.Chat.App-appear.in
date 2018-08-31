import {
    IConfigurationExtend, IEnvironmentRead, ILogger,
} from '@rocket.chat/apps-engine/definition/accessors';
import { App } from '@rocket.chat/apps-engine/definition/App';
import { IAppInfo } from '@rocket.chat/apps-engine/definition/metadata';
import { SettingType } from '@rocket.chat/apps-engine/definition/settings';

import { AppearInCommand } from './commands/AppearInCommand';

export class AppearInApp extends App {

    constructor(info: IAppInfo, logger: ILogger) {
        super(info, logger);
    }

    protected async extendConfiguration(configuration: IConfigurationExtend, environmentRead: IEnvironmentRead): Promise<void> {
        await configuration.settings.provideSetting({
            id: 'appearin_name',
            type: SettingType.STRING,
            packageValue: 'appear.in',
            required: true,
            public: false,
            i18nLabel: 'Customize_Name',
            i18nDescription: 'Customize_Name_Description',
        });

        // await configuration.settings.provideSetting({
        //     id: 'appearin_bot',
        //     type: SettingType.STRING,
        //     packageValue: 'rocket.cat',
        //     required: true,
        //     public: false,
        //     i18nLabel: 'Bot',
        //     i18nDescription: 'Bot_Description',
        // });

        await configuration.settings.provideSetting({
            id: 'appearin_icon',
            type: SettingType.STRING,
            packageValue: 'https://raw.githubusercontent.com/kaiiiiiiiii/Rocket.Chat.App-Appear.in/master/icon.png',
            required: true,
            public: false,
            i18nLabel: 'Customize_Icon',
            i18nDescription: 'Customize_Icon_Description',
        });

        await configuration.slashCommands.provideSlashCommand(new AppearInCommand());
    }

}
