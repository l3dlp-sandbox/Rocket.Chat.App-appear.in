import { IHttp, IModify, IRead } from '@rocket.chat/apps-ts-definition/accessors';
import { ISlashCommand, SlashCommandContext } from '@rocket.chat/apps-ts-definition/slashcommands';

export class AppearInCommand implements ISlashCommand {
    public command: string = 'appear';
    public i18nParamsExample: string = 'Slash_Command_Params_Example';
    public i18nDescription: string = 'Slash_Command_Description';
    public providesPreview: boolean = false;

    public async executor(context: SlashCommandContext, read: IRead, modify: IModify, http: IHttp): Promise<void> {
        // const botName = await read.getEnvironmentReader().getSettings().getValueById('appearin_bot');
        // const botUser = await read.getUserReader().getByUsername(botName);
        const icon = await read.getEnvironmentReader().getSettings().getValueById('appearin_icon');
        const roomName = context.getArguments()[0] || Math.random().toString(36).slice(-8);
        const text = `@${context.getSender().username} has started a video conference in room: [${roomName}](https://appear.in/${roomName})`;
        const username = await read.getEnvironmentReader().getSettings().getValueById('appearin_name');

        const builder = modify.getCreator().startMessage()
            .setSender(/* botUser || */ context.getSender()).setRoom(context.getRoom())
            .setText(text).setUsernameAlias(username).setAvatarUrl(icon);

        await modify.getCreator().finish(builder);
    }
}
