import { useState } from "react";
import BackHome from "../components/BackHome";
import SEO from "../components/SEO";

function AgeCalculator() {

  const [birthDate, setBirthDate] = useState("");
  const [age, setAge] = useState(null);

  function calculateAge() {

    if (!birthDate) return;

    const today = new Date();
    const birth = new Date(birthDate);

    let years = today.getFullYear() - birth.getFullYear();

    const month = today.getMonth() - birth.getMonth();

    if (month < 0 || (month === 0 && today.getDate() < birth.getDate())) {
      years--;
    }

    setAge(years);
  }

  return (
    <>
      <SEO
        title="Age Calculator | Calculate Your Age Online"
        description="Calculate your age online for free using your date of birth. Get your current age quickly and easily."
        keywords="age calculator, calculate age, age calculator online, date of birth calculator"
        url="https://web-tools-platform.vercel.app/age-calculator"
      />

      <div style={{ padding: "30px" }}>
        <BackHome />

        <h1>Age Calculator</h1>

        <p>
          Calculate your age from your date of birth quickly and easily
          with our free online Age Calculator.
        </p>

        <input
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
        />

        <br /><br />

        <button onClick={calculateAge}>
          Calculate Age
        </button>

        {age !== null && (
          <h3>Your age is: {age} years</h3>
        )}<br></br>
        


        <h2>Frequently Asked Questions</h2>

        <h3>How does the Age Calculator work?</h3>

        <p>
          Enter your date of birth and click Calculate Age. The tool
          compares your birth date with the current date to calculate
          your age in years.
        </p>

      </div>
    </>
  );
}

export default AgeCalculator;