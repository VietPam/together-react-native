import { AgoraToken } from './Agora'
export interface Member {
    socketId: string;
    username: string;
    offer?: Object;
    answer?: Object;
    isOwner?: boolean;
    roomId: string;
    agoraToken: AgoraToken;
}
