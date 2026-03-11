import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashboardSidebar } from '../../sidebar/dashboard-sidebar/dashboard-sidebar';
import { CommonModule } from '@angular/common';
import { Nav } from '../../../../shared/layout/nav/nav';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [RouterOutlet, DashboardSidebar, CommonModule, Nav],
  templateUrl: './dashboard-layout.html',
})
export class DashboardLayout {}
