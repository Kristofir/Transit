export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      agencies: {
        Row: {
          agency_id: number
          agency_name: string
          region: string
          source_feed_key: string | null
          source_feed_url: string | null
        }
        Insert: {
          agency_id?: number
          agency_name: string
          region: string
          source_feed_key?: string | null
          source_feed_url?: string | null
        }
        Update: {
          agency_id?: number
          agency_name?: string
          region?: string
          source_feed_key?: string | null
          source_feed_url?: string | null
        }
        Relationships: []
      }
      static_routes: {
        Row: {
          agency_id: string | null
          id: number
          region: string | null
          route_color: string | null
          route_desc: string | null
          route_id: string | null
          route_long_name: string | null
          route_short_name: string | null
          route_text_color: string | null
          route_type: number | null
          route_url: string | null
        }
        Insert: {
          agency_id?: string | null
          id?: number
          region?: string | null
          route_color?: string | null
          route_desc?: string | null
          route_id?: string | null
          route_long_name?: string | null
          route_short_name?: string | null
          route_text_color?: string | null
          route_type?: number | null
          route_url?: string | null
        }
        Update: {
          agency_id?: string | null
          id?: number
          region?: string | null
          route_color?: string | null
          route_desc?: string | null
          route_id?: string | null
          route_long_name?: string | null
          route_short_name?: string | null
          route_text_color?: string | null
          route_type?: number | null
          route_url?: string | null
        }
        Relationships: []
      }
      static_shapes: {
        Row: {
          agency_id: string
          region: string
          shape_dist_traveled: number | null
          shape_id: number
          shape_pt_location: unknown | null
          shape_pt_sequence: number | null
        }
        Insert: {
          agency_id: string
          region: string
          shape_dist_traveled?: number | null
          shape_id?: number
          shape_pt_location?: unknown | null
          shape_pt_sequence?: number | null
        }
        Update: {
          agency_id?: string
          region?: string
          shape_dist_traveled?: number | null
          shape_id?: number
          shape_pt_location?: unknown | null
          shape_pt_sequence?: number | null
        }
        Relationships: []
      }
      static_stops: {
        Row: {
          agency_id: string
          region: string
          stop_code: number | null
          stop_id: number
          stop_location: unknown | null
          stop_name: string | null
        }
        Insert: {
          agency_id: string
          region: string
          stop_code?: number | null
          stop_id?: number
          stop_location?: unknown | null
          stop_name?: string | null
        }
        Update: {
          agency_id?: string
          region?: string
          stop_code?: number | null
          stop_id?: number
          stop_location?: unknown | null
          stop_name?: string | null
        }
        Relationships: []
      }
      static_trips: {
        Row: {
          agency_id: string
          block_id: string | null
          direction_id: number | null
          region: string
          route_id: string
          service_id: string | null
          shape_id: number | null
          trip_headsign: string | null
          trip_id: string | null
        }
        Insert: {
          agency_id: string
          block_id?: string | null
          direction_id?: number | null
          region: string
          route_id: string
          service_id?: string | null
          shape_id?: number | null
          trip_headsign?: string | null
          trip_id?: string | null
        }
        Update: {
          agency_id?: string
          block_id?: string | null
          direction_id?: number | null
          region?: string
          route_id?: string
          service_id?: string | null
          shape_id?: number | null
          trip_headsign?: string | null
          trip_id?: string | null
        }
        Relationships: []
      }
      stop_time_updates: {
        Row: {
          agency_id: string
          region: string
          stop_id: number
        }
        Insert: {
          agency_id: string
          region: string
          stop_id?: number
        }
        Update: {
          agency_id?: string
          region?: string
          stop_id?: number
        }
        Relationships: []
      }
      trip_updates: {
        Row: {
          agency_id: string
          direction_id: number | null
          label: string | null
          last_updated: string | null
          region: string
          route_id: string | null
          schedule_relationship:
            | Database["public"]["Enums"]["ScheduleRelationship"]
            | null
          start_date: string | null
          timestamp: number | null
          trip_id: string
          vehicle_id: string | null
        }
        Insert: {
          agency_id: string
          direction_id?: number | null
          label?: string | null
          last_updated?: string | null
          region: string
          route_id?: string | null
          schedule_relationship?:
            | Database["public"]["Enums"]["ScheduleRelationship"]
            | null
          start_date?: string | null
          timestamp?: number | null
          trip_id: string
          vehicle_id?: string | null
        }
        Update: {
          agency_id?: string
          direction_id?: number | null
          label?: string | null
          last_updated?: string | null
          region?: string
          route_id?: string | null
          schedule_relationship?:
            | Database["public"]["Enums"]["ScheduleRelationship"]
            | null
          start_date?: string | null
          timestamp?: number | null
          trip_id?: string
          vehicle_id?: string | null
        }
        Relationships: []
      }
      vehicles: {
        Row: {
          agency_id: string
          current_status:
            | Database["public"]["Enums"]["VehicleStopStatus"]
            | null
          current_stop_sequence: number | null
          direction_id: number | null
          last_updated: string | null
          position: unknown | null
          region: string
          route_id: string | null
          schedule_relationship:
            | Database["public"]["Enums"]["ScheduleRelationship"]
            | null
          speed: number | null
          start_date: string | null
          timestamp: number | null
          trip_id: string | null
          vehicle_id: string
          vehicle_label: string | null
        }
        Insert: {
          agency_id: string
          current_status?:
            | Database["public"]["Enums"]["VehicleStopStatus"]
            | null
          current_stop_sequence?: number | null
          direction_id?: number | null
          last_updated?: string | null
          position?: unknown | null
          region: string
          route_id?: string | null
          schedule_relationship?:
            | Database["public"]["Enums"]["ScheduleRelationship"]
            | null
          speed?: number | null
          start_date?: string | null
          timestamp?: number | null
          trip_id?: string | null
          vehicle_id: string
          vehicle_label?: string | null
        }
        Update: {
          agency_id?: string
          current_status?:
            | Database["public"]["Enums"]["VehicleStopStatus"]
            | null
          current_stop_sequence?: number | null
          direction_id?: number | null
          last_updated?: string | null
          position?: unknown | null
          region?: string
          route_id?: string | null
          schedule_relationship?:
            | Database["public"]["Enums"]["ScheduleRelationship"]
            | null
          speed?: number | null
          start_date?: string | null
          timestamp?: number | null
          trip_id?: string | null
          vehicle_id?: string
          vehicle_label?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      echo: {
        Args: {
          say: string
        }
        Returns: string
      }
      "Get all vehicles": {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      "Get vehicles": {
        Args: {
          limit_count: number
        }
        Returns: Json
      }
    }
    Enums: {
      ScheduleRelationship:
        | "SCHEDULED"
        | "ADDED"
        | "UNSCHEDULED"
        | "CANCELED"
        | "DUPLICATED"
        | "DELETED"
      VehicleStopStatus: "INCOMING_AT" | "STOPPED_AT" | "IN_TRANSIT_TO"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
