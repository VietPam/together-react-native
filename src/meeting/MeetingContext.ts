import { Socket } from "socket.io-client";
import { Message } from "../models/Message";
import { ServerToClientEvents, ClientToServerEvents, EmitJoinRoomDTO, EmitNewMessageType } from "./socket.type";
import { UpdateAgora } from "./meeting.type";
import { createContext } from "react";

export interface IMeetingContextState {
    socket: Socket<ServerToClientEvents, ClientToServerEvents> | undefined;
    channel: string | null;
    roomCode: number | null;
    roomId: string | null;
    rtcToken: string | null;
    rtmToken: string | null;
    roomName: string | null;
    roomDescription: string | null;
    username: string | null;
    uid: number | null;
    messagesInChannel: Message[];
}

export const initialContextState: IMeetingContextState = {
    socket: undefined,
    channel: null,
    roomCode: null,
    roomName: null,
    roomDescription: null,
    roomId: null,
    rtcToken: null,
    rtmToken: null,
    username: null,
    uid: null,
    messagesInChannel: [],
};

export type TMeetingContextActions =
    | 'update_meeting'
    | 'update_agora'
    | 'join_room'
    | 'send_message'
    | 'new_message'
    | 'leave_room';

export type TMeetingContextPayload =
    | Socket
    | UpdateAgora
    | EmitJoinRoomDTO
    | string
    | null
    | Message;
export interface IMeetingContextActions {
    type: TMeetingContextActions;
    payload: TMeetingContextPayload;
}

export const MeetingReducer = (
    state: IMeetingContextState,
    action: IMeetingContextActions,
): IMeetingContextState => {
    console.log(
        'Message recieved - Action: ' + action.type + ' - Payload: ',
        action.payload,
    );

    switch (action.type) {
        case 'update_meeting':
            return { ...state, socket: action.payload as Socket };
        case 'update_agora':
            const payload = action.payload as UpdateAgora;
            return { ...state, ...payload };
        case 'join_room':
            const data = action.payload as EmitJoinRoomDTO;
            state.socket?.emit('joinRoom', data);
            return state;
        case 'leave_room':
            return { ...state, messagesInChannel: [] };
        case 'send_message':
            const mess: EmitNewMessageType = {
                content: action.payload as string,
                username: state.username as string,
            };
            console.log('send message reducer: ', mess);
            state.socket?.emit('message', mess);
            return state;
        case 'new_message':
            return {
                ...state,
                messagesInChannel: [
                    ...state.messagesInChannel,
                    action.payload as Message,
                ],
            };
        default:
            return state;
    }
};

export interface IMeetingContextProps {
    MeetingState: IMeetingContextState;
    MeetingDispatch: React.Dispatch<IMeetingContextActions>;
}
const MeetingContext = createContext<IMeetingContextProps>({
    MeetingState: initialContextState,
    MeetingDispatch: () => { },
});
export const MeetingContextConsumer = MeetingContext.Consumer;
export const MeetingContextProvider = MeetingContext.Provider;

export default MeetingContext;
