window.addEventListener("load", function(){
	let pageLi=document.querySelectorAll("section[class^=main]");

	let n, winH;
	let prevN;

	function init(){
		winH=window.innerHeight*0.25
	}
	init();
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
		else{
			n=3;
		}
		
		if( n === prevN) return;
		prevN=n;
		console.log(n);
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
					y: 0.25
				}
			},
		},
		scroll: {
			sustain: 200, 
			element: window,
			callback: (offset, dir) => { scrollInteraction(offset.y); }
		}
	});
	trigger.add("section[class^=main]");
});


