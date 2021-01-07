import { Component, OnInit } from '@angular/core';
import { DialogService } from '@ngneat/dialog';
import { LoginModalComponent } from "../login-modal/login-modal.component";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(private dialog: DialogService, private authService: AuthService) { }

  ngOnInit(): void {

  }

  open():void {
    if(this.authService.isLoggedIn()) {
      this.authService.deleteToken()
    } else {
      this.dialog.open(LoginModalComponent, {size: "sm"});
    }

  }
}
