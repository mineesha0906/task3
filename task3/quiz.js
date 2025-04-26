function fetchFunFact() {
    fetch("https://uselessfacts.jsph.pl/random.json?language=en")
      .then(res => res.json())
      .then(data => {
        document.getElementById("fun-fact").textContent = data.text;
      })
      .catch(() => {
        document.getElementById("fun-fact").textContent = "Couldn't load a fun fact. Try again later.";
      });
  }
  
  window.onload = fetchFunFact;
  
  