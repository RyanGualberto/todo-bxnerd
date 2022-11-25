import React from "react";
import Card from "../components/card";
import projects from "../data/projects";

function Home() {
  return (
    <div className="relative bg-gradient-to-r from-cyan-900 to-slate-800">
      <div className="flex-1 flex flex-col min-h-screen  justify-evenly items-center">
        <h1 className="font-sans text-4xl text-white font-bold mb-6">
          ToDo JS
        </h1>
        <div className="flex w-full justify-center gap-12 flex-wrap">
          {projects?.map((project) => (
            <Card key={project.id} project={project} />
          ))}
        </div>
      </div>
      <label className="bottom-4 text-xs font-black text-center text-white opacity-30 mt-4">
        Desenvolvido por Ryan Gualberto - Desenvolvimento Multiplataforma com JS
        - 2022
      </label>
    </div>
  );
}

export default Home;
