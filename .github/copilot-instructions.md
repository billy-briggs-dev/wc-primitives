# GitHub Copilot Instructions for WC Primitives

## Repository Overview

This repository contains **WC Primitives** - a collection of headless Web Component primitives built with Lit 3, inspired by Radix UI. The components are framework-agnostic, accessible, and fully customizable.

### Key Principles

- **Headless Components**: No default styles, complete styling control via CSS
- **Lit 3 Based**: Built on modern web standards using Lit 3.1.0
- **Framework Agnostic**: Works with React, Vue, Angular, Svelte, or vanilla JS
- **Accessibility First**: WAI-ARIA compliant with keyboard navigation
- **Lightweight**: Minimal dependencies, tree-shakeable
- **No Shadow DOM**: Uses light DOM for easier styling

## Project Structure

```
wc-primitives/
├── src/
│   ├── index.ts                    # Main entry point
│   ├── primitive-element.ts        # Base class for all primitives
│   ├── components/                 # Component implementations
│   │   ├── accordion/              # Accordion component
│   │   ├── dialog/                 # Dialog component
│   │   ├── tabs/                   # Tabs component
│   │   └── toggle/                 # Toggle component
│   └── stories/                    # Storybook stories
├── .storybook/                     # Storybook configuration
├── demo/                           # Interactive demo HTML
├── dist/                           # Build output (git-ignored)
└── node_modules/                   # Dependencies (git-ignored)
```

## Tech Stack

### Core Dependencies
- **Lit 3.1.0**: Web component framework with reactive properties
- **TypeScript 5.3.3**: Type safety and modern JavaScript features

### Development Tools
- **Vite 5.0.11**: Fast build tool and dev server
- **Vitest 1.2.0**: Unit testing framework (no Jest)
- **Storybook 9.1.13**: Component documentation and development
- **ESLint 8.56.0**: Code linting
- **Prettier 3.2.4**: Code formatting
- **vite-plugin-dts**: TypeScript declaration generation

## Component Architecture

### Base Class: PrimitiveElement

All components extend `PrimitiveElement` which provides:
- **No Shadow DOM**: `createRenderRoot()` returns `this` for light DOM rendering
- **ID Generation**: `generateId(prefix)` for unique accessibility IDs
- **Event Dispatch**: `dispatchCustomEvent(name, detail)` for custom events

### Component Structure Pattern

Each component follows this pattern:

```typescript
import { customElement, property, state } from 'lit/decorators.js';
import { PrimitiveElement } from '../../primitive-element.js';

@customElement('wc-component-name')
export class WcComponentName extends PrimitiveElement {
  @property({ type: String }) value = '';
  @property({ type: Boolean }) disabled = false;
  @state() private _internalState = false;

  render() {
    return html`...`;
  }
}
```

### Composable Components

Components are designed to be composable, like Radix UI:
- Root component manages state and coordinates child components
- Child components listen to parent events and update themselves
- Communication via custom events (e.g., `value-change`)

## Storybook Usage

### Running Storybook

```bash
npm run storybook        # Start Storybook dev server on port 6006
npm run build-storybook  # Build static Storybook for deployment
```

### Story File Structure

Stories are located alongside components in `src/components/*/`.

Example story structure:
```typescript
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './component.js';

const meta: Meta = {
  title: 'Components/ComponentName',
  tags: ['autodocs'],
  render: (args) => html`<wc-component></wc-component>`,
  argTypes: {
    // Define controls for Storybook
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {},
};
```

### Styling in Stories

Since components are headless, stories include CSS styles:

```typescript
const styles = html`
  <style>
    wc-component {
      /* Custom styles here */
    }
  </style>
`;
```

## Development Workflow

### Initial Setup

```bash
npm install              # Install dependencies
```

### Development Commands

```bash
npm run dev              # Start Vite dev server with live demo
npm run storybook        # Start Storybook for component development
npm test                 # Run tests once
npm run test:watch       # Run tests in watch mode
npm run test:ui          # Open Vitest UI
npm run typecheck        # Type check without emitting
npm run lint             # Lint code
npm run lint:fix         # Auto-fix lint issues
npm run format           # Format code with Prettier
npm run build            # Build for production
```

### Development Best Practices

1. **Start with Storybook**: Develop and test components visually
2. **Write tests**: Add tests in `*.spec.ts` files using Vitest
3. **Type everything**: Use TypeScript for all code
4. **Lint early**: Run `npm run lint` before committing
5. **Check types**: Run `npm run typecheck` to catch type errors

## Creating New Components

### Step 1: Create Component Files

