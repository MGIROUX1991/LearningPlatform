-- Migration script to insert existing hardcoded lessons into the database
-- This migrates the history lessons that are currently hardcoded in HistoryLesson.jsx

-- Chapter 1: Les Grands Explorateurs
INSERT INTO public.lessons (subject_id, chapter_id, lesson_number, title, content, fun_fact, vocabulary, quiz, xp_reward, school_year, competencies)
VALUES (
  'history',
  'chapter1',
  1,
  'Les Grands Explorateurs',
  'Au début du XVIe siècle, l''Europe était en pleine expansion. Les royaumes d''Espagne, du Portugal, de France et d''Angleterre cherchaient de nouvelles routes commerciales et de nouvelles terres à explorer.

Jacques Cartier, un navigateur français de Saint-Malo, fut chargé par le roi François Ier de trouver une route vers l''Asie et de découvrir des terres riches en or et en épices. En 1534, il entreprit son premier voyage vers le Nouveau Monde.

Lors de son premier voyage, Cartier explora le golfe du Saint-Laurent et rencontra des peuples autochtones, notamment les Mi''kmaq et les Iroquoiens du Saint-Laurent. Il prit possession de la terre au nom du roi de France, plantant une croix à Gaspé.

Cartier effectua trois voyages au total (1534, 1535-1536, et 1541-1542). Lors de son deuxième voyage, il remonta le fleuve Saint-Laurent jusqu''à Hochelaga (aujourd''hui Montréal), où il fut accueilli par les habitants iroquoiens.',
  'Le premier explorateur européen à atteindre l''Amérique du Nord fut probablement Jean Cabot en 1497, naviguant pour le compte de l''Angleterre.',
  '{"Navigateur": "Personne qui dirige un navire en mer", "Nouveau Monde": "Terme utilisé par les Européens pour désigner les Amériques"}'::jsonb,
  '{"questions": [{"id": 1, "question": "Qui fut le premier explorateur français à naviguer vers le Nouveau Monde?", "options": ["Jean Cabot", "Jacques Cartier", "Samuel de Champlain", "Henry Hudson"], "correct": 1}, {"id": 2, "question": "En quelle année Jacques Cartier effectua-t-il son premier voyage?", "options": ["1497", "1534", "1608", "1663"], "correct": 1}, {"id": 3, "question": "Jusqu''où Cartier remonta-t-il le fleuve Saint-Laurent lors de son deuxième voyage?", "options": ["Québec", "Trois-Rivières", "Hochelaga (Montréal)", "Gaspé"], "correct": 2}]}'::jsonb,
  100,
  'Secondary I',
  ARRAY['characterize', 'interpret']
) ON CONFLICT (subject_id, chapter_id, lesson_number) DO UPDATE SET school_year = 'Secondary I', competencies = ARRAY['characterize', 'interpret'];

-- Chapter 2: La Traversée
INSERT INTO public.lessons (subject_id, chapter_id, lesson_number, title, content, fun_fact, vocabulary, quiz, xp_reward, school_year, competencies)
VALUES (
  'history',
  'chapter2',
  1,
  'La Traversée',
  'La traversée de l''Atlantique était une épreuve redoutable pour les explorateurs et les colons du XVIe et XVIIe siècles. Les navires de l''époque étaient petits, fragiles et entièrement dépendants des vents et des courants marins.

Les navires utilisés pour la traversée étaient principalement des voiliers à trois mâts, comme les caravelles et les navires de commerce. Ces embarcations transportaient non seulement des passagers, mais aussi des provisions, des outils, des animaux et des marchandises.

Les conditions à bord étaient extrêmement difficiles. Les passagers vivaient dans des espaces confinés, souvent dans l''obscurité et l''humidité. La nourriture se détériorait rapidement, et l''eau douce était précieuse. Les maladies se propageaient facilement dans ces conditions.

Malgré ces difficultés, des milliers de personnes ont bravé l''océan Atlantique pour rejoindre le Nouveau Monde. Ils étaient motivés par l''espoir d''une vie meilleure, la recherche de richesses, ou simplement l''esprit d''aventure.

La traversée était aussi un moment de grande incertitude. Les navigateurs devaient s''orienter sans instruments modernes, en se fiant aux étoiles, au soleil et à leur expérience. Les tempêtes pouvaient durer des jours, mettant en danger la vie de tous à bord.',
  'La traversée moyenne durait entre 6 et 12 semaines, selon les conditions météorologiques. Beaucoup de passagers souffraient du mal de mer et de maladies comme le scorbut.',
  '{"Caravelle": "Type de navire à voiles utilisé pour les voyages transatlantiques", "Scorbut": "Maladie causée par une carence en vitamine C, fréquente lors des longues traversées"}'::jsonb,
  '{"questions": [{"id": 1, "question": "Combien de temps durait généralement une traversée de l''Atlantique au XVIe siècle?", "options": ["2-3 semaines", "6-12 semaines", "3-4 mois", "6 mois"], "correct": 1}, {"id": 2, "question": "Quelle maladie était fréquente lors des longues traversées?", "options": ["La grippe", "Le scorbut", "La variole", "La peste"], "correct": 1}, {"id": 3, "question": "Comment les navigateurs s''orientaient-ils lors de la traversée?", "options": ["Avec des GPS", "En se fiant aux étoiles et au soleil", "En suivant les oiseaux", "En utilisant des boussoles modernes"], "correct": 1}]}'::jsonb,
  100,
  'Secondary I',
  ARRAY['characterize', 'interpret']
) ON CONFLICT (subject_id, chapter_id, lesson_number) DO UPDATE SET school_year = 'Secondary I', competencies = ARRAY['characterize', 'interpret'];

