import { Router } from '@angular/router';
import { ProcessService } from '../../services/process.service';
import { Process } from '../../models/process.model';
import { Component } from '@angular/core';
import { trigger, transition, animate, style } from '@angular/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-process-form',
  templateUrl: './process-form.component.html',
  styleUrls: ['./process-form.component.scss'],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    CommonModule,
  ],

  animations: [
    // Fade-in animation for form and messages
    trigger('fadeIn', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate('500ms ease-in', style({ opacity: 1 })),
      ]),
    ]),
    trigger('fadeOut', [
      transition('* => void', [
        animate('300ms ease-out', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class ProcessFormComponent {
  title: string = '';
  description: string = '';
  startDate: Date = new Date();
  endDate: Date = new Date();
  status: 'Pending' | 'In Progress' | 'Completed' = 'Pending';

  responseMessage: string = '';

  constructor(
    private processService: ProcessService,
    private router: Router,
  ) {}

  onSubmit(): void {
    this.processService.getProcesses().subscribe((records: Process[]) => {
      const lastId =
        records.length > 0
          ? Math.max(...records.map((process) => process.id))
          : 0;

      const newProcess: Process = {
        id: lastId + 1,
        title: this.title,
        description: this.description,
        startDate: this.startDate,
        endDate: this.endDate,
        status: this.status,
      };

      this.processService.saveProcess(newProcess).subscribe(
        (response) => {
          this.responseMessage = 'Data saved successfully!';
          this.router.navigate(['/process-list']); // Navigate to the process list page
        },
        (error) => {
          this.responseMessage = 'Error saving data.';
        },
      );
    });
  }
}
