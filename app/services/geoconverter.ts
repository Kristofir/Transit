// Types
import type { Vehicle } from "~/types/database_functions.types";
import type {
  Feature, 
  FeatureCollection
} from "geojson";

// Converts a Supabase row into a GeoJSON feature.
export function convert_vehicle_to_feature(row: Vehicle): Feature {
  let feature: Feature = {
    id: row.vehicle_id,
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [row.longitude, row.latitude],
    },
    properties: Object.keys(row).reduce((acc, key) => {
      if (key !== "longitude" && key !== "latitude") {
        acc[key] = row[key as keyof Vehicle];
      }
      return acc;
    }, {} as Record<string, any>),
  };

  return feature;
}

export function convert_vehicles_to_feature_collection(rows: Vehicle[]): FeatureCollection {
  let featureCollection: FeatureCollection = {
    type: "FeatureCollection",
    features: []
  };

  rows.forEach((row) => {
    let feature = convert_vehicle_to_feature(row);
    featureCollection.features.push(feature);
  });

  return featureCollection;
}