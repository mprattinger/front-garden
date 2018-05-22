import { Payload } from './payload';
import { Injectable } from '@angular/core';
import * as io from "socket.io-client";

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private url = "http://localhost:8080";
  private socket;

  constructor() { 
    this.socket = io(this.url);
  }

  toggle(payload: Payload){
    this.socket.emit('toggle', payload);
  }
}
