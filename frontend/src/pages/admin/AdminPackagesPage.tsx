import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { ArrowLeft, Plus, Pencil, Trash2, Loader2, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useGetPublicPackages, useCreatePackage, useUpdatePackage, useDeletePackage } from '../../hooks/useQueries';
import { TourPackage } from '../../backend';
import { toast } from 'sonner';

interface PackageFormData {
  id: string;
  title: string;
  description: string;
  price: string;
  duration: string;
}

const emptyForm: PackageFormData = {
  id: '',
  title: '',
  description: '',
  price: '',
  duration: '',
};

export default function AdminPackagesPage() {
  const { data: packages, isLoading } = useGetPublicPackages();
  const createPackage = useCreatePackage();
  const updatePackage = useUpdatePackage();
  const deletePackage = useDeletePackage();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState<TourPackage | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [form, setForm] = useState<PackageFormData>(emptyForm);

  const handleOpenCreate = () => {
    setEditingPackage(null);
    setForm(emptyForm);
    setDialogOpen(true);
  };

  const handleOpenEdit = (pkg: TourPackage) => {
    setEditingPackage(pkg);
    setForm({
      id: pkg.id,
      title: pkg.title,
      description: pkg.description,
      price: pkg.price.toString(),
      duration: pkg.duration.toString(),
    });
    setDialogOpen(true);
  };

  const handleOpenDelete = (id: string) => {
    setDeletingId(id);
    setDeleteDialogOpen(true);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    if (!form.id || !form.title || !form.description || !form.price || !form.duration) {
      toast.error('Please fill in all fields.');
      return;
    }
    const price = parseInt(form.price);
    const duration = parseInt(form.duration);
    if (isNaN(price) || price <= 0) {
      toast.error('Please enter a valid price.');
      return;
    }
    if (isNaN(duration) || duration <= 0) {
      toast.error('Please enter a valid duration.');
      return;
    }

    try {
      if (editingPackage) {
        await updatePackage.mutateAsync({
          id: form.id,
          newPackage: {
            id: form.id,
            title: form.title,
            description: form.description,
            price: BigInt(price),
            duration: BigInt(duration),
          },
        });
        toast.success('Package updated successfully.');
      } else {
        await createPackage.mutateAsync({
          id: form.id,
          title: form.title,
          description: form.description,
          price: BigInt(price),
          duration: BigInt(duration),
        });
        toast.success('Package created successfully.');
      }
      setDialogOpen(false);
    } catch (err: any) {
      toast.error(err?.message || 'Failed to save package.');
    }
  };

  const handleDelete = async () => {
    if (!deletingId) return;
    try {
      await deletePackage.mutateAsync(deletingId);
      toast.success('Package deleted.');
      setDeleteDialogOpen(false);
    } catch (err: any) {
      toast.error(err?.message || 'Failed to delete package.');
    }
  };

  const isSaving = createPackage.isPending || updatePackage.isPending;

  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <section className="bg-foreground text-background py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/admin"
            className="inline-flex items-center gap-2 text-sm opacity-70 hover:opacity-100 transition-opacity mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <div className="flex items-center justify-between">
            <h1 className="font-display text-3xl font-bold">Tour Packages</h1>
            <Button
              onClick={handleOpenCreate}
              className="bg-background text-foreground hover:bg-background/90"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Package
            </Button>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="flex items-center justify-center py-24">
              <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
            </div>
          ) : packages && packages.length > 0 ? (
            <div className="space-y-3">
              {packages.map((pkg) => (
                <div
                  key={pkg.id}
                  className="border border-border rounded-sm p-5 bg-card flex items-start justify-between gap-4"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-display font-semibold text-foreground">{pkg.title}</h3>
                      <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded-sm">
                        ID: {pkg.id}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{pkg.description}</p>
                    <div className="flex gap-4 text-sm text-muted-foreground">
                      <span>₹{pkg.price.toString()}</span>
                      <span>{pkg.duration.toString()} days</span>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleOpenEdit(pkg)}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleOpenDelete(pkg.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-24 border border-dashed border-border rounded-sm">
              <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">No Packages Yet</h3>
              <p className="text-muted-foreground mb-6">Create your first tour package to get started.</p>
              <Button onClick={handleOpenCreate}>
                <Plus className="w-4 h-4 mr-2" />
                Add First Package
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Create/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-display">
              {editingPackage ? 'Edit Package' : 'Create New Package'}
            </DialogTitle>
            <DialogDescription>
              {editingPackage ? 'Update the tour package details.' : 'Fill in the details for the new tour package.'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="pkg-id">Package ID *</Label>
                <Input
                  id="pkg-id"
                  name="id"
                  value={form.id}
                  onChange={handleFormChange}
                  placeholder="e.g. goa-3days"
                  disabled={!!editingPackage}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="pkg-duration">Duration (days) *</Label>
                <Input
                  id="pkg-duration"
                  name="duration"
                  type="number"
                  min="1"
                  value={form.duration}
                  onChange={handleFormChange}
                  placeholder="e.g. 3"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="pkg-title">Title *</Label>
              <Input
                id="pkg-title"
                name="title"
                value={form.title}
                onChange={handleFormChange}
                placeholder="e.g. Goa Beach Holiday"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="pkg-price">Price (₹) *</Label>
              <Input
                id="pkg-price"
                name="price"
                type="number"
                min="1"
                value={form.price}
                onChange={handleFormChange}
                placeholder="e.g. 15000"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="pkg-description">Description *</Label>
              <Textarea
                id="pkg-description"
                name="description"
                value={form.description}
                onChange={handleFormChange}
                placeholder="Describe the tour package..."
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : editingPackage ? 'Update Package' : 'Create Package'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Package</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this package? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deletePackage.isPending ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
