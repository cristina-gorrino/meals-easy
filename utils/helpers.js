module.exports = {
    renderImage: (recipe_name) => {
        // Selects the right image for handlebars to show
        if (recipe_name === "Strawberry Banana Stuffed Pancakes") {
            return `<img src="/images/strawberry_banana_pancakes.jpg" alt="Strawberry banana stuffed pancakes">`
        } else if (recipe_name === "Vegan Lo Mein") {
            return `<img src="/images/veggie_lo_mein.jpg" alt="Vegan lo mein"></img>`
        } else if (recipe_name === "Tacos al pastor" ) {
            return `<img src="/images/tacos_al_pastor.jpg" alt="Tacos al pastor">`
        } else if (recipe_name === "Chicken parmesan") {
            return `<img src="/images/chicken_parm.jpg" alt="Chicken parmesan">`
        } else if (recipe_name === "Banana chocolate chip cookies") {
            return `<img src="/images/banana_chocolate_chip_cookies.jpg" alt="Banana chocolate chip cookies">`
        }
    }
}
