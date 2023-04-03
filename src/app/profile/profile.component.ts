import {Component, OnInit} from '@angular/core';
import {User} from "../main/user.model";
import {Zanr} from "../main/zanr.model";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {Book} from "../main/book.model";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  korisnikName : any;
  korisnici : User[] = [];
  zanrovi : Zanr[] = [];
  posudbe : Book[] = [];

  constructor(private http: HttpClient, private route:ActivatedRoute) {
  }

  ngOnInit(): void {
    this.korisnikName = this.route.snapshot.params['user'];
    console.log(this.korisnikName);

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

    this.http.get("https://njp-knjiznica-default-rtdb.firebaseio.com/posudbe.json")
      .subscribe((res: any) => {
        console.log(res);
        const posudbe = [];
        for (let key in res) {
          posudbe.push({...res[key], id: key});
        }
        this.posudbe = posudbe;
      });
  }

  vrati(j:number, i:number){
    let k = this.korisnici[j];
    let posudenaKnjiga = k.knjige[i];
    k.knjige.splice(i,1);

    for (let pos of this.posudbe){
      if (pos.ime == posudenaKnjiga.ime){
        this.http.delete(`https://njp-knjiznica-default-rtdb.firebaseio.com/posudbe/${pos.id}.json`)
          .subscribe((res => {
            console.log(res);
          }));
      }
    }



    this.http.patch(`https://njp-knjiznica-default-rtdb.firebaseio.com/korisnici/${k.id}.json`,k)
      .subscribe((res => {
        console.log(res);
        window.location.reload();
      }), error => {
        console.log(error);
      });


  }

}
