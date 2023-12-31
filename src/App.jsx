import "./App.css";
import { Configuration, OpenAIApi } from "openai";
import OptionSelection from "./Components/OptionSelection";
import Translation from "./Components/Translation";
import { arrayItems } from "./AIOptions/Index";
import { useState } from "react";

function App() {
  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_Open_AI_Key,
  });
  // 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
  const openai = new OpenAIApi(configuration);
  const [option, setOption] = useState({});
  const [result, setResult] = useState("");
  const [input, setInput] = useState("");
  // console.log(import.meta.env.VITE_Open_AI_Key);
  const selectOption = (option) => {
    setOption(option);
  };

  const doStuff = async () => {
    let object = { ...option, prompt: input };

    const response = await openai.createCompletion(object);

    setResult(response.data.choices[0].text);
  };

  const handlesbmit = (option) => {
    setOption("")
 }
  return (
    <div className="App">
      {Object.values(option).length === 0 ? (
        <OptionSelection arrayItems={arrayItems} selectOption={selectOption} />
      ) : (
        <Translation doStuff={doStuff} setInput={setInput} result={result} handlesbmit={handlesbmit} />
      )}
    </div>
  );
}

export default App;