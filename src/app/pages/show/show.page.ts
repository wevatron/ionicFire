import { Component, OnInit } from '@angular/core';
import {CrudService} from '../../services/crud.service';
import { CrudI } from '../../interfaces/crud-interface';
import { ActivatedRoute } from '@angular/router';
import { NavController,LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-show',
  templateUrl: './show.page.html',
  styleUrls: ['./show.page.scss'],
})
export class ShowPage implements OnInit {

  crud : CrudI = {
    nombre:''
  };
  crud_id: string = '';
  constructor(
    private route: ActivatedRoute,
    private nav: NavController,
    private api: CrudService,
    private load : LoadingController
  ) { }

  ngOnInit() {
    this.crud_id = this.route.snapshot.params['id'];
    if (this.crud_id) {
      this.loadFn();
    }
    }

    async loadFn(){
      const loading = await this.load.create({
        message:'Espere ....'
      });

      await loading.present();
      this.api.showCrud(this.crud_id).subscribe(res=>{

        loading.dismiss();
        this.crud = res;
      });
    }
    async guardarCrud(){
      const loading = await this.load.create({
        message:'Guardando ....'
      });

      await loading.present();
      if (this.crud_id) {
        this.api.updateCrud(this.crud_id,this.crud).then(res=>{
          loading.dismiss();
          console.log(this.crud);
          
          this.nav.navigateForward('/');
        });
      } else {
        this.api.addCrud(this.crud).then(res=>{
          loading.dismiss();
          this.nav.navigateForward('/');
        });
      }
      
    }

}
