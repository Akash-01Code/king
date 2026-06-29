<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Fullscreen Menu Overlay — GSAP Premium</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
:root{--bg:#0c0c10;--ink:#f2efe9;--muted:#8a8a96;--accent:#ff5c38;--accent2:#5b8cff}
html,body{height:100%}
body{background:var(--bg);color:var(--ink);font-family:'Inter',system-ui,sans-serif;
display:flex;align-items:center;justify-content:center;min-height:100vh;overflow-x:hidden}
.stage{width:100%;min-height:100vh;display:flex;align-items:center;justify-content:center;
flex-direction:column;position:relative}
h1,h2,h3,.big{font-family:'Space Grotesk','Space Grotesk',sans-serif}
a{color:inherit}

/* ---- Fullscreen Menu Overlay ---- */
.stage{justify-content:flex-start;align-items:flex-start;padding:2rem 2.5rem}
.menu-btn{background:transparent;border:1px solid #2e2e38;color:var(--ink);border-radius:30px;padding:.6rem 1.3rem;cursor:pointer;font-size:.9rem;z-index:60;position:relative}
.overlay{position:fixed;inset:0;background:var(--accent);z-index:55;clip-path:circle(0% at calc(100% - 3.5rem) 2.6rem);display:flex;align-items:center;padding:0 10vw}
.overlay nav{display:flex;flex-direction:column;gap:1rem}
.overlay a{font-family:'Space Grotesk',sans-serif;font-size:clamp(2.2rem,8vw,5rem);font-weight:700;color:#0c0c10;text-decoration:none;line-height:1;overflow:hidden;display:block}
.overlay a span{display:inline-block}
</style>
</head>
<body>
<div class="stage">
  <button class="menu-btn" id="menuBtn">Menu</button>
  <div class="overlay" id="overlay">
    <nav>
      <a href="#overview"><span>Overview</span></a>
      <a href="#residences"><span>Residences</span></a>
      <a href="#amenities"><span>Amenities</span></a>
      <a href="#floorplans"><span>Floor Plans</span></a>
      <a href="#location"><span>Location</span></a>
      <a href="#gallery"><span>Gallery</span></a>
      <a href="#contact"><span>Inquire</span></a>
    </nav>
  </div>
</div>

  <script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js"></script>
  
  <script>
const btn = document.getElementById("menuBtn");
const overlay = document.getElementById("overlay");
const links = overlay.querySelectorAll("a span");
let open = false;
const tl = gsap.timeline({ paused: true });
tl.to(overlay, { clipPath: "circle(150% at calc(100% - 3.5rem) 2.6rem)", duration: 0.7, ease: "power3.inOut" })
  .from(links, { yPercent: 120, stagger: 0.08, duration: 0.6, ease: "power4.out" }, "-=0.3");
btn.addEventListener("click", () => {
  open = !open;
  btn.textContent = open ? "Close" : "Menu";
  open ? tl.play() : tl.reverse();
});
</script>
</body>
</html>
