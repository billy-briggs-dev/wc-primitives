import { html, PropertyValues } from 'lit';
import { customElement } from 'lit/decorators.js';
import { PrimitiveElement } from '../../primitive-element.js';
import type { ProgressElement } from './progress.js';

/**
 * Progress Indicator Component
 * 
 * A visual indicator that shows the progress completion.
 * Must be used within a wc-progress component.
 * 
 * @example
 * ```html
 * <wc-progress value="50">
 *   <wc-progress-indicator />
 * </wc-progress>
 * ```
 */
@customElement('wc-progress-indicator')
export class ProgressIndicatorElement extends PrimitiveElement {
  private _progressRoot: ProgressElement | null = null;

  override connectedCallback() {
    super.connectedCallback();
    this._progressRoot = this.closest('wc-progress') as ProgressElement;
    this._updateState();
  }

  override updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);
    this._updateState();
  }

  private _updateState() {
    if (!this._progressRoot) return;

    const percentage = this._progressRoot.getPercentage();
    
    if (percentage === null) {
      // Indeterminate state
      this.setAttribute('data-state', 'indeterminate');
      this.removeAttribute('data-value');
      this.style.transform = '';
    } else {
      // Complete state with percentage
      this.setAttribute('data-state', 'complete');
      this.setAttribute('data-value', String(percentage));
      // Set transform for visual representation (consumers can use this for styling)
      this.style.transform = `translateX(-${100 - percentage}%)`;
    }
  }

  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-progress-indicator': ProgressIndicatorElement;
  }
}
