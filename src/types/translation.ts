export interface Translation {
  my_name: string;
  home: string;
  about: string;
  skills: string;
  portfolio: string;
  contact: string;
  greeting: string;
  i: string;
  title: string;
  description: string;
  buttons: {
    talk: string;
    download_cv: string;
    view_work: string;
  };
  socials: {
    connect: string;
    github: string;
    linkedin: string;
    telegram: string;
  };
  status: string;
  myProjects: string;
  view_all_btn: string;
  details_btn: string;
  latestWork: string;

  "project-info": string;
  role: string;
  completed: string;
  technologies: string;
  "view-code": string;
  "live-demo": string;
  "project-overview": string;
  "technologies-used": string;
  "key-features": string;
  "back-to-projects": string;
  "launch-project": string;
  "view-source": string;
  core_technologies: string;
  view_all_skills: string;
  contact_me: string;
  question_or_work_together: string;
  about_me: string;
  full_stack_description: string;
  continuous_learning: string;
  learn_more: string;
  quick_links: string;
  connect_with_me: string;
  city_country: string;
  rights: string;
  phone_number: string;
  typed_text: string;
  my_story: string;
  story_paragraph_1: string;
  story_paragraph_2: string;
  story_paragraph_3: string;
  story_paragraph_4: string;
  years_experience: string;
  languages: string;
  projects_word: string;

  skills_section: {
    frontend: string;
    backend: string;
    tools: string;
    soft: string;
    frontend_skills: string[];
    backend_skills: string[];
    tools_skills: string[];
    soft_skills: string[];
  };

  my_journey: string;
  journey_items: {
    title: string;
    date: string;
    content: string;
  }[];

  currently_exploring: string;
  reading_list: string;
  reading_list_content: string;
  tech_stack: string;
  tech_stack_content: string;
  growth_areas: string;
  growth_areas_content: string;
  skills_subtitle: string;
  skills_description: string;
  skills_categories: {
    all: string;
    frontend: string;
    backend: string;
    database: string;
    security: string;
    tools: string;
    csFundamentals: string;
    other: string;
  };

  contact_subtitle: string;
  sendAMessage: string;
  getInTouch: string;
  getInTouchSubtitle: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  send: string;
  sending: string;
  success: string;
  error: string;
  namePlaceholder: string;
  emailPlaceholder: string;
  subjectPlaceholder: string;
  messagePlaceholder: string;
  nameError: string;
  emailError: string;
  subjectError: string;
  messageError: string;
  emailLabel: string;
  phoneLabel: string;
  linkedinLabel: string;
  githubLabel: string;
  telegramLabel: string;

  my_projects: string;
  projects_subtitle: string;
  years: string;
  sort_by: string;
  newest: string;
  oldest: string;
  reset: string;
  show: string;
  of: string;

  projects: {
    [key: string]: {
      title:string;
      description: string;
      overview: string;
      features: string[];
      role: string;
    };
  };
}
