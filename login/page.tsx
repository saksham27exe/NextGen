
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth as useAppAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle, Eye, EyeOff, LogInIcon, Loader2 } from 'lucide-react'; // Changed AlertCircle to AlertTriangle for consistency
import type { User } from '@/services/user-management';
import { useTranslation } from 'react-i18next';
import { useToast } from '@/hooks/use-toast';
import { getUserByEmail, type UserWithPassword } from '@/services/local-user-service';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const authenticateUserLocally = async (email: string, password: string): Promise<User | null> => {
  const userWithPassword: UserWithPassword | undefined = await getUserByEmail(email);

  if (!userWithPassword) {
    return null;
  }

  if (userWithPassword.passwordHash === password) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash, ...userData } = userWithPassword;
    return userData;
  } else {
     return null;
  }
};

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAppAuth();
  const { toast } = useToast();
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useTranslation();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setError(null);
    setIsSubmitting(true);

    try {
      const authenticatedUser = await authenticateUserLocally(data.email, data.password);

      if (!authenticatedUser) {
        throw new Error(t('login.invalidCredentials'));
      }

      login(authenticatedUser);

      toast({
          title: t('login.successTitle'),
          description: t('login.successDescription', { name: authenticatedUser.name }),
        });
      
      // Redirect to dashboard after successful login
      router.push('/dashboard');

    } catch (err: any) {
      const errorMessage = err.message === t('login.invalidCredentials')
                            ? err.message
                            : t('login.unexpectedError');
      setError(errorMessage);
       toast({
            variant: "destructive",
            title: t('login.failedTitle'),
            description: errorMessage,
        });
    } finally {
      setIsSubmitting(false);
    }
  };

   const emailErrorMessage = form.formState.errors.email?.message ? t('login.error.invalidEmail') : undefined;
   const passwordErrorMessage = form.formState.errors.password?.message ? t('login.error.passwordRequired') : undefined;


  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-160px)] py-12">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">{t('login.title')}</CardTitle>
          <CardDescription>{t('login.description')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 px-8 py-6">
          {error && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>{t('login.failedTitle')}</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">{t('login.emailLabel')}</Label>
              <Input
                id="email"
                type="email"
                placeholder={t('placeholders.email')}
                autoComplete="email"
                {...form.register('email')}
                className={emailErrorMessage ? 'border-destructive focus:border-destructive ring-destructive' : 'focus:border-primary'}
                aria-invalid={!!emailErrorMessage}
                aria-describedby={emailErrorMessage ? "email-error" : undefined}
              />
              {emailErrorMessage && (
                <p id="email-error" className="text-sm text-destructive">{emailErrorMessage}</p>
              )}
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">{t('login.passwordLabel')}</Label>
                <Link href="#" className="text-sm text-primary hover:underline opacity-50 pointer-events-none">
                  {t('login.forgotPassword')}
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder={t('placeholders.password')}
                  autoComplete="current-password"
                  {...form.register('password')}
                  className={passwordErrorMessage ? 'border-destructive focus:border-destructive ring-destructive' : 'focus:border-primary'}
                  aria-invalid={!!passwordErrorMessage}
                  aria-describedby={passwordErrorMessage ? "password-error" : undefined}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-muted-foreground hover:text-primary"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? t("login.hidePasswordAriaLabel") : t("login.showPasswordAriaLabel")}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </Button>
              </div>
              {passwordErrorMessage && (
                <p id="password-error" className="text-sm text-destructive">{passwordErrorMessage}</p>
              )}
            </div>
            <Button type="submit" className="w-full text-lg py-3" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  {t('login.loggingInButton')}
                </>
              ) : (
                <>
                  <LogInIcon className="mr-2 h-5 w-5" /> {t('login.loginButton')}
                </>
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center text-sm py-6">
          <p className="text-muted-foreground">
            {t('login.noAccount')}{' '}
            <Link href="/signup" className="font-semibold text-primary hover:underline">
              {t('login.signupLink')}
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

    