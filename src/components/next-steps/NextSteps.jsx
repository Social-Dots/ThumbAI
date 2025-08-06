import React, { useState } from "react";
import { WaitlistUser } from "@/api/entities";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { CheckCircle, Mail, Calendar as CalendarIcon, Loader2, Users, Zap, Sparkles, ArrowRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";

const WaitlistTab = () => {
    const [formData, setFormData] = useState({ full_name: "", email: "", company: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState("");

    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        
        if (!formData.full_name.trim()) {
            setError("Please enter your full name");
            return;
        }
        if (!formData.email.trim()) {
            setError("Please enter your email address");
            return;
        }
        if (!validateEmail(formData.email)) {
            setError("Please enter a valid email address");
            return;
        }

        setIsSubmitting(true);
        try {
            await WaitlistUser.create({
                full_name: formData.full_name.trim(),
                email: formData.email.trim(),
                company: formData.company.trim() || undefined
            });
            setIsSubmitted(true);
        } catch (error) {
            console.error('Error submitting:', error);
            setError("Failed to join waitlist. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleInputChange = (field, value) => {
        setFormData({...formData, [field]: value});
        if (error) setError(""); // Clear error when user types
    };

    if (isSubmitted) {
        return (
            <Card className="p-12 text-center bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200/50 shadow-2xl rounded-3xl">
                <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <CheckCircle className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-3xl font-black text-slate-900 mb-4">Welcome to the Future!</h3>
                <p className="text-xl text-slate-700 mb-2 font-semibold">Thank you for joining us, {formData.full_name}!</p>
                <p className="text-lg text-slate-600 mb-6">We'll notify you at <span className="font-semibold text-green-700">{formData.email}</span> when we launch.</p>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full text-green-700 font-medium">
                    <Sparkles className="w-4 h-4" />
                    <span>You're on the list!</span>
                </div>
            </Card>
        );
    }

    return (
        <Card className="p-8 bg-white/80 backdrop-blur-xl border-2 border-white/20 shadow-2xl rounded-3xl">
            <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-2">Join the Waitlist</h3>
                <p className="text-slate-600 font-medium">Be the first to know when ThumbAI launches</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                    <Alert className="border-red-200 bg-red-50 rounded-2xl shadow-lg">
                        <AlertDescription className="text-red-700 font-medium">{error}</AlertDescription>
                    </Alert>
                )}
                
                <div className="space-y-4">
                    <Input 
                        placeholder="Full Name *" 
                        value={formData.full_name} 
                        onChange={(e) => handleInputChange('full_name', e.target.value)}
                        className="h-14 text-base bg-white/90 border-2 border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all duration-300 rounded-2xl font-medium"
                        disabled={isSubmitting}
                    />
                    <Input 
                        type="email" 
                        placeholder="Email Address *" 
                        value={formData.email} 
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="h-14 text-base bg-white/90 border-2 border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all duration-300 rounded-2xl font-medium"
                        disabled={isSubmitting}
                    />
                    <Input 
                        placeholder="Company Name (Optional)" 
                        value={formData.company} 
                        onChange={(e) => handleInputChange('company', e.target.value)}
                        className="h-14 text-base bg-white/90 border-2 border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all duration-300 rounded-2xl font-medium"
                        disabled={isSubmitting}
                    />
                </div>

                <Button 
                    type="submit" 
                    disabled={isSubmitting} 
                    size="lg" 
                    className="w-full h-16 text-lg font-black bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 rounded-2xl shadow-2xl transition-all duration-300 transform hover:scale-105"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                            Joining Waitlist...
                        </>
                    ) : (
                        <>
                            <Mail className="w-5 h-5 mr-3" />
                            Join Waitlist
                            <ArrowRight className="w-5 h-5 ml-3" />
                        </>
                    )}
                </Button>
            </form>
        </Card>
    );
}

