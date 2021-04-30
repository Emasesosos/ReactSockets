import React, { useContext, useEffect } from 'react';
import { SocketContext } from '../context/SocketContext';
import { useMapbox } from '../hooks/useMapbox';

const puntoInicial = {
    lng: -122.4722,
    lat: 37.8085,
    zoom: 12.95
};

export const MapaPage = () => {

    const { coords, setRef, nuevoMarcador$, movimientoMarcador$, agregarMarcador } = useMapbox(puntoInicial);
    const { socket } = useContext(SocketContext);

    // Escuchar los marcadores existentes
    useEffect(() => {
        socket.on('marcadores-activos', (marcadores) => {
            for(const key of Object.keys(marcadores)) {
                // console.log(marcadores[key]);
                agregarMarcador(marcadores[key], key); 
            }
        });
    }, [socket, agregarMarcador]);

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
           // console.log(marcador); 
           agregarMarcador(marcador, marcador.id);
        })
    }, [socket, agregarMarcador]);

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
