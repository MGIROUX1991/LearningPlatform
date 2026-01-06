-- Insert "Classification des êtres vivants" lesson for Secondary I
-- This lesson teaches students about biological classification using the Z-pattern design

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
  'living-things',
  1,
  'Classification des êtres vivants',
  'La classification des êtres vivants est un système organisé qui permet aux scientifiques de regrouper et d''organiser tous les organismes vivants sur Terre. Imaginez une bibliothèque géante où chaque livre représente une espèce différente - la classification est comme le système de classement qui permet de trouver et de comprendre chaque livre.

Les scientifiques utilisent la classification pour mieux comprendre les relations entre les différents êtres vivants. En regroupant les organismes qui partagent des caractéristiques similaires, on peut découvrir comment ils sont liés et comment ils ont évolué au fil du temps.

Le système de classification moderne divise tous les êtres vivants en cinq grands groupes appelés règnes : les Animaux, les Végétaux, les Champignons, les Protistes et les Bactéries. Chaque règne regroupe des organismes qui partagent des caractéristiques fondamentales.

La hiérarchie taxonomique est comme une série de boîtes emboîtées. Du plus large au plus spécifique, on trouve : Règne, Embranchement, Classe, Ordre, Famille, Genre et Espèce. Plus on descend dans cette hiérarchie, plus les organismes sont similaires entre eux.

Le nom scientifique d''un organisme est composé de deux mots : le genre (avec une majuscule) et l''espèce (en minuscule). Par exemple, Homo sapiens est le nom scientifique de l''être humain. Ce système permet aux scientifiques du monde entier de communiquer clairement, peu importe leur langue.',
  'Saviez-vous que le système de classification moderne a été créé par Carl von Linné au XVIIIe siècle? Il a classé plus de 12 000 espèces de plantes et d''animaux de son vivant!',
  '{"Classification": "Système d''organisation des êtres vivants en groupes selon leurs caractéristiques", "Règne": "Plus grand groupe de classification, divisant tous les êtres vivants en cinq catégories principales", "Espèce": "Plus petit groupe de classification, regroupant des organismes capables de se reproduire entre eux", "Taxonomie": "Science de la classification des êtres vivants", "Nom scientifique": "Nom unique en latin donné à chaque espèce, composé du genre et de l''espèce"}'::jsonb,
  '{
    "questions": [
      {
        "id": 1,
        "question": "Combien y a-t-il de règnes dans le système de classification moderne?",
        "options": ["3", "4", "5", "6"],
        "correct": 2
      },
      {
        "id": 2,
        "question": "Quel est le plus grand groupe de classification?",
        "options": ["L''espèce", "Le genre", "Le règne", "La famille"],
        "correct": 2
      },
      {
        "id": 3,
        "question": "Le nom scientifique Homo sapiens est composé de:",
        "options": ["Règne et espèce", "Genre et espèce", "Classe et ordre", "Famille et genre"],
        "correct": 1
      },
      {
        "id": 4,
        "question": "Pourquoi les scientifiques utilisent-ils la classification?",
        "options": ["Pour compliquer les choses", "Pour mieux comprendre les relations entre les êtres vivants", "Pour cacher des informations", "Pour gagner du temps"],
        "correct": 1
      },
      {
        "id": 5,
        "question": "Quel règne regroupe les organismes qui fabriquent leur propre nourriture par photosynthèse?",
        "options": ["Les Animaux", "Les Végétaux", "Les Champignons", "Les Bactéries"],
        "correct": 1
      }
    ]
  }'::jsonb,
  'Secondary I',
  ARRAY['seek'],
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
