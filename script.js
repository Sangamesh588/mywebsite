async function sendData(event) {
  event.preventDefault();

  const data = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value
  };

  try {
    const res = await fetch("/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const text = await res.text();
    document.getElementById("response").innerText = text;
    document.getElementById("userForm").reset();
  } catch (error) {
    document.getElementById("response").innerText = "❌ Error submitting data!";
  }
}
