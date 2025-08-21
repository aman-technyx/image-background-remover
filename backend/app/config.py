from pydantic_settings import BaseSettings
from typing import Optional
import os

class Settings(BaseSettings):
    # API Settings
    api_title: str = "AI Background Remover API"
    api_version: str = "1.0.0"
    api_description: str = "Advanced AI-powered background removal service"
    
    # Server Settings
    host: str = "0.0.0.0"
    port: int = 8000
    debug: bool = False
    
    # Security
    secret_key: str = "your-secret-key-change-in-production"
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 30
    
    # File Upload Settings
    max_file_size: int = 10 * 1024 * 1024  # 10MB
    allowed_image_types: list = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"]
    upload_dir: str = "uploads"
    
    # Database
    database_url: str = "sqlite:///./app.db"
    
    # Redis
    redis_url: str = "redis://localhost:6379"
    
    # Rate Limiting
    rate_limit_per_minute: int = 10
    rate_limit_per_hour: int = 100
    
    # AI Model Settings
    model_name: str = "u2net"
    processing_quality: str = "high"
    
    # External Services
    google_analytics_id: Optional[str] = None
    adsense_id: Optional[str] = None
    
    # CORS
    cors_origins: list = ["*"]
    
    class Config:
        env_file = ".env"
        case_sensitive = False
        protected_namespaces = ('settings_',)

# Create settings instance
settings = Settings()

# Ensure upload directory exists
os.makedirs(settings.upload_dir, exist_ok=True)
