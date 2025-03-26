import supabase from "~/services/supabaseClient";

import { convert_vehicle_to_feature } from "./geoconverter";


// Types
import type { Vehicle } from "~/types/database_functions.types";
import { PostgrestError } from "@supabase/supabase-js";


// Let's grab some of our source data from Supabase

describe("makeFeature", () => {

  it("should convert a Supabase row into a GeoJSON feature", async () => {
    let { data, error } = await supabase
      .rpc('Get vehicles', { limit_count: 3 })
    
    if (!data || error) {
      console.error('Error fetching transit geo data:', error);
      throw new Error('Error fetching transit geo data');
    }

    const features = (data as Vehicle[]).map((row) => {
      const feature = convert_vehicle_to_feature(row);
      return feature;
    })

    // console.dir(features, { depth: null });
    expect(features).toBeDefined();
    expect(features).toHaveLength(3);
    expect(features[0]).toHaveProperty("type", "Feature");
    expect(features[0]).toHaveProperty("geometry");
    expect(features[0].geometry).toHaveProperty("type", "Point");
    expect(features[0].geometry).toHaveProperty("coordinates");
  });
});