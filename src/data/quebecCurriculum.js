/**
 * Quebec Education Program (Programme de formation de l'école québécoise)
 * Official curriculum data for Secondary 1-5 (Grades 7-11)
 * Based on Ministère de l'Éducation du Québec regulations
 */

export const QUEBEC_CURRICULUM = {
  cycles: {
    cycleOne: {
      name: 'Cycle One',
      years: ['Secondary I', 'Secondary II'],
      grades: [7, 8],
      description: 'Foundation cycle focusing on core competencies',
    },
    cycleTwo: {
      name: 'Cycle Two',
      years: ['Secondary III', 'Secondary IV', 'Secondary V'],
      grades: [9, 10, 11],
      description: 'Specialization and preparation for graduation',
    },
  },

  subjects: {
    // Language of Instruction (French for French schools, English for English schools)
    french: {
      id: 'french',
      name: 'Français, langue d\'instruction',
      englishName: 'French, Language of Instruction',
      category: 'language',
      mandatory: true,
      cycles: {
        cycleOne: {
          hours: 400,
          credits: 16,
          years: ['Secondary I', 'Secondary II'],
        },
        cycleTwo: {
          secondaryIII: { hours: 150, credits: 6 },
          secondaryIV: { hours: 150, credits: 6 },
          secondaryV: { hours: 200, credits: 8 },
        },
      },
      competencies: [
        {
          id: 'reading',
          name: 'Lire et apprécier des textes variés',
          description: 'Lire et apprécier des textes variés',
          skills: [
            'Compréhension de textes littéraires et informatifs',
            'Analyse et interprétation de textes',
            'Habiletés de lecture critique',
            'Compréhension de la structure textuelle et des procédés littéraires',
          ],
        },
        {
          id: 'writing',
          name: 'Écrire des textes variés',
          description: 'Écrire des textes variés',
          skills: [
            'Écriture pour différents buts et publics',
            'Planification et organisation de textes',
            'Maîtrise de la grammaire et de la syntaxe',
            'Habiletés de révision et de correction',
          ],
        },
        {
          id: 'oral',
          name: 'Communiquer oralement',
          description: 'Communiquer oralement',
          skills: [
            'Expression orale et présentation',
            'Écoute active',
            'Habiletés de débat et de discussion',
            'Prise de parole en public',
          ],
        },
      ],
      graduationRequirement: {
        level: 'Secondary V',
        credits: 6,
        mandatory: true,
      },
    },

    english: {
      id: 'english',
      name: 'English, Second Language',
      englishName: 'English, Second Language',
      category: 'language',
      mandatory: true,
      cycles: {
        cycleOne: {
          hours: 200,
          credits: 8,
          years: ['Secondary I', 'Secondary II'],
        },
        cycleTwo: {
          secondaryIII: { hours: 100, credits: 4 },
          secondaryIV: { hours: 100, credits: 4 },
          secondaryV: { hours: 150, credits: 6 },
        },
      },
      competencies: [
        {
          id: 'reinvest',
          name: 'Réinvestir sa compréhension de textes',
          description: 'Réinvestir sa compréhension de textes',
          skills: [
            'Compréhension de lecture',
            'Analyse de textes',
            'Acquisition du vocabulaire',
            'Compréhension culturelle',
          ],
        },
        {
          id: 'write',
          name: 'Écrire des textes',
          description: 'Écrire des textes',
          skills: [
            'Écriture en anglais',
            'Grammaire et vocabulaire',
            'Organisation de textes',
            'Habiletés de correction',
          ],
        },
        {
          id: 'interact',
          name: 'Interagir en anglais',
          description: 'Interagir en anglais',
          skills: [
            'Communication orale',
            'Compréhension auditive',
            'Habiletés conversationnelles',
            'Prononciation',
          ],
        },
      ],
      graduationRequirement: {
        level: 'Secondary V',
        credits: 4,
        mandatory: true,
      },
    },

    mathematics: {
      id: 'math',
      name: 'Mathématiques',
      englishName: 'Mathematics',
      category: 'stem',
      mandatory: true,
      cycles: {
        cycleOne: {
          hours: 300,
          credits: 12,
          years: ['Secondary I', 'Secondary II'],
        },
        cycleTwo: {
          secondaryIII: { hours: 150, credits: 6 },
          secondaryIV: { hours: 100, credits: 4, alternative: { hours: 150, credits: 6 } },
          secondaryV: { hours: 100, credits: 4, alternative: { hours: 150, credits: 6 } },
        },
      },
      competencies: [
        {
          id: 'solve',
          name: 'Résoudre une situation-problème',
          description: 'Résoudre une situation-problème',
          skills: [
            'Identification et analyse de problèmes',
            'Modélisation mathématique',
            'Sélection de stratégies',
            'Vérification de solutions',
          ],
        },
        {
          id: 'reason',
          name: 'Utiliser un raisonnement mathématique',
          description: 'Utiliser un raisonnement mathématique',
          skills: [
            'Raisonnement logique',
            'Formulation de conjectures',
            'Justification de solutions',
            'Preuve mathématique',
          ],
        },
        {
          id: 'communicate',
          name: 'Communiquer à l\'aide du langage mathématique',
          description: 'Communiquer à l\'aide du langage mathématique',
          skills: [
            'Notation mathématique',
            'Représentation graphique',
            'Explication du raisonnement',
            'Utilisation du vocabulaire mathématique',
          ],
        },
      ],
      topics: {
        secondaryI: [
          'Numbers and operations',
          'Fractions and decimals',
          'Geometry basics',
          'Measurement',
          'Data analysis',
        ],
        secondaryII: [
          'Integers and rational numbers',
          'Proportionality',
          'Algebraic expressions',
          'Geometric transformations',
          'Statistics',
        ],
        secondaryIII: [
          'Linear functions',
          'Quadratic functions',
          'Exponential functions',
          'Trigonometry basics',
          'Probability',
        ],
        secondaryIV: [
          'Advanced algebra',
          'Quadratic equations',
          'Trigonometric functions',
          'Analytical geometry',
          'Statistics and probability',
        ],
        secondaryV: [
          'Exponential and logarithmic functions',
          'Trigonometric functions',
          'Sequences and series',
          'Advanced probability',
          'Calculus preparation',
        ],
      },
      graduationRequirement: {
        level: 'Secondary IV',
        credits: 4,
        mandatory: true,
      },
    },

    science: {
      id: 'science',
      name: 'Science et technologie',
      englishName: 'Science and Technology',
      category: 'stem',
      mandatory: true,
      cycles: {
        cycleOne: {
          hours: 200,
          credits: 8,
          years: ['Secondary I', 'Secondary II'],
        },
        cycleTwo: {
          secondaryIII: { hours: 150, credits: 6 },
          secondaryIV: { hours: 100, credits: 4 },
          secondaryV: { hours: 0, credits: 0, optional: true },
        },
      },
      competencies: [
        {
          id: 'seek',
          name: 'Chercher des réponses ou des solutions à des problèmes',
          description: 'Chercher des réponses ou des solutions à des problèmes',
          skills: [
            'Démarche scientifique',
            'Formation d\'hypothèses',
            'Conception expérimentale',
            'Collecte et analyse de données',
          ],
        },
        {
          id: 'make',
          name: 'Mettre à profit ses connaissances scientifiques',
          description: 'Mettre à profit ses connaissances scientifiques',
          skills: [
            'Application de concepts scientifiques',
            'Compréhension des principes scientifiques',
            'Lien entre théorie et pratique',
            'Littératie scientifique',
          ],
        },
        {
          id: 'communicate',
          name: 'Communiquer à l\'aide des langages scientifiques',
          description: 'Communiquer à l\'aide des langages scientifiques',
          skills: [
            'Rédaction scientifique',
            'Représentation graphique',
            'Présentation orale',
            'Utilisation du vocabulaire scientifique',
          ],
        },
      ],
      topics: {
        secondaryI: [
          'Living things',
          'Material world',
          'Earth and space',
          'Technological world',
        ],
        secondaryII: [
          'Ecosystems',
          'Chemical and physical changes',
          'Geological processes',
          'Simple machines',
        ],
        secondaryIII: [
          'Cell biology',
          'Chemistry basics',
          'Forces and motion',
          'Energy transformations',
        ],
        secondaryIV: [
          'Genetics and evolution',
          'Chemical reactions',
          'Electricity and magnetism',
          'Wave phenomena',
        ],
      },
      graduationRequirement: {
        level: 'Secondary IV',
        credits: 4,
        mandatory: true,
      },
    },

    history: {
      id: 'history',
      name: 'Histoire et éducation à la citoyenneté',
      englishName: 'History and Citizenship Education',
      category: 'social',
      mandatory: true,
      cycles: {
        cycleOne: {
          hours: 150,
          credits: 6,
          years: ['Secondary I', 'Secondary II'],
        },
        cycleTwo: {
          secondaryIII: { hours: 100, credits: 4 },
          secondaryIV: { hours: 100, credits: 4 },
          secondaryV: { hours: 0, credits: 0, optional: true },
        },
      },
      competencies: [
        {
          id: 'characterize',
          name: 'Caractériser une période de l\'histoire du Québec et du Canada',
          description: 'Caractériser une période de l\'histoire du Québec et du Canada',
          skills: [
            'Identification de périodes historiques',
            'Compréhension du contexte historique',
            'Analyse d\'événements historiques',
            'Pensée chronologique',
          ],
        },
        {
          id: 'interpret',
          name: 'Interpréter une réalité sociale à l\'aide de la méthode historique',
          description: 'Interpréter une réalité sociale à l\'aide de la méthode historique',
          skills: [
            'Analyse de sources historiques',
            'Pensée critique',
            'Interprétation historique',
            'Évaluation de preuves',
          ],
        },
        {
          id: 'construct',
          name: 'Construire sa conscience citoyenne à l\'aide de l\'histoire',
          description: 'Construire sa conscience citoyenne à l\'aide de l\'histoire',
          skills: [
            'Compréhension de la citoyenneté',
            'Lien entre passé et présent',
            'Responsabilité civique',
            'Valeurs démocratiques',
          ],
        },
      ],
      topics: {
        secondaryI: [
          'First Occupants',
          'European exploration',
          'New France (1534-1760)',
        ],
        secondaryII: [
          'British rule (1760-1867)',
          'Confederation',
          'Industrialization',
        ],
        secondaryIII: [
          'Modernization of Quebec (1867-1929)',
          'Great Depression',
          'World War II',
        ],
        secondaryIV: [
          'Quiet Revolution',
          'Contemporary Quebec (1980-present)',
          'Quebec and Canada relations',
        ],
      },
      graduationRequirement: {
        level: 'Secondary IV',
        credits: 4,
        mandatory: true,
        note: 'History of Quebec and Canada',
      },
    },

    geography: {
      id: 'geography',
      name: 'Géographie',
      englishName: 'Geography',
      category: 'social',
      mandatory: true,
      cycles: {
        cycleOne: {
          hours: 150,
          credits: 6,
          years: ['Secondary I', 'Secondary II'],
        },
        cycleTwo: {
          secondaryIII: { hours: 0, credits: 0, optional: true },
          secondaryIV: { hours: 0, credits: 0, optional: true },
          secondaryV: { hours: 0, credits: 0, optional: true },
        },
      },
      competencies: [
        {
          id: 'read',
          name: 'Lire l\'organisation d\'un territoire',
          description: 'Lire l\'organisation d\'un territoire',
          skills: [
            'Analyse spatiale',
            'Lecture de cartes',
            'Compréhension de l\'organisation territoriale',
            'Modèles géographiques',
          ],
        },
        {
          id: 'interpret',
          name: 'Interpréter un enjeu territorial',
          description: 'Interpréter un enjeu territorial',
          skills: [
            'Analyse d\'enjeux territoriaux',
            'Compréhension environnementale',
            'Gestion des ressources',
            'Développement durable',
          ],
        },
        {
          id: 'construct',
          name: 'Construire sa conscience du monde',
          description: 'Construire sa conscience du monde',
          skills: [
            'Conscience mondiale',
            'Compréhension culturelle',
            'Responsabilité environnementale',
            'Littératie géographique',
          ],
        },
      ],
    },

    arts: {
      id: 'arts',
      name: 'Arts',
      englishName: 'Arts Education',
      category: 'arts',
      mandatory: true,
      disciplines: ['Drama', 'Visual Arts', 'Dance', 'Music'],
      cycles: {
        cycleOne: {
          hours: 200,
          credits: 8,
          years: ['Secondary I', 'Secondary II'],
        },
        cycleTwo: {
          secondaryIII: { hours: 50, credits: 2 },
          secondaryIV: { hours: 50, credits: 2 },
          secondaryV: { hours: 50, credits: 2 },
        },
      },
      competencies: [
        {
          id: 'create',
          name: 'Créer des images médiatiques',
          description: 'Créer des images médiatiques',
          skills: [
            'Création artistique',
            'Utilisation de techniques artistiques',
            'Expression créative',
            'Production artistique',
          ],
        },
        {
          id: 'appreciate',
          name: 'Apprécier des œuvres d\'art',
          description: 'Apprécier des œuvres d\'art',
          skills: [
            'Analyse artistique',
            'Appréciation esthétique',
            'Compréhension culturelle',
            'Évaluation critique',
          ],
        },
      ],
      graduationRequirement: {
        level: 'Secondary IV',
        credits: 2,
        mandatory: true,
      },
    },

    physicalEducation: {
      id: 'pe',
      name: 'Éducation physique et à la santé',
      englishName: 'Physical Education and Health',
      category: 'health',
      mandatory: true,
      cycles: {
        cycleOne: {
          hours: 100,
          credits: 4,
          years: ['Secondary I', 'Secondary II'],
        },
        cycleTwo: {
          secondaryIII: { hours: 50, credits: 2 },
          secondaryIV: { hours: 50, credits: 2 },
          secondaryV: { hours: 50, credits: 2 },
        },
      },
      competencies: [
        {
          id: 'perform',
          name: 'Réaliser une activité physique',
          description: 'Réaliser une activité physique',
          skills: [
            'Habiletés motrices',
            'Condition physique',
            'Coordination',
            'Habiletés spécifiques au sport',
          ],
        },
        {
          id: 'interact',
          name: 'Interagir dans divers contextes',
          description: 'Interagir dans divers contextes',
          skills: [
            'Travail d\'équipe',
            'Esprit sportif',
            'Coopération',
            'Communication dans les activités physiques',
          ],
        },
        {
          id: 'adopt',
          name: 'Adopter un mode de vie sain et actif',
          description: 'Adopter un mode de vie sain et actif',
          skills: [
            'Conscience de la santé',
            'Choix de mode de vie',
            'Habitudes d\'activité physique',
            'Bien-être',
          ],
        },
      ],
      graduationRequirement: {
        level: 'Secondary V',
        credits: 2,
        mandatory: true,
        alternative: 'Ethics and Religious Culture',
      },
    },

    culture: {
      id: 'culture',
      name: 'Culture et citoyenneté québécoise',
      englishName: 'Culture and Citizenship in Québec',
      category: 'social',
      mandatory: true,
      cycles: {
        cycleOne: {
          hours: 100,
          credits: 4,
          years: ['Secondary I', 'Secondary II'],
        },
        cycleTwo: {
          secondaryIII: { hours: 50, credits: 2 },
          secondaryIV: { hours: 100, credits: 4 },
          secondaryV: { hours: 0, credits: 0, optional: true },
        },
      },
      competencies: [
        {
          id: 'understand',
          name: 'Comprendre la culture québécoise',
          description: 'Comprendre la culture québécoise',
          skills: [
            'Conscience culturelle',
            'Identité québécoise',
            'Diversité culturelle',
            'Compréhension du patrimoine',
          ],
        },
        {
          id: 'participate',
          name: 'Participer à la vie démocratique',
          description: 'Participer à la vie démocratique',
          skills: [
            'Engagement civique',
            'Valeurs démocratiques',
            'Responsabilités citoyennes',
            'Participation communautaire',
          ],
        },
      ],
    },

    contemporaryWorld: {
      id: 'contemporary',
      name: 'Monde contemporain',
      englishName: 'Contemporary World',
      category: 'social',
      mandatory: false,
      cycles: {
        cycleTwo: {
          secondaryV: { hours: 50, credits: 2, alternative: { hours: 100, credits: 4 } },
        },
      },
      competencies: [
        {
          id: 'understand',
          name: 'Comprendre le monde contemporain',
          description: 'Comprendre le monde contemporain',
          skills: [
            'Analyse d\'enjeux mondiaux',
            'Compréhension de l\'actualité',
            'Relations internationales',
            'Défis contemporains',
          ],
        },
      ],
    },

    financialEducation: {
      id: 'financial',
      name: 'Éducation financière',
      englishName: 'Financial Education',
      category: 'practical',
      mandatory: false,
      cycles: {
        cycleTwo: {
          secondaryIV: { hours: 50, credits: 2 },
        },
      },
      competencies: [
        {
          id: 'manage',
          name: 'Gérer ses finances personnelles',
          description: 'Gérer ses finances personnelles',
          skills: [
            'Établissement de budget',
            'Planification financière',
            'Compréhension des produits financiers',
            'Gestion responsable de l\'argent',
          ],
        },
      ],
    },
  },

  graduationRequirements: {
    totalCredits: {
      minimum: 54,
      level: 'Secondary IV and V',
      minimumSecondaryV: 20,
    },
    mandatoryCourses: [
      {
        subject: 'mathematics',
        level: 'Secondary IV',
        credits: 4,
        note: 'Can be 4 or 6 credits depending on course',
      },
      {
        subject: 'science',
        level: 'Secondary IV',
        credits: 4,
      },
      {
        subject: 'history',
        level: 'Secondary IV',
        credits: 4,
        note: 'History of Quebec and Canada',
      },
      {
        subject: 'arts',
        level: 'Secondary IV',
        credits: 2,
      },
      {
        subject: 'french',
        level: 'Secondary V',
        credits: 6,
      },
      {
        subject: 'english',
        level: 'Secondary V',
        credits: 4,
        note: 'Can be 4 or 6 credits depending on course',
      },
      {
        subject: 'physicalEducation',
        level: 'Secondary V',
        credits: 2,
        alternative: 'Ethics and Religious Culture',
      },
    ],
  },
};

