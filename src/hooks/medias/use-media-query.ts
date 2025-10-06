'use client';

import React from 'react';

type TailwindBreakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

const tailwindBreakpoints: Record<TailwindBreakpoint, string> = {
	sm: '640px',
	md: '768px',
	lg: '1024px',
	xl: '1280px',
	'2xl': '1536px',
};

// Esse hook recebe um breakpoint do Tailwind (como "md" ou "lg") e
// retorna um booleano que indica se a tela do usuário está igual ou maior que esse tamanho.
export function useMediaQuery(breakpoint: TailwindBreakpoint) {
	const [matches, setMatches] = React.useState(false);

	React.useEffect(() => {
		const minWidth = tailwindBreakpoints[breakpoint];
		const mediaQueryString = `(min-width: ${minWidth})`;
		const mediaQueryList = window.matchMedia(mediaQueryString);

		function handleMediaQueryChange(event: MediaQueryListEvent) {
			setMatches(event.matches);
		}

		setMatches(mediaQueryList.matches);
		mediaQueryList.addEventListener('change', handleMediaQueryChange);

		return () =>
			mediaQueryList.removeEventListener('change', handleMediaQueryChange);
	}, [breakpoint]);

	return matches;
}
