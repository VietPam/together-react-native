import { Member } from "../models/Member";
import { Message } from "../models/Message";
import { Room } from "../models/Room";

export type OnNewMessageType = Message;

export interface ServerToClientEvents {
    noArg: () => void;
    newMemberJoinRoom: (member: Member, room: Room) => void;
    newMessageToGroup: (mess: OnNewMessageType) => void;
}

export interface EmitJoinRoomDTO {
    user: {
        username: string;
    };
    room: {
        roomId: string;
    };
    offer: any;
    agoraToken: any;
}
export type EmitNewMessageType
    = Omit<Message, 'socketId'>;