// Helper functions
export const getSubjectByYear = (subjectId, year) => {
  const subject = QUEBEC_CURRICULUM.subjects[subjectId];
  if (!subject) return null;

  const yearMap = {
    'Secondary I': 'cycleOne',
    'Secondary II': 'cycleOne',
    'Secondary III': 'secondaryIII',
    'Secondary IV': 'secondaryIV',
    'Secondary V': 'secondaryV',
  };

  const cycle = yearMap[year];
  if (!cycle) return null;

  if (cycle === 'cycleOne') {
    return {
      ...subject.cycles.cycleOne,
      isCycleOne: true,
    };
  }

  return {
    ...subject.cycles.cycleTwo[cycle],
    isCycleTwo: true,
  };
};

export const getMandatorySubjects = (year) => {
  return Object.values(QUEBEC_CURRICULUM.subjects)
    .filter(subject => {
      if (!subject.mandatory) return false;
      
      const yearMap = {
        'Secondary I': 'cycleOne',
        'Secondary II': 'cycleOne',
        'Secondary III': 'secondaryIII',
        'Secondary IV': 'secondaryIV',
        'Secondary V': 'secondaryV',
      };
      
      const cycle = yearMap[year];
      if (!cycle) return false;
      
      if (cycle === 'cycleOne') {
        return subject.cycles.cycleOne && subject.cycles.cycleOne.hours > 0;
      }
      
      return subject.cycles.cycleTwo && 
             subject.cycles.cycleTwo[cycle] && 
             subject.cycles.cycleTwo[cycle].hours > 0;
    })
    .map(subject => {
      const yearData = getSubjectByYear(subject.id, year);
      return {
        ...subject,
        yearData,
      };
    });
};

export const getGraduationRequirements = () => {
  return QUEBEC_CURRICULUM.graduationRequirements;
};

