// core/mock/project.mock.ts
import { Project } from '../models/project.model';

export const PROJECTS_MOCK: Project[] = [
  {
    id: 1,
    title: 'PV Farm Cahul',
    status: 'planning',
    power: 150,
    startDate: '2026-01-10',
    deadline: '2026-06-30',
    teamMembers: ['test52@gmail.com', 'tautsimion@gmail.com'],
    overview: 'Large scale photovoltaic farm in Cahul region.',
  },
  {
    id: 2,
    title: 'Residential Kit Program',
    status: 'ongoing',
    power: 25,
    startDate: '2026-01-05',
    deadline: '2026-03-15',
    teamMembers: ['tatiaccount@gmail.com'],
    overview: 'Installation of bundled residential solar kits.',
  },
];
