import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GameProvider } from "./context/GameContext";
import { WordProvider } from "./context/WordContext";

// Pages
import Home from "./pages/Home";
import SetupGame from "./pages/SetupGame";
import RevealRole from "./pages/RevealRole";
import Discussion from "./pages/Discussion";
import Voting from "./pages/Voting";
import DirectElimination from "./pages/DirectElimination";
import Results from "./pages/Results";
import CustomWords from "./pages/CustomWords";

const App = () => {
  return (
    <GameProvider>
      <WordProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/setup" element={<SetupGame />} />
            <Route path="/reveal" element={<RevealRole />} />
            <Route path="/discussion" element={<Discussion />} />
            <Route path="/voting" element={<Voting />} />
            <Route path="/eliminate" element={<DirectElimination />} />
            <Route path="/results" element={<Results />} />
            <Route path="/custom-words" element={<CustomWords />} />
          </Routes>
        </Router>
      </WordProvider>
    </GameProvider>
  );
};

export default App;
