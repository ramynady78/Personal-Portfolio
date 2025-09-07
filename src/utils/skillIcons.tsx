import { 
  FaReact, 
  FaNodeJs, 
  FaCss3Alt, 
  FaHtml5, 
  FaGitAlt,
  FaGithub, 
  FaPython
} from "react-icons/fa";
import { 
  SiRedux, 
  SiMongodb, 
  SiExpress, 
  SiBootstrap, 
  SiTypescript, 
  SiJsonwebtokens, 
  SiReactrouter, 
  SiReactquery, 
  SiMongoose, 
  SiJavascript, 
  SiPostgresql, 
  SiFigma, 
  SiMicrosoftsqlserver, 
  SiSass 
} from "react-icons/si";
import { RiLockPasswordLine } from "react-icons/ri";
import { GrMysql } from "react-icons/gr";
import { BiCodeAlt } from "react-icons/bi"; 
import { TbDatabase, TbApi, TbArrowsRandom } from "react-icons/tb"; 
import { MdOutlineWeb } from "react-icons/md"; 
import { AiOutlineFunction } from "react-icons/ai"; 
import { SiMicrosoftexcel  } from "react-icons/si";
import React from "react";

type IconSize = 'md' | 'lg' | 'xl';

type SkillIcon = {
  icon: JSX.Element;
  bg: string;
  color: string;
};

const sizeMap = {
  md: { icon: 24, container: 'size-md' },
  lg: { icon: 26, container: 'size-lg' },
  xl: { icon: 30, container: 'size-xl' }
};

const skillIcons: Record<string, SkillIcon> = {
  // 🔹 Frontend
  react: { icon: <FaReact />, bg: "rgba(97, 219, 251, 0.1)", color: "#61DBFB" },
  "redux toolkit": { icon: <SiRedux />, bg: "rgba(118, 74, 188, 0.1)", color: "#764abc" },
  redux: { icon: <SiRedux />, bg: "rgba(118, 74, 188, 0.1)", color: "#764abc" },
  "react router": { icon: <SiReactrouter />, bg: "rgba(255, 65, 84, 0.1)", color: "#ff4154" },
  "react query": { icon: <SiReactquery />, bg: "rgba(255, 65, 84, 0.1)", color: "#ff4154" },
  bootstrap: { icon: <SiBootstrap />, bg: "rgba(121, 82, 179, 0.1)", color: "#7952B3" },
  css: { icon: <FaCss3Alt />, bg: "rgba(38, 77, 228, 0.1)", color: "#264de4" },
  html: { icon: <FaHtml5 />, bg: "rgba(227, 76, 38, 0.1)", color: "#e34c26" },
  javascript: { icon: <SiJavascript />, bg: "rgba(247, 223, 30, 0.15)", color: "#f7df1e" },
  js: { icon: <SiJavascript />, bg: "rgba(247, 223, 30, 0.15)", color: "#f7df1e" },
  typescript: { icon: <SiTypescript />, bg: "rgba(49, 120, 198, 0.1)", color: "#3178c6" },
  ts: { icon: <SiTypescript />, bg: "rgba(49, 120, 198, 0.1)", color: "#3178c6" },
  sass: { icon: <SiSass />, bg: "rgba(205, 103, 153, 0.1)", color: "#CC6699" },
  "react icons": { icon: <BiCodeAlt />, bg: "rgba(0, 0, 0, 0.05)", color: "#333" },
  "responsive design": { icon: <MdOutlineWeb />, bg: "rgba(0,0,0,0.05)", color: "#000" },
  flexbox: { icon: <BiCodeAlt />, bg: "rgba(102, 204, 255, 0.1)", color: "#66CCFF" },
  grid: { icon: <MdOutlineWeb />, bg: "rgba(255, 153, 102, 0.1)", color: "#FF9966" },

  // 🔹 Backend
  "node.js": { icon: <FaNodeJs />, bg: "rgba(60, 135, 58, 0.1)", color: "#3C873A" },
  nodejs: { icon: <FaNodeJs />, bg: "rgba(60, 135, 58, 0.1)", color: "#3C873A" },
  node: { icon: <FaNodeJs />, bg: "rgba(60, 135, 58, 0.1)", color: "#3C873A" },
  express: { icon: <SiExpress />, bg: "rgba(0, 0, 0, 0.1)", color: "#000000" },
  "express.js": { icon: <SiExpress />, bg: "rgba(0, 0, 0, 0.1)", color: "#000000" },
  websocket: { icon: <TbArrowsRandom />, bg: "rgba(59,130,246,0.1)", color: "#2563eb" },

  // 🔹 Database
  postgresql: { icon: <SiPostgresql />, bg: "rgba(49,120,198,0.1)", color: "#336791" },
  sql: { icon: <SiMicrosoftsqlserver />, bg: "rgba(0,0,0,0.05)", color: "#CC2927" },
  mysql: { icon: <GrMysql />, bg: "rgba(0,0,0,0.05)", color: "#4479A1" },
  mongodb: { icon: <SiMongodb />, bg: "rgba(77, 179, 61, 0.1)", color: "#4DB33D" },
  mongoose: { icon: <SiMongoose />, bg: "rgba(77, 179, 61, 0.1)", color: "#4DB33D" },

  // 🔹 Security
  jwt: { icon: <SiJsonwebtokens />, bg: "rgba(0, 0, 0, 0.1)", color: "#000000" },
  bcrypt: { icon: <RiLockPasswordLine />, bg: "rgba(75, 85, 99, 0.1)", color: "#4b5563" },

  // 🔹 Tools
  git: { icon: <FaGitAlt />, bg: "rgba(245, 78, 52, 0.1)", color: "#f54e34" },
  github: { icon: <FaGithub />, bg: "rgba(0, 0, 0, 0.1)", color: "#000000" },
  figma: { icon: <SiFigma />, bg: "rgba(242, 78, 30, 0.1)", color: "#F24E1E" },
  excel: { icon: <SiMicrosoftexcel  />, bg: "rgba(16,124,16,0.1)", color: "#107C10" },

  // 🔹 CS Fundamentals
  algorithms: { icon: <AiOutlineFunction />, bg: "rgba(0,0,0,0.05)", color: "#333" },
  "data structures": { icon: <TbDatabase />, bg: "rgba(0,0,0,0.05)", color: "#333" },
  python: { icon: <FaPython />, bg: "rgba(53,114,165,0.1)", color: "#3776AB" },

  // 🔹 Other
  "rest api" : { icon: <TbApi />, bg: "rgba(0,0,0,0.05)", color: "#333" },
  "api" : { icon: <TbApi />, bg: "rgba(0,0,0,0.05)", color: "#333" }
};

interface GetSkillIconOptions {
  size?: IconSize;
  className?: string;
}

export const getSkillIcon = (
  skillName: string, 
  options: GetSkillIconOptions = {}
) => {
  const { size = 'md', className = '' } = options;
  const key = skillName.toLowerCase().trim();
  const skill = skillIcons[key];
  const sizeConfig = sizeMap[size];
  
  if (!skill) {
    return (
      <div className="skill-icon">
        <span>?</span>
      </div>
    );
  }

  const iconElement = React.cloneElement(skill.icon, { 
    size: sizeConfig.icon, 
    color: skill.color 
  });

  return (
    <div 
      className={`skill-icon ${sizeConfig.container} ${className}`}
      style={{ 
        backgroundColor: skill.bg,
        borderColor: skill.color + '40',
        ["--skill-color" as any]: skill.color,
      }}
    >
      {iconElement}
    </div>
  );
};
