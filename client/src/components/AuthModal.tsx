import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AuthModal({ open, onOpenChange }: AuthModalProps) {
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [showOtp, setShowOtp] = useState(false);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    // Auto-focus next input
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleSendOtp = () => {
    if (!phoneNumber) return;
    // Here you would normally send OTP via API
    setShowOtp(true);
  };

  const handleGoogleLogin = () => {
    window.location.href = '/api/login';
  };

  const handleContinue = () => {
    // Verify OTP and continue
    window.location.href = '/api/login';
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md" data-testid="modal-auth">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-foreground">
            Welcome to ArogyaLink
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Login/Signup Toggle */}
          <div className="flex rounded-md border border-border overflow-hidden">
            <Button
              variant={authMode === 'login' ? 'default' : 'ghost'}
              className="flex-1 rounded-none"
              onClick={() => setAuthMode('login')}
              data-testid="button-tab-login"
            >
              Login
            </Button>
            <Button
              variant={authMode === 'signup' ? 'default' : 'ghost'}
              className="flex-1 rounded-none"
              onClick={() => setAuthMode('signup')}
              data-testid="button-tab-signup"
            >
              Sign Up
            </Button>
          </div>

          {/* Mobile OTP Section */}
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium text-foreground">Mobile Number</Label>
              <div className="flex space-x-2 mt-2">
                <Select value={countryCode} onValueChange={setCountryCode}>
                  <SelectTrigger className="w-24" data-testid="select-country-code">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="+91">+91</SelectItem>
                    <SelectItem value="+1">+1</SelectItem>
                    <SelectItem value="+44">+44</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  type="tel"
                  placeholder="9876543210"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="flex-1"
                  data-testid="input-phone-number"
                />
              </div>
            </div>

            {!showOtp ? (
              <Button 
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                onClick={handleSendOtp}
                disabled={!phoneNumber}
                data-testid="button-send-otp"
              >
                Send OTP
              </Button>
            ) : (
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-foreground">Enter OTP</Label>
                  <div className="flex space-x-2 mt-2">
                    {otp.map((digit, index) => (
                      <Input
                        key={index}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                        ref={(el) => otpRefs.current[index] = el}
                        className="otp-input"
                        data-testid={`input-otp-${index}`}
                      />
                    ))}
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={handleContinue}
                  data-testid="button-verify-otp"
                >
                  Verify & Continue
                </Button>
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-card text-muted-foreground">Or continue with</span>
            </div>
          </div>

          {/* Google OAuth */}
          <Button
            variant="outline"
            className="w-full"
            onClick={handleGoogleLogin}
            data-testid="button-google-login"
          >
            <i className="fab fa-google mr-2 text-lg"></i>
            Sign in with Google
          </Button>

          {/* Terms */}
          <p className="text-xs text-center text-muted-foreground">
            By continuing, you agree to our{' '}
            <a href="#" className="text-primary hover:underline">Terms of Service</a>
            {' '}and{' '}
            <a href="#" className="text-primary hover:underline">Privacy Policy</a>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
