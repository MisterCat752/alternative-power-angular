// core/models/project.model.ts
export interface Project {
  id: number;
  title: string;
  status: 'planning' | 'ongoing' | 'on_hold' | 'completed' | 'cancelled' | 'postponed';
  power: number;

  startDate: string;
  deadline: string;

  teamMembers: string[];
  overview: string;
}
