from fastapi import FastAPI, HTTPException, Depends, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
import uvicorn
import os
import uuid
from pathlib import Path
from typing import Optional

from .models.background_remover import BackgroundRemover
from .services.image_service import ImageService
from .utils.rate_limiter import RateLimiter
from .utils.file_validator import FileValidator
from .config import settings

# Create upload directory if it doesn't exist
UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)

app = FastAPI(
    title="AI Background Remover API",
    description="Advanced AI-powered background removal service",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure this properly for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount static files
app.mount("/static", StaticFiles(directory="static"), name="static")

# Initialize services
background_remover = BackgroundRemover()
image_service = ImageService()
rate_limiter = RateLimiter()
file_validator = FileValidator()

@app.get("/")
async def root():
    """Root endpoint with API information"""
    return {
        "message": "AI Background Remover API",
        "version": "1.0.0",
        "status": "running",
        "docs": "/docs"
    }

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "service": "background-remover"}

@app.post("/api/remove-background")
async def remove_background(
    file: UploadFile = File(...),
    quality: Optional[str] = "high",
    format: Optional[str] = "png"
):
    """
    Remove background from uploaded image
    
    Args:
        file: Image file to process
        quality: Processing quality (low, medium, high)
        format: Output format (png, jpg, webp)
    
    Returns:
        Processed image file
    """
    try:
        # Validate file
        if not file_validator.is_valid_image(file):
            raise HTTPException(status_code=400, detail="Invalid image file")
        
        if not file_validator.is_valid_size(file):
            raise HTTPException(status_code=400, detail="File too large (max 10MB)")
        
        # Check rate limits (implement based on user plan)
        # rate_limiter.check_limit(user_id)
        
        # Generate unique filename
        file_id = str(uuid.uuid4())
        input_path = UPLOAD_DIR / f"{file_id}_input.{file.filename.split('.')[-1]}"
        output_path = UPLOAD_DIR / f"{file_id}_output.{format}"
        
        # Save uploaded file
        with open(input_path, "wb") as buffer:
            content = await file.read()
            buffer.write(content)
        
        # Process image
        try:
            background_remover.remove_background(
                input_path=str(input_path),
                output_path=str(output_path),
                quality=quality
            )
        except Exception as e:
            # Clean up files
            if input_path.exists():
                input_path.unlink()
            if output_path.exists():
                output_path.unlink()
            raise HTTPException(status_code=500, detail=f"Processing failed: {str(e)}")
        
        # Clean up input file
        if input_path.exists():
            input_path.unlink()
        
        # Return processed image
        return FileResponse(
            path=str(output_path),
            media_type=f"image/{format}",
            filename=f"background_removed.{format}",
            headers={"X-Processed-By": "AI Background Remover"}
        )
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

@app.post("/api/batch-remove")
async def batch_remove_background(files: list[UploadFile] = File(...)):
    """
    Remove background from multiple images
    
    Args:
        files: List of image files to process
    
    Returns:
        ZIP file containing processed images
    """
    try:
        # Validate files
        for file in files:
            if not file_validator.is_valid_image(file):
                raise HTTPException(status_code=400, detail=f"Invalid image file: {file.filename}")
            if not file_validator.is_valid_size(file):
                raise HTTPException(status_code=400, detail=f"File too large: {file.filename}")
        
        # Process batch (implement batch processing logic)
        # This is a simplified version - implement proper batch processing
        
        return {"message": "Batch processing endpoint - implement batch logic"}
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

@app.get("/api/status")
async def get_status():
    """Get service status and statistics"""
    return {
        "status": "operational",
        "uptime": "99.9%",
        "version": "1.0.0",
        "features": [
            "background_removal",
            "batch_processing",
            "multiple_formats",
            "high_quality"
        ]
    }

@app.get("/api/usage")
async def get_usage():
    """Get current usage statistics"""
    return {
        "images_processed_today": 0,
        "images_processed_total": 0,
        "average_processing_time": "3.2s",
        "success_rate": "99.8%"
    }

if __name__ == "__main__":
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )
