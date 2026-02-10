import { supabase } from '../lib/supabase';

export interface Submission {
    id: number;
    challengeId: string;
    code: string;
    status: 'passed' | 'failed' | 'error';
    errorMessage?: string;
    executionTime?: number;
    submittedAt: string;
}

export const submissionService = {
    async saveSubmission(userId: string, submission: Omit<Submission, 'id' | 'submittedAt'>) {
        const { error } = await supabase
            .from('user_submissions')
            .insert({
                user_id: userId,
                challenge_id: submission.challengeId,
                code: submission.code,
                status: submission.status,
                error_message: submission.errorMessage,
                execution_time: submission.executionTime,
            });

        if (error) {
            console.error('Error saving submission:', error);
        }
    },

    async getSubmissions(userId: string, challengeId: string): Promise<Submission[]> {
        const { data, error } = await supabase
            .from('user_submissions')
            .select('*')
            .eq('user_id', userId)
            .eq('challenge_id', challengeId)
            .order('submitted_at', { ascending: false });

        if (error) {
            console.error('Error fetching submissions:', error);
            return [];
        }

        return data.map((s) => ({
            id: s.id,
            challengeId: s.challenge_id,
            code: s.code,
            status: s.status as 'passed' | 'failed' | 'error',
            errorMessage: s.error_message || undefined,
            executionTime: s.execution_time || undefined,
            submittedAt: s.submitted_at,
        }));
    },
};
