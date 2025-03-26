// Core libraries

import React, { useRef, useEffect } from 'react';
import { useInterval } from 'usehooks-ts'
import mapboxgl, 
  { 
    type GeoJSONSource 
  } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

declare global {
  interface Window {
    map: mapboxgl.Map;
  }
}

import * as Comlink from 'comlink';
import TransitEngineWorker from '../engine/transit_engine.ts?worker';

import type { EngineClass } from '../engine/transit_engine.ts';

mapboxgl.accessToken = 'pk.eyJ1IjoiY3dhbjMiLCJhIjoiY2x1bWZ1YXl3MHFqeTJpb2ExY2NxMjVoaSJ9.ZBQibBiSDWV9YuPFX803Cg';

const Map: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {

    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      console.log('dev mode is detected in map');
    }

    if (!mapContainerRef.current) return;

    // Initialize the worker
    // const worker = new TransitEngineWorker();

    const worker = new Worker(
      new URL('../engine/transit_engine.ts', import.meta.url),
      { type: 'module' }
    )
    const engine = Comlink.wrap<EngineClass>(worker);

    // Map

    if (mapContainerRef.current) {
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-122.44557227193624, 37.76346747186161],
        zoom: 12
      });
      if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        window.map = map;
      }

      map.on('load', () => {

        map.addSource('transit-lines', {
          type: 'geojson',
          data: 'https://data.sfgov.org/resource/9exe-acju.geojson'
        });

        map.addSource('vehicles', {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: [{
              "type": "Feature",
              "geometry": {
                "type": "Point",
                "coordinates": [
                  -122.446243286133,
                  37.7199821472168
                ]
              },
              "properties": {
                "vehicle_id": "1063",
                "vehicle_label": "1063",
                "trip_id": null,
                "schedule_relationship": null,
                "current_stop_sequence": 0
              }
            }]
          }
        });
        // Empty source for vehicles that will be updated later

        map.addLayer({
          id: 'transit-lines-layer',
          type: 'line',
          source: 'transit-lines',
          layout: {
            'line-join': 'round',
            'line-cap': 'round'
          },
          paint: {
            'line-color': '#f51919',
            'line-width': 2
          }
        });

        map.addLayer({
          id: 'vehicles-layer',
          type: 'circle',
          source: 'vehicles',
          paint: {
            'circle-radius': 6,
            'circle-color': '#FF0000'
          }
        });

        map.on('click', (e) => {
          const features = map.queryRenderedFeatures(e.point, {
            layers: ['vehicles-layer']
          });

          if (features.length) {
            console.log(features)
            const feature = features[0];
            console.log('Feature clicked:', feature.properties);
          }
        });

        setInterval(async () => {
          const map_bounds = map.getBounds();
          const vehicles = await engine.getVehicles()

          map.getSource<GeoJSONSource>("vehicles")!.setData(vehicles)


        }, 1000)
      });


      return () => {
        map.remove();
        engine.terminate().catch(console.error);
      }
    }
  }, []);

  return <div ref={mapContainerRef} style={{ width: '100wh', height: '100vh' }} />;
};

export default Map;
