
  document.addEventListener("DOMContentLoaded", () => {

    AOS.init();

    const gearSound = document.getElementById("gear-sound");
    const sections = document.querySelectorAll(".algorithm-section");
    const navLinks = document.querySelectorAll(".template-pages---nav-item-link");

    const algorithms = [
            "Welcome",
"Eng - Ahmed ",
      "RSA",
      "AES",
      "DES",
      "3DES",
      "Caesar",
      "Playfair",
      "Hill",
      "Substitution",
      "Simple Block"
    ];

    const container = document.getElementById("container");
    const textEl = document.getElementById("text");

    let index = 0;

    function playSoundAndVibrate() {
      if (gearSound) {
        gearSound.currentTime = 0;
        gearSound.play().catch(() => {});
      }
      if (navigator.vibrate) {
        navigator.vibrate(50);
      }
    }

    navLinks.forEach(link => {
      link.addEventListener("click", e => {
        e.preventDefault();
        const targetId = link.getAttribute("href");
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          window.scroll({
            top: targetElement.offsetTop - 5,
            behavior: "smooth"
          });
          playSoundAndVibrate();
        }
      });
    });

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const targetId = `#${entry.target.id}`;
        const activeLink = document.querySelector(
          `.template-pages---nav-item-link[href="${targetId}"]`
        );

        if (entry.isIntersecting) {
          navLinks.forEach(link => link.classList.remove("active"));
          if (activeLink) activeLink.classList.add("active");
        }
      });
    }, {
      root: null,
      rootMargin: "0px 0px -50% 0px",
      threshold: 0
    });

    sections.forEach(section => observer.observe(section));

    function showNextAlgorithm() {
      textEl.textContent = algorithms[index];
      textEl.classList.add("show");

      setTimeout(() => {
        textEl.classList.remove("show");
        textEl.classList.add("hide");

        setTimeout(() => {
          textEl.classList.remove("hide");
          index++;

          if (index < algorithms.length) {
            showNextAlgorithm();
          } else {
            container.style.display = "none";
            sessionStorage.setItem("introPlayed", "true");
          }
        }, 200);
      }, 200);
    }

    if (!sessionStorage.getItem("introPlayed")) {
      showNextAlgorithm();
    } else {
      container.style.display = "none";
    }

  });
