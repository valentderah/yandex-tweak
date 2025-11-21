import {useState, useEffect, useCallback} from 'react';

const ANIMATION_DURATION = 1000;

/**
 * Hook to handle save animation state and logic
 * @param {Function} onSave Async function to execute when save is triggered.
 * @returns {Object} { status, triggerSave, onAnimationEnd, textClasses }
 */
export const useSaveAnimation = (onSave) => {
    const [status, setStatus] = useState('idle'); // 'idle' | 'saving' | 'visible' | 'hiding'

    const triggerSave = useCallback(async () => {
        if (status !== 'idle') return;

        setStatus('saving');
        try {
            await onSave();
            setStatus('visible');
        } catch (error) {
            setStatus('idle');
        }
    }, [onSave, status]);

    useEffect(() => {
        if (status === 'visible') {
            const timer = setTimeout(() => setStatus('hiding'), ANIMATION_DURATION);
            return () => clearTimeout(timer);
        }
    }, [status]);

    const onAnimationEnd = useCallback(() => {
        if (status === 'hiding') {
            setStatus('idle');
        }
    }, [status]);

    const getClasses = () => {
        switch (status) {
            case 'visible':
                return 'ml-1 fade-in';
            case 'hiding':
                return 'ml-1 fade-out opacity-0';
            default:
                return 'ml-1 opacity-0';
        }
    };

    return {
        status,
        textClasses: getClasses(),
        triggerSave,
        onAnimationEnd
    };
};
