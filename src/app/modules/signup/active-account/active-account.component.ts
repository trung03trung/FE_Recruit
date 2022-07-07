import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'ngx-signup',
  templateUrl: 'active.component.html',
})

export class ActiveAccountComponent implements OnInit {

  code: string;
  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {

  }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.code = params['code'];
    });
    this.http.get('http://localhost:9090/api/auth/active?code=' + this.code).subscribe(data => {
      console.log(data)
    });
    this.router.navigate(['/auth']);
  }
}
