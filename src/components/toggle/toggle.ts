import { html, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PrimitiveElement } from '../../primitive-element.js';

/**
 * Toggle Component
 * 
 * A two-state button that can be toggled on or off.
 * 
 * @fires pressed-change - Fires when the pressed state changes
 * 
 * @slot - Default slot for toggle content
 * 
 * @example
 * ```html
 * <wc-toggle pressed>Toggle me</wc-toggle>
 * ```
 */
@customElement('wc-toggle')
export class ToggleElement extends PrimitiveElement {
  /**
   * The pressed state of the toggle.
   */
  @property({ type: Boolean, reflect: true })
  pressed = false;

  /**
   * When true, prevents the user from interacting with the toggle.
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

    if (changedProperties.has('pressed') || changedProperties.has('disabled')) {
      this._updateState();
      if (changedProperties.has('pressed')) {
        this._notifyChange();
      }
    }
  }

  /**
   * Toggle the pressed state
   */
  toggle() {
    if (this.disabled) return;
    this.pressed = !this.pressed;
  }

  private _handleClick = () => {
    this.toggle();
  };

  private _handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.toggle();
    }
  };

  private _updateState() {
    this.setAttribute('data-state', this.pressed ? 'on' : 'off');
    this.setAttribute('aria-pressed', this.pressed ? 'true' : 'false');

    if (this.disabled) {
      this.setAttribute('data-disabled', '');
      this.setAttribute('aria-disabled', 'true');
      this.setAttribute('tabindex', '-1');
    } else {
      this.removeAttribute('data-disabled');
      this.removeAttribute('aria-disabled');
      this.setAttribute('tabindex', '0');
    }
  }

  private _notifyChange() {
    this.dispatchCustomEvent('pressed-change', { pressed: this.pressed });
  }

  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-toggle': ToggleElement;
  }
}
