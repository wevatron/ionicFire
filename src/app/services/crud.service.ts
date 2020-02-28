import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CrudI } from '../interfaces/crud-interface';


@Injectable({
  providedIn: 'root'
})
export class CrudService {
  private crudCollection : AngularFirestoreCollection<CrudI>;
  private crud: Observable<CrudI[]>;

  constructor(
    db:AngularFirestore
  ) { 
    this.crudCollection = db.collection<CrudI>('crud');
    this.crud = this.crudCollection.snapshotChanges().pipe(map(

      actions=>{
          return actions.map(a=>{
              const data = a.payload.doc.data();
              const id = a.payload.doc.id;
              return { id, ...data };
            });
        }

    ));
  }

    getCrud(){
      return this.crud;
    }
    showCrud(id:string){
      return this.crudCollection.doc<CrudI>(id).valueChanges();
    }
    updateCrud(id:string, crud:CrudI){
      return this.crudCollection.doc<CrudI>(id).update(crud);
    }
    addCrud(crud:CrudI){
      return this.crudCollection.add(crud);
    }
    deleteCrud(id:string){
      return this.crudCollection.doc<CrudI>(id).delete();
    }
    
}
