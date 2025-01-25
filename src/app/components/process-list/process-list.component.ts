import { Component, OnInit } from '@angular/core';
import { ProcessService } from '../../services/process.service';
import { Router } from '@angular/router';
import { Process } from '../../models/process.model';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-process-list',
  standalone: true,
  imports: [
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
  ],
  templateUrl: './process-list.component.html',
  styleUrls: ['./process-list.component.scss'],
})
export class ProcessListComponent implements OnInit {
  records: Process[] = [];
  displayedColumns: string[] = [
    'title',
    'description',
    'startDate',
    'endDate',
    'actions',
  ];

  constructor(
    private processService: ProcessService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    // Load processes from service
    this.processService.getProcesses().subscribe((data: Process[]) => {
      this.records = data;
    });
  }

  viewDetails(processId: number): void {
    this.router.navigate(['/process-details', processId]); // Navigates to process-details/:id
  }
}
