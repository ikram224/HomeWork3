const tabs = document.querySelectorAll('.tabheader__item')
const tabsParent = document.querySelector('.tabheader__items')
const tabContent = document.querySelectorAll('.tabcontent')

const hideTabContent = () =>
{
    tabContent.forEach((item) => {
        item.style.display = 'none';
    })
    tabs.forEach((item) => {
        item.classList.remove('tabheader__item_active');
    })
}
hideTabContent()
const showTabContent = (i = 0) => {
    tabContent[i].style.display = 'block'
    tabs[i].classList.add('tabheader__item_active')
}
showTabContent()

let tabCounter = 0;
const autoFunctionSlider = () =>
{
    if (tabCounter === 4) tabCounter = 0;
    hideTabContent()
    showTabContent(tabCounter);
    tabCounter++;
}
let autoSlider = setInterval( autoFunctionSlider, 1300);

tabsParent.addEventListener('click', (e) =>
{
    clearInterval(autoSlider)
    setTimeout(() => {
        autoSlider = setInterval( autoFunctionSlider, 1300);
    }, 3000);
    if (e.target.classList.contains('tabheader__item')) {
        const target = e.target
        tabs.forEach((item, i) =>
        {
            if (target === item) {
                hideTabContent()
                showTabContent(i)
                tabCounter = i;
            }
        })
    }
})

// modal
const modal = document.querySelector(".modal")
const openModalBtn = document.querySelector(".btn_white")
const closeModalBtn = document.querySelector(".modal__close")
const openModalDark = document.querySelector(".btn_dark")

const openModal = () => {
    modal.classList.add("show")
    modal.classList.remove("hide")
    document.body.style.overflow = ""
}

const closeModal = () => {
    modal.classList.add("hide")
    modal.classList.remove("show")
    document.body.style.overflow = ''

}

openModalBtn.addEventListener("click", openModal)
openModalDark.addEventListener("click", openModal)
closeModalBtn.addEventListener("click", closeModal)

window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY + window.innerHeight
    const scrollHeight = document.body.scrollHeight
    if (scrollPosition >= scrollHeight) {
        openModal()
    }
})

// dz 5
const message = {
    loading: "Loading...",
    success: "Thanks, we'll be in touch soon!",
    fail: "Something went wrong..."
}

const diolog = document.querySelector('.modal__dialog')
modal.addEventListener('click', (e) =>
{
    if (!diolog.contains(e.target) && modal.classList.contains('show')) closeModal();
})

const forms = document.querySelectorAll('form')
const postData = (form) => {
    form.addEventListener("submit", (e) => {

        e.preventDefault()

        const messageBlock = document.createElement('div')
        messageBlock.setAttribute('class', 'messageBlock')
        messageBlock.textContent = message.loading
        diolog.append(messageBlock)

        const request = new XMLHttpRequest()
        request.open("POST", "server.php")
        request.setRequestHeader("Content-type", "application/json")

        const formData = new FormData(form)
        const object = {}

        formData.forEach((item, i) =>
        {
            const arr = [item, i]
            console.log(arr);
            object[i] = item
        })
        console.log(object);
        const json = JSON.stringify(object)
        request.send(json)

        const closeMessage = function () {
            setTimeout(() => {
                messageBlock.remove()
            }, 4000);
        }
        request.addEventListener("load",  () => {
            setTimeout(() => {
                messageBlock.textContent = message.loading
                if (request.status === 200) {
                    console.log('ok')
                    messageBlock.textContent = message.success
                    messageBlock.style.background = 'rgb(197,5,236)'
                    messageBlock.style.color = 'rgb(238,241,237)'
                    closeMessage()
                    setTimeout(() => {
                        closeModal()
                    }, 5000);
                    document.getElementById('input1').value = ''
                    document.getElementById('input2').value = ''
                }
                else {
                    console.log("not ok")
                    messageBlock.textContent = message.fail
                    messageBlock.style.background = 'red'
                    closeMessage()
                }
            }, 1500);
        })

    })

}
forms.forEach((item) => {
    postData(item)
})