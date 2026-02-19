-- SQL script om project_translations tabel te maken in Supabase
-- Voer dit uit in de Supabase SQL Editor

-- Maak de project_translations tabel
CREATE TABLE IF NOT EXISTS project_translations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    language_code VARCHAR(5) NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Zorg dat elke project/taal combinatie uniek is
    UNIQUE(project_id, language_code)
);

-- Maak een index voor snelle lookups
CREATE INDEX IF NOT EXISTS idx_project_translations_project_id ON project_translations(project_id);
CREATE INDEX IF NOT EXISTS idx_project_translations_language ON project_translations(language_code);

-- Row Level Security inschakelen
ALTER TABLE project_translations ENABLE ROW LEVEL SECURITY;

-- Iedereen mag lezen (public access voor frontend)
CREATE POLICY "Public can read translations" ON project_translations
    FOR SELECT USING (true);

-- Alleen authenticated users mogen schrijven (voor admin)
CREATE POLICY "Authenticated users can insert translations" ON project_translations
    FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can update translations" ON project_translations
    FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Authenticated users can delete translations" ON project_translations
    FOR DELETE TO authenticated USING (true);

-- Trigger voor updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_project_translations_updated_at
    BEFORE UPDATE ON project_translations
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- OPTIONEEL: Kopieer bestaande Nederlandse teksten als basis
-- ============================================
-- INSERT INTO project_translations (project_id, language_code, title, description)
-- SELECT id, 'nl', title, description FROM projects;
