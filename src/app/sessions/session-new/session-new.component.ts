import { SectionService } from './../shared/section.service';
import { Session } from './../shared/session';
import { Router } from '@angular/router';
import { SessionService } from '../shared/session.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Section } from './../shared/section';
import { FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-session-new',
  templateUrl: './session-new.component.html',
  styleUrls: ['./session-new.component.scss']
})
export class SessionNewComponent implements OnInit {
  form: FormGroup;
  session: Session = new Session();
  public sections: FirebaseListObservable<Section[]>;

  constructor(
    private sessionService: SessionService,
    private sectionService: SectionService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      section: ['', Validators.required],
      room: [''],
      title: ['', Validators.required],
      time: ['', Validators.required],
      tag: [''],
      level: [''],
      abstract: ['']
    });
  }

  ngOnInit() {
    this.sections = this.sectionService.getSectionList();
  }

  save(form) {
    const saveForm = Object.assign(form, this.session);
    this.sessionService.createSession(saveForm);
    this.session = new Session();
    this.router.navigate(['/sessions']);
  }

}