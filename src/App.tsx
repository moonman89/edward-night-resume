import { useState } from "react";
import { PhotoPortfolio } from "./components/PhotoPortfolio";
import { SlideDeck } from "./components/SlideDeck";

type View = "portfolio" | "resume";

function App() {
  const [view, setView] = useState<View>("resume");

  if (view === "resume") {
    return <SlideDeck onOpenPortfolio={() => setView("portfolio")} />;
  }

  return <PhotoPortfolio onOpenResume={() => setView("resume")} />;
}

export default App;
