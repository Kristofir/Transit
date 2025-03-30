import * as Comlink from 'comlink';

import type { 
  LngLat,
  LngLatBounds
} from "mapbox-gl";

import type { 
  Vehicle
} from "~/types/database_functions.types";

import type {
  Feature,
  FeatureCollection
} from "geojson";

import supabase from "~/services/supabaseClient";
import * as geoconverter from "~/services/geoconverter";


class EngineClass {
  vehicles : Vehicle[] = [];
  vehicleGeojson: FeatureCollection = {
    type: "FeatureCollection",
    features: []
  };

  private vehicleFetchIntervalId: ReturnType<typeof setInterval> | null = null;
  private vehicleComputeIntervalId: ReturnType<typeof setInterval> | null = null;

  constructor() {
    this.startPolling();
  }

  terminate() {
    // Clear the intervals when the engine is terminated
    // This is important to prevent memory leaks and unnecessary computations

    // Clear the vehicle fetch interval
    if (this.vehicleFetchIntervalId !== null) {
      clearInterval(this.vehicleFetchIntervalId);
      this.vehicleFetchIntervalId = null;
    }

    // Clear the vehicle compute interval
    if (this.vehicleComputeIntervalId !== null) {
      clearInterval(this.vehicleComputeIntervalId);
      this.vehicleComputeIntervalId = null;
    }
  }

  async startPolling(): Promise<void> {
    await this.poll(); // Initial fetch

    this.vehicleFetchIntervalId = setInterval(async () => {
      await this.poll()
    }, 10000);
  }
  
  async poll(): Promise<void> {
    let { data, error } = await supabase
      .rpc('Get vehicles', { limit_count: 1200 })

    if (!data || error) {
      console.error('Error fetching transit geo data:', error);
    }

    this.vehicles = data as Vehicle[];
    await this.compute();
  }

  async compute(): Promise<void> {
    this.vehicleGeojson.features = this.vehicles.map((vehicle) => {
      return geoconverter.convert_vehicle_to_feature(vehicle);
    });
  }

  async query(vehicle_id: string | number): Promise<Vehicle | null> {
    return this.vehicles.find(v => v.vehicle_id == vehicle_id) || null;
  }
  
  getVehicles(): FeatureCollection {
    return this.vehicleGeojson;
  }

}

const engine = new EngineClass();

Comlink.expose(engine);

export type { EngineClass };