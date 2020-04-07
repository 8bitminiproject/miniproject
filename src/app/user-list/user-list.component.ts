import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { NotificationService } from '../notification.service';
import { DialogService } from '../dialog.service';
import { UserService } from '../user.service';
import { Policy } from '../policy.model';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  constructor(private employeeService:UserService,private dialog:MatDialog,
    private notificationService: NotificationService,
    private dialogService:DialogService, public authService: AuthService) { }
    policies: Policy[];

  listData:MatTableDataSource<any>;
  displayedColumns:string[]=[
                              'address',
                              'latitude',
                              'longitude',
                              'mobileno',
                              'msz',
                              'url'

                       ];
@ViewChild(MatSort, {static: true}) sort: MatSort;
@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
@ViewChild('content', {static: true}) content: ElementRef;
searchKey:string;

  
  ngOnInit() {
    this.employeeService.getEmployees().subscribe(list=>{
      let array=list.map(item =>{
        return {
          $key: item.key,
          ...item.payload.val(),
          
        };
      });
      //this.notificationService.success('sucess');
      this.listData=new MatTableDataSource(array);
      this.listData.sort=this.sort;
      this.listData.paginator=this.paginator;
      this.listData.filterPredicate = (data, filter) => {
        return this.displayedColumns.some(ele => {
          return ele != 'actions' && data[ele].toLowerCase().indexOf(filter) != -1;
        });
      };
    });
  }

  onSearchClear(){
    this.searchKey="";
    this.applyFilter();
  }

  applyFilter(){
    this.listData.filter=this.searchKey.trim().toLowerCase();
  }
 

}
