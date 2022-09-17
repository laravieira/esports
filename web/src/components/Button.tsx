import { ButtonHTMLAttributes } from 'react';

export function Button(props: ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button { ...props }
                className="w-12 h-12 bg-zinc-900 rounded first:bg-zinc-900/70 last:bg-zinc-900/70">
            { props.children }
        </button>

    );
}