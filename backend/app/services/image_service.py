import cv2
import numpy as np
from PIL import Image
import io
from typing import Tuple, Optional
import logging

class ImageService:
    """Service for image processing and manipulation"""
    
    def __init__(self):
        self.logger = logging.getLogger(__name__)
    
    def validate_image(self, image_data: bytes) -> bool:
        """Validate if the data is a valid image"""
        try:
            image = Image.open(io.BytesIO(image_data))
            image.verify()
            return True
        except Exception as e:
            self.logger.error(f"Image validation failed: {e}")
            return False
    
    def get_image_info(self, image_data: bytes) -> dict:
        """Get image information"""
        try:
            image = Image.open(io.BytesIO(image_data))
            return {
                "format": image.format,
                "mode": image.mode,
                "size": image.size,
                "width": image.width,
                "height": image.height,
                "file_size": len(image_data)
            }
        except Exception as e:
            self.logger.error(f"Failed to get image info: {e}")
            return {}
    
    def resize_image(self, image_data: bytes, max_size: Tuple[int, int]) -> bytes:
        """Resize image to fit within max_size while maintaining aspect ratio"""
        try:
            image = Image.open(io.BytesIO(image_data))
            
            # Calculate new size
            width, height = image.size
            max_width, max_height = max_size
            
            # Calculate scaling factor
            scale = min(max_width / width, max_height / height)
            
            if scale < 1:
                new_width = int(width * scale)
                new_height = int(height * scale)
                image = image.resize((new_width, new_height), Image.Resampling.LANCZOS)
            
            # Convert to bytes
            output = io.BytesIO()
            image.save(output, format=image.format or 'PNG')
            return output.getvalue()
            
        except Exception as e:
            self.logger.error(f"Image resize failed: {e}")
            return image_data
    
    def add_watermark(self, image_data: bytes, watermark_text: str = "AI Background Remover") -> bytes:
        """Add watermark to image"""
        try:
            image = Image.open(io.BytesIO(image_data))
            
            # Convert to RGBA if needed
            if image.mode != 'RGBA':
                image = image.convert('RGBA')
            
            # Create watermark
            from PIL import ImageDraw, ImageFont
            
            # Create a new image for the watermark
            watermark = Image.new('RGBA', image.size, (0, 0, 0, 0))
            draw = ImageDraw.Draw(watermark)
            
            # Try to use a default font
            try:
                font = ImageFont.truetype("arial.ttf", 24)
            except:
                font = ImageFont.load_default()
            
            # Get text size
            bbox = draw.textbbox((0, 0), watermark_text, font=font)
            text_width = bbox[2] - bbox[0]
            text_height = bbox[3] - bbox[1]
            
            # Position watermark in bottom right
            x = image.width - text_width - 20
            y = image.height - text_height - 20
            
            # Draw watermark with semi-transparent background
            draw.rectangle([x-5, y-5, x+text_width+5, y+text_height+5], 
                         fill=(0, 0, 0, 100))
            draw.text((x, y), watermark_text, font=font, fill=(255, 255, 255, 200))
            
            # Composite watermark onto image
            result = Image.alpha_composite(image, watermark)
            
            # Convert to bytes
            output = io.BytesIO()
            result.save(output, format='PNG')
            return output.getvalue()
            
        except Exception as e:
            self.logger.error(f"Watermark addition failed: {e}")
            return image_data
    
    def convert_format(self, image_data: bytes, target_format: str) -> bytes:
        """Convert image to target format"""
        try:
            image = Image.open(io.BytesIO(image_data))
            
            output = io.BytesIO()
            
            if target_format.lower() == 'png':
                image.save(output, format='PNG')
            elif target_format.lower() in ['jpg', 'jpeg']:
                # Convert to RGB if needed
                if image.mode in ('RGBA', 'LA', 'P'):
                    background = Image.new('RGB', image.size, (255, 255, 255))
                    background.paste(image, mask=image.split()[-1] if image.mode == 'RGBA' else None)
                    image = background
                image.save(output, format='JPEG', quality=95)
            elif target_format.lower() == 'webp':
                image.save(output, format='WebP', quality=95)
            else:
                raise ValueError(f"Unsupported format: {target_format}")
            
            return output.getvalue()
            
        except Exception as e:
            self.logger.error(f"Format conversion failed: {e}")
            return image_data
    
    def optimize_image(self, image_data: bytes, quality: int = 85) -> bytes:
        """Optimize image for web delivery"""
        try:
            image = Image.open(io.BytesIO(image_data))
            
            output = io.BytesIO()
            
            # Save with optimization
            if image.format == 'JPEG':
                image.save(output, format='JPEG', quality=quality, optimize=True)
            elif image.format == 'PNG':
                image.save(output, format='PNG', optimize=True)
            else:
                image.save(output, format=image.format or 'PNG')
            
            return output.getvalue()
            
        except Exception as e:
            self.logger.error(f"Image optimization failed: {e}")
            return image_data
    
    def create_thumbnail(self, image_data: bytes, size: Tuple[int, int] = (200, 200)) -> bytes:
        """Create thumbnail of image"""
        try:
            image = Image.open(io.BytesIO(image_data))
            
            # Create thumbnail
            image.thumbnail(size, Image.Resampling.LANCZOS)
            
            output = io.BytesIO()
            image.save(output, format=image.format or 'PNG')
            return output.getvalue()
            
        except Exception as e:
            self.logger.error(f"Thumbnail creation failed: {e}")
            return image_data
