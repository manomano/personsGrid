import { Component, OnInit } from '@angular/core';
import {Person} from '../person';
import { PersonService } from '../person.service';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.css']
})
export class PersonsComponent implements OnInit {


  /*person: Person = {
    firstName: 'dada',
    lastName: 'Windstorm',
    income: 55.55,
    avatarURL: 'https://media.licdn.com/dms/image/C4D03AQGTq1GOJVvu8g/profile-displayphoto-shrink_200_200/0?e=1562803200&v=beta&t=4td8YgKk2r6hVbjgP7FzADt9DVcUwCQ3ji1zxD-kVNk'
  };*/
  selectedPerson: Person;
  persons: Person[];
  leftCol: Person[] = [];
  middleCol: Person[] = [];
  rightCol: Person[] = [];
  constructor(private personService: PersonService) { }

  ngOnInit() {
    this.selectedPerson = new Person();
    this.getHeroes();
    this.generateColumns();
  }
  onSelect(person: Person): void {
    const newPerson = {...person};
    this.selectedPerson = newPerson;
  }

  generateColumns(): void {
      const max = Math.max(...this.persons.map(o => o.income), 0);
      const min = Math.min(...this.persons.map(o => o.income), 0);
      const range = max - min;
      const step = Math.floor(range / 3);

      for (const per of this.persons) {
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

  getHeroes(): void {
    /*this.persons = this.personService.getPersons();*/
    this.persons = this.personService.personsList;
  }

  viewPerson(person: Person): void {

  }

  deletePerson(person: Person): void {
    this.personService.deletePerson(person);
  }

}
