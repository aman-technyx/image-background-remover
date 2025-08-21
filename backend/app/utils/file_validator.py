from fastapi import UploadFile
import magic
from typing import List
import logging

class FileValidator:
    """Utility for validating uploaded files"""
    
    def __init__(self):
        self.logger = logging.getLogger(__name__)
        
        # Allowed image MIME types
        self.allowed_types = [
            'image/jpeg',
            'image/jpg', 
            'image/png',
            'image/gif',
            'image/webp'
        ]
        
        # File extensions
        self.allowed_extensions = [
            '.jpg', '.jpeg', '.png', '.gif', '.webp'
        ]
        
        # Maximum file size (10MB)
        self.max_file_size = 10 * 1024 * 1024
    
    def is_valid_image(self, file: UploadFile) -> bool:
        """Check if uploaded file is a valid image"""
        try:
            # Check file extension
            if not self._has_valid_extension(file.filename):
                self.logger.warning(f"Invalid file extension: {file.filename}")
                return False
            
            # Check MIME type
            if not self._has_valid_mime_type(file):
                self.logger.warning(f"Invalid MIME type: {file.content_type}")
                return False
            
            return True
            
        except Exception as e:
            self.logger.error(f"File validation error: {e}")
            return False
    
    def is_valid_size(self, file: UploadFile) -> bool:
        """Check if file size is within limits"""
        try:
            # Read file size
            file.file.seek(0, 2)  # Seek to end
            file_size = file.file.tell()
            file.file.seek(0)  # Reset to beginning
            
            if file_size > self.max_file_size:
                self.logger.warning(f"File too large: {file_size} bytes")
                return False
            
            return True
            
        except Exception as e:
            self.logger.error(f"Size validation error: {e}")
            return False
    
    def _has_valid_extension(self, filename: str) -> bool:
        """Check if filename has valid extension"""
        if not filename:
            return False
        
        # Get file extension
        extension = filename.lower()
        if '.' in extension:
            extension = '.' + extension.split('.')[-1]
        else:
            extension = ''
        
        return extension in self.allowed_extensions
    
    def _has_valid_mime_type(self, file: UploadFile) -> bool:
        """Check if file has valid MIME type"""
        try:
            # Check content type
            if file.content_type and file.content_type.lower() in self.allowed_types:
                return True
            
            # If content type is not available or invalid, check file magic
            file.file.seek(0)
            file_content = file.file.read(2048)  # Read first 2KB
            file.file.seek(0)  # Reset to beginning
            
            mime_type = magic.from_buffer(file_content, mime=True)
            
            return mime_type.lower() in self.allowed_types
            
        except Exception as e:
            self.logger.error(f"MIME type validation error: {e}")
            return False
    
    def get_file_info(self, file: UploadFile) -> dict:
        """Get information about the uploaded file"""
        try:
            file.file.seek(0, 2)  # Seek to end
            file_size = file.file.tell()
            file.file.seek(0)  # Reset to beginning
            
            return {
                "filename": file.filename,
                "content_type": file.content_type,
                "size": file_size,
                "size_mb": round(file_size / (1024 * 1024), 2),
                "is_valid": self.is_valid_image(file) and self.is_valid_size(file)
            }
            
        except Exception as e:
            self.logger.error(f"Error getting file info: {e}")
            return {}
    
    def validate_batch(self, files: List[UploadFile]) -> dict:
        """Validate multiple files"""
        results = {
            "valid_files": [],
            "invalid_files": [],
            "total_files": len(files),
            "total_size": 0
        }
        
        for file in files:
            file_info = self.get_file_info(file)
            
            if file_info.get("is_valid", False):
                results["valid_files"].append(file_info)
                results["total_size"] += file_info.get("size", 0)
            else:
                results["invalid_files"].append(file_info)
        
        return results
