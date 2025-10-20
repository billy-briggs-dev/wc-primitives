import { html, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PrimitiveElement } from '../primitive-element.js';

/**
 * Direction value type
 */
export type Direction = 'ltr' | 'rtl';

/**
 * Direction Provider Component
 * 
 * Provides text direction context (LTR/RTL) to descendant components.
 * Sets the dir attribute on itself and can be queried by child components.
 * 
 * @slot - Default slot for content that needs direction context
 * 
 * @example
 * ```html
 * <wc-direction-provider dir="rtl">
 *   <div>Content with RTL direction</div>
 * </wc-direction-provider>
 * ```
 */
@customElement('wc-direction-provider')
export class DirectionProviderElement extends PrimitiveElement {
  /**
   * The text direction for the content
   */
  @property({ type: String, reflect: true })
  dir: Direction = 'ltr';

  override connectedCallback() {
    super.connectedCallback();
    this._applyDirection();
  }

  override updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);
    
    if (changedProperties.has('dir')) {
      this._applyDirection();
    }
  }

  private _applyDirection() {
    // The dir attribute is already synced via reflect: true
    // Dispatch event to notify children of direction change
    this.dispatchCustomEvent('direction-change', { dir: this.dir });
  }

  /**
   * Get the current direction
   */
  getDirection(): Direction {
    return this.dir;
  }

  override render() {
    return html`<slot></slot>`;
  }
}

/**
 * Helper function to get the direction from the nearest direction provider
 * @param element - The element to search from
 * @returns The direction value, defaulting to 'ltr'
 */
export function getDirection(element: Element): Direction {
  const provider = element.closest('wc-direction-provider') as DirectionProviderElement | null;
  if (provider) {
    return provider.getDirection();
  }
  
  // Check for dir attribute on the element or ancestors
  let current: Element | null = element;
  while (current) {
    const dir = current.getAttribute('dir');
    if (dir === 'rtl' || dir === 'ltr') {
      return dir as Direction;
    }
    current = current.parentElement;
  }
  
  // Default to ltr
  return 'ltr';
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-direction-provider': DirectionProviderElement;
  }
}
