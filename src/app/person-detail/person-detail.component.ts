import { Component, OnInit, Input } from '@angular/core';
import { Person } from '../person';
import { PersonService } from '../person.service';

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.css']
})
export class PersonDetailComponent implements OnInit {

  @Input() person: Person;
  constructor(private personService: PersonService) { }

  ngOnInit() {
  }

  savePerson(): void {
    this.personService.savePerson(this.person);
    this.createNew();
  }

  createNew(): void {
    this.person = new Person();
  }

}
