import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ToastService {
  toastState = new Subject<{ show: boolean, message: string, type: 'success' | 'error' | 'warning' | 'info', duration: number }>();

  show(message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info', duration: number = 5000) {
    this.toastState.next({ show: true, message, type, duration });
  }

  hide() {
    this.toastState.next({ show: false, message: '', type: 'info', duration: 5000 });
  }
}
