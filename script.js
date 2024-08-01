const apikey="21cd93c8620e4a1d9e89cfcacdbc503d";

const blogcontainer=document.getElementById("blog-container");

 const searchfield=document.getElementById('search-input');
 
 const searchbutton=document.getElementById('search-button');

 
  async function fetchRandomNews(){
      try{
const apiUrl=`https://newsapi.org/v2/top-headlines?country=us&pagesize=30&apikey=${apikey}`;
const response=await fetch(apiUrl);
const data=await response.json();
   return data.articles;
   

}

catch (error){
  console.error("error fetching random news",error);
  return[];
  }      
}
searchbutton.addEventListener("click",async ()=>{
    
  const  query =searchfield.value.trim();
                   
                          if(query  !== "") {3
                         
                   try{

                         const articles=await fetchNewsQuery(query);
                         displayBlogs(articles)
                   }
                
              
              catch(error){

                         console.log("error is fetching news by query",error);
              }
        }
});


async function fetchNewsQuery(query){
                         try{

                             const apiUrl=`https://newsapi.org/v2/everything?q=${query}&pagesize=20&apikey=${apikey}`;
                    const response=await fetch(apiUrl);
                      const data=await response.json();
                         return data.articles;
                                                  
                            }
                          catch (error){
                          console.error("error fetching random news",error);
                          return[];
                    }    
                  
                  }

function displayBlogs(articles){
   blogcontainer.innerHTML="";
   articles.forEach(article=> {
                         
  
          const blogcard=document.createElement("div")
          
          blogcard.classList.add("blog-card");

          const img=document.createElement("img");

          img.src=article.urlToImage
          img.alt=article.title

          const title=document.createElement("h2");

         const truncatedTitle=article.title.length>30?article.title.slice(0, 30)+"....":article.title;
         title.textContent=truncatedTitle;

          const description=document.createElement("p");

          const truncateDes=article.description>120?article.description.slice(0, 120)+"....":article.description;
         description.textContent=truncateDes;

       

      blogcard.appendChild(img)
      blogcard.appendChild(title)
      blogcard.appendChild(description)
      blogcard.addEventListener('click',()=>{
        window.open(article.url,"_blank")
      });
      blogcontainer.appendChild(blogcard);

                         
   });                       
}
 
(async()=>{
                         try{
                         
                         
                          const articles= await fetchRandomNews();
                         displayBlogs(articles);
                         
                         }
                          catch (error){
                          console.error("error fetching random news",error);
                         
                         }
                         
                         })();