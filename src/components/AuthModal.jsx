import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { X, Lock, Mail, User as UserIcon, Phone, Sparkles, CheckCircle } from 'lucide-react';

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
        addToast(`Welcome back, ${res.user.name || 'Patron'}! ✨`);
        setFormData({ name: '', email: '', password: '', phone: '' });
      } else {
        setErrorMessage(res.message);
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
        addToast(`Welcome to Vastrika Haute Couture, ${res.user.name}! 👑`);
        setFormData({ name: '', email: '', password: '', phone: '' });
      } else {
        setErrorMessage(res.message);
      }
    }
  };

  return (
    <div className="modal-overlay" onClick={closeAuthModal} style={{ zIndex: 9999 }}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '440px',
          width: '90%',
          background: '#1A1412',
          border: '1px solid rgba(197, 160, 89, 0.3)',
          borderRadius: '16px',
          padding: '32px',
          color: '#F9F6F0',
          position: 'relative',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
        }}
      >
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'transparent',
            border: 'none',
            color: '#A0988A',
            cursor: 'pointer',
          }}
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {/* Header Emblem */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(197, 160, 89, 0.2), rgba(128, 0, 32, 0.2))',
              border: '1px solid #C5A059',
              color: '#C5A059',
              marginBottom: '12px',
            }}
          >
            <Sparkles size={24} />
          </div>
          <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: '1.6rem', color: '#F9F6F0', margin: '0 0 6px' }}>
            {authMode === 'login' ? 'Patron Sign In' : 'Join Vastrika Club'}
          </h2>
          <p style={{ fontSize: '0.85rem', color: '#B3A898', margin: 0 }}>
            {authMode === 'login'
              ? 'Access your royal wardrobe, orders & personalized perks'
              : 'Create an exclusive account for couture updates and rewards'}
          </p>
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
              fontSize: '0.85rem',
              marginBottom: '18px',
            }}
          >
            {errorMessage}
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {authMode === 'register' && (
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: '#C5A059', marginBottom: '6px' }}>
                FULL NAME *
              </label>
              <div style={{ position: 'relative' }}>
                <UserIcon size={16} style={{ position: 'absolute', left: '12px', top: '14px', color: '#8C8275' }} />
                <input
                  type="text"
                  name="name"
                  placeholder="e.g. Maharani Gayatri Devi"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px 14px 12px 38px',
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
            <label style={{ display: 'block', fontSize: '0.8rem', color: '#C5A059', marginBottom: '6px' }}>
              EMAIL ADDRESS *
            </label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} style={{ position: 'absolute', left: '12px', top: '14px', color: '#8C8275' }} />
              <input
                type="email"
                name="email"
                placeholder="patron@vastrika.com"
                value={formData.email}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '12px 14px 12px 38px',
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
              <label style={{ display: 'block', fontSize: '0.8rem', color: '#C5A059', marginBottom: '6px' }}>
                PHONE NUMBER
              </label>
              <div style={{ position: 'relative' }}>
                <Phone size={16} style={{ position: 'absolute', left: '12px', top: '14px', color: '#8C8275' }} />
                <input
                  type="tel"
                  name="phone"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '12px 14px 12px 38px',
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
            <label style={{ display: 'block', fontSize: '0.8rem', color: '#C5A059', marginBottom: '6px' }}>
              PASSWORD *
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} style={{ position: 'absolute', left: '12px', top: '14px', color: '#8C8275' }} />
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
                  padding: '12px 14px 12px 38px',
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
              marginTop: '8px',
              padding: '14px',
              background: 'linear-gradient(135deg, #C5A059, #9B783E)',
              color: '#1A1412',
              fontWeight: 600,
              fontSize: '0.95rem',
              letterSpacing: '0.05em',
              border: 'none',
              borderRadius: '8px',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
            }}
          >
            {isLoading
              ? 'AUTHENTICATING...'
              : authMode === 'login'
              ? 'SIGN IN TO ACCOUNT'
              : 'CREATE PATRON ACCOUNT'}
          </button>
        </form>

        {/* Demo Credentials Quick-Fill Guide */}
        <div
          style={{
            marginTop: '20px',
            padding: '12px',
            background: 'rgba(197, 160, 89, 0.08)',
            border: '1px dashed rgba(197, 160, 89, 0.3)',
            borderRadius: '8px',
            fontSize: '0.78rem',
            color: '#B3A898',
          }}
        >
          <strong style={{ color: '#C5A059' }}>Demo Accounts:</strong>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
            <span
              onClick={() => {
                setAuthMode('login');
                setFormData({ name: '', email: 'user@vastrika.com', password: 'User@123', phone: '' });
              }}
              style={{ color: '#D8B168', cursor: 'pointer', textDecoration: 'underline' }}
            >
              Demo User (user@vastrika.com)
            </span>
            <span
              onClick={() => {
                setAuthMode('login');
                setFormData({ name: '', email: 'admin@vastrika.com', password: 'Admin@123', phone: '' });
              }}
              style={{ color: '#D8B168', cursor: 'pointer', textDecoration: 'underline' }}
            >
              Admin (admin@vastrika.com)
            </span>
          </div>
        </div>

        {/* Toggle Mode */}
        <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '0.85rem', color: '#A0988A' }}>
          {authMode === 'login' ? (
            <>
              New to Vastrika?{' '}
              <button
                type="button"
                onClick={() => setAuthMode('register')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#C5A059',
                  fontWeight: 600,
                  cursor: 'pointer',
                  textDecoration: 'underline',
                }}
              >
                Register Now
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setAuthMode('login')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#C5A059',
                  fontWeight: 600,
                  cursor: 'pointer',
                  textDecoration: 'underline',
                }}
              >
                Sign In
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
