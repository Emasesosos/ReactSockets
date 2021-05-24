import React, { useState } from 'react';

export const SendMessage = () => {

    const [mensaje, setMensaje] = useState('');

    const onChange = ({ target }) => {
        setMensaje(target.value);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if(mensaje.length === 0) return;
        setMensaje('');
        // TODO: Emitir un evento de sockets para enviar el mensaje
        // TODO: Hacer el dispatch del mensaje... 
    };

    return (
        <form
            onSubmit={ onSubmit }
        >
            <div className="type_msg row">
                <div className="input_msg_write col-sm-9">
                    <input 
                        type="text" 
                        className="write_msg" 
                        placeholder="Mensaje..." 
                        value={ mensaje }
                        onChange={ onChange }
                    />
                </div>
                <div className="col-sm-3 text-center">
                    <button className="msg_send_btn mt-3" type="submit">
                        enviar
                    </button>
                </div>
            </div>  
        </form>
    );
};