```bash
src/components/new-component/
├── index.ts                    # Exports
├── new-component.ts            # Root component
├── new-component-part.ts       # Sub-components
├── new-component.spec.ts       # Tests
└── new-component.stories.ts    # Storybook stories
```

### Step 2: Extend PrimitiveElement

```typescript
import { customElement, property } from 'lit/decorators.js';
import { html } from 'lit';
import { PrimitiveElement } from '../../primitive-element.js';

@customElement('wc-new-component')
export class WcNewComponent extends PrimitiveElement {
  @property({ type: Boolean }) disabled = false;

  render() {
    return html`
      <div role="..." aria-disabled="${this.disabled}">
        <slot></slot>
      </div>
    `;
  }
}
```

### Step 3: Add Accessibility

Always include:
- Proper ARIA roles (`role="button"`, `role="dialog"`, etc.)
- ARIA attributes (`aria-expanded`, `aria-controls`, `aria-labelledby`, etc.)
- Keyboard navigation (Enter, Space, Arrow keys, Escape)
- Focus management

### Step 4: Create Tests

```typescript
import { describe, it, expect, beforeEach } from 'vitest';
import { fixture, html } from '@open-wc/testing-helpers';
import './new-component.js';

describe('WcNewComponent', () => {
  it('should render', async () => {
    const el = await fixture(html`<wc-new-component></wc-new-component>`);
    expect(el).toBeDefined();
  });
});
```

### Step 5: Create Stories

```typescript
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './new-component.js';

const meta: Meta = {
  title: 'Components/NewComponent',
  tags: ['autodocs'],
  render: (args) => html`<wc-new-component></wc-new-component>`,
};

export default meta;
export const Default: Story = {};
```

### Step 6: Export in index.ts

```typescript
// src/components/new-component/index.ts
export { WcNewComponent } from './new-component.js';

// src/index.ts (add export)
export * from './components/new-component/index.js';
```

### Step 7: Add Package Export (package.json)

```json
"./new-component": {
  "types": "./dist/components/new-component/index.d.ts",
  "default": "./dist/components/new-component/index.js"
}
```

## Testing Guidelines

### Test Framework: Vitest

- Use `describe()` for test suites
- Use `it()` or `test()` for individual tests
- Use `beforeEach()` for setup, `afterEach()` for cleanup
- Use `expect()` assertions

### Testing Components

```typescript
import { fixture, html } from '@open-wc/testing-helpers';
import './component.js';

it('should have proper aria attributes', async () => {
  const el = await fixture(html`<wc-component></wc-component>`);
  const button = el.querySelector('[role="button"]');
  expect(button).toHaveAttribute('aria-expanded');
});
```

### Testing Events

```typescript
it('should dispatch custom event', async () => {
  const el = await fixture(html`<wc-component></wc-component>`);
  
  let eventFired = false;
  el.addEventListener('value-change', () => {
    eventFired = true;
  });
  
  // Trigger action
  expect(eventFired).toBe(true);
});
```

## Styling Components

### No Default Styles

Components provide **zero default styles**. Consumers must style everything:

```css
wc-accordion {
  display: block;
  border: 1px solid #e5e5e5;
}
```

### Data Attributes for State

Use data attributes to style based on state:

```css
wc-accordion-trigger[data-state='open'] {
  background-color: #f5f5f5;
}

wc-accordion-trigger[data-disabled] {
  opacity: 0.5;
  cursor: not-allowed;
}
```

### Common Data Attributes

- `data-state="open"` / `data-state="closed"`
- `data-disabled` (boolean attribute)
- `data-orientation="horizontal"` / `data-orientation="vertical"`

## Code Style

### TypeScript

- Use strict mode (enabled in tsconfig.json)
- Prefer `type` over `interface` for type definitions
- Use explicit return types for functions
- Avoid `any` - use `unknown` or proper types

### Lit Decorators

- `@customElement('tag-name')` - Register custom element
- `@property({ type: String })` - Reactive public property
- `@state()` - Reactive private/internal state
- `@query('selector')` - Query element in template
- `@queryAll('selector')` - Query all matching elements

### Event Naming

- Use kebab-case: `value-change`, `open-change`, `pressed-change`
- Past tense indicates completion: `changed`, `opened`
- Present indicates ongoing: `changing`, `opening`

### File Naming

- Component files: `component-name.ts`
- Test files: `component-name.spec.ts`
- Story files: `component-name.stories.ts`
- Use kebab-case for all filenames

## Build Process

### Vite Configuration

The build creates:
- ES modules in `dist/`
- TypeScript declarations (`.d.ts` files)
- Source maps for debugging

