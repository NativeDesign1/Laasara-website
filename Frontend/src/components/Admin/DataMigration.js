import React, { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

 const projectsData = [
  {
    title: "Project Offerfeest 2024",
    description: "Tijdens het Offerfeest verstrekken we pakketten aan mensen in nood.",
    image_url: "https://ktbgigqkcxxtsfbkqfvi.supabase.co/storage/v1/object/public/Project-images/Projecten/schaap-1-rode-muur.jpeg",
    additional_images: [
      "https://ktbgigqkcxxtsfbkqfvi.supabase.co/storage/v1/object/public/Project-images/Projecten/offerfeest.jpg"
    ],
    full_description: "Tijdens het Offerfeest zetten we ons in om offerfeestpakketten te verstrekken aan mensen die dit het hardst nodig hebben.",
    details: [
      "Verstrekking van offerfeestpakketten",
      "Ondersteuning van families in nood",
      "Gemeenschappelijke viering mogelijk maken",
      "Bevordering van solidariteit"
    ],
    impact: "Honderden families kunnen dankzij dit project waardig deelnemen aan het Offerfeest."
  },
  {
    title: "Project Ramadan 2024",
    description: "Help families tijdens de Ramadan met voedselpakketten.",
    image_url: "https://ktbgigqkcxxtsfbkqfvi.supabase.co/storage/v1/object/public/Project-images/Projecten/Projectramadaan.jpeg",
    additional_images: [
      "https://ktbgigqkcxxtsfbkqfvi.supabase.co/storage/v1/object/public/Project-images/Projecten/Voedselpakket.jpg"
    ],
    full_description: "Tijdens de Ramadan organiseren we een speciale campagne om voedselpakketten te verstrekken aan families in nood.",
    details: [
      "Complete voedselpakketten voor een maand",
      "Distributie aan 200+ families",
      "Lokaal ingekochte producten",
      "Inclusief dadels en andere traditionele items"
    ],
    impact: "Met dit project kunnen honderden families waardig de Ramadan doorbrengen."
  },
  {
    title: "Project Waterput",
    description: "Help mee met de aanleg van waterputten in droge gebieden.",
    image_url: "https://ktbgigqkcxxtsfbkqfvi.supabase.co/storage/v1/object/public/Project-images/Projecten/waterputmaroc.jpeg",
    additional_images: [],
    full_description: "In veel gebieden is toegang tot schoon water een dagelijkse uitdaging.",
    details: [
      "Duurzame watervoorziening",
      "Professionele constructie",
      "Onderhoud en beheer door lokale gemeenschap",
      "Impact op gezondheid en hygiëne"
    ],
    impact: "Een waterput voorziet gemiddeld 1000 mensen van dagelijks schoon water."
  },
  {
    title: "Project Schoolvervoer",
    description: "Help kinderen veilig naar school te komen.",
    image_url: "https://ktbgigqkcxxtsfbkqfvi.supabase.co/storage/v1/object/public/Project-images/Projecten/projectVervoer.jpg",
    additional_images: [],
    videos: [
      "https://ktbgigqkcxxtsfbkqfvi.supabase.co/storage/v1/object/public/Project-images/Projecten/schoolvervoer.mp4"
    ],
    full_description: "De stichting Douar-Laassara beschikt over twee schoolbussen voor het vervoer van kinderen.",
    details: [
      "Dagelijks vervoer voor 150 kinderen",
      "Zeven dorpen bereikt",
      "Professionele chauffeurs",
      "Regelmatig onderhoud"
    ],
    impact: "Het project zorgt ervoor dat 150 kinderen veilig naar school kunnen reizen."
  },
  {
    title: "Project Begraafplaats",
    description: "Help met het onderhoud van de begraafplaats.",
    image_url: "https://ktbgigqkcxxtsfbkqfvi.supabase.co/storage/v1/object/public/Project-images/Projecten/projectbegraafplaats.jpg",
    additional_images: [],
    full_description: "De begraafplaats in Laassara heeft regelmatig onderhoud nodig.",
    details: [
      "Regelmatig onderhoud",
      "Renovatie van infrastructuur",
      "Respect voor overledenen",
      "Toegankelijkheid voor bezoekers"
    ],
    impact: "Een waardige rustplaats voor overleden dierbaren."
  },
  {
    title: "Project Ibrahim",
    description: "Help weeskinderen en families in nood.",
    image_url: "https://ktbgigqkcxxtsfbkqfvi.supabase.co/storage/v1/object/public/Project-images/Projecten/Projedct-Ibrahim-300x158.jpg",
    additional_images: [],
    full_description: "Project Ibrahim richt zich op het ondersteunen van weeskinderen en families die in moeilijke omstandigheden leven.",
    details: [
      "Ondersteuning van weeskinderen",
      "Hulp aan families in nood",
      "Educatieve ondersteuning",
      "Maandelijkse voedselpakketten"
    ],
    impact: "Dit project helpt tientallen weeskinderen en families een betere toekomst op te bouwen."
  }
];
const DataMigration = () => {
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleMigration = async () => {
    setLoading(true);
    try {
      setStatus('Starting migration...');
      let successCount = 0;
      let errorCount = 0;

      // Clear existing data first
      const { error: deleteError } = await supabase
        .from('projects')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000');

      if (deleteError) {
        setStatus(prev => prev + '\n✗ Failed to clear existing data: ' + deleteError.message);
        return;
      }

      setStatus(prev => prev + '\nCleared existing data successfully.');

      for (const project of projectsData) {
        try {
          const projectData = {
            title: project.title,
            description: project.description,
            image_url: project.image_url,
            additional_images: project.additional_images || [],
            full_description: project.full_description,
            details: project.details,
            impact: project.impact
          };

          // Only add videos field if it exists in the project data
          if (project.videos) {
            projectData.videos = project.videos;
          }

          const { data, error } = await supabase
            .from('projects')
            .insert([projectData])
            .select();

          if (error) throw error;
          
          successCount++;
          setStatus(prev => prev + `\n✓ Migrated: ${project.title}`);
        } catch (error) {
          errorCount++;
          setStatus(prev => prev + `\n✗ Failed: ${project.title} - ${error.message}`);
          console.error(`Error migrating ${project.title}:`, error);
        }
      }

      setStatus(prev => prev + `\n\nMigration complete:\nSuccess: ${successCount}\nErrors: ${errorCount}`);
    } catch (error) {
      setStatus(`Migration failed: ${error.message}`);
      console.error('Migration failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 my-[250px] max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Project Data Migration</h1>
      <button
        onClick={handleMigration}
        disabled={loading}
        className={`mb-4 px-6 py-2 rounded ${
          loading 
            ? 'bg-gray-400' 
            : 'bg-blue-500 hover:bg-blue-600'
        } text-white font-semibold`}
      >
        {loading ? 'Migrating...' : 'Start Migration'}
      </button>
      {status && (
        <pre className="mt-4 p-4 bg-gray-100 rounded-lg whitespace-pre-wrap">
          {status}
        </pre>
      )}
    </div>
  );
};

export default DataMigration;