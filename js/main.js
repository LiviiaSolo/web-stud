
document.addEventListener("DOMContentLoaded", () => {

  // console.log("Site loaded");

  // BURGER MENU
  const burger = document.getElementById("burger");
  const nav = document.querySelector(".nav");
  const navLinks = document.querySelectorAll(".nav a");

  if (burger && nav) {
    burger.addEventListener("click", () => {
      nav.classList.toggle("active");
      burger.classList.toggle("active");
    });

    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        nav.classList.remove("active");
        burger.classList.remove("active");
      });
    });
  }
  

  // SCROLL ANIMATION (old fade-up)
  const elements = document.querySelectorAll('.fade-up');

  window.addEventListener('scroll', () => {
    elements.forEach(el => {
      const top = el.getBoundingClientRect().top;
      if (top < window.innerHeight - 50) {
        el.classList.add('show');
      }
    });
  });


  // CONTACT FORM
  const form = document.getElementById("contactForm");
  const success = document.getElementById("formSuccess");

  if (form && success) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const data = new FormData(form);

      try {
        const response = await fetch(form.action, {
          method: "POST",
          body: data,
          headers: { Accept: "application/json" },
        });

        if (response.ok) {
          success.classList.add("show");
          form.reset();

          setTimeout(() => {
            success.classList.remove("show");
          }, 4000);
        } else {
          alert("❌ Niečo sa pokazilo.");
        }
      } catch {
        alert("❌ Chyba pripojenia.");
      }
    });
  }


  // // ACCORDION
  document.querySelectorAll('.accordion-item, .faq-item').forEach(item => {
  const trigger = item.querySelector('.accordion-header, .faq-question');

  if (trigger) {
    trigger.addEventListener('click', () => {
      item.classList.toggle('active');
    });
  }
});


  // Discovery
  document.querySelectorAll("[data-modal]").forEach(button => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      const id = button.getAttribute("data-modal");
      document.getElementById(id).style.display = "flex";
    });
  });

  // Close buttons
  document.querySelectorAll(".close").forEach(btn => {
    btn.addEventListener("click", () => {
      btn.closest(".modal").style.display = "none";
    });
  });

  // Close background
  document.querySelectorAll(".modal").forEach(modal => {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });
  });

  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal-close-project")) {
      e.target.closest(".modal-overlay-project").style.display = "none";
    }
  });


  // ABOUT LIST
  const aboutList = document.querySelector(".about-list");
  if (aboutList) aboutList.classList.add("active");


  // LAPTOP ANIMATION
  const laptop = document.querySelector(".laptop");

  if (laptop) {
    window.addEventListener("scroll", () => {
      const trigger = window.innerHeight * 0.85;
      const top = laptop.getBoundingClientRect().top;

      if (top < trigger) {
        laptop.classList.add("active");
      }
    });
  }


  // NEW — GLOBAL FADE-IN OBSERVER
  const animatedElements = document.querySelectorAll(
    '.fade-in, .fade-up, .fade-left, .fade-right, .fade-slow, .fade-card'
  );

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.15 });

  animatedElements.forEach(el => observer.observe(el));

});


// Modal nehnuteľnosť 

const openBtns = document.querySelectorAll('[data-modal]');
const modals = document.querySelectorAll('.modal');

openBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const id = btn.getAttribute('data-modal');
    document.getElementById(id).classList.add('active');
  });
});

modals.forEach(modal => {
  const closeBtn = modal.querySelector('.modal-close');
  const overlay = modal.querySelector('.modal-overlay');

  closeBtn.addEventListener('click', () => {
    modal.classList.remove('active');
  });

  overlay.addEventListener('click', () => {
    modal.classList.remove('active');
  });
});


// SLIDER REALTY
const imgContainer = document.querySelector('.img-container');
const boxes = Array.from(imgContainer.children);
const dotsContainer = document.querySelector('.dots');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let currentIndex = 0;

boxes.forEach((_, i) => {
  const dot = document.createElement('span');
  dot.classList.add('dot');
  if (i === 0) dot.classList.add('active');
  dot.dataset.index = i;
  dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.dot');

function updateDots() {
  dots.forEach(dot => dot.classList.remove('active'));
  dots[currentIndex].classList.add('active');
}

function goToSlide(index) {
  while (currentIndex !== index) {
    if (index > currentIndex) {

      imgContainer.appendChild(imgContainer.firstElementChild);
      currentIndex = (currentIndex + 1) % boxes.length;
    } else {

      imgContainer.prepend(imgContainer.lastElementChild);
      currentIndex = (currentIndex - 1 + boxes.length) % boxes.length;
    }
  }
  updateDots();
}

// // --- tlačidlá---
nextBtn.addEventListener('click', () => {
  goToSlide((currentIndex + 1) % boxes.length);
});

prevBtn.addEventListener('click', () => {
  goToSlide((currentIndex - 1 + boxes.length) % boxes.length);
});

// // --- kliknite na dot ---
dots.forEach(dot => {
  dot.addEventListener('click', () => {
    goToSlide(Number(dot.dataset.index));
    });
});


let touchStartX = 0;
let touchEndX = 0;

imgContainer.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
});

imgContainer.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    if (touchStartX - touchEndX > 50) nextBtn.click(); 
    if (touchEndX - touchStartX > 50) prevBtn.click(); 
}

