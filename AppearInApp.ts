import {
    IConfigurationExtend, IEnvironmentRead, ILogger,
} from '@rocket.chat/apps-ts-definition/accessors';
import { App } from '@rocket.chat/apps-ts-definition/App';
import { IAppInfo } from '@rocket.chat/apps-ts-definition/metadata';
import { SettingType } from '@rocket.chat/apps-ts-definition/settings';

import { AppearInCommand } from './AppearInCommand';

export class AppearInApp extends App {
    private id = 'appearin';

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
        //     i18nLabel: 'AppearIn_Bot',
        //     i18nDescription: 'AppearIn_Bot_Description',
        // });

        await configuration.settings.provideSetting({
            id: 'appearin_icon',
            type: SettingType.STRING,
            packageValue: 'https://raw.githubusercontent.com/kaiiiiiiiii/AppearCommandApp/master/icon.png',
            required: true,
            public: false,
            i18nLabel: 'Customize_Icon',
            i18nDescription: 'Customize_Icon_Description',
        });

        await configuration.slashCommands.provideSlashCommand(new AppearInCommand());
    }

}