-- Chapter 3: Fondation de Québec
INSERT INTO public.lessons (subject_id, chapter_id, lesson_number, title, content, fun_fact, vocabulary, quiz, xp_reward, school_year, competencies)
VALUES (
  'history',
  'chapter3',
  1,
  'Fondation de Québec',
  'En 1608, Samuel de Champlain, considéré comme le "Père de la Nouvelle-France", fonda la ville de Québec. Cette fondation marqua le début de la première colonie permanente française en Amérique du Nord.

Champlain choisit l''emplacement de Québec pour sa position stratégique. Situé sur un promontoire surplombant le fleuve Saint-Laurent, le site offrait une défense naturelle et un contrôle sur la navigation fluviale.

La première habitation de Québec était un fort en bois, entouré de palissades. À l''intérieur, on trouvait des logements, un entrepôt, une forge et une chapelle. Les premiers colons vivaient dans des conditions difficiles, face aux rigueurs de l''hiver canadien.

Malgré les défis, Québec devint rapidement un centre important pour la traite des fourrures. Les Français établirent des relations commerciales avec les peuples autochtones, échangeant des objets européens contre des peaux de castor et d''autres fourrures.

La fondation de Québec ouvrit la voie à l''expansion française en Amérique du Nord. Au cours des décennies suivantes, d''autres établissements furent créés, formant le réseau de la Nouvelle-France qui s''étendit jusqu''à la Louisiane.',
  'Québec fut la première ville permanente fondée par les Français en Amérique du Nord. Le nom "Québec" vient du mot algonquin "kébec", qui signifie "là où le fleuve se rétrécit".',
  '{"Colonie permanente": "Établissement destiné à durer, contrairement aux postes de traite temporaires", "Promontoire": "Éminence rocheuse qui s''avance dans la mer ou un fleuve"}'::jsonb,
  '{"questions": [{"id": 1, "question": "Qui fonda la ville de Québec en 1608?", "options": ["Jacques Cartier", "Samuel de Champlain", "Jean Talon", "Louis XIV"], "correct": 1}, {"id": 2, "question": "Que signifie le mot Québec en algonquin?", "options": ["Grande ville", "Là où le fleuve se rétrécit", "Montagne", "Fort"], "correct": 1}, {"id": 3, "question": "Pourquoi Champlain choisit-il l''emplacement de Québec?", "options": ["Pour l''or", "Pour sa position stratégique et sa défense naturelle", "Pour le climat", "Pour les animaux"], "correct": 1}]}'::jsonb,
  100,
  'Secondary I',
  ARRAY['characterize', 'interpret', 'construct']
) ON CONFLICT (subject_id, chapter_id, lesson_number) DO UPDATE SET school_year = 'Secondary I', competencies = ARRAY['characterize', 'interpret', 'construct'];

