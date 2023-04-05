const wrapper = document.querySelector(".wrapper")

fetch('date.json')
    .then(response => response.json())
    .then(json =>
    json.forEach(i => {
        const card = document.createElement('div')

        card.innerHTML = `
            <div class="card">
                <img class="card_img" src="${i.image}" alt="">
                <p>${i.name}</p>
                <span>${i.price}</span>
            </div>`
        wrapper.append(card)

    })
)