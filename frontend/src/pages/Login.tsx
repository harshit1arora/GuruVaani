import { ArrowRight, Phone } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useLanguage } from "@/contexts/LanguageContext";
import { sendOtp, verifyOtp } from "@/lib/api";
import Logo from "@/components/Logo";

const Login = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSendOTP = async () => {
    if (phone.length !== 10) return;
    
    setLoading(true);
    setError("");
    
    try {
      await sendOtp(phone);
      setStep("otp");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) return;
    
    setLoading(true);
    setError("");
    
    try {
      const response = await verifyOtp(phone, otp);
      localStorage.setItem("access_token", response.access_token);
      navigate("/profile-setup");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGuestMode = () => {
    navigate("/home");
  };

  return (
    <div className="app-container min-h-screen flex flex-col bg-gradient-to-b from-background to-background/95">
      {/* Header */}
      <header className="px-5 pt-20 pb-10 text-center animate-fade-in-up">
        <Logo size="xl" backgroundColor="bg-gradient-to-br from-primary to-primary/80" textColor="text-primary-foreground" className="animate-float mx-auto mb-6" />
        <h1 className="text-2xl font-bold text-foreground mb-2">
          {t.login.appName}
        </h1>
        <p className="text-muted-foreground max-w-xs mx-auto">
          {t.login.tagline}
        </p>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-5">
        {/* Login Card */}
        <div className="bg-card rounded-2xl shadow-xl p-6 border border-border hover:shadow-2xl transition-all duration-300 animate-scale-hover">
          {error && (
            <div className="mb-4 p-3 bg-destructive/10 text-destructive rounded-lg text-sm">
              {error}
            </div>
          )}
          {step === "phone" ? (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-foreground mb-2">
                  Login to continue support
                </h2>
                <p className="text-sm text-muted-foreground">
                  This helps us remember your teaching context.
                </p>
              </div>

              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  <span className="text-sm font-medium">+91</span>
                </div>
                <Input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                  placeholder="98765 43210"
                  className="h-14 pl-20 text-lg rounded-xl border-border focus:border-primary focus:ring-primary/30"
                  disabled={loading}
                />
              </div>

              <Button
                onClick={handleSendOTP}
                disabled={phone.length !== 10 || loading}
                className="w-full h-14 text-base font-semibold rounded-xl gap-2 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/95 hover:to-primary/85 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
              >
                {loading ? "Sending..." : t.login.sendOtp}
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-foreground mb-2">
                  Enter the 6-digit OTP sent to your phone
                </h2>
                <p className="text-sm text-muted-foreground">
                  {t.login.sentTo} +91 {phone}
                </p>
              </div>

              <div className="flex justify-center overflow-hidden">
                <InputOTP
                  value={otp}
                  onChange={setOtp}
                  maxLength={6}
                  className="w-full"
                  disabled={loading}
                >
                  <InputOTPGroup className="gap-2 sm:gap-3">
                    <InputOTPSlot index={0} className="w-10 h-12 sm:w-14 sm:h-16 text-lg sm:text-xl rounded-xl border-border focus:border-primary focus:ring-primary/30 bg-background" />
                    <InputOTPSlot index={1} className="w-10 h-12 sm:w-14 sm:h-16 text-lg sm:text-xl rounded-xl border-border focus:border-primary focus:ring-primary/30 bg-background" />
                    <InputOTPSlot index={2} className="w-10 h-12 sm:w-14 sm:h-16 text-lg sm:text-xl rounded-xl border-border focus:border-primary focus:ring-primary/30 bg-background" />
                    <InputOTPSlot index={3} className="w-10 h-12 sm:w-14 sm:h-16 text-lg sm:text-xl rounded-xl border-border focus:border-primary focus:ring-primary/30 bg-background" />
                    <InputOTPSlot index={4} className="w-10 h-12 sm:w-14 sm:h-16 text-lg sm:text-xl rounded-xl border-border focus:border-primary focus:ring-primary/30 bg-background" />
                    <InputOTPSlot index={5} className="w-10 h-12 sm:w-14 sm:h-16 text-lg sm:text-xl rounded-xl border-border focus:border-primary focus:ring-primary/30 bg-background" />
                  </InputOTPGroup>
                </InputOTP>
              </div>

              <Button
                onClick={handleVerifyOTP}
                disabled={otp.length !== 6 || loading}
                className="w-full h-14 text-base font-semibold rounded-xl gap-2 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/95 hover:to-primary/85 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
              >
                {loading ? "Verifying..." : t.login.verifyBtn}
                <ArrowRight className="w-5 h-5" />
              </Button>

              <div className="flex justify-between items-center pt-2">
                <button
                  onClick={() => setStep("phone")}
                  className="text-sm text-primary font-medium hover:text-primary/80 transition-colors"
                  disabled={loading}
                >
                  {t.login.changePhone}
                </button>
                <button
                  onClick={() => {}}
                  className="text-sm text-primary font-medium hover:text-primary/80 transition-colors"
                  disabled={loading}
                >
                  Resend OTP
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Guest Mode */}
      <footer className="px-5 pb-12 mt-8 animate-fade-in-up-delay-1">
        <div className="space-y-4">
          <div className="flex items-center justify-center">
            <div className="flex-1 h-px bg-border"></div>
            <span className="px-4 text-sm text-muted-foreground">Or</span>
            <div className="flex-1 h-px bg-border"></div>
          </div>
          <Button
            onClick={handleGuestMode}
            variant="secondary"
            className="w-full h-14 text-base font-semibold rounded-xl bg-card hover:bg-card/80 text-foreground shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
          >
            Continue without login
          </Button>
          <p className="text-center text-xs text-muted-foreground max-w-xs mx-auto">
            You can try the app before signing in.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Login;
