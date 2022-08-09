const output = document.querySelector(".output")
const simpleGenerate = document.querySelector(".simple-generate")
const mode = document.querySelector("#mode")
const comingSoon = document.querySelector(".coming-soon")

//Reset Css
let resetCss = `*,
*::before,
*::after {
    padding: 0;
    margin: 0;
    font-weight: bolder;
    font-family: Arial, Helvetica, sans-serif;
    letter-spacing: .1em;
    box-sizing: border-box;
}

html {
    font-size: 62.5%;
    scroll-behavior: smooth;
}`

let firstTime = true

const randomColor = (populate) => {
  const color = Math.floor(Math.random() * 16777215).toString(16)
  if (populate)
    return `url('https://source.unsplash.com/random/800x800?sig=${color}') transparent no-repeat center / cover`
  return "#" + color
}

simpleGenerate.addEventListener("click", () => {
  if (output.hasChildNodes()) {
    while (output.firstChild) {
      output.removeChild(output.firstChild)
    }
  }

  document.querySelector(".simple-generate").innerText = "Randomize"
  const items = Number(document.querySelector("#items").value)
  let columnGap = document.querySelector("#column-gap").value
  let rowGap = document.querySelector("#row-gap").value
  let borderRadius = document.querySelector("#items-border-radius").value
  const populate = document.querySelector("#populate").checked
  const codepenBtn = document.querySelector(".codepenbtn")
  const codepenValue = document.querySelector("[name='data']")
  let autoPropery = document.querySelector("#auto-property").checked
  autoPropery = autoPropery ? "auto-fill" : "auto-fit"
  let colSpan = ""
  let rowSpan = ""
  let colOrRow = ""
  let spanItem = []

  if (!firstTime) {
    columnGap = (Math.random() * (10.2 - 0.3) + 0.3).toFixed(1) * 1
    rowGap = (Math.random() * (10.2 - 0.3) + 0.3).toFixed(1) * 1
    borderRadius = (Math.random() * (5.1 - 0.3) + 0.3).toFixed(1) * 1 //(max-min)+min max excluded min included
    colSpan = Math.floor(Math.random() * (4 - 2) + 2)
    rowSpan = items <= 6 ? 2 : Math.floor(Math.random() * (Math.ceil(items / 3 + 1) - 2) + 2) //(max-min+1)+min both included
    colOrRow = Math.floor(Math.random() * 3) + 1

    if (items <= 4) {
      spanItem.push(Math.floor(Math.random() * items) + 1)
    } else {
      let itemsToSpan = Math.ceil(items / 4)
      ;[...new Array(itemsToSpan)].forEach(() => {
        spanItem.push(Math.floor(Math.random() * items) + 1)
      })
    }
  }

  //Combining all the css for codepen

  let sectionStyle = `
  display: grid; 
  grid-template-columns: repeat(${autoPropery}, minmax(35rem, 1fr)); 
  column-gap: ${columnGap}rem; 
  row-gap: ${rowGap}rem; width: 100vw; 
  max-width: 100%;
  height: 50vw;
  padding: 1rem;`
  let itemsStyle = `text-align: center; 
  height: 100%;
  width: 100%;
  border-radius: ${borderRadius}rem`
  let itemStyle = ""
  let span1 = `
  grid-column: span ${colSpan};
  grid-row: span ${rowSpan};
  `
  let span2 = `
  grid-column: span ${colSpan};
  `
  let span3 = `
  grid-row: span ${rowSpan};
  `
  let span = colOrRow === 1 ? span1 : colOrRow === 2 ? span2 : span3

  let codepenHtml = `<div class="section">\n`
  const section = document.createElement("div")
  section.setAttribute("class", "section")
  section.style.cssText = sectionStyle

  for (let i = 1; i <= items; i++) {
    const div = document.createElement("div")
    div.setAttribute("class", `item${i}`)
    div.innerText = `Item ${i}`
    let bgColor = randomColor(populate)

    if (!firstTime && spanItem.includes(i)) {
      itemStyle += `.item${i} {
      background: ${bgColor};
      ${span}
    }\n `
      div.style.cssText = `background: ${bgColor}; ${itemsStyle}; ${span}`
    } else {
      itemStyle += `.item${i} {
      background: ${bgColor};
    }\n `
      div.style.cssText = `background: ${bgColor}; ${itemsStyle} `
    }
    section.appendChild(div)
    codepenHtml += `<div class="item${i}">item${i}</div> \n`
  }

  output.appendChild(section)
  codepenHtml += "</div>"
  let codepenCss =
    resetCss +
    `
    .section {` +
    sectionStyle +
    ` }\n
    ` +
    `.section > div { 
        ${itemsStyle} 
    } ` +
    `\n` +
    itemStyle

  codepenValue.value = JSON.stringify({
    title: "Random CSS Grid Generator - itsfz1",
    description: "A random CSS Grid Generator using JavaScript",
    html: codepenHtml,
    css: codepenCss,
  })
  codepenBtn.classList.toggle("hidden", false)
  window.scrollTo(0, 300)
  firstTime = false
})

mode.addEventListener("change", () => {
  if (mode.value === "simple") {
    comingSoon.classList.toggle("hidden", true)
  } else {
    comingSoon.classList.toggle("hidden", false)
  }
})
