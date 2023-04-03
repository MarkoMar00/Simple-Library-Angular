import {Component, OnInit} from '@angular/core';
import {User} from "../main/user.model";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import { PBKDF2, lib } from 'crypto-js';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  newUser : User = new User();
  confirmPass : string = '';
  isValid = false;

  constructor(private http: HttpClient, private router : Router) {
  }

  ngOnInit(): void {
  }

  onSubmit(form : NgForm){
    this.isValid = false;
    if (form.invalid){
      return;
    }
    this.isValid = true;
    this.createUser();
  }

  createUser(){
    if (this.isValid && this.newUser.password == this.confirmPass){
      this.http.post("https://njp-knjiznica-default-rtdb.firebaseio.com/korisnici.json", this.newUser)
        .subscribe((res => {
          console.log(res);
        }));
      let username = this.newUser.username;
      this.router.navigate(['/main', username]);
    }
  }


}
