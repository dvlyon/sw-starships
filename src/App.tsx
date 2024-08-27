import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import StarshipPage from "./pages/StarshipPage";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/starships/:id" element={<StarshipPage />} />
      <Route path="*" element={<h1>Not Found</h1>} />
    </Routes>
  </Router>
)

export default App;
