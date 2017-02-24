//script based on: https://github.com/CoderAjay/ng2Draggable under MIT license

import { Directive, ElementRef, Renderer, OnDestroy, OnInit } from '@angular/core';


@Directive({
  selector: '[fgDraggable]',
  host: {
    '(dragstart)': 'onDragStart($event)',
    '(dragend)': 'onDragEnd($event)',
    '(drag)': 'onDrag($event)'
  }
})
export class DraggableDirective implements OnDestroy, OnInit {
  private Δx: number = 0;
  private Δy: number = 0;
  private mustBePosition: Array<string> = ['absolute', 'fixed', 'relative'];
  private dragItem: HTMLElement = null;
  private isFireFox: boolean = false;
  constructor(
    private el: ElementRef, private renderer: Renderer
  ) {
    try {
      if (this.mustBePosition.indexOf(this.el.nativeElement.style.position) === -1) {
       console.warn(this.el.nativeElement, 'Must be having position attribute set to ' + this.mustBePosition.join('|'));
      }
    } catch (ex) {
      console.error(ex);
    }
  }
  public ngOnInit(): void {
    this.isFireFox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
    this.renderer.setElementAttribute(this.el.nativeElement, 'draggable', 'true');
  }
  onDragStart(event: DragEvent) {
    event.dataTransfer.setData('text', '');

    if(!this.isFireFox) {
      this.dragItem = event.target['cloneNode'](true);
      this.dragItem.style.visibility = "hidden";
      document.body.appendChild(this.dragItem);
      event.dataTransfer['setDragImage'](this.dragItem, 0, 0);

      this.Δx = event.x - this.el.nativeElement.offsetLeft;
      this.Δy = event.y - this.el.nativeElement.offsetTop;
    }else {
      this.Δx = event.screenX - this.el.nativeElement.offsetLeft;
      this.Δy = event.screenY - this.el.nativeElement.offsetTop;
    }
  }
  onDrag(event: DragEvent) {
    if(!this.isFireFox) {
      this.doTranslation(event.x, event.y);
    } else {
      this.doTranslation(event.screenX, event.screenY);
    }
  }
  onDragEnd(event: DragEvent) {
    if(this.isFireFox) {
      if (event.stopPropagation) {
        event.stopPropagation(); // Stops some browsers from redirecting.
      }
      this.doTranslation(event.screenX, event.screenY);
    }

    this.Δx = 0;
    this.Δy = 0;
    if(this.dragItem) {
      document.body.removeChild(this.dragItem);
    }
  }
  doTranslation(x: number, y: number) {
    if (!x || !y) return;
    this.renderer.setElementStyle(this.el.nativeElement, 'top', (y - this.Δy) + 'px');
    this.renderer.setElementStyle(this.el.nativeElement, 'left', (x - this.Δx) + 'px');
  }
  public ngOnDestroy(): void {
    this.renderer.setElementAttribute(this.el.nativeElement, 'draggable', 'false');
  }

}


