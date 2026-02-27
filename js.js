// Custom Cursor
const cursor = document.querySelector(".cursor");
const cursorFollower = document.querySelector(".cursor-follower");

document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";

  setTimeout(() => {
    cursorFollower.style.left = e.clientX + "px";
    cursorFollower.style.top = e.clientY + "px";
  }, 100);
});

document.querySelectorAll("a, button, .thumbnail").forEach((el) => {
  el.addEventListener("mouseenter", () => {
    cursor.style.transform = "translate(-50%, -50%) scale(1.5)";
    cursorFollower.style.transform = "translate(-50%, -50%) scale(1.5)";
  });
  el.addEventListener("mouseleave", () => {
    cursor.style.transform = "translate(-50%, -50%) scale(1)";
    cursorFollower.style.transform = "translate(-50%, -50%) scale(1)";
  });
});

// Scroll Progress Bar
window.addEventListener("scroll", () => {
  const windowHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const scrolled = (window.scrollY / windowHeight) * 100;
  document.querySelector(".scroll-progress").style.width = scrolled + "%";
});

// Reveal Animation
const reveals = document.querySelectorAll(".reveal");

const revealOnScroll = () => {
  reveals.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;

    if (elementTop < window.innerHeight - elementVisible) {
      element.classList.add("active");
    }
  });
};

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

// Auto-rotate project images
const autoRotateImages = () => {
  document.querySelectorAll(".project-card").forEach((card) => {
    const images = card.querySelectorAll(".gallery-image");
    const thumbnails = card.querySelectorAll(".thumbnail");
    let currentIndex = 0;

    images.forEach((img, i) => {
      if (img.classList.contains("active")) {
        currentIndex = i;
      }
    });

    const nextIndex = (currentIndex + 1) % images.length;

    images.forEach((img) => img.classList.remove("active"));
    thumbnails.forEach((thumb) => thumb.classList.remove("active"));

    images[nextIndex].classList.add("active");
    thumbnails[nextIndex].classList.add("active");
  });
};

setInterval(autoRotateImages, 4000);

// Open CV in new tab
function downloadCV() {
  const link = document.createElement("a");
  link.href = "images/Harikrishna_Shah_Resume.pdf";
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Parallax effect for orbs
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const orbs = document.querySelectorAll(".gradient-orb");

  orbs.forEach((orb, index) => {
    const speed = 0.5 + index * 0.2;
    orb.style.transform = `translateY(${scrolled * speed}px)`;
  });
});
function initThumbnails() {
  document.querySelectorAll(".project-card").forEach((card) => {
    const images = card.querySelectorAll(".gallery-image");
    const thumbnails = card.querySelectorAll(".thumbnail");

    images.forEach((imageDiv, index) => {
      const thumb = thumbnails[index];
      if (!thumb) return;

      // Clear existing content
      thumb.innerHTML = "";

      const imgTag = imageDiv.querySelector("img");

      if (imgTag) {
        // Create thumbnail img
        const thumbImg = document.createElement("img");
        thumbImg.src = imgTag.src;
        thumbImg.alt = imgTag.alt || `Thumbnail ${index + 1}`;
        thumbImg.style.width = "100%";
        thumbImg.style.height = "100%";
        thumbImg.style.objectFit = "cover";
        thumbImg.style.borderRadius = "8px";
        thumb.appendChild(thumbImg);
      } else {
        // fallback for emoji/text slides
        thumb.textContent = imageDiv.textContent;
      }
    });
  });
}

function switchImage(el, index) {
  const card = el.closest(".project-card");
  const images = card.querySelectorAll(".gallery-image");
  const thumbnails = card.querySelectorAll(".thumbnail");

  images.forEach((img, i) => {
    img.classList.toggle("active", i === index);
  });

  thumbnails.forEach((thumb, i) => {
    thumb.classList.toggle("active", i === index);
  });
}

document.addEventListener("DOMContentLoaded", initThumbnails);
