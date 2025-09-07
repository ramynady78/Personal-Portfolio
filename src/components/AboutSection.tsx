// AboutSection.tsx
import { useNavigate } from "react-router-dom";
import "../styles/about.css"; 
import { useTranslation } from "./TranslationContext";

const AboutSection: React.FC = () => {
  const navigate = useNavigate();

  const handleShowMore = () => {
    navigate("/about");
  };
  const {t} = useTranslation();

  return (
    <section className="about-section">
      <div className="container">
        <div className="about-content">
          {/* Profile Picture */}
          <div className="about-image-container">
            <img
              src="/about.jpg"
              alt="Ramy Nady - Full Stack Engineer"
              className="about-img"
            />
          </div>

          {/* Content */}
          <div className="about-text-content">
            <div className="about-header">
              <h2 className="about-title">{t.about_me}</h2>
              <span className="about-badge">Full Stack Engineer</span>
            </div>

            <p className="about-description"
            dangerouslySetInnerHTML={{ __html: t.full_stack_description }}>
            </p>

            <p className="about-sub-description">
             {t.continuous_learning}
            </p>

            

            {/* CTA Button */}
            <button
              className="btn-learn-more"
              onClick={handleShowMore}
            >
              {t.learn_more}
              <svg 
                className="btn-icon" 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none"
              >
                <path 
                  d="M7 17L17 7M17 7H7M17 7V17" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;