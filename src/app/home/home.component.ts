import { Payload } from './../sockets/payload';
import { SocketService } from './../sockets/socket.service';
import { Circle } from './../sprinkler/circle';
import { SprinklerService } from './../sprinkler/sprinkler.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  manOn: boolean = false;
  autoOn: boolean = false;

  // ManText: String = this.manOn ? "Stoppen" : "Starten";
  // AutoText: String = this.autoOn ? "Automatik stoppen" : "Automatik starten";
  ManClassName: String = this.manOn ? "btn btn-alert manuell" : "btn btn-success manuell";
  AutoClassName: string = this.autoOn ? "btn btn-alert" : "btn btn-success";

  circles: Circle[] = [];

  constructor(private sprinklerService: SprinklerService, private router: Router, private socketService: SocketService) { }

  ngOnInit() {
    this.sprinklerService.getSprinklers().subscribe(circles => this.circles = circles);
  }

  gotoDetail(circle: Circle) {
    var link = [];
    if (circle) {
      link = ['/detail', { id: circle._id}];
    } else {
      link = ['/detail'];
    }
    this.router.navigate(link);
  }

  manStart(circle: Circle){
    this.manOn = !this.manOn;
    let payload = new Payload();
    payload.circle = circle;
    payload.onoff = this.manOn;
    this.socketService.toggle(payload);
  }

  autoStart(circle: Circle){
    this.autoOn = !this.autoOn;
  }

}
