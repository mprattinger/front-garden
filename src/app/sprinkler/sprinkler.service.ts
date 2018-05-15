import { Circle } from './circle';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SprinklerService {
  private circleApiUrl = "/api/circles";

  constructor(private http: HttpClient) { }

  getSprinklers(){
    return this.http.get<Circle[]>(this.circleApiUrl)
      .pipe(map(data => data), catchError(this.handleError));
  }
  
  getSprinkler(id: string): Observable<Circle>{
    return this.http.get<Circle>(this.circleApiUrl+"/"+id)
      .pipe(map(data => data), catchError(this.handleError));
  }

  save(circle: Circle){
    if(circle._id){
      //Update
      return this.update(circle);
    }
    //Create
    return this.create(circle);
  }

  private create(circle: Circle){
    return this.http.post<Circle>(this.circleApiUrl, circle, { headers: {'Content-Type': 'application/json'}})
      .pipe(catchError(this.handleError));
  }

  private update(circle: Circle){
    var url = this.circleApiUrl + "/" + circle._id;
    return this.http.put<Circle>(url, circle, { headers: {'Content-Type': 'application/json'}}) //
      .pipe(catchError(this.handleError));
  }

  private handleError(res: HttpErrorResponse | any){
    console.error(res.error || res.body.error);
    return observableThrowError(res.error || 'Server error');
  }
}
