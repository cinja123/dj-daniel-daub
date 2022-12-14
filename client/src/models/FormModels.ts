export class FormItem {
  label: string
  selectedKey: string
  options: any[]
  type: string
  placeholder: string
  optionLabel: string | undefined

  constructor(selectedKey: string, label?: string, options?: any[], type?: string, placeholder?: string, optionLabel?: string){
    this.label = label || '';
    this.selectedKey = selectedKey;
    this.options = options || [];
    this.type = type || 'text';
    this.placeholder = placeholder || '';
    this.optionLabel = optionLabel || undefined;
  }
}

/**
 * Data that is neede to describe the Event
 * occassion: what event
 * date: on which date is event
 * numberGuests: how many guests
 * duration: how long should there be music
 * music: what kind of music is desired
 */
export class EventData {
  occassion: string | undefined
  date: string | undefined
  numberGuests: number | undefined
  duration: number | undefined
  music: MusicGenre[] | undefined

  constructor (occassion?: string, date?: string, numberGuests?: number, duration?: number, music?: MusicGenre[]){
    this.occassion = occassion;
    this.date = date;
    this.numberGuests = numberGuests;
    this.duration = duration;
    this.music = music;
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

export class LocationData {
  locationName = '';
  zipCode: number | undefined = undefined;
  city = '';
  eventTechnology: {name: string; value: boolean | null} = {name: 'nicht bekannt', value: null};
}


/**
 * Data that is needed to describe a User
 */
export class UserData {
  firstname: string
  lastname: string
  email: string
  phone: string
  information: string | undefined
  constructor(firstname: string, lastname: string, email: string, phone: string, information?: string){
    this.firstname = firstname;
    this.lastname= lastname;
    this.email = email;
    this.phone = phone;
    this.information = information;
  }
}