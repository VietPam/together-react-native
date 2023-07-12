export interface Agora {
    uid: string;
    role: 'PUBLISHER|SUBCRIBER';
    rtcToken: string;
    rtmToken: string;
}

export interface AgoraToken {
    rtcToken: string;
    rtmToken: string;
}