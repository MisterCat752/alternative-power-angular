// core/services/project.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Project } from '../models/project.model';
import { PROJECTS_MOCK } from '../mock/project.mock';

@Injectable({ providedIn: 'root' })
export class ProjectService {
  private projects = [...PROJECTS_MOCK];

  list(): Observable<Project[]> {
    return of(this.projects);
  }

  get(id: number): Observable<Project | undefined> {
    return of(this.projects.find((p) => p.id === id));
  }

  create(payload: Omit<Project, 'id'>): Observable<Project> {
    const newItem: Project = {
      id: Math.max(...this.projects.map((p) => p.id)) + 1,
      ...payload,
    };
    this.projects.push(newItem);
    return of(newItem);
  }

  update(id: number, payload: Omit<Project, 'id'>): Observable<Project | undefined> {
    const i = this.projects.findIndex((p) => p.id === id);
    if (i === -1) return of(undefined);
    this.projects[i] = { id, ...payload };
    return of(this.projects[i]);
  }
}
