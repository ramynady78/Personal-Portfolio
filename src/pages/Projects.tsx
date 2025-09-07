import React, { useState, useMemo, useEffect } from "react";
import { ProjectsSection } from "../components/ProjectsSection"
import { useTranslation } from "../components/TranslationContext";
import projects from "../data/projects";
import "../styles/project-page.css"

export const Projects: React.FC = () => {
    const {t} = useTranslation();
    const [selectedSkill, setSelectedSkill] = useState("all");
    const [selectedYear, setSelectedYear] = useState("all");
    const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'name'>('newest');
    const [isLoaded, setIsLoaded] = useState(false);

    // Get unique skills and years from projects
    const allSkills = useMemo(() => {
        const skills = [...new Set(projects.flatMap(p => p.skills || []))];
        return ['all', ...skills.sort()];
    }, []);

    const allYears = useMemo(() => {
        const years = [...new Set(projects.map(p => {
            const year = p.finished?.split('-')[0];
            return year || '2024';
        }))].sort().reverse();
        return ['all', ...years];
    }, []);

    // Filter and sort projects
    const filteredProjects = useMemo(() => {
        let filtered = projects.filter(project => {
            // Skill filter
            const matchesSkill = selectedSkill === 'all' || project.skills?.includes(selectedSkill);
            
            // Year filter
            const projectYear = project.finished?.split('-')[0] || '2024';
            const matchesYear = selectedYear === 'all' || projectYear === selectedYear;
            
            return matchesSkill && matchesYear;
        });

        // Sort projects
        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'name':
                    return a.title.localeCompare(b.title);
                case 'oldest':
                    return (a.finished || '').localeCompare(b.finished || '');
                case 'newest':
                default:
                    return (b.finished || '').localeCompare(a.finished || '');
            }
        });

        return filtered;
    }, [selectedSkill, selectedYear, sortBy]);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoaded(true), 200);
        return () => clearTimeout(timer);
    }, []);

    const resetFilters = () => {
        setSelectedSkill("all");
        setSelectedYear("all");
        setSortBy("newest");
    };

    const getProjectStats = () => {
        const totalProjects = projects.length;
        const uniqueSkills = allSkills.length - 1;
        return { totalProjects, uniqueSkills };
    };

    const stats = getProjectStats();

    return (
        <div className="projects-page">
            {/* Simple Header */}
            <div className="projects-header">
                <div className="projects-header-content">
                    <h1 className="projects-title">{t.my_projects}</h1>
                    <p className="projects-subtitle">
                        {t.projects_subtitle}
                    </p>
                    <div className="projects-stats">
                        <span className="stat-item">
                            <strong>{stats.totalProjects}</strong> {t.projects_word}
                        </span>
                        <span className="stat-separator">•</span>
                        <span className="stat-item">
                            <strong>{stats.uniqueSkills}</strong> {t.technologies}
                        </span>
                    </div>
                </div>
            </div>

            {/* Filter Controls */}
            <div className="projects-controls">
                <div className="controls-container">
                    <div className="filter-row">
                        {/* Technology Filter */}
                        <div className="filter-group">
                            <label className="filter-label">{t.technologies}:</label>
                            <select
                                value={selectedSkill}
                                onChange={(e) => setSelectedSkill(e.target.value)}
                                className="filter-select"
                            >
                                {allSkills.map(skill => (
                                    <option key={skill} value={skill}>
                                        {skill === 'all' ? `${t.skills_categories.all} ${t.technologies}`: skill}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Year Filter */}
                        <div className="filter-group">
                            <label className="filter-label">{t.years}:</label>
                            <select
                                value={selectedYear}
                                onChange={(e) => setSelectedYear(e.target.value)}
                                className="filter-select"
                            >
                                {allYears.map(year => (
                                    <option key={year} value={year}>
                                        {year === 'all' ? `${t.skills_categories.all} ${t.years}` : year}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Sort Filter */}
                        <div className="filter-group">
                            <label className="filter-label">{t.sort_by}:</label>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value as any)}
                                className="filter-select"
                            >
                                <option value="newest">{t.newest}</option>
                                <option value="oldest">{t.oldest}</option>
                                <option value="name">{t.name} A-Z</option>
                            </select>
                        </div>

                        {/* Reset Button */}
                        <button onClick={resetFilters} className="reset-btn">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path>
                                <path d="M21 3v5h-5"></path>
                                <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path>
                                <path d="M3 21v-5h5"></path>
                            </svg>
                            {t.reset}
                        </button>
                    </div>

                    {/* Results Info */}
                    <div className="results-info">
                        {t.show} <span className="highlight">{filteredProjects.length}</span> {t.of} <span className="highlight">{projects.length}</span> {t.projects_word}
                        {(selectedSkill !== 'all' || selectedYear !== 'all') && (
                            <div className="active-filters">
                                {selectedSkill !== 'all' && (
                                    <span className="active-filter">
                                        {selectedSkill}
                                        <button onClick={() => setSelectedSkill('all')}>×</button>
                                    </span>
                                )}
                                {selectedYear !== 'all' && (
                                    <span className="active-filter">
                                        {selectedYear}
                                        <button onClick={() => setSelectedYear('all')}>×</button>
                                    </span>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Projects Content */}
            <div className={`projects-content ${isLoaded ? 'loaded' : ''}`}>
                <ProjectsSection 
                    initialVisible={filteredProjects.length}
                    filteredProjects={filteredProjects}
                />
            </div>

            {/* Empty State */}
            {filteredProjects.length === 0 && (
                <div className="empty-state">
                    <div className="empty-icon">📂</div>
                    <h3>No projects found</h3>
                    <p>Try adjusting your filters to find what you're looking for.</p>
                    <button onClick={resetFilters} className="empty-action">
                        Clear all filters
                    </button>
                </div>
            )}
        </div>
    )
}