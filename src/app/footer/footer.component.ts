import { Component, OnInit } from '@angular/core';
import { DialogService } from '@ngneat/dialog';
import { LoginModalComponent } from "../login-modal/login-modal.component";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(private dialog: DialogService) { }

  ngOnInit(): void {

  }

  open():void {
    this.dialog.open(LoginModalComponent, {size: "sm"});
  }
}
