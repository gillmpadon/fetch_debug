function createItem(items){
   const id = items.id
   const { status , title,  contentRating } = items.attributes
   const relationships = items.relationships
   let imgID;
   relationships.forEach(rItems =>{
    if(rItems.type == "cover_art"){
        imgID = rItems.id
    }
   })
   

   const zyrhea = document.querySelector('.zyrhea')

   const div = document.createElement("div") 
   div.classList.add('item')
   div.id = "item"
   div.onclick = ()=>{
    window.location.href = `specific.html?id=${id}`
   }

   const imageDiv = document.createElement("div")
   imageDiv.classList.add('images')
   const img = document.createElement("img")
   fetch(`https://api.mangadex.org/cover?limit=1&manga%5B%5D=${id}&ids%5B%5D=${imgID}`, {
        method: 'GET',
        headers: {
            'accept': 'application/json'
        }
    })
    .then( response => response.json())
    .then(result =>{
        const resultData = result.data
        resultData.map( value =>{
            const relationshipImg = value.relationships
            let imgGetId ;
            relationshipImg.map( res =>{
                if(res.type =="manga"){
                    imgGetId = res.id
                }
            })
            const filename = value.attributes.fileName
            img.setAttribute("src",`https://mangadex.org/covers/${imgGetId}/${filename}`)

        })

    })
   imageDiv.appendChild(img)

   const info = document.createElement("div")
   info.classList.add('info')
   const p1  = document.createElement("p")
   p1.classList.add('info_title')
   p1.textContent = title.en


   const p2 = document.createElement("p")
   p2.textContent = contentRating

   info.appendChild(p1)
   info.appendChild(p2)

   const details = document.createElement("div")
   details.classList.add('details')
   const p_details = document.createElement("p")
   p_details.textContent = status

   details.appendChild(p_details)
   info.appendChild(details)

   div.appendChild(imageDiv)
   div.appendChild(info)

   zyrhea.appendChild(div)
}



//fetch method
const arr= []
fetch('https://api.mangadex.org/manga?limit=10',{
    method: 'GET',
})
.then(response=> response.json())
.then(result =>{
    const data = result.data
    data.map(items =>{
        arr.push(items)
    })
    arr.map(item=>{
        createItem(item)
    })
})
