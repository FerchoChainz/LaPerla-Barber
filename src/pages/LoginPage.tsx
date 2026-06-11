import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { homeData } from '../data/mockData';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const { error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (loginError) throw loginError;

      navigate('/admin');
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || 'Invalid email or password.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-canvas text-ink">
      <Header 
        {...homeData.header} 
        onBookClick={() => navigate('/')} 
      />
      
      <main className="flex-grow flex items-center justify-center p-gutter">
        <div className="w-full max-w-md bg-surface p-8 sm:p-12 rounded-[2.5rem] whisper-border diffused-shadow space-y-8">
          <div className="text-center space-y-2">
            <span className="font-mono-label text-mono-label text-steel uppercase tracking-widest">Internal Access</span>
            <h1 className="font-headline-md text-headline-md text-ink">Admin Login</h1>
          </div>

          {error && (
            <div className="bg-error/10 text-error p-4 rounded-xl text-body-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="font-mono-label text-mono-label text-steel block mb-2 uppercase">Email</label>
                <input
                  required
                  type="email"
                  className="w-full bg-surface-container-low border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-amber transition-colors"
                  placeholder="admin@laperla.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label className="font-mono-label text-mono-label text-steel block mb-2 uppercase">Password</label>
                <input
                  required
                  type="password"
                  className="w-full bg-surface-container-low border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-amber transition-colors"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-amber text-ink font-body-sm text-body-sm px-8 py-4 rounded-full font-bold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <span className="animate-spin h-4 w-4 border-2 border-ink/30 border-t-ink rounded-full" />
                  Authenticating...
                </>
              ) : (
                'Access Dashboard'
              )}
            </button>
          </form>

          <p className="text-center">
            <button 
              onClick={() => navigate('/')}
              className="text-steel hover:text-ink font-mono-label text-mono-label transition-colors"
            >
              Return to Public Site
            </button>
          </p>
        </div>
      </main>

      <Footer {...homeData.footer} />
    </div>
  );
};

export default LoginPage;
