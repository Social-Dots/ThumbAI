
import React, { useRef, useEffect } from "react";
import { Download, Star, Sparkles, Eye, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// Helper to wrap text on canvas
const wrapText = (context, text, x, y, maxWidth, lineHeight) => {
    const words = text.split(' ');
    let line = '';
    let currentY = y;

    for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = context.measureText(testLine);
        if (metrics.width > maxWidth && n > 0) {
            context.fillText(line, x, currentY);
            line = words[n] + ' ';
            currentY += lineHeight;
        } else {
            line = testLine;
        }
    }
    context.fillText(line, x, currentY);
    return currentY + lineHeight;
};

// Helper to draw rounded rectangles
const drawRoundedRect = (ctx, x, y, width, height, radius) => {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.arcTo(x + width, y, x + width, y + radius, radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.arcTo(x + width, y + height, x + width - radius, y + height, radius);
    ctx.lineTo(x + radius, y + height);
    ctx.arcTo(x, y + height, x, y + height - radius, radius);
    ctx.lineTo(x, y + radius);
    ctx.arcTo(x, y, x + radius, y, radius);
    ctx.closePath();
};

const drawMinimalStyle = (ctx, result) => {
    const { width, height } = ctx.canvas;

    // Simple overlay
    const vignette = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, Math.max(width, height)/2);
    vignette.addColorStop(0, 'rgba(0,0,0,0)');
    vignette.addColorStop(0.7, 'rgba(0,0,0,0)');
    vignette.addColorStop(1, 'rgba(0,0,0,0.15)');
    ctx.fillStyle = vignette;
    ctx.fillRect(0, 0, width, height);

    // Text area
    const textAreaHeight = 80;
    const textAreaY = height - textAreaHeight - 20;
    
    ctx.save();
    ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
    drawRoundedRect(ctx, 20, textAreaY, width - 40, textAreaHeight, 16);
    ctx.fill();
    ctx.restore();

    // Status tag
    if (result.status_tag && result.status_tag.trim() !== '') {
        ctx.save();
        ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
        ctx.font = '500 13px "Inter", sans-serif';
        
        const tagText = result.status_tag.toUpperCase();
        const tagMetrics = ctx.measureText(tagText);
        const tagWidth = tagMetrics.width + 20;
        const tagHeight = 28;
        const tagX = width - tagWidth - 25;
        const tagY = 25;
        
        drawRoundedRect(ctx, tagX, tagY, tagWidth, tagHeight, 14);
        ctx.fill();
        
        ctx.fillStyle = '#FFFFFF';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(tagText, tagX + tagWidth/2, tagY + tagHeight/2);
        ctx.restore();
    }

    // Headline
    ctx.save();
    ctx.fillStyle = '#1e293b';
    ctx.font = '600 24px "Inter", sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    
    const headline = result.headline || 'Modern Living';
    const headlineY = textAreaY + 16;
    const headlineMaxW = width - 80;
    const headlineEndY = wrapText(ctx, headline, 40, headlineY, headlineMaxW, 28);
    ctx.restore();

    // Subtext
    if (result.subtext && result.subtext.trim() !== '') {
        ctx.save();
        ctx.fillStyle = '#64748b';
        ctx.font = '400 14px "Inter", sans-serif';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        
        const subtextY = headlineEndY + 4;
        wrapText(ctx, result.subtext, 40, subtextY, headlineMaxW, 18);
        ctx.restore();
    }

    // Branding
    ctx.save();
    ctx.fillStyle = 'rgba(100, 116, 139, 0.4)';
    ctx.font = '300 10px "Inter", sans-serif';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'bottom';
    ctx.fillText('ThumbAI', width - 25, height - 8);
    ctx.restore();
};

