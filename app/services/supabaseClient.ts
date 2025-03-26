import type { Database } from "~/types/database.types";

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://xgxsdhzzhoumysdmvvhu.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhneHNkaHp6aG91bXlzZG12dmh1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk4NTQ5MzgsImV4cCI6MjA1NTQzMDkzOH0.thXQCOk1uAWFIkZRjgwFNMlT65j3uOUJOeZ0agpEaZA";

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase URL and Anon Key must be provided');
}

const supabase = createClient<Database>(supabaseUrl, supabaseKey);

// Exports

export default supabase;

export async function fetchTransitData(): Promise<unknown[]> {
  const { data, error } = await supabase
    .from('vehicles')
    .select();

  if (error) {
    console.error('Error fetching transit geo data:', error);
    return [];
  }

  return data;
}