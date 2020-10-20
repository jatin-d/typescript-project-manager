//Component base class

export abstract class Component <T extends HTMLElement, U extends HTMLElement> {
  templateElement: HTMLTemplateElement
  hostElement: T
  element: U

  constructor(templateElId:string, hostElId:string, insertAtStart: boolean, newElId?: string
    ) {
    this.templateElement = document.getElementById(templateElId)! as HTMLTemplateElement
    this.hostElement = document.getElementById(hostElId)! as T
    const importedNode = document.importNode(this.templateElement.content, true)
    this.element = importedNode.firstElementChild as U
    if (newElId) {
      this.element.id = newElId
    }
    this.attach(insertAtStart)
  }
  private attach(atStart: boolean) {
    this.hostElement.insertAdjacentElement(atStart? 'afterbegin' :'beforeend' , this.element)
  }
  abstract configure(): void
  abstract renderContent(): void
}