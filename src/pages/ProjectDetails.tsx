import projects from "../data/projects";
import "../styles/project-details.css";
import { useParams } from "react-router";
import React, { useState, useEffect } from "react";
import { useTranslation } from "../components/TranslationContext";
import { Cpu, FileText, Home, Image, ListChecks } from "lucide-react";
import { getSkillIcon } from "../utils/skillIcons";




export const ProjectDetails: React.FC = () => {
    const { id } = useParams();
    const project = projects.find(p => p.id === id);
    const { t } = useTranslation();
    
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const [visibleSections, setVisibleSections] = useState<string[]>([]);



    if (!project) {
        return (
            <div className="project-not-found">
                <h1>Project not found</h1>
                <a href="/projects" className="back-link">← Back to Projects</a>
            </div>
        );
    }

    const projectTrans = t?.projects[project.id];
    
    // Image slider functions
    const nextImage = () => {
        setCurrentImageIndex((prev) => 
            prev === project.images.length - 1 ? 0 : prev + 1
        );
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => 
            prev === 0 ? project.images.length - 1 : prev - 1
        );
    };

    const goToImage = (index: number) => {
        setCurrentImageIndex(index);
    };

    // Scroll animations
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const sectionId = entry.target.getAttribute('data-section');
                        if (sectionId && !visibleSections.includes(sectionId)) {
                            setVisibleSections(prev => [...prev, sectionId]);
                        }
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        );

        const sections = document.querySelectorAll('[data-section]');
        sections.forEach(section => observer.observe(section));

        return () => observer.disconnect();
    }, [visibleSections]);

    return (
        <div className="project-details-page">
            {/* Hero Section */}
            <section className="project-hero" data-section="hero">
                <div className="hero-background">
                    <div className="hero-pattern"></div>
                </div>
                
                <div className="hero-content">
                    <div className="hero-text">
                        <div className="breadcrumb">
                            <a href="/projects">Projects</a>
                            <span>/</span>
                            <span>{project.title}</span>
                        </div>
                        
                        <h1 className="project-title">{projectTrans.title}</h1>
                        <p className="project-tagline">{projectTrans.description}</p>

                        <div className="hero-actions">
                            <a href={project.link} target="_blank" rel="noopener noreferrer" className="hero-btn primary">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                                    <polyline points="15,3 21,3 21,9"/>
                                    <line x1="10" y1="14" x2="21" y2="3"/>
                                </svg>
                                {t["live-demo"]}
                            </a>
                            <a href={project.repo} target="_blank" rel="noopener noreferrer" className="hero-btn secondary">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                                </svg>
                                {t["view-code"]}
                            </a>
                        </div>
                    </div>

                    {/* Project Info Sidebar */}
                    <div className="hero-sidebar">
                        <div className="info-card">
                            <div className="info-header">
                                <div className="info-header-log">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="3"/>
                                    <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"/>
                                    </svg>
                                    <span>{t["project-info"]}</span>
                                </div>
                                <span className={`status-badge ${project.finished ? 'completed' : 'ongoing'}`}>
                                    {t.completed.toUpperCase()}
                                </span>
                            </div>
                            
                            <div className="info-items">
                                <div className="info-item">
                                    <div className="info-content">
                                        <span className="info-label">{t.role}</span>
                                        <span className="info-value">{projectTrans.role}</span>
                                    </div>
                                </div>

                                <div className="info-item">                   
                                    <div className="info-content">
                                        <span className="info-label">{t.completed.toUpperCase()}</span>
                                        <span className="info-value">{project.finished}</span>
                                    </div>
                                </div>

                                <div className="info-item tech">
                                    <div className="info-content">
                                        <span className="info-label">{t.technologies}</span>
                                        <span className="info-value">+{project.skills.length} {t.technologies}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Image Slider */}
            <section className={`image-slider-section ${visibleSections.includes('slider') ? 'visible' : ''}`} data-section="slider">
                <div className="slider-container">
                    <div className="slider-wrapper">
                        <button className="slider-btn prev" onClick={prevImage}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M15 18l-6-6 6-6"/>
                            </svg>
                        </button>

                        <div className="slider-main">
                            <div className="main-image-container">
                                <img 
                                    src={project.images[currentImageIndex] || '/api/placeholder/800/500'}
                                    alt={`${project.title} - Image ${currentImageIndex + 1}`}
                                    className={`main-image ${isImageLoaded ? 'loaded' : ''}`}
                                    onLoad={() => setIsImageLoaded(true)}
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.src = '/api/placeholder/800/500';
                                    }}
                                />
                                <div className="image-number">
                                    {currentImageIndex + 1} / {project.images.length}
                                </div>
                            </div>
                        </div>

                        <button className="slider-btn next" onClick={nextImage}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M9 18l6-6-6-6"/>
                            </svg>
                        </button>
                    </div>

                    <div className="slider-thumbnails">
                        {project.images.map((image, index) => (
                            <button
                                key={index}
                                className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                                onClick={() => goToImage(index)}
                            >
                                <img 
                                    src={image || '/api/placeholder/100/60'}
                                    alt={`Thumbnail ${index + 1}`}
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.src = '/api/placeholder/100/60';
                                    }}
                                />
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Project Content */}
            <div className="project-content">
                {/* Overview Section */}
                <section className={`content-section overview-section ${visibleSections.includes('overview') ? 'visible' : ''}`} data-section="overview">
                    <div className="section-icon overview">
                        <FileText size={24} />
                    </div>
                    <h2 className="section-title">{t["project-overview"]}</h2>
                    <p className="section-content">{projectTrans.overview}</p>
                </section>

                {/* Skills Section */}
                <section className={`content-section skills-section ${visibleSections.includes('skills') ? 'visible' : ''}`} data-section="skills">
                    <div className="section-icon technologies">
                        <Cpu size={24} />
                    </div>
                    <h2 className="section-title">{t["technologies-used"]}</h2>
                    <div className="skills-grid">
                        {project.skills.map((skill, index) => {
                            return (
                                <div key={index} className="skill-item">
                                    {getSkillIcon(skill, { size: 'lg' })}
                                    <span className="skill-name">{skill}</span>
                                </div>
                        );
                        })}
                    </div>
                </section>

                {/* Features Section */}
                <section className={`content-section features-section ${visibleSections.includes('features') ? 'visible' : ''}`} data-section="features">
                    <div className="section-icon features">
                        <ListChecks size={24} />

                    </div>
                    <h2 className="section-title">{t["key-features"]}</h2>
                    <div className="features-list">
                        {(projectTrans.features as []).map((feature, index) => (
                            <div 
                                key={index} 
                                className="feature-item"
                                style={{ animationDelay: `${index * 0.2}s` }}
                            >
                                <div className="feature-icon">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M20 6L9 17l-5-5"/>
                                    </svg>
                                </div>
                                <p className="feature-text">{feature}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Project Actions */}
                <section className={`content-section actions-section ${visibleSections.includes('actions') ? 'visible' : ''}`} data-section="actions">
                    <div className="actions-container">
                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="action-btn primary">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                                <polyline points="15,3 21,3 21,9"/>
                                <line x1="10" y1="14" x2="21" y2="3"/>
                            </svg>
                            {t["launch-project"]}
                        </a>
                        
                        <a href={project.repo} target="_blank" rel="noopener noreferrer" className="action-btn secondary">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                            </svg>
                            {t["view-source"]}
                        </a>
                        
                        <a href="/projects" className="action-btn tertiary">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M19 12H5m7-7-7 7 7 7"/>
                            </svg>
                            {t["back-to-projects"]}
                        </a>
                    </div>
                </section>
            </div>

            {/* Floating Navigation */}
            <nav className="floating-nav">
                <button className="nav-item home" onClick={() => document.querySelector('.project-hero')?.scrollIntoView({  behavior: 'smooth' })}>
                    <Home size={24}/>
                </button>
                <button className="nav-item slider" onClick={() => document.querySelector('.image-slider-section')?.scrollIntoView({ behavior: 'smooth' })}>
                    <Image size={24} />
                </button>
                <button className="nav-item overview" onClick={() => document.querySelector('.overview-section')?.scrollIntoView({ behavior: 'smooth' })}>
                    <FileText size={24} />
                </button>
                <button className="nav-item technologies" onClick={() => document.querySelector('.skills-section')?.scrollIntoView({ behavior: 'smooth' })}>
                    <Cpu size={24} />
                </button>
                <button className="nav-item features" onClick={() => document.querySelector('.features-section')?.scrollIntoView({ behavior: 'smooth' })}>
                    <ListChecks size={24} />
                </button>
            </nav>
        </div>
    );
};

export default ProjectDetails;