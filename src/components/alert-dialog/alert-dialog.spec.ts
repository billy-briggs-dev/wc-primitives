import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import './alert-dialog.js';
import './alert-dialog-trigger.js';
import './alert-dialog-portal.js';
import './alert-dialog-overlay.js';
import './alert-dialog-content.js';
import './alert-dialog-title.js';
import './alert-dialog-description.js';
import './alert-dialog-action.js';
import './alert-dialog-cancel.js';
import type { AlertDialogElement } from './alert-dialog.js';

describe('AlertDialog Component', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  it('should render alert dialog element', () => {
    container.innerHTML = `
      <wc-alert-dialog>
        <wc-alert-dialog-trigger>Delete</wc-alert-dialog-trigger>
        <wc-alert-dialog-portal>
          <wc-alert-dialog-overlay></wc-alert-dialog-overlay>
          <wc-alert-dialog-content>
            <wc-alert-dialog-title>Are you sure?</wc-alert-dialog-title>
            <wc-alert-dialog-description>This cannot be undone.</wc-alert-dialog-description>
            <wc-alert-dialog-cancel>Cancel</wc-alert-dialog-cancel>
            <wc-alert-dialog-action>Delete</wc-alert-dialog-action>
          </wc-alert-dialog-content>
        </wc-alert-dialog-portal>
      </wc-alert-dialog>
    `;

    const alertDialog = container.querySelector('wc-alert-dialog') as AlertDialogElement;
    expect(alertDialog).toBeDefined();
    expect(alertDialog.tagName.toLowerCase()).toBe('wc-alert-dialog');
  });

  it('should have correct default properties', () => {
    const alertDialog = document.createElement('wc-alert-dialog') as AlertDialogElement;
    container.appendChild(alertDialog);

    expect(alertDialog.open).toBe(false);
    expect(alertDialog.disabled).toBe(false);
  });

  it('should set role to alertdialog on content', async () => {
    container.innerHTML = `
      <wc-alert-dialog>
        <wc-alert-dialog-trigger>Delete</wc-alert-dialog-trigger>
        <wc-alert-dialog-portal>
          <wc-alert-dialog-overlay></wc-alert-dialog-overlay>
          <wc-alert-dialog-content>
            <wc-alert-dialog-title>Title</wc-alert-dialog-title>
          </wc-alert-dialog-content>
        </wc-alert-dialog-portal>
      </wc-alert-dialog>
    `;

    await new Promise(resolve => setTimeout(resolve, 100));

    const content = container.querySelector('wc-alert-dialog-content');

    expect(content?.getAttribute('role')).toBe('alertdialog');
  });

  it('should set aria attributes on content', async () => {
    container.innerHTML = `
      <wc-alert-dialog>
        <wc-alert-dialog-trigger>Delete</wc-alert-dialog-trigger>
        <wc-alert-dialog-portal>
          <wc-alert-dialog-overlay></wc-alert-dialog-overlay>
          <wc-alert-dialog-content>
            <wc-alert-dialog-title>Title</wc-alert-dialog-title>
            <wc-alert-dialog-description>Description</wc-alert-dialog-description>
          </wc-alert-dialog-content>
        </wc-alert-dialog-portal>
      </wc-alert-dialog>
    `;

    await new Promise(resolve => setTimeout(resolve, 100));

    const content = container.querySelector('wc-alert-dialog-content');

    expect(content?.getAttribute('aria-modal')).toBe('true');
    expect(content?.hasAttribute('aria-labelledby')).toBe(true);
    expect(content?.hasAttribute('aria-describedby')).toBe(true);
  });

  it('should open dialog on trigger click', async () => {
    container.innerHTML = `
      <wc-alert-dialog>
        <wc-alert-dialog-trigger>Delete</wc-alert-dialog-trigger>
        <wc-alert-dialog-portal>
          <wc-alert-dialog-overlay></wc-alert-dialog-overlay>
          <wc-alert-dialog-content>
            <wc-alert-dialog-title>Title</wc-alert-dialog-title>
          </wc-alert-dialog-content>
        </wc-alert-dialog-portal>
      </wc-alert-dialog>
    `;

    await new Promise(resolve => setTimeout(resolve, 100));

    const alertDialog = container.querySelector('wc-alert-dialog') as AlertDialogElement;
    const trigger = container.querySelector('wc-alert-dialog-trigger') as HTMLElement;

    expect(alertDialog.open).toBe(false);

    trigger.click();
    await new Promise(resolve => setTimeout(resolve, 50));

    expect(alertDialog.open).toBe(true);
  });

  it('should close dialog on cancel button click', async () => {
    container.innerHTML = `
      <wc-alert-dialog>
        <wc-alert-dialog-trigger>Delete</wc-alert-dialog-trigger>
        <wc-alert-dialog-portal>
          <wc-alert-dialog-overlay></wc-alert-dialog-overlay>
          <wc-alert-dialog-content>
            <wc-alert-dialog-title>Title</wc-alert-dialog-title>
            <wc-alert-dialog-cancel>Cancel</wc-alert-dialog-cancel>
          </wc-alert-dialog-content>
        </wc-alert-dialog-portal>
      </wc-alert-dialog>
    `;

    await new Promise(resolve => setTimeout(resolve, 100));

    const alertDialog = container.querySelector('wc-alert-dialog') as AlertDialogElement;
    const trigger = container.querySelector('wc-alert-dialog-trigger') as HTMLElement;
    const cancel = container.querySelector('wc-alert-dialog-cancel') as HTMLElement;

    trigger.click();
    await new Promise(resolve => setTimeout(resolve, 50));

    expect(alertDialog.open).toBe(true);

    cancel.click();
    await new Promise(resolve => setTimeout(resolve, 50));

    expect(alertDialog.open).toBe(false);
  });

  it('should close dialog on action button click', async () => {
    container.innerHTML = `
      <wc-alert-dialog>
        <wc-alert-dialog-trigger>Delete</wc-alert-dialog-trigger>
        <wc-alert-dialog-portal>
          <wc-alert-dialog-overlay></wc-alert-dialog-overlay>
          <wc-alert-dialog-content>
            <wc-alert-dialog-title>Title</wc-alert-dialog-title>
            <wc-alert-dialog-action>Delete</wc-alert-dialog-action>
          </wc-alert-dialog-content>
        </wc-alert-dialog-portal>
      </wc-alert-dialog>
    `;

    await new Promise(resolve => setTimeout(resolve, 100));

    const alertDialog = container.querySelector('wc-alert-dialog') as AlertDialogElement;
    const trigger = container.querySelector('wc-alert-dialog-trigger') as HTMLElement;
    const action = container.querySelector('wc-alert-dialog-action') as HTMLElement;

    trigger.click();
    await new Promise(resolve => setTimeout(resolve, 50));

    expect(alertDialog.open).toBe(true);

    action.click();
    await new Promise(resolve => setTimeout(resolve, 50));

    expect(alertDialog.open).toBe(false);
  });

  it('should respect disabled state', async () => {
    container.innerHTML = `
      <wc-alert-dialog disabled>
        <wc-alert-dialog-trigger>Delete</wc-alert-dialog-trigger>
        <wc-alert-dialog-portal>
          <wc-alert-dialog-overlay></wc-alert-dialog-overlay>
          <wc-alert-dialog-content>
            <wc-alert-dialog-title>Title</wc-alert-dialog-title>
          </wc-alert-dialog-content>
        </wc-alert-dialog-portal>
      </wc-alert-dialog>
    `;

    await new Promise(resolve => setTimeout(resolve, 100));

    const alertDialog = container.querySelector('wc-alert-dialog') as AlertDialogElement;
    const trigger = container.querySelector('wc-alert-dialog-trigger') as HTMLElement;

    expect(alertDialog.open).toBe(false);

    trigger.click();
    await new Promise(resolve => setTimeout(resolve, 50));

    expect(alertDialog.open).toBe(false);
  });

  it('should dispatch open-change event', async () => {
    container.innerHTML = `
      <wc-alert-dialog>
        <wc-alert-dialog-trigger>Delete</wc-alert-dialog-trigger>
        <wc-alert-dialog-portal>
          <wc-alert-dialog-overlay></wc-alert-dialog-overlay>
          <wc-alert-dialog-content>
            <wc-alert-dialog-title>Title</wc-alert-dialog-title>
          </wc-alert-dialog-content>
        </wc-alert-dialog-portal>
      </wc-alert-dialog>
    `;

    await new Promise(resolve => setTimeout(resolve, 100));

    const alertDialog = container.querySelector('wc-alert-dialog') as AlertDialogElement;
    const trigger = container.querySelector('wc-alert-dialog-trigger') as HTMLElement;

    let eventFired = false;
    let eventDetail: unknown = null;

    alertDialog.addEventListener('open-change', ((e: CustomEvent) => {
      eventFired = true;
      eventDetail = e.detail;
    }) as EventListener);

    trigger.click();
    await new Promise(resolve => setTimeout(resolve, 50));

    expect(eventFired).toBe(true);
    expect(eventDetail).toEqual({ open: true });
  });

  it('should set data-state attribute', async () => {
    container.innerHTML = `
      <wc-alert-dialog>
        <wc-alert-dialog-trigger>Delete</wc-alert-dialog-trigger>
        <wc-alert-dialog-portal>
          <wc-alert-dialog-overlay></wc-alert-dialog-overlay>
          <wc-alert-dialog-content>
            <wc-alert-dialog-title>Title</wc-alert-dialog-title>
          </wc-alert-dialog-content>
        </wc-alert-dialog-portal>
      </wc-alert-dialog>
    `;

    await new Promise(resolve => setTimeout(resolve, 100));

    const alertDialog = container.querySelector('wc-alert-dialog') as AlertDialogElement;
    const trigger = container.querySelector('wc-alert-dialog-trigger') as HTMLElement;

    expect(alertDialog.getAttribute('data-state')).toBe('closed');

    trigger.click();
    await new Promise(resolve => setTimeout(resolve, 50));

    expect(alertDialog.getAttribute('data-state')).toBe('open');
  });
});
