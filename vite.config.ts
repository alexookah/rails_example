import { defineConfig } from 'vite'
import rails from 'vite-plugin-rails'
import ViteLegacy from '@vitejs/plugin-legacy'
import ViteReact from '@vitejs/plugin-react'
import WindiCSS from 'vite-plugin-windicss'
import BugsnagPlugins from './plugins/bugsnag'

export default defineConfig({
  plugins: [
    BugsnagPlugins,
    rails({
      envVars: {
        BUGSNAG_API_KEY: null,
        HONEYBADGER_API_KEY: null,
        HEROKU_RELEASE_VERSION: 'development',
        HEROKU_SLUG_COMMIT: 'main',
      },
    }),
    ViteLegacy({
      targets: ['Chrome 63'],
      modernPolyfills: ['es.string.replace', 'es.string.replace-all', 'esnext.string.replace-all'],
      polyfills: ['es.string.replace', 'es.string.replace-all', 'esnext.string.replace-all']
    }),
    ViteReact(),
    WindiCSS({
      root: __dirname,
      scan: {
        fileExtensions: ['erb', 'html', 'vue', 'jsx', 'tsx'], // and maybe haml
        dirs: ['app/views', 'app/frontend'], // or app/javascript
      },
    }),
  ],
  // Example: Importing assets from arbitrary paths.
  resolve: {
    alias: {
      '@administrator/': `${process.env.ADMINISTRATOR_ASSETS_PATH}/`,
    },
  },
  server: {
    fs: {
      allow: [process.env.ADMINISTRATOR_ASSETS_PATH!],
    },
  },
})
