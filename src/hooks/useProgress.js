import { useState, useEffect, useCallback } from 'react';
import { base44 } from '@/api/base44Client';
import { getLevelFromXP } from '@/lib/calligraphyData';

export function useProgress() {
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProgress = useCallback(async () => {
    try {
      const records = await base44.entities.UserProgress.list();
      if (records.length > 0) {
        setProgress(records[0]);
      } else {
        const newProgress = await base44.entities.UserProgress.create({
          total_xp: 0,
          current_streak: 0,
          longest_streak: 0,
          level: 1,
          completed_lessons: [],
          mastered_letters: [],
          badges: []
        });
        setProgress(newProgress);
      }
    } catch (e) {
      const newProgress = await base44.entities.UserProgress.create({
        total_xp: 0,
        current_streak: 0,
        longest_streak: 0,
        level: 1,
        completed_lessons: [],
        mastered_letters: [],
        badges: []
      });
      setProgress(newProgress);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchProgress();
  }, [fetchProgress]);

  const addXP = useCallback(async (amount, lessonId, letterId) => {
    if (!progress) return;
    const newXP = (progress.total_xp || 0) + amount;
    const newLevel = getLevelFromXP(newXP);
    const completedLessons = [...(progress.completed_lessons || [])];
    if (lessonId && !completedLessons.includes(lessonId)) {
      completedLessons.push(lessonId);
    }
    const masteredLetters = [...(progress.mastered_letters || [])];
    if (letterId && !masteredLetters.includes(letterId)) {
      masteredLetters.push(letterId);
    }

    const today = new Date().toISOString().split('T')[0];
    const lastDate = progress.last_practice_date;
    let streak = progress.current_streak || 0;
    if (lastDate !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];
      streak = lastDate === yesterdayStr ? streak + 1 : 1;
    }
    const longestStreak = Math.max(progress.longest_streak || 0, streak);

    const updated = await base44.entities.UserProgress.update(progress.id, {
      total_xp: newXP,
      level: newLevel,
      completed_lessons: completedLessons,
      mastered_letters: masteredLetters,
      current_streak: streak,
      longest_streak: longestStreak,
      last_practice_date: today
    });
    setProgress(updated);

    await base44.entities.LessonCompletion.create({
      lesson_id: lessonId || 'practice',
      letter_id: letterId || '',
      score: 100,
      xp_earned: amount,
      completed_at: new Date().toISOString()
    });

    return updated;
  }, [progress]);

  return { progress, loading, addXP, refetch: fetchProgress };
}