'use client'

import { motion } from 'framer-motion'
import { Upload, Zap, Download, Shield } from 'lucide-react'
import Link from 'next/link'

export default function Hero() {
    const features = [
        {
            icon: Upload,
            title: 'Upload Image',
            description: 'Drag & drop or click to upload your image'
        },
        {
            icon: Zap,
            title: 'AI Processing',
            description: 'Our AI removes background in seconds'
        },
        {
            icon: Download,
            title: 'Download Result',
            description: 'Get your image with transparent background'
        }
    ]

    return (
        <section className="relative py-20 px-4 overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50" />

            {/* Floating elements */}
            <div className="absolute top-20 left-10 w-20 h-20 bg-primary-200 rounded-full opacity-20 animate-pulse" />
            <div className="absolute top-40 right-20 w-16 h-16 bg-purple-200 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '1s' }} />
            <div className="absolute bottom-20 left-20 w-12 h-12 bg-blue-200 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '2s' }} />

            <div className="relative max-w-7xl mx-auto">
                <div className="text-center">
                    {/* Main heading */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="mb-8"
                    >
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
                            Remove Backgrounds with{' '}
                            <span className="text-gradient">AI Magic</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            Transform your images instantly with our advanced AI technology.
                            Remove backgrounds from photos in seconds, not hours.
                        </p>
                    </motion.div>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
                    >
                        <Link
                            href="#upload"
                            className="btn-primary text-lg px-8 py-4 flex items-center space-x-2"
                        >
                            <Upload size={20} />
                            <span>Start Removing Background</span>
                        </Link>
                        <Link
                            href="#features"
                            className="btn-outline text-lg px-8 py-4"
                        >
                            Learn More
                        </Link>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-16"
                    >
                        <div className="text-center">
                            <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">1M+</div>
                            <div className="text-gray-600">Images Processed</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">50K+</div>
                            <div className="text-gray-600">Happy Users</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">3s</div>
                            <div className="text-gray-600">Average Time</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">99%</div>
                            <div className="text-gray-600">Accuracy</div>
                        </div>
                    </motion.div>

                    {/* Features */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto"
                    >
                        {features.map((feature, index) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                                className="card text-center hover:shadow-large transition-shadow duration-300"
                            >
                                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <feature.icon className="w-8 h-8 text-primary-600" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600">
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Trust indicators */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 1.2 }}
                        className="mt-16 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-gray-500"
                    >
                        <div className="flex items-center space-x-2">
                            <Shield size={16} />
                            <span className="text-sm">Secure & Private</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Zap size={16} />
                            <span className="text-sm">Lightning Fast</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Download size={16} />
                            <span className="text-sm">Free Downloads</span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
