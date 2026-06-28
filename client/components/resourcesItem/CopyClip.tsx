import React, { useEffect, useState } from 'react';
import { CircleCheck, Copy } from 'lucide-react';

interface CopyClipProps {
    copyClip: string;
}

const CopyClip: React.FC<CopyClipProps> = ({ copyClip }) => {
    const [copy, setCopy] = useState(true);
    let timeoutId: NodeJS.Timeout;

    const copyToClipboard = (value: string) => {
        if (value) {
            navigator.clipboard.writeText(value);
        }
        setCopy(false);
        // Clear existing timeout if present
        clearTimeout(timeoutId);

        // Reset the icon after 3 seconds
        timeoutId = setTimeout(() => {
            setCopy(true);
        }, 3000);
    };

    useEffect(() => {
        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <button
        className=' border px-2 rounded-sm'
            onClick={() => copyToClipboard(copyClip)}
        >
            {copy ? <Copy className="h-4 w-4 text-neutral-800 dark:text-neutral-300" /> : <CircleCheck />}
        </button>
    );
};

export default CopyClip;
