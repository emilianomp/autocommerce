"use client";

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

export default function LoginPage() {
  const [name, setName] = useState('');
  const { login } = useAuth();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      login(name.trim());
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center bg-gray-50 dark:bg-gray-900">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="font-headline text-2xl">Admin Access</CardTitle>
          <CardDescription>Enter your name to sign in (simulation)</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                aria-label="Name for login"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={!name.trim()}>
              Sign In
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
