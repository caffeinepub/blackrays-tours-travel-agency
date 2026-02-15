import { useState } from 'react';
import { useGetPublicPackages, useCreatePackage, useUpdatePackage, useDeletePackage } from '../../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { Plus, Edit, Trash2, Loader2, AlertCircle, Package } from 'lucide-react';
import type { TourPackage } from '../../backend';
import ProfileSetupDialog from '../../components/auth/ProfileSetupDialog';

export default function AdminPackagesPage() {
  const { data: packages, isLoading, error } = useGetPublicPackages();
  const createPackage = useCreatePackage();
  const updatePackage = useUpdatePackage();
  const deletePackage = useDeletePackage();

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState<TourPackage | null>(null);
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    description: '',
    price: '',
    duration: '',
  });

  const resetForm = () => {
    setFormData({ id: '', title: '', description: '', price: '', duration: '' });
    setEditingPackage(null);
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createPackage.mutateAsync({
        id: formData.id,
        title: formData.title,
        description: formData.description,
        price: BigInt(formData.price),
        duration: BigInt(formData.duration),
      });
      setIsCreateOpen(false);
      resetForm();
    } catch (error) {
      console.error('Failed to create package:', error);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPackage) return;

    try {
      await updatePackage.mutateAsync({
        id: editingPackage.id,
        newPackage: {
          id: formData.id,
          title: formData.title,
          description: formData.description,
          price: BigInt(formData.price),
          duration: BigInt(formData.duration),
        },
      });
      setEditingPackage(null);
      resetForm();
    } catch (error) {
      console.error('Failed to update package:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this package?')) return;

    try {
      await deletePackage.mutateAsync(id);
    } catch (error) {
      console.error('Failed to delete package:', error);
    }
  };

  const openEditDialog = (pkg: TourPackage) => {
    setEditingPackage(pkg);
    setFormData({
      id: pkg.id,
      title: pkg.title,
      description: pkg.description,
      price: pkg.price.toString(),
      duration: pkg.duration.toString(),
    });
  };

  return (
    <>
      <ProfileSetupDialog />
      <div className="py-12">
        <div className="container max-w-6xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-display text-4xl font-bold mb-2">Manage Packages</h1>
              <p className="text-muted-foreground">Create and manage tour packages</p>
            </div>
            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => resetForm()}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Package
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <form onSubmit={handleCreate}>
                  <DialogHeader>
                    <DialogTitle>Create New Package</DialogTitle>
                    <DialogDescription>
                      Add a new tour package to your catalog
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="create-id">Package ID *</Label>
                      <Input
                        id="create-id"
                        value={formData.id}
                        onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                        placeholder="unique-package-id"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="create-title">Title *</Label>
                      <Input
                        id="create-title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="Package title"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="create-description">Description *</Label>
                      <Textarea
                        id="create-description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Package description"
                        rows={4}
                        required
                      />
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="create-price">Price (USD) *</Label>
                        <Input
                          id="create-price"
                          type="number"
                          min="0"
                          value={formData.price}
                          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                          placeholder="1000"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="create-duration">Duration (Days) *</Label>
                        <Input
                          id="create-duration"
                          type="number"
                          min="1"
                          value={formData.duration}
                          onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                          placeholder="7"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setIsCreateOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={createPackage.isPending}>
                      {createPackage.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Creating...
                        </>
                      ) : (
                        'Create Package'
                      )}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {isLoading && (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-32 w-full" />
              ))}
            </div>
          )}

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>Failed to load packages. Please try again.</AlertDescription>
            </Alert>
          )}

          {!isLoading && !error && packages && packages.length === 0 && (
            <Alert>
              <Package className="h-4 w-4" />
              <AlertTitle>No Packages</AlertTitle>
              <AlertDescription>
                You haven't created any packages yet. Click "Add Package" to get started.
              </AlertDescription>
            </Alert>
          )}

          {!isLoading && !error && packages && packages.length > 0 && (
            <div className="space-y-4">
              {packages.map((pkg) => (
                <Card key={pkg.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle>{pkg.title}</CardTitle>
                        <CardDescription className="mt-2">{pkg.description}</CardDescription>
                        <div className="flex gap-4 mt-3 text-sm text-muted-foreground">
                          <span>Duration: {Number(pkg.duration)} days</span>
                          <span>Price: ${Number(pkg.price).toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => openEditDialog(pkg)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleDelete(pkg.id)}
                          disabled={deletePackage.isPending}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          )}

          {/* Edit Dialog */}
          <Dialog open={!!editingPackage} onOpenChange={(open) => !open && setEditingPackage(null)}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <form onSubmit={handleUpdate}>
                <DialogHeader>
                  <DialogTitle>Edit Package</DialogTitle>
                  <DialogDescription>Update package details</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-id">Package ID *</Label>
                    <Input
                      id="edit-id"
                      value={formData.id}
                      onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-title">Title *</Label>
                    <Input
                      id="edit-title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-description">Description *</Label>
                    <Textarea
                      id="edit-description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={4}
                      required
                    />
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="edit-price">Price (USD) *</Label>
                      <Input
                        id="edit-price"
                        type="number"
                        min="0"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-duration">Duration (Days) *</Label>
                      <Input
                        id="edit-duration"
                        type="number"
                        min="1"
                        value={formData.duration}
                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setEditingPackage(null)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={updatePackage.isPending}>
                    {updatePackage.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      'Update Package'
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </>
  );
}
