"""
Core exception classes (Task 1).

No business logic here—only shared error types that later components can raise/catch.
"""


class BiddingAssistantError(Exception):
    """Base error for all AI Bidding Assistant exceptions."""


class ConfigurationError(BiddingAssistantError):
    """Raised when configuration is invalid or missing required settings."""


class AuditLogError(BiddingAssistantError):
    """Raised when audit logging fails in a way that should stop processing."""


class WorkPreservationError(BiddingAssistantError):
    """
    Raised when the system cannot preserve work-in-progress after an error.

    See requirements:
    - Requirement 8.1 (preserve work and provide clear error descriptions)
    """


class ComplianceViolationError(BiddingAssistantError):
    """
    Placeholder for future compliance framework (Task 5).

    NOTE: This does NOT implement compliance logic; it's an exception type only.
    """

