import React, { useEffect } from 'react';
import { useMapbox } from '../hooks/useMapbox';

const puntoInicial = {
    lng: -122.4722,
    lat: 37.8085,
    zoom: 12.95
};

export const MapaPage = () => {

    const { coords, setRef, nuevoMarcador$, movimientoMarcador$ } = useMapbox(puntoInicial);

    // Nuevo Marcador
    useEffect(() => {
        nuevoMarcador$.subscribe( marcador => {
            // console.log({marcador});
            // Nuevo marcador emitir
        });
    }, [nuevoMarcador$]);

    // Movimiento de Marcador 
    useEffect(() => {
        movimientoMarcador$.subscribe( marcador => {
            console.log({marcador});
        });
    }, [movimientoMarcador$]);

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
