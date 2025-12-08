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

	// Set active page indicator for both desktop and mobile navigation
	function setActiveNavLink() {
		const currentPage = window.location.pathname.split('/').pop() || 'index.html';
		
		// Get all nav links (both desktop and mobile)
		const navLinks = document.querySelectorAll('.nav-link');
		
		navLinks.forEach(link => {
			const href = link.getAttribute('href');
			
			// Check if the link matches the current page
			if (href === currentPage || (currentPage === '' && href === 'index.html')) {
				link.setAttribute('aria-current', 'page');
			} else {
				link.removeAttribute('aria-current');
			}
		});
	}

	// Call on page load and on hash change
	setActiveNavLink();
	window.addEventListener('hashchange', setActiveNavLink);
});

