
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  const { isAuthenticated, user } = useAuth();

  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center">
            <div className="w-16 h-16 mx-auto bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mb-4">
              <User className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Vous êtes connecté(e) !
            </CardTitle>
            <CardDescription>
              Bienvenue {user?.name}
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Mail className="w-4 h-4 text-blue-600" />
                <span className="text-sm text-gray-600">Email:</span>
              </div>
              <p className="font-medium text-gray-900">{user?.email}</p>
            </div>
            <Link to="/dashboard">
              <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                Aller au tableau de bord
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center">
          <div className="w-16 h-16 mx-auto bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
            <User className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Bienvenue
          </CardTitle>
          <CardDescription className="text-lg">
            Application de connexion simple
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <p className="text-gray-600">
            Connectez-vous avec votre nom et votre email pour accéder à votre espace personnel.
          </p>
          <Link to="/login">
            <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-2.5 transition-all duration-200 transform hover:scale-[1.02]">
              Se connecter
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
