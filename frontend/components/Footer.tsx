'use client'

import { motion } from 'framer-motion'
import { Github, Twitter, Linkedin, Mail, Heart } from 'lucide-react'
import Link from 'next/link'

export default function Footer() {
    const currentYear = new Date().getFullYear()

    const footerLinks = {
        product: [
            { name: 'Features', href: '#features' },
            { name: 'Pricing', href: '#pricing' },
            { name: 'API', href: '/api' },
            { name: 'Documentation', href: '/docs' },
        ],
        company: [
            { name: 'About', href: '/about' },
            { name: 'Blog', href: '/blog' },
            { name: 'Careers', href: '/careers' },
            { name: 'Contact', href: '/contact' },
        ],
        support: [
            { name: 'Help Center', href: '/help' },
            { name: 'FAQ', href: '#faq' },
            { name: 'Status', href: '/status' },
            { name: 'Support', href: 'mailto:support@yourdomain.com' },
        ],
        legal: [
            { name: 'Privacy Policy', href: '/privacy' },
            { name: 'Terms of Service', href: '/terms' },
            { name: 'Cookie Policy', href: '/cookies' },
            { name: 'GDPR', href: '/gdpr' },
        ],
    }

    const socialLinks = [
        { name: 'GitHub', href: 'https://github.com', icon: Github },
        { name: 'Twitter', href: 'https://twitter.com', icon: Twitter },
        { name: 'LinkedIn', href: 'https://linkedin.com', icon: Linkedin },
        { name: 'Email', href: 'mailto:hello@yourdomain.com', icon: Mail },
    ]

    return (
        <footer className="bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="flex items-center space-x-2 mb-4">
                                <div className="w-8 h-8 bg-gradient-to-r from-primary-600 to-purple-600 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-sm">AI</span>
                                </div>
                                <span className="text-xl font-bold">Background Remover</span>
                            </div>
                            <p className="text-gray-400 mb-6 max-w-md">
                                Transform your images instantly with our advanced AI technology.
                                Remove backgrounds from photos in seconds, not hours.
                            </p>

                            {/* Social Links */}
                            <div className="flex space-x-4">
                                {socialLinks.map((social) => (
                                    <a
                                        key={social.name}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-400 hover:text-white transition-colors duration-200"
                                    >
                                        <social.icon size={20} />
                                    </a>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Product Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        <h3 className="text-lg font-semibold mb-4">Product</h3>
                        <ul className="space-y-2">
                            {footerLinks.product.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 hover:text-white transition-colors duration-200"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Company Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <h3 className="text-lg font-semibold mb-4">Company</h3>
                        <ul className="space-y-2">
                            {footerLinks.company.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 hover:text-white transition-colors duration-200"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Support Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <h3 className="text-lg font-semibold mb-4">Support</h3>
                        <ul className="space-y-2">
                            {footerLinks.support.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 hover:text-white transition-colors duration-200"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>

                {/* Bottom Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="border-t border-gray-800 pt-8"
                >
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        {/* Copyright */}
                        <div className="flex items-center space-x-2 text-gray-400">
                            <span>© {currentYear} Background Remover. All rights reserved.</span>
                        </div>

                        {/* Legal Links */}
                        <div className="flex flex-wrap justify-center md:justify-end space-x-6">
                            {footerLinks.legal.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Made with Love */}
                    <div className="text-center mt-8 pt-8 border-t border-gray-800">
                        <p className="text-gray-400 text-sm">
                            Made with <Heart className="inline w-4 h-4 text-red-500" /> for creators worldwide
                        </p>
                    </div>
                </motion.div>
            </div>
        </footer>
    )
}
