import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Footer from "../components/Footer";

const Home = () => {
  const navigate = useNavigate();

  const handleStartGame = () => {
    navigate("/setup");
  };

  const handleCustomWords = () => {
    navigate("/custom-words");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950">
      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center text-center relative overflow-hidden px-4">
        {/* Background Effects - Blue & Red */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-600/20 rounded-full blur-3xl" />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-md">
          {/* Logo */}
          <div className="mb-8 animate-fade-in">
            <img
              src="/logo.png"
              alt="Word Imposter"
              className="w-32 h-32 mx-auto mb-6 rounded-3xl shadow-2xl shadow-blue-500/30"
            />
            <h1 className="text-4xl font-extrabold mb-3">
              <span className="gradient-text">Word</span>{" "}
              <span className="text-white">Imposter</span>
            </h1>
            <p className="text-slate-400 text-lg">
              Find the odd one out!
            </p>
          </div>

          {/* Main Actions */}
          <div className="space-y-3 animate-fade-in stagger-1">
            <Button onClick={handleStartGame} fullWidth>
              🎮 Start Game
            </Button>
            <Button onClick={handleCustomWords} variant="secondary" fullWidth>
              ✏️ Custom Words
            </Button>
          </div>

          {/* How to Play */}
          <div className="mt-10 animate-fade-in stagger-2">
            <div className="card text-left">
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <span>📖</span> How to Play
              </h3>
              <ol className="space-y-2 text-slate-300 text-sm">
                <li className="flex gap-2">
                  <span className="text-blue-400 font-bold">1.</span>
                  Everyone gets a word - but one person gets a different word
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-400 font-bold">2.</span>
                  Describe your word without saying it
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-400 font-bold">3.</span>
                  Find who has the different word!
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
