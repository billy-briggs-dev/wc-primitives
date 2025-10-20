import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { PrimitiveElement } from '../../primitive-element.js';

/**
 * Slider Track Component
 * 
 * The track that contains the range and thumb.
 * 
 * @slot - Default slot for range and thumb
 * 
 * @example
 * ```html
 * <wc-slider-track>
 *   <wc-slider-range></wc-slider-range>
 * </wc-slider-track>
 * ```
 */
@customElement('wc-slider-track')
export class SliderTrackElement extends PrimitiveElement {
  override connectedCallback() {
    super.connectedCallback();
    this.setAttribute('data-slider-track', '');
  }

  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-slider-track': SliderTrackElement;
  }
}
