// src/main.jsx
import { createInertiaApp } from '@inertiajs/inertia-react'
import { createRoot }       from 'react-dom/client'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'

createInertiaApp({
  // 1) Diz onde estão as “páginas” (suas Home.jsx, Forms.jsx...)
  resolve: name =>
    resolvePageComponent(
      `./pages/${name}.jsx`,
      import.meta.glob('./pages/**/*.jsx')
    ),

  // 2) Como renderizar o App Inertia
  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />)
  },
})
