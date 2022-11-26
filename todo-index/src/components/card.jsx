import React from "react";
import { AiFillGithub, AiOutlineLink } from "react-icons/ai";
import {
  IoLogoElectron,
  IoLogoReact,
  IoLogoNodejs,
  IoLogoFirebase,
} from "react-icons/io5";

import setup from "../assets/downloads/ToDo-desktop-setup.exe";

function Card({ project }) {
  return (
    <div className="flex flex-col min-w-[230px] max-w-[230px] justify-around bg-slate-800 gap-4 items-center p-6 border-white border-[1px] rounded-md">
      <label className="text-2xl text-white font-semibold">
        {project.name}
      </label>
      {project.icon === "react" && (
        <IoLogoReact size={72} className="text-5xl text-blue-500" />
      )}
      {project.icon === "electron" && (
        <IoLogoElectron size={72} className="text-5xl text-blue-500" />
      )}
      {project.icon === "node" && (
        <IoLogoNodejs size={72} className="text-5xl text-blue-500" />
      )}
      <div className="flex gap-6 items-center text-white">
        {project.name === "ToDo - Desktop" ? (
          <a
            className=" rounded-md p-1"
            download={project.name === "ToDo - Desktop"}
            href={setup}
          >
            {console.log(project.liveLink)}
            <AiOutlineLink size={36} color="#fff" />
          </a>
        ) : (
          <a className=" rounded-md p-1" href={project.liveLink}>
            <AiOutlineLink size={36} color="#fff" />
          </a>
        )}
        <div className="h-[32px] w-[1px]bg-white"></div>
        <a className=" rounded-md p-1 " href={project.gitLink}>
          <AiFillGithub size={36} color="#fff" />
        </a>
      </div>
      <div className="max-w-[220px] flex flex-wrap gap-2">
        {project.technologies.map((tag) => (
          <>
            {tag === "React" && (
              <IoLogoReact size={24} className="text-2xl text-blue-500" />
            )}
            {tag === "Electron" && (
              <IoLogoElectron size={24} className="text-2xl text-blue-500" />
            )}
            {tag === "NodeJs" && (
              <IoLogoNodejs size={24} className="text-2xl text-blue-500" />
            )}
            {tag === "Firebase" && (
              <IoLogoFirebase size={24} className="text-2xl text-blue-500" />
            )}
          </>
        ))}
      </div>
    </div>
  );
}

export default Card;

// name: "Project 1",
// description: "Project 1 description",
// gitLink: " ",
// liveLink: " ",
// image: " ",
// technologies: ["HTML", "CSS", "JavaScript"],
