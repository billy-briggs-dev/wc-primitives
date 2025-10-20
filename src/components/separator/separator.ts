import { html, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PrimitiveElement } from '../../primitive-element.js';

/**
 * Separator Component
 * 
 * Visually or semantically separates content.
 * 
 * @example
 * ```html
 * <div>Content above</div>
 * <wc-separator></wc-separator>
 * <div>Content below</div>
 * ```
 */
@customElement('wc-separator')
export class SeparatorElement extends PrimitiveElement {
  /**
   * The orientation of the separator.
   */
  @property({ type: String })
  orientation: 'horizontal' | 'vertical' = 'horizontal';

  /**
   * Whether or not the separator is purely decorative.
   * When true, accessibility features are adjusted accordingly.
   */
  @property({ type: Boolean })
  decorative = false;

  override connectedCallback() {
    super.connectedCallback();
    
    // Set role based on decorative property
    if (this.decorative) {
      this.setAttribute('role', 'none');
    } else {
      this.setAttribute('role', 'separator');
    }
    
    this._updateOrientation();
  }

  override updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);

    if (changedProperties.has('orientation')) {
      this._updateOrientation();
    }

    if (changedProperties.has('decorative')) {
      if (this.decorative) {
        this.setAttribute('role', 'none');
        this.removeAttribute('aria-orientation');
      } else {
        this.setAttribute('role', 'separator');
        this._updateOrientation();
      }
    }
  }

  private _updateOrientation() {
    this.setAttribute('data-orientation', this.orientation);
    
    // Only set aria-orientation if not decorative
    if (!this.decorative) {
      if (this.orientation === 'vertical') {
        this.setAttribute('aria-orientation', 'vertical');
      } else {
        // Horizontal is the default, so we can omit it
        this.removeAttribute('aria-orientation');
      }
    }
  }

  override render() {
    return html``;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-separator': SeparatorElement;
  }
}
