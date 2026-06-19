'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <main className="flex-1">
      {/* Header/Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">W</span>
              </div>
              <span className="font-bold text-lg hidden sm:inline">WoW Education</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/auth/login"
              className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Login
            </Link>
            <Link
              href="/auth/register"
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Register
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950 dark:to-indigo-900 py-20 sm:py-32">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 dark:bg-blue-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-200 dark:bg-indigo-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              WoW Education ERP
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Comprehensive School Management System for Modern Education
          </p>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            Designed for ICSE-affiliated schools. Manage students, teachers, academics, attendance, and finances all in one place.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/login"
              className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all transform hover:scale-105 active:scale-95"
            >
              Login to Dashboard
            </Link>
            <Link
              href="#features"
              className="px-8 py-3 border-2 border-primary text-primary rounded-lg font-medium hover:bg-primary/10 transition-all"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 sm:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Powerful Features</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to manage your school efficiently and effectively
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature Cards */}
            {[
              {
                title: 'Admin Portal',
                description: 'Full control over students, teachers, admissions, and finances with comprehensive dashboard.',
                icon: '⚙️',
              },
              {
                title: 'Teacher Management',
                description: 'Teachers can manage attendance, assignments, and communicate with parents effortlessly.',
                icon: '👨‍🏫',
              },
              {
                title: 'Parent Portal',
                description: 'Parents can track their child\'s attendance, homework, fees, and notices in real-time.',
                icon: '👨‍👩‍👧‍👦',
              },
              {
                title: 'Attendance System',
                description: 'Digital attendance tracking with biometric sync support for accurate record-keeping.',
                icon: '📋',
              },
              {
                title: 'Financial Management',
                description: 'Complete fee structure management, payment tracking, and automated receipts generation.',
                icon: '💰',
              },
              {
                title: 'Data Security',
                description: 'Enterprise-grade encryption for sensitive data including Aadhaar numbers and personal information.',
                icon: '🔒',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="card hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Role-Based Access Section */}
      <section className="py-20 sm:py-32 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Role-Based Access Control</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Tailored interfaces and permissions for each user role
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                role: 'Admin',
                permissions: [
                  'Manage all users',
                  'View system analytics',
                  'Manage admissions',
                  'Financial oversight',
                  'System configuration',
                ],
                color: 'from-red-500 to-pink-500',
              },
              {
                role: 'Teacher',
                permissions: [
                  'Mark attendance',
                  'Upload assignments',
                  'Post notices',
                  'View timetable',
                  'Communicate with parents',
                ],
                color: 'from-blue-500 to-cyan-500',
              },
              {
                role: 'Parent/Student',
                permissions: [
                  'View attendance',
                  'Access homework',
                  'Check fees',
                  'Read notices',
                  'View timetable',
                ],
                color: 'from-green-500 to-emerald-500',
              },
            ].map((roleInfo, index) => (
              <div key={index} className="card border-l-4 border-l-transparent hover:border-l-primary transition-all">
                <h3 className={`text-2xl font-bold mb-6 bg-gradient-to-r ${roleInfo.color} bg-clip-text text-transparent`}>
                  {roleInfo.role}
                </h3>
                <ul className="space-y-3">
                  {roleInfo.permissions.map((permission, pIndex) => (
                    <li key={pIndex} className="flex items-center gap-3">
                      <span className="w-2 h-2 bg-primary rounded-full" />
                      <span className="text-muted-foreground">{permission}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Ready to Transform Your School?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Start using WoW Education ERP today and experience the difference
          </p>
          <Link
            href="/auth/login"
            className="inline-block px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-all"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-background py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-semibold mb-4">WoW Education</h4>
              <p className="text-sm text-muted-foreground">Comprehensive school management system for modern education.</p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Product</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Security</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Company</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">About</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Support</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Legal</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Cookies</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © 2024 WoW Education. All rights reserved.
            </p>
            <div className="flex gap-4 mt-4 sm:mt-0">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Twitter</a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">LinkedIn</a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Facebook</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}