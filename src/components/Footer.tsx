import { Mail, Phone, MapPin, Github, Linkedin } from 'lucide-react';
import "../styles/footer.css"
import { FaVk , FaTelegramPlane , FaWhatsapp } from 'react-icons/fa';
import { Link } from 'react-router';
import { useTranslation } from './TranslationContext';
const Footer: React.FC = () => {
    const {t} = useTranslation();
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>{t.quick_links}</h3>
            <ul>
                <li><Link to="/">{t.home}</Link></li>
                <li><Link to="/about">{t.about}</Link></li>
                <li><Link to="/skills">{t.skills}</Link></li>
                <li><Link to="/projects">{t.portfolio}</Link></li>
                <li><Link to="/contact">{t.contact}</Link></li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="footer-section">
            <h3>{t.contact}</h3>
            <div className="contact-info">
              <div className="contact-item">
                <Mail size={16} />
                
                <span>ramynady1978@gmail.com</span>
              </div>
              <div className="contact-item">
                <Phone size={16} />
                <span>{t.phone_number}</span>
              </div>
              <div className="contact-item">
                <MapPin size={16} />
                <span>{t.city_country}</span>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="footer-section">
            <h3>{t.connect_with_me}</h3>
            <div className="social-links">
              <a className="github" href="https://github.com/ramynady78/" target="_blank" rel="noopener noreferrer">
                <Github size={20} />
              </a>
              <a className="linkedin" href="https://www.linkedin.com/in/ramy-nady-1a766625a/" target="_blank" rel="noopener noreferrer">
                <Linkedin size={20} />
              </a>
             <a className="whatsapp" href="https://wa.me/+79827288614"target="_blank" rel="noopener noreferrer">
                <FaWhatsapp size={20} />
              </a>
              <a className="vk" href="https://vk.com/id704406318" target="_blank" rel="noopener noreferrer">
                <FaVk size={20} />
              </a>
              <a className="telegram" href="https://t.me/ramynady8" target="_blank" rel="noopener noreferrer">
                <FaTelegramPlane size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="footer-bottom">
          <p>&copy; {t.rights}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;