import { signal } from '@preact/signals-react'

// [signet] fork addition: topbar breadcrumb registered by the active page's
// Breadcrumb component and rendered by the shell topbar
export interface Crumb {
  parent?: {
    label: string;
    href: string;
  };
  page?: string;
}

const crumb = signal<Crumb | null>(null)

export default crumb
