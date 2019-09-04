import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Category } from '../model/category';
import { Observable, of  } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { CategoryService } from '../services/category.service';

@Injectable()
// Implement the Resolve interface, as we are implementing a route resolve guard
// Resolve interface supports generics, so specify the type of data that this
// resolver returns using the generic parameter
export class CategoryListResolverService implements Resolve<Observable<Category[] | string>> {

    // Inject the employeee service as we need it to retrieve employee data
    constructor(private _catService: CategoryService) {
    }

    // Resolve interface contains the following one method for which we need to
    // provide implementation. This method calls EmployeeService & returns employee data
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Category[] | string> {

        return this._catService.getAllActive().pipe(catchError((err: string) => of(err)));
    }
}
