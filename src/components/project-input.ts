import { Component } from "./base-component"
import * as Validation from "../utils/validation"
import { projectState } from "../state/project-state"
import { autobind } from "../decorators/auto-bind"


//Project Input class
export class ProjectInput extends Component <HTMLDivElement, HTMLFormElement> {
  
  titleInputElement: HTMLInputElement
  descriptionInputElement: HTMLInputElement
  peopleInputElement: HTMLInputElement

  constructor() {
    super('project-input', 'app', true, 'user-input')
    this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement
    this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement
    this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement
    this.configure()
  }

  configure() {
    this.element.addEventListener('submit', this.handleSubmit)
  }

  renderContent() {
    
  }

  private gatherUserInputs(): [string, string, number] | void {
    const title = this.titleInputElement.value
    const description = this.descriptionInputElement.value
    const people = this.peopleInputElement.value

    const validatableTitleInput: Validation.validatable = {
      value: title,
      required: true,
      minLength: 5,
      maxLength: 10
    }
    const validatableDescriptionInput: Validation.validatable = {
      value: description,
      required: true,
      minLength: 5,
      maxLength: 15
    }
    const validatablePeopleInput: Validation.validatable = {
      value: +people,
      required: true,
      min: 1,
      max: 5
    }

    if (!Validation.validate(validatableTitleInput) || !Validation.validate(validatableDescriptionInput) || !Validation.validate(validatablePeopleInput)) {
      alert('Invalid input')
    } else {
      return [title, description, +people]
    }
  }

  private clearInputs() {
    this.titleInputElement.value = ''
    this.descriptionInputElement.value = ''
    this.peopleInputElement.value = ''
  }

  @autobind
  private handleSubmit(e: Event) {
    e.preventDefault()
    const userInputs = this.gatherUserInputs()
    if (Array.isArray(userInputs)) {
      const [title, description, people] = userInputs
      projectState.addProject(title, description, people)
      this.clearInputs()
    }
  }
}