const BookingTab = () => {
    return (
        <Card className="p-2 bg-white/80 backdrop-blur-xl border-2 border-white/20 shadow-2xl rounded-3xl overflow-hidden">
            <div className="text-center mb-6 p-6">
                <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <CalendarIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-2">Book Discovery Call</h3>
                <p className="text-slate-600 font-medium">Schedule a meeting to explore AI solutions for your business</p>
            </div>
            
            <div className="rounded-2xl overflow-hidden border-2 border-slate-100">
                <iframe 
                    src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ0mjuWKq-Mbd-H3agsK1Ub6itz2xFk9h8SADaxjoSzzLkva8nSTAeV-eBKNcTDm9LbdD87bj9vP?gv=true" 
                    style={{ border: 0 }} 
                    width="100%" 
                    height="600" 
                    frameBorder="0">
                </iframe>
            </div>
        </Card>
    );
}

export default function NextSteps() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0">
                <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-indigo-400/5 to-purple-400/5 rounded-full blur-3xl animate-pulse delay-500"></div>
            </div>

            {/* Grid pattern overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px]"></div>
            
            <div className="relative z-10 max-w-6xl mx-auto px-6 py-24">
                {/* Section Header */}
                <div className="text-center mb-20">
                    <div className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 text-white font-semibold text-sm mb-8 shadow-2xl">
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                        <Zap className="w-4 h-4" />
                        <span>What's Next?</span>
                        <Sparkles className="w-4 h-4" />
                    </div>
                    
                    <h2 className="text-6xl lg:text-7xl font-black text-white mb-8 tracking-tight">
                        Ready for
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"> More Magic?</span>
                    </h2>
                    <p className="text-xl text-slate-300 mb-6 max-w-4xl mx-auto leading-relaxed">
                        Interested in PropThumb AI? Join our waitlist for launch updates, or book a discovery call 
                        to see how you can implement powerful AI solutions in your own system.
                    </p>
                </div>

                {/* Tabs */}
                <div className="max-w-4xl mx-auto">
                    <Tabs defaultValue="waitlist" className="w-full">
                        <TabsList className="grid w-full grid-cols-2 h-16 mb-12 bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-2">
                            <TabsTrigger 
                                value="waitlist" 
                                className="h-full text-lg font-bold rounded-2xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white text-white/70 transition-all duration-300"
                            >
                                <Mail className="w-5 h-5 mr-3" />
                                Join Waitlist
                            </TabsTrigger>
                            <TabsTrigger 
                                value="booking" 
                                className="h-full text-lg font-bold rounded-2xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-600 data-[state=active]:text-white text-white/70 transition-all duration-300"
                            >
                                <CalendarIcon className="w-5 h-5 mr-3" />
                                Book Discovery Call
                            </TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="waitlist" className="mt-0">
                            <WaitlistTab />
                        </TabsContent>
                        
                        <TabsContent value="booking" className="mt-0">
                            <BookingTab />
                        </TabsContent>
                    </Tabs>
                </div>

                {/* Bottom Features */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-20">
                    <div className="p-8 bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 hover:bg-white/10 transition-all duration-300 text-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                            <Zap className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="font-black text-white mb-3 text-xl">Lightning Fast</h3>
                        <p className="text-slate-400 leading-relaxed">Get professional thumbnails in under 5 seconds with our advanced AI technology</p>
                    </div>
                    
                    <div className="p-8 bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 hover:bg-white/10 transition-all duration-300 text-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                            <Sparkles className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="font-black text-white mb-3 text-xl">AI-Powered</h3>
                        <p className="text-slate-400 leading-relaxed">Smart design automation that understands real estate marketing best practices</p>
                    </div>
                    
                    <div className="p-8 bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 hover:bg-white/10 transition-all duration-300 text-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-pink-600 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                            <Users className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="font-black text-white mb-3 text-xl">Professional Quality</h3>
                        <p className="text-slate-400 leading-relaxed">High-resolution outputs ready for marketing campaigns and social media</p>
                    </div>
                </div>
            </div>
        </div>
    );
}