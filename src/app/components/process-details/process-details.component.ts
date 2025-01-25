import { Component, OnInit } from '@angular/core';
import { Process } from '../../models/process.model';
import { ProcessService } from '../../services/process.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-process',
  templateUrl: './process-details.component.html',
  styleUrls: ['./process-details.component.scss'],
  imports: [FormsModule],
})
export class ProcessDetailsComponent implements OnInit {
  process: Process = {
    id: 0,
    title: '',
    endDate: new Date(),
    startDate: new Date(),
    description: '',
    status: 'Pending',
  };

  constructor(
    private router: Router,
    private processService: ProcessService,
  ) {}

  ngOnInit(): void {
    this.loadProcessDetails(1); // Replace 1 with the actual process ID
  }

  loadProcessDetails(id: number): void {
    this.processService.getProcessById(id).subscribe((data) => {
      this.process = data;
    });
  }

  onSubmit(): void {
    this.processService.updateProcess(this.process).subscribe((response) => {
      this.router.navigate(['/process-list']);
    });
  }

  onCancel(): void {
    this.router.navigate(['/process-list']);
  }
}
