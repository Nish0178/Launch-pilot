"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Project } from "@/types";
import { useAuth } from "@clerk/nextjs";

interface ProjectContextType {
  project: Project | null;
  loading: boolean;
  error: string | null;
  refreshProject: () => Promise<void>;
  validateNewProject: (data: {
    name: string;
    idea: string;
    industry: string;
    country: string;
    budget: string;
    businessModel: string;
  }) => Promise<Project | null>;
  resetProject: () => void;
  loadDemoProject: () => Promise<Project | null>;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export function ProjectProvider({ children }: { children: React.ReactNode }) {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { getToken, userId } = useAuth();

  const fetchLatestProject = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = await getToken();
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (token) headers["Authorization"] = `Bearer ${token}`;

      const res = await fetch("http://localhost:5000/api/projects/latest", { headers });
      if (!res.ok) {
        if (res.status === 404) {
          setProject(null);
        } else {
          throw new Error(`Failed to fetch latest project: ${res.statusText}`);
        }
      } else {
        const data = await res.json();
        setProject(data);
      }
    } catch (err: any) {
      console.warn("Project fetch failed:", err.message);
      setError(err.message || "Failed to load validation intelligence");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLatestProject();
  }, [userId]); // Re-fetch when auth state changes

  const validateNewProject = async (data: {
    name: string;
    idea: string;
    industry: string;
    country: string;
    budget: string;
    businessModel: string;
  }) => {
    try {
      setError(null);
      const token = await getToken();
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (token) headers["Authorization"] = `Bearer ${token}`;

      const res = await fetch("http://localhost:5000/api/projects", {
        method: "POST",
        headers,
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to create validation report");
      }

      const newProject = await res.json();
      setProject(newProject);
      return newProject;
    } catch (err: any) {
      return null;
    }
  };

  const resetProject = () => {
    setProject(null);
    setError(null);
  };

  const loadDemoProject = async () => {
    try {
      setError(null);
      const token = await getToken();
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (token) headers["Authorization"] = `Bearer ${token}`;

      const res = await fetch("http://localhost:5000/api/projects/demo", {
        method: "POST",
        headers,
      });
      if (!res.ok) {
        throw new Error("Failed to load demo project");
      }
      const demoProject = await res.json();
      setProject(demoProject);
      return demoProject;
    } catch (err: any) {
      console.warn("Demo project load failed:", err.message);
      setError(err.message || "Failed to load demo project");
      return null;
    }
  };

  return (
    <ProjectContext.Provider
      value={{
        project,
        loading,
        error,
        refreshProject: fetchLatestProject,
        validateNewProject,
        resetProject,
        loadDemoProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

export function useProject() {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error("useProject must be used within a ProjectProvider");
  }
  return context;
}
