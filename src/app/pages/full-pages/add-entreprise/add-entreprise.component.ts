import { Component, OnInit } from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {EntrepriseService} from '../../../shared/services/entreprise.service';
import {TokenStorageService} from '../../../shared/services/token-storage.service';
import {HttpEventType, HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-add-entreprise',
  templateUrl: './add-entreprise.component.html',
  styleUrls: ['./add-entreprise.component.scss']
})
export class AddEntrepriseComponent implements OnInit {

  entrepriseFormSubmitted = false;
  entrepriseForm: UntypedFormGroup;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  message = '';
  userid: any;
  selectedFiles: FileList;
  selected: FileList;
  currentFile: File;
  current: File;
  constructor(private formBuilder: UntypedFormBuilder, private tokenStorage: TokenStorageService , private router: Router, private route: ActivatedRoute, private entrepriseService: EntrepriseService, private spinner: NgxSpinnerService) {
    this.entrepriseForm = this.formBuilder.group({
      name: ['', Validators.required],
      matriculefiscale: ['', Validators.required],
      adresse: ['', Validators.required],
      logo: [''],
      iduser: ['']
    })
  }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.userid = this.tokenStorage.getUser().id ;
    }
  }

  get rf() {
    return this.entrepriseForm.controls;
  }


  //  On submit click, reset field value
  onSubmit(): void {
    this.entrepriseForm.value.iduser = this.userid
    this.entrepriseFormSubmitted = true;
    if (this.entrepriseForm.invalid) {
      return;
    }
    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });
    console.log(this.entrepriseForm);
    this.entrepriseService.add(this.entrepriseForm).subscribe(
      data => {
        if (this.entrepriseForm.value.logo !== '') {
          this.currentFile = this.selectedFiles.item(0);
          this.entrepriseService.uploadimage( data.message, this.currentFile).subscribe(
            event => {
              if (event.type === HttpEventType.UploadProgress) {
              } else if (event instanceof HttpResponse) {
                this.message = 'le fichier a téléchargé avec succès';
              }
            },
            err => {
              this.message = 'le fichier a téléchargé avec succès';
              this.currentFile = undefined;
            });
        }
        this.selectedFiles = undefined;
        this.selected = undefined;
        console.log(data)
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.spinner.hide()
        setTimeout(() => {
          this.isSuccessful = false;
          this.router.navigate(['/pages/user/invite'])
        }, 2000);
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSuccessful = false;
        this.isSignUpFailed = true;
        this.spinner.hide();
      }
    );
    console.log(this.isSuccessful, this.isSignUpFailed)
  }
  selectFile(event): void {
    this.selectedFiles = event.target.files;
    console.log(this.selectedFiles);
  }


}
