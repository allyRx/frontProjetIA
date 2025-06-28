
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Mail, CheckCircle } from 'lucide-react';

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Tableau de bord
            </h1>
            <p className="text-lg text-gray-600 mt-2">
              <span className="inline-flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                Bienvenue {user?.name} !
              </span>
            </p>
          </div>
          <Button 
            onClick={logout}
            variant="outline"
            className="hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-colors"
          >
            Se déconnecter
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-blue-500" />
                Informations utilisateur
              </CardTitle>
              <CardDescription>
                Vos informations de connexion
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <User className="w-4 h-4 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">Nom</p>
                  <p className="font-medium text-gray-900">{user?.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                <Mail className="w-4 h-4 text-purple-600" />
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-medium text-gray-900">{user?.email}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-green-600">Connexion réussie !</CardTitle>
              <CardDescription>
                Vous êtes maintenant connecté(e) avec succès
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <p className="text-lg font-semibold text-gray-900 mb-2">
                  Bonjour {user?.name} !
                </p>
                <p className="text-gray-600">
                  Votre authentification a été validée avec les identifiants administrateur.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
