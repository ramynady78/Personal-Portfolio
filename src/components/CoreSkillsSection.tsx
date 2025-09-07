import { useState } from "react";
import { getSkillIcon } from "../utils/skillIcons";
import { skills } from "../data/skillsData";
import { useTranslation } from "./TranslationContext";

type DisplayMode = 'compact' | 'detailed';
type ViewType = 'grid' | 'list';

interface SkillsDisplayProps {
  mode?: DisplayMode;
  viewType?: ViewType;
  maxItems?: number;
  showToggle?: boolean;
  showFilter?: boolean;
  title?: string;
  className?: string;
  onShowMore?: () => void; 
  showMoreText?: string; 
}

export const SkillsDisplay: React.FC<SkillsDisplayProps> = ({
  mode = 'compact',
  viewType = 'grid',
  maxItems,
  showToggle = true,
  showFilter = false,
  title,
  className = '',
  onShowMore,
  showMoreText = 'View All Skills'
}) => {
  const [showAll] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  
  const {t} = useTranslation();
  
  type SkillCategory = 
  | "frontend"
  | "backend"
  | "database"
  | "security"
  | "tools"
  | "csFundamentals"
  | "other";


  const allSkills = Object.entries(skills).flatMap(([category, categorySkills]) => 
    categorySkills.map(skill => ({ ...skill, category }))
  );

  // Filter by category
  const filteredSkills = selectedCategory === 'all' 
    ? allSkills 
    : allSkills.filter(skill => skill.category === selectedCategory);

  // Apply item limit
  const displayedSkills = maxItems && !showAll 
    ? filteredSkills.slice(0, maxItems)
  : filteredSkills;

  const categories:SkillCategory[] = [
    "frontend",
    "backend",
    "database",
    "security",
    "tools",
    "csFundamentals",
    "other"
  ];
  const shouldShowToggle = showToggle && maxItems && filteredSkills.length > maxItems;

  return (
    <div className={`skills-display ${className}`}>
        {shouldShowToggle && onShowMore && title && (
        <div className="header-seaction">
            <h2 className="skills-title">{title}</h2>
            <div className="skills-toggle">
            <button
                className="show-more-btn"
                onClick={onShowMore}
            >
                {showMoreText}
                <span className="arrow-icon">
                <svg className="arrow-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17l9.2-9.2M17 17V7H7"/>
            </svg>
                </span>
            </button>
            </div>
        </div>
        )
        }
      {showFilter && (
        <div className="skills-filter">
          <button 
            className={`filter-btn ${selectedCategory === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('all')}
          >
            {t.skills_categories.all}
          </button>
          {categories.map((category) => (
            <button
              key={category}
              className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {t.skills_categories[category]} 
            </button>
          ))}
        </div>
      )}

      <div className={`skills-container ${mode} ${viewType}`}>
        {displayedSkills.map((skill, index) => (
          <div 
            key={`${skill.category}-${index}`} 
            className="skill-card"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="skill-icon-wrapper">
              {getSkillIcon(skill.name, { size:'xl' })}
            </div>
            
            <div className="skill-content">
              <span className="skill-name">{skill.name}</span>
              
              {mode === 'detailed' && (
                <>
                  <div className="skill-level">
                    <span className={`level-badge ${skill.level.toLowerCase()}`}>
                      {skill.level}
                    </span>
                  </div>
                  <p className="skill-description">{skill.usedIn}</p>
                  <span className="skill-category">{t.skills_categories[skill.category as SkillCategory]}</span>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

       
    </div>
  );
};