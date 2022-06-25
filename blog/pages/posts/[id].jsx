import React from 'react'

const Convert = (data) => {
    const timestamp = new Date(data)
    const date = timestamp.getDate() + "/" + (timestamp.getMonth()+1) + "/" + timestamp.getFullYear()
    return date
  }

const Post = ({post}) => {
    console.log(post)
    return (
        <div>
        <img className="card__image" width="1920" height="400" src={"http://localhost:1337" + post.data.attributes.photo.data.attributes.url }/>
        <div className="post-container">
            <h1>{post.data.attributes.title}</h1>
            <p>{post.data.attributes.content}</p>
            <div className="post-autor">
            <img src={"http://localhost:1337" + post.data.attributes.users_permissions_user.data.attributes.avatar.data.attributes.url} alt="user__image" className="user__image" width="100"/>
            <div className="post-autor-details">
             <h5>{post.data.attributes.users_permissions_user.data.attributes.username}</h5>
             <small>{Convert(post.data.attributes.publishedAt)}</small>
            </div>  
           </div>
        </div>
        </div>

    )
}

export default Post

export async function getStaticProps({params}){
    const post = await fetch(`http://localhost:1337/api/posts/${params.id}?populate=deep`).then(res => res.json())
    return{
        props:{
            post: post
        }
    }
}

export async function getStaticPaths(){
    const posts = await fetch("http://localhost:1337/api/posts/").then(res => res.json())

    return{
        paths: posts.data.map(post => {
            return{
                params: {
                    id: post.id.toString()
                } 
            }
        }),
        fallback: false
    }
}