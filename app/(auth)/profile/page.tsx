
'use client';

import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Edit3, Mail, User as UserIcon, Briefcase, LogOut, AlertTriangle } from 'lucide-react'; // Changed AlertCircle to AlertTriangle
import { Skeleton } from '@/components/ui/skeleton';
import { useTranslation } from 'react-i18next';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

export default function ProfilePage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const { t } = useTranslation();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/'); // Redirect to landing page if not logged in
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="container mx-auto py-12 px-4 md:px-6 max-w-2xl">
        <Card className="shadow-lg animate-pulse">
          <CardHeader className="items-center text-center border-b pb-6">
            <Skeleton className="h-28 w-28 rounded-full mb-4" />
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-64" />
          </CardHeader>
          <CardContent className="pt-8 space-y-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center space-x-3 p-3">
                <Skeleton className="h-6 w-6 rounded" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-full max-w-xs" />
              </div>
            ))}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
                <Skeleton className="h-10 flex-1 rounded-md" />
                <Skeleton className="h-10 flex-1 rounded-md" />
            </div>
          </CardContent>
        </Card>
        <p className="text-center text-muted-foreground mt-4">{t('profile.loading')}</p>
      </div>
    );
  }

  const getInitials = (name: string) => {
    if (!name) return 'U';
    const names = name.split(' ');
    if (names.length === 1) return names[0][0]?.toUpperCase() || 'U';
    return (names[0][0] + (names[names.length - 1][0] || '')).toUpperCase();
  };

  const imageSeed = user.id ? user.id.replace(/[^a-zA-Z0-9]/g, '') : 'defaultUser';
  const userImageSrc = `https://picsum.photos/seed/${imageSeed}/200/200`;

  return (
    <div className="container mx-auto py-12 px-4 md:px-6 max-w-2xl">
      <Card className="shadow-xl overflow-hidden rounded-xl">
        <CardHeader className="items-center text-center bg-muted/20 p-8 border-b">
          <Avatar className="h-32 w-32 mb-5 border-4 border-background ring-2 ring-primary shadow-lg">
            <AvatarImage src={userImageSrc} alt={t('profile.avatarAlt', {name: user.name})} data-ai-hint="profile avatar"/>
            <AvatarFallback className="text-5xl bg-primary/20 text-primary font-semibold">
              {t('profile.initialsFallback', {initials: getInitials(user.name)})}
            </AvatarFallback>
          </Avatar>
          <CardTitle className="text-3xl font-bold text-primary">{user.name}</CardTitle>
          <CardDescription className="text-lg text-muted-foreground">{t(`role.${user.role}`)}</CardDescription>
        </CardHeader>
        <CardContent className="p-8 space-y-6">
          <div className="space-y-4">
            <ProfileInfoItem icon={Mail} label={t('profile.info.email')} value={user.email} />
            <ProfileInfoItem icon={UserIcon} label={t('profile.info.userId')} value={user.id} />
            <ProfileInfoItem icon={Briefcase} label={t('profile.info.accountType')} value={t('profile.info.accountTypeValue', { role: t(`role.${user.role}`) })} />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t">
            <Button variant="outline" className="flex-1 py-3 text-base" disabled>
              <Edit3 className="mr-2 h-5 w-5" /> {t('profile.editButton')} ({t('common.disabled')})
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                logout(); 
                // Redirect is handled by useEffect which listens to user state change
              }}
              className="flex-1 py-3 text-base"
            >
              <LogOut className="mr-2 h-5 w-5" /> {t('profile.logoutButton')}
            </Button>
          </div>
          <p className="text-xs text-center text-muted-foreground mt-6">
            {t('profile.supportMessage')}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

interface ProfileInfoItemProps {
  icon: React.ElementType;
  label: string;
  value: string;
}

const ProfileInfoItem = ({ icon: Icon, label, value }: ProfileInfoItemProps) => {
   const { t } = useTranslation();
   return (
    <div className="flex items-start space-x-4 p-4 bg-background rounded-lg border shadow-sm hover:shadow-md transition-shadow">
      <Icon className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full gap-1 sm:gap-4">
        <span className="text-md font-medium text-muted-foreground">{label}:</span>
        <span className="text-md text-foreground sm:text-right break-all">{value || t('na')}</span>
      </div>
    </div>
)};

    