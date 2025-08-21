'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Menu, X, Download, Settings, User } from 'lucide-react'
import Link from 'next/link'

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const navigation = [
        { name: 'Home', href: '/' },
        { name: 'Features', href: '#features' },
        { name: 'Pricing', href: '#pricing' },
        { name: 'API', href: '/api' },
        { name: 'Blog', href: '/blog' },
    ]

    return (
        <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex items-center"
                    >
                        <Link href="/" className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gradient-to-r from-primary-600 to-purple-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm">AI</span>
                            </div>
                            <span className="text-xl font-bold text-gray-900">Background Remover</span>
                        </Link>
                    </motion.div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-gray-600 hover:text-primary-600 transition-colors duration-200 font-medium"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Desktop Actions */}
                    <div className="hidden md:flex items-center space-x-4">
                        <Link
                            href="/login"
                            className="text-gray-600 hover:text-primary-600 transition-colors duration-200 font-medium"
                        >
                            Sign In
                        </Link>
                        <Link
                            href="/signup"
                            className="btn-primary"
                        >
                            Get Started
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-gray-600 hover:text-primary-600 transition-colors duration-200"
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden border-t border-gray-200"
                    >
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="block px-3 py-2 text-gray-600 hover:text-primary-600 hover:bg-gray-50 rounded-md transition-colors duration-200 font-medium"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}
                            <div className="pt-4 space-y-2">
                                <Link
                                    href="/login"
                                    className="block px-3 py-2 text-gray-600 hover:text-primary-600 hover:bg-gray-50 rounded-md transition-colors duration-200 font-medium"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Sign In
                                </Link>
                                <Link
                                    href="/signup"
                                    className="block px-3 py-2 bg-primary-600 text-white rounded-md font-medium text-center"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Get Started
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </header>
    )
}
