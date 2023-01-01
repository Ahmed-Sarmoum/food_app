import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchName = ""
  constructor(activatedRoute: ActivatedRoute, private router: Router){
    activatedRoute.params.subscribe((params) => {
      if (params.searchName) this.searchName = params.searchName
    })
  }
  ngOnInit(): void {
  }

  search(name: string) {
    if(name)
      this.router.navigateByUrl("/search/"+name)
  }


}
