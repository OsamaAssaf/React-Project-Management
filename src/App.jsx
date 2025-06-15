import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectsSidebar from "./components/ProjectsSidebar";
import SelectedProject from "./components/SelectedProject";

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: [],
  });

  function handleAddTask(text) {
    const taskId = Math.random();
    const newTask = {
      text: text,
      id: taskId,
      projectId: projectsState.selectedProjectId,
    };
    setProjectsState((prevProjectsState) => {
      return {
        ...prevProjectsState,
        tasks: [newTask, ...prevProjectsState.tasks],
      };
    });
  }
  function handleDeleteTask(id) {
    setProjectsState((prevProjectsState) => {
      return {
        ...prevProjectsState,
        tasks: prevProjectsState.tasks.filter((task) => task.id !== id),
      };
    });
  }

  function handleStartAddProject() {
    setProjectsState((prevProjectsState) => {
      return { ...prevProjectsState, selectedProjectId: null };
    });
  }

  function handleCancelAddProject() {
    setProjectsState((prevProjectsState) => {
      return { ...prevProjectsState, selectedProjectId: undefined };
    });
  }

  function handleAddProject(projectData) {
    const projectId = Math.random();
    const newProject = {
      ...projectData,
      id: projectId,
    };
    setProjectsState((prevProjectsState) => {
      return {
        ...prevProjectsState,
        projects: [...prevProjectsState.projects, newProject],
        selectedProjectId: projectId,
      };
    });
  }

  function handleSelectProject(id) {
    setProjectsState((prevProjectsState) => {
      return { ...prevProjectsState, selectedProjectId: id };
    });
  }

  function handleDeleteProject() {
    setProjectsState((prevProjectsState) => {
      return {
        ...prevProjectsState,
        selectedProjectId: undefined,
        projects: prevProjectsState.projects.filter(
          (project) => project.id !== prevProjectsState.selectedProjectId
        ),
      };
    });
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar
        onStartAddProject={handleStartAddProject}
        projects={projectsState.projects}
        onSelectProject={handleSelectProject}
        selectedProjectId={projectsState.selectedProjectId}
      />
      {projectsState.selectedProjectId === null && (
        <NewProject
          onAdd={handleAddProject}
          onCancel={handleCancelAddProject}
        />
      )}
      {projectsState.selectedProjectId === undefined && (
        <NoProjectSelected onStartAddProject={handleStartAddProject} />
      )}
      {projectsState.selectedProjectId && (
        <SelectedProject
          project={projectsState.projects.find(
            (project) => project.id === projectsState.selectedProjectId
          )}
          onDelete={handleDeleteProject}
          onAddTask={handleAddTask}
          onDeleteTask={handleDeleteTask}
          tasks={projectsState.tasks}
        />
      )}
    </main>
  );
}

export default App;
