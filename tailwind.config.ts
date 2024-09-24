import type { Config } from 'tailwindcss'
import {nextui} from '@nextui-org/react'
//Shows Tailwind where to go to find classnames we use in our project
//./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}
//also:
//darkMode: 'class',
//plugins: [nextui()],



const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'primary': '#7a4f80',
        'secondary': '#006971',
        'default': '#414141',
        'tertiary': '#196b52',
        'success':'#196b52',
        'success-text': '#ffffff',
        'base': '#fefdfd',
        'primaryContainer': '#fed6ff',
        'secondaryContainer': '#9df0fa',
        'tertiaryContainer': '#a5f2d2',
        'onPrimaryContainer': '#300939',
        'onSecondaryContainer': '#002023',
        'onTertiaryContainer': '#002116',
        
      },
    },
  },
  darkMode: 'class',
  plugins: [nextui()],
}
export default config
