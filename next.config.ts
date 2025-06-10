
import type {NextConfig} from 'next';
import type { Configuration as WebpackConfiguration } from 'webpack';
// Import the webpack namespace type for better typing of the webpack instance
import type webpack from 'webpack';


interface WebpackConfigContext {
  buildId: string;
  dev: boolean;
  isServer: boolean;
  defaultLoaders: object;
  nextRuntime?: 'nodejs' | 'edge';
  webpack: typeof webpack; // Use the imported webpack namespace type
}


const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
  webpack: (
    config: WebpackConfiguration,
    context: WebpackConfigContext // Use the full context object
  ): WebpackConfiguration => {
    if (!context.isServer) {
      // Client-side specific configurations

      // Ensure resolve and fallback objects exist
      config.resolve = config.resolve || {};
      config.resolve.fallback = config.resolve.fallback || {};

      // Explicitly tell webpack not to try to polyfill 'async_hooks' on the client
      config.resolve.fallback.async_hooks = false;

      // Ensure plugins array exists
      config.plugins = config.plugins || [];
      
      // Add IgnorePlugin to prevent webpack from trying to bundle 'async_hooks'
      // This tells webpack to treat 'async_hooks' as an empty module on the client.
      config.plugins.push(
        new context.webpack.IgnorePlugin({
          resourceRegExp: /^async_hooks$/,
        })
      );
    }
    // Server-side specific configurations could go here

    // Important: return the modified config
    return config;
  },
};

export default nextConfig;

