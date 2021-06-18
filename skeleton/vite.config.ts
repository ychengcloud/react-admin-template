import type { UserConfigExport, ConfigEnv } from 'vite'
import { loadEnv } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh'
import legacy from '@vitejs/plugin-legacy'
import visualizer from 'rollup-plugin-visualizer'
import { minifyHtml } from 'vite-plugin-html'
import vitePluginImp from 'vite-plugin-imp'
import { resolve } from 'path';
import svgr from 'vite-plugin-svgr'
import { getAliases } from "vite-aliases";

const aliases = getAliases();

function pathResolve(dir: string) {
  return resolve(__dirname, '.', dir);
}

const config: UserConfigExport = {
  resolve: {
    // alias: aliases,
    alias: [
      {
        // /@/xxxx  =>  src/xxx
        find: /^~/,
        replacement: pathResolve('node_modules') + '/',
      },
      {
        // /@/xxxx  =>  src/xxx
        find: /@\//,
        replacement: pathResolve('src') + '/',
      },
    ],
  },
  optimizeDeps: {
    include: [
      '@ant-design/colors',
      '@ant-design/icons',
    ],
  },
  plugins: [
    reactRefresh(),
    legacy({
      targets: [
        'Android >= 39',
        'Chrome >= 50',
        'Safari >= 10.1',
        'iOS >= 10.3',
        '> 1%',
        'not IE 11'
      ]
    }),
    // antd-mobile 按需引入
    vitePluginImp({
      libList: [
        {
          libName: 'antd-mobile',
          style: (name) => `antd-mobile/es/${name}/style`,
          libDirectory: 'es'
        }
      ]
    }),
    svgr(),
    // styleImport({
    //   libs: [
    //     {
    //       libraryName: 'antd',
    //       esModule: true,
    //       resolveStyle: (name) => {
    //         return `antd/es/${name}/style/index`;
    //       },
    //     },
    //   ],
    // }),
  ],
  css: {
    modules: {
      localsConvention: 'camelCaseOnly',
    },
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          '@primary-color': '#1890ff',
        },
      },
    },
  },
  build: {
    target: 'es2015',
    minify: 'terser',
    cssCodeSplit: true,
    polyfillDynamicImport: true,
    rollupOptions: {
      plugins: []
    }
  }
}

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv) => {
  console.log('command:', command, ' mode:', mode)
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  const { plugins = [], build = {} } = config
  const { rollupOptions = {} } = build

  const isBuild = command === 'build'

  if (isBuild) {
    // 压缩 Html 插件
    config.plugins = [...plugins, minifyHtml()]
    config.define = {
      'process.env.NODE_ENV': '"production"'
    }
  }

  if (process.env.VISUALIZER) {
    const { plugins = [] } = rollupOptions
    rollupOptions.plugins = [
      ...plugins,
      visualizer({
        open: true,
        gzipSize: true,
        brotliSize: true
      })
    ]
  }

  if (command === 'serve') {
    config.server = {
      host: process.env.HOST,
      port: Number(process.env.PORT)
    }
    if (mode === 'development') {

      config.server.proxy = {
        '/api/graphql': {
          target: process.env.VITE_API_HOST,
          changeOrigin: true,
          // rewrite: path => path.replace(/^\/api/, '')
        },
      }
    }

  }

  return config;
}

