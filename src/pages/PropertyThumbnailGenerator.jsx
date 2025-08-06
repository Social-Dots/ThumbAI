import React, { useState, useEffect } from "react";
import { ThumbnailRequest } from "@/api/entities";
import { UsageLimit } from "@/api/entities";
import { User } from "@/api/entities";
import { UploadFile } from "@/api/integrations";

import HeroSection from "../components/hero/HeroSection";
import ImageUploader from "../components/upload/ImageUploader";
import ThumbnailResults from "../components/results/ThumbnailResults";
import NextSteps from "../components/next-steps/NextSteps";
import UsageLimitWarning from "../components/usage/UsageLimitWarning";

export default function PropertyThumbnailGenerator() {
    const [isProcessing, setIsProcessing] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    const [usageCount, setUsageCount] = useState(0);
    const [isLimitReached, setIsLimitReached] = useState(false);

    const DAILY_LIMIT = 3;

    useEffect(() => {
        checkUserAndUsage();
    }, []);

    const checkUserAndUsage = async () => {
        try {
            const currentUser = await User.me();
            setUser(currentUser);
            
            const today = new Date().toISOString().split('T')[0];
            const usageLimits = await UsageLimit.filter({ 
                user_email: currentUser.email, 
                date: today 
            });
            
            const todaysUsage = usageLimits.length > 0 ? usageLimits[0].count : 0;
            setUsageCount(todaysUsage);
            setIsLimitReached(todaysUsage >= DAILY_LIMIT);
        } catch (error) {
            console.log('User not logged in or usage check failed');
            setUser(null);
        }
    };

    const updateUsageCount = async () => {
        if (!user) return;
        
        try {
            const today = new Date().toISOString().split('T')[0];
            const usageLimits = await UsageLimit.filter({ 
                user_email: user.email, 
                date: today 
            });
            
            if (usageLimits.length > 0) {
                const newCount = usageLimits[0].count + 1;
                await UsageLimit.update(usageLimits[0].id, { count: newCount });
                setUsageCount(newCount);
                setIsLimitReached(newCount >= DAILY_LIMIT);
            } else {
                await UsageLimit.create({
                    user_email: user.email,
                    date: today,
                    count: 1
                });
                setUsageCount(1);
                setIsLimitReached(false);
            }
        } catch (error) {
            console.error('Error updating usage count:', error);
        }
    };

    const handleImageUpload = async (image, headline, subtext, status_tag) => {
        if (!user) {
            setError('Please log in to generate thumbnails.');
            return;
        }

        if (isLimitReached) {
            setError('Daily limit of 3 generations reached. Try again tomorrow!');
            return;
        }

        setIsProcessing(true);
        setResult(null);
        setError(null);

        try {
            console.log('Starting image upload process...');
            
            // Upload the file and get the URL
            const { file_url } = await UploadFile({ file: image.file });
            console.log('File uploaded successfully:', file_url);
            
            const thumbnailData = {
                original_image_url: file_url,
                headline: headline.trim(),
                subtext: subtext.trim(),
                status_tag: status_tag?.trim() || '',
            };

            console.log('Creating thumbnail request:', thumbnailData);
            
            // Save to database
            const createdRecord = await ThumbnailRequest.create(thumbnailData);
            console.log('Database record created:', createdRecord);
            
            // Update usage count
            await updateUsageCount();
            
            // Set the result with the database ID and generate all 3 designs
            setResult({ ...thumbnailData, id: createdRecord.id, designsToGenerate: 3 });
            
            // Smooth scroll to results
            setTimeout(() => {
                const resultsElement = document.querySelector('[data-results-section]');
                if (resultsElement) {
                    resultsElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 100);

        } catch (error) {
            console.error('Error processing image:', error);
            setError('Failed to process image. Please try again.');
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="min-h-screen bg-white">
            <HeroSection />
            
            {/* Usage Limit Warning */}
            {user && (
                <UsageLimitWarning 
                    usageCount={usageCount}
                    dailyLimit={DAILY_LIMIT}
                    isLimitReached={isLimitReached}
                />
            )}
            
            <div className="bg-white">
                <ImageUploader 
                    onImageUpload={handleImageUpload}
                    isProcessing={isProcessing}
                    user={user}
                    isLimitReached={isLimitReached}
                />
            </div>
            
            {error && (
                <div className="max-w-4xl mx-auto px-6 py-4">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                        <p className="text-red-700 font-medium">{error}</p>
                        <button 
                            onClick={() => setError(null)}
                            className="mt-2 text-red-600 underline hover:no-underline"
                        >
                            Dismiss
                        </button>
                    </div>
                </div>
            )}
            
            <div data-results-section>
                {result && <ThumbnailResults result={result} />}
            </div>
            
            <NextSteps />
        </div>
    );
}