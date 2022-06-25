import Link from 'next/link'
export default function Home({posts}) {

  console.log(posts)

  const Convert = (data) => {
    const timestamp = new Date(data)
    const date = timestamp.getDate() + "/" + (timestamp.getMonth()+1) + "/" + timestamp.getFullYear()
    return date
  }
  return (
   <div className="container">
     {posts.map(post => {

       return(
      <Link href={"/posts/" + post.id}>  
      <div className="card">
       <div className="card__header">
         <img src={"http://localhost:1337" + post.attributes.photo.data.attributes.url} alt="card__image" className="card__image" width="600"/>
       </div>
       <div className="card__body">
         <h4>{post.attributes.title}</h4>
         <p>{post.attributes.content}</p>
       </div>
       <div className="card__footer">
         <div className="user">
           <img src={"http://localhost:1337" + post.attributes.users_permissions_user.data.attributes.avatar.data.attributes.url} alt="user__image" className="user__image" width="50"/>
           <div className="user__info">
             <h5>{post.attributes.users_permissions_user.data.attributes.username}</h5>
             <small>{Convert(post.attributes.publishedAt)}</small>
           </div>
         </div>
       </div>
     </div> 
     </Link> 
       )
       
     })}
      
    </div>
  )
}

export async function getStaticProps(){
  const postRes = await fetch('http://localhost:1337/api/posts?populate=deep')
  .then(res => res.json())
  .catch(err => console.error(err))


  return {
    props: {
      posts: postRes.data
    }
  }
  
}
