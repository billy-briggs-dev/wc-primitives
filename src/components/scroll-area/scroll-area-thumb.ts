import { html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { PrimitiveElement } from '../../primitive-element.js';

/**
 * Scroll Area Thumb Component
 * 
 * The draggable thumb of the scrollbar.
 * 
 * @example
 * ```html
 * <wc-scroll-area-thumb></wc-scroll-area-thumb>
 * ```
 */
@customElement('wc-scroll-area-thumb')
export class ScrollAreaThumbElement extends PrimitiveElement {
  @state()
  private _isDragging = false;

  private _startPos = 0;
  private _startScroll = 0;

  override connectedCallback() {
    super.connectedCallback();
    
    this.setAttribute('data-scroll-area-thumb', '');
    this.setAttribute('data-state', 'visible');
    
    this.addEventListener('mousedown', this._handleMouseDown);
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('mousedown', this._handleMouseDown);
    this._cleanup();
  }

  private _handleMouseDown = (e: MouseEvent) => {
    e.preventDefault();
    
    this._isDragging = true;
    this.setAttribute('data-state', 'dragging');
    
    const scrollbar = this.closest('wc-scroll-area-scrollbar');
    const orientation = scrollbar?.getAttribute('orientation') || 'vertical';
    
    this._startPos = orientation === 'vertical' ? e.clientY : e.clientX;
    
    const scrollArea = this.closest('wc-scroll-area');
    const viewport = scrollArea?.querySelector('wc-scroll-area-viewport') as HTMLElement;
    
    if (viewport) {
      this._startScroll = orientation === 'vertical' ? viewport.scrollTop : viewport.scrollLeft;
    }
    
    document.addEventListener('mousemove', this._handleMouseMove);
    document.addEventListener('mouseup', this._handleMouseUp);
  };

  private _handleMouseMove = (e: MouseEvent) => {
    if (!this._isDragging) return;
    
    const scrollbar = this.closest('wc-scroll-area-scrollbar');
    const scrollArea = this.closest('wc-scroll-area');
    const viewport = scrollArea?.querySelector('wc-scroll-area-viewport') as HTMLElement;
    
    if (!scrollbar || !viewport) return;
    
    const orientation = scrollbar.getAttribute('orientation') || 'vertical';
    const scrollbarRect = scrollbar.getBoundingClientRect();
    
    if (orientation === 'vertical') {
      const deltaY = e.clientY - this._startPos;
      const scrollbarHeight = scrollbarRect.height;
      const scrollRatio = (viewport.scrollHeight - viewport.clientHeight) / scrollbarHeight;
      viewport.scrollTop = this._startScroll + (deltaY * scrollRatio);
    } else {
      const deltaX = e.clientX - this._startPos;
      const scrollbarWidth = scrollbarRect.width;
      const scrollRatio = (viewport.scrollWidth - viewport.clientWidth) / scrollbarWidth;
      viewport.scrollLeft = this._startScroll + (deltaX * scrollRatio);
    }
  };

  private _handleMouseUp = () => {
    this._isDragging = false;
    this.setAttribute('data-state', 'visible');
    this._cleanup();
  };

  private _cleanup() {
    document.removeEventListener('mousemove', this._handleMouseMove);
    document.removeEventListener('mouseup', this._handleMouseUp);
  }

  override render() {
    return html``;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-scroll-area-thumb': ScrollAreaThumbElement;
  }
}
