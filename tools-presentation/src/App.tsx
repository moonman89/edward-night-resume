import { CompareSection } from "./components/CompareSection";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { RoiSection } from "./components/RoiSection";
import { ToolSection } from "./components/ToolSection";

function App() {
  return (
    <div className="page">
      <Hero />
      <ToolSection />
      <CompareSection />
      <RoiSection />
      <Footer />
    </div>
  );
}

export default App;
