import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';

// TODO: Cambiar API KEY
mapboxgl.accessToken = 'pk.eyJ1IjoiZW1hc2Vzb3NvcyIsImEiOiJja250aXR4Z3IwMnZhMm9xcXBwMTVzaHBuIn0.PtrVCu_JeFRwwk8KVV5yhA';

const puntoInicial = {
    lng: 5,
    lat: 34,
    zoom: 2
};

export const MapaPage = () => {

    const mapaDiv = useRef();
    // const [mapa, setMapa] = useState();
    const mapa = useRef();
    const [coords, setCoords] = useState(puntoInicial);

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapaDiv.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [ puntoInicial.lng, puntoInicial.lat ],
            zoom: puntoInicial.zoom
        });
        // setMapa(map);
        mapa.current = map;
    }, []);

    // Cuando se mueve el mapa
    useEffect(() => {
        mapa.current?.on('move', () => {
            const { lng, lat } = mapa.current.getCenter();
            setCoords({
                lng: lng.toFixed(4),
                lat: lat.toFixed(4),
                zoom: mapa.current.getZoom().toFixed(2)
            });
        });
    }, []);

    return (
        <>
            <div className="info">
                Lng: { coords.lng } | lat: { coords.lat } | zoom: { coords.zoom }
            </div>
            <div 
                ref={ mapaDiv }
                className="mapContainer"
            /> 
        </>
    );

};
