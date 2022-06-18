import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_CONFIG } from "../config/api.config";
import { CredenciaisDTO } from "../models/credenciais.dto";
import { LocalUser } from "../models/local_user";
import { StorageService } from "./storage.service";

@Injectable()
export class AuthService{

    constructor(public http: HttpClient, public storage: StorageService){
    }

    authenticate(creds : CredenciaisDTO){
        return this.http.post( //retornará um observable da resposta
            `${API_CONFIG.baseUrl}/login`, 
            creds,
            {
                observe: 'response', // especificação para ter acesso ao hearder da minha resposta 
                responseType: 'text' //como retorna reposta de corpo vazio não pode ser json senão ele tentará fazer um parse
            } )
    }

    sucessfulLogin(authorizationValue : string){
        let tok = authorizationValue.substring(7);
        let user : LocalUser = {
            token : tok
        };
        this.storage.setLocalUser(user);
    }

    logout() {
        this.storage.setLocalUser(null);
    }
}
