import { Circle } from './../sprinkler/circle';
import { SprinklerService } from './../sprinkler/sprinkler.service';
import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit, OnChanges {

  @Input() circle: Circle;

  public form: FormGroup;

  constructor(private route: ActivatedRoute, private sprinklerService: SprinklerService, private formBuilder: FormBuilder) {

  }

  ngOnInit() {

    this.form = this.formBuilder.group({
      name: ["", Validators.required],
      gpio: ["", Validators.required],
      autoTime: ["", Validators.required]
    });

    this.route.params.forEach((param: Params) => {
      if (param["id"] !== undefined) {
        this.sprinklerService.getSprinkler(param['id']).subscribe(circle => {
          this.circle = circle;
          this.setFormValues();
        });
      } else {
        this.circle = new Circle();
        this.circle.autoTime = 20;
        this.setFormValues();
      }
    });
  }

  ngOnChanges(){

  }

  onSubmit(submittedForm:FormGroup){
    if(submittedForm.dirty){
      var changed : Circle = submittedForm.value;
      this.circle.autoTime = changed.autoTime;
      this.circle.gpio = changed.gpio;
      this.circle.name = changed.name;
      this.sprinklerService.save(this.circle).subscribe(x => {
        console.log(x);
        window.history.back();
      });
    }
  }

  revert(){
    this.setFormValues();
  }

  setFormValues() {
    this.form.setValue({
      name: this.circle.name,
      gpio: this.circle.gpio,
      autoTime: this.circle.autoTime
    });
  }
}
