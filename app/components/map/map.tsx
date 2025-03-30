// Core libraries
import React, { 
  useRef, 
  useEffect,
  useState
} from 'react';
import { useInterval } from 'usehooks-ts'
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Components
import DetailPopover from './DetailPopover/DetailPopover';

// Types
import type { GeoJSONSource } from 'mapbox-gl';
declare global {
  interface Window {
    map: mapboxgl.Map;
  }
}

import * as Comlink from 'comlink'; // Used to wrap engine worker

import type { EngineClass } from '../../engine/transit_engine.ts';
import type { Vehicle } from '~/types/database_functions.types.js';

mapboxgl.accessToken = 'pk.eyJ1IjoiY3dhbjMiLCJhIjoiY2x1bWZ1YXl3MHFqeTJpb2ExY2NxMjVoaSJ9.ZBQibBiSDWV9YuPFX803Cg';

const Map: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [detailCoordinates, setDetailCoordinates] = useState<{x: number, y: number} | null>(null);

  let lastHoveredId: number | null = null;

  useEffect(() => {

    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      console.log('dev mode is detected in map');
    }

    if (!mapContainerRef.current) return;

    // Initialize the worker
    const worker = new Worker(
      new URL('../../engine/transit_engine.ts', import.meta.url),
      { type: 'module' }
    )
    if (!worker) {
      console.error('Failed to initialize the worker.');
    }
    // Wrap the worker
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
        map.addSource('vehicles', {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: [] // Start with an empty feature collection
          }
        });
        
        map.addLayer({
          id: 'vehicles-layer',
          type: 'circle',
          source: 'vehicles',
          paint: {
            'circle-radius': 4,
            'circle-stroke-width': [
              'case',
              ['boolean', ['feature-state', 'hover'], false],
              4,
              2
            ],
            'circle-color': 'blue',
            'circle-stroke-color': 'white'
          }
        });

        setInterval(async () => {
          const map_bounds = map.getBounds();
          const vehicles = await engine.getVehicles()

          map.getSource<GeoJSONSource>("vehicles")!.setData(vehicles)


        }, 1000)
      });

      map.on('click', async (e) => {
        const features = map.queryRenderedFeatures(e.point, {
          layers: ['vehicles-layer']
        });

        if (features.length) {
          const feature = features[0];

          const vehicle = await engine.query(feature.id as string | number);
          setSelectedVehicle(vehicle);

          if (feature.geometry.type === 'Point') {
            const coordinates = feature.geometry.coordinates as [number, number];
            setDetailCoordinates(map.project(coordinates));
          }
        } else {
          // If no vehicle was clicked, clear the selected vehicle
          setSelectedVehicle(null);
        }
      });

      map.on('mousemove', 'vehicles-layer', (e) => {
        if (!e.features || e.features.length === 0) return;
        map.getCanvas().style.cursor = 'pointer';
        const featureId = e.features[0].id as number;
        if (lastHoveredId !== null && lastHoveredId !== featureId) {
          map.setFeatureState({ source: 'vehicles', id: lastHoveredId }, { hover: false });
        }
        lastHoveredId = featureId;
        map.setFeatureState({ source: 'vehicles', id: featureId }, { hover: true });
      });

      map.on('mouseleave', 'vehicles-layer', () => {
        if (lastHoveredId !== null) {
          map.getCanvas().style.cursor = 'default';
          map.setFeatureState({ source: 'vehicles', id: lastHoveredId }, { hover: false });
          lastHoveredId = null;
        }
      });

      return () => {
        map.remove();
        engine.terminate().catch(console.error);
      }
    }
  }, []);

  useEffect(() => {
    console.log('Selected vehicle updated:', selectedVehicle);
  }, [selectedVehicle]);

  return (
    <div ref={mapContainerRef} style={{ width: '100wh', height: '100vh' }}>
      {selectedVehicle &&
        <DetailPopover 
          vehicle={selectedVehicle} 
          style={{
            left: detailCoordinates ? `${detailCoordinates.x}px` : '0px',
            top: detailCoordinates ? `${detailCoordinates.y}px` : '0px'
          }}
          />
      }
    </div>
  );
};

export default Map;
