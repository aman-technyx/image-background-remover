'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useDropzone } from 'react-dropzone'
import { Upload, X, Download, RefreshCw, Image, CheckCircle } from 'lucide-react'
import toast from 'react-hot-toast'

interface FileUploadProps {
    onImageProcess: (file: File) => Promise<void>
    isProcessing: boolean
    processedImage: string | null
}

export default function FileUpload({ onImageProcess, isProcessing, processedImage }: FileUploadProps) {
    const [uploadedFile, setUploadedFile] = useState<File | null>(null)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0]
        if (file) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                toast.error('Please upload an image file')
                return
            }

            // Validate file size (10MB limit)
            if (file.size > 10 * 1024 * 1024) {
                toast.error('File size must be less than 10MB')
                return
            }

            setUploadedFile(file)
            const url = URL.createObjectURL(file)
            setPreviewUrl(url)
            toast.success('Image uploaded successfully!')
        }
    }, [])

    const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
        },
        maxFiles: 1,
        disabled: isProcessing
    })

    const handleProcess = async () => {
        if (!uploadedFile) return

        try {
            await onImageProcess(uploadedFile)
            toast.success('Background removed successfully!')
        } catch (error) {
            toast.error('Failed to process image. Please try again.')
        }
    }

    const handleReset = () => {
        setUploadedFile(null)
        setPreviewUrl(null)
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl)
        }
    }

    const handleDownload = () => {
        if (!processedImage) return

        const link = document.createElement('a')
        link.href = processedImage
        link.download = `background-removed-${uploadedFile?.name || 'image'}.png`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        toast.success('Image downloaded!')
    }

    return (
        <div className="space-y-8">
            {/* Upload Area */}
            <AnimatePresence mode="wait">
                {!uploadedFile ? (
                    <motion.div
                        key="upload"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div
                            {...getRootProps()}
                            className={`dropzone ${isDragActive ? 'dropzone-active' : ''
                                } ${isDragReject ? 'dropzone-reject' : ''
                                } ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                        >
                            <input {...getInputProps()} />
                            <div className="space-y-4">
                                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto">
                                    <Upload className="w-8 h-8 text-primary-600" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                        {isDragActive ? 'Drop your image here' : 'Upload your image'}
                                    </h3>
                                    <p className="text-gray-600 mb-4">
                                        Drag and drop your image here, or click to browse
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Supports: JPG, PNG, GIF, WebP (Max 10MB)
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="preview"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                    >
                        {/* File Info */}
                        <div className="card">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <Image className="w-8 h-8 text-primary-600" />
                                    <div>
                                        <h3 className="font-semibold text-gray-900">{uploadedFile.name}</h3>
                                        <p className="text-sm text-gray-500">
                                            {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={handleReset}
                                    className="text-gray-400 hover:text-gray-600 transition-colors"
                                    disabled={isProcessing}
                                >
                                    <X size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Image Preview */}
                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Original Image */}
                            <div className="card">
                                <h4 className="font-semibold text-gray-900 mb-4">Original Image</h4>
                                <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                                    <img
                                        src={previewUrl || ''}
                                        alt="Original"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>

                            {/* Processed Image */}
                            <div className="card">
                                <h4 className="font-semibold text-gray-900 mb-4">Processed Image</h4>
                                <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                                    {isProcessing ? (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <div className="text-center">
                                                <RefreshCw className="w-8 h-8 text-primary-600 animate-spin mx-auto mb-2" />
                                                <p className="text-gray-600">Processing...</p>
                                            </div>
                                        </div>
                                    ) : processedImage ? (
                                        <div className="relative">
                                            <img
                                                src={processedImage}
                                                alt="Processed"
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute top-2 right-2">
                                                <CheckCircle className="w-6 h-6 text-green-500" />
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                                            <p>Click process to remove background</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            {!processedImage && !isProcessing && (
                                <button
                                    onClick={handleProcess}
                                    className="btn-primary flex items-center justify-center space-x-2"
                                    disabled={isProcessing}
                                >
                                    <RefreshCw className="w-5 h-5" />
                                    <span>Remove Background</span>
                                </button>
                            )}

                            {processedImage && (
                                <button
                                    onClick={handleDownload}
                                    className="btn-primary flex items-center justify-center space-x-2"
                                >
                                    <Download className="w-5 h-5" />
                                    <span>Download Image</span>
                                </button>
                            )}

                            <button
                                onClick={handleReset}
                                className="btn-secondary"
                                disabled={isProcessing}
                            >
                                Upload New Image
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Processing Status */}
            {isProcessing && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="card text-center"
                >
                    <div className="flex items-center justify-center space-x-3">
                        <RefreshCw className="w-6 h-6 text-primary-600 animate-spin" />
                        <div>
                            <h3 className="font-semibold text-gray-900">Processing your image...</h3>
                            <p className="text-gray-600">This usually takes 3-5 seconds</p>
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    )
}
