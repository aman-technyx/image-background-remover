'use client'

import { motion } from 'framer-motion'

export default function AdBanner() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="py-8 px-4"
        >
            <div className="max-w-7xl mx-auto">
                {/* Google AdSense Banner */}
                <div className="bg-gray-100 rounded-lg p-4 text-center">
                    <div className="w-full h-20 bg-gray-200 rounded flex items-center justify-center">
                        <span className="text-gray-500 text-sm">
                            Advertisement Space
                        </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                        AdSense Banner (728x90)
                    </p>
                </div>
            </div>
        </motion.div>
    )
}
