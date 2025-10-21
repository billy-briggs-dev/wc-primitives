import { html, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { PrimitiveElement } from '../../primitive-element.js';

/**
 * Scroll Area Root Component
 * 
 * A scrollable area with custom scrollbars.
 * 
 * @fires scroll - Fires when the viewport is scrolled
 * 
 * @slot - Default slot for viewport content
 * 
 * @example
 * ```html
 * <wc-scroll-area>
 *   <wc-scroll-area-viewport>
 *     <div>Scrollable content...</div>
 *   </wc-scroll-area-viewport>
 *   <wc-scroll-area-scrollbar orientation="vertical">
 *     <wc-scroll-area-thumb></wc-scroll-area-thumb>
 *   </wc-scroll-area-scrollbar>
 *   <wc-scroll-area-scrollbar orientation="horizontal">
 *     <wc-scroll-area-thumb></wc-scroll-area-thumb>
 *   </wc-scroll-area-scrollbar>
 *   <wc-scroll-area-corner></wc-scroll-area-corner>
 * </wc-scroll-area>
 * ```
 */
@customElement('wc-scroll-area')
export class ScrollAreaElement extends PrimitiveElement {
  /**
   * The type of scrollbar to display.
   * - 'auto': Show scrollbars when content overflows
   * - 'always': Always show scrollbars
   * - 'scroll': Show scrollbars when hovering
   * - 'hover': Show scrollbars on hover
   */
  @property({ type: String })
  type: 'auto' | 'always' | 'scroll' | 'hover' = 'hover';

  /**
   * The scroll hide delay in milliseconds (for hover type).
   */
  @property({ type: Number, attribute: 'scroll-hide-delay' })
  scrollHideDelay = 600;

  @state()
  private _isScrolling = false;

  @state()
  private _isHovering = false;

  private _scrollTimeout?: number;
  private _hoverTimeout?: number;

  override connectedCallback() {
    super.connectedCallback();
    this.setAttribute('data-scroll-area-root', '');
    
    // Listen for scroll events from viewport
    this.addEventListener('scroll-area-scroll', this._handleScroll as EventListener);
    this.addEventListener('mouseenter', this._handleMouseEnter);
    this.addEventListener('mouseleave', this._handleMouseLeave);
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('scroll-area-scroll', this._handleScroll as EventListener);
    this.removeEventListener('mouseenter', this._handleMouseEnter);
    this.removeEventListener('mouseleave', this._handleMouseLeave);
    
    if (this._scrollTimeout) {
      window.clearTimeout(this._scrollTimeout);
    }
    if (this._hoverTimeout) {
      window.clearTimeout(this._hoverTimeout);
    }
  }

  override updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);

    if (changedProperties.has('type')) {
      this.setAttribute('data-type', this.type);
    }

    // Update scrollbar visibility based on state
    this._updateScrollbarVisibility();
  }

  private _handleScroll = () => {
    this._isScrolling = true;
    this.setAttribute('data-scrolling', '');

    if (this._scrollTimeout) {
      window.clearTimeout(this._scrollTimeout);
    }

    if (this.type === 'hover' || this.type === 'scroll') {
      this._scrollTimeout = window.setTimeout(() => {
        this._isScrolling = false;
        this.removeAttribute('data-scrolling');
        this.requestUpdate();
      }, this.scrollHideDelay);
    }

    this.dispatchCustomEvent('scroll');
  };

  private _handleMouseEnter = () => {
    if (this.type === 'hover') {
      this._isHovering = true;
      this.setAttribute('data-hovering', '');
      
      if (this._hoverTimeout) {
        window.clearTimeout(this._hoverTimeout);
      }
    }
  };

  private _handleMouseLeave = () => {
    if (this.type === 'hover') {
      this._hoverTimeout = window.setTimeout(() => {
        this._isHovering = false;
        this.removeAttribute('data-hovering');
        this.requestUpdate();
      }, this.scrollHideDelay);
    }
  };

  private _updateScrollbarVisibility() {
    const scrollbars = this.querySelectorAll('wc-scroll-area-scrollbar');
    scrollbars.forEach(scrollbar => {
      const shouldShow = 
        this.type === 'always' ||
        (this.type === 'hover' && (this._isHovering || this._isScrolling)) ||
        (this.type === 'scroll' && this._isScrolling) ||
        this.type === 'auto';
      
      if (shouldShow) {
        scrollbar.setAttribute('data-state', 'visible');
      } else {
        scrollbar.setAttribute('data-state', 'hidden');
      }
    });
  }

  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-scroll-area': ScrollAreaElement;
  }
}
