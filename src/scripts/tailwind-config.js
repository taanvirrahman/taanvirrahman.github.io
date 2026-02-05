/**
 * Shared Tailwind Configuration
 * Centralized design system tokens and theme settings.
 */
tailwind.config = {
    darkMode: ['selector', '[data-theme="dark"]'],
    theme: {
        extend: {
            backgroundColor: {
                main: 'rgb(var(--bg-main-rgb) / <alpha-value>)',
                secondary: 'rgb(var(--bg-secondary-rgb) / <alpha-value>)',
                tertiary: 'rgb(var(--bg-tertiary-rgb) / <alpha-value>)',
            },
            textColor: {
                primary: 'rgb(var(--text-primary-rgb) / <alpha-value>)',
                secondary: 'rgb(var(--text-secondary-rgb) / <alpha-value>)',
                tertiary: 'var(--text-tertiary)',
            },
            colors: {
                main: 'rgb(var(--bg-main-rgb) / <alpha-value>)',
                secondary: 'rgb(var(--bg-secondary-rgb) / <alpha-value>)',
                tertiary: 'rgb(var(--bg-tertiary-rgb) / <alpha-value>)',
                primary: 'rgb(var(--text-primary-rgb) / <alpha-value>)',
                accent: {
                    blue: 'var(--accent-blue)',
                    emerald: 'var(--accent-emerald)',
                    indigo: 'var(--accent-indigo)',
                    rose: 'var(--accent-rose)',
                    amber: 'var(--accent-amber)',
                    violet: 'var(--accent-violet)',
                }
            },
            fontFamily: {
                sans: 'var(--font-sans)',
                mono: 'var(--font-mono)',
                serif: 'var(--font-serif)',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0', transform: 'translateY(10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                }
            },
            animation: {
                fadeIn: 'fadeIn 0.5s ease-out forwards',
            }
        }
    }
};
