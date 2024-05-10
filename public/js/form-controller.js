document.addEventListener("DOMContentLoaded", function () {
  const jokeForm = document.getElementById("jokeForm");

  if (jokeForm) {
    jokeForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const formData = new FormData(jokeForm);
      const id = formData.get("id");
      const type = formData.get("type-of-joke");
      const text = formData.get("content");

      try {
        let url = "/jokes";
        let method = "POST";

        if (id) {
          url = `/jokes/${id}`;
          method = "PATCH";
        }

        const response = await fetch(url, {
          method: method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ type, text }),
        });

        if (!response.ok) {
          throw new Error("Error updating/creating joke");
        }

        const responseData = await response.json();

        // If it's a Patch from the edit form update the joke card in the main page
        if (method === "PATCH") {
          // Update existing joke
          const jokeCard = document.querySelector(`.card[data-id="${id}"]`);
          if (jokeCard) {
            jokeCard.querySelector("p").textContent = responseData.jokeText;
            jokeCard.querySelector(".edit-btn").dataset.type =
              responseData.jokeType;
          }
        }

        // Redirect back to home page
        window.location.href = "/";
      } catch (error) {
        console.error(error);
      }
    });
  }
});
