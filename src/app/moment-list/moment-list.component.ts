import { Component, OnInit, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { MomentService } from 'src/services/moment.service';

@Component({
  selector: 'app-moment-list',
  templateUrl: './moment-list.component.html',
  styleUrls: ['./moment-list.component.css']
})
export class MomentListComponent implements OnInit {
  public moments = [];

  constructor(
    public momentService: MomentService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.momentService.get('60a126eb5ef107321d5460c3')
      .subscribe(
        data => {
          console.log(data);
          
            this.moments = data;
        },
        error => {
        });
  }

  deleteMoment(id) {
    this.momentService.delete(id).subscribe(data => {
      this.momentService.get('60a126eb5ef107321d5460c3')
      .subscribe(
        data => {
          console.log(data);
          
            this.moments = data;
        },
        error => {
        });
      });    
  }

  editMoment(id) {
    this.router.navigate(['/moment/'+id]);
  }

}
