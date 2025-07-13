// 🧠 GPT BOT SETUP
const openaiKey = "YOUR_OPENAI_API_KEY";

async function askGPT() {
  const input = document.getElementById("userInput").value;
  const responseBox = document.getElementById("response");

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${openaiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: input }],
    }),
  });

  const data = await res.json();
  responseBox.innerText = data.choices[0].message.content;
}

// 📈 STOCK DATA SETUP
const twelveKey = "YOUR_TWELVE_DATA_API_KEY";
const symbols = "RELIANCE,BSE,TCS";

async function fetchStocks() {
  const res = await fetch(
    `https://api.twelvedata.com/quote?symbol=${symbols}&apikey=${twelveKey}`
  );
  const data = await res.json();

  const container = document.getElementById("stock-data");
  container.innerHTML = "";

  for (const key in data) {
    const stock = data[key];
    container.innerHTML += `
      <div>
        <strong>${stock.symbol}</strong> – ₹${stock.price}
        <span style="color: ${stock.percent_change > 0 ? "green" : "red"}">
          (${stock.percent_change}%)
        </span>
      </div>
    `;
  }
}

// 🔁 Refresh every 5 sec
setInterval(fetchStocks, 5000);
fetchStocks();
