const inputDiv = document.querySelector(".text-input");
const prettyButton = document.querySelector(".pretty-button");
const brandDiv = document.querySelector(".brand-info");
const warnningText = document.querySelector(".warnningText");
const notFoundText = document.querySelector(".notFoundText");
let domainValue;

const hostNameFinder = (data) => {
  const newUrl = new URL(data);
  const foundedHost = newUrl.hostname;
  console.log(foundedHost);
  return foundedHost;
};

inputDiv.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    // Enter key was pressed
    domainValue = hostNameFinder(e.target.value);
    if (domainValue) {
      console.log(domainValue);
      warnningText.style.display = "none";
      notFoundText.style.display = "none";
      fetchData(domainValue);
    } else {
      warnningText.style.display = "block";
    }
  } else {
    domainValue = hostNameFinder(e.target.value);
  }
});

prettyButton.addEventListener("click", (e) => {
  domainValue = hostNameFinder(e.target.value);
  if (domainValue) {
    warnningText.style.display = "none";
    notFoundText.style.display = "none";
    fetchData(domainValue);
  } else {
    warnningText.style.display = "block";
  }
});

const makeUi = (data) => {
  const { name, domain, description, links, colors, fonts, logos } = data;
  brandDiv.innerHTML = "";
  inputDiv.value = "";
  domainValue = "";

  //website name
  const nameDiv = document.createElement("div");
  nameDiv.innerHTML = `<h3>${name}</h3>`;

  //font
  const fontdetailsElement = document.createElement("details");
  const fontsummaryElement = document.createElement("summary");
  fontsummaryElement.textContent = `FONT (${fonts.length})`;
  fontdetailsElement.appendChild(fontsummaryElement);
  const fontDiv = document.createElement("div");
  const fontContainer = document.createElement("div");
  fontContainer.classList.add("colorGroup");
  fonts.forEach((item) => {
    const fontTag = document.createElement("div");
    fontTag.classList.add("font-div");
    fontTag.style.fontFamily = item.name;
    fontTag.innerHTML = `<h3>${item.name}</h3><span>${item.type}</span>`;
    fontContainer.append(fontTag);
    fontDiv.append(fontContainer);
    fontdetailsElement.appendChild(fontDiv);
  });

  //color
  const colordetailsElement = document.createElement("details");
  const colorsummaryElement = document.createElement("summary");
  colorsummaryElement.textContent = `COLOR (${colors.length})`;
  colordetailsElement.appendChild(colorsummaryElement);
  const colorDiv = document.createElement("div");
  const colorContainer = document.createElement("div");
  colorContainer.classList.add("colorGroup");

  for (let j = 0; j < colors.length; j++) {
    const color = colors[j];

    const colorTag = document.createElement("div");

    colorTag.classList.add("color-div");
    colorTag.style.backgroundColor = color.hex;
    colorTag.innerText = color.hex;
    colorContainer.append(colorTag);
    colorDiv.append(colorContainer);
    colordetailsElement.appendChild(colorDiv);
  }

  //logo
  const logodetailsElement = document.createElement("details");
  const logosummaryElement = document.createElement("summary");
  logosummaryElement.textContent = `LOGO (${logos.length})`;
  logodetailsElement.appendChild(logosummaryElement);
  const logoDiv = document.createElement("div");
  const logoContainer = document.createElement("div");
  logoContainer.classList.add("colorGroup");

  logos.forEach((item) => {
    item.formats.forEach((format) => {
      const imageTag = document.createElement("div");
      imageTag.classList.add("image-container");

      const image = document.createElement("img");
      image.src = format.src;
      image.alt = "Image";
      imageTag.appendChild(image);

      logoContainer.append(imageTag);
      logoDiv.appendChild(logoContainer);
      logodetailsElement.appendChild(logoDiv);
    });
  });

  //divider
  const createDivider = () => {
    const divider = document.createElement("div");
    divider.classList.add("divider");
    return divider;
  };

  brandDiv.append(
    nameDiv,
    createDivider(),
    colordetailsElement,
    createDivider(),
    fontdetailsElement,
    createDivider(),
    logodetailsElement,
    createDivider()
  );
};

const fetchData = async (domain) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer 009EbNd4O5qjzFxK9cUXiwbDx5yiWmtTFEXCBvkGtrE=",
    },
  };
  prettyButton.setAttribute("value", "Fetching....");
  const response = await fetch(
    `https://api.brandfetch.io/v2/brands/${domain}`,
    options
  );
  const data = await response.json();
  console.log(data);
  if (data.message) {
    notFoundText.style.display = "block";
    notFoundText.innerText = data.message;
    prettyButton.setAttribute("value", "Try Again!");
    return;
  }
  makeUi(data);
  prettyButton.setAttribute("value", "GET");
};
