document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("dropdown");

  form.addEventListener("submit", async function (event) {
    // Prevent the form to be send by default
    event.preventDefault();

    // Get the type of joke selected
    const type = document.getElementById("type-of-joke").value;

    try {
      // POST to filter the jokes
      const response = await fetch("/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ type: type }),
      });

      if (!response.ok) {
        throw new Error("Error filtering jokes");
      }

      const data = await response.json();
      const filteredJokesContainer = document.getElementById(
        "filtered-jokes-container"
      );

      // Clean the container
      filteredJokesContainer.innerHTML = "";

      // Populate the container
      if (data && data.length > 0) {
        data.forEach((joke) => {
          const jokeCard = document.createElement("div");
          jokeCard.classList.add("card");
          jokeCard.innerHTML = `
                      <p>${joke.jokeText}</p>
                      <div class="buttons">
                          <button class="edit-btn" data-id="${joke.id}" href="/edit/${joke.id}">Edit</button>
                          <button class="delete-btn" data-id="${joke.id}" href="/delete/${joke.id}">Delete</button>
                      </div>
                  `;
          filteredJokesContainer.appendChild(jokeCard);
        });

        // Add event listeners for delete buttons
        const deleteButtons = document.querySelectorAll(".delete-btn");
        deleteButtons.forEach((button) => {
          button.addEventListener("click", async (event) => {
            event.preventDefault();
            const jokeId = button.dataset.id;
            try {
              const response = await fetch(`/delete/${jokeId}`);
              if (!response.ok) {
                throw new Error("Error deleting joke");
              }
              // Remove the deleted joke card from the DOM
              const deletedJokeCard = button.closest(".card");
              deletedJokeCard.remove();
            } catch (error) {
              console.error(error);
            }
          });
        });

        // Add event listeners for edit buttons
        const editButtons = document.querySelectorAll(".edit-btn");
        editButtons.forEach((button) => {
          button.addEventListener("click", async (event) => {
            event.preventDefault();
            const jokeId = button.dataset.id;
            window.location.href = `/edit/${jokeId}`;
          });
        });
      } else {
        filteredJokesContainer.innerHTML = "<p>No jokes found</p>";
      }
    } catch (error) {
      console.error(error);
    }
  });

  // Add event listener for creating a new joke
  const newJokeButton = document.getElementById("new-joke");
  if (newJokeButton) {
    newJokeButton.addEventListener("click", async (event) => {
      event.preventDefault();
      window.location.href = "/new";
    });
  }
});
