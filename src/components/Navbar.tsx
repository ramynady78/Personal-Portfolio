import React, { useState, useEffect, useRef } from "react";
import { Sun, Moon, Menu, X } from "lucide-react";
import ReactCountryFlag from "react-country-flag";
import "../styles/navbar.css";
import { useTranslation } from "./TranslationContext";
import { Link, useLocation } from "react-router";

interface NavbarProps {
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
}

export const Navbar: React.FC<NavbarProps> = ({ theme, setTheme }) => {
  // Only manage language in Navbar since it's only used here
  const getStoredLang = (): "EN" | "AR" | "RU" => {
    const stored = localStorage.getItem("language");
    return stored === "AR" || stored === "RU" ? stored : "EN";
  };

  const [language, setLanguage] = useState<"EN" | "AR" | "RU">(getStoredLang());
  const { t, setLang } = useTranslation();
  const location = useLocation();

  const [langOpen, setLangOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const langRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    localStorage.setItem("language", language);
    setLang(language.toLowerCase() as "en" | "ar" | "ru");
  }, [language, setLang]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const changeLanguage = (code: "EN" | "AR" | "RU") => {
    setLanguage(code);
    setLangOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(prev => !prev);
  };

  const languages = [
    { code: "EN", label: "English", countryCode: "GB" },
    { code: "AR", label: "العربية", countryCode: "SA" },
    { code: "RU", label: "Русский", countryCode: "RU" },
  ];

  const navLinks = [
    { path: "/", label: t.home },
    { path: "/about", label: t.about },
    { path: "/skills", label: t.skills },
    { path: "/projects", label: t.portfolio },
    { path: "/contact", label: t.contact },
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
    // ScrollToTop component handles the scrolling
  };

  return (
    <div className="navbar-container">
      <nav className="navbar">
        <div className="navbar-logo">
          <img src="/logo.jpg" alt="logo" />
          <Link to="/" className="logo-text">{t.my_name}</Link>
        </div>

        <ul 
          className={`navbar-links ${mobileMenuOpen ? "mobile-open" : ""}`} 
          ref={menuRef}
        >
          {navLinks.map(link => (
            <Link 
              key={link.path} 
              to={link.path} 
              className={location.pathname === link.path ? "active" : ""}
              onClick={handleLinkClick}
            >
              {link.label}
            </Link>
          ))}
        </ul>

        {/* Controls */}
        <div className="navbar-controls">
          {/* Theme Toggle */}
          <button
            className="theme-btn"
            onClick={toggleTheme}
            title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          >
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          {/* Language Dropdown */}
          <div
            className="language-dropdown"
            onClick={() => setLangOpen(!langOpen)}
            ref={langRef}
          >
            <ReactCountryFlag 
              countryCode={languages.find((l) => l.code === language)?.countryCode!} 
              svg 
              style={{ width: "20px", height: "20px" }} 
            />
            <p>{languages.find((l) => l.code === language)?.label!}</p>
            {langOpen && (
              <ul className="language-list">
                {languages.map((lang) => (
                  <li
                    key={lang.code}
                    onClick={(e) => {
                      e.stopPropagation();
                      changeLanguage(lang.code as "EN" | "AR" | "RU");
                    }}
                  className={lang.code === language ? "active" :""}
                  >
                    <ReactCountryFlag 
                      countryCode={lang.countryCode} 
                      svg 
                      style={{ width: "20px", height: "20px" }} 
                    />
                    <span >{lang.label}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>
    </div>
  );
};