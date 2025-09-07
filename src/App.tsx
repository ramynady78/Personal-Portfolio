import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Skills } from "./pages/Skills";
import { Projects } from "./pages/Projects";
import { ProjectDetails } from "./pages/ProjectDetails";
import { Contact } from "./pages/Contact";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import { useTranslation } from "./components/TranslationContext";

function App() {
  const { lang } = useTranslation();
    useEffect(() => {
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";

    const font =
      lang === "ar"
        ? "'Cairo', sans-serif"
        : lang === "ru"
        ? "'Roboto', sans-serif"
        : "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";

    document.body.style.fontFamily = font;
  }, [lang]);
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const stored = localStorage.getItem("theme");
    return stored === "dark" ? "dark" : "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);
  
  return (
    <>
      <ScrollToTop />
      <Navbar theme={theme} setTheme={setTheme} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<ProjectDetails />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;