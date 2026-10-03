import React, { useEffect, useState } from 'react'
import { deletePost, getPost } from '../api/PostApi';
import AddPost from './AddPost';

const Posts = () => {
  const[ data, setData] = useState([]);
  const[ updateDataApi, setupdateDataApi] = useState({});

  const getPostData = async ()=>{
       const res = await getPost();
       console.log(res.data); 
       setData(res.data);    
  }
  
  
  useEffect(()=>{
      getPostData();
  },[])

  // Delete Post
  const handleDeletePost = async (id)=>{
    try {
        const res =  await deletePost(id);
        if(res.status ===  200) {
          const updatedPosts =  data.filter((curPost)=>{
                return curPost.id !== id;
          })
          setData(updatedPosts);
        }
        
    } catch (error) {
        console.log(error);
        
    }
  }
 
  // Edit Post
  const handleUpdatePost = (curElem)=>setupdateDataApi(curElem);

  return (
    <>
    <section className='section-form'>
     <AddPost data={data}  setData={setData}  updateDataApi={updateDataApi} setupdateDataApi={setupdateDataApi} />
    </section>
  <section className='section-post'>
    <ol>
        { data.map((curElem)=>{
            const { id,body,title } = curElem;
            return (<li key={id} >
                <p>Title: {title}</p>
                <p>Body: {body}</p>
                <button className='btn-edit' onClick={()=>handleUpdatePost(curElem)}>Edit</button>
                <button className='btn-delete' onClick={()=>handleDeletePost(id)}>Delete</button>                 
            </li>)
        }) 
        }
    </ol>
  </section> 
  </>
)

}
 

export default Posts
