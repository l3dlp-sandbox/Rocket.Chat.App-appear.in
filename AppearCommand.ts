import { IHttp, IModify, IRead } from '@rocket.chat/apps-ts-definition/accessors';
import { ISlashCommand, SlashCommandContext } from '@rocket.chat/apps-ts-definition/slashcommands';

export class AppearCommand implements ISlashCommand {
    public static CommandName = 'appear';

    public command: string = AppearCommand.CommandName;
    public paramsExample: string = '[custom room name]';
    public i18nDescription: string = 'Slash_Appear_Description';

    public async executor(context: SlashCommandContext, read: IRead, modify: IModify, http: IHttp): Promise<void> {
        const defaultRoom = await read.getEnvironmentReader().getSettings().getValueById('appear_default_room');
        const username = await read.getEnvironmentReader().getSettings().getValueById('appear_username');
        const avatar = await read.getEnvironmentReader().getSettings().getValueById('appear_avatar');
        const roomName = (context.getArguments()[0] || defaultRoom) || Math.random().toString(36).slice(-8);

        const text = `@${context.getSender().username} has started a video conference in room: [${roomName}](https://appear.in/${roomName})`;

        const msg = modify.getCreator().startMessage().setText(text)
            .setUsernameAlias(username).setAvatarUrl(avatar)
            .setRoom(context.getRoom()).setSender(context.getSender()).getMessage();

        return await modify.getNotifer().notifyRoom(context.getRoom(), msg);
    }
}
