// Сверстайте кнопку, клик на которую будет выводить данные о размерах экрана с помощью alert. 

const btn = document.querySelector(".btn")

btn.addEventListener('click', function(){
    alert(`width: ${window.screen.width} height: ${window.screen.height}`)
})
