import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
import Home from "./pages/Home";
import Works from "./pages/Works";
import Contact from "./pages/Contact";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/works" element={<Works />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
