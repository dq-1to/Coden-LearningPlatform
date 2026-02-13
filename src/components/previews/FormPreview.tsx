import { useState } from 'react';
import styles from './Preview.module.css';

// Step4: フォームバリデーション - 複合的なstate管理と入力検証を学ぶプレビュー

interface FormData {
    email: string;
    password: string;
    confirmPassword: string;
}

interface FormErrors {
    email?: string;
    password?: string;
    confirmPassword?: string;
}

function FormPreview() {
    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [submitted, setSubmitted] = useState(false);

    const validate = (): boolean => {
        const newErrors: FormErrors = {};

        // メールアドレスチェック
        if (!formData.email) {
            newErrors.email = 'メールアドレスは必須です';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'メールアドレスの形式が正しくありません';
        }

        // パスワードチェック
        if (!formData.password) {
            newErrors.password = 'パスワードは必須です';
        } else if (formData.password.length < 8) {
            newErrors.password = 'パスワードは8文字以上必要です';
        }

        // 確認パスワードチェック
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'パスワードが一致しません';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setSubmitted(false);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            setSubmitted(true);
        }
    };

    const resetForm = () => {
        setFormData({ email: '', password: '', confirmPassword: '' });
        setErrors({});
        setSubmitted(false);
    };

    return (
        <div className={styles.previewContent}>
            <form onSubmit={handleSubmit} className={styles.formPreview}>
                <div className={styles.formGroup}>
                    <label>メールアドレス</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="example@email.com"
                        className={errors.email ? styles.inputError : ''}
                    />
                    {errors.email && <span className={styles.errorText}>{errors.email}</span>}
                </div>

                <div className={styles.formGroup}>
                    <label>パスワード</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="8文字以上"
                        className={errors.password ? styles.inputError : ''}
                    />
                    {errors.password && <span className={styles.errorText}>{errors.password}</span>}
                </div>

                <div className={styles.formGroup}>
                    <label>パスワード確認</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="パスワードを再入力"
                        className={errors.confirmPassword ? styles.inputError : ''}
                    />
                    {errors.confirmPassword && <span className={styles.errorText}>{errors.confirmPassword}</span>}
                </div>

                <div className={styles.formActions}>
                    <button type="submit" className={styles.submitBtn}>登録</button>
                    <button type="button" className={styles.resetBtn} onClick={resetForm}>リセット</button>
                </div>

                {submitted && (
                    <div className={styles.successMessage}>
                        ✅ 登録成功！（デモなので実際には送信されません）
                    </div>
                )}
            </form>
        </div>
    );
}

export default FormPreview;
