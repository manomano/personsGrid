import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Person } from '../person';
import { PersonService } from '../person.service';

@Component({
  selector: 'app-person-view',
  templateUrl: './person-view.component.html',
  styleUrls: ['./person-view.component.css']
})
export class PersonViewComponent implements OnInit {
  person: Person;
  constructor( private route: ActivatedRoute,
               private personService: PersonService,
               private location: Location) {

  }

  ngOnInit() {
    this.getPerson();
  }

  back(): void {
    this.location.back();
  }
  getPerson(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.personService.getPerson(id)
      .subscribe(person => this.person = person);
  }

}
