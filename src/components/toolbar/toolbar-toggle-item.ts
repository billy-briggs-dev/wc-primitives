import { html, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PrimitiveElement } from '../../primitive-element.js';
import type { ToolbarToggleGroupElement } from './toolbar-toggle-group.js';

/**
 * Toolbar Toggle Item Component
 * 
 * An individual toggle button within a toolbar toggle group.
 * 
 * @slot - Default slot for item content
 * 
 * @example
 * ```html
 * <wc-toolbar-toggle-group type="single">
 *   <wc-toolbar-toggle-item value="bold">Bold</wc-toolbar-toggle-item>
 *   <wc-toolbar-toggle-item value="italic">Italic</wc-toolbar-toggle-item>
 * </wc-toolbar-toggle-group>
 * ```
 */
@customElement('wc-toolbar-toggle-item')
export class ToolbarToggleItemElement extends PrimitiveElement {
  /**
   * The value of this toggle item.
   */
  @property({ type: String })
  value = '';

  /**
   * When true, prevents the user from interacting with the item.
   */
  @property({ type: Boolean })
  disabled = false;

  private _toggleGroup: ToolbarToggleGroupElement | null = null;

  override connectedCallback() {
    super.connectedCallback();
    
    this.setAttribute('role', 'button');
    this.setAttribute('type', 'button');
    
    if (!this.hasAttribute('tabindex')) {
      this.setAttribute('tabindex', '0');
    }

    // Find parent toggle group
    this._toggleGroup = this.closest('wc-toolbar-toggle-group');

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

    if (changedProperties.has('disabled') || changedProperties.has('value')) {
      this._updateState();
    }
  }

  private get _isPressed(): boolean {
    return this._toggleGroup?.isItemActive(this.value) ?? false;
  }

  private get _isDisabled(): boolean {
    return this.disabled || this._toggleGroup?.disabled || false;
  }

  private _handleClick = () => {
    if (this._isDisabled) return;
    this._toggleGroup?.toggleItem(this.value);
    this._updateState();
  };

  private _handleKeydown = (e: KeyboardEvent) => {
    if (this._isDisabled) return;
    
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this._toggleGroup?.toggleItem(this.value);
      this._updateState();
    }
  };

  private _updateState() {
    const isPressed = this._isPressed;
    const isDisabled = this._isDisabled;

    this.setAttribute('data-state', isPressed ? 'on' : 'off');
    this.setAttribute('aria-pressed', isPressed ? 'true' : 'false');

    if (isDisabled) {
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
    'wc-toolbar-toggle-item': ToolbarToggleItemElement;
  }
}
