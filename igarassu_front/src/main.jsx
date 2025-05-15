
import { createInertiaApp } from '@inertiajs/inertia-react'
import { createRoot }       from 'react-dom/client'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'

createInertiaApp({
  // Diz onde estão as “páginas” 
  resolve: name =>
    resolvePageComponent(
      `./pages/${name}.jsx`,
      import.meta.glob('./pages/**/*.jsx')
    ),

  // Como renderizar o App Inertia
  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />)
  },
})
