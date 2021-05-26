import React from 'react';
import { horaMes } from '../helpers/horaMes';

export const OutgoingMessage = ({ msg }) => {

    const { createdAt, mensaje } = msg;
    const fecha = horaMes(createdAt);

    return (
        <div className="outgoing_msg">
            <div className="outgoing_msg_img">
                <img src="https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png" alt="sunil" />
            </div>
            <div className="sent_msg">
                <p>{ mensaje }</p>
                <span className="time_date">{ fecha }</span>
            </div>
        </div>
    );
};
