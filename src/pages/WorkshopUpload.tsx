import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Upload, Info, Image as ImageIcon } from 'lucide-react';
import { z } from 'zod';
import lmdaLogo from '@/assets/lmda-logo.png';

const workshopSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  description: z.string().max(2000).optional(),
  type: z.enum(['series', 'free_workshop', 'paid_workshop']),
  status: z.enum(['upcoming', 'open', 'selling_fast', 'fully_booked', 'completed']),
  price: z.number().min(0).max(1000000),
  trainer_name: z.string().max(100).optional(),
  date_time: z.string().min(1, 'Date and time is required'),
  cpd_points: z.boolean(),
});

const WorkshopUpload = () => {
  const [searchParams] = useSearchParams();
  const editId = searchParams.get('id');
  const isEditMode = !!editId;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<'series' | 'free_workshop' | 'paid_workshop'>('paid_workshop');
  const [status, setStatus] = useState<'upcoming' | 'open' | 'selling_fast' | 'fully_booked' | 'completed'>('open');
  const [price, setPrice] = useState('');
  const [trainerName, setTrainerName] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [cpdPoints, setCpdPoints] = useState(false);
  const [flyer, setFlyer] = useState<File | null>(null);
  const [flyerPreview, setFlyerPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // New state to hold the original flyer URL when editing
  const [existingFlyerUrl, setExistingFlyerUrl] = useState<string | null>(null);

  const navigate = useNavigate();
  const { toast } = useToast();

  // Fetch data if in edit mode
  useEffect(() => {
    if (isEditMode) {
      const fetchWorkshop = async () => {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('workshops')
          .select('*')
          .eq('id', editId)
          .single();

        if (error) {
          console.error('Error fetching workshop:', error);
          toast({
            title: 'Error',
            description: 'Failed to load workshop data.',
            variant: 'destructive',
          });
          navigate('/admin/workshops');
        } else if (data) {
          setTitle(data.title);
          setDescription(data.description || '');
          setType(data.type);
          setStatus(data.status || 'open');
          setPrice(data.price.toString());
          setTrainerName(data.trainer_name || '');
          // Format date for datetime-local input: YYYY-MM-DDThh:mm
          const date = new Date(data.date_time);
          const formattedDate = date.toISOString().slice(0, 16); // Extract YYYY-MM-DDThh:mm
          setDateTime(formattedDate);
          setCpdPoints(data.cpd_points);
          
          if (data.flyer_url) {
            setExistingFlyerUrl(data.flyer_url);
            setFlyerPreview(data.flyer_url);
          }
        }
        setIsLoading(false);
      };

      fetchWorkshop();
    }
  }, [editId, isEditMode, navigate, toast]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast({
          title: 'Invalid File',
          description: 'Please upload an image file (PNG, JPG, WebP).',
          variant: 'destructive',
        });
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: 'File Too Large',
          description: 'Please upload an image under 5MB.',
          variant: 'destructive',
        });
        return;
      }
      setFlyer(file);
      setFlyerPreview(URL.createObjectURL(file));
      // Clear existing flyer URL if a new file is chosen, so we know to upload
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate form
      const validation = workshopSchema.safeParse({
        title: title.trim(),
        description: description.trim(),
        type,
        status,
        price: type === 'free_workshop' ? 0 : parseFloat(price) || 0,
        trainer_name: trainerName.trim(),
        date_time: dateTime,
        cpd_points: cpdPoints,
      });

      if (!validation.success) {
        toast({
          title: 'Validation Error',
          description: validation.error.errors[0].message,
          variant: 'destructive',
        });
        setIsLoading(false);
        return;
      }

      let flyerUrl = existingFlyerUrl;

      // Upload flyer if provided (overrides existing)
      if (flyer) {
        const fileExt = flyer.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from('workshop-flyers')
          .upload(fileName, flyer);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('workshop-flyers')
          .getPublicUrl(fileName);

        flyerUrl = publicUrl;
      }

      const workshopData = {
        title: validation.data.title,
        description: validation.data.description || null,
        type: validation.data.type,
        status: validation.data.status,
        price: validation.data.price,
        trainer_name: validation.data.trainer_name || null,
        date_time: new Date(validation.data.date_time).toISOString(),
        cpd_points: validation.data.cpd_points,
        flyer_url: flyerUrl,
        is_active: true, // Default to true on create/update
      };

      if (isEditMode) {
        // UPDATE
        const { error: updateError } = await supabase
          .from('workshops')
          .update(workshopData)
          .eq('id', editId);
        
        if (updateError) throw updateError;

        toast({
          title: 'Workshop Updated',
          description: 'Your changes have been saved.',
        });
      } else {
        // CREATE
        const { error: insertError } = await supabase
          .from('workshops')
          .insert(workshopData);

        if (insertError) throw insertError;

        toast({
          title: 'Workshop Created',
          description: 'Your workshop has been published successfully.',
      });
    }

      navigate('/admin/workshops');
    } catch (err) {
      console.error('Error saving workshop:', err);
      toast({
        title: 'Error',
        description: 'Failed to save workshop. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary">
      {/* Header */}
      <header className="border-b border-primary-foreground/10">
        <div className="container-wide py-4 flex items-center gap-4">
          <button
            onClick={() => navigate('/admin/workshops')}
            className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <img src={lmdaLogo} alt="LMDA" className="h-10" />
          <div>
            <h1 className="heading-serif text-xl text-primary-foreground">
              {isEditMode ? 'Edit Workshop' : 'Upload Workshop'}
            </h1>
            <p className="text-sm text-primary-foreground/60">
              {isEditMode ? 'Update training program details' : 'Add a new training program'}
            </p>
          </div>
        </div>
      </header>

      <main className="container-wide py-12">
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Flyer Upload */}
            <div className="bg-primary-foreground/5 border border-primary-foreground/10 p-6">
              <Label className="text-primary-foreground font-medium flex items-center gap-2 mb-4">
                <ImageIcon className="w-4 h-4" />
                Workshop Flyer
              </Label>
              
              <div
                className={`border-2 border-dashed border-primary-foreground/20 p-8 text-center cursor-pointer hover:border-accent transition-colors ${
                  flyerPreview ? 'border-accent' : ''
                }`}
                onClick={() => document.getElementById('flyer-input')?.click()}
              >
                {flyerPreview ? (
                  <div className="relative inline-block">
                    <img
                      src={flyerPreview}
                      alt="Flyer preview"
                      className="max-h-64 mx-auto object-contain"
                    />
                    {/* Overlay to hint at change */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity rounded-sm">
                       <p className="text-white text-sm font-medium flex items-center gap-2">
                         <Upload className="w-4 h-4" /> Change Image
                       </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-primary-foreground/60">
                    <Upload className="w-10 h-10 mx-auto mb-3 opacity-50" />
                    <p>Click to upload flyer image</p>
                    <p className="text-xs mt-1">PNG, JPG, WebP (max 5MB)</p>
                  </div>
                )}
                <input
                  id="flyer-input"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
              
              <div className="flex items-start gap-2 mt-3 text-xs text-primary-foreground/50">
                <Info className="w-4 h-4 shrink-0 mt-0.5" />
                <span>Upload 4:5 (1080×1350) or 1:1 (1080×1080) Instagram posters for best results.</span>
              </div>
            </div>

            {/* Title */}
            <div className="bg-primary-foreground/5 border border-primary-foreground/10 p-6 space-y-4">
              <div>
                <Label htmlFor="title" className="text-primary-foreground font-medium">
                  Workshop Title *
                </Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Sales Performance & KPIs Mastery"
                  required
                  className="mt-1.5 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40"
                  maxLength={200}
                />
              </div>

              <div>
                <Label htmlFor="description" className="text-primary-foreground font-medium">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Brief overview of the workshop content..."
                  rows={4}
                  className="mt-1.5 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40"
                  maxLength={2000}
                />
              </div>
            </div>

            {/* Type & Status & Price */}
            <div className="bg-primary-foreground/5 border border-primary-foreground/10 p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-primary-foreground font-medium flex items-center gap-2">
                    Category *
                  </Label>
                  <Select value={type} onValueChange={(v: 'series' | 'free_workshop' | 'paid_workshop') => setType(v)}>
                    <SelectTrigger className="mt-1.5 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="series">Series (Multi-session)</SelectItem>
                      <SelectItem value="paid_workshop">Paid Workshop</SelectItem>
                      <SelectItem value="free_workshop">Free Workshop</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label className="text-primary-foreground font-medium flex items-center gap-2">
                    Status *
                  </Label>
                  <Select value={status} onValueChange={(v: any) => setStatus(v)}>
                    <SelectTrigger className="mt-1.5 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="upcoming">Upcoming</SelectItem>
                      <SelectItem value="open">Open for Registration</SelectItem>
                      <SelectItem value="selling_fast">Selling Fast 🔥</SelectItem>
                      <SelectItem value="fully_booked">Fully Booked</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="col-span-2">
                  <Label htmlFor="price" className="text-primary-foreground font-medium">
                    Investment (PKR)
                  </Label>
                  <Input
                    id="price"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="e.g., 12000"
                    disabled={type === 'free_workshop'}
                    className="mt-1.5 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 disabled:opacity-50"
                    min={0}
                    max={1000000}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="trainer" className="text-primary-foreground font-medium">
                  Trainer / Facilitator
                </Label>
                <Input
                  id="trainer"
                  value={trainerName}
                  onChange={(e) => setTrainerName(e.target.value)}
                  placeholder="e.g., Dr. Ali Sajid"
                  className="mt-1.5 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40"
                  maxLength={100}
                />
              </div>

              <div>
                <Label htmlFor="datetime" className="text-primary-foreground font-medium">
                  Date & Time *
                </Label>
                <Input
                  id="datetime"
                  type="datetime-local"
                  value={dateTime}
                  onChange={(e) => setDateTime(e.target.value)}
                  required
                  className="mt-1.5 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <Checkbox
                  id="cpd"
                  checked={cpdPoints}
                  onCheckedChange={(checked) => setCpdPoints(!!checked)}
                  className="border-primary-foreground/30 data-[state=checked]:bg-accent data-[state=checked]:border-accent"
                />
                <Label htmlFor="cpd" className="text-primary-foreground text-sm cursor-pointer">
                  This workshop awards 0.5 CPD Points
                </Label>
              </div>
            </div>

            {/* Submit */}
            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/admin/workshops')}
                className="flex-1 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="flex-1 btn-gold"
              >
                {isLoading ? (isEditMode ? 'Updating...' : 'Publishing...') : (isEditMode ? 'Update Workshop' : 'Publish Workshop')}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default WorkshopUpload;
