-- Function to initialize daily quests for a user
CREATE OR REPLACE FUNCTION initialize_daily_quests(user_uuid UUID, quest_date DATE)
RETURNS VOID AS $$
BEGIN
  INSERT INTO public.daily_quests (user_id, quest_id, title, description, xp, completed, quest_date)
  VALUES
    (user_uuid, 1, 'Compléter une leçon', 'Terminez n''importe quelle leçon', 50, FALSE, quest_date),
    (user_uuid, 2, 'Maintenir votre série', 'Connectez-vous aujourd''hui', 25, FALSE, quest_date),
    (user_uuid, 3, 'Explorer l''histoire', 'Lisez un chapitre d''histoire', 75, FALSE, quest_date)
  ON CONFLICT (user_id, quest_id, quest_date) DO NOTHING;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to reset daily quests (called daily)
CREATE OR REPLACE FUNCTION reset_daily_quests()
RETURNS VOID AS $$
BEGIN
  -- Delete old quests (older than 2 days)
  DELETE FROM public.daily_quests
  WHERE quest_date < CURRENT_DATE - INTERVAL '2 days';
  
  -- Initialize quests for today for all users
  INSERT INTO public.daily_quests (user_id, quest_id, title, description, xp, completed, quest_date)
  SELECT 
    id,
    quest_id,
    title,
    description,
    xp,
    FALSE,
    CURRENT_DATE
  FROM public.user_profiles
  CROSS JOIN (
    VALUES
      (1, 'Compléter une leçon', 'Terminez n''importe quelle leçon', 50),
      (2, 'Maintenir votre série', 'Connectez-vous aujourd''hui', 25),
      (3, 'Explorer l''histoire', 'Lisez un chapitre d''histoire', 75)
  ) AS default_quests(quest_id, title, description, xp)
  ON CONFLICT (user_id, quest_id, quest_date) DO NOTHING;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

