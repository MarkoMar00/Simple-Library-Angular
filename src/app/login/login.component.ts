import {Component, OnInit} from '@angular/core';
import {User} from "../main/user.model";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  user : User = new User();
  users : User[] = [];
  foundUser : boolean = false;

  constructor(private http: HttpClient, private router : Router) {}

  ngOnInit(): void {

    this.http.get("https://njp-knjiznica-default-rtdb.firebaseio.com/korisnici.json")
      .subscribe((res : any) => {
        console.log(res);
        const users = [];
        for (let key in res){
          users.push({...res[key], id:key});
        }
        this.users = users;
      });

  }

  login(){
    for(let pot_user of this.users){
      if (pot_user.username == this.user.username && pot_user.password == this.user.password){
        this.foundUser = true;
      }
    }

    if (this.foundUser){
      let username = this.user.username;
      this.router.navigate(['/main', username]);
    }
    else{
      const el = document.createElement('div');
      el.innerHTML = `
        <span style="color: red">
            Neisparvno uneseni podaci!
        </span>
      `;

      const err = document.getElementById('err');
      err?.appendChild(el);
    }
  }
}
