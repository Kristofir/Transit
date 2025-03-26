import type { Database } from "~/types/database.types";

type VehicleRow = Database['public']['Tables']['vehicles']['Row'];
type Picks = 'vehicle_id' | 'vehicle_label' | 'trip_id' | 'schedule_relationship' | 'current_stop_sequence'

type Vehicle = Pick<VehicleRow, Picks> & {
  longitude: number;
  latitude: number;
}

export type {
  Vehicle
}