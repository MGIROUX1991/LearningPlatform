-- Insert "Introduction à la méthode scientifique" lesson for Secondary I
-- This lesson introduces students to the scientific method

INSERT INTO public.lessons (
  subject_id,
  chapter_id,
  lesson_number,
  title,
  content,
  fun_fact,
  vocabulary,
  quiz,
  school_year,
  competencies,
  xp_reward
) VALUES (
  'science',
  'introduction-methode-scientifique',
  1,
  'Introduction à la méthode scientifique',
  'La méthode scientifique est le processus que les scientifiques utilisent pour comprendre le monde qui nous entoure. C''est une approche systématique et logique qui permet de répondre à des questions, de résoudre des problèmes et de découvrir de nouvelles connaissances.

La méthode scientifique suit généralement ces étapes : observation, question, hypothèse, expérience, analyse des résultats et conclusion. Chaque étape est importante et doit être suivie avec soin pour obtenir des résultats fiables.

L''observation est le point de départ de toute recherche scientifique. Elle consiste à examiner attentivement un phénomène naturel, à noter ce que l''on voit, entend, sent ou mesure. Une bonne observation doit être précise, objective et détaillée.

Après avoir observé, on se pose une question. Cette question doit être claire, précise et vérifiable. Par exemple, "Pourquoi les plantes poussent-elles mieux au soleil?" est une bonne question scientifique, car on peut la tester.

L''hypothèse est une explication possible à notre question. C''est une prédiction que l''on peut tester. Une bonne hypothèse doit être testable et falsifiable, c''est-à-dire qu''on doit pouvoir prouver qu''elle est fausse si elle l''est vraiment.

L''expérience permet de tester notre hypothèse. On doit concevoir une expérience où on contrôle les variables (les facteurs qui peuvent changer) et où on mesure les résultats. Il est important de faire plusieurs essais pour s''assurer que les résultats sont fiables.

L''analyse des résultats consiste à examiner les données recueillies lors de l''expérience. On peut utiliser des tableaux, des graphiques ou des calculs pour mieux comprendre ce qui s''est passé.

Enfin, la conclusion permet de déterminer si notre hypothèse était correcte ou non. Si les résultats confirment l''hypothèse, on peut la considérer comme valide. Sinon, on doit proposer une nouvelle hypothèse et recommencer le processus.

La méthode scientifique est un processus cyclique : les conclusions d''une expérience peuvent mener à de nouvelles observations et de nouvelles questions. C''est ainsi que la science progresse et que notre compréhension du monde s''améliore constamment!',
  'La méthode scientifique moderne a été développée au XVIIe siècle par des scientifiques comme Galilée et Francis Bacon. Elle a révolutionné notre façon de comprendre le monde!',
  '{"Observation": "Action d''examiner attentivement un phénomène ou un objet", "Hypothèse": "Proposition explicative provisoire que l''on cherche à vérifier", "Expérience": "Test contrôlé conçu pour vérifier une hypothèse", "Variable": "Facteur qui peut changer dans une expérience", "Conclusion": "Résultat final qui détermine si l''hypothèse était correcte"}'::jsonb,
  '{
    "questions": [
      {
        "id": 1,
        "question": "Quelle est la première étape de la méthode scientifique?",
        "options": ["L''hypothèse", "L''observation", "L''expérience", "La conclusion"],
        "correct": 1
      },
      {
        "id": 2,
        "question": "Qu''est-ce qu''une hypothèse?",
        "options": ["Une observation", "Une proposition explicative provisoire que l''on cherche à vérifier", "Une conclusion", "Une expérience"],
        "correct": 1
      },
      {
        "id": 3,
        "question": "Pourquoi est-il important de faire plusieurs essais lors d''une expérience?",
        "options": ["Pour perdre du temps", "Pour s''assurer que les résultats sont fiables", "Pour compliquer les choses", "Pour utiliser plus de matériel"],
        "correct": 1
      },
      {
        "id": 4,
        "question": "Que fait-on si les résultats de l''expérience ne confirment pas l''hypothèse?",
        "options": ["On abandonne", "On propose une nouvelle hypothèse et on recommence", "On change les résultats", "On ignore les résultats"],
        "correct": 1
      },
      {
        "id": 5,
        "question": "Qu''est-ce qu''une variable dans une expérience?",
        "options": ["Une constante", "Un facteur qui peut changer", "Un résultat", "Une hypothèse"],
        "correct": 1
      }
    ]
  }'::jsonb,
  'Secondary I',
  ARRAY['seek', 'make', 'communicate'],
  150
)
ON CONFLICT (subject_id, chapter_id, lesson_number) 
DO UPDATE SET
  title = EXCLUDED.title,
  content = EXCLUDED.content,
  fun_fact = EXCLUDED.fun_fact,
  vocabulary = EXCLUDED.vocabulary,
  quiz = EXCLUDED.quiz,
  school_year = EXCLUDED.school_year,
  competencies = EXCLUDED.competencies,
  xp_reward = EXCLUDED.xp_reward,
  updated_at = TIMEZONE('utc', NOW());
