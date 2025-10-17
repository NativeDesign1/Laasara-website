import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ktbgigqkcxxtsfbkqfvi.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt0YmdpZ3FrY3h4dHNmYmtxZnZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA1MzQwMjYsImV4cCI6MjA3NjExMDAyNn0.K89yhjwy9ENCK3ZMFLefq0lyZZ12u_sjxYph47asDi8';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);