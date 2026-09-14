import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";

/* BASIC TOOLS */

import PasswordGenerator from "./tools/PasswordGenerator";
import WordCounter from "./tools/WordCounter";
import AgeCalculator from "./tools/AgeCalculator";
import JsonFormatter from "./tools/JsonFormatter";
import QrGenerator from "./tools/QrGenerator";
import LoremGenerator from "./tools/LoremGenerator";

/* TEXT TOOLS */

import CaseConverter from "./tools/CaseConverter";
import Base64Tool from "./tools/Base64Tool";
import RandomNumber from "./tools/RandomNumber";
import PercentageCalculator from "./tools/PercentageCalculator";
import UUIDGenerator from "./tools/UUIDGenerator";

import TextRepeater from "./tools/TextRepeater";
import TextSorter from "./tools/TextSorter";
import RandomNameGenerator from "./tools/RandomNameGenerator";
import TextReverse from "./tools/TextReverse";
import RandomColorGenerator from "./tools/RandomColorGenerator";

/* DEV TOOLS */

import UrlEncoder from "./tools/UrlEncoder";
import RegexTester from "./tools/RegexTester";
import ImageToBase64 from "./tools/ImageToBase64";
import MarkdownPreview from "./tools/MarkdownPreview";
import TimestampConverter from "./tools/TimestampConverter";
import SimpleCalculator from "./tools/SimpleCalculator";

/* ADVANCED TOOLS */

import CVGenerator from "./tools/CVGenerator";
import PDFMerge from "./tools/PDFMerge";
import ImageCompressor from "./tools/ImageCompressor";
import BackgroundRemover from "./tools/BackgroundRemover";
import PasswordStrength from "./tools/PasswordStrength";


import TextCompare from "./tools/TextCompare";
import SlugGenerator from "./tools/SlugGenerator";
import ColorPicker from "./tools/ColorPicker";
import UnitConverter from "./tools/UnitConverter";
import AIParaphraser from "./tools/AI Paraphraser";


import AIResume from "./tools/AIResume Generator";
import AIEmail from "./tools/AIEmail";
import AIProduct from "./tools/AIProduct";
import PDFSplit from "./tools/PDFSplit";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* HOME */}
        <Route path="/" element={<Home />} />

        {/* BASIC */}
        <Route path="/password-generator" element={<PasswordGenerator />} />
        <Route path="/word-counter" element={<WordCounter />} />
        <Route path="/age-calculator" element={<AgeCalculator />} />
        <Route path="/json-formatter" element={<JsonFormatter />} />
        <Route path="/qr-generator" element={<QrGenerator />} />
        <Route path="/lorem-generator" element={<LoremGenerator />} />

        {/* TEXT */}
        <Route path="/case-converter" element={<CaseConverter />} />
        <Route path="/base64-tool" element={<Base64Tool />} />
        <Route path="/random-number" element={<RandomNumber />} />
        <Route path="/percentage-calculator" element={<PercentageCalculator />} />
        <Route path="/uuid-generator" element={<UUIDGenerator />} />

        <Route path="/text-repeater" element={<TextRepeater />} />
        <Route path="/text-sorter" element={<TextSorter />} />
        <Route path="/random-name-generator" element={<RandomNameGenerator />} />
        <Route path="/text-reverse" element={<TextReverse />} />
        <Route path="/random-color-generator" element={<RandomColorGenerator />} />

        {/* DEV */}
        <Route path="/url-encoder" element={<UrlEncoder />} />
        <Route path="/regex-tester" element={<RegexTester />} />
        <Route path="/image-to-base64" element={<ImageToBase64 />} />
        <Route path="/markdown-preview" element={<MarkdownPreview />} />
        <Route path="/timestamp-converter" element={<TimestampConverter />} />
        <Route path="/calculator" element={<SimpleCalculator />} />

        {/* ADVANCED */}
        <Route path="/cv-generator" element={<CVGenerator />} />
        <Route path="/pdf-merge" element={<PDFMerge />} />
        <Route path="/image-compressor" element={<ImageCompressor />} />
        <Route path="/background-remover" element={<BackgroundRemover />} />
        <Route path="/password-strength" element={<PasswordStrength />} />


        <Route path="/text-compare" element={<TextCompare />} />
        <Route path="/slug" element={<SlugGenerator />} />
        <Route path="/color" element={<ColorPicker />} />
        <Route path="/unit" element={<UnitConverter />} />


        <Route path="/ai-resume-generator" element={<AIResume />} />
        <Route path="/ai-email" element={<AIEmail />} />
        <Route path="/ai-paraphraser" element={<AIParaphraser />} />
        <Route path="/ai-product" element={<AIProduct />} />
        <Route path="/pdf-split" element={<PDFSplit />} />

     </Routes>

    </BrowserRouter>
  );
}

export default App;