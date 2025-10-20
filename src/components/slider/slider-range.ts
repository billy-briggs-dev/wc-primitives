import { html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { PrimitiveElement } from '../../primitive-element.js';

/**
 * Slider Range Component
 * 
 * The range (filled portion) of the slider.
 * 
 * @example
 * ```html
 * <wc-slider-range></wc-slider-range>
 * ```
 */
@customElement('wc-slider-range')
export class SliderRangeElement extends PrimitiveElement {
  @state()
  private _percentage = 0;

  override connectedCallback() {
    super.connectedCallback();
    this.setAttribute('data-slider-range', '');
    
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
    
    if (orientation === 'horizontal') {
      this.style.width = `${this._percentage}%`;
    } else {
      this.style.height = `${this._percentage}%`;
    }
  }

  override render() {
    return html``;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-slider-range': SliderRangeElement;
  }
}
