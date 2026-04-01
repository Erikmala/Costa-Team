const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
    rootMargin: "0px 0px -40px 0px",
  }
);

document.querySelectorAll(".reveal").forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index * 80, 320)}ms`;
  observer.observe(element);
});

function setupSponsorTicker() {
  const ticker = document.querySelector(".sponsor-ticker");
  const track = document.querySelector(".sponsor-track");

  if (!ticker || !track) {
    return;
  }

  const labels = Array.from(track.querySelectorAll(".sponsor-pill"))
    .map((item) => item.textContent.trim())
    .filter(Boolean);

  if (labels.length === 0) {
    return;
  }

  track.innerHTML = "";

  const groupA = document.createElement("div");
  groupA.className = "sponsor-group";

  const groupB = document.createElement("div");
  groupB.className = "sponsor-group";

  track.append(groupA, groupB);

  const buildPill = (label) => {
    const pill = document.createElement("span");
    pill.className = "sponsor-pill";
    pill.textContent = label;
    return pill;
  };

  // Fill the first group until it is wider than the viewport portion of ticker.
  const targetWidth = ticker.clientWidth * 1.2;
  let index = 0;
  while (groupA.scrollWidth < targetWidth || index < labels.length) {
    groupA.appendChild(buildPill(labels[index % labels.length]));
    index += 1;

    if (index > labels.length * 20) {
      break;
    }
  }

  Array.from(groupA.children).forEach((node) => {
    groupB.appendChild(node.cloneNode(true));
  });

  const distance = groupA.scrollWidth;
  const speedPxPerSecond = 80;
  const duration = Math.max(distance / speedPxPerSecond, 10);

  track.style.setProperty("--ticker-distance", `${distance}px`);
  track.style.setProperty("--ticker-duration", `${duration}s`);
}

setupSponsorTicker();
window.addEventListener("resize", setupSponsorTicker);
