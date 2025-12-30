import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Plus, Trash2, Edit2, Eye, EyeOff } from 'lucide-react';
import { format } from 'date-fns';
import lmdaLogo from '@/assets/lmda-logo.webp';

interface Workshop {
  id: string;
  title: string;
  type: 'series' | 'free_workshop' | 'paid_workshop';
  status: 'upcoming' | 'open' | 'selling_fast' | 'fully_booked' | 'completed';
  price: number;
  date_time: string;
  is_active: boolean;
  cpd_points: boolean;
  trainer_name: string | null;
  flyer_url: string | null;
}

const WorkshopManage = () => {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  const fetchWorkshops = async () => {
    try {
      const { data, error } = await supabase
        .from('workshops')
        .select('*')
        .order('date_time', { ascending: false });

      if (error) throw error;
      setWorkshops(data as unknown as Workshop[] || []);
    } catch (err) {
      console.error('Error fetching workshops:', err);
      toast({
        title: 'Error',
        description: 'Failed to load workshops.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkshops();
  }, []);

  const toggleActive = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('workshops')
        .update({ is_active: !currentStatus })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: currentStatus ? 'Workshop Hidden' : 'Workshop Published',
        description: currentStatus
          ? 'This workshop is now hidden from the public.'
          : 'This workshop is now visible to the public.',
      });

      fetchWorkshops();
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to update workshop.',
        variant: 'destructive',
      });
    }
  };

  const deleteWorkshop = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      const { error } = await supabase
        .from('workshops')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Workshop Deleted',
        description: 'The workshop has been removed.',
      });

      fetchWorkshops();
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to delete workshop.',
        variant: 'destructive',
      });
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'series':
        return 'Series';
      case 'free_workshop':
        return 'Free';
      case 'paid_workshop':
        return 'Paid';
      default:
        return type;
    }
  };
  
  const getStatusLabel = (status: string) => {
    if (!status) return 'Open'; // Default fallback
    return status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const isPast = (dateStr: string) => new Date(dateStr) < new Date();

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
              <h1 className="heading-serif text-xl text-primary-foreground">Manage Workshops</h1>
              <p className="text-sm text-primary-foreground/60">
                {workshops.length} workshop{workshops.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
          <Button onClick={() => navigate('/admin/upload')} className="btn-gold">
            <Plus className="w-4 h-4 mr-2" />
            Add Workshop
          </Button>
        </div>
      </header>

      <main className="container-wide py-8">
        {isLoading ? (
          <div className="text-center py-12 text-primary-foreground/60">Loading...</div>
        ) : workshops.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-primary-foreground/60 mb-4">No workshops yet.</p>
            <Button onClick={() => navigate('/admin/upload')} className="btn-gold">
              Create Your First Workshop
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {workshops.map((workshop) => (
              <div
                key={workshop.id}
                className={`bg-primary-foreground/5 border border-primary-foreground/10 p-4 flex items-center gap-4 ${
                  !workshop.is_active ? 'opacity-60' : ''
                }`}
              >
                {/* Thumbnail */}
                {workshop.flyer_url ? (
                  <img
                    src={workshop.flyer_url}
                    alt={workshop.title}
                    className="w-16 h-20 object-cover shrink-0"
                  />
                ) : (
                  <div className="w-16 h-20 bg-primary-foreground/10 flex items-center justify-center shrink-0">
                    <span className="text-xs text-primary-foreground/40">No Image</span>
                  </div>
                )}

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-primary-foreground font-medium truncate">
                      {workshop.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-primary-foreground/60">
                    <span>{format(new Date(workshop.date_time), 'MMM d, yyyy h:mm a')}</span>
                    <span className="px-2 py-0.5 text-xs bg-primary-foreground/10">
                      {getTypeLabel(workshop.type)}
                    </span>
                    <span className={`px-2 py-0.5 text-xs rounded-sm ${
                      isPast(workshop.date_time) || workshop.status === 'completed' ? 'bg-slate-700 text-slate-200' :
                      workshop.status === 'selling_fast' ? 'bg-orange-900/50 text-orange-200' :
                      workshop.status === 'fully_booked' ? 'bg-red-900/50 text-red-200' :
                      'bg-green-900/30 text-green-200'
                    }`}>
                      {isPast(workshop.date_time) ? 'Completed' : getStatusLabel(workshop.status)}
                    </span>
                    {workshop.price > 0 && (
                      <span>PKR {workshop.price.toLocaleString()}</span>
                    )}
                    {workshop.cpd_points && (
                      <span className="badge-gold text-xs">0.5 CPD</span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleActive(workshop.id, workshop.is_active)}
                    className="text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10"
                    title={workshop.is_active ? 'Hide' : 'Show'}
                  >
                    {workshop.is_active ? (
                      <Eye className="w-4 h-4" />
                    ) : (
                      <EyeOff className="w-4 h-4" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate(`/admin/upload?id=${workshop.id}`)}
                    className="text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10"
                    title="Edit"
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteWorkshop(workshop.id, workshop.title)}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default WorkshopManage;
