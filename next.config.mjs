/** @type {import('next').NextConfig} */
const nextConfig = {
      // experimental:{
      //       appDir: true,
      //       swcPlugins:[
      //             ['next-superjson-plugin',{}]
      //       ]
      // }
      images: {
            remotePatterns: [
              {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                pathname: '**',
              },
              {
                  protocol: 'https',
                  hostname: 'avatars.githubusercontent.com',
                  pathname: '**',
                },
                {
                  protocol: 'https',
                  hostname: 'res.cloudinary.com',
                  pathname: '**',
                },
            ],
          },
          eslint: {
            // Warning: This allows production builds to successfully complete even if
            // your project has ESLint errors.
            ignoreDuringBuilds: true,
          },
}

export default nextConfig;
