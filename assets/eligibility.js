"use strict";

const form = document.querySelector("#itsearvio");
const questions = Array.from(form.querySelectorAll("fieldset"));
const summary = document.querySelector("#yhteenveto");
const heading = document.querySelector("#yhteenveto-otsikko");
const summaryStatus = document.querySelector("#vastatut");
const review = document.querySelector("#keskusteltavat");
const reviewList = document.querySelector("#keskusteltavat-kohdat");
const treatmentNote = document.querySelector("#rtms-tutkimuksen-ulkopuolella");
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
    if (choice.value === "unsure" || choice.value === question.dataset.reviewAnswer) {
      const item = document.createElement("li");
      const link = document.createElement("a");
      link.href = "#" + question.id;
      link.textContent = question.dataset.topic;
      item.append(link);
      topics.push(item);
    }
  }

  if (answered === 0) {
    summaryStatus.textContent = "Et ole vielä vastannut kysymyksiin.";
  } else if (answered < questions.length) {
    summaryStatus.textContent = "Osa kysymyksistä jäi vastaamatta. Voit vielä täydentää vastauksiasi.";
  } else if (topics.length === 0) {
    summaryStatus.textContent = "Vastaustesi perusteella sovellut alustavasti tutkimukseen.";
  } else {
    summaryStatus.textContent = "";
  }
  reviewList.replaceChildren(...topics);
  review.hidden = topics.length === 0;
  treatmentNote.hidden = review.hidden;
}

showSummary.addEventListener("click", () => {
  summary.hidden = false;
  updateSummary();
  heading.focus();
});

form.addEventListener("change", () => {
  if (!summary.hidden) updateSummary();
});

form.addEventListener("reset", () => {
  summary.hidden = true;
  reviewList.replaceChildren();
  summaryStatus.textContent = "";
});

window.addEventListener("pageshow", () => form.reset());

