import React from "react";
import { FaGithub, FaLinkedin, FaTelegram } from "react-icons/fa";
import { useTranslation } from "./TranslationContext";
import { Link } from "react-router";

export const HeroSection: React.FC = () => {
  const { t , lang } = useTranslation();
  const resumePath = lang === "ru" ? "resume_ru.pdf" : "resume.pdf"; 
  return (
    <section className="hero-section">
      <div className="hero-left">
        <div className="hero-text">
          <div className="greeting-badge">
            <span className="wave">👋</span>
            <span>{t.greeting}</span>
          </div>

          <h1 className="hero-name">
            {t.i} <span className="name-highlight">{t.my_name}</span>
          </h1>

          <div className="typing-container">
            <h2 className="hero-title">
              <span className="typing-text">{t.title}</span>
              <span className="cursor">|</span>
            </h2>
          </div>

            <p className="hero-description" 
            dangerouslySetInnerHTML={{ __html: t.description }}></p>

          <div className="hero-buttons">
            <Link to={"/contact"} className="btn btn-primary">
              <span>{t.buttons.talk}</span>
              <div className="btn-glow"></div>
            </Link>
            <a href={resumePath} target="_blank" className="btn btn-secondary">
              <span>{t.buttons.download_cv}</span>
            </a>
            <Link to={"/projects"} className="btn btn-tertiary">
              <span>{t.buttons.view_work}</span>
            </Link>
          </div>

          <div className="hero-socials">
            <div className="social-label">{t.socials.connect}</div>
            <div className="social-links">
              <a href="https://github.com/ramynady78" target="_blank" className="social-link github">
                <FaGithub />
                <span className="tooltip">{t.socials.github}</span>
              </a>
              <a href="https://linkedin.com/in/ramy-nady-1a766625a" target="_blank" className="social-link linkedin">
                <FaLinkedin />
                <span className="tooltip">{t.socials.linkedin}</span>
              </a>
              <a href="https://t.me/ramynady8" target="_blank" className="social-link telegram">
                <FaTelegram />
                <span className="tooltip">{t.socials.telegram}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-right">
        <div className="hero-image-wrapper">
          {/* Animated background rings */}
          <div className="ring ring-1"></div>
          <div className="ring ring-2"></div>
          <div className="ring ring-3"></div>

          {/* Floating particles */}
          <div className="particle particle-1"></div>
          <div className="particle particle-2"></div>
          <div className="particle particle-3"></div>
          <div className="particle particle-4"></div>
          <div className="particle particle-5"></div>
          <div className="particle particle-6"></div>

          {/* Profile image */}
          <div className="image-container">
            <img src="/profile.jpg" alt={t.my_name} className="hero-image" />
            <div className="image-glow"></div>
          </div>

          {/* Enhanced music visualizer */}
          <div className="music-visualizer">
            <div className="bar bar-1"></div>
            <div className="bar bar-2"></div>
            <div className="bar bar-3"></div>
            <div className="bar bar-4"></div>
            <div className="bar bar-5"></div>
            <div className="bar bar-6"></div>
            <div className="bar bar-7"></div>
          </div>

          {/* Status indicator */}
          <div className="status-badge">
            <div className="status-dot"></div>
            <span>{t.status}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
