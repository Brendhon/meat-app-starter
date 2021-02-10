import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class NotificationService {

  notifier = new EventEmitter<any>()

  constructor() {}

  notify(message: string, add: boolean){
    this.notifier.emit({message, add})
  }

}
