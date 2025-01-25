export interface Process {
  id: number;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  status: 'Pending' | 'In Progress' | 'Completed';
}