-- Chapter 4: La Vie Quotidienne
INSERT INTO public.lessons (subject_id, chapter_id, lesson_number, title, content, fun_fact, vocabulary, quiz, xp_reward, school_year, competencies)
VALUES (
  'history',
  'chapter4',
  1,
  'La Vie Quotidienne',
  'La vie quotidienne en Nouvelle-France était marquée par le travail acharné, l''adaptation à un nouveau climat et la construction d''une société dans un environnement souvent hostile. Les colons devaient être autonomes et résilients.

L''agriculture était au cœur de la vie quotidienne. Les colons cultivaient principalement du blé, des légumes et élevaient des animaux. Les terres étaient défrichées à la main, un travail long et épuisant. Chaque famille avait son lopin de terre à cultiver.

Le système seigneurial organisait la distribution des terres. Le roi accordait de grandes terres à des seigneurs, qui les divisaient ensuite en lots pour les colons. Ces derniers devaient payer des redevances et travailler quelques jours par an pour le seigneur.

L''artisanat était également important. Les colons fabriquaient leurs propres outils, meubles et vêtements. Les forgerons, charpentiers, cordonniers et autres artisans étaient essentiels à la communauté. Les femmes s''occupaient du foyer, du jardin et de l''éducation des enfants.

La religion jouait un rôle central dans la vie quotidienne. Les colons assistaient régulièrement à la messe, et les fêtes religieuses rythmaient l''année. Les missionnaires, notamment les Jésuites, étaient présents pour convertir les peuples autochtones et servir la communauté.

Malgré les difficultés, la vie en Nouvelle-France offrait aussi des moments de joie : les fêtes de village, les mariages, les récoltes abondantes. Les colons développèrent une culture unique, mélangeant les traditions françaises et les adaptations nécessaires à la vie en Amérique.',
  'Les hivers québécois étaient si rigoureux que les colons devaient adapter leurs techniques agricoles et leurs habitudes de vie. Beaucoup apprirent des peuples autochtones comment survivre dans ce climat.',
  '{"Seigneurie": "Système de propriété terrienne où un seigneur accordait des terres à des censitaires", "Censitaires": "Colons qui recevaient des terres d''un seigneur en échange de redevances"}'::jsonb,
  '{"questions": [{"id": 1, "question": "Quel système organisait la distribution des terres en Nouvelle-France?", "options": ["Le système féodal", "Le système seigneurial", "Le système démocratique", "Le système communautaire"], "correct": 1}, {"id": 2, "question": "Qu''est-ce qu''un censitaire?", "options": ["Un seigneur", "Un colon qui reçoit des terres d''un seigneur", "Un missionnaire", "Un artisan"], "correct": 1}, {"id": 3, "question": "Quel rôle jouait la religion dans la vie quotidienne?", "options": ["Aucun", "Un rôle central, rythmant l''année", "Seulement pour les fêtes", "Uniquement pour les autochtones"], "correct": 1}]}'::jsonb,
  100,
  'Secondary I',
  ARRAY['characterize', 'interpret', 'construct']
) ON CONFLICT (subject_id, chapter_id, lesson_number) DO UPDATE SET school_year = 'Secondary I', competencies = ARRAY['characterize', 'interpret', 'construct'];

-- Chapter 5: Relations avec les Autochtones
INSERT INTO public.lessons (subject_id, chapter_id, lesson_number, title, content, fun_fact, vocabulary, quiz, xp_reward, school_year, competencies)
VALUES (
  'history',
  'chapter5',
  1,
  'Relations avec les Autochtones',
  'Les relations entre les colons français et les peuples autochtones de la Nouvelle-France étaient complexes et variées. Contrairement à d''autres puissances coloniales, les Français adoptèrent souvent une approche plus collaborative avec les peuples autochtones.

La traite des fourrures fut le principal moteur des relations commerciales. Les Français échangeaient des objets européens (couteaux, haches, couvertures, perles) contre des fourrures, particulièrement des peaux de castor très prisées en Europe.

Les alliances militaires étaient également importantes. Les Français s''alliaient avec certaines nations autochtones, notamment les Hurons-Wendat et les Algonquins, contre leurs ennemis communs, comme les Iroquois. Ces alliances étaient cruciales pour la sécurité de la colonie.

Les missionnaires, particulièrement les Jésuites, jouèrent un rôle important dans les relations. Ils cherchaient à convertir les peuples autochtones au christianisme, mais certains apprirent aussi les langues et les cultures autochtones, créant des ponts entre les deux mondes.

Cependant, les relations n''étaient pas toujours harmonieuses. Les conflits éclataient parfois, notamment avec les Iroquois qui s''opposaient à l''expansion française. Les maladies européennes introduites par les colons décimèrent également de nombreuses communautés autochtones.

Malgré les défis, les relations franco-autochtones en Nouvelle-France furent généralement plus positives que dans d''autres colonies. Les mariages entre Français et Autochtones étaient relativement acceptés, et de nombreux métis jouèrent un rôle important dans le développement de la colonie.',
  'Les Français apprirent beaucoup des peuples autochtones, notamment sur la chasse, la pêche, la survie en hiver et l''utilisation de plantes médicinales. En retour, ils introduisirent des outils en métal, des armes à feu et des textiles.',
  '{"Coureur des bois": "Trappeur français qui vivait parmi les peuples autochtones", "Alliance": "Accord de coopération entre les Français et les peuples autochtones"}'::jsonb,
  '{"questions": [{"id": 1, "question": "Quel était le principal moteur des relations commerciales entre Français et Autochtones?", "options": ["L''agriculture", "La traite des fourrures", "L''exploitation minière", "La pêche"], "correct": 1}, {"id": 2, "question": "Avec quels peuples autochtones les Français s''allièrent-ils principalement?", "options": ["Les Iroquois", "Les Hurons-Wendat et les Algonquins", "Les Sioux", "Les Apaches"], "correct": 1}, {"id": 3, "question": "Qu''est-ce qu''un coureur des bois?", "options": ["Un soldat", "Un trappeur français qui vivait parmi les peuples autochtones", "Un missionnaire", "Un marchand"], "correct": 1}]}'::jsonb,
  100,
  'Secondary I',
  ARRAY['characterize', 'interpret', 'construct']
) ON CONFLICT (subject_id, chapter_id, lesson_number) DO UPDATE SET school_year = 'Secondary I', competencies = ARRAY['characterize', 'interpret', 'construct'];

