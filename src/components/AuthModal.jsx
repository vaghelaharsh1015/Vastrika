import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { X, Lock, Mail, User as UserIcon, Phone, Sparkles, CheckCircle, ArrowRight } from 'lucide-react';

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
        setErrorMessage(res.message || 'Invalid email or password. If you do not have an account, please Register first.');
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
      className="modal-overlay"
      onClick={closeAuthModal}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: '16px',
      }}
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '460px',
          width: '100%',
          background: '#1A1412',
          border: '1px solid rgba(197, 160, 89, 0.4)',
          borderRadius: '16px',
          padding: '28px 32px',
          color: '#F9F6F0',
          position: 'relative',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.85)',
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
      >
        {/* Prominent Close Button */}
        <button
          onClick={closeAuthModal}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(197, 160, 89, 0.3)',
            color: '#C5A059',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
          aria-label="Close modal"
          title="Close and continue browsing"
        >
          <X size={18} />
        </button>

        {/* Header Emblem */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(197, 160, 89, 0.25), rgba(128, 0, 32, 0.25))',
              border: '1px solid #C5A059',
              color: '#C5A059',
              marginBottom: '10px',
            }}
          >
            <Sparkles size={22} />
          </div>
          <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: '1.5rem', color: '#F9F6F0', margin: '0 0 6px' }}>
            {authMode === 'login' ? 'Patron Sign In' : 'Join Vastrika Club'}
          </h2>
          <p style={{ fontSize: '0.82rem', color: '#B3A898', margin: 0 }}>
            {authMode === 'login'
              ? 'Please sign in to access your wardrobe, add items to cart & track orders.'
              : 'New to Vastrika? Please register first to create your patron account.'}
          </p>
        </div>

        {/* Mode Selector Switch (Sign In / Register) */}
        <div
          style={{
            display: 'flex',
            background: '#241D1A',
            borderRadius: '10px',
            padding: '4px',
            marginBottom: '20px',
            border: '1px solid rgba(197, 160, 89, 0.2)',
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
              color: authMode === 'login' ? '#1A1412' : '#B3A898',
              fontWeight: 600,
              fontSize: '0.85rem',
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
              color: authMode === 'register' ? '#1A1412' : '#B3A898',
              fontWeight: 600,
              fontSize: '0.85rem',
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
              background: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid rgba(239, 68, 68, 0.4)',
              color: '#FCA5A5',
              padding: '10px 14px',
              borderRadius: '8px',
              fontSize: '0.82rem',
              marginBottom: '16px',
            }}
          >
            {errorMessage}
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {authMode === 'register' && (
            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', color: '#C5A059', marginBottom: '5px', letterSpacing: '0.04em' }}>
                FULL NAME *
              </label>
              <div style={{ position: 'relative' }}>
                <UserIcon size={16} style={{ position: 'absolute', left: '12px', top: '13px', color: '#8C8275' }} />
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
                    background: '#241D1A',
                    border: '1px solid #3D332A',
                    borderRadius: '8px',
                    color: '#FFF',
                    fontSize: '0.9rem',
                    outline: 'none',
                  }}
                />
              </div>
            </div>
          )}

          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', color: '#C5A059', marginBottom: '5px', letterSpacing: '0.04em' }}>
              EMAIL ADDRESS *
            </label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} style={{ position: 'absolute', left: '12px', top: '13px', color: '#8C8275' }} />
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
                  background: '#241D1A',
                  border: '1px solid #3D332A',
                  borderRadius: '8px',
                  color: '#FFF',
                  fontSize: '0.9rem',
                  outline: 'none',
                }}
              />
            </div>
          </div>

          {authMode === 'register' && (
            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', color: '#C5A059', marginBottom: '5px', letterSpacing: '0.04em' }}>
                PHONE NUMBER
              </label>
              <div style={{ position: 'relative' }}>
                <Phone size={16} style={{ position: 'absolute', left: '12px', top: '13px', color: '#8C8275' }} />
                <input
                  type="tel"
                  name="phone"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '11px 14px 11px 38px',
                    background: '#241D1A',
                    border: '1px solid #3D332A',
                    borderRadius: '8px',
                    color: '#FFF',
                    fontSize: '0.9rem',
                    outline: 'none',
                  }}
                />
              </div>
            </div>
          )}

          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', color: '#C5A059', marginBottom: '5px', letterSpacing: '0.04em' }}>
              PASSWORD *
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} style={{ position: 'absolute', left: '12px', top: '13px', color: '#8C8275' }} />
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
                  background: '#241D1A',
                  border: '1px solid #3D332A',
                  borderRadius: '8px',
                  color: '#FFF',
                  fontSize: '0.9rem',
                  outline: 'none',
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
              color: '#1A1412',
              fontWeight: 700,
              fontSize: '0.92rem',
              letterSpacing: '0.05em',
              border: 'none',
              borderRadius: '8px',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
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

        {/* Demo Credentials Helper */}
        <div
          style={{
            marginTop: '16px',
            padding: '10px 12px',
            background: 'rgba(197, 160, 89, 0.08)',
            border: '1px dashed rgba(197, 160, 89, 0.3)',
            borderRadius: '8px',
            fontSize: '0.76rem',
            color: '#B3A898',
          }}
        >
          <strong style={{ color: '#C5A059' }}>Quick Demo Login:</strong>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
            <span
              onClick={() => {
                setAuthMode('login');
                setFormData({ name: '', email: 'user@vastrika.com', password: 'User@123', phone: '' });
                setErrorMessage('');
              }}
              style={{ color: '#D8B168', cursor: 'pointer', textDecoration: 'underline' }}
            >
              Demo User (user@vastrika.com)
            </span>
            <span
              onClick={() => {
                setAuthMode('login');
                setFormData({ name: '', email: 'admin@vastrika.com', password: 'Admin@123', phone: '' });
                setErrorMessage('');
              }}
              style={{ color: '#D8B168', cursor: 'pointer', textDecoration: 'underline' }}
            >
              Admin (admin@vastrika.com)
            </span>
          </div>
        </div>

        {/* Bottom Switcher */}
        <div style={{ marginTop: '16px', textAlign: 'center', fontSize: '0.82rem', color: '#A0988A' }}>
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
                  color: '#C5A059',
                  fontWeight: 600,
                  cursor: 'pointer',
                  textDecoration: 'underline',
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
                  color: '#C5A059',
                  fontWeight: 600,
                  cursor: 'pointer',
                  textDecoration: 'underline',
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
