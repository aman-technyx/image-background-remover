'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp } from 'lucide-react'

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null)

    const faqs = [
        {
            question: 'How does the AI background remover work?',
            answer: 'Our AI uses advanced machine learning algorithms to analyze your image and identify the main subject. It then removes the background while preserving the subject with high accuracy. The process typically takes 3-5 seconds.'
        },
        {
            question: 'What image formats are supported?',
            answer: 'We support all major image formats including JPG, JPEG, PNG, GIF, and WebP. You can download the processed image in PNG, JPG, or WebP formats with transparent backgrounds.'
        },
        {
            question: 'Is there a file size limit?',
            answer: 'Yes, the maximum file size is 10MB for free users. Premium users can upload larger files up to 50MB. We recommend using images with a resolution of at least 512x512 pixels for best results.'
        },
        {
            question: 'How accurate is the background removal?',
            answer: 'Our AI achieves 99% accuracy for most images. The accuracy depends on factors like image quality, subject clarity, and background complexity. For best results, use images with clear subjects and contrasting backgrounds.'
        },
        {
            question: 'Are my images stored on your servers?',
            answer: 'No, we prioritize your privacy. Images are automatically deleted from our servers after processing (usually within 24 hours). We never store or use your images for any other purpose.'
        },
        {
            question: 'Can I remove backgrounds from multiple images at once?',
            answer: 'Batch processing is available for Premium and Business users. Free users can process one image at a time. Premium users can process up to 10 images simultaneously, while Business users have unlimited batch processing.'
        },
        {
            question: 'Do I need to create an account?',
            answer: 'No account is required for basic usage. You can start removing backgrounds immediately. However, creating an account allows you to track your usage, access premium features, and save your processing history.'
        },
        {
            question: 'What\'s the difference between the plans?',
            answer: 'Free plan includes 1 image per day with basic quality. Premium ($9.99/month) offers unlimited images, high quality, multiple formats, and no ads. Business ($29.99/month) adds API access, white-label solutions, and team features.'
        },
        {
            question: 'Can I use the API for my own applications?',
            answer: 'Yes! Business plan subscribers get full API access. You can integrate our background removal service into your own applications, websites, or workflows. We provide comprehensive API documentation and support.'
        },
        {
            question: 'What if I\'m not satisfied with the results?',
            answer: 'We offer a 30-day money-back guarantee for all paid plans. If you\'re not completely satisfied with our service, contact our support team and we\'ll process a full refund.'
        }
    ]

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index)
    }

    return (
        <section id="faq" className="py-20 px-4 bg-white">
            <div className="max-w-4xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-lg text-gray-600">
                        Find answers to common questions about our AI background remover
                    </p>
                </motion.div>

                {/* FAQ Items */}
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="card cursor-pointer hover:shadow-medium transition-shadow duration-200"
                            onClick={() => toggleFAQ(index)}
                        >
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-gray-900 pr-4">
                                    {faq.question}
                                </h3>
                                <div className="flex-shrink-0">
                                    {openIndex === index ? (
                                        <ChevronUp className="w-5 h-5 text-gray-500" />
                                    ) : (
                                        <ChevronDown className="w-5 h-5 text-gray-500" />
                                    )}
                                </div>
                            </div>

                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="pt-4 mt-4 border-t border-gray-200">
                                            <p className="text-gray-600 leading-relaxed">
                                                {faq.answer}
                                            </p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>

                {/* Contact Support */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="text-center mt-16"
                >
                    <div className="card max-w-2xl mx-auto">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                            Still Have Questions?
                        </h3>
                        <p className="text-gray-600 mb-6">
                            Our support team is here to help you get the most out of our AI background remover
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="mailto:support@yourdomain.com"
                                className="btn-primary"
                            >
                                Contact Support
                            </a>
                            <a
                                href="/api-docs"
                                className="btn-outline"
                            >
                                View API Docs
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
