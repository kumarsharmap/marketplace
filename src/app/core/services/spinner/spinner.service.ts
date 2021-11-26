import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
providedIn: 'root'
})
export class SpinnerService {
constructor() {}
public status: Subject<boolean> = new Subject();
public apiStatus: Subject<boolean> = new Subject();
public browserStatus: Subject<boolean> = new Subject();

start(): void {
this.status.next(true);
}
stop(): void {
this.status.next(false);
}
startAPICall(): void {
this.apiStatus.next(true);
}
stopAPICall(): void {
this.apiStatus.next(false);
}
startBrowse(): void {
this.browserStatus.next(true);
}
stopBrowse(): void {
this.browserStatus.next(false);
}
}
