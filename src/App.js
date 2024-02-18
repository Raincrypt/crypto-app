import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Footer from "./components/Footer";
import Header from "./components/Header";

import CoinDetails from "./components/CoinDetails";
import Coins from "./components/Coins";
import Exchanges from "./components/Exchanges";
import Home from "./components/Home";

import './index.css'

function App() {
  return (
    <Router>
      <div className="container">
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/coins" element={<Coins />} />
          <Route path="/exchanges" element={<Exchanges />} />
          <Route path="/coin/:id" element={<CoinDetails />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
