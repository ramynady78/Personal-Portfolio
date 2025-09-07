import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { FaCode, FaLaptopCode, FaTools, FaRocket } from 'react-icons/fa';
import { useTranslation } from '../components/TranslationContext';

export const About: React.FC = () => {
  const [typedText, setTypedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set());
  
  const { t } = useTranslation();
  const observerRef = useRef<IntersectionObserver | null>(null);
  const isInitializedRef = useRef(false);

  const fullText = useMemo(() => t.typed_text || '', [t.typed_text]);
  const journeyItems = useMemo(() => (t as any).journey_items || [], [t]);
  
  const skillsCategories = useMemo(() => [
    {
      id: t.skills_section?.frontend || 'frontend',
      title: t.skills_section?.frontend || 'Frontend',
      icon: FaCode,
      skills: t.skills_section?.frontend_skills || []
    },
    {
      id: t.skills_section?.backend || 'backend', 
      title: t.skills_section?.backend || 'Backend',
      icon: FaLaptopCode,
      skills: t.skills_section?.backend_skills || []
    },
    {
      id: t.skills_section?.tools || 'tools',
      title: t.skills_section?.tools || 'Tools',
      icon: FaTools,
      skills: t.skills_section?.tools_skills || []
    },
    {
      id: t.skills_section?.soft || 'soft',
      title: t.skills_section?.soft || 'Soft Skills',
      icon: FaRocket,
      skills: t.skills_section?.soft_skills || []
    }
  ], [t.skills_section]);

  useEffect(() => {
    if (!fullText) return;
    
    let index = 0;
    setTypedText(''); 
    
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setTypedText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 40);

    return () => clearInterval(timer);
  }, [fullText]);

  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorTimer);
  }, []);

  useEffect(() => {
    if (isInitializedRef.current) return;
    
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const elementId = entry.target.getAttribute('data-animate');
          if (elementId && entry.isIntersecting) {
            setVisibleElements(prev => new Set([...prev, elementId]));
          }
        });
      },
      { threshold: 0.2, rootMargin: '-50px' }
    );

    isInitializedRef.current = true;

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (!observerRef.current) return;

    const observer = observerRef.current;
    const elements = document.querySelectorAll('[data-animate]');
    
    elements.forEach(el => observer.observe(el));

    return () => {
      elements.forEach(el => observer.unobserve(el));
    };
  }, [journeyItems]); // Only re-observe when journey items change

  const addToRefs = useCallback((el: HTMLElement | null) => {
    if (el && observerRef.current) {
      observerRef.current.observe(el);
    }
  }, []);

  return (
    <div className="about-page">
      <div className="about-container">
        {/* Hero Section */}
        <section className="about-hero">
          <h1 className="typing-title">{t.about_me}</h1>
          <div className="typing-container">
            <span className="typed-text">{typedText}</span>
            {showCursor && <span className="typing-cursor">|</span>}
          </div>
        </section>

        {/* Main Content */}
        <section className="about-content">
          <div 
            className={`about-text ${visibleElements.has('story') ? 'animate-in' : ''}`}
            data-animate="story"
            ref={addToRefs}
          >
            <h2>{t.my_story}</h2>
            <div className="story-content">
              <p className="story-paragraph" dangerouslySetInnerHTML={{ __html: t.story_paragraph_1 || '' }}></p>
              <p className="story-paragraph" dangerouslySetInnerHTML={{ __html: t.story_paragraph_2 || '' }}></p>
              <p className="story-paragraph" dangerouslySetInnerHTML={{ __html: t.story_paragraph_3 || '' }}></p>
              <p className="story-paragraph" dangerouslySetInnerHTML={{ __html: t.story_paragraph_4 || '' }}></p>
            </div>
          </div>

          <div 
            className={`about-image ${visibleElements.has('profile') ? 'animate-in' : ''}`}
            data-animate="profile"
            ref={addToRefs}
          >
            <div className="profile-card">
              <div className="profile-image">
                <img src="/about.jpg" alt="Ramy Nady" />
              </div>
              <div className="profile-info">
                <h3>{t.my_name}</h3>
                <div className="role">{t.title}</div>
                <div className="profile-stats">
                  <div className="stat-item">
                    <span className="stat-number counter" data-target="1">+1</span>
                    <span className="stat-label">{t.years_experience}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number counter" data-target="10">+15</span>
                    <span className="stat-label">{t.projects_word}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">3</span>
                    <span className="stat-label">{t.languages}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="skills-section">
          <div className="skills-grid">
            {skillsCategories.map((category, index) => (
              <div 
                key={category.id}
                className={`skill-category ${visibleElements.has(category.id) ? 'animate-in' : ''}`}
                data-animate={category.id}
                ref={addToRefs}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <h3>
                  <category.icon className="icon" />
                  {category.title}
                </h3>
                <ul className="skill-list">
                  {category.skills.map((skill: string, skillIndex: number) => (
                    <li 
                      key={skill}
                      className="skill-item"
                      style={{ animationDelay: `${(index * 0.2) + (skillIndex * 0.1)}s` }}
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Journey Section */}
        <section 
          className={`journey-section ${visibleElements.has('journey') ? 'animate-in' : ''}`}
          data-animate="journey"
          ref={addToRefs}
        >
          <h2>{t.my_journey}</h2>
          <div className="timeline">
            {journeyItems.map((item: any, index: number) => (
              <div 
                key={`${item.title}-${index}`} // More stable key
                className={`timeline-item ${visibleElements.has(item.title) ? 'animate-in' : ''}`}
                data-animate={item.title}
                ref={addToRefs}
                style={{ animationDelay: `${index * 0.3}s` }}
              >
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <h3>{item.title}</h3>
                  <div className="date">{item.date}</div>
                  <p>{item.content}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Currently Learning Section */}
        <section 
          className={`learning-section ${visibleElements.has('learning') ? 'animate-in' : ''}`}
          data-animate="learning"
          ref={addToRefs}
        >
          <h2>{t.currently_exploring}</h2>
          <div className="learning-grid">
            <div className="learning-item">
              <h3>{t.reading_list}</h3>
              <p>{t.reading_list_content}</p>
            </div>
            <div className="learning-item">
              <h3>{t.tech_stack}</h3>
              <p>{t.tech_stack_content}</p>
            </div>
            <div className="learning-item">
              <h3>{t.growth_areas}</h3>
              <p>{t.growth_areas_content}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};