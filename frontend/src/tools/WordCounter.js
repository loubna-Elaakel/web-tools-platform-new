import { useState } from "react";
import BackHome from "../components/BackHome";
import SEO from "../components/SEO";

function WordCounter() {

  const [text, setText] = useState("");

  const words =
    text.trim() === ""
      ? 0
      : text.trim().split(/\s+/).length;

  const characters = text.length;

  return (
    <>
      <SEO
        title="Word Counter | Count Words & Characters Online"
        description="Count words and characters online for free. Use our simple Word Counter to instantly analyze your text."
        keywords="word counter, character counter, word count, count words online, character count"
        url="https://web-tools-platform.vercel.app/word-counter"
      />

      <div>
        <BackHome />

        <h1>Word Counter</h1>

        <p>
          Count words and characters instantly with our free online
          Word Counter. Simply enter or paste your text below.
        </p>

        <textarea
          rows="6"
          placeholder="Write or paste your text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <p>
          <strong>Words:</strong> {words}
        </p>

        <p>
          <strong>Characters:</strong> {characters}
        </p><br></br>
        <br></br>
        <br></br>


        <h1>Frequently Asked Questions</h1>     

        <h2>What is a Word Counter?</h2>

        <p>
          A Word Counter is an online tool that counts the number of
          words and characters in a piece of text.
        </p>

      </div>
    </>
  );
}

export default WordCounter;