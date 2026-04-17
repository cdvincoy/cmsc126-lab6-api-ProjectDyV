<<<<<<< HEAD
/* insert script here */
=======
// This is the source code for script.js.

const container = document.getElementById("agents-container");
const searchInput = document.getElementById("search");

let allAgents = [];

async function fetchAgents() {
  try {
    const res = await fetch("https://valorant-api.com/v1/agents?isPlayableCharacter=true");
    const data = await res.json();

    allAgents = data.data;
    console.log(allAgents);


    displayAgents(allAgents);
  } catch (err) {
    console.error("Fetch error:", err);
  }
}
/*Displaying Agents*/
function displayAgents(agents) {
    container.innerHTML = "";
    
    agents.forEach(agent => {
        const card = document.createElement("div");
        card.classList.add("agent-card");
        
        card.innerHTML = 
        `<img src="${agent.displayIcon}" alt="${agent.displayName}">
        <div class="agent-name">${agent.displayName}</div>`;

        container.appendChild(card);
        
        card.addEventListener("click", () => {
            const modal = document.getElementById("modal");
            const modalContent = document.getElementById("modal-content");
            
            const abilities = agent.abilities.filter(a => a.displayName).map(a => `
                <div class="ability-section">
                ${a.displayIcon ? `<img src="${a.displayIcon}" width="30">` : ""}
                <div class="ability-name"><strong>${a.displayName}</strong><br></div>
                <div class="ability-desc">
                    <small>${a.description ? a.description.replace(/\.\s/g,".<br><br>") : "No descriptipn"}</small>
                </div>
                </div>`)
            .join("");

        const img = agent.fullPortraitV2 || agent.fullPortrait;
        const iconView = agent.background || "";

        modalContent.innerHTML = 
            `
            <div class="agent-modal">
                <div class="icon-layer" style="background-image: url('${iconView}')"></div>
                <div class="portrait-layer" style="background-image: url('${img}')"></div>
                <div class="card-top">
                    <div class="card-left">
                        <img src="${agent.displayIcon}" alt="${agent.displayName}">
                        <div class="agent-name">${agent.displayName}</div>
                    </div>
            
                    <div class="card-right">
                        <div class="agent-role">
                            ${agent.role ? agent.role.displayName : "No Role"}
                        </div>
                        <div class="agent-role-description">
                            <p>${agent.role ? agent.role.description : "No description available"}</p>
                        </div>
                    </div>
                </div>
        
                <div class="card-bottom">
                    <h2 class="abilities-title">Abilities</h2>
                    <div class="abilities-container">
                        ${abilities}
                    </div>
                </div>
            </div>
            `;
        modal.classList.remove("hidden");
    });
  });
}

/*For Exiting the Modal View*/
window.addEventListener("DOMContentLoaded", () => {
document.getElementById("modal").addEventListener("click", (e) => {
    if (e.target.id === "modal"){
        document.getElementById("modal").classList.add("hidden");
    }
});
});

/* Search */
searchInput.addEventListener("input", () => {
  const value = searchInput.value.toLowerCase();

  const filtered = allAgents.filter(agent =>
    agent.displayName.toLowerCase().includes(value)
  );

  displayAgents(filtered);
});

/*Fetching Agents from API*/
fetchAgents();
>>>>>>> origin/vincoy-branch
