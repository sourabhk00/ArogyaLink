import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/index.html", "./client/src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        chart: {
          "1": "var(--chart-1)",
          "2": "var(--chart-2)",
          "3": "var(--chart-3)",
          "4": "var(--chart-4)",
          "5": "var(--chart-5)",
        },
        sidebar: {
          DEFAULT: "var(--sidebar)",
          foreground: "var(--sidebar-foreground)",
          primary: "var(--sidebar-primary)",
          "primary-foreground": "var(--sidebar-primary-foreground)",
          accent: "var(--sidebar-accent)",
          "accent-foreground": "var(--sidebar-accent-foreground)",
          border: "var(--sidebar-border)",
          ring: "var(--sidebar-ring)",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        serif: ["var(--font-serif)"],
        mono: ["var(--font-mono)"],
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-right": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "pulse-gentle": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
        "spin": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "health-card-hover": {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-2px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-in-out",
        "slide-in-right": "slide-in-right 0.3s ease-out",
        "pulse-gentle": "pulse-gentle 2s infinite",
        "spin": "spin 1s linear infinite",
        "health-card-hover": "health-card-hover 0.2s ease-out",
      },
      spacing: {
        "18": "4.5rem",
        "88": "22rem",
      },
      backdropBlur: {
        xs: "2px",
      },
      boxShadow: {
        "health-card": "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        "health-card-hover": "0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        "modal": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      },
      screens: {
        'xs': '475px',
      },
      aspectRatio: {
        'video': '16 / 9',
        'square': '1 / 1',
        'portrait': '3 / 4',
        'landscape': '4 / 3',
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
      lineClamp: {
        7: '7',
        8: '8',
        9: '9',
        10: '10',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"), 
    require("@tailwindcss/typography"),
    // Additional plugin for health card animations and medical UI components
    function({ addUtilities, theme }: { addUtilities: any, theme: any }) {
      const newUtilities = {
        '.health-card-transition': {
          'transition': 'all 0.2s ease-in-out',
        },
        '.health-card-hover-effect': {
          'transform': 'translateY(-2px)',
          'box-shadow': theme('boxShadow.health-card-hover'),
        },
        '.gradient-medical': {
          'background': 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--accent)) 100%)',
        },
        '.text-gradient-medical': {
          'background': 'linear-gradient(45deg, #4285F4, #9B72CB, #D96570, #F2A60C)',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          'background-clip': 'text',
        },
        '.sidebar-transition': {
          'transition': 'transform 0.3s ease-in-out',
        },
        '.content-shift': {
          'transition': 'margin-left 0.3s ease-in-out',
        },
        '.modal-backdrop': {
          'backdrop-filter': 'blur(4px)',
          'background-color': 'rgba(0, 0, 0, 0.5)',
        },
        '.timeline-line': {
          'position': 'relative',
        },
        '.timeline-line::before': {
          'content': '""',
          'position': 'absolute',
          'left': '50%',
          'top': '0',
          'bottom': '0',
          'width': '2px',
          'background': 'hsl(var(--border))',
          'transform': 'translateX(-50%)',
        },
        '.loading-spinner': {
          'border': '3px solid hsl(var(--muted))',
          'border-top': '3px solid hsl(var(--primary))',
          'border-radius': '50%',
          'width': '24px',
          'height': '24px',
          'animation': 'spin 1s linear infinite',
        },
        '.camera-preview': {
          'position': 'relative',
          'background': 'hsl(var(--muted))',
          'border-radius': 'var(--radius)',
          'aspect-ratio': '16 / 9',
          'overflow': 'hidden',
        },
        '.camera-overlay': {
          'position': 'absolute',
          'inset': '0',
          'pointer-events': 'none',
        },
        '.otp-input': {
          'width': '3rem',
          'height': '3rem',
          'text-align': 'center',
          'border': '1px solid hsl(var(--border))',
          'border-radius': 'calc(var(--radius) - 2px)',
          'background': 'hsl(var(--background))',
          'color': 'hsl(var(--foreground))',
          'font-weight': '700',
          'font-size': '1.125rem',
          '&:focus': {
            'outline': 'none',
            'ring': '2px',
            'ring-color': 'hsl(var(--ring))',
            'border-color': 'transparent',
          },
        },
        '.status-normal': {
          'background-color': 'rgb(220 252 231)',
          'color': 'rgb(22 101 52)',
        },
        '.status-borderline': {
          'background-color': 'rgb(254 249 195)',
          'color': 'rgb(133 77 14)',
        },
        '.status-abnormal': {
          'background-color': 'rgb(254 226 226)',
          'color': 'rgb(153 27 27)',
        },
        '.status-pending': {
          'background-color': 'rgb(243 244 246)',
          'color': 'rgb(55 65 81)',
        },
        '.status-completed': {
          'background-color': 'rgb(219 234 254)',
          'color': 'rgb(30 58 138)',
        },
        '.emergency-button': {
          'background-color': 'hsl(var(--destructive))',
          'color': 'hsl(var(--destructive-foreground))',
          '&:hover': {
            'background-color': 'hsl(var(--destructive) / 0.9)',
          },
          'transition': 'colors 0.2s',
        },
        '.file-upload-area': {
          'transition': 'all 0.2s ease-in-out',
          '&.drag-over': {
            'border-color': 'hsl(var(--primary))',
            'background-color': 'hsl(var(--primary) / 0.05)',
          },
        },
        // Dark mode overrides for status colors
        '.dark .status-normal': {
          'background-color': 'rgb(20 83 45)',
          'color': 'rgb(187 247 208)',
        },
        '.dark .status-borderline': {
          'background-color': 'rgb(120 53 15)',
          'color': 'rgb(253 230 138)',
        },
        '.dark .status-abnormal': {
          'background-color': 'rgb(127 29 29)',
          'color': 'rgb(252 165 165)',
        },
        '.dark .status-pending': {
          'background-color': 'rgb(55 65 81)',
          'color': 'rgb(209 213 219)',
        },
        '.dark .status-completed': {
          'background-color': 'rgb(30 58 138)',
          'color': 'rgb(147 197 253)',
        },
      }
      
      addUtilities(newUtilities)
    }
  ],
} satisfies Config;
