import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Ideas from "./pages/Ideas/Ideas";
import Work from "./pages/Work/Work";
import About from "./pages/About/About";
import Services from "./pages/Services/Services";
import Careers from "./pages/Careers/Careers";
import Contact from "./pages/Contact/Contact";

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Ideas />} />
          <Route path="/work" element={<Work />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
