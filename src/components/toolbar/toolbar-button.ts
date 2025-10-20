import { html, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PrimitiveElement } from '../../primitive-element.js';

/**
 * Toolbar Button Component
 * 
 * A button element within a toolbar.
 * 
 * @slot - Default slot for button content
 * 
 * @example
 * ```html
 * <wc-toolbar>
 *   <wc-toolbar-button>Cut</wc-toolbar-button>
 *   <wc-toolbar-button>Copy</wc-toolbar-button>
 * </wc-toolbar>
 * ```
 */
@customElement('wc-toolbar-button')
export class ToolbarButtonElement extends PrimitiveElement {
  /**
   * When true, prevents the user from interacting with the button.
   */
  @property({ type: Boolean })
  disabled = false;

  override connectedCallback() {
    super.connectedCallback();
    
    this.setAttribute('role', 'button');
    this.setAttribute('type', 'button');
    
    if (!this.hasAttribute('tabindex')) {
      this.setAttribute('tabindex', '0');
    }

    // Add event listeners
    this.addEventListener('click', this._handleClick);
    this.addEventListener('keydown', this._handleKeydown);

    this._updateState();
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('click', this._handleClick);
    this.removeEventListener('keydown', this._handleKeydown);
  }

  override updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);

    if (changedProperties.has('disabled')) {
      this._updateState();
    }
  }

  private _handleClick = (e: MouseEvent) => {
    if (this.disabled) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  private _handleKeydown = (e: KeyboardEvent) => {
    if (this.disabled) return;
    
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.click();
    }
  };

  private _updateState() {
    if (this.disabled) {
      this.setAttribute('data-disabled', '');
      this.setAttribute('aria-disabled', 'true');
      this.setAttribute('tabindex', '-1');
    } else {
      this.removeAttribute('data-disabled');
      this.removeAttribute('aria-disabled');
    }
  }

  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-toolbar-button': ToolbarButtonElement;
  }
}
