
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import NextgenEcourtLogo from '@/components/icons/NextgenEcourtLogo';
import { Award, FileText, GanttChartSquare, Globe, Lightbulb, LogIn, UserPlus, Users, Wand2, ShieldCheck, Files, TrendingUp, Scale, Briefcase, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from 'react-i18next';

export default function LandingPage() {
  const { user } = useAuth();
  const { t } = useTranslation();

  const features = [
    {
      icon: Wand2,
      titleKey: 'landing.features.aiSummaries.title',
      descriptionKey: 'landing.features.aiSummaries.description',
      dataAiHint: 'ai brain'
    },
    {
      icon: ShieldCheck,
      titleKey: 'landing.features.secureTracking.title',
      descriptionKey: 'landing.features.secureTracking.description',
      dataAiHint: 'security shield'
    },
    {
      icon: Files,
      titleKey: 'landing.features.documentManagement.title',
      descriptionKey: 'landing.features.documentManagement.description',
      dataAiHint: 'document stack'
    },
    {
      icon: Globe,
      titleKey: 'landing.features.remoteAccess.title',
      descriptionKey: 'landing.features.remoteAccess.description',
      dataAiHint: 'global access'
    },
  ];

  const benefits = [
    {
      icon: TrendingUp,
      titleKey: 'landing.benefits.efficiency.title',
      descriptionKey: 'landing.benefits.efficiency.description',
    },
    {
      icon: Users,
      titleKey: 'landing.benefits.accessibility.title',
      descriptionKey: 'landing.benefits.accessibility.description',
    },
    {
      icon: CheckCircle,
      titleKey: 'landing.benefits.transparency.title',
      descriptionKey: 'landing.benefits.transparency.description',
    },
    {
      icon: ShieldCheck,
      titleKey: 'landing.benefits.security.title',
      descriptionKey: 'landing.benefits.security.description',
    },
  ];

  const userRoles = [
    { icon: Scale, roleKey: 'role.Judge', descriptionKey: 'landing.roles.judge.description' },
    { icon: Briefcase, roleKey: 'role.Lawyer', descriptionKey: 'landing.roles.lawyer.description' },
    { icon: UserPlus, roleKey: 'role.Plaintiff', descriptionKey: 'landing.roles.litigant.description' }, // Generic for Plaintiff/Defendant
    { icon: FileText, roleKey: 'role.CourtOfficial', descriptionKey: 'landing.roles.official.description' },
  ];


  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="absolute inset-0 opacity-50">
          <Image
            src="https://picsum.photos/1920/1080?grayscale&blur=2"
            alt={t('landing.hero.imageAlt')}
            layout="fill"
            objectFit="cover"
            quality={75}
            priority
            data-ai-hint="court building abstract"
          />
        </div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="mb-8">
            <NextgenEcourtLogo />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-6">
            {t('landing.hero.title')}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
            {t('landing.hero.subtitle')}
          </p>
          <div className="space-x-4">
            <Link href={user ? "/dashboard" : "/login"} passHref>
              <Button size="lg" className="text-lg px-8 py-3">
                <LogIn className="mr-2 h-5 w-5" /> {user ? t('landing.hero.cta.dashboard') : t('landing.hero.cta.getStarted')}
              </Button>
            </Link>
             {!user && (
                <Link href="/signup" passHref>
                    <Button size="lg" variant="outline" className="text-lg px-8 py-3">
                        <UserPlus className="mr-2 h-5 w-5" /> {t('landing.hero.cta.signUp')}
                    </Button>
                </Link>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary tracking-tight">
              {t('landing.features.sectionTitle')}
            </h2>
            <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
              {t('landing.features.sectionSubtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
                <CardHeader className="items-center text-center">
                  <div className="p-4 bg-primary/10 rounded-full inline-block mb-4">
                    <feature.icon className="h-10 w-10 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{t(feature.titleKey)}</CardTitle>
                </CardHeader>
                <CardContent className="text-center text-muted-foreground">
                  <p>{t(feature.descriptionKey)}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

       {/* Benefits Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary tracking-tight">{t('landing.benefits.sectionTitle')}</h2>
            <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">{t('landing.benefits.sectionSubtitle')}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex flex-col items-center text-center p-6 bg-background rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="p-3 bg-green-500/10 rounded-full mb-4">
                  <benefit.icon className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">{t(benefit.titleKey)}</h3>
                <p className="text-muted-foreground text-sm">{t(benefit.descriptionKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Who We Serve Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary tracking-tight">
              {t('landing.roles.sectionTitle')}
            </h2>
            <p className="text-lg text-muted-foreground mt-2 max-w-3xl mx-auto">
              {t('landing.roles.sectionSubtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {userRoles.map((role, index) => (
              <div key={index} className="bg-card p-8 rounded-xl shadow-lg border border-border hover:border-primary/50 transition-colors duration-300">
                <div className="flex justify-center mb-6">
                   <div className="p-4 bg-primary/10 rounded-full inline-block">
                    <role.icon className="h-10 w-10 text-primary" />
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-center text-foreground mb-3">{t(role.roleKey)}</h3>
                <p className="text-muted-foreground text-center text-sm leading-relaxed">
                  {t(role.descriptionKey)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      {!user && (
        <section className="py-20 md:py-28 bg-gradient-to-r from-primary to-blue-600 text-primary-foreground">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t('landing.ctaBottom.title')}
            </h2>
            <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto opacity-90">
              {t('landing.ctaBottom.subtitle')}
            </p>
            <div className="space-y-4 sm:space-y-0 sm:space-x-4">
              <Link href="/signup" passHref>
                <Button size="lg" variant="secondary" className="text-lg px-10 py-3 text-primary bg-white hover:bg-gray-100">
                  <UserPlus className="mr-2 h-5 w-5" />{t('landing.ctaBottom.signUp')}
                </Button>
              </Link>
              <Link href="/login" passHref>
                <Button size="lg" variant="outline" className="text-lg px-10 py-3 border-white text-white hover:bg-white/10">
                 <LogIn className="mr-2 h-5 w-5" /> {t('landing.ctaBottom.login')}
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

    