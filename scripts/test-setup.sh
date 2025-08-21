#!/bin/bash

# Test Setup Script for AI Background Remover

echo "🧪 Testing AI Background Remover setup..."

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Test counter
TESTS_PASSED=0
TESTS_FAILED=0

# Function to run a test
run_test() {
    local test_name="$1"
    local test_command="$2"
    
    echo -n "Testing $test_name... "
    
    if eval "$test_command" > /dev/null 2>&1; then
        echo -e "${GREEN}✅ PASS${NC}"
        ((TESTS_PASSED++))
    else
        echo -e "${RED}❌ FAIL${NC}"
        ((TESTS_FAILED++))
    fi
}

# Test 1: Check if Node.js is installed
run_test "Node.js installation" "node --version"

# Test 2: Check if Python is installed
run_test "Python installation" "python3 --version"

# Test 3: Check if frontend dependencies are installed
run_test "Frontend dependencies" "cd frontend && npm list --depth=0"

# Test 4: Check if backend dependencies are installed
run_test "Backend dependencies" "cd backend && pip list"

# Test 5: Check if environment file exists
run_test "Environment file" "test -f .env"

# Test 6: Check if uploads directory exists
run_test "Uploads directory" "test -d uploads"

# Test 7: Check if Docker is available (optional)
if command -v docker &> /dev/null; then
    run_test "Docker installation" "docker --version"
else
    echo -e "${YELLOW}⚠️  Docker not installed (optional for development)${NC}"
fi

# Test 8: Check if Docker Compose is available (optional)
if command -v docker-compose &> /dev/null; then
    run_test "Docker Compose installation" "docker-compose --version"
else
    echo -e "${YELLOW}⚠️  Docker Compose not installed (optional for development)${NC}"
fi

# Test 9: Check frontend build
echo -n "Testing frontend build... "
cd frontend
if npm run build > /dev/null 2>&1; then
    echo -e "${GREEN}✅ PASS${NC}"
    ((TESTS_PASSED++))
else
    echo -e "${RED}❌ FAIL${NC}"
    ((TESTS_FAILED++))
fi
cd ..

# Test 10: Check backend syntax
echo -n "Testing backend syntax... "
cd backend
if python3 -m py_compile app/main.py; then
    echo -e "${GREEN}✅ PASS${NC}"
    ((TESTS_PASSED++))
else
    echo -e "${RED}❌ FAIL${NC}"
    ((TESTS_FAILED++))
fi
cd ..

echo
echo "📊 Test Results:"
echo -e "${GREEN}✅ Tests Passed: $TESTS_PASSED${NC}"
echo -e "${RED}❌ Tests Failed: $TESTS_FAILED${NC}"

if [ $TESTS_FAILED -eq 0 ]; then
    echo -e "${GREEN}🎉 All tests passed! Your setup is ready.${NC}"
    echo
    echo -e "${GREEN}🚀 You can now start development:${NC}"
    echo -e "   Backend: cd backend && uvicorn app.main:app --reload"
    echo -e "   Frontend: cd frontend && npm run dev"
    echo -e "   Docker: docker-compose up -d"
else
    echo -e "${YELLOW}⚠️  Some tests failed. Please check the setup.${NC}"
    exit 1
fi