const drawLuxuryStyle = (ctx, result) => {
    const { width, height } = ctx.canvas;
    
    // Dark overlay
    const luxuryOverlay = ctx.createLinearGradient(0, height, 0, 0);
    luxuryOverlay.addColorStop(0, 'rgba(15, 23, 42, 0.9)');
    luxuryOverlay.addColorStop(0.5, 'rgba(15, 23, 42, 0.4)');
    luxuryOverlay.addColorStop(1, 'rgba(15, 23, 42, 0.1)');
    ctx.fillStyle = luxuryOverlay;
    ctx.fillRect(0, 0, width, height);

    // Status tag
    if (result.status_tag && result.status_tag.trim() !== '') {
        ctx.save();
        ctx.fillStyle = 'rgba(212, 175, 55, 0.9)';
        ctx.font = 'bold 13px "Inter", sans-serif';
        
        const tagText = result.status_tag.toUpperCase();
        const tagMetrics = ctx.measureText(tagText);
        const tagWidth = tagMetrics.width + 24;
        const tagHeight = 28;
        const tagX = width - tagWidth - 24;
        const tagY = 24;
        
        drawRoundedRect(ctx, tagX, tagY, tagWidth, tagHeight, 14);
        ctx.fill();
        
        ctx.fillStyle = '#FFFFFF';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(tagText, tagX + tagWidth/2, tagY + tagHeight/2);
        ctx.restore();
    }

    // Headline
    ctx.save();
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 42px "Inter", sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'bottom';
    
    const headline = result.headline || 'Luxury Estate';
    const headlineY = height - 60;
    const headlineMaxW = width - 48;
    const headlineEndY = wrapText(ctx, headline, 24, headlineY, headlineMaxW, 46);
    ctx.restore();

    // Subtext
    if (result.subtext && result.subtext.trim() !== '') {
        ctx.save();
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.font = '400 16px "Inter", sans-serif';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        
        const subtextY = headlineEndY;
        wrapText(ctx, result.subtext, 24, subtextY, headlineMaxW, 20);
        ctx.restore();
    }
    
    // Branding
    ctx.save();
    ctx.fillStyle = 'rgba(212, 175, 55, 0.8)';
    ctx.font = '500 14px "Inter", sans-serif';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'bottom';
    ctx.fillText('THUMB AI', width - 24, height - 20);
    ctx.restore();
};

const drawModernStyle = (ctx, result) => {
    const { width, height } = ctx.canvas;

    // Clean subtle overlay instead of bold colors
    const modernOverlay = ctx.createLinearGradient(0, height * 0.6, 0, height);
    modernOverlay.addColorStop(0, 'rgba(0, 0, 0, 0)');
    modernOverlay.addColorStop(1, 'rgba(0, 0, 0, 0.4)');
    ctx.fillStyle = modernOverlay;
    ctx.fillRect(0, 0, width, height);

    // Status tag
    if (result.status_tag && result.status_tag.trim() !== '') {
        ctx.save();
        ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
        ctx.font = 'bold 14px "Inter", sans-serif';
        
        const tagText = result.status_tag.toUpperCase();
        const tagMetrics = ctx.measureText(tagText);
        const tagWidth = tagMetrics.width + 24;
        const tagHeight = 32;
        const tagX = width - tagWidth - 24;
        const tagY = 24;
        
        drawRoundedRect(ctx, tagX, tagY, tagWidth, tagHeight, 16);
        ctx.fill();
        
        ctx.fillStyle = '#1F2937';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(tagText, tagX + tagWidth/2, tagY + tagHeight/2);
        ctx.restore();
    }

    // Headline
    ctx.save();
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '800 52px "Inter", sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'bottom';
    
    const headline = result.headline || 'Modern Property';
    const headlineY = height - 60;
    const headlineMaxW = width - 48;
    const headlineEndY = wrapText(ctx, headline, 24, headlineY, headlineMaxW, 56);
    ctx.restore();

    // Subtext
    if (result.subtext && result.subtext.trim() !== '') {
        ctx.save();
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.font = '500 18px "Inter", sans-serif';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        
        const subtextY = headlineEndY;
        wrapText(ctx, result.subtext, 24, subtextY, headlineMaxW, 22);
        ctx.restore();
    }
    
    // Branding
    ctx.save();
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.font = '600 14px "Inter", sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText('THUMB AI', 24, 24);
    ctx.restore();
};

