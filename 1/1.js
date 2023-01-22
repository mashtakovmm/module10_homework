// Сверстайте кнопку, которая будет содержать в себе icon_01 (как в примере в последнем видео). 
// При клике на кнопку иконка должна меняться на icon_02. Повторный клик меняет иконку обратно.

const icon = document.querySelector(".icon-1")
const iconFilled = document.querySelector(".icon-2")
const btn = document.querySelector(".btn")

let filledFlag = true

btn.addEventListener('click', () => {
    if(filledFlag){
        filledFlag = !filledFlag
        icon.style.display = "none"
        iconFilled.style.display = "block"
    } else {
        filledFlag = !filledFlag
        icon.style.display = "block"
        iconFilled.style.display = "none"
    }
})
