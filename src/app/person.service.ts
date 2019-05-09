import { Injectable } from '@angular/core';
import { Person } from './person';
import { PERSONS } from './mock-persons';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  personsList: Person[];
  constructor() {
    this.personsList  = this.getPersons();
  }

  getPersons(): Person[] {
    let persons = JSON.parse(localStorage.getItem('personList'));
    if (!persons ) {
      persons  = [];
      localStorage.setItem('personList', JSON.stringify([]));
    }
    return persons;
  }

  savePerson(person: Person): void {
    const persons = JSON.parse(localStorage.getItem('personList'));
    persons.push(person);
    localStorage.setItem('personList', JSON.stringify(persons));
    this.personsList.push(person);
  }
}
