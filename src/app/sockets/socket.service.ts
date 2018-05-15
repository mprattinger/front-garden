import { Payload } from './payload';
import { Injectable } from '@angular/core';
import * as io from "socket.io-client";

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private url = "http://localhost:4200";
  private socket;

  constructor() { 
    this.socket = io();
  }

  toggle(payload: Payload){
    this.socket.emit('toggle', payload);
  }
}
