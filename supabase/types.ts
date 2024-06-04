import { Date, Destination, GeoCoordinate, Trip } from "@/types"

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      trips: {
        Row: {
          id: string // bigint
          riders?: string[] | null // uuid[]
          price: number
          route: string[]
          status?: string | null // text
          start?: Date | null // timestamp with time zone
          end?: Date | null // timestamp
          destination?: string | null // uuid
        }
        Insert: {
          id?: string | null // bigint, nullable for insert as it's auto-generated
          riders?: string[] | null // uuid[], nullable
          price: number
          route: string[] | null // text[], nullable
          status?: string | null // text
          start?: Date | null // timestamp with time zone
          end?: Date | null // timestamp
          destination?: string | null // uuid
        }
        Update: {
          id?: string | null // bigint, nullable for update
          riders?: string[] | null // uuid[], nullable
          price?: number | null // double precision, nullable
          route?: string[] | null // text[], nullable
          status?: string | null // text
          start?: Date | null // timestamp with time zone
          end?: Date | null // timestamp
          destination?: string | null // uuid
        }
        Relationships: [
          {
            foreignKeyName: "trips_id_fkey"
            columns: ["trip_id"]
            referencedRelation: "trips"
            referencedColumns: ["id"]
          }
        ]
      }
      usertrips: {
        Row: {
          id: string // bigint
          uid: string
          tripid: string
          origin: string
          destination: string
          price: number
          pickup?: Date | null // jsonb
          dropoff?: Date | null // jsonb
          created_at?: string | null // timestamp with time zone
          status?: string | null // text
        }
        Insert: {
          id: string | null // bigint, nullable for insert as it's auto-generated
          uid?: string
          tripid?: string
          origin?: string
          destination?: string
          price?: number
          pickup?: Date | null // jsonb, nullable
          dropoff?: Date | null // jsonb, nullable
          created_at?: string | null // timestamp with time zone, nullable
          status?: string | null // text
        }
        Update: {
          id: string | null // bigint, nullable for update
          uid: string | null // uuid, nullable
          tripid?: string
          origin?: string | null // uuid, nullable
          destination?: string | null // uuid, nullable
          price?: number | null // numeric, nullable
          pickup?: Date | null // jsonb, nullable
          dropoff?: Date | null // jsonb, nullable
          created_at?: string | null // timestamp with time zone, nullable
          status?: string | null // text
        }
        Relationships: [
          {
            foreignKeyName: "userTrips_id_fkey"
            columns: ["trip_id"]
            referencedRelation: "userTrips"
            referencedColumns: ["id"]
          }
        ]
      }
      stripe_sessions: {
        Row: {
          id: string
          session_id: string
        }
        Insert: {
          id: string
          session_id?: string
        }
        Update: {
          id: string
          session_id?: string
        }
        Relationships: []
      }

      destinations: {
        Row: {
          id: string
          address: string
          category: string
          photo: string
          trip_ids: string[]
          name: string
          times?: string[] | null
          lon: number
          lat: number
        }
        Insert: {
          id: string | null
          address?: string | null
          category?: string
          photo?: string | null
          trip_ids?: string[] | null
          name?: string | null
          times?: string[] | null
          lon?: number | null
          lat?: number | null
        }
        Update: {
          id: string | null
          address?: string | null
          category?: string
          photo?: string | null
          trip_ids?: string[] | null
          name?: string | null
          times?: string[] | null
          lon?: number | null
          lat?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "destinations_id_fkey"
            columns: ["destination_id"]
            referencedRelation: "destinations"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          bio: string
          geolocation: GeoCoordinate | null
          billing_address: Json | null
          payment_method: Json | null
          created_at: string
          display_name: string
          has_onboarded: boolean
          id: string
          image_path: string
          image_url: string
          updated_at: string | null
          address: string | null
          username: string
          trips?: string[] | null
        }
        Insert: {
          bio?: string
          geolocation?: GeoCoordinate | null
          billing_address?: Json | null
          payment_method?: Json | null
          created_at?: string
          display_name?: string
          has_onboarded?: boolean
          id?: string
          image_path?: string
          image_url?: string
          profile_context?: string
          updated_at?: string | null
          address?: string | null
          username?: string
          trips?: string[] | null
        }
        Update: {
          bio?: string
          geolocation?: GeoCoordinate | null
          billing_address?: Json | null
          payment_method?: Json | null
          created_at?: string
          display_name?: string
          has_onboarded?: boolean
          id?: string
          image_path?: string
          image_url?: string
          profile_context?: string
          updated_at?: string | null
          address?: string | null
          username?: string
          trips?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {}
    Enums: {
      pricing_plan_interval: "day" | "week" | "month" | "year"
      pricing_type: "one_time" | "recurring"
      subscription_status:
        | "trialing"
        | "active"
        | "canceled"
        | "incomplete"
        | "incomplete_expired"
        | "past_due"
        | "unpaid"
        | "paused"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          owner_id: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          owner_id: string | null
          path_tokens: string[] | null
          updated_at: string | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string
          name: string
          owner: string
          metadata: Json
        }
        Returns: undefined
      }
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: string[]
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
      }
    }
    Enums: {
      [_ in never]: never
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
    : never = never
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
    : never = never
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
    : never = never
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
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
