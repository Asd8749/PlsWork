		(function(){
			try {
				const key = 'gaem-theme';
				const stored = localStorage.getItem(key);
				if (stored) {
					document.documentElement.setAttribute('data-theme', stored);
				} else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
					document.documentElement.setAttribute('data-theme', 'dark');
				}
			} catch (e) { /* ignore */ }
		})();

(function () {
			// set year
			const yearEl = document.getElementById('year');
			if (yearEl) yearEl.textContent = new Date().getFullYear();

			const toggle = document.getElementById('themeToggle');
			const root = document.documentElement;
			const key = 'gaem-theme';

			function updateToggleUI(theme) {
				if (!toggle) return;
				const isDark = theme === 'dark';
				toggle.setAttribute('aria-pressed', String(isDark));
				// icons visibility handled by CSS ([data-theme] rules) but keep aria-label updated
				toggle.title = isDark ? 'Switch to light mode' : 'Switch to dark mode';
			}

			function applyTheme(theme) {
				root.setAttribute('data-theme', theme);
				try { localStorage.setItem(key, theme); } catch (e) {}
				updateToggleUI(theme);
			}

			// initial theme: persisted -> current document attribute -> system -> light
			const stored = (function() { try { return localStorage.getItem(key); } catch(e){ return null; } })();
			const currentAttr = root.getAttribute('data-theme');
			const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
			applyTheme(stored || currentAttr || (prefersDark ? 'dark' : 'light'));

			if (toggle) {
				// initialize aria-pressed
				toggle.setAttribute('role','button');
				toggle.addEventListener('click', () => {
					const current = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
					applyTheme(current);
				});
			}
})();