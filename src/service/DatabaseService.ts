import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { from } from 'rxjs/observable/from';

@Injectable()
export class DatabaseService {
    private db;

    constructor(private sqlite: SQLite) { 
        
    }

    public initDataBase(entities: any[]) {
        this.sqlite.create({
            name: 'data.db',
            location: 'default'
        })
        .then((db: SQLiteObject) => {
            this.db = db;

            entities.forEach((entity) => {
                this.db.executeSql(entity.createTableSql(), {})
                .then(() => console.log('SQL Table Created => ' + entity.entityName()))
                .catch(e => console.log('Error Creating Table => ' + entity.entityName(), e));
            });
        })
        .catch(e => console.log(e));
    }

    public executeSql(sql, attributes = null): Observable<any> {
        if (attributes) {
            return from(this.db.executeSql(sql, attributes));
        } else {
            return from(this.db.executeSql(sql, {}));
        }
    }
}