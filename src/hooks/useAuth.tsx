import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { siteConfig } from '@/data/siteConfig';
type AppRole = 'super_admin' | 'content_maker' | 'viewer';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  role: AppRole | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string, fullName?: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  isSuperAdmin: boolean;
  isContentMaker: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [role, setRole] = useState<AppRole | null>(null);
  const [loading, setLoading] = useState(true);

  // Check if email is in hardcoded super admin list (failsafe)
  const isHardcodedSuperAdmin = (email: string | undefined): boolean => {
    if (!email) return false;
    return (siteConfig.auth.superAdminEmails as readonly string[]).includes(email.toLowerCase());
  };

  const fetchUserRole = async (userId: string, userEmail?: string): Promise<AppRole | null> => {
    // First check hardcoded super admins (works even if DB is down)
    if (isHardcodedSuperAdmin(userEmail)) {
      return 'super_admin';
    }
    
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .order('role')
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error('Error fetching role:', error);
        // Fallback: if user is hardcoded admin, still grant access
        return isHardcodedSuperAdmin(userEmail) ? 'super_admin' : null;
      }
      return data?.role as AppRole | null;
    } catch (err) {
      console.error('Error in fetchUserRole:', err);
      // Fallback: if user is hardcoded admin, still grant access
      return isHardcodedSuperAdmin(userEmail) ? 'super_admin' : null;
    }
  };

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        // Defer role fetching to prevent deadlock
        if (session?.user) {
          setTimeout(() => {
            fetchUserRole(session.user.id, session.user.email).then(setRole);
          }, 0);
        } else {
          setRole(null);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        fetchUserRole(session.user.id, session.user.email).then((r) => {
          setRole(r);
          setLoading(false);
        });
      } else {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error as Error | null };
  };

  const signUp = async (email: string, password: string, fullName?: string) => {
    const redirectUrl = `${window.location.origin}/`;
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: { full_name: fullName }
      }
    });
    return { error: error as Error | null };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setRole(null);
  };

  // Compute admin status (includes hardcoded failsafe)
  const isSuperAdminComputed = role === 'super_admin' || isHardcodedSuperAdmin(user?.email ?? undefined);
  
  const value: AuthContextType = {
    user,
    session,
    role,
    loading,
    signIn,
    signUp,
    signOut,
    isSuperAdmin: isSuperAdminComputed,
    isContentMaker: role === 'content_maker' || isSuperAdminComputed,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
