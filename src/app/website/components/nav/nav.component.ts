import { Component, OnInit } from '@angular/core';
import { faSearch, faCartShopping, faUser } from '@fortawesome/free-solid-svg-icons';
import { NgModel, FormControl, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { DataService } from '../../../services/data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  searchContent = new FormControl('', [Validators.required]);
  username!: string;
  faSearch = faSearch;
  faCartShopping = faCartShopping;
  faUser = faUser
  hideBtns!: boolean;
  hideLogo!: boolean;
  routeSuscription!: Subscription;

  constructor(private dataService: DataService, private cookie: CookieService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.username = this.cookie.get('username');
    this.hideBtns = false;
    this.hideLogo = false;
  }

  ngOnInit(): void {}

  search() {
    if(this.searchContent.valid) {
      this.routeSuscription = this.activatedRoute.queryParams.subscribe(params => {
        let myQuery: Params = {};
        if(params['minPrice']) {
          myQuery['minPrice'] = params['minPrice'];
        }
        if(params['maxPrice']) {
          myQuery['maxPrice'] = params['maxPrice'];
        }
        if(params['offset']) {
          myQuery['offset'] = 0;
        }
        myQuery['title'] = this.searchContent.value;
        if(this.searchContent.valid) {
          this.searchContent.setValue('');
          this.router.navigate(['timeline'], {relativeTo: this.activatedRoute, queryParams: {
            title: myQuery['title'],
            minPrice: myQuery['minPrice'],
            maxPrice: myQuery['maxPrice'],
            offset: myQuery['offset'],
            username: null
          },
          queryParamsHandling: 'merge'})
          .then(() => {
            window.location.reload();
          })
        }
        setTimeout(() => {
          this.hideBtns = false;
          this.hideLogo = false;
          this.routeSuscription.unsubscribe();
        }, 500);
      });
    }
  }

  focus() {
    const width = window.innerWidth;
    if(width < 660) {
      this.hideBtns = true;
      if(width < 455) {
        this.hideLogo = true;
      }
    }
  }

  unfocus() {
    setTimeout(() => {
      if(this.searchContent.invalid) {
        this.hideBtns = false;
        this.hideLogo = false;
      }
    }, 250);
  }

  navigating() {
    setTimeout(() => {
      this.searchContent.setValue('');
      this.hideBtns = false;
      this.hideLogo = false;
    }, 250);
  }
}
