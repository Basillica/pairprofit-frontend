import { ApiHandler } from './base';

export class ChatApiHandler extends ApiHandler {
    async getRoomMessages(roomID: string) {
        return await this.get(`/message/room/${roomID}`);
    }
}
