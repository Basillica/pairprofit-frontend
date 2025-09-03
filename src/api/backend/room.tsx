import { RoomModel } from '../../models/chat';
import { ApiHandler } from './base';

export class RoomApiHandler extends ApiHandler {
    async createRoom(room: RoomModel) {
        return await this.post(`/room/create`, room);
    }

    async changeRoomTitle(id: string, title: string) {
        return await this.put(`/room/${id}/${title}`, {});
    }

    async listUserRooms(id: string) {
        return await this.get(`/room/user/${id}`);
    }

    async deleteRoom(id: string) {
        return await this.delete(`/room/${id}`);
    }
}
