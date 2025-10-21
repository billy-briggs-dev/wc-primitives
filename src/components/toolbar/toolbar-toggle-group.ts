import { html, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PrimitiveElement } from '../../primitive-element.js';

/**
 * Toolbar Toggle Group Component
 * 
 * A set of two-state buttons that can be toggled on or off.
 * 
 * @fires value-change - Fires when the active toggle item(s) change
 * 
 * @slot - Default slot for toggle items
 * 
 * @example
 * ```html
 * <wc-toolbar>
 *   <wc-toolbar-toggle-group type="single" value="center">
 *     <wc-toolbar-toggle-item value="left">Left</wc-toolbar-toggle-item>
 *     <wc-toolbar-toggle-item value="center">Center</wc-toolbar-toggle-item>
 *     <wc-toolbar-toggle-item value="right">Right</wc-toolbar-toggle-item>
 *   </wc-toolbar-toggle-group>
 * </wc-toolbar>
 * ```
 */
@customElement('wc-toolbar-toggle-group')
export class ToolbarToggleGroupElement extends PrimitiveElement {
  /**
   * The type of toggle group.
   * - "single": Only one item can be active at a time (like radio buttons)
   * - "multiple": Multiple items can be active at once
   */
  @property({ type: String })
  type: 'single' | 'multiple' = 'single';

  /**
   * The controlled value(s) of the toggle group.
   * For single type: a single value string
   * For multiple type: comma-separated values
   */
  @property({ type: String })
  value = '';

  /**
   * When true, prevents the user from interacting with the toggle group.
   */
  @property({ type: Boolean })
  disabled = false;

  private _activeValues: Set<string> = new Set();

  override connectedCallback() {
    super.connectedCallback();
    
    this.setAttribute('role', 'group');
    
    // Initialize active values from the value property
    if (this.value) {
      this._activeValues = new Set(this.value.split(',').map(v => v.trim()).filter(Boolean));
    }
  }

  override updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);

    if (changedProperties.has('value')) {
      this._activeValues = new Set(this.value.split(',').map(v => v.trim()).filter(Boolean));
      // Schedule child updates in a microtask to avoid update-during-update warning
      queueMicrotask(() => this._updateChildComponents());
    }

    if (changedProperties.has('disabled')) {
      if (this.disabled) {
        this.setAttribute('data-disabled', '');
      } else {
        this.removeAttribute('data-disabled');
      }
      // Schedule child updates in a microtask to avoid update-during-update warning
      queueMicrotask(() => this._updateChildComponents());
    }
  }

  /**
   * Toggle an item's active state
   */
  toggleItem(itemValue: string) {
    if (this.disabled) return;

    if (this.type === 'single') {
      // Single mode: only one item can be active
      if (this._activeValues.has(itemValue)) {
        this._activeValues.clear();
      } else {
        this._activeValues.clear();
        this._activeValues.add(itemValue);
      }
    } else {
      // Multiple mode: toggle individual items
      if (this._activeValues.has(itemValue)) {
        this._activeValues.delete(itemValue);
      } else {
        this._activeValues.add(itemValue);
      }
    }

    this.value = Array.from(this._activeValues).join(',');
    this._notifyChange();
    // Don't call _updateChildComponents here - it will be called by updated() lifecycle
  }

  /**
   * Check if an item is active
   */
  isItemActive(itemValue: string): boolean {
    return this._activeValues.has(itemValue);
  }

  private _updateChildComponents() {
    const items = this.querySelectorAll('wc-toolbar-toggle-item');
    items.forEach((item) => {
      if ('requestUpdate' in item && typeof item.requestUpdate === 'function') {
        item.requestUpdate();
      }
    });
  }

  private _notifyChange() {
    this.dispatchCustomEvent('value-change', { value: this.value });
  }

  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-toolbar-toggle-group': ToolbarToggleGroupElement;
  }
}
