import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { X, Lock, Mail, User as UserIcon, Phone, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

const AuthModal = () => {
  const {
    isAuthModalOpen,
    authMode,
    setAuthMode,
    closeAuthModal,
    login,
    register,
    isLoading,
  } = useAuth();

  const { addToast } = useCart();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
  });

  const [errorMessage, setErrorMessage] = useState('');

  if (!isAuthModalOpen) return null;

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errorMessage) setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (authMode === 'login') {
      const res = await login(formData.email, formData.password);
      if (res.success) {
        addToast(`Welcome back, ${res.user.name || 'Patron'}! ✨`, 'success');
        setFormData({ name: '', email: '', password: '', phone: '' });
      } else {
        setErrorMessage(res.message || 'Invalid email or password. If you are a new patron, please click "Register (New User)" below.');
      }
    } else {
      if (!formData.name || !formData.email || !formData.password) {
        setErrorMessage('Please fill in all mandatory fields');
        return;
      }
      const res = await register(
        formData.name,
        formData.email,
        formData.password,
        formData.phone
      );
      if (res.success) {
        addToast(`Welcome to Vastrika Haute Couture, ${res.user.name}! 👑`, 'success');
        setFormData({ name: '', email: '', password: '', phone: '' });
      } else {
        setErrorMessage(res.message || 'Registration failed');
      }
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.82)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 999999,
        padding: '16px',
        boxSizing: 'border-box',
      }}
      onClick={closeAuthModal}
    >
      <div
        style={{
          maxWidth: '460px',
          width: '100%',
          backgroundColor: '#16110F',
          border: '1px solid #C5A059',
          borderRadius: '16px',
          padding: '28px 30px',
          color: '#F9F6F0',
          position: 'relative',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.95), 0 0 30px rgba(197, 160, 89, 0.15)',
          maxHeight: '92vh',
          overflowY: 'auto',
          boxSizing: 'border-box',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Prominent Close Button */}
        <button
          onClick={closeAuthModal}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            backgroundColor: '#2A201C',
            border: '1px solid #C5A059',
            color: '#F9F6F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10,
          }}
          aria-label="Close"
          title="Close and continue browsing"
        >
          <X size={20} color="#C5A059" />
        </button>

        {/* Header Emblem */}
        <div style={{ textAlign: 'center', marginBottom: '18px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(197, 160, 89, 0.3), rgba(128, 0, 32, 0.3))',
              border: '1.5px solid #C5A059',
              color: '#C5A059',
              marginBottom: '10px',
            }}
          >
            <Sparkles size={24} />
          </div>
          <h2 style={{ fontFamily: 'Cinzel, Georgia, serif', fontSize: '1.55rem', color: '#F9F6F0', margin: '0 0 6px' }}>
            {authMode === 'login' ? 'Patron Sign In' : 'Join Vastrika Club'}
          </h2>
          <p style={{ fontSize: '0.84rem', color: '#C8BFB0', margin: 0, lineHeight: 1.4 }}>
            {authMode === 'login'
              ? 'Sign in to access your luxury bag, wishlist & track orders.'
              : 'Create your royal patron profile for personalized couture & benefits.'}
          </p>
        </div>

        {/* Mode Selector Switch (Sign In / Register) */}
        <div
          style={{
            display: 'flex',
            backgroundColor: '#221915',
            borderRadius: '10px',
            padding: '4px',
            marginBottom: '18px',
            border: '1px solid rgba(197, 160, 89, 0.3)',
          }}
        >
          <button
            type="button"
            onClick={() => {
              setAuthMode('login');
              setErrorMessage('');
            }}
            style={{
              flex: 1,
              padding: '10px 0',
              borderRadius: '8px',
              border: 'none',
              background: authMode === 'login' ? 'linear-gradient(135deg, #C5A059, #9B783E)' : 'transparent',
              color: authMode === 'login' ? '#140E0C' : '#B8AD9E',
              fontWeight: 700,
              fontSize: '0.88rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setAuthMode('register');
              setErrorMessage('');
            }}
            style={{
              flex: 1,
              padding: '10px 0',
              borderRadius: '8px',
              border: 'none',
              background: authMode === 'register' ? 'linear-gradient(135deg, #C5A059, #9B783E)' : 'transparent',
              color: authMode === 'register' ? '#140E0C' : '#B8AD9E',
              fontWeight: 700,
              fontSize: '0.88rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            Register (New User)
          </button>
        </div>

        {/* Error Notification */}
        {errorMessage && (
          <div
            style={{
              backgroundColor: 'rgba(239, 68, 68, 0.2)',
              border: '1px solid #EF4444',
              color: '#FCA5A5',
              padding: '10px 14px',
              borderRadius: '8px',
              fontSize: '0.84rem',
              marginBottom: '16px',
              lineHeight: 1.4,
            }}
          >
            {errorMessage}
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {authMode === 'register' && (
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: '#D4AF37', marginBottom: '5px', fontWeight: 600 }}>
                FULL NAME *
              </label>
              <div style={{ position: 'relative' }}>
                <UserIcon size={16} style={{ position: 'absolute', left: '12px', top: '13px', color: '#C5A059' }} />
                <input
                  type="text"
                  name="name"
                  placeholder="e.g. Maharani Gayatri Devi"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '11px 14px 11px 38px',
                    backgroundColor: '#241B17',
                    border: '1px solid #4A3A2F',
                    borderRadius: '8px',
                    color: '#FFF',
                    fontSize: '0.9rem',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
            </div>
          )}

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', color: '#D4AF37', marginBottom: '5px', fontWeight: 600 }}>
              EMAIL ADDRESS *
            </label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} style={{ position: 'absolute', left: '12px', top: '13px', color: '#C5A059' }} />
              <input
                type="email"
                name="email"
                placeholder="patron@vastrika.com"
                value={formData.email}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '11px 14px 11px 38px',
                  backgroundColor: '#241B17',
                  border: '1px solid #4A3A2F',
                  borderRadius: '8px',
                  color: '#FFF',
                  fontSize: '0.9rem',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </div>
          </div>

          {authMode === 'register' && (
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: '#D4AF37', marginBottom: '5px', fontWeight: 600 }}>
                PHONE NUMBER
              </label>
              <div style={{ position: 'relative' }}>
                <Phone size={16} style={{ position: 'absolute', left: '12px', top: '13px', color: '#C5A059' }} />
                <input
                  type="tel"
                  name="phone"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '11px 14px 11px 38px',
                    backgroundColor: '#241B17',
                    border: '1px solid #4A3A2F',
                    borderRadius: '8px',
                    color: '#FFF',
                    fontSize: '0.9rem',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
            </div>
          )}

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', color: '#D4AF37', marginBottom: '5px', fontWeight: 600 }}>
              PASSWORD *
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} style={{ position: 'absolute', left: '12px', top: '13px', color: '#C5A059' }} />
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={6}
                style={{
                  width: '100%',
                  padding: '11px 14px 11px 38px',
                  backgroundColor: '#241B17',
                  border: '1px solid #4A3A2F',
                  borderRadius: '8px',
                  color: '#FFF',
                  fontSize: '0.9rem',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            style={{
              marginTop: '6px',
              padding: '13px',
              background: 'linear-gradient(135deg, #C5A059, #9B783E)',
              color: '#140E0C',
              fontWeight: 800,
              fontSize: '0.92rem',
              letterSpacing: '0.04em',
              border: 'none',
              borderRadius: '8px',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: '0 4px 14px rgba(197, 160, 89, 0.4)',
            }}
          >
            <span>
              {isLoading
                ? 'AUTHENTICATING...'
                : authMode === 'login'
                ? 'SIGN IN TO ACCOUNT'
                : 'REGISTER PATRON ACCOUNT'}
            </span>
            {!isLoading && <ArrowRight size={16} />}
          </button>
        </form>

        {/* Demo Accounts Quick-Fill Box */}
        <div
          style={{
            marginTop: '16px',
            padding: '10px 12px',
            backgroundColor: '#201814',
            border: '1px dashed #C5A059',
            borderRadius: '8px',
            fontSize: '0.78rem',
            color: '#B8AD9E',
          }}
        >
          <strong style={{ color: '#D4AF37' }}>Quick Demo Login:</strong>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
            <span
              onClick={() => {
                setAuthMode('login');
                setFormData({ name: '', email: 'user@vastrika.com', password: 'User@123', phone: '' });
                setErrorMessage('');
              }}
              style={{ color: '#E5C479', cursor: 'pointer', textDecoration: 'underline', fontWeight: 600 }}
            >
              Demo User (user@vastrika.com)
            </span>
            <span
              onClick={() => {
                setAuthMode('login');
                setFormData({ name: '', email: 'admin@vastrika.com', password: 'Admin@123', phone: '' });
                setErrorMessage('');
              }}
              style={{ color: '#E5C479', cursor: 'pointer', textDecoration: 'underline', fontWeight: 600 }}
            >
              Admin (admin@vastrika.com)
            </span>
          </div>
        </div>

        {/* Switch Link */}
        <div style={{ marginTop: '16px', textAlign: 'center', fontSize: '0.84rem', color: '#B0A596' }}>
          {authMode === 'login' ? (
            <>
              Don't have an account yet?{' '}
              <button
                type="button"
                onClick={() => {
                  setAuthMode('register');
                  setErrorMessage('');
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#D4AF37',
                  fontWeight: 700,
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  fontSize: '0.84rem',
                }}
              >
                Register First
              </button>
            </>
          ) : (
            <>
              Already registered?{' '}
              <button
                type="button"
                onClick={() => {
                  setAuthMode('login');
                  setErrorMessage('');
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#D4AF37',
                  fontWeight: 700,
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  fontSize: '0.84rem',
                }}
              >
                Sign In here
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
