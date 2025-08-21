'use client'

import { motion } from 'framer-motion'
import { Zap, Shield, Download, Smartphone, Palette, Globe } from 'lucide-react'

export default function Features() {
    const features = [
        {
            icon: Zap,
            title: 'Lightning Fast',
            description: 'Process images in just 3-5 seconds with our optimized AI algorithms',
            color: 'text-yellow-600',
            bgColor: 'bg-yellow-100'
        },
        {
            icon: Shield,
            title: 'Secure & Private',
            description: 'Your images are automatically deleted after processing. We never store your data.',
            color: 'text-green-600',
            bgColor: 'bg-green-100'
        },
        {
            icon: Download,
            title: 'Multiple Formats',
            description: 'Download in PNG, JPG, or WebP formats with transparent backgrounds',
            color: 'text-blue-600',
            bgColor: 'bg-blue-100'
        },
        {
            icon: Smartphone,
            title: 'Mobile Optimized',
            description: 'Works perfectly on all devices - desktop, tablet, and mobile',
            color: 'text-purple-600',
            bgColor: 'bg-purple-100'
        },
        {
            icon: Palette,
            title: 'High Quality',
            description: 'Get professional-grade results with 99% accuracy background removal',
            color: 'text-pink-600',
            bgColor: 'bg-pink-100'
        },
        {
            icon: Globe,
            title: 'No Registration',
            description: 'Start using immediately - no signup required for basic features',
            color: 'text-indigo-600',
            bgColor: 'bg-indigo-100'
        }
    ]

    return (
        <section id="features" className="py-20 px-4 bg-white">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Why Choose Our AI Background Remover?
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Experience the most advanced background removal technology with features designed for professionals and casual users alike.
                    </p>
                </motion.div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="card hover:shadow-large transition-all duration-300 hover:-translate-y-1"
                        >
                            <div className={`w-12 h-12 ${feature.bgColor} rounded-lg flex items-center justify-center mb-4`}>
                                <feature.icon className={`w-6 h-6 ${feature.color}`} />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Before/After Example */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="mt-20"
                >
                    <div className="text-center mb-12">
                        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                            See the Magic in Action
                        </h3>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Watch how our AI transforms your images with just one click
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {/* Before */}
                        <div className="card text-center">
                            <h4 className="font-semibold text-gray-900 mb-4">Before</h4>
                            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
                                <div className="w-full h-full bg-gradient-to-br from-blue-200 to-purple-200 flex items-center justify-center">
                                    <span className="text-gray-500">Sample Image with Background</span>
                                </div>
                            </div>
                            <p className="text-sm text-gray-600">Original image with background</p>
                        </div>

                        {/* After */}
                        <div className="card text-center">
                            <h4 className="font-semibold text-gray-900 mb-4">After</h4>
                            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4 relative">
                                <div className="w-full h-full bg-gradient-to-br from-blue-200 to-purple-200 flex items-center justify-center">
                                    <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center">
                                        <span className="text-gray-500 text-sm text-center">Transparent Background</span>
                                    </div>
                                </div>
                            </div>
                            <p className="text-sm text-gray-600">Background removed with AI</p>
                        </div>
                    </div>
                </motion.div>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="text-center mt-16"
                >
                    <div className="card max-w-2xl mx-auto">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                            Ready to Transform Your Images?
                        </h3>
                        <p className="text-gray-600 mb-6">
                            Join thousands of users who trust our AI for their background removal needs
                        </p>
                        <button className="btn-primary">
                            Start Removing Backgrounds Now
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
