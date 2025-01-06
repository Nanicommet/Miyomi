---
title: Home
layout: home

hero:
  name: "Miyomi"
  text: ""
  tagline: "Your one-stop hub for links, apps, extension repos and more! 🌟"
  announcement:
    title: Tachiyomi & Mihon community
  image:
    src: /asset/miyomi.png
    alt: Miyomi
  actions:
    - theme: brand
      text: Browse
      link: /qs.md
    - theme: alt
      text: GitHub
      link: https://github.com/tas33n/Miyomi
    - theme: alt
      text: Discord
      link: https://discord.gg/

aside: left

customDescription: A wiki that covers everything weeb-related!

features:
  #   - title: Websites                                     # we will cook something here later
  #     details: Websites for anime, manga, music, novels & games
  #     icon:
  #       <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><g
  #       fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
  #       stroke-width="2"><path d="M21.54 15H17a2 2 0 0 0-2 2v4.54M7 3.34V5a3 3 0 0 0 3 3v0a2 2 0 0 1 2
  #       2v0c0 1.1.9 2 2 2v0a2 2 0 0 0 2-2v0c0-1.1.9-2 2-2h3.17M11 21.95V18a2 2 0 0 0-2-2v0a2 2 0 0
  #       1-2-2v-1a2 2 0 0 0-2-2H2.05"/><circle cx="12" cy="12" r="10"/></g></svg>
  #     link: /websites.md
  - title: Software
    details: Software for every Operating System
    icon:
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><g
      fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
      stroke-width="2"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0
      0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7l8.7 5l8.7-5M12
      22V12"/></g></svg>
    link: /software.md
  - title: Extensions
    details: Mihon, Aniyomi & Dantotsu Extension Repos & Guides
    icon: <svg height="32" width="32" viewBox="0 -960 960 960" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M352-120H200q-33 0-56.5-23.5T120-200v-152q48 0 84-30.5t36-77.5q0-47-36-77.5T120-568v-152q0-33 23.5-56.5T200-800h160q0-42 29-71t71-29q42 0 71 29t29 71h160q33 0 56.5 23.5T800-720v160q42 0 71 29t29 71q0 42-29 71t-71 29v160q0 33-23.5 56.5T720-120H568q0-50-31.5-85T460-240q-45 0-76.5 35T352-120Zm-152-80h85q24-66 77-93t98-27q45 0 98 27t77 93h85v-240h80q8 0 14-6t6-14q0-8-6-14t-14-6h-80v-240H480v-80q0-8-6-14t-14-6q-8 0-14 6t-6 14v80H200v88q54 20 87 67t33 105q0 57-33 104t-87 68v88Zm310-310Z"></path></svg>
    link: /ext-repos.md
---

<script setup>
import ChristmasCard from "./.vitepress/theme/components/ChristmasCard.vue";
if (!import.meta.env.SSR) {
  const images = {
    normal: {
      // Hololive Myth (1st Gen EN)
      "/plushies/webp/ame.png": "linear-gradient(-30deg, #FEE097, #f7f6c8)",    
      "/plushies/webp/calli.png": "linear-gradient(-30deg, #E35277, #f07392)",  
      "/plushies/webp/gura.png": "linear-gradient(-30deg, #3E92CF, #57b0f0)",   
      "/plushies/webp/ina.png": "linear-gradient(-30deg, #532bc2, #a594f9)",    
      "/plushies/webp/kiara.png": "linear-gradient(-30deg, #EB433F, #FEEB73)",  

      // Hololive Promise (2nd Gen EN)
      "/plushies/webp/bae.png": "linear-gradient(-30deg, #EE241A, #FEE160)",    
      "/plushies/webp/fauna.png": "linear-gradient(-30deg, #B2F182, #F8FFDF)", 
      "/plushies/webp/irys.png": "linear-gradient(-30deg, #E10E5D, #FE6DA5)",   
      "/plushies/webp/kronii.png": "linear-gradient(-30deg, #2b6cee, #5B9DFE)", 
      "/plushies/webp/mumei.png": "linear-gradient(-30deg, #E7AE80, #FEF5B0)",  
      "/plushies/webp/sana.png": "linear-gradient(-30deg, #F5E0CF, #f8eee5)",    

      // Hololive Advent (3rd Gen EN)
      "/plushies/webp/biboo.png": "linear-gradient(-30deg, #9B8DEE, #FF65DB)",  
      "/plushies/webp/fuwawa.png": "linear-gradient(-30deg, #9FCEFE, #C7DEFE)", 
      "/plushies/webp/mococo.png": "linear-gradient(-30deg, #FE78A3, #FEAACC)", 
      "/plushies/webp/nerissa.png": "linear-gradient(-30deg, #103BD9, #1CD5FC)", 
      "/plushies/webp/shiori.png": "linear-gradient(-30deg, #deb1f0, #eaddff)", 

      // Hololive Justice (4th Gen EN)
      "/plushies/webp/cecilia.png": "linear-gradient(-30deg, #61A979, #CFFDCC)", 
      "/plushies/webp/elizabeth.png": "linear-gradient(-30deg, #BA3036, #2196DB)", 
      "/plushies/webp/gigi.png": "linear-gradient(-30deg, #F39C35, #FEB743)",  
      "/plushies/webp/raora.png": "linear-gradient(-30deg, #D26588, #F698BC)",  
    },
  };

  const mode = "normal";

  function randomPlushie() {
    const entries = Object.entries(images[mode]);
    const randomEntry = entries[Math.floor(Math.random() * entries.length)];
    const [bg, color] = randomEntry;
    return [bg, color];
  }

  const handleClick = () => {
    const [bg, color] = randomPlushie();
    document.documentElement.style.setProperty("--vp-home-hero-image-background-image", color);
    document.querySelector(".VPImage.image-src").src = bg;
  }

  const icon = document.querySelector(".VPImage.image-src");

  if (icon) {
    icon.addEventListener("click", handleClick);
  }
}
</script>
