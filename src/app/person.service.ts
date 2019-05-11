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
  leftCol: Person[] = [];
  middleCol: Person[] = [];
  rightCol: Person[] = [];

  constructor() {
    this.personsList  = this.getPersons();
    this.generateColumns();
  }


  generateColumns(): void {
    const max = Math.max(...this.personsList.map(o => o.income), 0);
    const min = Math.min(...this.personsList.map(o => o.income), 0);
    const range = max - min;
    const step = Math.floor(range / 3);

    for (const per of this.personsList) {
      if (per.income <= step) {
        this.leftCol.push(per);
      }

      if (per.income <= 2 * step && per.income > step) {
        this.middleCol.push(per);
      }

      if (per.income > 2 * step) {
        this.rightCol.push(per);
      }
    }
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
    const ind = persons.findIndex(x => x.id === person.id);
    persons[ind] = person;
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
