const container = document.getElementById("agents-container");
const searchInput = document.getElementById("search");

let allAgents = [];

async function fetchAgents() {
  try {
    const res = await fetch("https://valorant-api.com/v1/agents?isPlayableCharacter=true");
    const data = await res.json();

    allAgents = data.data;
    displayAgents(allAgents);
  } catch (err) {
    console.error("Fetch error:", err);
  }
}

function displayAgents(agents) {
  container.innerHTML = "";

  agents.forEach(agent => {
    const card = document.createElement("div");
    card.classList.add("agent-card");

    const abilities = agent.abilities
      .filter(a => a.displayName)
      .map(a => `<li>${a.displayName}</li>`)
      .join("");

    card.innerHTML = `
      <img src="${agent.displayIcon}" alt="${agent.displayName}">
      <div class="agent-name">${agent.displayName}</div>

      <div class="agent-details">
        <div class="agent-role">
          ${agent.role ? agent.role.displayName : "No Role"}
        </div>
        <strong>Abilities:</strong>
        <ul>${abilities}</ul>
      </div>
    `;

    // Toggle details on click
    card.addEventListener("click", () => {
      const details = card.querySelector(".agent-details");
      details.classList.toggle("active");
    });

    container.appendChild(card);
  });
}

/* Search */
searchInput.addEventListener("input", () => {
  const value = searchInput.value.toLowerCase();

  const filtered = allAgents.filter(agent =>
    agent.displayName.toLowerCase().includes(value)
  );

  displayAgents(filtered);
});

fetchAgents();