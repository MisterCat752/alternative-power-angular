import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashboardSidebar } from '../../sidebar/dashboard-sidebar/dashboard-sidebar';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [RouterOutlet, DashboardSidebar],
  templateUrl: './dashboard-layout.html',
})
export class DashboardLayout {}
