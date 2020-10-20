//Project state management

import { Project } from "../models/project"
import { ProjectStatus } from "../models/project"

type Listner<T> = (items: T[]) => void

class State<T> {
  protected listners: Listner<T>[] = []

  addListener(listenerFn: Listner<T>) {
    this.listners.push(listenerFn)
  }
}

export class ProjectState extends State<Project>{
  private projects: Project[] = []
  private static instance: ProjectState

  private constructor() {
    super()
  }

  static getInstance() {
    if (this.instance) {
      return this.instance
    }
    else {
      this.instance = new ProjectState()
      return this.instance
    }
  }

  addProject(title: string, description: string, people: number) {
    const newProject = new Project(
      Math.random().toString(),
      title,
      description,
      people,
      ProjectStatus.Active
    )
    this.projects.push(newProject)
    this.updateListeners()
  }

  moveProject(projectId:string, newStatus: ProjectStatus) {
    const project = this.projects.find(proj => proj.id === projectId)
    if (project && project.status !== newStatus) {
      project.status = newStatus
      this.updateListeners()
    }
  }

  private updateListeners() {
    for (const listenerFn of this.listners) {
      listenerFn(this.projects.slice())
    }
  }
}

export const projectState = ProjectState.getInstance()