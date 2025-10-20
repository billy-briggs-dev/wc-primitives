import { html, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PrimitiveElement } from '../../primitive-element.js';

/**
 * Scroll Area Scrollbar Component
 * 
 * A custom scrollbar for the scroll area.
 * 
 * @slot - Default slot for the thumb
 * 
 * @example
 * ```html
 * <wc-scroll-area-scrollbar orientation="vertical">
 *   <wc-scroll-area-thumb></wc-scroll-area-thumb>
 * </wc-scroll-area-scrollbar>
 * ```
 */
@customElement('wc-scroll-area-scrollbar')
export class ScrollAreaScrollbarElement extends PrimitiveElement {
  /**
   * The orientation of the scrollbar.
   */
  @property({ type: String })
  orientation: 'horizontal' | 'vertical' = 'vertical';

  override connectedCallback() {
    super.connectedCallback();
    
    this.setAttribute('data-scroll-area-scrollbar', '');
    this.setAttribute('data-orientation', this.orientation);
    
    // Add click handler for clicking on scrollbar track
    this.addEventListener('click', this._handleClick);
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('click', this._handleClick);
  }

  override updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);

    if (changedProperties.has('orientation')) {
      this.setAttribute('data-orientation', this.orientation);
    }
  }

  private _handleClick = (e: MouseEvent) => {
    // If clicked on the scrollbar itself (not the thumb), jump to that position
    if (e.target === this) {
      const scrollArea = this.closest('wc-scroll-area');
      const viewport = scrollArea?.querySelector('wc-scroll-area-viewport') as HTMLElement;
      
      if (!viewport) return;

      const rect = this.getBoundingClientRect();
      
      if (this.orientation === 'vertical') {
        const clickY = e.clientY - rect.top;
        const percentage = clickY / rect.height;
        viewport.scrollTop = percentage * (viewport.scrollHeight - viewport.clientHeight);
      } else {
        const clickX = e.clientX - rect.left;
        const percentage = clickX / rect.width;
        viewport.scrollLeft = percentage * (viewport.scrollWidth - viewport.clientWidth);
      }
    }
  };

  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-scroll-area-scrollbar': ScrollAreaScrollbarElement;
  }
}
