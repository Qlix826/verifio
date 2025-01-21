interface CompanyInfo {
  name: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  status: string;
}

// Données de test pour le développement
const TEST_DATA: Record<string, CompanyInfo> = {
  '1176786565': {
    name: 'GROUPE CONSEIL OSI INC.',
    address: '1000 RUE DE LA GAUCHETIERE OUEST, BUREAU 2400',
    city: 'MONTREAL',
    province: 'QC',
    postalCode: 'H3B 4W5',
    status: 'Immatriculée'
  }
};

export async function validateNEQ(neq: string): Promise<boolean> {
  try {
    const companyInfo = await fetchCompanyInfo(neq);
    return companyInfo !== null;
  } catch (error) {
    console.error('Error validating NEQ:', error);
    return false;
  }
}

export async function fetchCompanyInfo(neq: string): Promise<CompanyInfo | null> {
  try {
    // Vérifier le format du NEQ
    if (!/^\d{10}$/.test(neq)) {
      return null;
    }

    // En développement, utiliser les données de test
    if (process.env.NODE_ENV === 'development' && TEST_DATA[neq]) {
      return TEST_DATA[neq];
    }

    // En production, faire la requête à l'API
    const url = 'https://www.registreentreprises.gouv.qc.ca/api/entreprises/rechercher';
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent': 'Verifio/1.0'
      },
      body: JSON.stringify({
        critereRecherche: {
          typeRecherche: "NEQ",
          valeur: neq
        }
      })
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des informations');
    }

    const data = await response.json();
    
    // Si aucune entreprise trouvée, retourner null
    if (!data.entreprises?.[0]) {
      return null;
    }

    const entreprise = data.entreprises[0];
    return {
      name: entreprise.nomEntreprise,
      address: entreprise.adresse?.adresseLigne1 || '',
      city: entreprise.adresse?.municipalite || '',
      province: 'QC',
      postalCode: entreprise.adresse?.codePostal || '',
      status: entreprise.statutImmatriculation
    };
  } catch (error) {
    console.error('Error fetching company info:', error);
    // En développement, retourner les données de test si disponibles
    if (process.env.NODE_ENV === 'development' && TEST_DATA[neq]) {
      return TEST_DATA[neq];
    }
    return null;
  }
} 