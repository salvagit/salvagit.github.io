// sticky header.
const navbar = document.getElementById("header");
const sticky = navbar.offsetTop;

window.onscroll = function () {
  if (window.pageYOffset > sticky) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
};

// images gallery.
const handleOpenImage = function (evt) {
  evt.target.parentNode.classList.add("full-image");
  document.body.style.overflow = "hidden";

  document.querySelector(".prev-image").style.display = "flex";
  document.querySelector(".next-image").style.display = "flex";
};
document
  .querySelectorAll(".image-container img")
  .forEach((el) => el.addEventListener("click", handleOpenImage));

const handleCloseImage = function () {
  document.body.style.overflow = "auto";

  document.querySelector(".full-image")?.classList.remove("full-image");
  document.querySelector(".prev-image").style.display = "none";
  document.querySelector(".next-image").style.display = "none";
};
document
  .querySelectorAll(".close-image")
  .forEach((el) => el.addEventListener("click", handleCloseImage));

const handleNavigate = ({ goPrev = false } = {}) => {
  const images = document.querySelectorAll(".image-container");
  const currentIndex = Object.values(images).findIndex((element) =>
    element.className.includes("full-image")
  );

  if (currentIndex === -1) {
    return;
  }

  const isFirst = currentIndex === 0;
  const isLast = currentIndex === images.length - 1;

  images[currentIndex].classList.remove("full-image");

  let nextIndex = goPrev ? currentIndex - 1 : currentIndex + 1;

  if (isFirst && goPrev) {
    nextIndex = images.length - 1;
  }

  if (isLast && !goPrev) {
    nextIndex = 0;
  }

  images[nextIndex].classList.add("full-image");
};

const handleGoPrev = (evt) => {
  handleNavigate({ goPrev: true });
};
document.querySelector(".prev-image").addEventListener("click", handleGoPrev);

const handleGoNext = (evt) => {
  handleNavigate();
};
document.querySelector(".next-image").addEventListener("click", handleGoNext);

// bind keys
document.onkeydown = function (e) {
  e = e || window.event;

  if (e.key === "ArrowLeft") {
    handleNavigate({ goPrev: true });
  }

  if (e.key === "ArrowRight") {
    handleNavigate({ goPrev: true });
  }

  if (e.key === "Escape") {
    handleCloseImage();
  }
};

// GSap
function animateFrom(elem, direction) {
  direction = direction || 1;
  let x = 0,
    y = direction * 100;
  if (elem.classList.contains("gs_reveal_fromLeft")) {
    x = -100;
    y = 0;
  } else if (elem.classList.contains("gs_reveal_fromRight")) {
    x = 100;
    y = 0;
  }
  elem.style.transform = "translate(" + x + "px, " + y + "px)";
  elem.style.opacity = "0";
  gsap.fromTo(
    elem,
    { x: x, y: y, autoAlpha: 0 },
    {
      duration: 1.25,
      x: 0,
      y: 0,
      autoAlpha: 1,
      ease: "expo",
      overwrite: "auto",
    }
  );
}

function hide(elem) {
  gsap.set(elem, { autoAlpha: 0 });
}

if (window.innerWidth > 900) {
  document.addEventListener("DOMContentLoaded", function () {
    gsap.registerPlugin(ScrollTrigger);
  
    gsap.utils.toArray(".gs_reveal").forEach(function (elem) {
      hide(elem); // assure that the element is hidden when scrolled into view
  
      ScrollTrigger.create({
        trigger: elem,
        onEnter: function () {
          animateFrom(elem);
        },
        onEnterBack: function () {
          animateFrom(elem, -1);
        },
        onLeave: function () {
          hide(elem);
        }, // assure that the element is hidden when scrolled into view
      });
    });
  });
}
