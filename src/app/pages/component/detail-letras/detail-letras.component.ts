import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-detail-letras',
  standalone: true,
  imports: [],
  templateUrl: './detail-letras.component.html',
  styleUrl: './detail-letras.component.css'
})
export class DetailLetrasComponent implements OnInit{

  
  displayedColumns: string[] = ['select', 'orderId', 'city', 'country', 'region', 'date', 'amount'];
  dataSource = new MatTableDataSource<Order>([
    { orderId: 10248, city: 'New York', country: 'United States', region: 'North America', date: new Date('2013-01-06'), amount: 1740 },
    { orderId: 10249, city: 'Los Angeles', country: 'United States', region: 'North America', date: new Date('2013-01-13'), amount: 850 },
    { orderId: 10250, city: 'Denver', country: 'United States', region: 'North America', date: new Date('2013-01-07'), amount: 2235 },
    { orderId: 10251, city: 'Vancouver', country: 'Canada', region: 'North America', date: new Date('2013-01-03'), amount: 1965 },
    { orderId: 10252, city: 'Edmonton', country: 'Canada', region: 'North America', date: new Date('2013-01-10'), amount: 880 },
    { orderId: 10253, city: 'Rio de Janeiro', country: 'Brazil', region: 'South America', date: new Date('2013-01-17'), amount: 5260 },
    { orderId: 10254, city: 'Buenos Aires', country: 'Argentina', region: 'South America', date: new Date('2013-01-21'), amount: 2790 },
    { orderId: 10255, city: 'Asuncion', country: 'Paraguay', region: 'South America', date: new Date('2013-01-01'), amount: 3140 },
    { orderId: 10256, city: 'London', country: 'United Kingdom', region: 'Europe', date: new Date('2013-01-24'), amount: 6175 },
    { orderId: 10257, city: 'Berlin', country: 'Germany', region: 'Europe', date: new Date('2013-01-11'), amount: 4575 }
  ]);

  selection = new SelectionModel<Order>(true, []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
 


  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  toggleSelectAll() {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.dataSource.data.forEach(row => this.selection.select(row));
    }
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  isAnySelected() {
    return this.selection.selected.length > 0 && !this.isAllSelected();
  }

  toggleRowSelection(row: Order) {
    this.selection.toggle(row);
  }
  


}



interface Order {
  orderId: number;
  city: string;
  country: string;
  region: string;
  date: Date;
  amount: number;
}
