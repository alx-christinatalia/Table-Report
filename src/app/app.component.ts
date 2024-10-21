import { Component } from '@angular/core';
import {PageEvent} from '@angular/material/paginator';
import { DataDetail } from './Model/DataDetail';
import { PageVariable } from './Model/PageVariable';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { PageListBody } from './Model/PageListBody';
import { timeout } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  arr=new Array<DataDetail>();
  title = 'TabelReport';
  pageSize: number=0;
  pageNo: number=10;
  totalBaris:number=100;
  idCabang:string='ae87e45a-fdb3-4dd3-b6de-245016743774';
  
  ngOnit() {
    var end=new Date();
    var start=new Date(end.getDate()-60);
    var param=new PageVariable();
    param.PageNumber=1;
    param.PageSize=10;
    
    this.getDataReport(this.idCabang,start,end,param);
  }
  constructor(private http: HttpClient) { }
  handlePageEvent(e: PageEvent) {
     //console.log(e.pageIndex);
     //console.log(e.pageSize);
     if(e.pageIndex > this.pageNo) {
       // Clicked on next button
     } else {
       // Clicked on previous button
     }
     // The code that you want to execute on clicking on next and previous buttons will be written here.
     this.pageSize = e.pageSize;
     this.pageNo = e.pageIndex;
     this.totalBaris=e.length;
     var end=new Date();
     var start=new Date(end.getDate()-60);
     var param=new PageVariable();
     param.PageNumber=this.pageNo +1;
     param.PageSize=this.pageSize;
     
     this.getDataReport(this.idCabang,start,end,param);
  }
  
  getDataReport(idcabang:string,awal:Date,akhir:Date,param:PageVariable):void
  {
    let headers = new HttpHeaders();
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Access-Control-Allow-Origin', '*');
        headers = headers.append('Access-Control-Allow-Methods', '*');
        headers = headers.append('Access-Control-Allow-Headers', '*');
        headers = headers.append('partnerID', this.idCabang);
    let options = { headers: headers};
    var data=new PageListBody();
    data.idcabang=idcabang;
    data.start=awal;
    data.end=akhir;
    data.pageComponent=param;
    try   
    {

    this.http.post<any>('https://test.reservara.id/Report/api/Detail/DetailReportPaging', data
    ,/*options*/{headers:headers,observe:'response'})
    .pipe(timeout(30000))
    .subscribe((hasil: any) => {
      //var tmp=JSON.parse(hasil.body.response);
      //this.arr=tmp.datareport;
      //this.totalBaris=tmp.length;
      //console.log(hasil.headers.get('X-Pagination'));
      //console.log(JSON.parse(hasil.body.response));
      var tmp=JSON.parse(hasil.headers.get('X-Pagination'));
      //console.log(tmp.TotalPages);
      this.totalBaris=tmp.TotalCount;
      this.arr=JSON.parse(hasil.body.response);
         });
        }
        catch(e)
        {
          console.log(e);
        }
  }  
}
