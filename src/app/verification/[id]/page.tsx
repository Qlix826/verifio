import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"

export default function VerificationPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Finalisation de la demande de vérification</h1>
        
        <form className="space-y-8">
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Informations personnelles</h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="firstName" className="text-sm font-medium">
                  Prénom
                </label>
                <Input id="firstName" required />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="birthDate" className="text-sm font-medium">
                  Date de naissance
                </label>
                <Input id="birthDate" type="date" required />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium">
                Numéro de téléphone
              </label>
              <Input id="phone" type="tel" required />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Adresse e-mail
              </label>
              <Input id="email" type="email" required />
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Adresses des 5 dernières années</h2>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="mainAddress" className="text-sm font-medium">
                  Adresse principale
                </label>
                <Input id="mainAddress" required />
              </div>

              <div className="space-y-2">
                <label htmlFor="secondaryAddress" className="text-sm font-medium">
                  Adresse secondaire
                </label>
                <Input id="secondaryAddress" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="region" className="text-sm font-medium">
                    Localité/Région
                  </label>
                  <Input id="region" required />
                </div>

                <div className="space-y-2">
                  <label htmlFor="birthPlace" className="text-sm font-medium">
                    Lieu de naissance
                  </label>
                  <Input id="birthPlace" placeholder="ex: TUNIS, TUNISIE" required />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Consentement éclairé</h2>
            
            <div className="space-y-4 bg-gray-50 p-6 rounded-lg">
              <h3 className="font-medium">Autorisation à effectuer une recherche</h3>
              <p className="text-sm text-gray-600">
                JE CONSENS PAR LA PRÉSENTE À CE QU'UNE RECHERCHE SOIT EFFECTUÉE dans le Répertoire national des casiers judiciaires de la GRC à partir du ou des noms, de la date de naissance et, le cas échéant, des antécédents judiciaires que j'ai fournis. Je comprends que cette vérification ne sera pas confirmée par comparaison d'empreintes digitales, ce qui constitue l'unique moyen de confirmer formellement l'existence d'un casier judiciaire dans le Répertoire national des casiers judiciaires.
              </p>

              <h3 className="font-medium mt-4">Système(s) d'information de la police</h3>
              <p className="text-sm text-gray-600">
                JE CONSENS PAR LA PRÉSENTE À CE QU'UNE RECHERCHE SOIT EFFECTUÉE dans les systèmes d'information suivants de la police :
              </p>
              <ul className="list-disc list-inside text-sm text-gray-600 ml-4">
                <li>Banque de données d'enquête du CIPC</li>
                <li>Portail d'information policières (PIP)</li>
              </ul>

              <h3 className="font-medium mt-4">Autorisation et décharge</h3>
              <p className="text-sm text-gray-600">
                J'atteste que les renseignements que j'ai fournis dans la présente demande sont, à ma connaissance, exacts. Je consens à ce que les résultats des vérifications de casier judiciaire soient communiqués à verifioinc Services & solutions, situé(e) à Montréal, Canada.
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Par la présente, je libère à jamais tous les membres et employés du service de police chargé de traiter la demande ainsi que ceux de la Gendarmerie royale du Canada de toute action ou demande relative à tout dommage, toute perte ou tout préjudice, quelle qu'en soit la cause, que je pourrais subir par suite de la communication de l'information par Bridgewater à verifioinc Services & solutions, Montréal, Canada.
              </p>

              <div className="flex items-center space-x-2 mt-4">
                <Checkbox id="consent" required />
                <label htmlFor="consent" className="text-sm font-medium">
                  Je confirme avoir lu et accepté les conditions ci-dessus
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <Button type="submit">
              Soumettre ma demande
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
} 