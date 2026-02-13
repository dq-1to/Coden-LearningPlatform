import { supabase } from '../lib/supabase';
import { LearningStats, StepStats, LearningStatsUpdate, StepProgressUpdate } from '../types';

export const statsService = {
    async getStats(userId: string): Promise<LearningStats | null> {
        const { data: statsData, error: statsError } = await supabase
            .from('learning_stats')
            .select('*')
            .eq('user_id', userId)
            .single();

        if (statsError) {
            console.error('Error fetching stats:', statsError);
            return null;
        }

        const { data: progressData, error: progressError } = await supabase
            .from('step_progress')
            .select('*')
            .eq('user_id', userId);

        if (progressError) {
            console.error('Error fetching progress:', progressError);
            return null;
        }

        const stepStats: Record<string, StepStats> = {};
        progressData.forEach((p) => {
            stepStats[p.step_id] = {
                attempts: p.attempts,
                errors: p.errors,
                bestTime: p.best_time || 0,
            };
        });

        return {
            totalTime: statsData.total_study_time,
            correctAnswers: statsData.total_correct,
            wrongAnswers: statsData.total_wrong,
            streakDays: statsData.streak_days,
            lastStudyDate: statsData.last_study_date || '',
            stepStats,
            xp: 0,
            studyHistory: [],
        };
    },

    async updateStats(userId: string, stats: Partial<LearningStats>) {
        const updates: LearningStatsUpdate = {};
        if (stats.totalTime !== undefined) updates.total_study_time = stats.totalTime;
        if (stats.correctAnswers !== undefined) updates.total_correct = stats.correctAnswers;
        if (stats.wrongAnswers !== undefined) updates.total_wrong = stats.wrongAnswers;
        if (stats.streakDays !== undefined) updates.streak_days = stats.streakDays;
        if (stats.lastStudyDate !== undefined) updates.last_study_date = stats.lastStudyDate;

        if (Object.keys(updates).length === 0) return;

        const { error } = await supabase
            .from('learning_stats')
            .update(updates)
            .eq('user_id', userId);

        if (error) {
            console.error('Error updating stats:', error);
        }
    },

    async updateStepProgress(
        userId: string,
        stepId: string,
        updates: Partial<StepStats> & { isCompleted?: boolean }
    ) {
        // First try to get existing
        const { data: existing } = await supabase
            .from('step_progress')
            .select('*')
            .eq('user_id', userId)
            .eq('step_id', stepId)
            .single();

        if (existing) {
            const newAttempts = updates.attempts ? (existing.attempts + updates.attempts) : existing.attempts;
            const newErrors = updates.errors ? (existing.errors + updates.errors) : existing.errors;
            const newBestTime = updates.bestTime
                ? (existing.best_time ? Math.min(existing.best_time, updates.bestTime) : updates.bestTime)
                : existing.best_time;

            const updateData: StepProgressUpdate = {
                attempts: newAttempts,
                errors: newErrors,
                best_time: newBestTime,
                last_attempt_at: new Date().toISOString(),
            };
            if (updates.isCompleted) updateData.is_completed = true;

            await supabase
                .from('step_progress')
                .update(updateData)
                .eq('id', existing.id);
        } else {
            await supabase.from('step_progress').insert({
                user_id: userId,
                step_id: stepId,
                attempts: updates.attempts || 0,
                errors: updates.errors || 0,
                best_time: updates.bestTime,
                is_completed: updates.isCompleted || false,
            });
        }
    },
};
