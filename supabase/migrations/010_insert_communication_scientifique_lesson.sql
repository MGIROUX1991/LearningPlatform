-- Insert "Communiquer des résultats scientifiques" lesson for Secondary I
-- This lesson teaches students how to communicate scientific results effectively

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
  'communiquer-resultats-scientifiques',
  1,
  'Communiquer des résultats scientifiques',
  'Communiquer ses résultats scientifiques est une étape essentielle de la méthode scientifique. Après avoir mené une expérience et analysé les données, il est important de partager ses découvertes de manière claire et précise.

La communication scientifique peut prendre plusieurs formes : un rapport écrit, une présentation orale, une affiche scientifique ou même une vidéo. Chaque format a ses avantages et convient à différents contextes.

Un bon rapport scientifique doit être structuré et organisé. Il comprend généralement une introduction, une méthodologie, des résultats, une discussion et une conclusion. Chaque section a un rôle précis à jouer dans la communication de votre recherche.

Les résultats doivent être présentés de manière visuelle et claire. Les graphiques, tableaux et diagrammes sont des outils précieux pour aider les lecteurs à comprendre vos données rapidement. Un bon graphique peut transmettre plus d''informations qu''un long paragraphe de texte.

La clarté est essentielle dans la communication scientifique. Utilisez un langage précis, évitez le jargon inutile et expliquez les termes techniques. Votre objectif est de rendre votre recherche accessible à votre public cible.

L''objectivité est également cruciale. Présentez vos résultats tels qu''ils sont, même s''ils ne confirment pas votre hypothèse initiale. La science progresse grâce à la transparence et à l''honnêteté dans la communication des résultats.',
  'Saviez-vous que le premier article scientifique moderne a été publié en 1665 dans la revue "Philosophical Transactions"? Depuis, la communication scientifique est devenue un pilier de la recherche!',
  '{"Rapport scientifique": "Document structuré présentant une recherche scientifique", "Méthodologie": "Description détaillée des méthodes utilisées dans une expérience", "Graphique": "Représentation visuelle de données", "Objectivité": "Présentation neutre et factuelle des résultats", "Affiche scientifique": "Présentation visuelle concise d''une recherche scientifique"}'::jsonb,
  '{
    "questions": [
      {
        "id": 1,
        "question": "Quelle est l''étape essentielle après avoir mené une expérience?",
        "options": ["Oublier les résultats", "Communiquer ses résultats", "Refaire l''expérience", "Changer d''hypothèse"],
        "correct": 1
      },
      {
        "id": 2,
        "question": "Qu''est-ce qu''un bon rapport scientifique doit contenir?",
        "options": ["Seulement des résultats", "Introduction, méthodologie, résultats, discussion et conclusion", "Seulement une conclusion", "Des opinions personnelles"],
        "correct": 1
      },
      {
        "id": 3,
        "question": "Pourquoi les graphiques sont-ils importants dans la communication scientifique?",
        "options": ["Pour décorer le rapport", "Pour présenter les données de manière visuelle et claire", "Pour compliquer les choses", "Pour utiliser plus d''espace"],
        "correct": 1
      },
      {
        "id": 4,
        "question": "Quelle qualité est essentielle dans la communication scientifique?",
        "options": ["La subjectivité", "L''objectivité", "L''exagération", "La simplification excessive"],
        "correct": 1
      },
      {
        "id": 5,
        "question": "Que doit-on faire si les résultats ne confirment pas l''hypothèse initiale?",
        "options": ["Les cacher", "Les présenter tels qu''ils sont avec objectivité", "Les modifier", "Les ignorer"],
        "correct": 1
      }
    ]
  }'::jsonb,
  'Secondary I',
  ARRAY['communicate'],
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
