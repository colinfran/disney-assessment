import { client } from "./index.js";

const data = [
  { 
    title: "Bug Buck Bunny",
    description: "Big Buck Bunny tells the story of a giant rabbit with a heart bigger than himself. When one sunny day three rodents rudely harass him, something snaps... and the rabbit ain't no bunny anymore! In the typical cartoon tradition he prepares the nasty rodents a comical revenge.\n\nLicensed under the Creative Commons Attribution license\nhttp://www.bigbuckbunny.org",
    fileId: "58887eb956e84a1fbc9080faad18291e",
    duration: "09:56" 
  },
  {
    title:"Tears of Steel",
    description : "Tears of Steel was realized with crowd-funding by users of the open source 3D creation tool Blender. Target was to improve and test a complete open and free pipeline for visual effects in film - and to make a compelling sci-fi film in Amsterdam, the Netherlands.  The film itself, and all raw material used for making it, have been released under the Creatieve Commons 3.0 Attribution license. Visit the tearsofsteel.org website to find out more about this, or to purchase the 4-DVD box with a lot of extras.  (CC) Blender Foundation - http://www.tearsofsteel.org", 
    fileId:"2e9ea34385b848e48278a6c6c3c196a9",
    duration:"12:14"
  },
  {
    title:"Spinning World",
    description: "Embark on a mesmerizing journey through the cosmos with our latest video capturing the Earth in its graceful spin. Behold the planet's majestic rotation, a timeless dance that reveals the beauty of day and night unfolding. As you watch the Earth turn on its axis, you'll be captivated by the stunning play of sunlight and shadow, offering a celestial perspective that reminds us of the wondrous motion shaping our world.",
    fileId:"2ee4ec3807024e9aac69784d9baa5ec2",
    duration:"00:30"
  },
  { 
    title: "Ocean Animals",
    description: "Dive into the vibrant underwater world with our latest video capturing the dynamic marine life in action. Witness the graceful spectacle as birds plunge into the water, skillfully hunting for fish, while playful dolphins gracefully navigate the depths in pursuit of their aquatic prey. This enchanting glimpse into the sea's bustling ecosystem offers a front-row seat to the thrilling dance of survival, where nature's hunters showcase their prowess in a mesmerizing display of life beneath the waves.",
    fileId: "f29f7aa5102c4b10bfe93cb064dcba39",
    duration: "00:47" 
  },
  {
    title:"Scenic Ocean Rocks",
    description: "Experience the mesmerizing dance of nature in our latest video. Watch as waves gracefully crash against ancient rocks, forming a captivating scene of raw power and timeless beauty. Let the rhythmic soundtrack of the ocean provide a moment of serenity and awe, inviting you to escape into the tranquil embrace of this scenic view.",
    fileId:"7d5bc95ebfbc42dd8c3740070c6946b4",
    duration:"00:28"
  },
  {
    title:"Elephants Dream",
    description: "The first Blender Open Movie from 2006",
    fileId:"fd80c28ab54344beb2587964b7dc0f73",
    duration:"10:54"
  },
  {
    title:"For Bigger Blazes",
    description : "HBO GO now works with Chromecast -- the easiest way to enjoy online video on your TV. For when you want to settle into your Iron Throne to watch the latest episodes. For $35.\nLearn how to use Chromecast with HBO GO and more at google.com/chromecast.",
    fileId:"ce28981b66d74de8bf701af69d9d8a64",
    duration:"00:15"
  },
  { 
    title: "For Bigger Escapes",
    description : "Introducing Chromecast. The easiest way to enjoy online video and music on your TV—for when Batman's escapes aren't quite big enough. For $35. Learn how to use Chromecast with Google Play Movies and more at google.com/chromecast.",
    fileId: "adf8a4f3261645a1b206e69c19072587",
    duration:"00:15"
  },
  {
    title:"For Bigger Meltdowns",
    description :"Introducing Chromecast. The easiest way to enjoy online video and music on your TV—for when you want to make Buster's big meltdowns even bigger. For $35. Learn how to use Chromecast with Netflix and more at google.com/chromecast.", 
    fileId:"0e81bd456c7e47b9a58d95cc29f9925f",
    duration:"00:15"
  },
  {
    title:"Sintel",
    description: "Sintel is an independently produced short film, initiated by the Blender Foundation as a means to further improve and validate the free/open source 3D creation suite Blender. With initial funding provided by 1000s of donations via the internet community, it has again proven to be a viable development model for both open 3D technology as for independent animation film.\nThis 15 minute film has been realized in the studio of the Amsterdam Blender Institute, by an international team of artists and developers. In addition to that, several crucial technical and creative targets have been realized online, by developers and artists and teams all over the world.\nwww.sintel.org",
    fileId:"5e3b62e7bb114598a7177bcf24575314",
    duration:"14:48"
  },
];

const createCollection = async () => {
  console.log("Creating Streams collection.");
  try {
    await client.connect();
    const db = client.db("disney-assessment");
    var res = await db.collection("streams").find().toArray();
    if (res.length > 0){
      console.log("Streams collection already exists. Skipping step.");
    }
    else{
      await db.createCollection("streams");
      console.log("Streams collection created");
    }
  } catch (error) {
    console.log(error);
  }
};

const addData = async () => {
  try {
    await client.connect();
    const db = client.db("disney-assessment");
    const streams = db.collection("streams");
    const count = await streams.countDocuments();
    if (count === 10){
      console.log("The data already exists in the stream collection. Skipping Step.");
    } else {
      const result = await streams.insertMany(data, { ordered: true });
      console.log(`${result.insertedCount} documents were inserted.`);
    }
  } catch (error) {
    console.log(error);
  } finally{
    await client.close();
  }
};

createCollection();
addData();