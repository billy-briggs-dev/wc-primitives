import { LitElement } from 'lit';

/**
 * Base class for all primitive components.
 * Provides common functionality and ensures headless component design.
 * 
 * Key principles:
 * - No default styling (headless)
 * - Framework agnostic
 * - Accessible by default
 * - Composable
 */
export class PrimitiveElement extends LitElement {
  /**
   * Disable shadow DOM to allow full styling control from the outside.
   * This is crucial for headless components as it allows consumers
   * to style components without fighting shadow DOM encapsulation.
   */
  protected override createRenderRoot() {
    return this;
  }

  /**
   * Helper to generate unique IDs for accessibility
   */
  protected generateId(prefix: string): string {
    return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Helper to dispatch custom events with proper type safety
   */
  protected dispatchCustomEvent<T = unknown>(
    eventName: string,
    detail?: T,
    options?: CustomEventInit
  ): boolean {
    return this.dispatchEvent(
      new CustomEvent(eventName, {
        detail,
        bubbles: true,
        composed: true,
        cancelable: true,
        ...options,
      })
    );
  }
}
