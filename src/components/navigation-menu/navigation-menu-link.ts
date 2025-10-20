import { html, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PrimitiveElement } from '../../primitive-element.js';

/**
 * Navigation Menu Link Component
 * 
 * A navigational link within a navigation menu.
 * 
 * @slot - Default slot for link content
 * 
 * @example
 * ```html
 * <wc-navigation-menu-link href="/docs">Documentation</wc-navigation-menu-link>
 * ```
 */
@customElement('wc-navigation-menu-link')
export class NavigationMenuLinkElement extends PrimitiveElement {
  /**
   * The URL that the link points to.
   */
  @property({ type: String })
  href = '';

  /**
   * When true, prevents the user from interacting with the link.
   */
  @property({ type: Boolean })
  disabled = false;

  /**
   * Specifies where to open the linked document.
   */
  @property({ type: String })
  target = '';

  override connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'link');
    this._updateState();
  }

  override updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);
    this._updateState();
  }

  private _updateState() {
    if (this.disabled) {
      this.setAttribute('data-disabled', '');
      this.setAttribute('aria-disabled', 'true');
      this.setAttribute('tabindex', '-1');
    } else {
      this.removeAttribute('data-disabled');
      this.removeAttribute('aria-disabled');
      if (!this.hasAttribute('tabindex')) {
        this.setAttribute('tabindex', '0');
      }
    }

    if (this.href) {
      this.setAttribute('data-href', this.href);
    }
  }

  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-navigation-menu-link': NavigationMenuLinkElement;
  }
}
