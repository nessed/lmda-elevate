import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, UserPlus, Trash2, Shield, Edit2 } from 'lucide-react';
import { z } from 'zod';
import lmdaLogo from '@/assets/lmda-logo.png';

const emailSchema = z.string().email('Invalid email address').max(255);

interface UserWithRole {
  user_id: string;
  email: string;
  role: 'super_admin' | 'content_maker' | 'viewer';
  full_name: string | null;
}

const SuperAdminPanel = () => {
  const [users, setUsers] = useState<UserWithRole[]>([]);
  const [newEmail, setNewEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const fetchUsers = async () => {
    try {
      // Fetch profiles with roles
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('id, email, full_name');

      if (profilesError) throw profilesError;

      const { data: roles, error: rolesError } = await supabase
        .from('user_roles')
        .select('user_id, role');

      if (rolesError) throw rolesError;

      const combined = profiles?.map((profile) => {
        const userRole = roles?.find((r) => r.user_id === profile.id);
        return {
          user_id: profile.id,
          email: profile.email,
          full_name: profile.full_name,
          role: (userRole?.role || 'viewer') as 'super_admin' | 'content_maker' | 'viewer',
        };
      }) || [];

      setUsers(combined);
    } catch (err) {
      console.error('Error fetching users:', err);
      toast({
        title: 'Error',
        description: 'Failed to fetch users.',
        variant: 'destructive',
      });
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const assignContentMaker = async () => {
    const result = emailSchema.safeParse(newEmail.trim());
    if (!result.success) {
      toast({
        title: 'Invalid Email',
        description: result.error.errors[0].message,
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    try {
      // Find user by email
      const { data: profile, error: findError } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', newEmail.trim())
        .maybeSingle();

      if (findError) throw findError;

      if (!profile) {
        toast({
          title: 'User Not Found',
          description: 'This email is not registered. Ask them to sign up first.',
          variant: 'destructive',
        });
        setIsLoading(false);
        return;
      }

      // Check if already has content_maker role
      const { data: existingRole } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', profile.id)
        .eq('role', 'content_maker')
        .maybeSingle();

      if (existingRole) {
        toast({
          title: 'Already Assigned',
          description: 'This user already has Content Maker access.',
        });
        setIsLoading(false);
        return;
      }

      // Update existing role or insert new
      const { error: upsertError } = await supabase
        .from('user_roles')
        .upsert({
          user_id: profile.id,
          role: 'content_maker' as const,
        }, {
          onConflict: 'user_id,role'
        });

      if (upsertError) throw upsertError;

      toast({
        title: 'Success',
        description: `Content Maker role assigned to ${newEmail}`,
      });

      setNewEmail('');
      fetchUsers();
    } catch (err) {
      console.error('Error assigning role:', err);
      toast({
        title: 'Error',
        description: 'Failed to assign role. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const revokeRole = async (userId: string, email: string) => {
    if (email === 'ali.abid44444@gmail.com') {
      toast({
        title: 'Cannot Modify',
        description: 'Cannot revoke access from the Super Admin.',
        variant: 'destructive',
      });
      return;
    }

    try {
      // Update to viewer role instead of deleting
      const { error } = await supabase
        .from('user_roles')
        .update({ role: 'viewer' as const })
        .eq('user_id', userId);

      if (error) throw error;

      toast({
        title: 'Role Revoked',
        description: `${email} is now a Viewer.`,
      });

      fetchUsers();
    } catch (err) {
      console.error('Error revoking role:', err);
      toast({
        title: 'Error',
        description: 'Failed to revoke role.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-screen bg-primary">
      {/* Header */}
      <header className="border-b border-primary-foreground/10">
        <div className="container-wide py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/admin')}
              className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <img src={lmdaLogo} alt="LMDA" className="h-10" />
            <div>
              <h1 className="heading-serif text-xl text-primary-foreground">User Management</h1>
              <p className="text-sm text-primary-foreground/60">Assign roles to team members</p>
            </div>
          </div>
          <span className="badge-gold text-xs">Super Admin</span>
        </div>
      </header>

      <main className="container-wide py-12">
        <div className="max-w-3xl mx-auto">
          {/* Assign Role Section */}
          <div className="bg-primary-foreground/5 border border-primary-foreground/10 p-6 mb-8">
            <h2 className="text-lg font-semibold text-primary-foreground mb-4 flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-accent" />
              Assign Content Maker Role
            </h2>
            <div className="flex gap-3">
              <div className="flex-1">
                <Label htmlFor="email" className="sr-only">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="Enter team member's email address"
                  className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40"
                  maxLength={255}
                />
              </div>
              <Button
                onClick={assignContentMaker}
                disabled={isLoading || !newEmail}
                className="btn-gold"
              >
                {isLoading ? 'Assigning...' : 'Assign Role'}
              </Button>
            </div>
            <p className="text-xs text-primary-foreground/50 mt-2">
              The user must have an existing account. Ask them to sign up first if needed.
            </p>
          </div>

          {/* Team Members Table */}
          <div className="bg-primary-foreground/5 border border-primary-foreground/10">
            <div className="p-4 border-b border-primary-foreground/10">
              <h2 className="text-lg font-semibold text-primary-foreground flex items-center gap-2">
                <Shield className="w-5 h-5 text-accent" />
                Team Members
              </h2>
            </div>

            {isFetching ? (
              <div className="p-8 text-center text-primary-foreground/60">
                Loading...
              </div>
            ) : users.length === 0 ? (
              <div className="p-8 text-center text-primary-foreground/60">
                No users found.
              </div>
            ) : (
              <div className="divide-y divide-primary-foreground/10">
                {users.map((u) => (
                  <div key={u.user_id} className="p-4 flex items-center justify-between">
                    <div>
                      <p className="text-primary-foreground font-medium">
                        {u.full_name || u.email}
                      </p>
                      <p className="text-sm text-primary-foreground/60">{u.email}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className={`px-2 py-1 text-xs font-medium ${
                          u.role === 'super_admin'
                            ? 'bg-accent text-accent-foreground'
                            : u.role === 'content_maker'
                            ? 'bg-primary-foreground/20 text-primary-foreground'
                            : 'bg-primary-foreground/10 text-primary-foreground/60'
                        }`}
                      >
                        {u.role === 'super_admin'
                          ? 'Super Admin'
                          : u.role === 'content_maker'
                          ? 'Content Maker'
                          : 'Viewer'}
                      </span>
                      {u.role !== 'super_admin' && u.role !== 'viewer' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => revokeRole(u.user_id, u.email)}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default SuperAdminPanel;
