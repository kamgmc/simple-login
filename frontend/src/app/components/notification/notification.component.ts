import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  @Input() type = 'success';
  @Input() message: string;
  visible = true;

  constructor() {
  }

  ngOnInit(): void {
  }

  close(): void {
    this.visible = false;
  }
}