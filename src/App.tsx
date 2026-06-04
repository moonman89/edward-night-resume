import { useState } from "react";
import { AiAssistant } from "./components/AiAssistant";
import { PhotoPortfolio } from "./components/PhotoPortfolio";
import { SlideDeck } from "./components/SlideDeck";

type View = "portfolio" | "resume";

function App() {
  const [view, setView] = useState<View>("resume");

  return (
    <>
      {view === "resume" ? (
        <SlideDeck onOpenPortfolio={() => setView("portfolio")} />
      ) : (
        <PhotoPortfolio onOpenResume={() => setView("resume")} />
      )}
      <AiAssistant />
    </>
  );
}

export default App;
