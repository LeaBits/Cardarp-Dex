const app = document.querySelector<HTMLDivElement>("#app");

if (!app) {
  throw new Error("App element not found");
}

app.innerHTML = `
  <h1>Cardarp Dex</h1>
  <p>Track your TCG collection.</p>
  <ul></ul>
`;