// pages/dashboard/projects/project-form.page.ts
import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { FormField } from '../../../../../shared/form/form-field/form-field';
import { TextInput } from '../../../../../shared/form/text-input/text-input';
import { NumberInput } from '../../../../../shared/form/number-input/number-input';
import { UiSelect } from '../../../../../shared/ui/ui-select/ui-select';

import { ProjectService } from '../../../../../core/services/project.service';
import { Project } from '../../../../../core/models/project.model';

@Component({
  selector: 'app-project-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormField, TextInput, NumberInput, UiSelect],
  templateUrl: './project-create-page.html',
})
export class ProjectFormPage implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private service = inject(ProjectService);

  projectId = signal<number | null>(null);
  isEdit = computed(() => this.projectId() !== null);

  statusOptions = [
    { label: 'Planning', value: 'planning' },
    { label: 'Ongoing', value: 'ongoing' },
    { label: 'On hold', value: 'on_hold' },
    { label: 'Completed', value: 'completed' },
    { label: 'Cancelled', value: 'cancelled' },
    { label: 'Postponed', value: 'postponed' },
  ];

  teamMemberOptions = [
    { label: 'test52@gmail.com', value: 'test52@gmail.com' },
    { label: 'tautsimion@gmail.com', value: 'tautsimion@gmail.com' },
    { label: 'tatiaccount@gmail.com', value: 'tatiaccount@gmail.com' },
    { label: 'gherasimovalexandru@gmail.com', value: 'gherasimovalexandru@gmail.com' },
    { label: 'taution4@gmail.com', value: 'taution4@gmail.com' },
    { label: 'gherasimovalexandru@hotmail.com', value: 'gherasimovalexandru@hotmail.com' },
  ];

  form = this.fb.group({
    title: ['', Validators.required],
    status: ['planning', Validators.required],
    power: [1, Validators.required],
    startDate: ['', Validators.required],
    deadline: ['', Validators.required],
    teamMembers: [[] as string[]],
    overview: [''],
  });

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.projectId.set(id ? Number(id) : null);

    if (this.isEdit()) {
      this.service.get(this.projectId()!).subscribe((p) => p && this.form.patchValue(p));
    }
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = this.form.value as Omit<Project, 'id'>;

    console.log('PROJECT SUBMIT:', payload, 'Edit:', this.isEdit());

    if (this.isEdit()) {
      this.service
        .update(this.projectId()!, payload)
        .subscribe(() => this.router.navigate(['/dashboard/projects/my-projects-list']));
    } else {
      this.service
        .create(payload)
        .subscribe(() => this.router.navigate(['/dashboard/projects/my-projects-list']));
    }
  }
}
