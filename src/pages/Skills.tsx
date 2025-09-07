import { SkillsDisplay } from "../components/CoreSkillsSection";
import { useTranslation } from "../components/TranslationContext";
import "../styles/skills.css";

export const Skills: React.FC = () => {
    const {t} = useTranslation();

    return (
        <div className="skills-page">
            <div className="page-header">
                <div className="floating-elements">
                    <div className="floating-icon">⚡</div>
                    <div className="floating-icon">🚀</div>
                    <div className="floating-icon">💎</div>
                    <div className="floating-icon">⭐</div>
                </div>
                
                <div className="header-content">
                    <h1 className="header-title">{t.skills} </h1>
                    <p className="header-subtitle">{t.skills_subtitle}</p>
                    <p className="header-description">
                      {t.skills_description}
                    </p>
                </div>               
                <div className="wave-decoration"></div>
            </div>
            
            <SkillsDisplay 
                mode="detailed"
                viewType="grid"
                showToggle={false}
                showFilter={true}
                className="skills-page-content"
            />
        </div>
    );
};