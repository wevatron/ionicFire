import { Component, OnInit } from '@angular/core';
import {CrudService} from '../../services/crud.service';
import { CrudI } from '../../interfaces/crud-interface';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  registros : CrudI[];
  constructor( private api: CrudService) {}

  ngOnInit(){
    console.log('ya');
    
    this.api.getCrud().subscribe(resp=>{
      console.log(resp);
      this.registros=resp;
    });
  }


  sowCrud(){
    console.log('qui vemos');
    
  }
  removeCrud(){
    console.log('qui vemos');
    
  }
}
