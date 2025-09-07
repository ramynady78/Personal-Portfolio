import { useTranslation } from "./TranslationContext"
import React, { useState, useEffect, useRef } from "react";
import projects from "../data/projects";
import { Link } from "react-router";


interface ProjectSectionProps {
  initialVisible?: number; 
  showHeader?:boolean;
  filteredProjects?:any;
};

interface Project {
  id: number;
  title: string;
  image?: string;
  finished: boolean;
  skills: string[];
  link: string;
  repo: string;
}

export const ProjectsSection: React.FC<ProjectSectionProps> = ({initialVisible =3 ,showHeader= false , filteredProjects=projects}) => {
  const { t , lang} = useTranslation();
  const [, setVisibleCards] = useState<boolean[]>([false, false, false]);
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const displayedProjects:Project[] = filteredProjects.slice(0, initialVisible);
  const truncateDescription = (text: string, maxLength: number = 80) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength).trim() + "...";
  };

  const getLimitedSkills = (skills: string[], limit: number = 3) => {
    return skills.slice(0, limit);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setVisibleCards(prev => {
                const newState = [...prev];
                const cardIndex = cardRefs.current.findIndex(ref => ref === entry.target);
                if (cardIndex !== -1) {
                  newState[cardIndex] = true;
                }
                return newState;
              });
            }, index * 200); // Stagger animation by 200ms
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    cardRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="projects-preview-section">
      {showHeader &&
      <div className="section-header">
        <div className="header-content">
          <h2 className="section-title">{t.myProjects}</h2>
          <p className="section-subtitle">{t.latestWork}</p>
        </div>
        
        <a href="/projects" className="view-all-link">
          <span>{t.view_all_btn}</span>
          <svg className="arrow-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M7 17l9.2-9.2M17 17V7H7"/>
          </svg>
        </a>
      </div>}

      <div className="projects-preview-grid">
        {displayedProjects.map((project:Project) => (
          <div key={project.id} className="project-card">
            <div className="card-image-container">
              <img 
                src={project.image || '/api/placeholder/400/250'} 
                alt={project.title}
                className="card-image"
              />
              <div className="image-overlay">
                <div className="overlay-content">
                  <span className="project-status">
                    {project.finished ? "Completed" : "In Progress"}
                  </span>
                </div>
              </div>            
            </div>

            <div className="card-preview-content">
              <h3 className="preview-title">{project.title}</h3>
              
              <p className="preview-description">
                {truncateDescription(t.projects[project.id].description)}
              </p>

              <div className="preview-role">
                {t.projects[project.id].role}
              </div>

              <div className="preview-skills">
                {getLimitedSkills(project.skills).map((skill, skillIndex) => (
                  <span key={skillIndex} className="skill-chip">
                    {skill}
                  </span>
                ))}
                {project.skills.length > 3 && (
                  <span className="skills-more">+{project.skills.length - 3}</span>
                )}
              </div>

              <div className="card-footer">
                <div className="project-links">
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="preview-link demo"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                      <polyline points="15,3 21,3 21,9"/>
                      <line x1="10" y1="14" x2="21" y2="3"/>
                    </svg>
                  </a>
                  
                  <a 
                    href={project.repo} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="preview-link github"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                    </svg>
                  </a>
                </div>

                <Link 
                  to={`/projects/${project.id}`}
                  className="show-more-link"
                >
                  {t.details_btn}
                  <svg className={`details-arrow ${lang === "ar" ? "rtl" : ""}`}
                   width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14m-7-7 7 7-7 7"/>
                  </svg>
                </Link>
              </div>
            </div>

            <div className="card-shine"></div>
          </div>
        ))}
      </div>
    </section>
  );
};





