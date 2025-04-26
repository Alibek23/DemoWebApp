import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  standalone: true,
  template: `
    <div class="text-center mt-5">
      <h1 class="display-4">404</h1>
      <p class="lead">Page not found.</p>
    </div>
  `
})
export class NotFoundComponent {}