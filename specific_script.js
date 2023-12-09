
function createItem(items){
    const mangaImg = document.querySelector('.content_images')
    const mangaTitle = document.getElementById('mangaTitle')
    const mangaDescription = document.getElementById('mangaDescription')
    const mangaRating = document.getElementById('mangaRating')
    const mangaStatus = document.getElementById('mangaStatus')

    console.log(items)
    const id = items.id
    const { status , title,description,  contentRating } = items.attributes
    const relationships = items.relationships
    
    mangaRating.textContent = contentRating
    mangaStatus.textContent = status
    mangaTitle.textContent = title.en
    const tempDescription = description.en
    // let temp = tempDescription.substring(0, tempDescription.indexOf('Alternate Raw'))
    mangaDescription.textContent = tempDescription


    let imgID;
    relationships.forEach(rItems =>{
     if(rItems.type == "cover_art"){
         imgID = rItems.id
     }
    })



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
             let tempImage = document.createElement('img')
             tempImage.id = "mangaImg"
             tempImage.setAttribute("src",`https://mangadex.org/covers/${imgGetId}/${filename}`)
             mangaImg.appendChild(tempImage)
         })
 
     })
 }
 
 
 const authors = document.querySelector('.authors')
 //fetch method
 const arr= []
 const url = new URLSearchParams(window.location.search)
 const uid = url.get('id')
 fetch(`https://api.mangadex.org/manga/${uid}`,{
     method: 'GET',
 })
 .then(response=> response.json())
 .then(result =>{
     const data = result.data
     createItem(data)
     const rs = data.relationships
     rs.map(resItem=>{
        if(resItem.type =="author"){
            fetch(`https://api.mangadex.org/author/${resItem.id}`,{
                    method: "GET",
            })
            .then(response => response.json())
            .then(result =>{
                let authorData = result.data
                const author_p = document.createElement("p")
                author_p.textContent = authorData.attributes.name
                authors.appendChild(author_p)
            })
        }
     })
 })

 