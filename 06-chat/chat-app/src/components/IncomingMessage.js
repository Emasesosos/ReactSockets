import React from 'react';
import { horaMes } from '../helpers/horaMes';

export const IncomingMessage = ({ msg }) => {

    const { createdAt, mensaje } = msg;
    const fecha = horaMes(createdAt);

    return (
        <div className="incoming_msg">
            <div className="incoming_msg_img">
                <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" />
            </div>
            <div className="received_msg">
                <div className="received_withd_msg">
                    <p>{ mensaje }</p>
                    <span className="time_date">{ fecha }</span>
                </div>
            </div>
        </div>
    );
};
