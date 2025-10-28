const slidesContainer = document.querySelector('.slides');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const counter = document.querySelector('.slider__counter');

let currentIndex = 1; 
let totalSlides = slides.length;

const firstClone = slides[0].cloneNode(true);
const lastClone = slides[totalSlides - 1].cloneNode(true);

slidesContainer.appendChild(firstClone);
slidesContainer.insertBefore(lastClone, slidesContainer.firstChild);

const allSlides = document.querySelectorAll('.slide');
const slideWidth = allSlides[0].clientWidth;

slidesContainer.style.transform = `translateX(-${slideWidth * currentIndex}px)`;

function updateCounter() {
  let displayIndex = currentIndex;
  if (displayIndex === 0) displayIndex = totalSlides;
  if (displayIndex === totalSlides + 1) displayIndex = 1;
  counter.textContent = `Изображение ${displayIndex} из ${totalSlides}`;
}

function moveToSlide() {
  slidesContainer.style.transition = 'transform 0.5s ease-in-out';
  slidesContainer.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
  updateCounter();
}

nextBtn.addEventListener('click', () => {
  if (currentIndex >= totalSlides + 1) return;
  currentIndex++;
  moveToSlide();
});

prevBtn.addEventListener('click', () => {
  if (currentIndex <= 0) return;
  currentIndex--;
  moveToSlide();
});

slidesContainer.addEventListener('transitionend', () => {
  if (allSlides[currentIndex].isSameNode(firstClone)) {
    slidesContainer.style.transition = 'none';
    currentIndex = 1;
    slidesContainer.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
  } else if (allSlides[currentIndex].isSameNode(lastClone)) {
    slidesContainer.style.transition = 'none';
    currentIndex = totalSlides;
    slidesContainer.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
  }
});

updateCounter();