import { createClient } from '@supabase/supabase-js'


const supabaseUrl = "https://fgitrkjvdtokxjjavfyy.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZnaXRya2p2ZHRva3hqamF2Znl5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM4NDI1MTYsImV4cCI6MjA1OTQxODUxNn0.yPD4TZmaPimTUzi8nI-6wAZJN_yHcrzvSBUIBltAwLc"


export const supabase = createClient(supabaseUrl, supabaseAnonKey)