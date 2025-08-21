import time
import logging
from typing import Dict, Optional
from collections import defaultdict

class RateLimiter:
    """Simple in-memory rate limiter"""
    
    def __init__(self):
        self.logger = logging.getLogger(__name__)
        
        # Rate limits (requests per time window)
        self.limits = {
            "free": {
                "per_minute": 1,
                "per_hour": 10,
                "per_day": 50
            },
            "premium": {
                "per_minute": 10,
                "per_hour": 100,
                "per_day": 1000
            },
            "business": {
                "per_minute": 100,
                "per_hour": 1000,
                "per_day": 10000
            }
        }
        
        # Store request timestamps
        self.requests: Dict[str, Dict[str, list]] = defaultdict(
            lambda: {"minute": [], "hour": [], "day": []}
        )
    
    def check_limit(self, user_id: str, plan: str = "free") -> bool:
        """
        Check if user has exceeded rate limits
        
        Args:
            user_id: User identifier
            plan: User plan (free, premium, business)
        
        Returns:
            True if request is allowed, False if rate limited
        """
        try:
            current_time = time.time()
            user_limits = self.limits.get(plan, self.limits["free"])
            user_requests = self.requests[user_id]
            
            # Clean old requests
            self._clean_old_requests(user_requests, current_time)
            
            # Check minute limit
            if len(user_requests["minute"]) >= user_limits["per_minute"]:
                self.logger.warning(f"Rate limit exceeded for user {user_id} (minute)")
                return False
            
            # Check hour limit
            if len(user_requests["hour"]) >= user_limits["per_hour"]:
                self.logger.warning(f"Rate limit exceeded for user {user_id} (hour)")
                return False
            
            # Check day limit
            if len(user_requests["day"]) >= user_limits["per_day"]:
                self.logger.warning(f"Rate limit exceeded for user {user_id} (day)")
                return False
            
            # Add current request
            user_requests["minute"].append(current_time)
            user_requests["hour"].append(current_time)
            user_requests["day"].append(current_time)
            
            return True
            
        except Exception as e:
            self.logger.error(f"Rate limit check failed: {e}")
            return True  # Allow request if rate limiting fails
    
    def _clean_old_requests(self, user_requests: Dict[str, list], current_time: float):
        """Remove old requests outside the time windows"""
        # Clean minute requests (older than 60 seconds)
        user_requests["minute"] = [
            req_time for req_time in user_requests["minute"]
            if current_time - req_time < 60
        ]
        
        # Clean hour requests (older than 3600 seconds)
        user_requests["hour"] = [
            req_time for req_time in user_requests["hour"]
            if current_time - req_time < 3600
        ]
        
        # Clean day requests (older than 86400 seconds)
        user_requests["day"] = [
            req_time for req_time in user_requests["day"]
            if current_time - req_time < 86400
        ]
    
    def get_usage(self, user_id: str, plan: str = "free") -> dict:
        """Get current usage statistics for user"""
        try:
            current_time = time.time()
            user_limits = self.limits.get(plan, self.limits["free"])
            user_requests = self.requests[user_id]
            
            # Clean old requests
            self._clean_old_requests(user_requests, current_time)
            
            return {
                "minute_used": len(user_requests["minute"]),
                "minute_limit": user_limits["per_minute"],
                "hour_used": len(user_requests["hour"]),
                "hour_limit": user_limits["per_hour"],
                "day_used": len(user_requests["day"]),
                "day_limit": user_limits["per_day"],
                "plan": plan
            }
            
        except Exception as e:
            self.logger.error(f"Failed to get usage: {e}")
            return {}
    
    def reset_limits(self, user_id: str):
        """Reset rate limits for a user (admin function)"""
        try:
            if user_id in self.requests:
                del self.requests[user_id]
                self.logger.info(f"Rate limits reset for user {user_id}")
        except Exception as e:
            self.logger.error(f"Failed to reset limits: {e}")
    
    def get_all_usage(self) -> dict:
        """Get usage statistics for all users (admin function)"""
        try:
            current_time = time.time()
            all_usage = {}
            
            for user_id, user_requests in self.requests.items():
                self._clean_old_requests(user_requests, current_time)
                all_usage[user_id] = {
                    "minute_requests": len(user_requests["minute"]),
                    "hour_requests": len(user_requests["hour"]),
                    "day_requests": len(user_requests["day"])
                }
            
            return all_usage
            
        except Exception as e:
            self.logger.error(f"Failed to get all usage: {e}")
            return {}
