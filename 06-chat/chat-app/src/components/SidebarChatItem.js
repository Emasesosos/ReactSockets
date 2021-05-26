import React, { useContext } from 'react';
import { ChatContext } from '../context/chat/ChatContext';
import { fetchConToken } from '../helpers/fetch';
import { scrollToBottom } from '../helpers/scrollToBottom';
import { types } from './../types/types';

export const SidebarChatItem = ({ usuario }) => {

    const { chatState, dispatch } = useContext(ChatContext);
    const { chatActivo } = chatState;

    const onClick = async() => {
        dispatch({
            type: types.activarChat,
            payload: usuario.uid,
        });
        // Cargar los mensajes del chat
        const resp = await fetchConToken(`mensajes/${usuario.uid}`);
        const { mensajes } = resp;
        dispatch({
            type: types.cargarMensajes,
            payload: mensajes,
        });
        // Mover el scroll al final
        scrollToBottom('mensajes');
    };

    return (
        <div 
            className={`chat_list ${(usuario.uid === chatActivo) && 'active_chat'}`}
            onClick={ onClick }
        >
            <div className="chat_people">
                <div className="chat_img"> 
                    <img src="https://www.kindpng.com/picc/m/78-786207_user-avatar-png-user-avatar-icon-png-transparent.png" alt="sunil" />
                </div>
                <div className="chat_ib">
                    <h5>{usuario.nombre}</h5>
                    {
                        (usuario.online) 
                            ? <span className="text-success">Online</span>
                            : <span className="text-danger">Offline</span>
                    }
                </div>
            </div>
        </div>
    );
};
