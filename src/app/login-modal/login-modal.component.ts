import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DialogService, DialogRef } from '@ngneat/dialog';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginModalComponent implements OnInit {

  constructor(public ref: DialogRef, private dialog: DialogService) { }

  ngOnInit(): void {
  }

  submit(password: string) {
    this.dialog.success({
      title: 'Hurray!',
      body: '<h1>'+password+'</h1>'
    });
  }
}