const drawThumbnail = (canvas, result) => {
    if (!canvas || !result) return;
    
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
        try {
            const canvasWidth = 900;
            const canvasHeight = 506;
            canvas.width = canvasWidth;
            canvas.height = canvasHeight;

            ctx.clearRect(0, 0, canvasWidth, canvasHeight);

            // Draw the background image
            const aspectRatio = img.width / img.height;
            const canvasAspectRatio = canvasWidth / canvasHeight;

            let sx, sy, sWidth, sHeight;
            if (aspectRatio > canvasAspectRatio) {
                sHeight = img.height;
                sWidth = sHeight * canvasAspectRatio;
                sx = (img.width - sWidth) / 2;
                sy = 0;
            } else {
                sWidth = img.width;
                sHeight = sWidth / canvasAspectRatio;
                sx = 0;
                sy = (img.height - sHeight) / 2;
            }
            ctx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, canvasWidth, canvasHeight);

            // Apply style overlays
            if (result.style === 'Luxury') {
                drawLuxuryStyle(ctx, result);
            } else if (result.style === 'Modern') {
                drawModernStyle(ctx, result);
            } else if (result.style === 'Minimal') {
                drawMinimalStyle(ctx, result);
            }
            
        } catch (error) {
            console.error(`Error drawing ${result.style} thumbnail:`, error);
        }
    };

    img.onerror = () => {
        console.error('Failed to load image:', result.original_image_url);
        canvas.width = 900;
        canvas.height = 506;
        ctx.fillStyle = '#f8fafc';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#64748b';
        ctx.font = '20px Inter';
        ctx.textAlign = 'center';
        ctx.fillText('Image Loading...', canvas.width / 2, canvas.height / 2);
    };

    img.src = result.original_image_url;
};

