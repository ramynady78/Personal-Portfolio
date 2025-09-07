import "../styles/contect.css";
import React from "react";
import { FaGithub, FaLinkedin, FaTelegram, FaWhatsapp } from "react-icons/fa";
import { useTranslation } from "./TranslationContext";
import { Link } from "react-router";

export const ContactSection: React.FC = () => {
  const { t, lang } = useTranslation();
  const resumePath = lang === "ru" ? "resume_ru.pdf" : "resume.pdf";

  return (
    <section className="contact-section">
      <h2>{t.contact_me}</h2>
      <p>{t.question_or_work_together}</p>
      
      <div className="contact-buttons">
        <Link to={"/contact"} className="btn">
          {t.contact_me}
        </Link>
        <a href={resumePath} target="_blank" rel="noopener noreferrer" className="btn">
          {t.buttons.download_cv}
        </a>
      </div>
      
      <div className="social-links">
      <a
      href="mailto:ramynady1978@gmail.com"
      target="_blank"
      rel="noopener noreferrer"
      title="Email"
      aria-label="Send email"
      className="contact-info-icon email"
    >
     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
      </svg>
  </a>
        <a 
          href="https://linkedin.com/in/ramy-nady-1a766625a" 
          target="_blank" 
          rel="noopener noreferrer"
          title="LinkedIn Profile"
          aria-label="Visit LinkedIn profile"
          className="contact-info-icon linkedin"
        >
          <FaLinkedin />
        </a>
        <a 
          href="https://github.com/ramynady78" 
          target="_blank" 
          rel="noopener noreferrer"
          title="GitHub Profile"
          aria-label="Visit GitHub profile"
          className="contact-info-icon github"
        >
          <FaGithub />
        </a>
        <a 
          href="https://wa.me/+79827288614" 
          target="_blank" 
          rel="noopener noreferrer"
          title="GitHub Profile"
          aria-label="Visit GitHub profile"
          className="whatsapp"
        >
          <FaWhatsapp size={20} />
        
        </a>
        <a 
          href="https://t.me/ramynady8" 
          target="_blank" 
          rel="noopener noreferrer"
          title="Telegram"
          aria-label="Contact via Telegram"
          className="contact-info-icon telegram"
        >
          <FaTelegram />
        </a>
      </div>
    </section>
  );
};