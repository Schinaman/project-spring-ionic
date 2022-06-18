import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_CONFIG } from "../config/api.config";
import { CredenciaisDTO } from "../models/credenciais.dto";

@Injectable()
export class AuthService{

    constructor(public http: HttpClient){
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
}