export default function ThumbnailResults({ result }) {
    const canvasRefs = useRef([]);

    const allThumbnailStyles = [
        { 
            name: "Modern", 
            style: "Modern", 
            description: "Bold, contemporary design with creative layouts and vibrant colors",
            color: "from-amber-500 to-orange-600",
            icon: "🏗️",
            theme: "Contemporary"
        },
        { 
            name: "Minimal", 
            style: "Minimal", 
            description: "Clean, professional layout with detailed property information",
            color: "from-emerald-500 to-teal-600",
            icon: "📋",
            theme: "Professional"
        },
        { 
            name: "Luxury", 
            style: "Luxury", 
            description: "Premium design with elegant gradients and luxury appeal",
            color: "from-indigo-500 to-purple-600",
            icon: "👑",
            theme: "Premium"
        }
    ];

    const stylesToShow = result ? allThumbnailStyles.slice(0, result.designsToGenerate) : [];

    useEffect(() => {
        if (result && result.original_image_url && stylesToShow.length > 0) {
            stylesToShow.forEach((thumbnailStyle, index) => {
                setTimeout(() => {
                    if (canvasRefs.current[index]) {
                        drawThumbnail(canvasRefs.current[index], { ...result, style: thumbnailStyle.style });
                    }
                }, 200 * (index + 1));
            });
        }
    }, [result, stylesToShow]);

    if (!result || stylesToShow.length === 0) return null;

    const handleDownload = (index) => {
        const canvas = canvasRefs.current[index];
        if (!canvas) return;
        
        const selectedStyle = stylesToShow[index];
        const link = document.createElement('a');
        link.download = `thumb-ai-${selectedStyle.style.toLowerCase()}-${Date.now()}.png`;
        link.href = canvas.toDataURL('image/png', 0.95);
        link.click();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0">
                <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>
            
            <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
                {/* Success Header */}
                <div className="text-center mb-20">
                    <div className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-green-400/20 to-emerald-400/20 backdrop-blur-lg border border-green-400/30 text-green-300 text-sm font-bold mb-8 shadow-2xl">
                        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                        <Star className="w-5 h-5" />
                        <span>Your Professional Real Estate Thumbnails Are Ready!</span>
                        <Sparkles className="w-5 h-5" />
                    </div>
                    
                    <h2 className="text-6xl lg:text-7xl font-black text-white mb-8 tracking-tight">
                        Professional
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"> Real Estate</span>
                        <br />Marketing Assets
                    </h2>
                    <p className="text-xl text-slate-300 mb-6 max-w-4xl mx-auto leading-relaxed">
                        Each design follows industry standards used by top real estate platforms. 
                        Download in high-resolution PNG format, ready for MLS listings, social media, and marketing campaigns.
                    </p>
                </div>

                {/* Thumbnails Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                    {stylesToShow.map((thumbnailStyle, index) => (
                        <div key={index} className="group">
                            <Card className="relative overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                                {/* Style Badge */}
                                <div className="absolute top-6 left-6 z-10">
                                    <div className={`px-4 py-2 rounded-2xl bg-gradient-to-r ${thumbnailStyle.color} text-white font-bold text-sm shadow-xl backdrop-blur-sm`}>
                                        <span className="mr-2">{thumbnailStyle.icon}</span>
                                        {thumbnailStyle.name}
                                    </div>
                                </div>

                                {/* Theme Badge */}
                                <div className="absolute top-6 right-6 z-10">
                                    <div className="px-3 py-1 rounded-full bg-black/20 backdrop-blur-sm text-white text-xs font-medium">
                                        {thumbnailStyle.theme}
                                    </div>
                                </div>
                                
                                {/* Canvas */}
                                <div className="relative p-4">
                                    <canvas 
                                        ref={el => canvasRefs.current[index] = el}
                                        className="w-full h-auto block rounded-2xl shadow-2xl transition-transform duration-500 group-hover:scale-[1.02] cursor-pointer"
                                        style={{ maxWidth: '100%', height: 'auto' }}
                                        onClick={() => handleDownload(index)}
                                    />
                                    
                                    {/* Hover Overlay */}
                                    <div className="absolute inset-4 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center pb-8 rounded-2xl pointer-events-none">
                                        <div className="text-white text-center">
                                            <div className="flex items-center justify-center gap-4 mb-4">
                                                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                                                    <Eye className="w-6 h-6" />
                                                </div>
                                                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                                                    <Heart className="w-6 h-6" />
                                                </div>
                                                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                                                    <Download className="w-6 h-6" />
                                                </div>
                                            </div>
                                            <p className="font-bold text-lg">Click to Download</p>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                            
                            {/* Style Info & Download */}
                            <div className="mt-8 text-center">
                                <div className="mb-6">
                                    <h3 className="text-3xl font-black text-white mb-3 flex items-center justify-center gap-3">
                                        <span>{thumbnailStyle.icon}</span>
                                        {thumbnailStyle.name} Style
                                    </h3>
                                    <p className="text-slate-300 leading-relaxed max-w-sm mx-auto text-lg">
                                        {thumbnailStyle.description}
                                    </p>
                                </div>
                                
                                <Button
                                    size="lg"
                                    onClick={() => handleDownload(index)}
                                    className={`w-full h-16 text-lg font-black shadow-2xl transition-all duration-300 transform hover:scale-105 bg-gradient-to-r ${thumbnailStyle.color} hover:shadow-2xl text-white border-0 rounded-2xl`}
                                >
                                    <Download className="w-5 h-5 mr-3" />
                                    Download {thumbnailStyle.name}
                                </Button>
                                
                                <p className="text-xs text-slate-400 mt-4">
                                    High-resolution PNG • MLS Ready • 900×506px
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
