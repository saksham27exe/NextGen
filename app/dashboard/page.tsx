
'use client';

import { useState, useEffect, useMemo } from 'react';
import CaseCard from '@/components/cases/CaseCard';
import type { Case } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ListFilter, Loader2, PlusCircle, SearchX, LayoutDashboard, Search, AlertTriangle, Trash2 } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from '@/components/ui/input';
import { useTranslation } from 'react-i18next';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { getAllCases, getCasesByUserId, deleteCase as deleteCaseFromDb } from '@/services/local-case-service';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation'; // Import useRouter for redirect

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter(); // Initialize useRouter
  const [allCases, setAllCases] = useState<Case[]>([]);
  const [filteredCases, setFilteredCases] = useState<Case[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [caseToDelete, setCaseToDelete] = useState<Case | null>(null);
  const { t } = useTranslation();
  const { toast } = useToast();

  const loadCases = async () => {
    if (!user) {
      setAllCases([]);
      setFilteredCases([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      let userCases: Case[] = [];
      if (user.role === 'CourtOfficial') {
        userCases = await getAllCases();
      } else {
        userCases = await getCasesByUserId(user.id);
      }
      setAllCases(userCases);
    } catch (error) {
      console.error("[Dashboard] Error loading cases from Dexie:", error);
      setAllCases([]);
       toast({
         variant: "destructive",
         title: t('error.genericTitle'),
         description: t('dashboard.error.loadFailed'),
       });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading) {
      if (user) {
        loadCases();
      } else {
        // If not authenticated and not loading, redirect to landing page
        router.push('/');
        setIsLoading(false); // Ensure loading is set to false
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, authLoading, router]);

  useEffect(() => {
    let statusFiltered = statusFilter === 'all' ? allCases : allCases.filter(c => c.status === statusFilter);

    let finalFilteredCases = statusFiltered;
    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      finalFilteredCases = statusFiltered.filter(c =>
        c.caseNumber.toLowerCase().includes(lowerSearchTerm) ||
        c.title.toLowerCase().includes(lowerSearchTerm) ||
        (c.plaintiff && c.plaintiff.toLowerCase().includes(lowerSearchTerm)) ||
        (c.defendant && c.defendant.toLowerCase().includes(lowerSearchTerm))
      );
    }
    setFilteredCases(finalFilteredCases);
  }, [allCases, searchTerm, statusFilter]);


  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };


  const uniqueStatuses = useMemo(() => {
    const statuses = new Set(allCases.map(c => c.status));
    return ['all', ...Array.from(statuses).sort()];
  }, [allCases]);

   const openDeleteDialog = (caseItem: Case) => {
     setCaseToDelete(caseItem);
   };

   const closeDeleteDialog = () => {
     setCaseToDelete(null);
     setIsDeleting(false);
   };

   const handleDeleteCase = async () => {
     if (!caseToDelete) return;
     setIsDeleting(true);
     try {
       await deleteCaseFromDb(caseToDelete.caseNumber);
       toast({
         title: t('toast.caseDeleted.title'),
         description: t('toast.caseDeleted.description', { caseIdentifier: caseToDelete.caseNumber }),
       });
       loadCases(); 
       closeDeleteDialog();
     } catch (error: any) {
       console.error(`[Dashboard] Error deleting case ${caseToDelete.caseNumber}:`, error);
       toast({
         variant: "destructive",
         title: t('error.genericTitle'),
         description: error.message || t('toast.deleteFailed'),
       });
       setIsDeleting(false);
     }
   };


  if (authLoading || isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="ml-4 text-lg text-muted-foreground">{t('dashboard.loading')}</p>
      </div>
    );
  }

  // This check might be redundant if useEffect above handles redirect, but kept for safety.
  if (!user) {
    // Component will likely unmount due to redirect, but good practice to not render sensitive content.
    return null;
  }

  let dashboardTitleKey = 'dashboard.title.other';
  if (user.role === 'Judge') dashboardTitleKey = 'dashboard.title.judge';
  if (user.role === 'CourtOfficial') dashboardTitleKey = 'dashboard.title.official';


  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold tracking-tight flex items-center">
          <LayoutDashboard className="mr-3 h-8 w-8 text-primary" />
          {t(dashboardTitleKey)} ({user.name})
        </h1>
        {user.role === 'CourtOfficial' && (
           <Link href="/add-case">
            <Button >
              <PlusCircle className="mr-2 h-4 w-4" /> {t('dashboard.addNewCase')}
            </Button>
          </Link>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6 p-4 bg-muted/50 rounded-lg border">
         <div className="relative flex-grow">
             <Input
               type="search"
               placeholder={t('caseSearch.placeholder')}
               value={searchTerm}
               onChange={handleSearch}
               className="pl-10 w-full bg-background"
               aria-label={t('caseSearch.placeholder')}
             />
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
           </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <ListFilter className="h-5 w-5 text-muted-foreground flex-shrink-0" />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-[200px] bg-background" aria-label={t('filterByStatus')}>
              <SelectValue placeholder={t('filterByStatus')} />
            </SelectTrigger>
            <SelectContent>
              {uniqueStatuses.map(status => (
                <SelectItem key={status} value={status}>
                  {status === 'all' ? t('allStatuses') : t(`status.${status}`)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredCases.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCases.map((caseItem) => (
            <CaseCard
                key={caseItem.caseNumber}
                caseData={caseItem}
                showDeleteButton={user.role === 'CourtOfficial'}
                onDelete={() => openDeleteDialog(caseItem)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-card rounded-lg border-2 border-dashed">
          <SearchX className="mx-auto h-20 w-20 text-muted-foreground mb-6" />
          <h2 className="text-2xl font-semibold text-foreground">{t('dashboard.noCasesFound')}</h2>
          <p className="text-muted-foreground mt-2 max-w-md mx-auto">
            {searchTerm || statusFilter !== 'all'
              ? t('dashboard.noCasesFound.description.filtered')
              : (user.role === 'Judge' ? t('dashboard.noCasesFound.description.judge.empty') :
                 user.role === 'CourtOfficial' ? t('dashboard.noCasesFound.description.official.empty') : 
                 t('dashboard.noCasesFound.description.other.empty'))
            }
          </p>
           {user.role === 'CourtOfficial' && !searchTerm && statusFilter === 'all' && allCases.length === 0 && (
             <Link href="/add-case" className="mt-6 inline-block">
               <Button variant="outline">
                 <PlusCircle className="mr-2 h-4 w-4" /> {t('dashboard.addYourFirstCase')}
               </Button>
             </Link>
           )}
        </div>
      )}

       {caseToDelete && (
         <AlertDialog open={!!caseToDelete} onOpenChange={(open) => !open && closeDeleteDialog()}>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle>{t('page.judgeDashboard.modal.delete.title')}</AlertDialogTitle>
                <AlertDialogDescription>
                    {t('page.judgeDashboard.modal.delete.description.local', { caseIdentifier: caseToDelete.caseNumber })}
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                <AlertDialogCancel onClick={closeDeleteDialog} disabled={isDeleting}>{t('cancel')}</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteCase} disabled={isDeleting} className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">
                    {isDeleting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Trash2 className="mr-2 h-4 w-4" />}
                    {t('page.judgeDashboard.modal.delete.action')}
                </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
         </AlertDialog>
       )}
    </div>
  );
}

    