import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { PrimitiveElement } from '../../primitive-element.js';
import type { ContextMenuElement } from './context-menu.js';

/**
 * Context Menu Trigger Component
 * 
 * The area that opens the context menu on right-click.
 * 
 * @slot - Default slot for trigger content
 * 
 * @example
 * ```html
 * <wc-context-menu-trigger>
 *   <div>Right-click me</div>
 * </wc-context-menu-trigger>
 * ```
 */
@customElement('wc-context-menu-trigger')
export class ContextMenuTriggerElement extends PrimitiveElement {
  private _menu: ContextMenuElement | null = null;

  override connectedCallback() {
    super.connectedCallback();

    this._menu = this.closest('wc-context-menu');

    // Listen for context menu event (right-click)
    this.addEventListener('contextmenu', this._handleContextMenu);
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('contextmenu', this._handleContextMenu);
  }

  private _handleContextMenu = (event: MouseEvent) => {
    event.preventDefault();

    if (this._menu?.disabled) {
      return;
    }

    // Open menu at cursor position
    this._menu?.openMenuAt(event.clientX, event.clientY);
  };

  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-context-menu-trigger': ContextMenuTriggerElement;
  }
}
