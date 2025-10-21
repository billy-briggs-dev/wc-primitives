import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { PrimitiveElement } from '../../primitive-element.js';

/**
 * Scroll Area Viewport Component
 * 
 * The viewport containing the scrollable content.
 * 
 * @slot - Default slot for scrollable content
 * 
 * @example
 * ```html
 * <wc-scroll-area-viewport>
 *   <div>Scrollable content...</div>
 * </wc-scroll-area-viewport>
 * ```
 */
@customElement('wc-scroll-area-viewport')
export class ScrollAreaViewportElement extends PrimitiveElement {
  override connectedCallback() {
    super.connectedCallback();
    
    this.setAttribute('data-scroll-area-viewport', '');
    this.style.overflow = 'auto';
    
    this.addEventListener('scroll', this._handleScroll);
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('scroll', this._handleScroll);
  }

  private _handleScroll = () => {
    // Notify parent scroll area
    const scrollArea = this.closest('wc-scroll-area');
    if (scrollArea) {
      scrollArea.dispatchEvent(
        new CustomEvent('scroll-area-scroll', {
          bubbles: true,
          composed: true,
        })
      );
    }

    // Update scrollbar positions
    this._updateScrollbars();
  };

  private _updateScrollbars() {
    const scrollArea = this.closest('wc-scroll-area');
    if (!scrollArea) return;

    const scrollbars = scrollArea.querySelectorAll('wc-scroll-area-scrollbar');
    scrollbars.forEach(scrollbar => {
      const orientation = scrollbar.getAttribute('orientation') || 'vertical';
      
      if (orientation === 'vertical') {
        const scrollPercentage = this.scrollTop / (this.scrollHeight - this.clientHeight || 1);
        scrollbar.setAttribute('data-scroll-percentage', String(scrollPercentage));
      } else {
        const scrollPercentage = this.scrollLeft / (this.scrollWidth - this.clientWidth || 1);
        scrollbar.setAttribute('data-scroll-percentage', String(scrollPercentage));
      }
    });
  }

  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-scroll-area-viewport': ScrollAreaViewportElement;
  }
}
