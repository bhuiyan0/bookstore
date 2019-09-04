import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/model/user';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

declare var $: any;
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profile = User;
  currenUserId: string;
  user = {
    firstName: null,
    lastName: null,
    email: null,
    userName: null,
    phoneNumber: null,
    gender: null,
    address: null,
    dob: null,
    role: null
  };

  EditForm: FormGroup;
  ChangePasswordForm: FormGroup;
  constructor(private userService: UserService, private datepipe: DatePipe, private fb: FormBuilder,private authService:AuthService) { }

  ngOnInit() {
    this.loadProfileData();
    this.createEditForm();
    this.createPasswordChageForm();
  }

  loadProfileData() {
    const id= this.authService.getUserId();
    this.userService.getByUserId(id).subscribe(res => {
       console.log(res);
      this.user.firstName = res.firstName;
      this.user.lastName = res.lastName;
      this.user.userName = res.userName;
      this.user.phoneNumber = res.phoneNumber;
      this.user.gender = res.gender;
      this.user.address = res.address;
      this.user.dob = this.datepipe.transform(res.doB, 'dd-MM-yyyy');
      this.user.role = res.role;
      this.user.email = res.email;
      this.currenUserId = res.id;
      
      this.EditForm.patchValue({
        firstName: res.firstName,
        lastName: res.lastName,
        phoneNumber: res.phoneNumber,
        gender: res.gender,
        address: res.address,
        // imageUrl: res.imageUrl,
        doB: res.doB
      });
    }, err => console.log(err));
  }

  createEditForm() {
    const phonePattern: RegExp = /^(01[1-9](\d{8})$)/;
    this.EditForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      phoneNumber: ['',Validators.pattern(phonePattern)],
      imageUrl: [''],
      doB: [''],
      gender: [''],
      address: ['']
    });
  }

  createPasswordChageForm() {
    this.ChangePasswordForm = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  updateProfile() {
    const id=this.authService.getUserId();
    if(this.EditForm.invalid){
      return;
    }
    this.userService.update(id, this.EditForm.value).subscribe(res => {
      console.log(res);
      this.loadProfileData();
      this.closeModal();
    }, err => console.log(err));
    console.log(this.EditForm.value);
  }

  updatePassword() {
    const id=this.authService.getUserId();
    this.userService.changePassword(id, this.ChangePasswordForm.value).subscribe(res => {
      console.log(res);
      this.ChangePasswordForm.reset();
    }, err => console.log(err));
  }

  openModal() {
    $('#profileModal').modal('show');
  }
  closeModal() {
    $('#profileModal').modal('hide');
  }
}
