import { IHttp, IModify, IRead } from '@rocket.chat/apps-ts-definition/accessors';
import { ISlashCommand, SlashCommandContext } from '@rocket.chat/apps-ts-definition/slashcommands';

export class AppearCommand implements ISlashCommand {
    public static CommandName = 'appear';

    public command: string = AppearCommand.CommandName;
    public paramsExample: string = 'room_name';
    public i18nDescription: string = 'Slash_Appear_Description';

    public async executor(context: SlashCommandContext, read: IRead, modify: IModify, http: IHttp): Promise<void> {

        let roomName = '';
        if ( context.getArguments().join(' ').length === 0 ) {
            roomName = Math.random().toString(36).slice(-8);
        } else {
            roomName = context.getArguments().join(' ');
        }

        const builder = modify.getCreator().startMessage()
            .setSender(context.getSender()).setRoom(context.getRoom())
            .setText('https://appear.in/' + roomName);

        await modify.getCreator().finish(builder);
    }
}
