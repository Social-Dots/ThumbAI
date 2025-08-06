
import React, { useState, useRef } from "react";
import { Upload, AlertCircle, Image, Sparkles, Zap, Camera, FileImage, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function ImageUploader({ onImageUpload, isProcessing, user, isLimitReached }) {
    const [image, setImage] = useState(null);
    const [headline, setHeadline] = useState("");
    const [subtext, setSubtext] = useState("");
    const [statusTag, setStatusTag] = useState("");
    const [errors, setErrors] = useState({});
    const [dragActive, setDragActive] = useState(false);
    const fileInputRef = useRef(null);

    const validateForm = () => {
        const newErrors = {};
        if (!image) newErrors.image = "Please upload an image";
        if (!headline.trim()) newErrors.headline = "Headline is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleFileSelect = (file) => {
        if (file && file.type.startsWith("image/")) {
            if (file.size > 10 * 1024 * 1024) { // 10MB limit
                setErrors({...errors, image: "File size must be less than 10MB"});
                return;
            }
            setImage({
                file,
                preview: URL.createObjectURL(file),
            });
            setErrors({...errors, image: undefined});
        } else {
            setErrors({...errors, image: "Please select a valid image file"});
        }
    };

    const handleFileInput = (e) => {
        const file = e.target.files[0];
        if (file) handleFileSelect(file);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        const file = e.dataTransfer.files[0];
        if (file) handleFileSelect(file);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
    };

    const handleGenerate = () => {
        if (!user) {
            setErrors({...errors, auth: "Please log in to generate thumbnails"});
            return;
        }
        
        if (isLimitReached) {
            setErrors({...errors, limit: "Daily generation limit reached. Try again tomorrow."});
            return;
        }
        
        if (!validateForm()) return;
        onImageUpload(image, headline, subtext, statusTag);
    };

    const clearImage = () => {
        if (image && image.preview) {
            URL.revokeObjectURL(image.preview);
        }
        setImage(null);
        setErrors({...errors, image: undefined});
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const isDisabled = isProcessing || !user || isLimitReached;

    return (
        <div id="uploader" className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:60px_60px]"></div>
            
            <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
                {/* Section Header */}
                <div className="text-center mb-20">
                    <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200/50 text-blue-700 font-semibold text-sm mb-8 shadow-lg">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                        <Camera className="w-4 h-4" />
                        <span>Upload & Transform</span>
                        <Wand2 className="w-4 h-4" />
                    </div>
                    <h2 className="text-5xl lg:text-6xl font-black text-slate-900 mb-6 tracking-tight">
                        Upload Your 
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> Property Photo</span>
                    </h2>
                    <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                        Drop your image and customize the text. Our AI will instantly create 3 professional thumbnail styles 
                        that convert browsers into buyers.
                    </p>
                </div>

                <div className="grid lg:grid-cols-5 gap-12 items-start">
                    {/* Left Side: Upload Zone */}
                    <div className="lg:col-span-3 space-y-8">
                        <Card 
                            className={`relative p-8 border-2 border-dashed transition-all duration-500 min-h-[500px] flex flex-col justify-center cursor-pointer overflow-hidden group
                                ${dragActive ? 'border-blue-400 bg-blue-50/80 scale-[1.02] shadow-2xl' : 
                                  errors.image ? 'border-red-300 bg-red-50/50' :
                                  'border-slate-200 hover:border-blue-300 hover:bg-slate-50/50 hover:scale-[1.01] hover:shadow-xl'}`}
                            onDrop={handleDrop}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onClick={() => !image && fileInputRef.current?.click()}
                        >
                            {/* Animated background gradient */}
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                            
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleFileInput}
                                className="hidden"
                            />
                            
                            {image ? (
                                <div className="text-center relative z-10">
                                    <div className="relative inline-block mb-6">
                                        <img 
                                            src={image.preview} 
                                            alt="Preview" 
                                            className="w-full max-h-96 object-contain rounded-3xl border-4 border-white shadow-2xl" 
                                        />
                                        <div className="absolute -top-3 -right-3 w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                                            <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 0 01-1.414 0l-4-4a1 0 011.414-1.414L8 12.586l7.293-7.293a1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-800 mb-2 truncate">{image.file.name}</h3>
                                    <p className="text-slate-500 mb-6 text-lg">
                                        {(image.file.size / 1024 / 1024).toFixed(2)} MB • Ready for AI processing
                                    </p>
                                    <Button 
                                        variant="outline" 
                                        onClick={clearImage} 
                                        className="px-6 py-3 text-base font-medium hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-all duration-300"
                                    >
                                        <Upload className="w-4 h-4 mr-2" />
                                        Upload Different Image
                                    </Button>
                                </div>
                            ) : (
                                <div className="text-center relative z-10">
                                    <div className={`w-28 h-28 mx-auto mb-8 rounded-3xl flex items-center justify-center shadow-2xl transition-all duration-700 transform group-hover:scale-110 group-hover:rotate-3
                                        ${dragActive ? 
                                            'bg-gradient-to-br from-blue-500 to-purple-600 rotate-6 scale-110' : 
                                            'bg-gradient-to-br from-slate-700 to-slate-900'}`}>
                                        <FileImage className="w-14 h-14 text-white" />
                                    </div>
                                    <h3 className="text-4xl font-black text-slate-900 mb-4">
                                        {dragActive ? 'Drop it like it\'s hot!' : 'Upload Your Image'}
                                    </h3>
                                    <p className="text-slate-600 text-xl mb-8 max-w-md mx-auto leading-relaxed">
                                        {dragActive ? 
                                            'Release to upload your property photo' :
                                            'Drag & drop your property photo here, or click to browse'}
                                    </p>
                                    <div className="flex items-center justify-center gap-8 text-sm text-slate-500 mb-4">
                                        <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full">
                                            <Image className="w-4 h-4" />
                                            <span>JPG, PNG, WebP</span>
                                        </div>
                                        <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full">
                                            <Upload className="w-4 h-4" />
                                            <span>Max 10MB</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </Card>
                        
                        {errors.image && (
                            <Alert className="border-red-200 bg-red-50 shadow-lg">
                                <AlertCircle className="h-5 w-5 text-red-600" />
                                <AlertDescription className="text-red-700 font-medium">{errors.image}</AlertDescription>
                            </Alert>
                        )}
                    </div>

                    {/* Right Side: Enhanced Options Panel */}
                    <div className="lg:col-span-2 space-y-8">
                        <Card className="p-8 bg-white/80 backdrop-blur-sm border-0 shadow-2xl">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center">
                                    <Sparkles className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-2xl font-black text-slate-900">Customize Text</h3>
                            </div>
                            
                            <div className="space-y-6">
                                {/* Headline */}
                                <div>
                                    <Label className="text-base font-bold text-slate-800 mb-3 block flex items-center gap-2">
                                        <span>Headline Text</span>
                                        <span className="text-red-500">*</span>
                                    </Label>
                                    <Textarea
                                        placeholder="Stunning 3BR Modern Home with City Views"
                                        value={headline}
                                        onChange={(e) => {
                                            setHeadline(e.target.value);
                                            if (errors.headline) setErrors({...errors, headline: undefined});
                                        }}
                                        className={`text-base bg-white/90 border-2 transition-all duration-300 resize-none rounded-xl ${errors.headline ? 'border-red-300 focus:border-red-500' : 'border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100'}`}
                                        rows={3}
                                    />
                                    {errors.headline && (
                                        <p className="text-red-600 text-sm mt-2 font-medium">{errors.headline}</p>
                                    )}
                                </div>
                                
                                {/* Subtext */}
                                <div>
                                    <Label className="text-base font-bold text-slate-800 mb-3 block">
                                        Subtext (Optional)
                                    </Label>
                                    <Input
                                        placeholder="Premium Living • Move-in Ready • Prime Location"
                                        value={subtext}
                                        onChange={(e) => setSubtext(e.target.value)}
                                        className="h-12 text-base bg-white/90 border-2 border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all duration-300 rounded-xl"
                                    />
                                </div>
                                
                                {/* Status Tag */}
                                <div>
                                    <Label className="text-base font-bold text-slate-800 mb-3 block">Status Tag (Optional)</Label>
                                    <Input
                                        placeholder="For Sale, New Listing, Price Reduced"
                                        value={statusTag}
                                        onChange={(e) => setStatusTag(e.target.value)}
                                        className="h-12 text-base bg-white/90 border-2 border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all duration-300 rounded-xl"
                                    />
                                </div>

                                {/* AI Info */}
                                <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-100 rounded-xl">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Wand2 className="w-4 h-4 text-blue-600" />
                                        <span className="text-blue-800 font-bold text-sm">AI Magic</span>
                                    </div>
                                    <p className="text-blue-700 text-sm">
                                        Our AI will generate 3 professional styles: Modern, Minimal, and Luxury
                                    </p>
                                </div>
                            </div>
                        </Card>

                        {/* Generate Button */}
                        <Button
                            onClick={handleGenerate}
                            disabled={isDisabled}
                            size="lg"
                            className={`w-full h-16 text-xl font-black shadow-2xl transition-all duration-300 transform hover:scale-105 rounded-2xl ${
                                isDisabled 
                                    ? 'bg-gray-400 cursor-not-allowed' 
                                    : 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700'
                            } text-white`}
                        >
                            {isProcessing ? (
                                <>
                                    <div className="w-6 h-6 mr-3 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                                    <span>Creating Magic...</span>
                                </>
                            ) : (
                                <>
                                    <Zap className="w-6 h-6 mr-3" />
                                    <span>
                                        {!user ? 'Please Log In to Continue' : 
                                         isLimitReached ? 'Daily Limit Reached' : 
                                         'Generate 3 Professional Designs'}
                                    </span>
                                </>
                            )}
                        </Button>

                        {/* Login prompt or limit message */}
                        {!user && (
                            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-2xl text-center">
                                <p className="text-blue-700 font-medium">
                                    🔐 Login required to generate professional thumbnails
                                </p>
                                {/* Assuming User.login() is provided via context or global scope */}
                                <button 
                                    onClick={() => { /* Implement actual login logic here, e.g., redirect to auth provider */ console.log("Login button clicked"); }}
                                    className="mt-2 text-blue-600 underline hover:no-underline font-semibold"
                                >
                                    Click here to login with Google
                                </button>
                            </div>
                        )}

                        {isLimitReached && user && (
                            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-2xl text-center">
                                <p className="text-red-700 font-medium">
                                    ⏰ Daily limit of 3 generations reached. Reset at midnight!
                                </p>
                            </div>
                        )}

                        {/* Error displays */}
                        {errors.auth && (
                            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-2xl text-center">
                                <p className="text-red-700 font-medium">{errors.auth}</p>
                            </div>
                        )}

                        {errors.limit && (
                            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-2xl text-center">
                                <p className="text-red-700 font-medium">{errors.limit}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
