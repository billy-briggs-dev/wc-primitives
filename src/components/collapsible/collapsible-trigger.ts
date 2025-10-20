import { html, PropertyValues } from 'lit';
import { customElement } from 'lit/decorators.js';
import { PrimitiveElement } from '../../primitive-element.js';
import type { CollapsibleElement } from './collapsible.js';

/**
 * Collapsible Trigger Component
 * 
 * The button that toggles the collapsible.
 * 
 * @slot - Default slot for trigger content
 * 
 * @example
 * ```html
 * <wc-collapsible-trigger>
 *   Click to expand
 * </wc-collapsible-trigger>
 * ```
 */
@customElement('wc-collapsible-trigger')
export class CollapsibleTriggerElement extends PrimitiveElement {
  private _collapsible: CollapsibleElement | null = null;
  private _triggerId = '';

  override connectedCallback() {
    super.connectedCallback();

    this._collapsible = this.closest('wc-collapsible');
    this._triggerId = this.generateId('collapsible-trigger');

    // Set ARIA attributes
    this.setAttribute('role', 'button');
    this.setAttribute('type', 'button');
    this.setAttribute('id', this._triggerId);
    this.setAttribute('aria-expanded', this._collapsible?.open ? 'true' : 'false');
    this.setAttribute('data-state', this._collapsible?.open ? 'open' : 'closed');

    const disabled = this._collapsible?.disabled;
    if (disabled) {
      this.setAttribute('data-disabled', '');
      this.setAttribute('disabled', '');
    } else {
      this.setAttribute('tabindex', '0');
    }

    this.addEventListener('click', this._handleClick);
    this.addEventListener('keydown', this._handleKeyDown);

    // Listen for open changes
    this._collapsible?.addEventListener('open-change', this._handleOpenChange);
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('click', this._handleClick);
    this.removeEventListener('keydown', this._handleKeyDown);
    this._collapsible?.removeEventListener('open-change', this._handleOpenChange);
  }

  private _handleOpenChange = () => {
    this.requestUpdate();
  };

  override updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);

    // Update ARIA and data attributes based on state
    const isOpen = this._collapsible?.open ?? false;
    this.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    this.setAttribute('data-state', isOpen ? 'open' : 'closed');

    const disabled = this._collapsible?.disabled;
    if (disabled) {
      this.setAttribute('data-disabled', '');
      this.setAttribute('disabled', '');
      this.removeAttribute('tabindex');
    } else {
      this.removeAttribute('data-disabled');
      this.removeAttribute('disabled');
      this.setAttribute('tabindex', '0');
    }
  }

  private _handleClick = (event: Event) => {
    event.preventDefault();

    if (this._collapsible?.disabled) {
      return;
    }

    this._collapsible?.toggle();
  };

  private _handleKeyDown = (event: KeyboardEvent) => {
    if (this._collapsible?.disabled) {
      return;
    }

    // Trigger on Space or Enter
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      this._collapsible?.toggle();
    }
  };

  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-collapsible-trigger': CollapsibleTriggerElement;
  }
}
