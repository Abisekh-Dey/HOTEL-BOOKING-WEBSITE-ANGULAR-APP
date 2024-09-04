import { Component,OnInit,HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-ecommerce';
  ngOnInit(): void {
    this.checkScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.checkScreenSize();
  }

  checkScreenSize(): void {
    const width: number = window.innerWidth;

    const content = document.getElementById('content') as HTMLElement | null;
    const sizeWarning = document.getElementById('size-warning') as HTMLElement | null;

    if (content && sizeWarning) {
      if (width > 1024 && width <= 1440) {
        content.style.display = 'block';
        sizeWarning.style.display = 'none';
      } else {
        content.style.display = 'none';
        sizeWarning.style.display = 'flex';
        sizeWarning.style.justifyContent = 'center';
        sizeWarning.style.alignItems = 'center';
        sizeWarning.style.textAlign = 'center';
        sizeWarning.style.color = 'wheat';
        sizeWarning.style.height = '100vh'
        // sizeWarning.style.marginTop = '50%';
        sizeWarning.style.margin = '0'
      }
    }
  }
}
