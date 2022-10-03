export class Picture {
  name: string
  alt: string

  constructor (name: string, alt?: string){
    this.name = name
    this.alt = alt || ''
  }
}