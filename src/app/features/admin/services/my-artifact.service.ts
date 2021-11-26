import { HttpClient } from '@angular/common/http'; 
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
providedIn: 'root'
})
export class MyArtifactService {
constructor(private http: HttpClient) {}
public myArtifact(userName: string): Observable<any> {
return this.http.get('artifactList/' + userName);
}
}
