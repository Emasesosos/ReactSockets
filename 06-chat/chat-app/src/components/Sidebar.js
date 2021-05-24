import React, { useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import { ChatContext } from '../context/chat/ChatContext';
import { SidebarChatItem } from './SidebarChatItem';

export const Sidebar = () => {

    const { auth } = useContext(AuthContext); 
    const { uid } = auth;
    const { chatState } = useContext(ChatContext);
    const { usuarios } = chatState;

    return (
        <div className="inbox_chat">
            {
                usuarios
                    .filter((user) => user.uid !== uid)
                    .map((usuario) => {
                    return <SidebarChatItem 
                                key={ usuario.uid }
                                usuario={ usuario } 
                            />;
                })    
            }
            { /* Espacio extra para scroll */ }
            <div className="extra_space"></div>
        </div>
    );
};
