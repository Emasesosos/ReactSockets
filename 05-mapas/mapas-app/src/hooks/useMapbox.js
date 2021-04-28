import { useCallback, useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { v4 } from 'uuid';

mapboxgl.accessToken = 'pk.eyJ1IjoiZW1hc2Vzb3NvcyIsImEiOiJja250aXR4Z3IwMnZhMm9xcXBwMTVzaHBuIn0.PtrVCu_JeFRwwk8KVV5yhA';

export const useMapbox = (puntoInicial) => {

    // Referencia al DIV del mapa
    const mapaDiv = useRef();
    const setRef = useCallback(
        (node) => {
            mapaDiv.current = node;
        },
        [],
    );
    // Referencia a los marcadores
    const marcadores = useRef({});
    // Mapa y Coords
    const mapa = useRef();
    const [coords, setCoords] = useState(puntoInicial);

    // Función para agregar marcadores
    const agregarMarcador = useCallback((ev) => {
        const { lng, lat } = ev.lngLat;
        const marker = new mapboxgl.Marker();
        marker.id = v4(); // TODO: Si el marcador ya tiene Id
        marker
            .setLngLat([lng, lat])
            .addTo(mapa.current)
            .setDraggable(true);
        marcadores.current[marker.id] = marker;
    }, []);

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapaDiv.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [ puntoInicial.lng, puntoInicial.lat ],
            zoom: puntoInicial.zoom
        });
        // setMapa(map);
        mapa.current = map;
    }, [puntoInicial]);

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

    // Agregar marcadores cuando hacemos click
    useEffect(() => {
        mapa.current?.on('click', (ev) => {
            agregarMarcador(ev);
        });
    }, [agregarMarcador]);

    return {
        agregarMarcador,
        coords,
        marcadores,
        setRef
    }
}
