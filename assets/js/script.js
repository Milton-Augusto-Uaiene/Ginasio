'use strict';



/**
 * add event on element
 */ 

const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
}



/**
 * navbar toggle
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navLinks = document.querySelectorAll("[data-nav-link]");

const toggleNavbar = function () { navbar.classList.toggle("active"); }

addEventOnElem(navTogglers, "click", toggleNavbar);

const closeNavbar = function () { navbar.classList.remove("active"); }

addEventOnElem(navLinks, "click", closeNavbar);



/**
 * header & back top btn active
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

window.addEventListener("scroll", function () {
  if (window.scrollY >= 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});


// Massa de Indice Corporal

const calculateForm = document.getElementById('calculate-form'),
      calculateCm = document.getElementById('calculate-cm'),
      calculateKg = document.getElementById('calculate-kg'),
      calculateMessage = document.getElementById('calculate-message')

const calculateBmi = (e) => {
  e.preventDefault() 

  if(calculateCm.value === '' || calculateKg.value === '') {

    calculateMessage.classList.remove('color-green')
    calculateMessage.classList.add('color-red')

    calculateMessage.textContent = 'Digite sua Altura e Peso'

    setTimeout(() => {
    calculateMessage.textContent = ''
  }, 3000)
 } else {
    const cm = calculateCm.value / 100,
          kg = calculateKg.value,
          bmi = Math.round(kg / (cm * cm))

    if(bmi < 18.5) {
      calculateMessage.classList.add('color-green')
      calculateMessage.textContent = `Seu BMI e ${bmi} voce esta magro`
    } else if(bmi <25) {
      calculateMessage.classList.add('color-green')
      calculateMessage.textContent = `Seu BMI e ${bmi} voce esta Saudavel`
    } else {
      calculateMessage.classList.add('color-green')
      calculateMessage.textContent = `Seu BMI e ${bmi} voce esta Acima do Peso`
    }

    calculateCm.value = ''
    calculateKg.value = ''

    setTimeout(() => {
      calculateMessage.textContent = ''
    }, 4000)
 }

} 
 



calculateForm.addEventListener('submit', calculateBmi)



const checkbox = document.getElementById("checkbox");
      const professional = document.getElementById("professional");
      const master = document.getElementById("master");
      const basic = document.getElementById("basic");

      checkbox.addEventListener("click", () => {
        basic.textContent = basic.textContent === "12.000Mt" ? "1.200Mt" : "12.000Mt";
        professional.textContent =
          professional.textContent === "2.500Mt" ? "18.000Mt " : "2.500Mt";
        master.textContent = master.textContent === "24.000Mt" ? "5.500Mt" : "24.000Mt";
      });


/*
else {
  const cm = calculateCm.value / 100,
        kg = calculateKg.value,
        bmi = Math.round(kg / (cm * cm))

        if(bmi < 18.5) {
          calculateMessage.classList.add('color-green')
          calculateMessage.textContent = `Seu BmA e ${bmi} estas magro`
        } else if(bmi) */

        var book_table = new Swiper(".book-table-img-slider", {
          slidesPerView: 1,
          spaceBetween: 20,
          loop: true,
          autoplay: {
              delay: 3000,
              disableOnInteraction: false,
          },
          speed: 2000,
          effect: "coverflow",
          coverflowEffect: {
              rotate: 3,
              stretch: 2,
              depth: 100,
              modifier: 5,
              slideShadows: false,
          },
          loopAdditionSlides: true,
          navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
          },
          pagination: {
              el: ".swiper-pagination",
              clickable: true,
          },
      });





      document.querySelector('.busca').addEventListener('submit', async (event) => {
        event.preventDefault();
    
        let input = document.querySelector('#searchInput').value;
        
        if(input !== '') {
            clearInfo();
            showWarning('Carregando...');
    
            let results = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=
            ${encodeURI(input)}&units=metric&lang=pt_br&appid=d06cdb298fafc83c520d5ab677fc477e`);
            let json = await results.json();
    
            if(json.cod === 200) {
                showInfo({
                    name: json.name,
                    country: json.sys.country,
                    temp: json.main.temp,
                    tempIcon: json.weather[0].icon,
                    windSpeed: json.wind.speed,
                    windAngle: json.wind.deg
                });
            } else {
                clearInfo();
                showWarning('Não encontramos esta localização.');
            }
        } else {
            clearInfo();
        }
    });
     
    function showInfo(obj) {
        showWarning('');
    
        document.querySelector('.titulo').innerHTML = `${obj.name}, ${obj.country}`;
        
        document.querySelector('.tempInfo').innerHTML = `${obj.temp} <sup>ºC</sup>`;
        document.querySelector('.ventoInfo').innerHTML = `${obj.windSpeed} <span>km/h</span>`;
    
        document.querySelector('.temp img').setAttribute('src', 
        `http://openweathermap.org/img/wn/${obj.tempIcon}@2x.png`);
        
        document.querySelector('.ventoPonto').style.transform = `rotate(${obj.windAngle-90}deg)`;
    
        document.querySelector('.resultado').style.display = 'block';
    }
    
    function clearInfo() {
        showWarning('');
        document.querySelector('.resultado').style.display = 'none';
    }
    
    function showWarning(msg) {
        document.querySelector('.aviso').innerHTML = msg;
    }


