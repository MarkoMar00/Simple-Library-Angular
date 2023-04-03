import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Book} from "./book.model";
import {Zanr} from "./zanr.model";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "./user.model";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  knjige: Book[] = [];
  zanrovi: Zanr[] = [];
  korisnici : User[] = [];
  trenutniKorisnik : any;

  constructor(private http: HttpClient, private route:ActivatedRoute, private router : Router) {
  }

  ngOnInit(): void {

    this.http.get("https://njp-knjiznica-default-rtdb.firebaseio.com/knjige.json")
      .subscribe((res: any) => {
        console.log(res);
        const knige = [];
        for (let key in res) {
          knige.push({...res[key], id: key});
        }
        this.knjige = knige;
      });

    this.http.get("https://njp-knjiznica-default-rtdb.firebaseio.com/zanrovi.json")
      .subscribe((res: any) => {
        console.log(res);
        const zanrovi = [];
        for (let key in res) {
          zanrovi.push({...res[key], id: key});
        }
        this.zanrovi = zanrovi;
      });

    this.http.get("https://njp-knjiznica-default-rtdb.firebaseio.com/korisnici.json")
      .subscribe((res: any) => {
        console.log(res);
        const users = [];
        for (let key in res) {
          users.push({...res[key], id: key});
        }
        this.korisnici = users;
      });

    this.trenutniKorisnik = this.route.snapshot.params['user'];

  }

  posudi(i:number){
    for (let user of this.korisnici){
      if (user.username == this.trenutniKorisnik){
        let kor = new User();
        kor.id = user.id;
        kor.username = user.username;
        kor.name = user.name;
        kor.email = user.email;
        kor.password = user.password;

        try {
          kor.knjige = user.knjige;
          kor.addBook(this.knjige[i]);
        } catch (err){
          console.log(err);
          let kor = new User();
          kor.id = user.id;
          kor.username = user.username;
          kor.name = user.name;
          kor.email = user.email;
          kor.password = user.password;
          kor.addBook(this.knjige[i]);
          this.http.patch(`https://njp-knjiznica-default-rtdb.firebaseio.com/korisnici/${user.id}.json`,kor)
            .subscribe((res => {
              console.log(res);
              window.location.reload();
            }), error => {
              console.log(error);
            });
        }

        this.http.patch(`https://njp-knjiznica-default-rtdb.firebaseio.com/korisnici/${user.id}.json`,kor)
          .subscribe((res => {
            console.log(res);
            window.location.reload();
          }), error => {
            console.log(error);
          });

        this.http.post("https://njp-knjiznica-default-rtdb.firebaseio.com/posudbe.json", this.knjige[i])
          .subscribe((res => {
            console.log(res);
          }));

        }
      }
    }



}
