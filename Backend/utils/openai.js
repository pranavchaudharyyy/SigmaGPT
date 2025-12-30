import "dotenv/config";

const getOpenAIAPIResponse = async (message) => {
  try {
    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "user",
              content: message
            }
          ]
        })
      }
    );

    const data = await response.json();

    // 🚨 SAFETY CHECKS (VERY IMPORTANT)
    if (!response.ok) {
      console.error("OpenAI API error:", data);
      throw new Error(data?.error?.message || "OpenAI API failed");
    }

    if (
      !data ||
      !data.choices ||
      data.choices.length === 0 ||
      !data.choices[0].message ||
      !data.choices[0].message.content
    ) {
      throw new Error("OpenAI returned empty response");
    }

    return data.choices[0].message.content;
  } catch (err) {
    console.error("OpenAI fetch error:", err.message);
    return null; // IMPORTANT
  }
};

export default getOpenAIAPIResponse;
