import { ElementRef, OnInit, Directive, Output, EventEmitter } from '@angular/core';
import { fromEvent } from 'rxjs';
import { distinctUntilChanged, tap, debounceTime } from 'rxjs/operators';

/**
 * Onka filter directive
 */
@Directive({
  selector: '[onkaFilter]',
})
export class OnkaFilterDirective implements OnInit {
  /**
   * Emit on keyup
   */
  @Output('onkaFilter') emitter = new EventEmitter();

  constructor(private el: ElementRef) {}

  ngOnInit() {
    fromEvent(this.el.nativeElement, 'keyup')
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        tap(() => this.emitter.emit(null)),
      )
      .subscribe();
  }
}
