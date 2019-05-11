import {Injectable, ɵtextBinding} from '@angular/core';
import { Observable, of } from 'rxjs';
import { Person } from './person';
import { PERSONS } from './mock-persons';
import {forEach} from '@angular/router/src/utils/collection';

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
    persons[person.id] = person;
    localStorage.setItem('personList', JSON.stringify(persons));
    const found = this.personsList.find(x => x.id === person.id);

    Object.keys(found).forEach((key: string) => {
      found[key] = person[key];
    });
    this.calculate(found);
  }

  calculate(person: Person): void {
    let score = 0;
    person.firstName.split('').map(x => score += x.charCodeAt(0));
    person.score =  score * 1.5;
  }

  addPerson(person: Person): void {
    const persons = JSON.parse(localStorage.getItem('personList'));
    person.id = persons.length;
    this.calculate(person);
    persons.push(person);
    localStorage.setItem('personList', JSON.stringify(persons));
    this.personsList.push(person);
  }

  deletePerson(person: Person): void {
    const persons = JSON.parse(localStorage.getItem('personList'));
    const index = persons.findIndex(x => x.id === persons.id);
    persons.splice(index, 1);
    localStorage.setItem('personList', JSON.stringify(persons));
    this.personsList.splice(index, 1);

  }

  getPerson(id: number): Observable<Person> {
    return of(this.personsList.find(x => x.id === id));
  }
}
