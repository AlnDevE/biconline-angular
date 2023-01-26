import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.scss']
})
export class ChangePassComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.setForm();
  }

  setForm(){
    this.form = this.formBuilder.group({
      old: ['',[Validators.required]],
      current: ['', [Validators.required]],
      currentReplicate: ['',[Validators.required]]
    })
  }

  onSaveChanges(){
    if(this.verifyPassword()){
      this.form.get('current')?.setErrors({'nomatch': true})
      this.form.get('currentReplicate')?.setErrors({'nomatch': true})
      return
    }
    if(this.form.valid){
      console.log(this.form.value)
    }

  }

  verifyPassword(){
    return this.form.get('current')?.value != this.form.get('currentReplicate')?.value;
  }

}
