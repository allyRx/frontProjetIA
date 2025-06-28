
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, User, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<{ name?: string; email?: string; auth?: string }>({});
  const { login } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors: { name?: string; email?: string; auth?: string } = {};
    
    if (!name.trim()) {
      newErrors.name = 'Le nom est requis';
    }
    
    if (!email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Format d\'email invalide';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      const success = login(name, email);
      if (success) {
        navigate('/dashboard');
      } else {
        setErrors({ auth: 'Identifiants incorrects. Utilisez: admin / admin@email.com' });
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
      <Card className="w-full max-w-md shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="space-y-4 text-center">
          <div className="w-16 h-16 mx-auto bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Connexion
          </CardTitle>
          <CardDescription className="text-gray-600">
            Entrez vos informations pour vous connecter
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {errors.auth && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                <AlertCircle className="w-4 h-4 text-red-600" />
                <p className="text-sm text-red-600">{errors.auth}</p>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                Nom complet
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="name"
                  type="text"
                  placeholder="admin"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`pl-10 transition-all duration-200 ${
                    errors.name ? 'border-red-500 focus:border-red-500' : 'focus:border-blue-500'
                  }`}
                />
              </div>
              {errors.name && (
                <p className="text-sm text-red-600 animate-in slide-in-from-left-2 duration-200">
                  {errors.name}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Adresse email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`pl-10 transition-all duration-200 ${
                    errors.email ? 'border-red-500 focus:border-red-500' : 'focus:border-blue-500'
                  }`}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-600 animate-in slide-in-from-left-2 duration-200">
                  {errors.email}
                </p>
              )}
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-2.5 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Se connecter
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
