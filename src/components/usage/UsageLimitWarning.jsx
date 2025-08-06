import React from "react";
import { Card } from "@/components/ui/card";
import { AlertTriangle, CheckCircle, Clock } from "lucide-react";

export default function UsageLimitWarning({ usageCount, dailyLimit, isLimitReached }) {
    const remainingGenerations = dailyLimit - usageCount;
    
    if (usageCount === 0) return null;

    return (
        <div className="max-w-4xl mx-auto px-6 py-4">
            <Card className={`p-4 text-center border-2 ${
                isLimitReached 
                    ? 'bg-red-50 border-red-200' 
                    : remainingGenerations === 1 
                    ? 'bg-yellow-50 border-yellow-200'
                    : 'bg-blue-50 border-blue-200'
            }`}>
                <div className="flex items-center justify-center gap-3">
                    {isLimitReached ? (
                        <>
                            <AlertTriangle className="w-5 h-5 text-red-600" />
                            <span className="font-semibold text-red-700">
                                Daily limit reached ({usageCount}/{dailyLimit})
                            </span>
                            <Clock className="w-4 h-4 text-red-500" />
                            <span className="text-red-600 text-sm">Resets at midnight</span>
                        </>
                    ) : remainingGenerations === 1 ? (
                        <>
                            <AlertTriangle className="w-5 h-5 text-yellow-600" />
                            <span className="font-semibold text-yellow-700">
                                {remainingGenerations} generation remaining today ({usageCount}/{dailyLimit})
                            </span>
                        </>
                    ) : (
                        <>
                            <CheckCircle className="w-5 h-5 text-blue-600" />
                            <span className="font-semibold text-blue-700">
                                {remainingGenerations} generations remaining today ({usageCount}/{dailyLimit})
                            </span>
                        </>
                    )}
                </div>
            </Card>
        </div>
    );
}