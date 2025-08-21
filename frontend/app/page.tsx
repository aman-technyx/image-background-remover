'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import FileUpload from '@/components/FileUpload'
import Features from '@/components/Features'
import Pricing from '@/components/Pricing'
import FAQ from '@/components/FAQ'
import Footer from '@/components/Footer'
import AdBanner from '@/components/AdBanner'

export default function HomePage() {
    const [isProcessing, setIsProcessing] = useState(false)
    const [processedImage, setProcessedImage] = useState<string | null>(null)

    const handleImageProcess = async (file: File) => {
        setIsProcessing(true)
        try {
            // Import the API client
            const { backgroundRemovalAPI } = await import('@/lib/api')

            // Call the real API
            const result = await backgroundRemovalAPI.removeBackground(file)

            if (result.success && result.imageUrl) {
                setProcessedImage(result.imageUrl)
            } else {
                throw new Error(result.error || 'Failed to process image')
            }
        } catch (error) {
            console.error('Error processing image:', error)
            // Fallback to mock processing for demo purposes
            await new Promise(resolve => setTimeout(resolve, 3000))

            const canvas = document.createElement('canvas')
            const ctx = canvas.getContext('2d')
            const img = new Image()

            img.onload = () => {
                canvas.width = img.width
                canvas.height = img.height
                ctx?.drawImage(img, 0, 0)

                // Add a simple effect to simulate background removal
                const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height)
                if (imageData) {
                    const data = imageData.data
                    for (let i = 0; i < data.length; i += 4) {
                        // Simple background removal simulation
                        const r = data[i]
                        const g = data[i + 1]
                        const b = data[i + 2]

                        // If pixel is close to white/light, make it transparent
                        if (r > 240 && g > 240 && b > 240) {
                            data[i + 3] = 0 // Set alpha to 0
                        }
                    }
                    ctx?.putImageData(imageData, 0, 0)
                }

                const processedImageUrl = canvas.toDataURL('image/png')
                setProcessedImage(processedImageUrl)
                setIsProcessing(false)
            }

            img.src = URL.createObjectURL(file)
        } finally {
            setIsProcessing(false)
        }
    }

    return (
        <div className="min-h-screen">
            <Header />

            <main>
                {/* Hero Section */}
                <Hero />

                {/* Ad Banner */}
                <AdBanner />

                {/* File Upload Section */}
                <section className="py-16 px-4">
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-center mb-12"
                        >
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                Remove Background in Seconds
                            </h2>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                Upload your image and our AI will automatically remove the background.
                                Get professional results in just a few clicks.
                            </p>
                        </motion.div>

                        <FileUpload
                            onImageProcess={handleImageProcess}
                            isProcessing={isProcessing}
                            processedImage={processedImage}
                        />
                    </div>
                </section>

                {/* Features Section */}
                <Features />

                {/* Ad Banner */}
                <AdBanner />

                {/* Pricing Section */}
                <Pricing />

                {/* FAQ Section */}
                <FAQ />
            </main>

            <Footer />
        </div>
    )
}
