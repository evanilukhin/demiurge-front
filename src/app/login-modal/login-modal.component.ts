import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DialogService, DialogRef } from '@ngneat/dialog';
import { AuthService } from "../auth.service";

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginModalComponent implements OnInit {

  constructor(public ref: DialogRef, private dialog: DialogService, private authService: AuthService) { }

  ngOnInit(): void {
  }

  submit(password: string) {
    this.authService.authenticate(password);
    this.ref.close()
  }
}
