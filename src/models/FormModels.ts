export class FormItem {
  label: string
  selected: any
  options: any[]
  type: 'dropdown' | 'date' | 'text'
  placeholder: string
  optionLabel: string | undefined

  constructor(label?: string, selected?: any, options?: any[], type?: 'dropdown' | 'date' | 'text', placeholder?: string, optionLabel?: string){
    this.label = label || '';
    this.selected = selected || null;
    this.options = options || [];
    this.type = type || 'text';
    this.placeholder = placeholder || '';
    this.optionLabel = optionLabel || undefined;
  }
}


export class EventData {
  occassion: string
  date: string
  numberGuests: number
  duration: number
  music: MusicGenre[]

  constructor (occassion?: string, date?: string, numberGuests?: number, duration?: number, music?: MusicGenre[]){
    this.occassion = occassion || '';
    this.date = date || '';
    this.numberGuests = numberGuests || 0;
    this.duration = duration || 0;
    this.music = music || [];
  }
}

export class MusicGenre {
  id: number
  displayName: string
  constructor(id: number, displayName: string){
    this.id = id;
    this.displayName = displayName;
  }
}