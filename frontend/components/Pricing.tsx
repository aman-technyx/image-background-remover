'use client'

import { motion } from 'framer-motion'
import { Check, Star } from 'lucide-react'

export default function Pricing() {
    const plans = [
        {
            name: 'Free',
            price: '$0',
            period: 'forever',
            description: 'Perfect for occasional use',
            features: [
                '1 image per day',
                'Basic quality (1024x1024)',
                'PNG download only',
                'Watermark on result',
                'Ad-supported'
            ],
            popular: false,
            cta: 'Start Free',
            color: 'border-gray-200'
        },
        {
            name: 'Premium',
            price: '$9.99',
            period: 'per month',
            description: 'Best for regular users',
            features: [
                'Unlimited images',
                'High quality (4K)',
                'Multiple formats (PNG, JPG, WebP)',
                'No watermark',
                'Priority processing',
                'No ads',
                'Batch processing (up to 10 images)'
            ],
            popular: true,
            cta: 'Start Premium',
            color: 'border-primary-500'
        },
        {
            name: 'Business',
            price: '$29.99',
            period: 'per month',
            description: 'For teams and developers',
            features: [
                'Everything in Premium',
                'API access',
                'Batch processing (unlimited)',
                'White-label solution',
                'Custom branding',
                'Advanced analytics',
                'Priority support',
                'Team collaboration'
            ],
            popular: false,
            cta: 'Start Business',
            color: 'border-gray-200'
        }
    ]

    return (
        <section id="pricing" className="py-20 px-4 bg-gray-50">
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
                        Choose Your Plan
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Start free and upgrade when you need more. All plans include our advanced AI technology.
                    </p>
                </motion.div>

                {/* Pricing Cards */}
                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className={`card relative ${plan.popular ? 'ring-2 ring-primary-500 scale-105' : ''}`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                    <div className="bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                                        <Star size={12} />
                                        <span>Most Popular</span>
                                    </div>
                                </div>
                            )}

                            <div className="text-center mb-8">
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                                <div className="mb-2">
                                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                                    <span className="text-gray-600 ml-1">{plan.period}</span>
                                </div>
                                <p className="text-gray-600">{plan.description}</p>
                            </div>

                            <ul className="space-y-3 mb-8">
                                {plan.features.map((feature) => (
                                    <li key={feature} className="flex items-start space-x-3">
                                        <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                        <span className="text-gray-700">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <button className={`w-full py-3 px-6 rounded-lg font-medium transition-colors duration-200 ${plan.popular
                                    ? 'bg-primary-600 hover:bg-primary-700 text-white'
                                    : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                                }`}>
                                {plan.cta}
                            </button>
                        </motion.div>
                    ))}
                </div>

                {/* FAQ Link */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-center mt-12"
                >
                    <p className="text-gray-600">
                        Have questions? Check out our{' '}
                        <a href="#faq" className="text-primary-600 hover:text-primary-700 font-medium">
                            FAQ section
                        </a>{' '}
                        or contact our support team.
                    </p>
                </motion.div>
            </div>
        </section>
    )
}
