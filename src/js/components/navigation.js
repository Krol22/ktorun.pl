/*

  Not used anymore but I'll keep it for future settings page

*/
export class NavigationComponent extends HTMLElement {
  constructor() {
    super();
    this.template = `
            <div id="open-btn" class="nav__open-btn">&equiv;</div>
            <nav id="menu" class="nav">
                <h2>Settings</h2>
                <div id="close-btn" class="nav__exit">&times;</div>
                <div class="nav__group">
                    <input class="nav__checkbox-input" type="checkbox" id="sound-checkbox"/> 
                    <label class="nav__label" for="sound-checkbox">
                        Sound
                        <div class="nav__checkbox"></div>
                    </label>
                </div>    
                <div id="select-color-container" class="nav__group">
                    <label class="nav__label u-margin-bottom" for="color_select">Color</label>
                    <select id="color-select" class="nav__select">
                        <option value="white" class="btn">White</option>
                        <option value="green" class="btn">Green</option>
                        <option value="tan" class="btn">Tan</option>
                        <option value="blue" class="btn">Blue</option>
                    </select>
                </div>

            </nav>
        `;
  }

  connectedCallback() {
    this.innerHTML = this.template;

    this.select = this.querySelector("#color-select");
    this.menu = this.querySelector("#menu");
    this.soundCheckbox = this.querySelector("#sound-checkbox");
    this.openMenuButton = this.querySelector("#open-btn");
    this.closeMenuButton = this.querySelector("#close-btn");

    this.soundCheckbox.checked =
      localStorage.getItem("soundEnabled") === "true";

    this.openMenuButton.addEventListener("click", () => {
      this.menu.classList.add("nav--open");
    });

    this.closeMenuButton.addEventListener("click", () => {
      this.menu.classList.remove("nav--open");
    });

    this.soundCheckbox.addEventListener("change", (e) => {
      SoundService.toggleSound(e.target.checked);
    });

    this.setupColorFilters();
  }

  // setups color filters for browsers (disabled for mozilla because of poor performance)
  setupColorFilters() {
    const isMoz = !!(navigator.userAgent.includes("Firefox") > 0);

    if (!isMoz) {
      this.currentColor = localStorage.getItem("pipboy-color");
      this.currentColor = this.currentColor || "white";
      this.crtFilter = document.querySelector(".crt-color-filter");
      this.crtFilter.classList.add(`crt-color-filter--${this.currentColor}`);

      this.select.addEventListener("change", (e) => {
        this.crtFilter.classList.remove(
          `crt-color-filter--${this.currentColor}`
        );
        this.currentColor = e.target.value;
        localStorage.setItem("pipboy-color", this.currentColor);
        this.crtFilter.classList.add(`crt-color-filter--${this.currentColor}`);
      });

      this.select.value = localStorage.getItem("pipboy-color");
    } else {
      this.selectColorContainer = this.querySelector("#select-color-container");
      this.selectColorContainer.style.display = "none";
    }
  }
}
