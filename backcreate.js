// const backcreateUrl = "https://striveschool-api.herokuapp.com/api/product/";

const postName = document.getElementById("post-name");
const postDesc = document.getElementById("post-description");
const postBrand = document.getElementById("post-brand");
const postPrice = document.getElementById("post-price");
const alertMsg = document.getElementById("alertMsg");



async function createPost() {
    if (postName.value && postDesc.value && postBrand.value && postPrice) {
        try {
            const newPost = {
                name: postName.value,
                description: postDesc.value,
                brand: postBrand.value,
                price: postPrice.value,
                imageUrl: "https://via.placeholder.com/150"
            }

            const response = await fetch(backUrl, {
                method: 'POST',
                body: JSON.stringify(newPost),
                headers: {
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2JlMGY1NzFlMTQwNjAwMTUzMTRkNzMiLCJpYXQiOjE3NDA1MDkwMTUsImV4cCI6MTc0MTcxODYxNX0.MsYyJCntBws9dLD2srqznjRO1T5pmYpyZxti_oPqypI',
                'Content-Type': 'application/json'
                }
            })
            getPosts();
        } catch (error) {
            console.log(error);
        }
    } else {
        alertMsg.classList.remove('d-none');

        setTimeout(() => {
            alertMsg.classList.add('d-none');
        }, 5000);
        console.log ('Inserisci tutti i cmapi')
        }
}

