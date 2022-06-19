import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../../config/api.config";
import { ClienteDTO } from "../../models/cliente.dto";
import { StorageService } from "../storage.service";


@Injectable()
export class ClienteService {

    constructor(public http: HttpClient,
        public storage: StorageService){
        }
    
    findBYEmail(email: string): Observable<ClienteDTO>{
        let token = this.storage.getLocalUser().token;
        let authHeader = new HttpHeaders({'Authorization': 'Bearer '+token});
        return this.http.get<ClienteDTO>(
            `${API_CONFIG.baseUrl}/clients/email?value=${email}`,
            {'headers': authHeader});
    }


    
    getImageFromBucket(id : string) : Observable<any> {
        let url = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`
        console.log(this.http.get(url, {responseType : 'blob'}))
        return this.http.get(url, {responseType : 'blob'});
    } 
}