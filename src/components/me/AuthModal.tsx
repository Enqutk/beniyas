import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BaniyasLogo } from '../common/BaniyasLogo';
import {
  ArrowLeft,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Phone,
  User,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Chrome,
  Apple
} from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { setActiveView, login, register, isLoggedIn } = useApp();
  
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [loginMethod, setLoginMethod] = useState<'password' | 'otp'>('password');

  // Login form state
  const [loginEmail, setLoginEmail] = useState('enkukokob@gmail.com');
  const [loginPassword, setLoginPassword] = useState('••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [loginPhone, setLoginPhone] = useState('911884422');
  const [otpCode, setOtpCode] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  // Register form state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [agreedTerms, setAgreedTerms] = useState(true);

  // Status feedback
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (loginMethod === 'password') {
      if (!loginEmail) {
        setErrorMsg('Please enter your email or phone number.');
        return;
      }
      if (!loginPassword) {
        setErrorMsg('Please enter your password.');
        return;
      }
      login(loginEmail, loginPassword);
      setSuccessMsg('Logged in successfully!');
      setTimeout(() => setActiveView('none'), 1000);
    } else {
      if (!otpSent) {
        if (!loginPhone) {
          setErrorMsg('Please enter your mobile phone number.');
          return;
        }
        setOtpSent(true);
        setSuccessMsg('SMS code sent! Enter 1234 to verify.');
      } else {
        if (otpCode !== '1234' && otpCode.length < 4) {
          setErrorMsg('Please enter valid 4-digit code (use 1234 for demo).');
          return;
        }
        login(`+251${loginPhone}`, '');
        setSuccessMsg('Verified & Logged In!');
        setTimeout(() => setActiveView('none'), 1000);
      }
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!regName.trim()) {
      setErrorMsg('Full name is required.');
      return;
    }
    if (!regEmail.trim() && !regPhone.trim()) {
      setErrorMsg('Please provide an email or phone number.');
      return;
    }
    if (!regPassword || regPassword.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      return;
    }
    if (regPassword !== regConfirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }
    if (!agreedTerms) {
      setErrorMsg('You must agree to the Terms & Privacy Policy.');
      return;
    }

    register(regName, regEmail, regPhone, regPassword);
    setSuccessMsg('Account created successfully!');
    setTimeout(() => setActiveView('none'), 1200);
  };

  // Password strength calculation
  const getPasswordStrength = (pass: string) => {
    if (!pass) return 0;
    let score = 0;
    if (pass.length >= 6) score += 1;
    if (pass.length >= 10) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^a-zA-Z0-9]/.test(pass)) score += 1;
    return score; // max 4
  };

  const passScore = getPasswordStrength(regPassword);

  return (
    <div className="fixed inset-0 z-50 bg-gray-900/60 backdrop-blur-xs flex items-center justify-center p-2 md:p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden flex flex-col my-auto border border-gray-100">
        {/* Top Header */}
        <div className="px-5 py-3.5 bg-black text-white flex items-center justify-between">
          <button
            onClick={() => setActiveView('none')}
            className="flex items-center gap-1 text-xs text-gray-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
          <span className="text-xs font-black tracking-widest text-brand uppercase">
            BANIYAS ACCOUNT
          </span>
          <div className="w-12"></div>
        </div>

        {/* Modal Banner */}
        <div className="p-6 bg-gradient-to-b from-brand/10 to-transparent text-center border-b border-gray-100 space-y-2">
          <div className="flex justify-center">
            <BaniyasLogo variant="light" size="lg" />
          </div>
          <p className="text-xs text-gray-600 font-medium">
            Access your orders, coupons, saved wishlist, and personal center.
          </p>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="grid grid-cols-2 bg-gray-100 p-1 mx-6 mt-4 rounded-xl text-xs font-black">
          <button
            onClick={() => {
              setMode('login');
              setErrorMsg('');
              setSuccessMsg('');
            }}
            className={`py-2.5 rounded-lg transition-all ${
              mode === 'login'
                ? 'bg-white text-black shadow-xs'
                : 'text-gray-500 hover:text-black'
            }`}
          >
            Sign In / Login
          </button>
          <button
            onClick={() => {
              setMode('register');
              setErrorMsg('');
              setSuccessMsg('');
            }}
            className={`py-2.5 rounded-lg transition-all ${
              mode === 'register'
                ? 'bg-white text-black shadow-xs'
                : 'text-gray-500 hover:text-black'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Notifications */}
        {errorMsg && (
          <div className="mx-6 mt-3 p-2.5 bg-red-50 border border-red-200 rounded-xl text-xs font-bold text-red-600 text-center animate-in fade-in">
            {errorMsg}
          </div>
        )}
        {successMsg && (
          <div className="mx-6 mt-3 p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-bold text-emerald-700 flex items-center justify-center gap-1.5 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Content Body */}
        <div className="p-6 pt-4">
          {mode === 'login' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              {/* Login Method Sub-Tabs */}
              <div className="flex items-center justify-between text-xs border-b border-gray-200 pb-2">
                <button
                  type="button"
                  onClick={() => setLoginMethod('password')}
                  className={`font-black pb-1 relative ${
                    loginMethod === 'password' ? 'text-black' : 'text-gray-400'
                  }`}
                >
                  Password Login
                  {loginMethod === 'password' && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand rounded-full" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setLoginMethod('otp')}
                  className={`font-black pb-1 relative ${
                    loginMethod === 'otp' ? 'text-black' : 'text-gray-400'
                  }`}
                >
                  SMS Verification Code
                  {loginMethod === 'otp' && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand rounded-full" />
                  )}
                </button>
              </div>

              {loginMethod === 'password' ? (
                <>
                  {/* Email / Username */}
                  <div>
                    <label className="block text-[11px] font-black uppercase text-gray-600 mb-1">
                      Email or Phone Number
                    </label>
                    <div className="relative flex items-center">
                      <Mail className="w-4 h-4 text-gray-400 absolute left-3" />
                      <input
                        type="text"
                        value={loginEmail}
                        onChange={e => setLoginEmail(e.target.value)}
                        placeholder="enkukokob@gmail.com"
                        className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-xl text-xs text-gray-900 font-medium focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="block text-[11px] font-black uppercase text-gray-600">
                        Password
                      </label>
                      <button
                        type="button"
                        onClick={() => alert('Password reset link sent to your email!')}
                        className="text-[11px] font-bold text-brand hover:underline"
                      >
                        Forgot password?
                      </button>
                    </div>
                    <div className="relative flex items-center">
                      <Lock className="w-4 h-4 text-gray-400 absolute left-3" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={loginPassword}
                        onChange={e => setLoginPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-9 pr-9 py-2.5 border border-gray-300 rounded-xl text-xs text-gray-900 font-medium focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Phone OTP Login */}
                  <div>
                    <label className="block text-[11px] font-black uppercase text-gray-600 mb-1">
                      Mobile Number (Ethiopia)
                    </label>
                    <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden focus-within:border-brand">
                      <span className="bg-gray-100 px-3 py-2.5 text-xs font-bold text-gray-600 border-r border-gray-200">
                        +251
                      </span>
                      <input
                        type="tel"
                        value={loginPhone}
                        onChange={e => setLoginPhone(e.target.value)}
                        placeholder="91 188 4422"
                        className="w-full p-2.5 text-xs text-gray-900 font-medium focus:outline-none"
                      />
                    </div>
                  </div>

                  {otpSent && (
                    <div>
                      <label className="block text-[11px] font-black uppercase text-gray-600 mb-1">
                        SMS Verification Code
                      </label>
                      <input
                        type="text"
                        maxLength={4}
                        value={otpCode}
                        onChange={e => setOtpCode(e.target.value)}
                        placeholder="Enter 1234"
                        className="w-full p-2.5 border border-gray-300 rounded-xl text-center text-base font-mono font-black tracking-widest text-gray-900 focus:outline-none focus:border-brand"
                      />
                    </div>
                  )}
                </>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 bg-black hover:bg-gray-800 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-md transition-all mt-2"
              >
                {loginMethod === 'otp' && !otpSent ? 'Send SMS Code' : 'Sign In'}
              </button>

              {/* Divider */}
              <div className="relative my-4 flex items-center justify-center">
                <div className="border-t border-gray-200 w-full"></div>
                <span className="bg-white px-3 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest absolute">
                  OR SIGN IN WITH
                </span>
              </div>

              {/* Social Login Buttons */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    login('Google User', '');
                    setActiveView('none');
                  }}
                  className="py-2.5 px-3 border border-gray-200 hover:border-gray-400 rounded-xl text-xs font-bold text-gray-700 flex items-center justify-center gap-2 transition-colors"
                >
                  <Chrome className="w-4 h-4 text-red-500" />
                  Google
                </button>
                <button
                  type="button"
                  onClick={() => {
                    login('Apple User', '');
                    setActiveView('none');
                  }}
                  className="py-2.5 px-3 border border-gray-200 hover:border-gray-400 rounded-xl text-xs font-bold text-gray-700 flex items-center justify-center gap-2 transition-colors"
                >
                  <Apple className="w-4 h-4 text-black" />
                  Apple ID
                </button>
              </div>

              {/* Bottom Switch Link */}
              <p className="text-center text-xs text-gray-500 pt-2">
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => setMode('register')}
                  className="font-black text-brand hover:underline"
                >
                  Register Now
                </button>
              </p>
            </form>
          ) : (
            /* Register Form */
            <form onSubmit={handleRegisterSubmit} className="space-y-3">
              {/* Name */}
              <div>
                <label className="block text-[11px] font-black uppercase text-gray-600 mb-1">
                  Full Name
                </label>
                <div className="relative flex items-center">
                  <User className="w-4 h-4 text-gray-400 absolute left-3" />
                  <input
                    type="text"
                    value={regName}
                    onChange={e => setRegName(e.target.value)}
                    placeholder="e.g. Enkukokob Tadesse"
                    className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-xl text-xs text-gray-900 font-medium focus:outline-none focus:border-brand"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-[11px] font-black uppercase text-gray-600 mb-1">
                  Email Address
                </label>
                <div className="relative flex items-center">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3" />
                  <input
                    type="email"
                    value={regEmail}
                    onChange={e => setRegEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-xl text-xs text-gray-900 font-medium focus:outline-none focus:border-brand"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-[11px] font-black uppercase text-gray-600 mb-1">
                  Phone Number (Addis Ababa)
                </label>
                <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden focus-within:border-brand">
                  <span className="bg-gray-100 px-3 py-2 text-xs font-bold text-gray-600 border-r border-gray-200">
                    +251
                  </span>
                  <input
                    type="tel"
                    value={regPhone}
                    onChange={e => setRegPhone(e.target.value)}
                    placeholder="91 123 4567"
                    className="w-full p-2 text-xs text-gray-900 font-medium focus:outline-none"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-[11px] font-black uppercase text-gray-600 mb-1">
                  Password
                </label>
                <div className="relative flex items-center">
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3" />
                  <input
                    type="password"
                    value={regPassword}
                    onChange={e => setRegPassword(e.target.value)}
                    placeholder="At least 6 characters"
                    className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-xl text-xs text-gray-900 font-medium focus:outline-none focus:border-brand"
                  />
                </div>

                {/* Strength Meter */}
                {regPassword && (
                  <div className="mt-1.5 flex items-center gap-1">
                    <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all ${
                          passScore <= 1
                            ? 'bg-red-500 w-1/4'
                            : passScore === 2
                            ? 'bg-brand w-2/4'
                            : passScore === 3
                            ? 'bg-blue-500 w-3/4'
                            : 'bg-emerald-500 w-full'
                        }`}
                      />
                    </div>
                    <span className="text-[10px] font-bold text-gray-500">
                      {passScore <= 1 ? 'Weak' : passScore === 2 ? 'Medium' : 'Strong'}
                    </span>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-[11px] font-black uppercase text-gray-600 mb-1">
                  Confirm Password
                </label>
                <div className="relative flex items-center">
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3" />
                  <input
                    type="password"
                    value={regConfirmPassword}
                    onChange={e => setRegConfirmPassword(e.target.value)}
                    placeholder="Re-enter password"
                    className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-xl text-xs text-gray-900 font-medium focus:outline-none focus:border-brand"
                  />
                </div>
              </div>

              {/* Terms Checkbox */}
              <label className="flex items-start gap-2 pt-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreedTerms}
                  onChange={e => setAgreedTerms(e.target.checked)}
                  className="mt-0.5 rounded text-brand focus:ring-brand"
                />
                <span className="text-[11px] text-gray-600 leading-tight">
                  I agree to Baniyas Store{' '}
                  <span className="text-brand font-bold underline">Terms of Service</span> and{' '}
                  <span className="text-brand font-bold underline">Privacy Policy</span>.
                </span>
              </label>

              {/* Register Button */}
              <button
                type="submit"
                className="w-full py-3 bg-brand hover:bg-brand-hover text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-md transition-all mt-2"
              >
                Create Account
              </button>

              {/* Switch link */}
              <p className="text-center text-xs text-gray-500 pt-1">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="font-black text-black hover:underline"
                >
                  Sign In
                </button>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
