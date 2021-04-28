import React, { useEffect } from 'react';
import { useMapbox } from '../hooks/useMapbox';

const puntoInicial = {
    lng: -122.4722,
    lat: 37.8085,
    zoom: 12.95
};

export const MapaPage = () => {

    const { coords, setRef, nuevoMarcador$ } = useMapbox(puntoInicial);

    useEffect(() => {
        nuevoMarcador$.subscribe( marcador => {
            console.log({marcador});
        });
    }, [nuevoMarcador$]);

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
