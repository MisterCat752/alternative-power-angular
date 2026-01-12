import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

import { FormField } from '../../../../../shared/form/form-field/form-field';
import { TextInput } from '../../../../../shared/form/text-input/text-input';
import { NumberInput } from '../../../../../shared/form/number-input/number-input';
import { UiSelect } from '../../../../../shared/ui/ui-select/ui-select';

@Component({
  selector: 'app-project-create-page',
  standalone: true,
  imports: [ReactiveFormsModule, FormField, TextInput, NumberInput, UiSelect],
  templateUrl: './project-create-page.html',
})
export class ProjectCreatePage {
  private fb = inject(FormBuilder);

  form = this.fb.group({
    title: ['', Validators.required],
    status: ['planning', Validators.required],
    power: [1, Validators.required],

    startDate: ['', Validators.required],
    deadline: ['', Validators.required],

    teamMembers: [[]],
    overview: [''],
  });

  statusOptions = [
    { label: 'Planning', value: 'planning' },
    { label: 'Ongoing', value: 'ongoing' },
    { label: 'On hold', value: 'on_hold' },
    { label: 'Completed', value: 'completed' },
    { label: 'Cancelled', value: 'cancelled' },
    { label: 'Postponed', value: 'postponed' },
  ];

  // мок список пользователей
  teamMemberOptions = [
    { label: 'test52@gmail.com', value: 'test52@gmail.com' },
    { label: 'tautsimion@gmail.com', value: 'tautsimion@gmail.com' },
    { label: 'tatiaccount@gmail.com', value: 'tatiaccount@gmail.com' },
    { label: 'gherasimovalexandru@gmail.com', value: 'gherasimovalexandru@gmail.com' },
    { label: 'taution4@gmail.com', value: 'taution4@gmail.com' },
    { label: 'gherasimovalexandru@hotmail.com', value: 'gherasimovalexandru@hotmail.com' },
  ];

  submit() {
    console.log('click');
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    console.log('PROJECT FORM:', this.form.value);
  }
}
