import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Environment } from '../../Enums/Environment';

@Injectable({ providedIn: 'root' })
export class EnvService {
    private apiUrl: string;
    private environment: Environment;

    get getapiUrl(): string {
        return this.apiUrl;
    }
    get env(): Environment {
        return this.environment;
    }
    constructor() {
        //
    }
    public init(): Promise<void> {
        return new Promise((resolve) => {
            this.setEnvVariables();
            resolve();
        });
    }

    private setEnvVariables(): void {
        const hostname = window && window.location && window.location.hostname;
        if (/^.*localhost.*/.test(hostname)) {
            this.environment = Environment.Local;
            this.apiUrl = environment.baseUrl;
        } else if (/^.*gbld9035018.eu.hedani.net.*/.test(hostname)) {
            this.environment = Environment.Prod;
            this.apiUrl = environment.baseUrl;
        } else {
            this.environment = Environment.Prod;
            this.apiUrl = environment.baseUrl;
        }
    }
}
