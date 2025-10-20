import type { Meta } from '@storybook/web-components';

export default {
  title: 'Introduction',
  parameters: {
    previewTabs: {
      canvas: { hidden: true },
    },
    viewMode: 'docs',
  },
} satisfies Meta;

export const Overview = {
  parameters: {
    docs: {
      page: () => `
        <div style="font-family: system-ui, sans-serif; max-width: 800px; margin: 0 auto; padding: 2rem;">
          <h1>WC Primitives</h1>
          <p style="font-size: 1.2rem; color: #666;">
            A collection of headless Web Component Primitives built with Lit 3, inspired by Radix UI.
          </p>

          <h2>Features</h2>
          <ul>
            <li><strong>🎨 Headless</strong> - No default styles, complete styling control</li>
            <li><strong>⚡ Lit 3</strong> - Built on modern web standards with Lit</li>
            <li><strong>🔧 Framework Agnostic</strong> - Works with React, Vue, Angular, Svelte, or vanilla JS</li>
            <li><strong>♿ Accessible</strong> - WAI-ARIA compliant with keyboard navigation</li>
            <li><strong>🪶 Lightweight</strong> - Minimal dependencies, tree-shakeable</li>
          </ul>

          <h2>Installation</h2>
          <pre style="background: #f5f5f5; padding: 1rem; border-radius: 4px; overflow-x: auto;"><code>npm install @wc-primitives/core</code></pre>

          <h2>Quick Start</h2>
          <p>Import and use the components in your HTML:</p>
          <pre style="background: #f5f5f5; padding: 1rem; border-radius: 4px; overflow-x: auto;"><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
  &lt;head&gt;
    &lt;script type="module"&gt;
      import '@wc-primitives/core/accordion';
    &lt;/script&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;wc-accordion type="single" collapsible&gt;
      &lt;wc-accordion-item value="item-1"&gt;
        &lt;wc-accordion-trigger&gt;Is it accessible?&lt;/wc-accordion-trigger&gt;
        &lt;wc-accordion-content&gt;
          Yes! It adheres to WAI-ARIA design patterns.
        &lt;/wc-accordion-content&gt;
      &lt;/wc-accordion-item&gt;
    &lt;/wc-accordion&gt;
  &lt;/body&gt;
&lt;/html&gt;</code></pre>

          <h2>Components</h2>
          <p>Explore the available components in the sidebar.</p>

          <h2>Styling</h2>
          <p>
            All components are headless and come with no default styles. You have complete control over the appearance using CSS.
            Use the data attributes for state-based styling:
          </p>
          <ul>
            <li><code>[data-state="open"]</code> - Applied when a component is in the open state</li>
            <li><code>[data-state="closed"]</code> - Applied when a component is in the closed state</li>
            <li><code>[data-disabled]</code> - Applied when a component is disabled</li>
          </ul>
        </div>
      `,
    },
  },
};
