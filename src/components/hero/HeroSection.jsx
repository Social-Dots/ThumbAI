import React from "react";
import { Sparkles, ArrowRight, Zap, Stars, ChevronDown } from "lucide-react";

export default function HeroSection() {
    const scrollToUploader = () => {
        const uploaderElement = document.getElementById('uploader');
        if (uploaderElement) {
            uploaderElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0">
                <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-indigo-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
            </div>

            {/* Grid pattern overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px]"></div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 lg:py-28">
                {/* Navigation */}
                <nav className="flex items-center justify-between mb-16">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                            <Sparkles className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-2xl font-bold text-white">ThumbAI</span>
                    </div>
                    <div className="hidden md:flex items-center gap-8 text-slate-300">
                        <a href="#features" className="hover:text-white transition-colors">Features</a>
                        <a href="#examples" className="hover:text-white transition-colors">Examples</a>
                        <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
                    </div>
                </nav>

                <div className="text-center max-w-5xl mx-auto">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 text-white font-medium text-sm mb-8 shadow-2xl">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <Sparkles className="w-4 h-4" />
                        <span>AI-Powered Real Estate Design Studio</span>
                        <Stars className="w-4 h-4" />
                    </div>

                    {/* Main heading with gradient text */}
                    <h1 className="text-6xl lg:text-8xl font-black mb-8 leading-tight tracking-tight">
                        <span className="text-white">Create</span>
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-gradient-x">
                            Stunning Thumbnails
                        </span>
                        <br />
                        <span className="text-white">in Seconds</span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-xl lg:text-2xl text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed">
                        Transform ordinary property photos into 
                        <span className="text-white font-semibold"> professional marketing thumbnails</span> with 
                        our cutting-edge AI. Get luxury, modern, and minimal designs instantly.
                    </p>
                    
                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                        <button 
                            onClick={scrollToUploader}
                            className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold text-lg rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <span className="relative flex items-center gap-3">
                                <Zap className="w-5 h-5" />
                                Start Creating Free
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </button>
                        <button className="px-8 py-4 bg-white/10 backdrop-blur-lg text-white font-semibold text-lg rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300">
                            <span className="flex items-center gap-3">
                                Watch Demo
                                <ChevronDown className="w-5 h-5" />
                            </span>
                        </button>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto mb-16">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-white mb-2">3</div>
                            <div className="text-slate-400 text-sm">Design Styles</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-white mb-2">5s</div>
                            <div className="text-slate-400 text-sm">Generation Time</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-white mb-2">4K</div>
                            <div className="text-slate-400 text-sm">Resolution</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-white mb-2">100%</div>
                            <div className="text-slate-400 text-sm">Free to Use</div>
                        </div>
                    </div>

                    {/* Feature preview cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center mb-4 mx-auto">
                                <Sparkles className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="font-bold text-white mb-2">AI-Powered Design</h3>
                            <p className="text-slate-400 text-sm">Smart text placement and professional typography automatically optimized</p>
                        </div>
                        <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                            <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center mb-4 mx-auto">
                                <Zap className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="font-bold text-white mb-2">Lightning Fast</h3>
                            <p className="text-slate-400 text-sm">Generate all 3 professional styles in under 5 seconds</p>
                        </div>
                        <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                            <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-pink-600 rounded-xl flex items-center justify-center mb-4 mx-auto">
                                <Stars className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="font-bold text-white mb-2">Premium Quality</h3>
                            <p className="text-slate-400 text-sm">High-resolution outputs ready for marketing campaigns</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                <button 
                    onClick={scrollToUploader}
                    className="w-8 h-8 rounded-full border-2 border-white/30 flex items-center justify-center text-white/60 hover:text-white hover:border-white/60 transition-all duration-300 animate-bounce"
                >
                    <ChevronDown className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}