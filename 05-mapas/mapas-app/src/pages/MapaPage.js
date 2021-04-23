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
    const [setMapa] = useState();

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapaDiv.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [ puntoInicial.lng, puntoInicial.lat ],
            zoom: puntoInicial.zoom
        });
        setMapa(map);
    }, []);

    return (
        <>
            <div 
                ref={ mapaDiv }
                className="mapContainer"
            >
            </div> 
        </>
    );

};
