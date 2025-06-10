
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
import { AlertTriangle, Eye, EyeOff, UserPlus, Loader2 } from 'lucide-react'; // Changed AlertCircle to AlertTriangle
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { User, UserRole } from '@/services/user-management';
import { useTranslation } from 'react-i18next';
import { useToast } from '@/hooks/use-toast';
import { addUser } from '@/services/local-user-service';

const signupSchemaFactory = () => z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  confirmPassword: z.string(),
  role: z.enum(['Lawyer', 'Plaintiff', 'Defendant', 'CourtOfficial', 'Judge'], { required_error: 'role_required' }),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'passwords_dont_match',
  path: ['confirmPassword'],
});

type SignupFormValues = Omit<z.infer<ReturnType<typeof signupSchemaFactory>>, 'confirmPassword'>;

export default function SignupPage() {
  const router = useRouter();
  const { login } = useAppAuth();
  const { toast } = useToast();
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useTranslation();

  const signupSchema = signupSchemaFactory();

  const form = useForm<z.infer<ReturnType<typeof signupSchemaFactory>>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: undefined,
    },
  });

   const onSubmit = async (data: z.infer<ReturnType<typeof signupSchemaFactory>>) => {
      setError(null);
      setIsSubmitting(true);

      try {
        const newUserForDb = {
            name: data.name,
            email: data.email,
            role: data.role,
            passwordHash: data.password,
        };
        const userId = await addUser(newUserForDb);

        const newUser: User = {
            id: userId,
            name: data.name,
            email: data.email,
            role: data.role,
        };

        login(newUser);

         toast({
            title: t('signup.successTitle'),
            description: t('signup.successDescription', { email: data.email }),
          });
        
        // Redirect to dashboard after successful signup
        router.push('/dashboard');

      } catch (err: any) {
        let errorMessage = t('signup.error.unexpected');
        if (err.message === 'auth/email-already-in-use' || err.message === 'EMAIL_EXISTS') { // Handle Dexie error too
          errorMessage = t('signup.error.emailInUse');
           setError(errorMessage);
           form.setError('email', { type: 'manual', message: errorMessage });
        } else {
           setError(errorMessage);
        }

        toast({
            variant: "destructive",
            title: t('signup.failedTitle'),
            description: errorMessage,
        });
      } finally {
        setIsSubmitting(false);
      }
    };

  const getErrorMessage = (fieldError: typeof form.formState.errors.name | typeof form.formState.errors.password | typeof form.formState.errors.confirmPassword | typeof form.formState.errors.role | typeof form.formState.errors.email) => {
      if (!fieldError) return undefined;
      if (fieldError.message === 'passwords_dont_match') return t('signup.error.passwordsDontMatch');
      if (fieldError.message === 'role_required') return t('signup.error.roleRequired');
      if (fieldError.message === t('signup.error.emailInUse')) return t('signup.error.emailInUse');

      if (fieldError.path === 'name' && fieldError.type === 'too_small') return t('signup.error.nameLength');
      if (fieldError.path === 'email' && fieldError.type === 'invalid_string' && !fieldError.message?.includes('already in use')) return t('signup.error.invalidEmail');
      if (fieldError.path === 'password' && fieldError.type === 'too_small') return t('signup.error.passwordLength');

      return t('signup.error.generic');
   };

  const nameErrorMessage = getErrorMessage(form.formState.errors.name);
  const emailErrorMessage = getErrorMessage(form.formState.errors.email);
  const roleErrorMessage = getErrorMessage(form.formState.errors.role);
  const passwordErrorMessage = getErrorMessage(form.formState.errors.password);
  const confirmPasswordErrorMessage = getErrorMessage(form.formState.errors.confirmPassword);

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-160px)] py-12">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">{t('signup.title')}</CardTitle>
          <CardDescription>{t('signup.description')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 px-8 py-6">
          {error && !form.formState.errors.email && !form.formState.errors.confirmPassword && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>{t('signup.failedTitle')}</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">{t('signup.nameLabel')}</Label>
              <Input
                id="name"
                placeholder={t('signup.namePlaceholder')}
                autoComplete="name"
                {...form.register('name')}
                className={nameErrorMessage ? 'border-destructive focus:border-destructive ring-destructive' : 'focus:border-primary'}
                aria-invalid={!!nameErrorMessage}
                aria-describedby={nameErrorMessage ? "name-error" : undefined}
              />
              {nameErrorMessage && (
                <p id="name-error" className="text-sm text-destructive">{nameErrorMessage}</p>
              )}
            </div>
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
              <Label htmlFor="role">{t('signup.roleLabel')}</Label>
              <Select onValueChange={(value) => form.setValue('role', value as UserRole, { shouldValidate: true })} >
                <SelectTrigger id="role" className={roleErrorMessage ? 'border-destructive focus:border-destructive ring-destructive' : 'focus:border-primary'} aria-invalid={!!roleErrorMessage} aria-describedby={roleErrorMessage ? "role-error" : undefined}>
                  <SelectValue placeholder={t('selectRole')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Lawyer">{t('role.Lawyer')}</SelectItem>
                  <SelectItem value="Plaintiff">{t('role.Plaintiff')}</SelectItem>
                  <SelectItem value="Defendant">{t('role.Defendant')}</SelectItem>
                  <SelectItem value="CourtOfficial">{t('role.CourtOfficial')}</SelectItem>
                   <SelectItem value="Judge">{t('role.Judge')}</SelectItem>
                </SelectContent>
              </Select>
              {roleErrorMessage && (
                <p id="role-error" className="text-sm text-destructive">{roleErrorMessage}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{t('login.passwordLabel')}</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder={t('placeholders.password')}
                  autoComplete="new-password"
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
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">{t('signup.confirmPasswordLabel')}</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder={t('placeholders.password')}
                  autoComplete="new-password"
                  {...form.register('confirmPassword')}
                  className={confirmPasswordErrorMessage ? 'border-destructive focus:border-destructive ring-destructive' : 'focus:border-primary'}
                  aria-invalid={!!confirmPasswordErrorMessage}
                  aria-describedby={confirmPasswordErrorMessage ? "confirm-password-error" : undefined}
                />
                 <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-muted-foreground hover:text-primary"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={showConfirmPassword ? t("signup.hideConfirmPasswordAriaLabel") : t("signup.showConfirmPasswordAriaLabel")}
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </Button>
              </div>
              {confirmPasswordErrorMessage && (
                <p id="confirm-password-error" className="text-sm text-destructive">{confirmPasswordErrorMessage}</p>
              )}
            </div>
            <Button type="submit" className="w-full text-lg py-3" disabled={isSubmitting}>
              {isSubmitting ? (
                 <>
                   <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  {t('signup.creatingAccountButton')}
                </>
              ) : (
                <>
                  <UserPlus className="mr-2 h-5 w-5" /> {t('signup.signupButton')}
                </>
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center text-sm py-6">
          <p className="text-muted-foreground">
            {t('signup.hasAccount')}{' '}
            <Link href="/login" className="font-semibold text-primary hover:underline">
              {t('signup.loginLink')}
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

    