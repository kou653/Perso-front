import { useState } from 'react';
import { Lock, Search, Download, RefreshCw, AlertCircle, ExternalLink, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxn70lAUY90eerektwDfRXTg8ImxRvQrxyXpsEja2tSLJ5_iwdSyoZjgdZthvIAQAkBgA/exec";

export function AdminHistoryPage() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchOrders = async (pwd) => {
    setIsLoading(true);
    setErrorMsg('');
    try {
      const response = await fetch(`${SCRIPT_URL}?pwd=${encodeURIComponent(pwd)}`);
      const data = await response.json();
      
      if (data.error) {
        setErrorMsg(data.error);
        setIsAuthenticated(false);
      } else {
        // Reverse array to have newest orders at the top
        setOrders(data.reverse());
        setIsAuthenticated(true);
      }
    } catch (err) {
      setErrorMsg("Erreur de connexion au serveur. Vérifiez votre connexion.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (password) {
      fetchOrders(password);
    }
  };

  // Filtrer les commandes
  const filteredOrders = orders.filter(o => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      (o.Client && o.Client.toLowerCase().includes(term)) ||
      (o.Téléphone && o.Téléphone.toLowerCase().includes(term)) ||
      (o.Produit && o.Produit.toLowerCase().includes(term))
    );
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-6">
        <Card className="w-full max-w-md border-border/60 shadow-lg">
          <div className="p-8 space-y-6">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
              <Lock className="h-8 w-8" />
            </div>
            <div className="text-center space-y-2">
              <h1 className="text-2xl font-bold tracking-tight">Accès Sécurisé</h1>
              <p className="text-sm text-muted-foreground">
                Entrez le mot de passe administrateur pour voir l'historique des commandes.
              </p>
            </div>
            
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12"
              />
              {errorMsg && (
                <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm font-medium flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  {errorMsg}
                </div>
              )}
              <Button type="submit" className="w-full h-12 font-bold cursor-pointer" disabled={isLoading}>
                {isLoading ? "Vérification..." : "Accéder à l'historique"}
              </Button>
            </form>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Historique des Commandes</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Connecté à Google Sheets. {orders.length} commande(s) enregistrée(s).
          </p>
        </div>
        
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => fetchOrders(password)} disabled={isLoading} className="cursor-pointer">
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Actualiser
          </Button>
          <Button variant="default" asChild className="cursor-pointer">
            <a href="https://docs.google.com/spreadsheets" target="_blank" rel="noreferrer">
              <ExternalLink className="h-4 w-4 mr-2" />
              Ouvrir le fichier
            </a>
          </Button>
        </div>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Rechercher par client, téléphone ou produit..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 h-11"
        />
      </div>

      <div className="bg-card border border-border/60 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/50 text-muted-foreground text-xs uppercase font-semibold">
              <tr>
                <th className="px-6 py-4 whitespace-nowrap">Date</th>
                <th className="px-6 py-4">Client</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4">Produit</th>
                <th className="px-6 py-4 min-w-[200px]">Personnalisation</th>
                <th className="px-6 py-4 text-center">Image</th>
                <th className="px-6 py-4 text-center">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-muted-foreground">
                    Aucune commande trouvée.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order, idx) => (
                  <tr key={idx} className="hover:bg-muted/20 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-foreground">
                      {order.Date ? new Date(order.Date).toLocaleString('fr-FR', {
                        day: '2-digit', month: '2-digit', year: 'numeric',
                        hour: '2-digit', minute: '2-digit'
                      }) : 'N/A'}
                    </td>
                    <td className="px-6 py-4 font-semibold text-foreground">
                      {order.Client}
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      <div>{order.Téléphone}</div>
                      <div className="text-xs">{order.Livraison}</div>
                    </td>
                    <td className="px-6 py-4">
                      {order.Produit}
                    </td>
                    <td className="px-6 py-4 text-xs text-muted-foreground leading-relaxed">
                      {order.Personnalisation}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {order['Lien Image'] && order['Lien Image'].startsWith('http') ? (
                        <a href={order['Lien Image']} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors" title="Voir l'image">
                          <ImageIcon className="h-5 w-5" />
                        </a>
                      ) : (
                        <span className="text-muted-foreground/50">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                        {order.Statut || 'Nouvelle'}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
