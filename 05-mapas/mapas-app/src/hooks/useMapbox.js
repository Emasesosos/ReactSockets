import { useCallback, useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { v4 } from 'uuid';
import { Subject } from 'rxjs';

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

    // Orservables de Rxjs
    const movimientoMarcador = useRef( new Subject() );
    const nuevoMarcador = useRef( new Subject() );

    // Mapa y Coords
    const mapa = useRef();
    const [coords, setCoords] = useState(puntoInicial);

    // Función para agregar marcadores
    const agregarMarcador = useCallback((ev, id) => {
        const { lng, lat } = ev.lngLat || ev;
        const marker = new mapboxgl.Marker();
        marker.id = id ?? v4(); // TODO: Si el marcador ya tiene Id
        marker
            .setLngLat([lng, lat])
            .addTo(mapa.current)
            .setDraggable(true);

        // Asignamos el objeto de marcadores
        marcadores.current[marker.id] = marker;

        // Si el marcador tiene ID no emitir
        if (!id) {
            nuevoMarcador.current.next({
                id: marker.id,
                lng,
                lat
            });    
        }
        
        // Escuchar movimientos del marcador
        marker.on('drag', ({ target }) => {
            const { id } = target;
            const { lng, lat } = target.getLngLat();
            // Emitir los cambios del marcador
            movimientoMarcador.current.next({ id, lng, lat });
        });

    }, []);

    // Función para actualizar la ubicación del marcador
    const actualizarPosicion = useCallback(({ id, lng, lat }) => {
        marcadores.current[id].setLngLat([ lng, lat ]);
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
        actualizarPosicion,
        agregarMarcador,
        coords,
        marcadores,
        nuevoMarcador$: nuevoMarcador.current,
        movimientoMarcador$: movimientoMarcador.current,
        setRef
    }
    
}
