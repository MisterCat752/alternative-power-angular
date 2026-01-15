import { Component } from '@angular/core';
import { UserCreatePage } from '../users-create-page/users-create-page';

@Component({
  selector: 'app-edit-page',
  imports: [UserCreatePage],
  standalone: true,
  templateUrl: './edit-page.html',
  styleUrl: './edit-page.css',
})
export class EditPage {}