### Build Output Structure

```
dist/
├── index.js
├── index.d.ts
├── components/
│   └── component-name/
│       ├── index.js
│       ├── index.d.ts
│       ├── component.js
│       └── component.d.ts
└── primitive-element.js
```

### Tree-Shaking

Components can be imported individually for optimal bundle size:

```javascript
// Import everything
import '@wc-primitives/core';

// Import specific component (tree-shakeable)
import '@wc-primitives/core/accordion';
```

## Accessibility Requirements

### ARIA Roles

Always use appropriate ARIA roles:
- `role="button"` for clickable elements
- `role="dialog"` for modal dialogs
- `role="tab"`, `role="tabpanel"` for tabs
- `role="region"` for accordion content

### ARIA Attributes

Include proper ARIA attributes:
- `aria-expanded` - Expansion state
- `aria-controls` - ID of controlled element
- `aria-labelledby` - Labeling relationship
- `aria-describedby` - Description relationship
- `aria-disabled` - Disabled state

### Keyboard Navigation

Implement keyboard support:
- **Enter/Space**: Activate buttons/triggers
- **Arrow Keys**: Navigate between items
- **Escape**: Close dialogs/menus
- **Home/End**: Jump to first/last item
- **Tab**: Focus management

### Focus Management

- Ensure focusable elements have visible focus indicators
- Trap focus in modal dialogs
- Restore focus when closing overlays
- Use `tabindex="-1"` for programmatic focus only

## Common Patterns

### Parent-Child Communication

```typescript
// Parent dispatches event
this.dispatchCustomEvent('value-change', { value: this.value });

// Child listens to parent
connectedCallback() {
  super.connectedCallback();
  this.addEventListener('parent-event', this._handleParentEvent);
}
```

### Controlled vs Uncontrolled

Support both patterns:
- **Controlled**: External value prop controls state
- **Uncontrolled**: Internal state, emit events for changes

```typescript
@property({ type: String }) value = '';  // Controlled

private _handleChange(newValue: string) {
  this.value = newValue;  // Update internal
  this.dispatchCustomEvent('value-change', { value: newValue });
}
```

### Slot Usage

Use slots for composition:

```typescript
render() {
  return html`
    <div>
      <slot name="trigger"></slot>
      <slot></slot>  <!-- Default slot -->
    </div>
  `;
}
```

## Documentation

### Component Documentation

Include JSDoc comments:

```typescript
/**
 * A dialog component that displays content in a modal overlay.
 * 
 * @fires open-change - Dispatched when the open state changes
 * @slot - Default slot for dialog content
 * @slot trigger - Slot for the dialog trigger element
 * 
 * @example
 * ```html
 * <wc-dialog>
 *   <button slot="trigger">Open Dialog</button>
 *   <wc-dialog-content>Dialog content</wc-dialog-content>
 * </wc-dialog>
 * ```
 */
@customElement('wc-dialog')
export class WcDialog extends PrimitiveElement {
  // ...
}
```

### README Updates

When adding new components, update:
1. Main README.md - Add component to list
2. Component section with API reference
3. Usage examples

## Git Workflow

### Commit Messages

Use conventional commits:
- `feat: add new component`
- `fix: resolve accessibility issue`
- `docs: update README`
- `test: add unit tests`
- `chore: update dependencies`

### Branch Naming

- `feature/component-name` - New features
- `fix/issue-description` - Bug fixes
- `docs/update-description` - Documentation

## Common Issues & Solutions

### Issue: Component not rendering
- Check if component is imported
- Verify custom element is registered
- Check browser console for errors

### Issue: Styles not applying
- Remember: no shadow DOM, use regular CSS
- Check for CSS specificity issues
- Verify selectors match the component structure

### Issue: TypeScript errors
- Run `npm run typecheck`
- Check Lit decorator types
- Ensure proper imports

### Issue: Tests failing
- Run `npm test` to see detailed errors
- Check if component is properly imported in test
- Verify fixture is awaited

## Resources

- [Lit Documentation](https://lit.dev/)
- [Radix UI Primitives](https://www.radix-ui.com/primitives) - Design inspiration
- [WAI-ARIA Practices](https://www.w3.org/WAI/ARIA/apg/) - Accessibility patterns
- [Storybook Documentation](https://storybook.js.org/)
- [Vitest Documentation](https://vitest.dev/)

## Questions?

For questions or contributions, please:
1. Check existing issues in the repository
2. Review the README.md for usage examples
3. Look at existing components for patterns
4. Check Storybook for interactive examples
