// Sidebar hamburger menu logic
const menuBtn = document.getElementById('menuBtn');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const navLinks = document.querySelectorAll('.sidebar .nav-link');
const sections = Array.from(navLinks).map(link => document.querySelector(link.getAttribute('href')));

function openSidebar() {
  sidebar.classList.add('open');
  overlay.classList.add('show');
}
function closeSidebar() {
  sidebar.classList.remove('open');
  overlay.classList.remove('show');
}

// Hamburger button opens sidebar
menuBtn.addEventListener('click', openSidebar);
// Overlay click closes sidebar
overlay.addEventListener('click', closeSidebar);

// Nav links: smooth scroll, close sidebar, highlight active
navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(link.getAttribute('href')).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
    closeSidebar();
  });
});

// Highlight active nav link on scroll
window.addEventListener('scroll', () => {
  let current = sections[0];
  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top - 80 < window.innerHeight / 2) {
      current = section;
    }
  });
  navLinks.forEach(link => link.classList.remove('active'));
  const activeLink = document.querySelector(`.sidebar a[href="#${current.id}"]`);
  if (activeLink) activeLink.classList.add('active');
});
