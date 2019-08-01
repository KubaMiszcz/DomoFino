import { IParagon, } from 'src/app/models/paragon';
import { Component, OnInit } from '@angular/core';
import { ParagonService } from 'src/app/services/paragon.service';
import { AppUserService } from 'src/app/services/app-user.service';

@Component({
  selector: 'app-recent-paragons-list',
  templateUrl: './recent-paragons-list.component.html',
  styleUrls: ['./recent-paragons-list.component.css']
})
export class RecentParagonsListComponent implements OnInit {
  recentParagonsList: IParagon[];

  constructor(
    private _ParagonService: ParagonService,
    private _AppUserService: AppUserService
  ) {

  }

  ngOnInit() {
    this.recentParagonsList = this._ParagonService.paragonHistory;

    this._ParagonService.paragonHistoryEmitter.subscribe(data => this.recentParagonsList = data);
    this._ParagonService.getParagonHistory();

    console.log(this.recentParagonsList);
  }

  onSort(val: any) { }
}
