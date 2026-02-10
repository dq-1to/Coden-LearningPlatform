import { supabase } from '../lib/supabase';

export const achievementService = {
    async getUnlockedAchievements(userId: string): Promise<string[]> {
        const { data, error } = await supabase
            .from('user_achievements')
            .select('achievement_id')
            .eq('user_id', userId);

        if (error) {
            console.error('Error fetching achievements:', error);
            return [];
        }

        return data.map((a) => a.achievement_id);
    },

    async unlockAchievement(userId: string, achievementId: string) {
        const { error } = await supabase
            .from('user_achievements')
            .insert({
                user_id: userId,
                achievement_id: achievementId,
            });

        if (error) {
            // Ignore unique violation (already unlocked)
            if (error.code !== '23505') {
                console.error('Error unlocking achievement:', error);
            }
        }
    },
};
