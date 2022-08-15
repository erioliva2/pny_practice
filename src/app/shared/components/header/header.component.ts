import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() toggleSideBar: EventEmitter<any> = new EventEmitter();

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  public toggleSideBarClick(): void {
    this.toggleSideBar.emit();
  }

  onLogout(): void {
    this.authService.logout();
  }

}
