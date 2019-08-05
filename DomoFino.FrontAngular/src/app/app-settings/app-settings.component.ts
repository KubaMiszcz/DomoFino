import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './app-settings.component.html',
  styleUrls: ['./app-settings.component.css']
})
export class AppSettingsComponent implements OnInit {
// images = [1, 2, 3].map(() => `https://picsum.photos/900/500?random&t=${Math.random()}`);
images = [1, 2, 3].map(() => `http://stupidstuff.org/kitten/kitten${Math.round(Math.ceil(Math.random() * 100)).toString().padStart(3, '0')}.jpg`);

  constructor() { }

  ngOnInit() {
  }

}