import React, { useContext, useEffect } from 'react';
import { SocketContext } from '../context/SocketContext';
import { useMapbox } from '../hooks/useMapbox';

const puntoInicial = {
    lng: -122.4722,
    lat: 37.8085,
    zoom: 12.95
};

export const MapaPage = () => {

    const { coords, setRef, nuevoMarcador$, movimientoMarcador$ } = useMapbox(puntoInicial);
    const { socket } = useContext(SocketContext)

    // Nuevo Marcador
    useEffect(() => {
        nuevoMarcador$.subscribe( marcador => {
            // console.log({marcador});
            // Nuevo marcador emitir
            socket.emit('marcador-nuevo', marcador);
        });
    }, [nuevoMarcador$, socket]);

    // Movimiento de Marcador 
    useEffect(() => {
        movimientoMarcador$.subscribe( marcador => {
            console.log({marcador});
        });
    }, [movimientoMarcador$]);

    // Escuchar nuevos marcadores
    useEffect(() => {
        socket.on('marcador-nuevo', (marcador) => {
            console.log(marcador);
        })
    }, [socket]);

    return (
        <>
            <div className="info">
                Lng: { coords.lng } | lat: { coords.lat } | zoom: { coords.zoom }
            </div>
            <div 
                ref={ setRef }
                className="mapContainer"
            /> 
        </>
    );

};
