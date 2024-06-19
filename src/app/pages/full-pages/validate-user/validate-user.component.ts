import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../shared/services/auth.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-validate-user',
  templateUrl: './validate-user.component.html',
  styleUrls: ['./validate-user.component.scss']
})
export class ValidateUserComponent implements OnInit {
  isSuccessful: any
  userid: any
  message: any;
  constructor(private authService: AuthService, private spinner: NgxSpinnerService, private router: Router, private route: ActivatedRoute) {
    this.userid = this.route['params']['value']['id'];

  }

  ngOnInit(): void {
    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });
    this.authService.validate(this.userid).subscribe(
      data => {
        this.message = data.message;
        this.isSuccessful = true;
        this.spinner.hide();
      }
    );
  }

}
