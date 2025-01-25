import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Process } from '../models/process.model';

@Injectable({
  providedIn: 'root',
})
export class ProcessService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getProcessById(id: number): Observable<Process> {
    return this.http
      .get<Process>(`${this.apiUrl}/records/${id}`)
      .pipe(catchError(this.handleError<Process>('getProcessById')));
  }

  saveProcess(data: Process): Observable<any> {
    return this.http
      .post(`${this.apiUrl}/save`, data)
      .pipe(catchError(this.handleError<any>('saveProcess')));
  }

  getProcesses(): Observable<Process[]> {
    return this.http
      .get<Process[]>(`${this.apiUrl}/records`)
      .pipe(catchError(this.handleError<Process[]>('getProcesses', [])));
  }

  updateProcess(data: Process): Observable<Process> {
    return this.http
      .put<Process>(`${this.apiUrl}/records/${data.id}`, data)
      .pipe(catchError(this.handleError<Process>('updateProcess')));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
