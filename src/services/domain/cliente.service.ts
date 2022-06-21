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
    
    findBYEmail(email: string){ //: Observable<ClienteDTO>  -- tipagem que retornava apenas os campos definidos no dto
        return this.http.get( //http retorna o objto da requisicao
            `${API_CONFIG.baseUrl}/clients/email?value=${email}`);
    }


    
    getImageFromBucket(id : string) : Observable<any> {
        let url = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`
        return this.http.get(url, {responseType : 'blob'});
    } 

    insert(obj : ClienteDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/clients`, 
            obj,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        ); 
    }
}