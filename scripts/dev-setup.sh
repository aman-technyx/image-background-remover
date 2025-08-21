#!/bin/bash

# Development Setup Script for AI Background Remover

echo "🚀 Setting up AI Background Remover for development..."

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${YELLOW}❌ Node.js is not installed. Please install Node.js 18+ first.${NC}"
    exit 1
fi

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo -e "${YELLOW}❌ Python 3 is not installed. Please install Python 3.8+ first.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Prerequisites check passed${NC}"

# Create environment file if it doesn't exist
if [ ! -f ".env" ]; then
    echo -e "${YELLOW}📝 Creating .env file from template...${NC}"
    cp env.example .env
    echo -e "${GREEN}✅ .env file created. Please edit it with your configuration.${NC}"
else
    echo -e "${GREEN}✅ .env file already exists${NC}"
fi

# Install frontend dependencies
echo -e "${YELLOW}📦 Installing frontend dependencies...${NC}"
cd frontend
npm install
cd ..

# Install backend dependencies
echo -e "${YELLOW}📦 Installing backend dependencies...${NC}"
cd backend
pip install -r requirements.txt
cd ..

# Create uploads directory
echo -e "${YELLOW}📁 Creating uploads directory...${NC}"
mkdir -p uploads
chmod 755 uploads

echo -e "${GREEN}🎉 Development setup completed!${NC}"
echo
echo -e "${GREEN}📋 Next steps:${NC}"
echo -e "   1. Edit .env file with your configuration"
echo -e "   2. Start the backend: cd backend && uvicorn app.main:app --reload"
echo -e "   3. Start the frontend: cd frontend && npm run dev"
echo -e "   4. Open http://localhost:3000 in your browser"
echo
echo -e "${GREEN}🚀 Happy coding!${NC}"
