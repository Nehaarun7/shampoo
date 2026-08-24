import { useState } from "react";
import Hero from "../components/Hero";
import MoodSelector from "../components/MoodSelector";
import MusicPlayer from "../components/MusicPlayer";
import ProductCollection from "../components/ProductCollection";
import Customizer from "../components/Customizer";
import Playlists from "../components/Playlists";
import HowItWorks from "../components/HowItWorks";
import SmartRecommendation from "../components/SmartRecommendation";
import Reviews from "../components/Reviews";
import BrandStory from "../components/BrandStory";

const Home = () => {
  const [activeSong, setActiveSong] = useState(null);

  return (
    <main id="main-content">
      <Hero
        onFindVibe={() => document.getElementById("mood")?.scrollIntoView({ behavior: "smooth" })}
        onExplore={() => document.getElementById("collection")?.scrollIntoView({ behavior: "smooth" })}
      />
      <HowItWorks />
      <MoodSelector />
      <MusicPlayer activeSong={activeSong} />
      <ProductCollection />
      <SmartRecommendation />
      <Playlists onPlaylistPlay={(song) => setActiveSong(song)} />
      <Customizer />
      <Reviews />
      <BrandStory />
    </main>
  );
};

export default Home;
