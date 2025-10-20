import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PrimitiveElement } from '../../primitive-element.js';
import type { TabsElement } from './tabs.js';

/**
 * Tabs Content Component
 * 
 * Contains the content associated with a tab.
 * 
 * @slot - Default slot for content
 * 
 * @example
 * ```html
 * <wc-tabs-content value="tab1">
 *   Content for tab 1
 * </wc-tabs-content>
 * ```
 */
@customElement('wc-tabs-content')
export class TabsContentElement extends PrimitiveElement {
  @property({ type: String })
  value = '';

  private _tabs: TabsElement | null = null;

  override connectedCallback() {
    super.connectedCallback();
    this._tabs = this.closest('wc-tabs');

    this.setAttribute('role', 'tabpanel');
    this.setAttribute('tabindex', '0');

    this._updateState();
  }

  private _updateState() {
    if (!this._tabs) return;

    const isActive = this._tabs.isTabActive(this.value);

    this.setAttribute('data-state', isActive ? 'active' : 'inactive');

    // Hide/show content based on active state
    if (isActive) {
      this.style.display = '';
    } else {
      this.style.display = 'none';
    }
  }

  override updated() {
    this._updateState();
  }

  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-tabs-content': TabsContentElement;
  }
}
