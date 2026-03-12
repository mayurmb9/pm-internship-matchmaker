import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://enaauzcgmxikdzzmletq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVuYWF1emNnbXhpa2R6em1sZXRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMzMDIxMjYsImV4cCI6MjA4ODg3ODEyNn0.bNZZQd4jz0Pty3nAx5485SS0OII6Egw0V9hl2PWV1eA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false, // Recommended for some React Native setups to avoid issues during initial dev
    detectSessionInUrl: false,
  },
});
