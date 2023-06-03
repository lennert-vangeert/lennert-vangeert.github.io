gsap.from("#chapter1", {
  scrollTrigger: {
    trigger: "#chapter1",
    scroller: "main",
    start: "top 80%",
  },
  duration: 1,
  opacity: 0,
  x: -300,
});

gsap.from("#chapter2", {
  scrollTrigger: {
    trigger: "#chapter2",
    scroller: "main",
    start: "top 80%",
    end: "bottom 20%",
  },
  duration: 0.5,
  opacity: 0,
  x: +300,
});

gsap.from("#chapter3", {
  scrollTrigger: {
    trigger: "#chapter3",
    scroller: "main",
    start: "top 80%",
  },
  duration: 0.5,
  opacity: 0,
  x: -300,
});

gsap.from("#chapter4", {
  scrollTrigger: {
    trigger: "#chapter4",
    scroller: "main",
    start: "top 80%",
    end: "bottom 20%",
  },
  duration: 0.5,
  opacity: 0,
  x: +300,
});

gsap.from("#chapter5", {
  scrollTrigger: {
    trigger: "#chapter5",
    scroller: "main",
    start: "top 80%",
  },
  duration: 0.5,
  opacity: 0,
  x: -300,
});
