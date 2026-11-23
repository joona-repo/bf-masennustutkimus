"use strict";

const form = document.querySelector("#itsearvio");
const questions = Array.from(form.querySelectorAll("fieldset"));
const summary = document.querySelector("#yhteenveto");
const heading = document.querySelector("#yhteenveto-otsikko");
const count = document.querySelector("#vastatut");
const review = document.querySelector("#keskusteltavat");
const reviewList = document.querySelector("#keskusteltavat-kohdat");
const showSummary = document.querySelector("#nayta-yhteenveto");

form.addEventListener("submit", (event) => event.preventDefault());
form.querySelector(".survey-actions").hidden = false;

function updateSummary() {
  let answered = 0;
  const topics = [];

  for (const question of questions) {
    const choice = question.querySelector("input:checked");
    if (!choice) continue;

    answered += 1;
    if (choice.value !== "yes") {
      const item = document.createElement("li");
      const link = document.createElement("a");
      link.href = "#" + question.id;
      link.textContent = question.dataset.topic;
      item.append(link);
      topics.push(item);
    }
  }

  count.textContent = "Vastattuja kohtia " + answered + " / " + questions.length + ".";
  reviewList.replaceChildren(...topics);
  review.hidden = topics.length === 0;
}

showSummary.addEventListener("click", () => {
  updateSummary();
  summary.hidden = false;
  heading.focus();
});

form.addEventListener("change", () => {
  if (!summary.hidden) updateSummary();
});

form.addEventListener("reset", () => {
  summary.hidden = true;
  reviewList.replaceChildren();
  count.textContent = "";
});

window.addEventListener("pageshow", () => form.reset());

