import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./Authentication/loginpage";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} /> {/* Make sure LoginPage is here */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;

