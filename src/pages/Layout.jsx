
import React from 'react';

export default function Layout({ children }) {
    return (
        <>
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
                
                :root {
                    --font-inter: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
                }
                
                * {
                    font-family: var(--font-inter);
                }
                
                html {
                    scroll-behavior: smooth;
                }
                
                body {
                    font-family: var(--font-inter);
                    font-feature-settings: 'cv02', 'cv03', 'cv04', 'cv11';
                    -webkit-font-smoothing: antialiased;
                    -moz-osx-font-smoothing: grayscale;
                }
                
                /* Custom scrollbar */
                ::-webkit-scrollbar {
                    width: 8px;
                }
                
                ::-webkit-scrollbar-track {
                    background: #0f172a;
                }
                
                ::-webkit-scrollbar-thumb {
                    background: linear-gradient(to bottom, #3b82f6, #8b5cf6, #ec4899);
                    border-radius: 4px;
                }
                
                ::-webkit-scrollbar-thumb:hover {
                    background: linear-gradient(to bottom, #2563eb, #7c3aed, #db2777);
                }
                
                /* Animated gradient backgrounds */
                @keyframes gradient-x {
                    0%, 100% {
                        transform: translateX(0%);
                    }
                    50% {
                        transform: translateX(100%);
                    }
                }
                
                .animate-gradient-x {
                    background-size: 400% 400%;
                    animation: gradient-x 3s ease infinite;
                }
                
                /* Glowing effects */
                .glow {
                    box-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
                }
                
                .glow:hover {
                    box-shadow: 0 0 40px rgba(59, 130, 246, 0.7);
                }
                
                /* Enhanced shadows */
                .shadow-3xl {
                    box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
                }
                
                /* Backdrop blur improvements */
                .backdrop-blur-lg {
                    backdrop-filter: blur(16px);
                }
                
                .backdrop-blur-xl {
                    backdrop-filter: blur(24px);
                }
                
                /* Smooth transitions */
                * {
                    transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
                    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
                    transition-duration: 150ms;
                }
            `}</style>
            <main className="min-h-screen bg-slate-900">
                {children}
            </main>
        </>
    );
}
