import { Component } from "./base-component"
import { autobind } from "../decorators/auto-bind"
import { Project } from "../models/project"
import { ProjectStatus } from "../models/project"
import { DragTarget } from "../models/drag-drop"
import { projectState } from "../state/project-state"
import { ProjectItem } from "./project-item"



//Project List class
export class ProjectList extends Component <HTMLDivElement, HTMLElement> implements DragTarget{
  
  assignedProjects: Project[]

  constructor(private type: 'active' | 'finished') {
    super('project-list', 'app', false , `${type}-projects` )
    this.assignedProjects = []
    this.configure()
    this.renderContent()
  }

  @autobind
  dragOverHandler(event: DragEvent) {
    if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
      event.preventDefault()
      const listEl = this.element.querySelector('ul')!
      listEl.classList.add('droppable')
    }
    
  }

  @autobind
  dropHandler(event: DragEvent) { 
    const projId = event.dataTransfer!.getData('text/plain')
    projectState.moveProject(projId, this.type === 'active'? ProjectStatus.Active : ProjectStatus.Finished)
  }

  @autobind
  dragLeaveHandler(_: DragEvent) {
    const listEl = this.element.querySelector('ul')!
    listEl.classList.remove('droppable')
  }

  configure() {
    this.element.addEventListener('dragover', this.dragOverHandler)
    this.element.addEventListener('drop', this.dropHandler)
    this.element.addEventListener('dragleave', this.dragLeaveHandler)
    projectState.addListener((projects: Project[]) => {
      const releventProjects = projects.filter(proj => {
        if (this.type === 'active') {
          return proj.status === ProjectStatus.Active
        }
        return proj.status === ProjectStatus.Finished
      })
      this.assignedProjects = releventProjects
      this.renderProjects()
    })
  }
  renderContent() {
    const listId = `${this.type}-projects-list`
    this.element.querySelector('ul')!.id = listId
    this.element.querySelector('h2')!.textContent = this.type.toUpperCase()+' PROJECTS'
  }

  private renderProjects() {
    const listEl = document.getElementById(`${this.type}-projects-list`)! as HTMLUListElement
    listEl.innerHTML = ''
    for (const projItems of this.assignedProjects) {
      new ProjectItem(this.element.querySelector('ul')!.id, projItems)
    }
  }
}