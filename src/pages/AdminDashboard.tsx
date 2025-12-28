import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Users, Upload, LogOut, Shield, FileText } from 'lucide-react';
import lmdaLogo from '@/assets/lmda-logo.png';

const AdminDashboard = () => {
  const { user, role, signOut, isSuperAdmin, isContentMaker } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-primary">
      {/* Header */}
      <header className="border-b border-primary-foreground/10">
        <div className="container-wide py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={lmdaLogo} alt="LMDA" className="h-10" />
            <div>
              <h1 className="heading-serif text-xl text-primary-foreground">Admin Portal</h1>
              <p className="text-sm text-primary-foreground/60">{user?.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="badge-gold text-xs">
              {role === 'super_admin' ? 'Super Admin' : role === 'content_maker' ? 'Content Maker' : 'Viewer'}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSignOut}
              className="text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container-wide py-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="heading-serif text-3xl text-primary-foreground mb-2">
            Welcome to the Dashboard
          </h2>
          <p className="text-primary-foreground/70 mb-10">
            Select an option below to manage your content.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Super Admin Panel */}
            {isSuperAdmin && (
              <button
                onClick={() => navigate('/admin/super')}
                className="group bg-primary-foreground/5 border border-primary-foreground/10 p-8 text-left hover:bg-primary-foreground/10 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-accent text-accent-foreground">
                    <Shield className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-primary-foreground mb-2">
                      User Management
                    </h3>
                    <p className="text-primary-foreground/60 text-sm">
                      Assign roles to team members. Grant or revoke Content Maker access.
                    </p>
                  </div>
                </div>
              </button>
            )}

            {/* Workshop Upload */}
            {isContentMaker && (
              <button
                onClick={() => navigate('/admin/upload')}
                className="group bg-primary-foreground/5 border border-primary-foreground/10 p-8 text-left hover:bg-primary-foreground/10 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-accent text-accent-foreground">
                    <Upload className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-primary-foreground mb-2">
                      Upload Workshop
                    </h3>
                    <p className="text-primary-foreground/60 text-sm">
                      Add new workshops, series, and training programs.
                    </p>
                  </div>
                </div>
              </button>
            )}

            {/* View Workshops */}
            {isContentMaker && (
              <button
                onClick={() => navigate('/admin/workshops')}
                className="group bg-primary-foreground/5 border border-primary-foreground/10 p-8 text-left hover:bg-primary-foreground/10 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary-foreground/10 text-primary-foreground">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-primary-foreground mb-2">
                      Manage Workshops
                    </h3>
                    <p className="text-primary-foreground/60 text-sm">
                      View, edit, or remove existing workshops.
                    </p>
                  </div>
                </div>
              </button>
            )}

            {/* Back to Site */}
            <button
              onClick={() => navigate('/')}
              className="group bg-transparent border border-primary-foreground/20 p-8 text-left hover:border-accent transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 border border-primary-foreground/20 text-primary-foreground">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-primary-foreground mb-2">
                    View Public Site
                  </h3>
                  <p className="text-primary-foreground/60 text-sm">
                    See how your workshops appear to visitors.
                  </p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
