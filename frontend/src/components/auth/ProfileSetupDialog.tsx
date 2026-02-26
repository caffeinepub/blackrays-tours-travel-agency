import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useGetCallerUserProfile, useSaveCallerUserProfile } from '../../hooks/useQueries';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { toast } from 'sonner';

export default function ProfileSetupDialog() {
  const { identity } = useInternetIdentity();
  const { data: userProfile, isLoading, isFetched } = useGetCallerUserProfile();
  const saveProfile = useSaveCallerUserProfile();
  const [name, setName] = useState('');

  const isAuthenticated = !!identity;
  const showDialog = isAuthenticated && !isLoading && isFetched && userProfile === null;

  const handleSave = async () => {
    if (!name.trim()) {
      toast.error('Please enter your name.');
      return;
    }
    try {
      await saveProfile.mutateAsync({ name: name.trim() });
      toast.success('Profile saved!');
    } catch {
      toast.error('Failed to save profile. Please try again.');
    }
  };

  return (
    <Dialog open={showDialog}>
      <DialogContent className="sm:max-w-md" onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle className="font-display">Welcome to Blackrays!</DialogTitle>
          <DialogDescription>
            Please enter your name to complete your profile setup.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 pt-2">
          <div className="space-y-1.5">
            <Label htmlFor="profile-name">Your Name</Label>
            <Input
              id="profile-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              onKeyDown={(e) => e.key === 'Enter' && handleSave()}
            />
          </div>
          <Button
            onClick={handleSave}
            disabled={saveProfile.isPending || !name.trim()}
            className="w-full"
          >
            {saveProfile.isPending ? 'Saving...' : 'Save Profile'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
