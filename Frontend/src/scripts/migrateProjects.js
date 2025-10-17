import { supabase } from '../lib/supabaseClient.js'; // Note the .js extension
import schaap from "../assets/Projecten/schaap-1-rode-muur (1).jpeg";
import Ramadan from "../assets/Projecten/Projectramadaan.jpeg";
import School from "../assets/Projecten/ProjectSchool.jpg";
import Vervoer from "../assets/Projecten/projectVervoer.jpg";
import Begraafplaats from "../assets/Projecten/projectbegraafplaats.jpg";
import zakaat from "../assets/Projecten/zakaat.jpg";
import voedselpakket from "../assets/Projecten/Voedselpakket.jpg";
import hajar from "../assets/Projecten/Hajar-300x244.jpg";
import Ibrahim from "../assets/Projecten/Projedct-Ibrahim-300x158.jpg";
import Waterput from "../assets/Projecten/waterputmaroc.jpeg";
import Offerfeest from "../assets/Projecten/offerfeest.jpg";
import vervoerVid from "../assets/Projecten/schoolvervoer.mp4";

const projectsData = [
  {
    title: "Project Offerfeest 2024",
    description: "Tijdens het Offerfeest verstrekken we pakketten aan mensen in nood.",
    image_url: schaap,
    additional_images: [schaap, Offerfeest],
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
    image_url: Ramadan,
    additional_images: [Ramadan, voedselpakket],
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
    image_url: Waterput,
    additional_images: [Waterput],
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
    image_url: Vervoer,
    additional_images: [Vervoer],
    videos: [{ src: vervoerVid, type: "video/mp4" }],
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
    image_url: Begraafplaats,
    additional_images: [Begraafplaats],
    full_description: "De begraafplaats in Laassara heeft regelmatig onderhoud nodig.",
    details: [
      "Regelmatig onderhoud",
      "Renovatie van infrastructuur",
      "Respect voor overledenen",
      "Toegankelijkheid voor bezoekers"
    ],
    impact: "Een waardige rustplaats voor overleden dierbaren."
  }
];

async function migrateProjects() {
  try {
    console.log('Starting project migration...');
    let successCount = 0;
    let errorCount = 0;

    for (const project of projectsData) {
      try {
        console.log(`Processing project: ${project.title}`);

        const { data, error } = await supabase
          .from('projects')
          .insert([{
            title: project.title,
            description: project.description,
            image_url: project.image_url,
            additional_images: project.additional_images,
            full_description: project.full_description,
            details: project.details,
            impact: project.impact,
            videos: project.videos || []
          }])
          .select();

        if (error) {
          throw error;
        }

        console.log(`✓ Successfully migrated: ${project.title}`);
        successCount++;
      } catch (error) {
        console.error(`✗ Failed to migrate ${project.title}:`, error.message);
        errorCount++;
      }
    }

    console.log('\nMigration Summary:');
    console.log(`Successfully migrated: ${successCount} projects`);
    console.log(`Failed to migrate: ${errorCount} projects`);
    
  } catch (error) {
    console.error('Migration failed:', error.message);
  }
}

// Run the migration
migrateProjects().then(() => {
  console.log('Migration process completed.');
}).catch(error => {
  console.error('Fatal error during migration:', error);
});