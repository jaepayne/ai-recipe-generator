export function request(ctx) {
    const { ingredients = [] } = ctx.args;
  
    // Construct the prompt with the provided ingredients
    const prompt = `Suggest a recipe idea using these ingredients: ${ingredients.join(", ")}.`;
  
    // Return the request configuration
    return {
      resourcePath: `/model/anthropic.claude-3-sonnet-20240229-v1:0/invoke`,
      // resourcePath: `/model/anthropic.claude-3-7-sonnet-20250219-v1:0/invoke`,
      method: "POST",
      params: {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // anthropic_version: "bedrock-2025-02-19",
          anthropic_version: "bedrock-2024-02-29",
          max_tokens: 1000,
          messages: [
            {
              role: "user",
              content: [
                {
                  type: "text",
                  text: `\n\nHuman: ${prompt}\n\nAssistant:`,
                },
              ],
            },
          ],
        }),
      },
    };
  }
  
  export function response(ctx) {
    // Parse the response body safely
    const parsedBody = JSON.parse(ctx.result.body || "{}");
    const contentArray = parsedBody?.content;
    const firstText = Array.isArray(contentArray)
      ? contentArray[0]?.text
      : undefined;
  
    return {
      body: firstText || parsedBody?.output_text || JSON.stringify(parsedBody),
      error: parsedBody?.error || undefined,
    };
  }