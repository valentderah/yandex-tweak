import { useState, useEffect, useCallback } from 'react';

export const useSaveAnimation = (onSave) => {
    const [isSaving, setIsSaving] = useState(false);
    const [textClasses, setTextClasses] = useState('ml-1 opacity-0');

    useEffect(() => {
        if (!isSaving) return;

        // Используем setTimeout, чтобы браузер успел отрисовать начальное состояние перед анимацией
        const fadeInTimer = setTimeout(() => {
            setTextClasses('ml-1 fade-in');
        }, 10);

        const fadeOutTimer = setTimeout(() => {
            setTextClasses('ml-1 fade-out opacity-0');
        }, 2000);

        const resetStateTimer = setTimeout(() => {
            setIsSaving(false);
            setTextClasses('ml-1 opacity-0');
        }, 3000);

        return () => {
            clearTimeout(fadeInTimer);
            clearTimeout(fadeOutTimer);
            clearTimeout(resetStateTimer);
        };
    }, [isSaving]);

    const triggerSave = useCallback(() => {
        onSave(() => setIsSaving(true));
    }, [onSave]);

    return { textClasses, triggerSave };
};