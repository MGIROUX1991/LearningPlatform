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
          description: 'Read and appreciate various texts',
          skills: [
            'Comprehension of literary and informational texts',
            'Text analysis and interpretation',
            'Critical reading skills',
            'Understanding of text structure and literary devices',
          ],
        },
        {
          id: 'writing',
          name: 'Écrire des textes variés',
          description: 'Write various texts',
          skills: [
            'Writing for different purposes and audiences',
            'Text planning and organization',
            'Grammar and syntax mastery',
            'Revision and editing skills',
          ],
        },
        {
          id: 'oral',
          name: 'Communiquer oralement',
          description: 'Communicate orally',
          skills: [
            'Oral expression and presentation',
            'Active listening',
            'Debate and discussion skills',
            'Public speaking',
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
          description: 'Reinvest understanding of texts',
          skills: [
            'Reading comprehension',
            'Text analysis',
            'Vocabulary acquisition',
            'Cultural understanding',
          ],
        },
        {
          id: 'write',
          name: 'Écrire des textes',
          description: 'Write texts',
          skills: [
            'Writing in English',
            'Grammar and vocabulary',
            'Text organization',
            'Editing skills',
          ],
        },
        {
          id: 'interact',
          name: 'Interagir en anglais',
          description: 'Interact in English',
          skills: [
            'Oral communication',
            'Listening comprehension',
            'Conversation skills',
            'Pronunciation',
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
          description: 'Solve situational problems',
          skills: [
            'Problem identification and analysis',
            'Mathematical modeling',
            'Strategy selection',
            'Solution verification',
          ],
        },
        {
          id: 'reason',
          name: 'Utiliser un raisonnement mathématique',
          description: 'Use mathematical reasoning',
          skills: [
            'Logical reasoning',
            'Making conjectures',
            'Justifying solutions',
            'Mathematical proof',
          ],
        },
        {
          id: 'communicate',
          name: 'Communiquer à l\'aide du langage mathématique',
          description: 'Communicate using mathematical language',
          skills: [
            'Mathematical notation',
            'Graphical representation',
            'Explanation of reasoning',
            'Use of mathematical vocabulary',
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
          description: 'Seek answers or solutions to problems',
          skills: [
            'Scientific inquiry',
            'Hypothesis formation',
            'Experimental design',
            'Data collection and analysis',
          ],
        },
        {
          id: 'make',
          name: 'Mettre à profit ses connaissances scientifiques',
          description: 'Make use of scientific knowledge',
          skills: [
            'Application of scientific concepts',
            'Understanding of scientific principles',
            'Connection between theory and practice',
            'Scientific literacy',
          ],
        },
        {
          id: 'communicate',
          name: 'Communiquer à l\'aide des langages scientifiques',
          description: 'Communicate using scientific languages',
          skills: [
            'Scientific writing',
            'Graphical representation',
            'Oral presentation',
            'Use of scientific vocabulary',
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
          description: 'Characterize a period in the history of Quebec and Canada',
          skills: [
            'Historical period identification',
            'Understanding of historical context',
            'Analysis of historical events',
            'Chronological thinking',
          ],
        },
        {
          id: 'interpret',
          name: 'Interpréter une réalité sociale à l\'aide de la méthode historique',
          description: 'Interpret a social reality using historical method',
          skills: [
            'Historical source analysis',
            'Critical thinking',
            'Historical interpretation',
            'Evidence evaluation',
          ],
        },
        {
          id: 'construct',
          name: 'Construire sa conscience citoyenne à l\'aide de l\'histoire',
          description: 'Construct citizenship consciousness using history',
          skills: [
            'Understanding of citizenship',
            'Connection between past and present',
            'Civic responsibility',
            'Democratic values',
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
          description: 'Read the organization of a territory',
          skills: [
            'Spatial analysis',
            'Map reading',
            'Understanding of territorial organization',
            'Geographic patterns',
          ],
        },
        {
          id: 'interpret',
          name: 'Interpréter un enjeu territorial',
          description: 'Interpret a territorial issue',
          skills: [
            'Territorial issue analysis',
            'Environmental understanding',
            'Resource management',
            'Sustainable development',
          ],
        },
        {
          id: 'construct',
          name: 'Construire sa conscience du monde',
          description: 'Construct awareness of the world',
          skills: [
            'Global awareness',
            'Cultural understanding',
            'Environmental responsibility',
            'Geographic literacy',
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
          description: 'Create media images',
          skills: [
            'Artistic creation',
            'Use of artistic techniques',
            'Creative expression',
            'Artistic production',
          ],
        },
        {
          id: 'appreciate',
          name: 'Apprécier des œuvres d\'art',
          description: 'Appreciate works of art',
          skills: [
            'Artistic analysis',
            'Aesthetic appreciation',
            'Cultural understanding',
            'Critical evaluation',
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
          description: 'Perform a physical activity',
          skills: [
            'Motor skills',
            'Physical fitness',
            'Coordination',
            'Sport-specific skills',
          ],
        },
        {
          id: 'interact',
          name: 'Interagir dans divers contextes',
          description: 'Interact in various contexts',
          skills: [
            'Teamwork',
            'Fair play',
            'Cooperation',
            'Communication in physical activities',
          ],
        },
        {
          id: 'adopt',
          name: 'Adopter un mode de vie sain et actif',
          description: 'Adopt a healthy and active lifestyle',
          skills: [
            'Health awareness',
            'Lifestyle choices',
            'Physical activity habits',
            'Wellness',
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
          description: 'Understand Quebec culture',
          skills: [
            'Cultural awareness',
            'Quebec identity',
            'Cultural diversity',
            'Heritage understanding',
          ],
        },
        {
          id: 'participate',
          name: 'Participer à la vie démocratique',
          description: 'Participate in democratic life',
          skills: [
            'Civic engagement',
            'Democratic values',
            'Citizenship responsibilities',
            'Community participation',
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
          description: 'Understand the contemporary world',
          skills: [
            'Global issues analysis',
            'Current events understanding',
            'International relations',
            'Contemporary challenges',
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
          description: 'Manage personal finances',
          skills: [
            'Budgeting',
            'Financial planning',
            'Understanding of financial products',
            'Responsible money management',
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

