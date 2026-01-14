# MOCK OTP SERVICE (SAFE FOR MVP / HACKATHON)

_otp_store = {}


def send_otp(phone: str):
    _otp_store[phone] = "123456"  # mock OTP
    print(f"[DEV OTP] {phone} → 123456")


def verify_otp(phone: str, otp: str) -> bool:
    return _otp_store.get(phone) == otp
