import { html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { PrimitiveElement } from '../../primitive-element.js';

/**
 * Slider Thumb Component
 * 
 * The draggable thumb element.
 * 
 * @slot - Default slot for thumb content
 * 
 * @example
 * ```html
 * <wc-slider-thumb></wc-slider-thumb>
 * ```
 */
@customElement('wc-slider-thumb')
export class SliderThumbElement extends PrimitiveElement {
  @state()
  private _percentage = 0;

  override connectedCallback() {
    super.connectedCallback();
    this.setAttribute('data-slider-thumb', '');
    this.setAttribute('role', 'presentation');
    
    // Listen for value changes from parent slider
    this.addEventListener('slider-value-change', this._handleValueChange as EventListener);
    
    // Get initial value from parent
    this._updateFromParent();
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('slider-value-change', this._handleValueChange as EventListener);
  }

  private _handleValueChange = (e: CustomEvent) => {
    this._percentage = e.detail.percentage;
    this._updateStyle();
  };

  private _updateFromParent() {
    const slider = this.closest('wc-slider') as any;
    if (slider && typeof slider.getPercentage === 'function') {
      this._percentage = slider.getPercentage();
      this._updateStyle();
    }
  }

  private _updateStyle() {
    const orientation = this.closest('wc-slider')?.getAttribute('data-orientation') || 'horizontal';
    const inverted = this.closest('wc-slider')?.hasAttribute('inverted');
    
    if (orientation === 'horizontal') {
      const position = inverted ? 100 - this._percentage : this._percentage;
      this.style.left = `${position}%`;
    } else {
      const position = inverted ? this._percentage : 100 - this._percentage;
      this.style.bottom = `${position}%`;
    }
  }

  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-slider-thumb': SliderThumbElement;
  }
}
