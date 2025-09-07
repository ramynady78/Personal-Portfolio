import "../styles/home.css"
import { HeroSection } from "../components/HeroSection"
import {ProjectsSection} from "../components/ProjectsSection"
import AboutSection from "../components/AboutSection"
import { SkillsDisplay } from "../components/CoreSkillsSection"
import { useNavigate } from "react-router"
import { ContactSection } from "../components/ContactSection"
import { useTranslation } from "../components/TranslationContext"

export const Home: React.FC = () => {

    const {t} = useTranslation();
    const navigate = useNavigate();

    const handleViewAllSkills = () => {
        navigate('/skills'); 
    };
    return (
        <>
        <HeroSection/>
        <ProjectsSection initialVisible={3} showHeader={true}/>
        <AboutSection />
        <section className="home-skills-section">
            <SkillsDisplay 
                mode="compact"
                viewType="list"
                maxItems={7}
                showToggle={true}
                showFilter={false}
                title={t.core_technologies}
                className="home-skills"
                onShowMore={handleViewAllSkills}
                showMoreText={t.view_all_skills}
            />
        </section>
        <ContactSection/>
        </>
    )
}