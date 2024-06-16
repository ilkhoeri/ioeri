type StyleObject = { [key: string]: string }

function variables(): StyleObject {
  const vars: StyleObject = {};
  vars["--text-gradient-from"] = getRandomColor();
  vars["--text-gradient-to"] = getRandomColor();
  return vars;
}

const gradientColors = useRandomColors(["#000", "#000", "#000"], 5000);

function variables(): StyleObject {
  const vars: StyleObject = {};
  vars["--text-gradient-from"] = gradientColors[0];
  vars["--text-gradient-via"] = gradientColors[1];
  vars["--text-gradient-to"] = gradientColors[2];
  return vars;
}