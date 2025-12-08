document.addEventListener('DOMContentLoaded', function () {
	const toggle = document.getElementById('nav-toggle');
	const mobileMenu = document.getElementById('mobile-menu');
	const openIcon = document.getElementById('nav-open');
	const closeIcon = document.getElementById('nav-close');

	if (!toggle || !mobileMenu) return;

	toggle.addEventListener('click', function () {
		const isHidden = mobileMenu.classList.contains('hidden');
		if (isHidden) {
			mobileMenu.classList.remove('hidden');
			toggle.setAttribute('aria-expanded', 'true');
			if (openIcon) openIcon.classList.add('hidden');
			if (closeIcon) closeIcon.classList.remove('hidden');
		} else {
			mobileMenu.classList.add('hidden');
			toggle.setAttribute('aria-expanded', 'false');
			if (openIcon) openIcon.classList.remove('hidden');
			if (closeIcon) closeIcon.classList.add('hidden');
		}
	});
});
