
window.addEventListener("load", function(){
	let wrapper=document.getElementsByClassName("wrapper")[0];
	let body=document.body;
	let pageLi=wrapper.children;
	let top=wrapper.firstElementChild;
	let tab=top.querySelector("#open_tab");
	let tabMenu=top.querySelector("#open_menu");
	let tabLi=tabMenu.getElementsByTagName("ul")[0].children;
	let gnb=tab.previousElementSibling;
	let gnbLi=gnb.firstElementChild.children;
    let n=0;
	let prevN;

	function tabClose(){
		body.classList.remove("fixed");
		tabMenu.classList.remove("open");
		tab.classList.remove("active");
	}

    tab.addEventListener("click", function(e){
		e.preventDefault();
		if(tab.classList.contains("active") == false){
			body.classList.add("fixed");
			tabMenu.classList.add("open");
			tab.classList.add("active");
		}
		else{
			tabClose();
		}
	});

	let winW;
	let winH;

	function init(){
		winW=window.innerWidth;
		winH=window.innerHeight*0.3;
		gnbLi[n].classList.add("on");
	}
	init();
	window.addEventListener("resize", init);

	function scrollInteraction(t){		
		if(t < pageLi[1].offsetTop-winH){
			n=0;
		}
		else if(t < pageLi[2].offsetTop-winH){
			n=1;
		}
		else if(t < pageLi[3].offsetTop-winH){
			n=2;
		}
		else {
			n=3;
		}
		if(n === prevN) return;
		prevN=n;
		console.log(n);
		for(let i=0; i<gnbLi.length; i++){		
			if(i == n){
				gnbLi[i].classList.add("on");
			}
			else{
				gnbLi[i].classList.remove("on");
			}
		}
	}

	// gnb메뉴 페이지 이동
	for(let i=0; i<gnbLi.length; i++){
		gnbLi[i].addEventListener("click", function(e){
			e.preventDefault();

			n=i;
			let targety=pageLi[i].offsetTop;
			
			gsap.to(window, {scrollTo: targety, duration: 0.5 });
		});
	}
	// tab 메뉴 페이지 이동
	for(let i=0; i<tabLi.length; i++){		
		tabLi[i].addEventListener("click", function(e){
			e.preventDefault();
			n=i;
			let targety=pageLi[i].offsetTop;
			tabClose();
						
			gsap.to(window, {scrollTo: targety, duration: 0.5 , delay: 0.7});
		});
	}
	const trigger=new ScrollTrigger.default({
		trigger: {
			once: true,
			toggle: {
				class: {
					in: "active",
					out: "inactive"
				}
			},
			offset: {
				viewport: {
					x: 0, 
					y: 0.3
				}
			},
		},
		scroll: {
			sustain: 200, // 지속시간
			element: window,
			callback: (offset, dir) => { scrollInteraction(offset.y); }
		}
	});
	trigger.add("#top, section[id^=page], #contact");

	const portfolioLink=[
		{
			title:"프레스캣",
			detail: "location.href='project_template1.html'",
			link: "location.href='https://zzang1537.github.io/project1/'"
		},
		{
			title:"올고다",
			detail: "location.href='project_template2.html'",
			link: "location.href='https://zzang1537.github.io/project2/'"
		},
		{
			title:"오므토토마토",
			detail: "location.href='project_template3.html'",
			link: "location.href='https://zzang1537.github.io/project3/'"
		},
	];

	let mainSwiper=top.querySelector(".mainSwiper");
	let [swiperWrapper, visitBtn, detailBtn, control]=mainSwiper.children;
	let arrow=control.lastElementChild.lastElementChild;
	let [leftBtn, rightBtn]=arrow.children;

    // swiper
    let swiper = new Swiper(".mainSwiper", {
        speed: 1200,
        spaceBetween: 50,
        loop: true,
        autoplay: {
            delay: 6000,
            disableOnInteraction: false 
        },
        pagination: {
            el: ".swiper-pagination",
            type: "fraction",
        },
        breakpoints: {
            450: {
                spaceBetween: 100
            },
        },
        on: {
            init: function(){
                slideN=this.realIndex;
                sliderTotal=this.slides.length;

				detailBtn.setAttribute("onclick", portfolioLink[slideN].detail);
				visitBtn.setAttribute("onclick", portfolioLink[slideN].link);			
            },
            slideChange: function(){
                slideN=this.realIndex;
                sliderTotal=this.slides.length;

				detailBtn.setAttribute("onclick", portfolioLink[slideN].detail);
				visitBtn.setAttribute("onclick", portfolioLink[slideN].link);
            }
        }
    });

	leftBtn.addEventListener("click", function(e){
		e.preventDefault();
		//console.log("L.click");
		swiper.slidePrev();				
	});
	rightBtn.addEventListener("click", function(e){
		e.preventDefault();
		//console.log("R.click");
		swiper.slideNext();		
	});

	let aboutBtn=top.lastElementChild.lastElementChild;

	aboutBtn.addEventListener("click", function(e){
		e.preventDefault();
		gsap.to(window, {scrollTo: pageLi[3], duration: 0.5});
	});
});


