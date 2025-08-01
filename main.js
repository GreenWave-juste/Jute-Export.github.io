
document.addEventListener('DOMContentLoaded', () => {

  // 1. Mobile Menu Toggle
  const menuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (menuButton && mobileMenu) {
    menuButton.addEventListener('click', () => {
      const isHidden = mobileMenu.classList.toggle('hidden');
      menuButton.setAttribute('aria-expanded', String(!isHidden));
      
      // Toggle icon
      menuButton.innerHTML = !isHidden 
        ? `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-7 w-7"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`
        : `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-7 w-7"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>`;
    });
  }

  // 2. Scroll-to-Top Button
  const scrollToTopButton = document.getElementById('scroll-to-top-button');
  
  if (scrollToTopButton) {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        scrollToTopButton.classList.remove('opacity-0', 'pointer-events-none');
        scrollToTopButton.classList.add('opacity-100');
      } else {
        scrollToTopButton.classList.add('opacity-0', 'pointer-events-none');
        scrollToTopButton.classList.remove('opacity-100');
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    scrollToTopButton.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    });
  }
  
  // 3. FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionButton = item.querySelector('.faq-question');
    const answerDiv = item.querySelector('.faq-answer');
    const icon = questionButton.querySelector('svg');

    if (questionButton && answerDiv) {
      questionButton.addEventListener('click', () => {
        const isCurrentlyOpen = questionButton.getAttribute('aria-expanded') === 'true';

        // Close all other items
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
              const otherQuestion = otherItem.querySelector('.faq-question');
              const otherAnswer = otherItem.querySelector('.faq-answer');
              const otherIcon = otherQuestion.querySelector('svg');
              
              otherQuestion.setAttribute('aria-expanded', 'false');
              otherAnswer.classList.add('max-h-0');
              otherAnswer.classList.remove('max-h-96', 'mt-4');
              otherIcon.style.transform = 'rotate(0deg)';
          }
        });

        // Toggle the clicked item
        if (isCurrentlyOpen) {
          questionButton.setAttribute('aria-expanded', 'false');
          answerDiv.classList.add('max-h-0');
          answerDiv.classList.remove('max-h-96', 'mt-4');
          icon.style.transform = 'rotate(0deg)';
        } else {
          questionButton.setAttribute('aria-expanded', 'true');
          answerDiv.classList.remove('max-h-0');
          answerDiv.classList.add('max-h-96', 'mt-4');
          icon.style.transform = 'rotate(180deg)';
        }
      });
    }
  });

  // 4. Contact Form
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  if (contactForm && formStatus) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());
        console.log('Form data submitted:', data);

        // Simulate API call and provide UI feedback
        formStatus.textContent = 'Sending...';
        formStatus.className = 'mt-4 text-center font-medium text-gray-600';

        setTimeout(() => {
          formStatus.textContent = 'Thank you for your message! We will get back to you soon.';
          formStatus.className = 'mt-4 text-center font-medium text-green-600';
          contactForm.reset();

          // Hide message after 5 seconds
          setTimeout(() => {
            formStatus.className = 'mt-4 text-center font-medium hidden';
          }, 5000);
        }, 1000);
    });
  }

});
